# Ignited Brains backend

This backend provides public contact/application submission APIs and a JWT-protected admin API.

## What is included

- PostgreSQL persistence for contact enquiries, student applications, organization applications and admin users.
- Resend notifications for every successful public submission.
- Argon2id password hashing for admin accounts.
- HS256-signed JWT admin sessions with issuer/audience validation.
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

Run `npm run db:migrate` against the production database before starting the API, then create the initial admin once. Do not expose `ADMIN_PASSWORD` longer than necessary after bootstrap.
