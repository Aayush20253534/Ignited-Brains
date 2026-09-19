const { app } = require('./app');
const { pool } = require('./db');
const { config, validateRuntimeConfig } = require('./config');

validateRuntimeConfig();
app.set('trust proxy', config.trustProxy);

const server = app.listen(config.port, () => {
  console.log(`[api] Ignited Brains backend listening on port ${config.port}`);
});

const shutdown = async (signal) => {
  console.log(`[api] ${signal} received, shutting down`);
  server.close(async () => {
    await pool.end().catch((error) => console.error('[db] shutdown error', error));
    process.exit(0);
  });

  setTimeout(() => process.exit(1), 10_000).unref();
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
