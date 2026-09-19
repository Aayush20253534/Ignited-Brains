const fs = require('fs/promises');
const path = require('path');
const { pool } = require('../src/db');
const { validateDatabaseConfig } = require('../src/config');

async function main() {
  validateDatabaseConfig();
  const sql = await fs.readFile(path.join(__dirname, '..', 'sql', '001_initial.sql'), 'utf8');
  await pool.query(sql);
  console.log('Database migration completed.');
}

main()
  .catch((error) => {
    console.error('Database migration failed:', error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
