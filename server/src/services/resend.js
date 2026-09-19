const { config } = require('../config');
const { escapeHtml } = require('../utils/text');

const sendEmail = async ({ subject, html, text, replyTo }) => {
  if (!config.resendApiKey || !config.resendFrom || !config.notificationTo) {
    return { status: 'SKIPPED', id: null, error: 'Resend is not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: config.resendFrom,
        to: [config.notificationTo],
        subject,
        html,
        text,
        reply_to: replyTo,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      return {
        status: 'FAILED',
        id: null,
        error: String(data.message || data.error || `Resend returned ${response.status}`).slice(0, 1000),
      };
    }

    return { status: 'SENT', id: data.id || null, error: null };
  } catch (error) {
    return { status: 'FAILED', id: null, error: String(error.message || error).slice(0, 1000) };
  }
};

const renderRows = (rows) => rows
  .filter(([, value]) => value !== null && value !== undefined && value !== '')
  .map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(Array.isArray(value) ? value.join(', ') : value)}</td></tr>`)
  .join('');

const sendContactNotification = (contact) => sendEmail({
  subject: `New contact enquiry: ${contact.subject || contact.name}`,
  replyTo: contact.email,
  text: [
    'New Ignited Brains contact enquiry',
    `Name: ${contact.name}`,
    `Email: ${contact.email}`,
    contact.phone ? `Phone: ${contact.phone}` : '',
    contact.organization ? `Organization: ${contact.organization}` : '',
    contact.subject ? `Subject: ${contact.subject}` : '',
    '',
    contact.message,
  ].filter(Boolean).join('\n'),
  html: `<h2>New contact enquiry</h2><table>${renderRows([
    ['Name', contact.name],
    ['Email', contact.email],
    ['Phone', contact.phone],
    ['Organization', contact.organization],
    ['Subject', contact.subject],
    ['Message', contact.message],
  ])}</table>`,
});

const sendApplicationNotification = (application) => {
  const detailRows = Object.entries(application.details || {}).map(([key, value]) => [
    key.replace(/([A-Z])/g, ' $1').replace(/^./, (char) => char.toUpperCase()),
    typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value,
  ]);

  return sendEmail({
    subject: `New ${application.applicantType.toLowerCase()} application: ${application.name}`,
    replyTo: application.email,
    text: [
      `New ${application.applicantType} application`,
      `Name: ${application.name}`,
      `Email: ${application.email}`,
      `Phone: ${application.phone}`,
      application.city ? `City: ${application.city}` : '',
      application.state ? `State: ${application.state}` : '',
      '',
      ...detailRows.map(([label, value]) => `${label}: ${Array.isArray(value) ? value.join(', ') : value ?? ''}`),
      application.message ? `\nAdditional message: ${application.message}` : '',
    ].filter(Boolean).join('\n'),
    html: `<h2>New ${escapeHtml(application.applicantType.toLowerCase())} application</h2><table>${renderRows([
      ['Name', application.name],
      ['Email', application.email],
      ['Phone', application.phone],
      ['City', application.city],
      ['State', application.state],
      ...detailRows,
      ['Additional message', application.message],
    ])}</table>`,
  });
};

module.exports = { sendContactNotification, sendApplicationNotification };
