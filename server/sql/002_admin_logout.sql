BEGIN;

-- Store only a token digest, never the bearer credential itself.
CREATE TABLE IF NOT EXISTS admin_token_revocations (
  token_digest CHAR(64) PRIMARY KEY,
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admin_token_revocations_expiry_idx
  ON admin_token_revocations (expires_at);

COMMIT;
