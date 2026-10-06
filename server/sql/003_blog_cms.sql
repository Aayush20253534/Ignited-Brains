BEGIN;

CREATE TABLE IF NOT EXISTS blogs (
  id TEXT PRIMARY KEY,
  legacy_key TEXT UNIQUE,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(120) NOT NULL UNIQUE,
  excerpt VARCHAR(600) NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category VARCHAR(100) NOT NULL DEFAULT '',
  tags TEXT[] NOT NULL DEFAULT '{}',
  featured_image TEXT NOT NULL DEFAULT '',
  image_alt VARCHAR(300) NOT NULL DEFAULT '',
  image_caption VARCHAR(500) NOT NULL DEFAULT '',
  author VARCHAR(120) NOT NULL DEFAULT 'Ignited Brains',
  seo_title VARCHAR(200) NOT NULL DEFAULT '',
  seo_description VARCHAR(320) NOT NULL DEFAULT '',
  status VARCHAR(16) NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT','PUBLISHED','ARCHIVED')),
  published_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ,
  view_count BIGINT NOT NULL DEFAULT 0 CHECK (view_count >= 0),
  impression_count BIGINT NOT NULL DEFAULT 0 CHECK (impression_count >= 0),
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS blog_slug_aliases (
  slug VARCHAR(120) PRIMARY KEY,
  blog_id TEXT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS blog_migrations (
  name TEXT PRIMARY KEY,
  source_sha256 TEXT NOT NULL,
  article_count INTEGER NOT NULL,
  verified_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS blog_events (
  blog_id TEXT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  visitor_digest TEXT NOT NULL,
  event_kind VARCHAR(12) NOT NULL CHECK (event_kind IN ('IMPRESSION','VIEW')),
  event_day DATE NOT NULL DEFAULT (NOW() AT TIME ZONE 'UTC')::date,
  source VARCHAR(12) NOT NULL CHECK (source IN ('LISTING','RELATED','ARTICLE')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (blog_id, visitor_digest, event_kind, event_day)
);
CREATE TABLE IF NOT EXISTS blog_media (
  id TEXT PRIMARY KEY,
  content_hash TEXT NOT NULL UNIQUE,
  mime_type VARCHAR(40) NOT NULL CHECK (mime_type = 'image/webp'),
  bytes BYTEA NOT NULL CHECK (octet_length(bytes) <= 716800),
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  uploaded_by TEXT REFERENCES admin_users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_blogs_public ON blogs(status,published_at DESC,id);
CREATE INDEX IF NOT EXISTS idx_blogs_admin ON blogs(status,updated_at DESC,id);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category,status);
CREATE INDEX IF NOT EXISTS idx_blogs_tags ON blogs USING gin(tags);
CREATE INDEX IF NOT EXISTS idx_blog_events_date ON blog_events(event_day,event_kind);
CREATE INDEX IF NOT EXISTS idx_contact_type_created ON contact_submissions((NULLIF(BTRIM(organization),'')),created_at DESC);

COMMIT;
