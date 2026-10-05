const fs = require('fs/promises');
const path = require('path');
const { pool } = require('../src/db');
const { validateDatabaseConfig } = require('../src/config');

async function main() {
  validateDatabaseConfig();
  const directory = path.join(__dirname, '..', 'sql');
  const migrations = (await fs.readdir(directory)).filter((file) => file.endsWith('.sql')).sort();
  for (const migration of migrations) {
    const sql = await fs.readFile(path.join(directory, migration), 'utf8');
    await pool.query(sql);
  }
  console.log('Database migration completed.');
}

main()
  .catch((error) => {
    console.error('Database migration failed:', error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
