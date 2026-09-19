# Ignited Brains frontend

Next.js App Router, TypeScript, Tailwind CSS, and ESLint.

## Run locally

Requires Node.js 20.9 or newer and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

Run `npm start` after building to serve the production app.

## Routes

- `/`: Home
- `/about`: About Us
- `/solutions`: Solutions

## Structure

- `src/app`: routes, root layout, metadata, global CSS, and 404.
- `src/components`: reusable interface components.
- `src/lib`: shared frontend configuration.
- `public/images`: artwork for later implementation.

## Status and scope

Part 1: foundation and three navigable placeholder pages. These are not the
finished visual replicas. Next: design system, asset preparation, shared site
components, and page implementation using the supplied references.

Frontend only: no API routes, server actions, databases, authentication,
or submission services. Fonts and original artwork will be added during
asset preparation. Basic system typography keeps this foundation independent
of external font downloads.
