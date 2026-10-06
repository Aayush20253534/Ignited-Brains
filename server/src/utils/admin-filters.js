const { HttpError } = require('./http');

function applyDateFilters(query, clauses, values, field = 'created_at') {
  for (const key of ['dateFrom', 'dateTo']) {
    if (!query[key]) continue;
    const value = String(query[key]);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(Date.parse(value)) || new Date(value).toISOString().slice(0,10) !== value) {
      throw new HttpError(400, `${key} must be a valid YYYY-MM-DD date`);
    }
    values.push(`${value}T00:00:00+05:30`);
    clauses.push(`${field} ${key === 'dateFrom' ? '>=' : '<'} $${values.length}::timestamptz${key === 'dateTo' ? " + INTERVAL '1 day'" : ''}`);
  }
  if (query.dateFrom && query.dateTo && query.dateFrom > query.dateTo) throw new HttpError(400, 'dateFrom must be before dateTo');
}

function sortOrder(value, field = 'created_at') {
  if (!value || value === 'newest') return `${field} DESC, id DESC`;
  if (value === 'oldest') return `${field} ASC, id ASC`;
  throw new HttpError(400, 'sort must be newest or oldest');
}
module.exports = { applyDateFilters, sortOrder };
