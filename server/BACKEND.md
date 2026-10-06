# Ignited Brains backend

This backend provides public contact/application submission APIs and a JWT-protected admin API.

## What is included

- PostgreSQL persistence for contact enquiries, student applications, organization applications and admin users.
- Resend notifications for every successful public submission.
- Argon2id password hashing for admin accounts.
- HS256-signed JWT admin sessions with issuer/audience validation and persistent logout revocation.
- Paginated admin contact/application lists, search, status filters and student/organization filters.
- Individual submission detail endpoints and status update endpoints.
- CORS allow-listing, request IDs, body-size limits and simple abuse throttling.
- Database-first submission flow: a Resend failure never loses the submitted form data.

## Setup

After applying this patch, run this once so `package-lock.json` is regenerated for the new backend dependencies:

```bash
cd server
npm install
```

Copy `.env.example` to `.env` locally and fill in real values. Never commit `.env`.

Create the schema:

```bash
npm run db:migrate
```

Create the first admin account after setting `ADMIN_NAME`, `ADMIN_EMAIL` and `ADMIN_PASSWORD`:

```bash
npm run admin:create
```

Start development:

```bash
npm run dev
```

## Public API

### `POST /api/v1/contact`

```json
{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "phone": "+91 9876543210",
  "organization": "Example Public School",
  "subject": "Science kit enquiry",
  "message": "Please share details for your middle-school science kits."
}
```

### `POST /api/v1/applications` - student

```json
{
  "applicantType": "STUDENT",
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "phone": "+91 9876543210",
  "city": "Prayagraj",
  "state": "Uttar Pradesh",
  "message": "I would like to start this initiative in my school.",
  "details": {
    "institutionName": "Example Public School",
    "educationLevel": "Class 11",
    "interestArea": "Astronomy and space science",
    "proposalDetails": "I want to propose a small astronomy/space learning setup and student club in my school.",
    "wantsInstitutionSetup": true,
    "setupInterest": "Space lab and astronomy workshops",
    "institutionCity": "Prayagraj"
  }
}
```

### `POST /api/v1/applications` - organization

```json
{
  "applicantType": "ORGANIZATION",
  "name": "Dr. Meera Singh",
  "email": "principal@example.edu",
  "phone": "+91 9876543210",
  "city": "Lucknow",
  "state": "Uttar Pradesh",
  "details": {
    "organizationName": "Example Inter College",
    "organizationType": "SCHOOL",
    "designation": "Principal",
    "institutionAddress": "Lucknow, Uttar Pradesh",
    "requestedSolutions": ["SCIENCE_PARK", "SPACE_LAB", "TEACHER_TRAINING"],
    "requirementDetails": "We want a turnkey science and space learning installation for classes 6-12.",
    "estimatedStudents": 1200,
    "timeline": "Within 3 months",
    "budgetRange": "To be discussed"
  }
}
```

Allowed organization types: `SCHOOL`, `COLLEGE`, `UNIVERSITY`, `GOVERNMENT`, `NGO`, `COMPANY`, `OTHER`.

Allowed requested solutions: `SCIENCE_KITS`, `SCIENCE_PARK`, `SPACE_LAB`, `STEM_LAB`, `WORKSHOP_TRAINING`, `TEACHER_TRAINING`, `CUSTOM`.

## Admin API

Login:

```http
POST /api/v1/admin/auth/login
Content-Type: application/json

{"email":"admin@example.com","password":"your-password"}
```

Use the returned token as `Authorization: Bearer <token>`.

- `GET /api/v1/admin/auth/me`
- `POST /api/v1/admin/auth/logout` (send the current bearer token; ends that session)
- `GET /api/v1/admin/dashboard/summary`
- `GET /api/v1/admin/contacts?page=1&limit=20&status=NEW&query=school`
- `GET /api/v1/admin/contacts/:id`
- `PATCH /api/v1/admin/contacts/:id/status`
- `GET /api/v1/admin/applications?page=1&limit=20&type=STUDENT&status=NEW&query=astronomy`
- `GET /api/v1/admin/applications/:id`
- `PATCH /api/v1/admin/applications/:id/status`

Contact statuses: `NEW`, `IN_PROGRESS`, `RESOLVED`, `ARCHIVED`.

Application statuses: `NEW`, `IN_REVIEW`, `CONTACTED`, `APPROVED`, `REJECTED`, `ARCHIVED`.

## Deployment notes

Set all production environment variables from `.env.example`. `RESEND_FROM` must use a sender/domain approved by Resend. `NOTIFICATION_TO` is the inbox that should receive new contact/application notifications.

`npm start` applies all idempotent SQL migrations before starting the API, including
`002_admin_logout.sql`. When starting with `node src/server.js` or `npm run dev`,
run `npm run db:migrate` first. The database role must be allowed to create the
revocation table/index. Create the initial admin once and do not expose
`ADMIN_PASSWORD` longer than necessary after bootstrap.

Logout stores a SHA-256 token digest until the JWT expires. Every protected route
checks the shared PostgreSQL revocation table, so signing out also invalidates a
copied bearer token and works across server restarts/instances. Other sessions
remain valid. The frontend clears its token, pending requests and loaded records
before showing the signed-out confirmation; a failed logout offers a retry.

`npm test` runs validation and real HTTP/authentication/persistence tests against
an isolated in-memory PostgreSQL engine (PGlite). It needs no production database
or notification credentials.

Set `API_ORIGIN` on the deployed Next.js frontend to this server's HTTPS origin.
The frontend uses a same-origin `/api/v1/*` bridge, so its browser requests do
not need a public API URL or cross-origin access. Set `CLIENT_ORIGINS` here to
the frontend URL as required by the production server configuration.

## Blog CMS and migration

The public blog, article routes, SEO metadata and sitemap read `blogs` in the same
PostgreSQL database as Admin. There is no hardcoded public fallback. Drafts and
archived articles are excluded from all public reads. Existing and new articles
use the same authenticated edit, preview, publish and archive controls.

Deploy the backend before the frontend. `npm start` applies `003_blog_cms.sql`
and imports the six existing code articles before accepting requests. For a
custom process command or local development, run this first:

```bash
npm run db:migrate
```

The migration uses the immutable `data/legacy-blogs.json` archive. It preserves
all original titles, excerpts, sections, lists, resources, categories, images,
image descriptions/captions, author, publication dates and SEO fields. Original
article anchors survive in Markdown headings. A transaction verifies all six
records and aliases before committing the migration marker. A failure rolls
back every import and prevents startup. Keep a database backup before deploying
schema changes, using the existing database provider's backup process.

`legacy_key` and the migration marker make repeated execution safe even after an
admin renames or archives an article. Restarting does not overwrite CMS edits or
resurrect removed articles. The marker also checks that all six internal records
still exist. Do not edit the migration archive or hard-delete migrated rows.
The optional `npm run blogs:migrate` command verifies/imports the archive after
the schema has been installed. It reports the six-record migration outcome.

Public endpoints:

- `GET /api/v1/blogs?page=1&limit=12&category=Space%20Education&query=lab`
- `GET /api/v1/blogs/:slug` (published articles only; old aliases resolve to the canonical slug)
- `GET /api/v1/blogs/sitemap` (current canonical published URLs only)
- `POST /api/v1/blog-events` (`blogId`, random `visitorId`, `kind`, `source`)
- `GET /api/v1/media/:id` (immutable, optimized WebP image)

Authenticated CMS endpoints:

- `GET /api/v1/admin/blogs?page=1&limit=5&status=DRAFT&category=STEM&query=robot`
- `GET /api/v1/admin/blogs/:id`
- `POST /api/v1/admin/blogs`
- `PATCH /api/v1/admin/blogs/:id` (complete editable fields plus current `version`)
- `POST /api/v1/admin/blogs/:id/archive` (`version` required)
- `GET /api/v1/admin/blog-assets`
- `POST /api/v1/admin/blog-media` (raw JPG/PNG/WebP body and corresponding Content-Type)

Editable fields are `title`, `slug`, `excerpt`, `content` (Markdown), `category`,
`tags` (array), `image`, `imageAlt`, `imageCaption`, `author`, `seoTitle`,
`seoDescription`, `publishedAt` (ISO timestamp or null), and `status` (`DRAFT` or
`PUBLISHED`). Publishing requires the title, valid unique slug, excerpt, content,
category, featured image and image description. Dates cannot be in the future.
PATCH and archive return 409 on a stale version, preventing lost updates. Saving
an archived record restores it as the selected Draft or Published status.

Changing a slug reserves its previous URLs permanently. Public Next.js article
routes return a 308 redirect to the current canonical URL. Archive removes all
aliases from public availability and excludes the article from the sitemap,
while retaining content, timestamps, aliases and analytics internally. The UI
requires confirmation. There is no destructive delete API.

Uploads are authenticated and rate limited. The server checks actual image
format, rejects animated/invalid images, enforces 5 MB input, at least 100×100
pixels and at most 20 megapixels, then rotates/resizes to at most 1600×1600 and
encodes WebP. Optimized output is capped at 700 KiB. Content hashes deduplicate
uploads. A separate `blog_media` table stores bounded binary bytes; article
records store only a URL. Images survive server restarts and deploys. No base64
article fields or ephemeral local uploads are used. The original static website
photos remain unchanged. To refresh the existing-image picker after adding
static assets, update `data/image-assets.json` with the paths in `client/public`.

Impressions require a listing/related card to be at least 50% visible for one
continuous second. Views require the article to be open in a visible tab for one
second. Client session storage holds a random anonymous UUID and deduplication
markers; the database stores an HMAC digest, event kind, source and UTC date.
No IP addresses, fingerprints, names or emails are stored in blog events.
A unique database key deduplicates each metric per article/session/day, and the
insert plus separate counter increment is atomic. Raw SSR, prefetching, draft
previews and repeated scrolling/refreshing do not inflate counts. Basic bot
user agents are ignored. These are anonymous session metrics, not unique-person
counts; untracked historical visits are not invented. Counts are exposed only
by authenticated Admin APIs and survive archive/restore.

Enquiry/application list APIs now also accept `dateFrom`, `dateTo` (inclusive
YYYY-MM-DD days in Asia/Kolkata), and `sort=newest|oldest`. Contact `type` accepts
`INDIVIDUAL` or `ORGANIZATION`, determined from the submitted organisation field.
Application search includes locations, messages and all submitted details.
Dashboard seven-day activity comes from real submission dates.
