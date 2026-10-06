const express = require('express');
const { pool } = require('./db');
const publicRoutes = require('./routes/public');
const adminAuthRoutes = require('./routes/admin-auth');
const adminDataRoutes = require('./routes/admin-data');
const blogRoutes = require('./routes/blogs');
const galleryRoutes = require('./routes/gallery');
const { requireAdmin } = require('./middleware/auth');
const { requestId, securityHeaders, cors } = require('./middleware/security');
const { HttpError, asyncHandler } = require('./utils/http');

const app = express();

app.disable('x-powered-by');
app.use(requestId);
app.use(securityHeaders);
app.use(cors);
app.use(express.json({ limit: '512kb' }));

app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'ignited-brains-api' });
});

app.get('/health', asyncHandler(async (_req, res) => {
  await pool.query('SELECT 1');
  res.json({ status: 'ok', service: 'ignited-brains-api' });
}));

app.use('/api/v1', publicRoutes);
app.use('/api/v1', blogRoutes.publicRouter);
app.use('/api/v1', galleryRoutes.publicRouter);
app.use('/api/v1/admin', (_req, res, next) => {
  res.setHeader('Cache-Control', 'no-store');
  next();
});
app.use('/api/v1/admin/auth', adminAuthRoutes);
app.use('/api/v1/admin', requireAdmin, adminDataRoutes, blogRoutes.adminRouter, galleryRoutes.adminRouter);

app.use((_req, _res, next) => next(new HttpError(404, 'Route not found')));

app.use((error, req, res, _next) => {
  const statusCode = error.statusCode || error.status || 500;

  if (statusCode >= 500) {
    console.error(`[${req.id}]`, error);
  }

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Internal server error' : error.message,
    requestId: req.id,
    ...(error.details ? { details: error.details } : {}),
  });
});

module.exports = { app };
