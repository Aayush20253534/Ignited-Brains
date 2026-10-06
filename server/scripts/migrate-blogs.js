const { pool } = require('../src/db');
const { validateDatabaseConfig } = require('../src/config');
const { transaction } = require('../src/utils/transaction');
const { migrateExistingBlogs } = require('../src/services/migrate-blogs');

validateDatabaseConfig();
transaction(migrateExistingBlogs)
  .then(result => console.log(`Existing blog migration verified: ${result.articles} articles; ${result.migrated ? 'inserted' : 'no changes'}.`))
  .catch(error => { console.error('Blog migration failed:', error.message); process.exitCode = 1; })
  .finally(() => pool.end());
