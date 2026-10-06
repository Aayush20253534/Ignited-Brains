const fs = require('fs/promises');
const path = require('path');
const { pool } = require('../src/db');
const { validateDatabaseConfig } = require('../src/config');
const { transaction } = require('../src/utils/transaction');
const { migrateExistingBlogs } = require('../src/services/migrate-blogs');

async function main() {
  validateDatabaseConfig();
  const directory = path.join(__dirname, '..', 'sql');
  const migrations = (await fs.readdir(directory)).filter((file) => file.endsWith('.sql')).sort();
  for (const migration of migrations) {
    const sql = await fs.readFile(path.join(directory, migration), 'utf8');
    await pool.query(sql);
  }
  const blogs = await transaction(migrateExistingBlogs);
  console.log(`Existing blog migration verified: ${blogs.articles} articles${blogs.migrated ? ' inserted' : ' already migrated'}.`);
  console.log('Database migration completed.');
}

main()
  .catch((error) => {
    console.error('Database migration failed:', error);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
