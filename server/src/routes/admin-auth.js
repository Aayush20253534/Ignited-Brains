const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { pool } = require('../db');
const { config } = require('../config');
const { asyncHandler, HttpError } = require('../utils/http');
const { normalizeEmail } = require('../utils/text');
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
      jwtid: crypto.randomUUID(),
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

router.post('/logout', requireAdmin, asyncHandler(async (req, res) => {
  await pool.query(
    `INSERT INTO admin_token_revocations (token_digest, expires_at)
     VALUES ($1, $2) ON CONFLICT (token_digest) DO NOTHING`,
    [req.adminSession.tokenDigest, req.adminSession.expiresAt],
  );
  // An expired JWT already fails signature/expiry validation, so its digest is no longer needed.
  await pool.query('DELETE FROM admin_token_revocations WHERE expires_at <= NOW()');
  res.json({ message: 'Your administrator session has ended.' });
}));

module.exports = router;
