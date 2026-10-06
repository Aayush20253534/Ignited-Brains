const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { config } = require('../config');
const { pool } = require('../db');
const { HttpError, asyncHandler } = require('../utils/http');

const requireAdmin = asyncHandler(async (req, _res, next) => {
  const authHeader = String(req.headers.authorization || '').trim();
  const parts = authHeader.split(/\s+/);

  if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
    throw new HttpError(401, 'Authentication required');
  }

  const token = parts[1];
  let payload;
  try {
    payload = jwt.verify(token, config.jwtSecret, {
      algorithms: ['HS256'],
      issuer: config.jwtIssuer,
      audience: config.jwtAudience,
    });
  } catch (_error) {
    throw new HttpError(401, 'Invalid or expired token');
  }

  if (!payload || typeof payload !== 'object' ||
      payload.role !== 'admin' ||
      payload.mfa !== true ||
      !Array.isArray(payload.amr) ||
      !payload.amr.includes('pwd') ||
      !payload.amr.includes('otp') ||
      typeof payload.sub !== 'string' ||
      typeof payload.jti !== 'string' ||
      !payload.jti ||
      !Number.isFinite(payload.iat) ||
      !Number.isFinite(payload.exp)) {
    throw new HttpError(401, 'Invalid admin token');
  }

  const tokenDigest = crypto.createHash('sha256').update(token).digest('hex');

  const { rows } = await pool.query(
    'SELECT id, name, email, is_active, EXISTS (SELECT 1 FROM admin_token_revocations WHERE token_digest = $2) AS token_revoked FROM admin_users WHERE id = $1 LIMIT 1',
    [payload.sub, tokenDigest],
  );
  const admin = rows[0];

  if (!admin || !admin.is_active) throw new HttpError(401, 'Invalid or inactive admin account');
  if (admin.token_revoked) throw new HttpError(401, 'This session has been signed out');

  req.admin = { id: admin.id, name: admin.name, email: admin.email, is_active: admin.is_active };
  req.adminSession = { tokenDigest, expiresAt: new Date(payload.exp * 1000), jwtId: payload.jti };
  next();
});

module.exports = { requireAdmin };
