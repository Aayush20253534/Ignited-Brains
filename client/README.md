# Ignited Brains

Production frontend rebuilt in Next.js from the supplied design references.

## Requirements

- Node.js 20.9+
- npm 10+

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## API connection

Run the Express service in `../server` on port 5000 (see its `BACKEND.md`).
The contact form, student and organisation applications, and admin portal use
the same-origin `/api/v1/*` route. Next.js forwards those requests to Express.

For a deployed frontend, set `API_ORIGIN` in the frontend hosting environment to
the public HTTPS origin of the deployed Express service, for example
`https://api.example.com` (no `/api/v1` suffix). This is a server-side variable;
redeploy the frontend after configuring it. In local development it defaults to
`http://localhost:5000`. Production requests return a configuration error if
`API_ORIGIN` is absent. Do not set the old `NEXT_PUBLIC_API_URL` variable.

Configure the backend's `DATABASE_URL`, Resend and JWT variables, run its
migration, and create the first admin as described in `../server/BACKEND.md`.
The backend still requires `CLIENT_ORIGINS` in production; set it to the
frontend's full URL (for example `https://www.example.com`). No credentials
are stored in this repository.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run assets:check
```

## Implementation status

- Part 0: project foundation ✅
- Part 1: design system and reusable UI primitives ✅
- Part 2: shared navbar, navigation, CTA band and footer ✅
- Part 3: asset architecture, reusable image wrappers and visual asset validation ✅
- Part 4+: screenshot-matched pages

## Production checks

```bash
npm run assets:check
npm run production:check
npm run typecheck
npm run lint
npm run build
```

Or run the non-build checks together:

```bash
npm run check
```

## Blog CMS

Blog content is managed at `/admin` → Blog Management. The Express service must
be migrated/deployed before this frontend. Its startup migration imports all six
original articles, keeping their URLs, photos, complete text and publication
dates. Public pages, metadata and the sitemap read only PostgreSQL at request
time. See [the backend guide](../server/BACKEND.md#blog-cms-and-migration).

The editor supports Markdown formatting, existing photos or optimized uploads,
categories, tags, author, publication dates and SEO fields. Preview stays inside
the authenticated drawer. Save Draft hides an article publicly; Publish makes it
available immediately on subsequent requests. Remove Blog archives the record
with confirmation. Archived records remain editable/restorable with analytics
intact. Old slugs redirect after a rename.

Impressions and article views are tracked separately from real client activity,
deduplicated per anonymous browser session/day. Admin shows the actual database
counts, including zero when no events have been recorded.

## Production browser verification

Install frontend and server dependencies, build, then run:

```bash
npx playwright install chromium
npm run build
npm run test:e2e
```

The test starts a production Next server and the actual Express app backed by an
isolated PostgreSQL fixture. It replaces deployment credentials and disables
outgoing email. It covers both public application journeys, Admin auth and
submissions, migration fidelity for all six articles, CMS CRUD/publishing/media,
slug redirects, archive/restore, SEO/sitemap, separate analytics, responsive
layouts and axe accessibility checks. It writes ignored screenshots/reports to
`test-results/admin-cms`. `E2E_PORT`, `TEST_ARTIFACT_DIR` and
`BROWSER_EXECUTABLE_PATH` can override local test settings.
