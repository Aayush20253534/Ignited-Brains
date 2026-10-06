const fs = require('node:fs/promises');
const path = require('node:path');
const { PGlite } = require('@electric-sql/pglite');
const argon2 = require('argon2');
const crypto = require('node:crypto');

// The application runs unchanged; only its database connection points to an
// isolated PostgreSQL engine. Never read/write a deployment database or send mail.
async function createTestApi({ port = 0 } = {}) {
  Object.assign(process.env, {
    NODE_ENV: 'test', DATABASE_URL: 'postgres://test@127.0.0.1/isolated_test',
    JWT_SECRET: 'isolated-test-secret-with-at-least-32-characters',
    JWT_ISSUER: 'ignited-brains-api', JWT_AUDIENCE: 'ignited-brains-admin',
    JWT_EXPIRES_IN: '8h', CLIENT_ORIGINS: '',
    RESEND_API_KEY: '', RESEND_FROM: '', NOTIFICATION_TO: '',
  });
  const database = new PGlite();
  await database.waitReady;
  const migrationDirectory = path.join(__dirname, '..', '..', 'sql');
  const migrations = (await fs.readdir(migrationDirectory)).filter(file => file.endsWith('.sql')).sort();
  async function migrate() {
    for (const filename of migrations) await database.exec(await fs.readFile(path.join(migrationDirectory, filename), 'utf8'));
    await database.exec('BEGIN');
    try {
      await require('../../src/services/migrate-blogs').migrateExistingBlogs(database);
      await database.exec('COMMIT');
    } catch (error) { await database.exec('ROLLBACK'); throw error; }
  }
  await migrate();
  const { pool } = require('../../src/db');
  const originalQuery = pool.query;
  const originalConnect = pool.connect;
  let queue = Promise.resolve();
  async function acquire() {
    const previous = queue;
    let release;
    queue = new Promise(resolve => { release = resolve; });
    await previous;
    return release;
  }
  pool.query = async (sql, parameters) => {
    const release = await acquire();
    try { return await database.query(sql, parameters); } finally { release(); }
  };
  pool.connect = async () => {
    const release = await acquire();
    return { query: (sql, parameters) => database.query(sql, parameters), release };
  };
  const { app } = require('../../src/app');
  const password = crypto.randomBytes(24).toString('hex');
  const admin = { id: crypto.randomUUID(), name: 'Verification Administrator', email: 'verification@example.test', password };
  await database.query('INSERT INTO admin_users (id, name, email, password_hash) VALUES ($1, $2, $3, $4)', [admin.id, admin.name, admin.email, await argon2.hash(password, { type: argon2.argon2id })]);
  const server = await new Promise(resolve => { const instance = app.listen(port, '127.0.0.1', () => resolve(instance)); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  async function request(route, { token, body, method = 'GET' } = {}) {
    const response = await fetch(origin + route, { method, headers: { Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
    return { status: response.status, data: await response.json(), headers: response.headers };
  }
  async function login() { return request('/api/v1/admin/auth/login', { method: 'POST', body: { email: admin.email, password } }); }
  async function close() {
    await new Promise(resolve => server.close(resolve));
    pool.query = originalQuery;
    pool.connect = originalConnect;
    await pool.end();
    await database.close();
  }
  return { database, admin, origin, request, login, migrate, close };
}

module.exports = { createTestApi };
