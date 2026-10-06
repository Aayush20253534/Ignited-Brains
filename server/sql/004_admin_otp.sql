BEGIN;

CREATE TABLE IF NOT EXISTS admin_login_challenges (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  code_digest CHAR(64) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  attempts_remaining SMALLINT NOT NULL DEFAULT 5 CHECK (attempts_remaining >= 0 AND attempts_remaining <= 10),
  requested_ip VARCHAR(128),
  consumed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_login_challenges_admin
  ON admin_login_challenges (admin_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_admin_login_challenges_expiry
  ON admin_login_challenges (expires_at);

COMMIT;
