const express = require('express');
const { pool } = require('../db');
const { applyDateFilters, sortOrder } = require('../utils/admin-filters');
const { asyncHandler, HttpError } = require('../utils/http');
const { cleanString } = require('../utils/text');
const {
  CONTACT_STATUSES,
  APPLICATION_TYPES,
  APPLICATION_STATUSES,
  parsePagination,
  parseEnumQuery,
} = require('../utils/validation');

const router = express.Router();

const addFilter = (clauses, values, sql, value) => {
  values.push(value);
  clauses.push(sql.replace('?', `$${values.length}`));
};

router.get('/dashboard/summary', asyncHandler(async (_req, res) => {
  const [contacts, applications, blogs, gallery, activity] = await Promise.all([
    pool.query(`SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'NEW')::int AS new,
      COUNT(*) FILTER (WHERE NULLIF(BTRIM(organization), '') IS NOT NULL)::int AS organizations,
      COUNT(*) FILTER (WHERE NULLIF(BTRIM(organization), '') IS NULL)::int AS individuals,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS recent
      FROM contact_submissions`),
    pool.query(`SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'NEW')::int AS new,
      COUNT(*) FILTER (WHERE applicant_type = 'STUDENT')::int AS students,
      COUNT(*) FILTER (WHERE applicant_type = 'ORGANIZATION')::int AS organizations,
      COUNT(*) FILTER (WHERE status IN ('NEW', 'IN_REVIEW'))::int AS awaiting,
      COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days')::int AS recent,
      COUNT(*) FILTER (WHERE applicant_type = 'STUDENT' AND created_at >= NOW() - INTERVAL '7 days')::int AS recent_students,
      COUNT(*) FILTER (WHERE applicant_type = 'ORGANIZATION' AND created_at >= NOW() - INTERVAL '7 days')::int AS recent_organizations
      FROM applications`),
    pool.query(`SELECT COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'PUBLISHED')::int AS published,
      COUNT(*) FILTER (WHERE status = 'DRAFT')::int AS drafts,
      COUNT(*) FILTER (WHERE status = 'ARCHIVED')::int AS archived,
      COALESCE(SUM(view_count), 0)::float8 AS views,
      COALESCE(SUM(impression_count), 0)::float8 AS impressions FROM blogs`),
    pool.query(`SELECT COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'PUBLISHED')::int AS published,
      COUNT(*) FILTER (WHERE status = 'DRAFT')::int AS drafts,
      COUNT(*) FILTER (WHERE status = 'ARCHIVED')::int AS archived,
      COUNT(*) FILTER (WHERE is_featured AND status = 'PUBLISHED')::int AS featured
      FROM gallery_items`),
    pool.query(`WITH days AS (
      SELECT generate_series((NOW() AT TIME ZONE 'Asia/Kolkata')::date - 6,
                             (NOW() AT TIME ZONE 'Asia/Kolkata')::date, INTERVAL '1 day')::date AS day
    ), contacts AS (
      SELECT (created_at AT TIME ZONE 'Asia/Kolkata')::date AS day, COUNT(*)::int AS count
      FROM contact_submissions WHERE created_at >= NOW() - INTERVAL '8 days' GROUP BY 1
    ), applications AS (
      SELECT (created_at AT TIME ZONE 'Asia/Kolkata')::date AS day, COUNT(*)::int AS count,
        COUNT(*) FILTER (WHERE applicant_type = 'STUDENT')::int AS students,
        COUNT(*) FILTER (WHERE applicant_type = 'ORGANIZATION')::int AS organizations
      FROM applications WHERE created_at >= NOW() - INTERVAL '8 days' GROUP BY 1
    ) SELECT TO_CHAR(days.day, 'YYYY-MM-DD') AS date,
      COALESCE(contacts.count, 0) AS contacts, COALESCE(applications.count, 0) AS applications,
      COALESCE(applications.students, 0) AS students, COALESCE(applications.organizations, 0) AS organizations
      FROM days LEFT JOIN contacts USING (day) LEFT JOIN applications USING (day) ORDER BY days.day`),
  ]);

  res.json({ contacts: contacts.rows[0], applications: applications.rows[0], blogs: blogs.rows[0], gallery: gallery.rows[0], activity: activity.rows });
}));

router.get('/contacts', asyncHandler(async (req, res) => {
  const { page, limit, offset } = parsePagination(req.query);
  const status = parseEnumQuery(req.query.status, CONTACT_STATUSES, 'status');
  const type = parseEnumQuery(req.query.type, ['INDIVIDUAL', 'ORGANIZATION'], 'type');
  const query = cleanString(req.query.query, 200);
  const clauses = [];
  const values = [];

  if (status) addFilter(clauses, values, 'status = ?', status);
  if (type) clauses.push(`NULLIF(BTRIM(organization), '') IS ${type === 'ORGANIZATION' ? 'NOT ' : ''}NULL`);
  applyDateFilters(req.query, clauses, values);
  if (query) {
    values.push(`%${query}%`);
    clauses.push(`(name ILIKE $${values.length} OR email ILIKE $${values.length} OR COALESCE(organization, '') ILIKE $${values.length} OR COALESCE(subject, '') ILIKE $${values.length} OR message ILIKE $${values.length})`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM contact_submissions ${where}`, values);

  const dataValues = [...values, limit, offset];
  const { rows } = await pool.query(
    `SELECT id, name, email, phone, organization, subject, message, status,
            notification_status, created_at, updated_at
     FROM contact_submissions
     ${where}
     ORDER BY ${sortOrder(req.query.sort)}
     LIMIT $${dataValues.length - 1} OFFSET $${dataValues.length}`,
    dataValues,
  );

  res.json({ data: rows, pagination: { page, limit, total: countResult.rows[0].total, totalPages: Math.ceil(countResult.rows[0].total / limit) } });
}));

router.get('/contacts/:id', asyncHandler(async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM contact_submissions WHERE id = $1 LIMIT 1', [req.params.id]);
  if (!rows[0]) throw new HttpError(404, 'Contact submission not found');
  res.json({ data: rows[0] });
}));

router.patch('/contacts/:id/status', asyncHandler(async (req, res) => {
  const status = parseEnumQuery(req.body?.status, CONTACT_STATUSES, 'status');
  if (!status) throw new HttpError(400, 'status is required');

  const { rows } = await pool.query(
    `UPDATE contact_submissions SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [req.params.id, status],
  );
  if (!rows[0]) throw new HttpError(404, 'Contact submission not found');
  res.json({ data: rows[0] });
}));

router.get('/applications', asyncHandler(async (req, res) => {
  const { page, limit, offset } = parsePagination(req.query);
  const type = parseEnumQuery(req.query.type, APPLICATION_TYPES, 'type');
  const status = parseEnumQuery(req.query.status, APPLICATION_STATUSES, 'status');
  const query = cleanString(req.query.query, 200);
  const clauses = [];
  const values = [];

  if (type) addFilter(clauses, values, 'applicant_type = ?', type);
  if (status) addFilter(clauses, values, 'status = ?', status);
  applyDateFilters(req.query, clauses, values);
  if (query) {
    values.push(`%${query}%`);
    clauses.push(`(name ILIKE $${values.length} OR email ILIKE $${values.length} OR COALESCE(city, '') ILIKE $${values.length} OR COALESCE(state, '') ILIKE $${values.length} OR COALESCE(message, '') ILIKE $${values.length} OR details::text ILIKE $${values.length})`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM applications ${where}`, values);
  const dataValues = [...values, limit, offset];
  const { rows } = await pool.query(
    `SELECT id, applicant_type, name, email, phone, city, state, message, details, status,
            notification_status, created_at, updated_at
     FROM applications
     ${where}
     ORDER BY ${sortOrder(req.query.sort)}
     LIMIT $${dataValues.length - 1} OFFSET $${dataValues.length}`,
    dataValues,
  );

  res.json({ data: rows, pagination: { page, limit, total: countResult.rows[0].total, totalPages: Math.ceil(countResult.rows[0].total / limit) } });
}));

router.get('/applications/:id', asyncHandler(async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM applications WHERE id = $1 LIMIT 1', [req.params.id]);
  if (!rows[0]) throw new HttpError(404, 'Application not found');
  res.json({ data: rows[0] });
}));

router.patch('/applications/:id/status', asyncHandler(async (req, res) => {
  const status = parseEnumQuery(req.body?.status, APPLICATION_STATUSES, 'status');
  if (!status) throw new HttpError(400, 'status is required');

  const { rows } = await pool.query(
    `UPDATE applications SET status = $2, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [req.params.id, status],
  );
  if (!rows[0]) throw new HttpError(404, 'Application not found');
  res.json({ data: rows[0] });
}));

module.exports = router;
