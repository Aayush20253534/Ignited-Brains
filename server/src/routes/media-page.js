const express = require('express');
const { pool } = require('../db');
const { asyncHandler, HttpError } = require('../utils/http');
const { transaction } = require('../utils/transaction');
const { validateMediaPageContent, checkVersion } = require('../services/media-page');

const publicRouter = express.Router();
const adminRouter = express.Router();

async function current(client = pool) {
  const { rows } = await client.query("SELECT content,version,updated_at FROM media_page_content WHERE id='main' LIMIT 1");
  if (!rows[0]) throw new HttpError(503, 'Media page content is not initialized');
  return { content: rows[0].content, version: Number(rows[0].version), updatedAt: rows[0].updated_at };
}

publicRouter.get('/media-page', asyncHandler(async (_req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.json({ data: await current() });
}));

adminRouter.get('/media-page', asyncHandler(async (_req, res) => {
  res.json({ data: await current() });
}));

adminRouter.patch('/media-page', asyncHandler(async (req, res) => {
  const version = checkVersion(req.body?.version);
  const content = req.body?.content;
  const saved = await transaction(async client => {
    await validateMediaPageContent(client, content);
    const { rows } = await client.query(
      "UPDATE media_page_content SET content=$1::jsonb,version=version+1,updated_by=$2,updated_at=NOW() WHERE id='main' AND version=$3 RETURNING content,version,updated_at",
      [JSON.stringify(content), req.admin.id, version],
    );
    if (!rows[0]) throw new HttpError(409, 'Another administrator changed the Media page. Reload before saving.');
    return { content: rows[0].content, version: Number(rows[0].version), updatedAt: rows[0].updated_at };
  });
  res.json({ data: saved });
}));

module.exports = { publicRouter, adminRouter };
