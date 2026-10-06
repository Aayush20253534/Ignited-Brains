BEGIN;

CREATE TABLE IF NOT EXISTS gallery_items (
  id TEXT PRIMARY KEY,
  media_id TEXT NOT NULL REFERENCES blog_media(id) ON DELETE RESTRICT,
  title VARCHAR(180) NOT NULL,
  caption VARCHAR(500) NOT NULL DEFAULT '',
  alt_text VARCHAR(300) NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'Other',
  location VARCHAR(180),
  event_date DATE,
  display_order INTEGER NOT NULL DEFAULT 0 CHECK (display_order >= 0),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  status VARCHAR(16) NOT NULL DEFAULT 'DRAFT'
    CHECK (status IN ('DRAFT','PUBLISHED','ARCHIVED')),
  version INTEGER NOT NULL DEFAULT 1,
  uploaded_by TEXT REFERENCES admin_users(id),
  archived_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_gallery_public
  ON gallery_items (status, display_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_category
  ON gallery_items (category, status);
CREATE INDEX IF NOT EXISTS idx_gallery_featured
  ON gallery_items (is_featured, status, display_order ASC);

COMMIT;
