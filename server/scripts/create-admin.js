const crypto = require('crypto');
const argon2 = require('argon2');
const { pool } = require('../src/db');
const { validateDatabaseConfig } = require('../src/config');
const { cleanString, normalizeEmail, isValidEmail } = require('../src/utils/text');

async function main() {
  validateDatabaseConfig();

  const name = cleanString(process.env.ADMIN_NAME || 'Ignited Brains Admin', 120);
  const email = normalizeEmail(process.env.ADMIN_EMAIL);
  const password = String(process.env.ADMIN_PASSWORD || '');

  if (!isValidEmail(email)) throw new Error('ADMIN_EMAIL must be a valid email address');
  if (password.length < 12) throw new Error('ADMIN_PASSWORD must be at least 12 characters');

  const existing = await pool.query('SELECT id FROM admin_users WHERE email = $1 LIMIT 1', [email]);
  if (existing.rows[0]) {
    throw new Error('An admin with this email already exists. Refusing to overwrite its password.');
  }

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19_456,
    timeCost: 2,
    parallelism: 1,
  });

  const id = crypto.randomUUID();
  await pool.query(
    'INSERT INTO admin_users (id, name, email, password_hash) VALUES ($1, $2, $3, $4)',
    [id, name, email, passwordHash],
  );

  console.log(`Admin created: ${email}`);
}

main()
  .catch((error) => {
    console.error('Admin creation failed:', error.message || error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
