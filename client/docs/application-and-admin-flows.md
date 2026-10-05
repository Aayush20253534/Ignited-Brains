# Application and administrator flows

## Routes

| Screen | Route / state | Behaviour |
| --- | --- | --- |
| Student Application | `/apply/student` | Six steps, validation, review/edit and real submission |
| Organisation Application | `/apply/organisation` | Eight steps, multiple solutions, review/edit and real submission |
| Admin Sign-In | `/admin`, unauthenticated | Email/password authentication, visibility toggle and API errors |
| Admin Signed-Out | `/admin`, completed logout | Confirmation, Sign in again and Go to Homepage |

The Partner With Us chooser retains its approved design and opens the dedicated
application pages. Answers stay in memory while moving between steps. Submission
uses the existing `POST /api/v1/applications` contract and sends the original
student/organisation fields. The review page can edit any completed section.
Successful submission displays the backend reference and clears entered data.
Reloading an unsubmitted page starts a fresh application.

The authenticated dashboard retains overview, enquiries, applications, searches,
type/status filters, pagination, details, status updates, refresh and mobile
navigation. Details support Escape and keyboard focus containment/restoration.
The public header/footer do not sit behind the administrator screens.

## Session termination

Sign Out clears the tab’s token and loaded records immediately, aborts protected
requests and calls `POST /api/v1/admin/auth/logout`. The confirmation appears
after the server confirms termination. An unavailable server offers Retry Sign
Out without showing the dashboard or claiming a completed logout. Late responses
cannot restore an ended session.

The server stores a SHA-256 token digest in PostgreSQL until expiry and checks it
on every protected request. A copied token fails after logout; independent
sessions remain valid. Admin API responses use `Cache-Control: no-store`.
`npm start` applies the idempotent SQL migrations before starting the backend.
See [backend setup](../../server/BACKEND.md) for direct-node/development startup.

## Design assets

The built-in image editor reconstructed clean photographs from the approved
mockups so all screen text and controls remain accessible HTML. Project paths:

- `client/public/applications/student-hero.webp`
- `client/public/applications/organisation-hero.webp`
- `client/public/admin/signed-out-workspace.webp`

Final prompts and export specifications are in
[application asset notes](../public/applications/ASSETS.md) and
[administrator asset notes](../public/admin/ASSETS.md).

## Verification

- `cd client && npm run check`: assets, production routes, TypeScript and ESLint.
  One existing unused `Status` import warning remains on the unrelated Shop page.
- `cd client && npm run build`: production build passes.
- `cd server && npm test`: all 10 checks pass, including real HTTP authentication,
  PostgreSQL persistence, dashboard operations, revoked-token replay, independent
  sessions, inactive accounts and idempotent migrations.
- Browser journeys use the production Next.js frontend, actual API proxy and
  Express routes, and an isolated PostgreSQL engine. Both application records
  were inspected in the database and managed through the dashboard. Happy paths
  use real endpoints; temporary API failures/latency are injected only to verify
  recovery and cancellation. No production records or notification emails were
  created during verification.
- All four layouts were checked at 1536, 1280, 1024, 768, 640, 390, 375 and 320px.
  Real sign-in/logout and keyboard access were exercised at each width, with no
  horizontal overflow, browser JavaScript exceptions or broken assets.
- Automated axe WCAG 2/2.1 A/AA audits of each new screen at desktop and 320px
  reported zero violations. Logout retry, Sign in again, Homepage, browser Back,
  refresh with a copied revoked token and late-response isolation passed.
