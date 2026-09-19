const path = require('path');

if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile(path.join(__dirname, '..', '.env'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

const parseInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const parseBoolean = (value, fallback = false) => {
  if (value === undefined) return fallback;
  return ['1', 'true', 'yes', 'on'].includes(String(value).toLowerCase());
};

const parseTrustProxy = (value) => {
  const raw = String(value ?? '1').trim();
  if (/^\d+$/.test(raw)) return Number(raw);
  if (raw.toLowerCase() === 'true') return true;
  if (raw.toLowerCase() === 'false') return false;
  return raw;
};

const splitCsv = (value) =>
  String(value || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInteger(process.env.PORT, 5000),
  databaseUrl: process.env.DATABASE_URL || '',
  databaseSsl: parseBoolean(process.env.DATABASE_SSL, false),
  dbPoolMax: parseInteger(process.env.DB_POOL_MAX, 10),
  clientOrigins: splitCsv(process.env.CLIENT_ORIGINS),
  trustProxy: parseTrustProxy(process.env.TRUST_PROXY),
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  jwtIssuer: process.env.JWT_ISSUER || 'ignited-brains-api',
  jwtAudience: process.env.JWT_AUDIENCE || 'ignited-brains-admin',
  resendApiKey: process.env.RESEND_API_KEY || '',
  resendFrom: process.env.RESEND_FROM || '',
  notificationTo: process.env.NOTIFICATION_TO || '',
};

function validateDatabaseConfig() {
  if (!config.databaseUrl) throw new Error('Missing or invalid configuration: DATABASE_URL');
}

function validateRuntimeConfig() {
  const missing = [];

  if (!config.databaseUrl) missing.push('DATABASE_URL');
  if (!config.jwtSecret || config.jwtSecret.length < 32) {
    missing.push('JWT_SECRET (minimum 32 characters)');
  }

  if (config.nodeEnv === 'production') {
    if (config.clientOrigins.length === 0) missing.push('CLIENT_ORIGINS');
    if (!config.resendApiKey) missing.push('RESEND_API_KEY');
    if (!config.resendFrom) missing.push('RESEND_FROM');
    if (!config.notificationTo) missing.push('NOTIFICATION_TO');
  }

  if (missing.length > 0) {
    throw new Error(`Missing or invalid configuration: ${missing.join(', ')}`);
  }
}

module.exports = { config, validateDatabaseConfig, validateRuntimeConfig };
