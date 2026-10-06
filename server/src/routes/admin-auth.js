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
const { sendAdminOtp } = require('../services/resend');

const router = express.Router();

const OTP_TTL_MS = 10 * 60 * 1000;
const OTP_EXPIRES_MINUTES = 10;
const OTP_MAX_ATTEMPTS = 5;

const loginLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 8,
  key: (req) => String(req.ip || '') + ':' + normalizeEmail(req.body?.email || ''),
});

const otpLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 12,
  key: (req) => String(req.ip || '') + ':' + String(req.body?.challengeId || '').slice(0, 80),
});

const resendLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 4,
  key: (req) => String(req.ip || '') + ':' + String(req.body?.challengeId || '').slice(0, 80),
});

function createOtp() {
  return crypto.randomInt(0, 1_000_000).toString().padStart(6, '0');
}

function otpDigest(challengeId, otp) {
  return crypto.createHmac('sha256', config.jwtSecret).update(challengeId + ':' + otp).digest('hex');
}

function secureDigestEqual(left, right) {
  const a = Buffer.from(String(left || ''), 'utf8');
  const b = Buffer.from(String(right || ''), 'utf8');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function maskedEmail(email) {
  const [local, domain] = String(email || '').split('@');
  if (!local || !domain) return 'your administrator email';
  const visible = local.slice(0, Math.min(2, local.length));
  return visible + '*'.repeat(Math.max(2, local.length - visible.length)) + '@' + domain;
}

function issueAdminToken(admin) {
  return jwt.sign(
    { role: 'admin', mfa: true, amr: ['pwd', 'otp'] },
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
}

async function cleanupChallenges() {
  await pool.query(
    "DELETE FROM admin_login_challenges WHERE expires_at < NOW() - INTERVAL '1 day' OR consumed_at < NOW() - INTERVAL '1 day'"
  );
}

async function deliverOtp(admin, code) {
  if (config.nodeEnv === 'test') return { status: 'SENT', id: 'test-delivery' };
  return sendAdminOtp({
    email: admin.email,
    name: admin.name,
    code,
    expiresMinutes: OTP_EXPIRES_MINUTES,
  });
}

router.post('/login', loginLimiter, asyncHandler(async (req, res) => {
  const email = normalizeEmail(req.body?.email);
  const password = String(req.body?.password || '').slice(0, 500);

  if (!email || !password) throw new HttpError(400, 'Email and password are required');

  const { rows } = await pool.query(
    'SELECT id, name, email, password_hash, is_active FROM admin_users WHERE email = $1 LIMIT 1',
    [email],
  );
  const admin = rows[0];

  if (!admin || !admin.is_active) throw new HttpError(401, 'Invalid email or password');

  const valid = await argon2.verify(admin.password_hash, password).catch(() => false);
  if (!valid) throw new HttpError(401, 'Invalid email or password');

  await cleanupChallenges();
  await pool.query(
    'UPDATE admin_login_challenges SET consumed_at = NOW() WHERE admin_id = $1 AND consumed_at IS NULL',
    [admin.id],
  );

  const challengeId = crypto.randomUUID();
  const otp = createOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await pool.query(
    'INSERT INTO admin_login_challenges (id, admin_id, code_digest, expires_at, attempts_remaining, requested_ip) VALUES ($1, $2, $3, $4, $5, $6)',
    [challengeId, admin.id, otpDigest(challengeId, otp), expiresAt, OTP_MAX_ATTEMPTS, String(req.ip || '').slice(0, 128)],
  );

  const delivery = await deliverOtp(admin, otp);
  if (delivery.status !== 'SENT') {
    await pool.query('DELETE FROM admin_login_challenges WHERE id = $1', [challengeId]);
    throw new HttpError(503, 'Unable to send verification code. Please try again.');
  }

  res.status(202).json({
    requiresOtp: true,
    challengeId,
    maskedEmail: maskedEmail(admin.email),
    expiresInSeconds: Math.floor(OTP_TTL_MS / 1000),
    ...(config.nodeEnv === 'test' ? { testOtp: otp } : {}),
  });
}));

router.post('/verify-otp', otpLimiter, asyncHandler(async (req, res) => {
  const challengeId = String(req.body?.challengeId || '').trim().slice(0, 80);
  const otp = String(req.body?.otp || '').trim();

  if (!challengeId || !/^\d{6}$/.test(otp)) {
    throw new HttpError(400, 'A valid six-digit verification code is required');
  }

  const { rows } = await pool.query(
    "SELECT c.id, c.admin_id, c.code_digest, c.expires_at, c.attempts_remaining, c.consumed_at, u.name, u.email, u.is_active FROM admin_login_challenges c JOIN admin_users u ON u.id = c.admin_id WHERE c.id = $1 LIMIT 1",
    [challengeId],
  );
  const challenge = rows[0];

  if (!challenge || !challenge.is_active || challenge.consumed_at || new Date(challenge.expires_at).getTime() <= Date.now()) {
    throw new HttpError(401, 'Verification challenge expired or invalid. Sign in again.');
  }
  if (Number(challenge.attempts_remaining) <= 0) {
    throw new HttpError(401, 'Verification challenge locked. Sign in again.');
  }

  const expected = otpDigest(challengeId, otp);
  if (!secureDigestEqual(challenge.code_digest, expected)) {
    const attempt = await pool.query(
      "UPDATE admin_login_challenges SET attempts_remaining = GREATEST(attempts_remaining - 1, 0), consumed_at = CASE WHEN attempts_remaining <= 1 THEN NOW() ELSE consumed_at END WHERE id = $1 AND consumed_at IS NULL RETURNING attempts_remaining",
      [challengeId],
    );
    const remaining = Number(attempt.rows[0]?.attempts_remaining || 0);
    throw new HttpError(401, remaining > 0 ? 'Invalid verification code' : 'Verification challenge locked. Sign in again.');
  }

  const consumed = await pool.query(
    'UPDATE admin_login_challenges SET consumed_at = NOW() WHERE id = $1 AND consumed_at IS NULL AND expires_at > NOW() AND attempts_remaining > 0 RETURNING admin_id',
    [challengeId],
  );
  if (!consumed.rows[0]) throw new HttpError(401, 'Verification challenge expired or invalid. Sign in again.');

  await pool.query(
    'UPDATE admin_users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1',
    [challenge.admin_id],
  );

  const admin = { id: challenge.admin_id, name: challenge.name, email: challenge.email };
  const token = issueAdminToken(admin);
  await cleanupChallenges();

  res.json({
    token,
    expiresIn: config.jwtExpiresIn,
    admin,
  });
}));

router.post('/otp/resend', resendLimiter, asyncHandler(async (req, res) => {
  const previousId = String(req.body?.challengeId || '').trim().slice(0, 80);
  if (!previousId) throw new HttpError(400, 'Verification challenge is required');

  const { rows } = await pool.query(
    "SELECT c.admin_id, u.name, u.email, u.is_active FROM admin_login_challenges c JOIN admin_users u ON u.id = c.admin_id WHERE c.id = $1 AND c.consumed_at IS NULL AND c.expires_at > NOW() LIMIT 1",
    [previousId],
  );
  const admin = rows[0];
  if (!admin || !admin.is_active) throw new HttpError(401, 'Verification challenge expired or invalid. Sign in again.');

  const challengeId = crypto.randomUUID();
  const otp = createOtp();
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await pool.query(
    'INSERT INTO admin_login_challenges (id, admin_id, code_digest, expires_at, attempts_remaining, requested_ip) VALUES ($1, $2, $3, $4, $5, $6)',
    [challengeId, admin.admin_id, otpDigest(challengeId, otp), expiresAt, OTP_MAX_ATTEMPTS, String(req.ip || '').slice(0, 128)],
  );

  const delivery = await deliverOtp({ id: admin.admin_id, name: admin.name, email: admin.email }, otp);
  if (delivery.status !== 'SENT') {
    await pool.query('DELETE FROM admin_login_challenges WHERE id = $1', [challengeId]);
    throw new HttpError(503, 'Unable to resend verification code. Please try again.');
  }

  await pool.query('UPDATE admin_login_challenges SET consumed_at = NOW() WHERE id = $1', [previousId]);

  res.status(202).json({
    requiresOtp: true,
    challengeId,
    maskedEmail: maskedEmail(admin.email),
    expiresInSeconds: Math.floor(OTP_TTL_MS / 1000),
    ...(config.nodeEnv === 'test' ? { testOtp: otp } : {}),
  });
}));

router.get('/me', requireAdmin, (req, res) => {
  res.json({ admin: req.admin });
});

router.post('/logout', requireAdmin, asyncHandler(async (req, res) => {
  await pool.query(
    'INSERT INTO admin_token_revocations (token_digest, expires_at) VALUES ($1, $2) ON CONFLICT (token_digest) DO NOTHING',
    [req.adminSession.tokenDigest, req.adminSession.expiresAt],
  );
  await pool.query('DELETE FROM admin_token_revocations WHERE expires_at <= NOW()');
  res.json({ message: 'Your administrator session has ended.' });
}));

module.exports = router;
