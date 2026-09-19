BEGIN;

CREATE TABLE IF NOT EXISTS admin_users (
  id TEXT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(320) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id TEXT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(32),
  organization VARCHAR(180),
  subject VARCHAR(180),
  message TEXT NOT NULL,
  status VARCHAR(24) NOT NULL DEFAULT 'NEW'
    CHECK (status IN ('NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED')),
  notification_status VARCHAR(24) NOT NULL DEFAULT 'PENDING'
    CHECK (notification_status IN ('PENDING', 'SENT', 'FAILED', 'SKIPPED')),
  notification_id TEXT,
  notification_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  applicant_type VARCHAR(24) NOT NULL
    CHECK (applicant_type IN ('STUDENT', 'ORGANIZATION')),
  name VARCHAR(120) NOT NULL,
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  city VARCHAR(120),
  state VARCHAR(120),
  message TEXT,
  details JSONB NOT NULL DEFAULT '{}'::jsonb
    CHECK (jsonb_typeof(details) = 'object'),
  status VARCHAR(24) NOT NULL DEFAULT 'NEW'
    CHECK (status IN ('NEW', 'IN_REVIEW', 'CONTACTED', 'APPROVED', 'REJECTED', 'ARCHIVED')),
  notification_status VARCHAR(24) NOT NULL DEFAULT 'PENDING'
    CHECK (notification_status IN ('PENDING', 'SENT', 'FAILED', 'SKIPPED')),
  notification_id TEXT,
  notification_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status_created_at
  ON contact_submissions (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email
  ON contact_submissions (LOWER(email));

CREATE INDEX IF NOT EXISTS idx_applications_created_at
  ON applications (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_type_created_at
  ON applications (applicant_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_status_created_at
  ON applications (status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_applications_email
  ON applications (LOWER(email));

COMMIT;
