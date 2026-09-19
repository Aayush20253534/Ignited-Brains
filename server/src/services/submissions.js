const crypto = require('crypto');
const { pool } = require('../db');
const { sendContactNotification, sendApplicationNotification } = require('./resend');

const createContact = async (payload) => {
  const id = crypto.randomUUID();
  const { rows } = await pool.query(
    `INSERT INTO contact_submissions
      (id, name, email, phone, organization, subject, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [id, payload.name, payload.email, payload.phone, payload.organization, payload.subject, payload.message],
  );

  const contact = rows[0];
  const notification = await sendContactNotification(contact);

  await pool.query(
    `UPDATE contact_submissions
     SET notification_status = $2, notification_id = $3, notification_error = $4, updated_at = NOW()
     WHERE id = $1`,
    [id, notification.status, notification.id, notification.error],
  );

  return { ...contact, notification_status: notification.status };
};

const createApplication = async (payload) => {
  const id = crypto.randomUUID();
  const { rows } = await pool.query(
    `INSERT INTO applications
      (id, applicant_type, name, email, phone, city, state, message, details)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb)
     RETURNING *`,
    [
      id,
      payload.applicantType,
      payload.name,
      payload.email,
      payload.phone,
      payload.city,
      payload.state,
      payload.message,
      JSON.stringify(payload.details),
    ],
  );

  const application = rows[0];
  const notification = await sendApplicationNotification({
    ...application,
    applicantType: application.applicant_type,
  });

  await pool.query(
    `UPDATE applications
     SET notification_status = $2, notification_id = $3, notification_error = $4, updated_at = NOW()
     WHERE id = $1`,
    [id, notification.status, notification.id, notification.error],
  );

  return { ...application, notification_status: notification.status };
};

module.exports = { createContact, createApplication };
