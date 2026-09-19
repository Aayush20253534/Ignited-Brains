const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cleanString = (value, maxLength = 1000) => {
  if (value === undefined || value === null) return '';
  return String(value).trim().replace(/\u0000/g, '').slice(0, maxLength);
};

const normalizeEmail = (value) => cleanString(value, 320).toLowerCase();

const isValidEmail = (value) => EMAIL_RE.test(value);

const escapeHtml = (value) =>
  String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

module.exports = { cleanString, normalizeEmail, isValidEmail, escapeHtml };
