const jwt = require('jsonwebtoken');
const { config } = require('../config');
const { pool } = require('../db');
const { HttpError, asyncHandler } = require('../utils/http');

const requireAdmin = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    throw new HttpError(401, 'Authentication required');
  }

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

  const { rows } = await pool.query(
    'SELECT id, name, email, is_active FROM admin_users WHERE id = $1 LIMIT 1',
    [payload.sub],
  );
  const admin = rows[0];

  if (!admin || !admin.is_active) throw new HttpError(401, 'Invalid or inactive admin account');

  req.admin = admin;
  next();
});

module.exports = { requireAdmin };
