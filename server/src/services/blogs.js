const { HttpError } = require('../utils/http');
const assets = new Set(require('../../data/image-assets.json'));
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function text(value, field, max, required = false) {
  if (value !== undefined && typeof value !== 'string') throw new HttpError(400, `${field} must be text`);
  const result = String(value || '').trim();
  if (result.includes('\u0000')) throw new HttpError(400, `${field} contains an unsupported control character`);
  if (result.length > max) throw new HttpError(400, `${field} exceeds ${max} characters`);
  if (required && !result) throw new HttpError(400, `${field} is required`);
  return result;
}
function parseBlog(body = {}) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new HttpError(400, 'Article data must be an object');
  const status = body.status || 'DRAFT';
  if (!['DRAFT','PUBLISHED'].includes(status)) throw new HttpError(400, 'status must be DRAFT or PUBLISHED; use the archive action to remove an article');
  const published = status === 'PUBLISHED';
  const slug = text(body.slug,'slug',120,true);
  if (!slugPattern.test(slug)) throw new HttpError(400,'slug must contain lowercase letters, numbers and single hyphens');
  if (body.tags !== undefined && (!Array.isArray(body.tags) || body.tags.length > 20)) throw new HttpError(400,'tags must be an array of up to 20 tags');
  const tags = [...new Set((body.tags || []).map(tag => text(tag,'tag',60,true)))];
  const image = text(body.image,'featured image',500,published);
  if (image && !assets.has(image) && !/^\/api\/v1\/media\/[0-9a-f-]{36}$/.test(image)) throw new HttpError(400,'Select an existing image or upload a JPG, PNG or WebP image');
  if (body.publishedAt !== undefined && body.publishedAt !== null && typeof body.publishedAt !== 'string') throw new HttpError(400,'publication date must be text or null');
  const publishedAt = body.publishedAt || null;
  if (publishedAt && (!/^\d{4}-\d{2}-\d{2}T(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(publishedAt) || publishedAt.startsWith('0000-') || !Number.isFinite(Date.parse(publishedAt)) || new Date(publishedAt.slice(0,10)).toISOString().slice(0,10) !== publishedAt.slice(0,10) || new Date(publishedAt).getTime() > Date.now())) throw new HttpError(400,'publication date must be a valid date that is not in the future');
  return {title:text(body.title,'title',200,true),slug,excerpt:text(body.excerpt,'excerpt',600,published),content:text(body.content,'content',90000,published),category:text(body.category,'category',100,published),tags,image,imageAlt:text(body.imageAlt,'image description',300,published),imageCaption:text(body.imageCaption,'image caption',500),author:text(body.author,'author',120)||'Ignited Brains',seoTitle:text(body.seoTitle,'SEO title',200),seoDescription:text(body.seoDescription,'SEO description',320),status,publishedAt};
}
async function validateImage(client, image) {
  if (!image || assets.has(image)) return;
  const id = image.split('/').at(-1);
  const found = await client.query('SELECT id FROM blog_media WHERE id=$1',[id]);
  if (!found.rows.length) throw new HttpError(400,'Featured image upload does not exist');
}
function toBlog(row, includeContent = true) {
  const plain = row.content.replace(/\{#[^}]+\}|https?:\/\/\S+|[#>*_`\[\]()]/g,' ');
  return { id:row.id,title:row.title,slug:row.slug,excerpt:row.excerpt,...(includeContent ? {content:row.content} : {}),category:row.category,tags:row.tags,image:row.featured_image,imageAlt:row.image_alt,imageCaption:row.image_caption,author:row.author,seoTitle:row.seo_title,seoDescription:row.seo_description,status:row.status,publishedAt:row.published_at,createdAt:row.created_at,updatedAt:row.updated_at,archivedAt:row.archived_at,views:Number(row.view_count),impressions:Number(row.impression_count),version:row.version,readTime:Math.max(1,Math.ceil(plain.trim().split(/\s+/).length/210)) };
}
function publicBlog(row, includeContent = true) {
  const data = toBlog(row, includeContent);
  for (const field of ['views', 'impressions', 'version', 'archivedAt']) delete data[field];
  return data;
}
function checkVersion(value) {
  if (!Number.isSafeInteger(value) || value < 1 || value > 2147483647) throw new HttpError(400,'The current article version is required. Reload the editor.');
  return value;
}
function checkId(id) { if (!uuid.test(id)) throw new HttpError(400,'Invalid article identifier'); }
function databaseError(error) {
  if (error.code === '23505') return new HttpError(409,'This slug is already in use or belongs to an earlier article URL. Choose another slug.');
  return error;
}
module.exports = { parseBlog,validateImage,toBlog,publicBlog,checkVersion,checkId,databaseError,uuid,assets };
