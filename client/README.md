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
