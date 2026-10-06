const express = require('express');
const crypto = require('node:crypto');
const sharp = require('sharp');
const { pool } = require('../db');
const { config } = require('../config');
const { createRateLimiter } = require('../middleware/security');
const { asyncHandler,HttpError } = require('../utils/http');
const { parsePagination,parseEnumQuery } = require('../utils/validation');
const { cleanString } = require('../utils/text');
const { transaction } = require('../utils/transaction');
const { applyDateFilters,sortOrder } = require('../utils/admin-filters');
const { parseBlog,validateImage,toBlog,publicBlog,checkVersion,checkId,databaseError,uuid,assets } = require('../services/blogs');

const publicRouter = express.Router();
const adminRouter = express.Router();
const visible = "status='PUBLISHED' AND published_at <= NOW()";

function filters(query, publicOnly = false) {
  const clauses = publicOnly ? [visible] : [];
  const values = [];
  const add = (sql,value) => {values.push(value); clauses.push(sql.replaceAll('?',`$${values.length}`));};
  if (!publicOnly && query.status) add('status=?',parseEnumQuery(query.status,['DRAFT','PUBLISHED','ARCHIVED'],'status'));
  if (query.category) add('category=?',cleanString(query.category,100));
  const search = cleanString(query.query,200);
  if (search) add("(title ILIKE ? OR excerpt ILIKE ? OR content ILIKE ? OR category ILIKE ? OR array_to_string(tags,' ') ILIKE ?)",`%${search}%`);
  applyDateFilters(query,clauses,values,'published_at');
  return {where:clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',values};
}
async function listing(query, publicOnly) {
  const {page,limit,offset} = parsePagination(query);
  const {where,values} = filters(query,publicOnly);
  const count = await pool.query(`SELECT COUNT(*)::int AS total FROM blogs ${where}`,values);
  const params = [...values,limit,offset];
  const order = sortOrder(query.sort,publicOnly ? 'published_at' : 'updated_at');
  const rows = await pool.query(`SELECT * FROM blogs ${where} ORDER BY ${order} LIMIT $${params.length-1} OFFSET $${params.length}`,params);
  const categories = await pool.query(`SELECT DISTINCT category FROM blogs ${publicOnly ? `WHERE ${visible}` : ''} ORDER BY category`);
  return {data:rows.rows.map(row=>publicOnly ? publicBlog(row,false) : toBlog(row,false)),categories:categories.rows.map(row=>row.category).filter(Boolean),pagination:{page,limit,total:count.rows[0].total,totalPages:Math.ceil(count.rows[0].total/limit)}};
}
publicRouter.get('/blogs',asyncHandler(async(req,res)=>{res.setHeader('Cache-Control','no-store');res.json(await listing(req.query,true));}));
publicRouter.get('/blogs/sitemap',asyncHandler(async(_req,res)=>{
  const {rows}=await pool.query(`SELECT slug,updated_at,featured_image FROM blogs WHERE ${visible} ORDER BY slug`);
  res.setHeader('Cache-Control','no-store');res.json({data:rows.map(row=>({slug:row.slug,updatedAt:row.updated_at,image:row.featured_image}))});
}));
publicRouter.get('/blog-resolve/:slug',asyncHandler(async(req,res)=>{
  const {rows}=await pool.query(`SELECT b.slug FROM blogs b JOIN blog_slug_aliases a ON a.blog_id=b.id WHERE a.slug=$1 AND b.status='PUBLISHED' AND b.published_at <= NOW() LIMIT 1`,[req.params.slug]);
  if(!rows[0])throw new HttpError(404,'Article not found');
  res.setHeader('Cache-Control','no-store');res.json({data:{slug:rows[0].slug}});
}));
publicRouter.get('/blogs/:slug',asyncHandler(async(req,res)=>{
  const {rows}=await pool.query(`SELECT b.* FROM blogs b JOIN blog_slug_aliases a ON a.blog_id=b.id WHERE a.slug=$1 AND b.status='PUBLISHED' AND b.published_at <= NOW() LIMIT 1`,[req.params.slug]);
  if(!rows[0])throw new HttpError(404,'Article not found');
  res.setHeader('Cache-Control','no-store');res.json({data:publicBlog(rows[0])});
}));

const eventLimiter=createRateLimiter({windowMs:60000,max:90,key:req=>`${req.ip}:${typeof req.body?.visitorId === 'string' && uuid.test(req.body.visitorId) ? req.body.visitorId : 'invalid'}`});
publicRouter.post('/blog-events',eventLimiter,asyncHandler(async(req,res)=>{
  const {blogId,visitorId,kind,source}=req.body || {};
  if(typeof blogId !== 'string'||typeof visitorId !== 'string'||!uuid.test(blogId)||!uuid.test(visitorId)||!['IMPRESSION','VIEW'].includes(kind)||!(kind==='VIEW' ? source==='ARTICLE' : ['LISTING','RELATED'].includes(source)))throw new HttpError(400,'Invalid article analytics event');
  if(/bot|crawler|spider|preview/i.test(req.headers['user-agent']||''))return res.json({recorded:false});
  const digest=crypto.createHmac('sha256',config.jwtSecret).update(visitorId).digest('hex');
  const {rows}=await pool.query(`WITH recorded AS (
    INSERT INTO blog_events (blog_id,visitor_digest,event_kind,source)
    SELECT id,$2,$3,$4 FROM blogs WHERE id=$1 AND ${visible}
    ON CONFLICT DO NOTHING RETURNING blog_id
  ) UPDATE blogs SET view_count=view_count+CASE WHEN $3='VIEW' THEN 1 ELSE 0 END,
    impression_count=impression_count+CASE WHEN $3='IMPRESSION' THEN 1 ELSE 0 END
    FROM recorded WHERE blogs.id=recorded.blog_id RETURNING blogs.id`,[blogId,digest,kind,source]);
  if(!rows.length){const exists=await pool.query(`SELECT id FROM blogs WHERE id=$1 AND ${visible}`,[blogId]);if(!exists.rows.length)throw new HttpError(404,'Article not found');}
  res.setHeader('Cache-Control','no-store');res.json({recorded:rows.length>0});
}));
publicRouter.get('/media/:id',asyncHandler(async(req,res)=>{
  checkId(req.params.id);
  const {rows}=await pool.query('SELECT bytes,mime_type,content_hash FROM blog_media WHERE id=$1',[req.params.id]);
  if(!rows[0])throw new HttpError(404,'Image not found');
  const etag=`"${rows[0].content_hash}"`;
  res.setHeader('ETag',etag);res.setHeader('Cache-Control','public, max-age=31536000, immutable');
  if(req.headers['if-none-match']===etag)return res.status(304).end();
  res.type(rows[0].mime_type).send(Buffer.from(rows[0].bytes));
}));

adminRouter.get('/blog-assets',(_req,res)=>res.json({data:[...assets]}));
adminRouter.get('/blogs',asyncHandler(async(req,res)=>res.json(await listing(req.query,false))));
adminRouter.get('/blogs/:id',asyncHandler(async(req,res)=>{
  checkId(req.params.id);const {rows}=await pool.query('SELECT * FROM blogs WHERE id=$1',[req.params.id]);
  if(!rows[0])throw new HttpError(404,'Article not found');res.json({data:toBlog(rows[0])});
}));
async function saveBlog(id,body) {
  const data=parseBlog(body);
  try {return await transaction(async client=>{
    await validateImage(client,data.image);
    const alias=await client.query('SELECT blog_id FROM blog_slug_aliases WHERE slug=$1',[data.slug]);
    if(alias.rows[0]&&alias.rows[0].blog_id!==id)throw new HttpError(409,'This slug is already in use or belongs to an earlier article URL. Choose another slug.');
    let row;
    const values=[data.title,data.slug,data.excerpt,data.content,data.category,data.tags,data.image,data.imageAlt,data.imageCaption,data.author,data.seoTitle,data.seoDescription,data.status,data.publishedAt];
    if(id){
      checkId(id); const version=checkVersion(body.version);
      const updated=await client.query(`UPDATE blogs SET title=$1,slug=$2,excerpt=$3,content=$4,category=$5,tags=$6,featured_image=$7,image_alt=$8,image_caption=$9,author=$10,seo_title=$11,seo_description=$12,status=$13::varchar,
        published_at=COALESCE($14::timestamptz,published_at,CASE WHEN $13::varchar='PUBLISHED' THEN NOW() ELSE NULL END),archived_at=NULL,updated_at=NOW(),version=version+1 WHERE id=$15 AND version=$16 RETURNING *`,[...values,id,version]);
      row=updated.rows[0];
      if(!row){const found=await client.query('SELECT id FROM blogs WHERE id=$1',[id]);throw new HttpError(found.rows.length ? 409 : 404,found.rows.length ? 'Another administrator changed this article. Reload it before saving.' : 'Article not found');}
    } else {
      id=crypto.randomUUID();
      const created=await client.query(`INSERT INTO blogs(title,slug,excerpt,content,category,tags,featured_image,image_alt,image_caption,author,seo_title,seo_description,status,published_at,id)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13::varchar,COALESCE($14::timestamptz,CASE WHEN $13::varchar='PUBLISHED' THEN NOW() ELSE NULL END),$15) RETURNING *`,[...values,id]);row=created.rows[0];
    }
    await client.query('INSERT INTO blog_slug_aliases(slug,blog_id) VALUES($1,$2) ON CONFLICT DO NOTHING',[data.slug,id]);
    return toBlog(row);
  });}catch(error){throw databaseError(error);}
}
adminRouter.post('/blogs',asyncHandler(async(req,res)=>res.status(201).json({data:await saveBlog(null,req.body)})));
adminRouter.patch('/blogs/:id',asyncHandler(async(req,res)=>res.json({data:await saveBlog(req.params.id,req.body)})));
adminRouter.post('/blogs/:id/archive',asyncHandler(async(req,res)=>{
  checkId(req.params.id);const version=checkVersion(req.body?.version);
  const {rows}=await pool.query("UPDATE blogs SET status='ARCHIVED',archived_at=NOW(),updated_at=NOW(),version=version+1 WHERE id=$1 AND version=$2 RETURNING *",[req.params.id,version]);
  if(!rows[0]){const exists=await pool.query('SELECT id FROM blogs WHERE id=$1',[req.params.id]);throw new HttpError(exists.rows.length ? 409 : 404,'Article changed or was not found. Refresh the list before removing it.');}
  res.json({data:toBlog(rows[0])});
}));
const uploadLimiter=createRateLimiter({windowMs:60000,max:12,key:req=>req.admin.id});
adminRouter.post('/blog-media',uploadLimiter,express.raw({type:['image/jpeg','image/png','image/webp'],limit:'5mb'}),asyncHandler(async(req,res)=>{
  if(!Buffer.isBuffer(req.body)||!req.body.length)throw new HttpError(400,'Upload a JPG, PNG or WebP image');
  let output,info;
  try {
    const image=sharp(req.body,{limitInputPixels:20000000,animated:false,failOn:'warning'});
    const metadata=await image.metadata();
    if(!['jpeg','png','webp'].includes(metadata.format)||!metadata.width||!metadata.height||metadata.width<100||metadata.height<100||(metadata.pages||1)>1)throw new Error('Invalid image');
    const result=await image.rotate().resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toBuffer({resolveWithObject:true});output=result.data;info=result.info;
  } catch {throw new HttpError(400,'Use a valid, non-animated JPG, PNG or WebP image, at least 100×100 pixels and at most 20 megapixels');}
  if(output.length>700*1024)throw new HttpError(400,'Optimized image is too large. Use a smaller image');
  const hash=crypto.createHash('sha256').update(output).digest('hex');
  const {rows}=await pool.query(`INSERT INTO blog_media(id,content_hash,mime_type,bytes,width,height,uploaded_by) VALUES($1,$2,'image/webp',$3,$4,$5,$6)
    ON CONFLICT(content_hash) DO UPDATE SET content_hash=EXCLUDED.content_hash RETURNING id,width,height`,[crypto.randomUUID(),hash,output,info.width,info.height,req.admin.id]);
  res.status(201).json({data:{url:`/api/v1/media/${rows[0].id}`,width:rows[0].width,height:rows[0].height,bytes:output.length}});
}));
module.exports={ publicRouter,adminRouter };
