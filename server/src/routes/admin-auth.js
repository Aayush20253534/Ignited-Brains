const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { pool } = require('../db');
const { config } = require('../config');
const { asyncHandler, HttpError } = require('../utils/http');
const { normalizeEmail, cleanString } = require('../utils/text');
const { requireAdmin } = require('../middleware/auth');
const { createRateLimiter } = require('../middleware/security');

const router = express.Router();

const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  key: (req) => `${req.ip}:${normalizeEmail(req.body?.email || '')}`,
});

router.post('/login', loginLimiter, asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '').slice(0, 500);

  if (!email || !password) throw new HttpError(400, 'Email and password are required');

  const { rows } = await pool.query(
    `SELECT id, name, email, password_hash, is_active
     FROM admin_users
     WHERE email = $1
     LIMIT 1`,
    [email],
  );
  const admin = rows[0];

  if (!admin || !admin.is_active) throw new HttpError(401, 'Invalid email or password');

  const valid = await argon2.verify(admin.password_hash, password).catch(() => false);
  if (!valid) throw new HttpError(401, 'Invalid email or password');

  await pool.query('UPDATE admin_users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1', [admin.id]);

  const token = jwt.sign(
    { role: 'admin' },
    config.jwtSecret,
    {
      subject: admin.id,
      expiresIn: config.jwtExpiresIn,
      issuer: config.jwtIssuer,
      audience: config.jwtAudience,
      algorithm: 'HS256',
    },
  );

  res.json({
    token,
    expiresIn: config.jwtExpiresIn,
    admin: { id: admin.id, name: admin.name, email: admin.email },
  });
}));

router.get('/me', requireAdmin, (req, res) => {
  res.json({ admin: req.admin });
});

module.exports = router;
