const express = require('express');
const { pool } = require('../db');
const { requireAdmin } = require('../middleware/auth');
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
router.use(requireAdmin);

const addFilter = (clauses, values, sql, value) => {
  values.push(value);
  clauses.push(sql.replace('?', `$${values.length}`));
};

router.get('/dashboard/summary', asyncHandler(async (_req, res) => {
  const [contacts, applications] = await Promise.all([
    pool.query(`SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'NEW')::int AS new
      FROM contact_submissions`),
    pool.query(`SELECT
      COUNT(*)::int AS total,
      COUNT(*) FILTER (WHERE status = 'NEW')::int AS new,
      COUNT(*) FILTER (WHERE applicant_type = 'STUDENT')::int AS students,
      COUNT(*) FILTER (WHERE applicant_type = 'ORGANIZATION')::int AS organizations
      FROM applications`),
  ]);

  res.json({ contacts: contacts.rows[0], applications: applications.rows[0] });
}));

router.get('/contacts', asyncHandler(async (req, res) => {
  const { page, limit, offset } = parsePagination(req.query);
  const status = parseEnumQuery(req.query.status, CONTACT_STATUSES, 'status');
  const query = cleanString(req.query.query, 200);
  const clauses = [];
  const values = [];

  if (status) addFilter(clauses, values, 'status = ?', status);
  if (query) {
    values.push(`%${query}%`);
    clauses.push(`(name ILIKE $${values.length} OR email ILIKE $${values.length} OR COALESCE(organization, '') ILIKE $${values.length} OR COALESCE(subject, '') ILIKE $${values.length})`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM contact_submissions ${where}`, values);

  const dataValues = [...values, limit, offset];
  const { rows } = await pool.query(
    `SELECT id, name, email, phone, organization, subject, message, status,
            notification_status, created_at, updated_at
     FROM contact_submissions
     ${where}
     ORDER BY created_at DESC
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
  if (query) {
    values.push(`%${query}%`);
    clauses.push(`(name ILIKE $${values.length} OR email ILIKE $${values.length} OR COALESCE(details->>'institutionName', '') ILIKE $${values.length} OR COALESCE(details->>'organizationName', '') ILIKE $${values.length})`);
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
  const countResult = await pool.query(`SELECT COUNT(*)::int AS total FROM applications ${where}`, values);
  const dataValues = [...values, limit, offset];
  const { rows } = await pool.query(
    `SELECT id, applicant_type, name, email, phone, city, state, message, details, status,
            notification_status, created_at, updated_at
     FROM applications
     ${where}
     ORDER BY created_at DESC
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
