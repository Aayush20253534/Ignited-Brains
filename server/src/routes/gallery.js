const express = require('express');
const crypto = require('node:crypto');
const sharp = require('sharp');
const { pool } = require('../db');
const { createRateLimiter } = require('../middleware/security');
const { asyncHandler, HttpError } = require('../utils/http');
const { cleanString } = require('../utils/text');
const { parsePagination, parseEnumQuery } = require('../utils/validation');
const { applyDateFilters, sortOrder } = require('../utils/admin-filters');

const publicRouter = express.Router();
const adminRouter = express.Router();

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const statuses = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

function checkId(id) {
  if (!uuid.test(String(id || ''))) throw new HttpError(400, 'Invalid gallery identifier');
}
function text(value, field, max, required = false) {
  if (value !== undefined && value !== null && typeof value !== 'string') throw new HttpError(400, field + ' must be text');
  const result = String(value || '').trim();
  if (result.includes('\u0000')) throw new HttpError(400, field + ' contains an unsupported control character');
  if (result.length > max) throw new HttpError(400, field + ' exceeds ' + max + ' characters');
  if (required && !result) throw new HttpError(400, field + ' is required');
  return result;
}
function parseGallery(body = {}, { existing = false } = {}) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new HttpError(400, 'Gallery data must be an object');
  const status = parseEnumQuery(body.status || 'DRAFT', statuses, 'status') || 'DRAFT';
  const mediaId = text(body.mediaId, 'image', 80, !existing);
  if (mediaId && !uuid.test(mediaId)) throw new HttpError(400, 'Select a valid uploaded image');
  const altText = text(body.altText, 'image description', 300, status === 'PUBLISHED');
  let eventDate = null;
  if (body.eventDate) {
    eventDate = text(body.eventDate, 'event date', 10, true);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || !Number.isFinite(Date.parse(eventDate + 'T00:00:00Z'))) {
      throw new HttpError(400, 'event date must use YYYY-MM-DD');
    }
  }
  const order = Number(body.displayOrder ?? 0);
  if (!Number.isSafeInteger(order) || order < 0 || order > 1000000) throw new HttpError(400, 'display order must be a whole number from 0 to 1000000');
  if (body.isFeatured !== undefined && typeof body.isFeatured !== 'boolean') throw new HttpError(400, 'featured must be true or false');
  return {
    mediaId,
    title: text(body.title, 'title', 180, true),
    caption: text(body.caption, 'caption', 500),
    altText,
    category: text(body.category, 'category', 100) || 'Other',
    location: text(body.location, 'location', 180),
    eventDate,
    displayOrder: order,
    isFeatured: Boolean(body.isFeatured),
    status,
  };
}
function galleryItem(row) {
  return {
    id: row.id,
    mediaId: row.media_id,
    image: '/api/v1/media/' + row.media_id,
    width: Number(row.width),
    height: Number(row.height),
    title: row.title,
    caption: row.caption,
    altText: row.alt_text,
    category: row.category,
    location: row.location,
    eventDate: row.event_date,
    displayOrder: Number(row.display_order),
    isFeatured: row.is_featured,
    status: row.status,
    version: Number(row.version),
    archivedAt: row.archived_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
function baseSelect() {
  return `SELECT g.*, m.width, m.height
    FROM gallery_items g
    JOIN blog_media m ON m.id = g.media_id`;
}
function addFilter(clauses, values, sql, value) {
  values.push(value);
  clauses.push(sql.replace('?', '$' + values.length));
}
async function listGallery(query, publicOnly) {
  const { page, limit, offset } = parsePagination(query);
  const clauses = publicOnly ? ["g.status='PUBLISHED'"] : [];
  const values = [];
  if (!publicOnly && query.status) addFilter(clauses, values, 'g.status=?', parseEnumQuery(query.status, statuses, 'status'));
  if (query.category) addFilter(clauses, values, 'g.category=?', cleanString(query.category, 100));
  if (String(query.featured || '').toLowerCase() === 'true') clauses.push('g.is_featured=TRUE');
  const search = cleanString(query.query, 200);
  if (search) {
    values.push('%' + search + '%');
    clauses.push(`(g.title ILIKE $${values.length} OR g.caption ILIKE $${values.length} OR g.alt_text ILIKE $${values.length} OR g.category ILIKE $${values.length} OR COALESCE(g.location,'') ILIKE $${values.length})`);
  }
  if (!publicOnly) applyDateFilters(query, clauses, values, 'g.created_at');
  const where = clauses.length ? 'WHERE ' + clauses.join(' AND ') : '';
  const count = await pool.query('SELECT COUNT(*)::int AS total FROM gallery_items g ' + where, values);
  const dataValues = [...values, limit, offset];
  const order = publicOnly ? 'g.display_order ASC, g.created_at DESC' : (query.sort === 'oldest' ? 'g.created_at ASC' : query.sort === 'order' ? 'g.display_order ASC, g.created_at DESC' : 'g.created_at DESC');
  const rows = await pool.query(
    baseSelect() + ' ' + where + ' ORDER BY ' + order + ' LIMIT $' + (dataValues.length - 1) + ' OFFSET $' + dataValues.length,
    dataValues,
  );
  const categories = await pool.query(
    `SELECT DISTINCT category FROM gallery_items ${publicOnly ? "WHERE status='PUBLISHED'" : ''} ORDER BY category`
  );
  return {
    data: rows.rows.map(galleryItem),
    categories: categories.rows.map(row => row.category).filter(Boolean),
    pagination: { page, limit, total: count.rows[0].total, totalPages: Math.ceil(count.rows[0].total / limit) },
  };
}

publicRouter.get('/gallery', asyncHandler(async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.json(await listGallery(req.query, true));
}));

adminRouter.get('/gallery', asyncHandler(async (req, res) => {
  res.json(await listGallery(req.query, false));
}));

adminRouter.get('/gallery/:id', asyncHandler(async (req, res) => {
  checkId(req.params.id);
  const { rows } = await pool.query(baseSelect() + ' WHERE g.id=$1 LIMIT 1', [req.params.id]);
  if (!rows[0]) throw new HttpError(404, 'Gallery item not found');
  res.json({ data: galleryItem(rows[0]) });
}));

adminRouter.post('/gallery', asyncHandler(async (req, res) => {
  const data = parseGallery(req.body);
  const exists = await pool.query('SELECT id FROM blog_media WHERE id=$1 LIMIT 1', [data.mediaId]);
  if (!exists.rows[0]) throw new HttpError(400, 'Uploaded image does not exist');
  const id = crypto.randomUUID();
  const { rows } = await pool.query(
    `INSERT INTO gallery_items
      (id,media_id,title,caption,alt_text,category,location,event_date,display_order,is_featured,status,uploaded_by)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
     RETURNING *`,
    [id,data.mediaId,data.title,data.caption,data.altText,data.category,data.location || null,data.eventDate,data.displayOrder,data.isFeatured,data.status,req.admin.id],
  );
  const full = await pool.query(baseSelect() + ' WHERE g.id=$1', [rows[0].id]);
  res.status(201).json({ data: galleryItem(full.rows[0]) });
}));

adminRouter.patch('/gallery/:id', asyncHandler(async (req, res) => {
  checkId(req.params.id);
  const existing = await pool.query('SELECT * FROM gallery_items WHERE id=$1 LIMIT 1', [req.params.id]);
  if (!existing.rows[0]) throw new HttpError(404, 'Gallery item not found');
  const version = Number(req.body?.version);
  if (!Number.isSafeInteger(version) || version < 1) throw new HttpError(400, 'Current gallery version is required. Reload and try again.');
  const data = parseGallery(req.body, { existing: true });
  const mediaId = data.mediaId || existing.rows[0].media_id;
  const media = await pool.query('SELECT id FROM blog_media WHERE id=$1 LIMIT 1', [mediaId]);
  if (!media.rows[0]) throw new HttpError(400, 'Uploaded image does not exist');
  const { rows } = await pool.query(
    `UPDATE gallery_items SET media_id=$2,title=$3,caption=$4,alt_text=$5,category=$6,location=$7,event_date=$8,
       display_order=$9,is_featured=$10,status=$11,archived_at=NULL,updated_at=NOW(),version=version+1
     WHERE id=$1 AND version=$12 RETURNING *`,
    [req.params.id,mediaId,data.title,data.caption,data.altText,data.category,data.location || null,data.eventDate,data.displayOrder,data.isFeatured,data.status,version],
  );
  if (!rows[0]) throw new HttpError(409, 'Another administrator changed this gallery item. Reload it before saving.');
  const full = await pool.query(baseSelect() + ' WHERE g.id=$1', [req.params.id]);
  res.json({ data: galleryItem(full.rows[0]) });
}));

adminRouter.post('/gallery/:id/archive', asyncHandler(async (req, res) => {
  checkId(req.params.id);
  const version = Number(req.body?.version);
  if (!Number.isSafeInteger(version) || version < 1) throw new HttpError(400, 'Current gallery version is required');
  const { rows } = await pool.query(
    "UPDATE gallery_items SET status='ARCHIVED',archived_at=NOW(),updated_at=NOW(),version=version+1 WHERE id=$1 AND version=$2 RETURNING *",
    [req.params.id, version],
  );
  if (!rows[0]) throw new HttpError(409, 'Gallery item changed or was not found. Refresh and try again.');
  const full = await pool.query(baseSelect() + ' WHERE g.id=$1', [req.params.id]);
  res.json({ data: galleryItem(full.rows[0]) });
}));

adminRouter.post('/gallery/:id/restore', asyncHandler(async (req, res) => {
  checkId(req.params.id);
  const version = Number(req.body?.version);
  if (!Number.isSafeInteger(version) || version < 1) throw new HttpError(400, 'Current gallery version is required');
  const { rows } = await pool.query(
    "UPDATE gallery_items SET status='DRAFT',archived_at=NULL,updated_at=NOW(),version=version+1 WHERE id=$1 AND version=$2 AND status='ARCHIVED' RETURNING *",
    [req.params.id, version],
  );
  if (!rows[0]) throw new HttpError(409, 'Gallery item changed or was not found. Refresh and try again.');
  const full = await pool.query(baseSelect() + ' WHERE g.id=$1', [req.params.id]);
  res.json({ data: galleryItem(full.rows[0]) });
}));

const uploadLimiter = createRateLimiter({ windowMs: 60000, max: 12, key: req => req.admin.id });
adminRouter.post('/gallery-media', uploadLimiter, express.raw({ type: ['image/jpeg','image/png','image/webp'], limit: '5mb' }), asyncHandler(async (req, res) => {
  if (!Buffer.isBuffer(req.body) || !req.body.length) throw new HttpError(400, 'Upload a JPG, PNG or WebP image');
  let output, info;
  try {
    const image = sharp(req.body, { limitInputPixels: 20000000, animated: false, failOn: 'warning' });
    const metadata = await image.metadata();
    if (!['jpeg','png','webp'].includes(metadata.format) || !metadata.width || !metadata.height || metadata.width < 100 || metadata.height < 100 || (metadata.pages || 1) > 1) throw new Error('Invalid image');
    const result = await image.rotate().resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true }).webp({ quality: 84 }).toBuffer({ resolveWithObject: true });
    output = result.data;
    info = result.info;
  } catch {
    throw new HttpError(400, 'Use a valid, non-animated JPG, PNG or WebP image, at least 100×100 pixels and at most 20 megapixels');
  }
  if (output.length > 700 * 1024) throw new HttpError(400, 'Optimized image is too large. Use a smaller image');
  const hash = crypto.createHash('sha256').update(output).digest('hex');
  const { rows } = await pool.query(
    `INSERT INTO blog_media(id,content_hash,mime_type,bytes,width,height,uploaded_by)
     VALUES($1,$2,'image/webp',$3,$4,$5,$6)
     ON CONFLICT(content_hash) DO UPDATE SET content_hash=EXCLUDED.content_hash
     RETURNING id,width,height`,
    [crypto.randomUUID(),hash,output,info.width,info.height,req.admin.id],
  );
  res.status(201).json({ data: { mediaId: rows[0].id, url: '/api/v1/media/' + rows[0].id, width: rows[0].width, height: rows[0].height, bytes: output.length } });
}));

module.exports = { publicRouter, adminRouter };
