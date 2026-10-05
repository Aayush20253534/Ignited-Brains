const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');
const { createTestApi } = require('./helpers/test-api');

test('real application submissions, dashboard operations and session revocation', async (suite) => {
  const api = await createTestApi();
  suite.after(() => api.close());
  let token;
  let secondToken;
  let studentId;
  let organizationId;
  let contactId;

  await suite.test('credentials are validated and each login creates an independent session', async () => {
    const invalid = await api.request('/api/v1/admin/auth/login', { method: 'POST', body: { email: api.admin.email, password: 'invalid-test-password' } });
    assert.equal(invalid.status, 401);
    assert.equal(invalid.data.error, 'Invalid email or password');
    const first = await api.login();
    const second = await api.login();
    assert.equal(first.status, 200); assert.equal(second.status, 200);
    assert.equal(first.headers.get('cache-control'), 'no-store');
    token = first.data.token; secondToken = second.data.token;
    assert.notEqual(token, secondToken);
    assert.equal(first.data.admin.id, api.admin.id);
    assert.equal(first.data.admin.password_hash, undefined);
    const profile = await api.request('/api/v1/admin/auth/me', { token });
    assert.equal(profile.status, 200);
    assert.equal(profile.data.admin.token_revoked, undefined);
  });

  await suite.test('missing, expired, wrong-role and unsigned/incorrectly signed tokens cannot enter admin', async () => {
    const { config } = require('../src/config');
    const options = { subject: api.admin.id, issuer: config.jwtIssuer, audience: config.jwtAudience, expiresIn: '1h', algorithm: 'HS256' };
    const tokens = [undefined, 'not-a-token', jwt.sign({ role: 'admin' }, 'incorrect-test-secret', options), jwt.sign({ role: 'student' }, config.jwtSecret, options), jwt.sign({ role: 'admin' }, config.jwtSecret, { ...options, expiresIn: -1 }), jwt.sign({ role: 'admin' }, config.jwtSecret, { ...options, issuer: 'wrong-issuer' })];
    for (const invalidToken of tokens) assert.equal((await api.request('/api/v1/admin/dashboard/summary', { token: invalidToken })).status, 401);
  });

  await suite.test('both application contracts persist and are available to the real admin API', async () => {
    const common = { email: 'applicant@example.test', phone: '+91 9876543210', city: 'Lucknow', state: 'Uttar Pradesh' };
    const student = await api.request('/api/v1/applications', { method: 'POST', body: { ...common, applicantType: 'STUDENT', name: 'Student Verification', message: 'An additional student message', details: { institutionName: 'Verification School', educationLevel: 'Class 11', interestArea: 'Astronomy', proposalDetails: 'A student astronomy club and telescope project.', wantsInstitutionSetup: true, setupInterest: 'Space lab', institutionCity: 'Lucknow' } } });
    const organization = await api.request('/api/v1/applications', { method: 'POST', body: { ...common, applicantType: 'ORGANIZATION', name: 'Organisation Verification', details: { organizationName: 'Verification Institution', organizationType: 'SCHOOL', designation: 'Principal', institutionAddress: 'Verification address, Lucknow', requestedSolutions: ['SPACE_LAB', 'TEACHER_TRAINING'], requirementDetails: 'A hands-on space lab and teacher workshops.', estimatedStudents: '500', timeline: 'Within 3 months', budgetRange: 'To be discussed' } } });
    assert.equal(student.status, 201); assert.equal(organization.status, 201);
    studentId = student.data.id; organizationId = organization.data.id;
    const students = await api.request('/api/v1/admin/applications?type=STUDENT&query=Verification%20School', { token });
    assert.equal(students.data.pagination.total, 1);
    assert.equal(students.data.data[0].id, studentId);
    assert.equal(students.data.data[0].details.wantsInstitutionSetup, true);
    const organizations = await api.request('/api/v1/admin/applications?type=ORGANIZATION', { token });
    assert.equal(organizations.data.data[0].id, organizationId);
    assert.deepEqual(organizations.data.data[0].details.requestedSolutions, ['SPACE_LAB', 'TEACHER_TRAINING']);
    assert.equal(organizations.data.data[0].details.estimatedStudents, 500);
    const detail = await api.request(`/api/v1/admin/applications/${studentId}`, { token });
    assert.equal(detail.data.data.message, 'An additional student message');
  });

  await suite.test('contact details, search, status filters, application statuses and pagination still work', async () => {
    const contact = await api.request('/api/v1/contact', { method: 'POST', body: { name: 'Contact Verification', email: 'contact@example.test', phone: '9999999999', subject: 'Space lab enquiry', organization: 'Verification School', message: 'Please help plan a space lab.' } });
    assert.equal(contact.status, 201); contactId = contact.data.id;
    assert.equal((await api.request(`/api/v1/admin/contacts/${contactId}`, { token })).data.data.message, 'Please help plan a space lab.');
    const changed = await api.request(`/api/v1/admin/contacts/${contactId}/status`, { token, method: 'PATCH', body: { status: 'RESOLVED' } });
    assert.equal(changed.status, 200); assert.equal(changed.data.data.status, 'RESOLVED');
    const found = await api.request('/api/v1/admin/contacts?query=Verification&status=RESOLVED', { token });
    assert.equal(found.data.pagination.total, 1);
    const updated = await api.request(`/api/v1/admin/applications/${studentId}/status`, { token, method: 'PATCH', body: { status: 'IN_REVIEW' } });
    assert.equal(updated.data.data.status, 'IN_REVIEW');
    const filtered = await api.request('/api/v1/admin/applications?type=STUDENT&status=IN_REVIEW', { token });
    assert.equal(filtered.data.pagination.total, 1);
    const page = await api.request('/api/v1/admin/applications?page=2&limit=1', { token });
    assert.equal(page.data.pagination.totalPages, 2); assert.equal(page.data.data.length, 1);
    const summary = await api.request('/api/v1/admin/dashboard/summary', { token });
    assert.deepEqual(summary.data.applications, { total: 2, new: 1, students: 1, organizations: 1 });
    assert.deepEqual(summary.data.contacts, { total: 1, new: 0 });
  });

  await suite.test('logout persists only a digest and rejects replay on every protected route', async () => {
    assert.equal((await api.request('/api/v1/admin/auth/logout', { token, method: 'POST' })).status, 200);
    const saved = await api.database.query('SELECT * FROM admin_token_revocations');
    assert.equal(saved.rows.length, 1);
    assert.equal(saved.rows[0].token_digest, crypto.createHash('sha256').update(token).digest('hex'));
    assert.equal(JSON.stringify(saved.rows).includes(token), false);
    const routes = ['/api/v1/admin/auth/me', '/api/v1/admin/dashboard/summary', '/api/v1/admin/contacts', '/api/v1/admin/applications', `/api/v1/admin/contacts/${contactId}`, `/api/v1/admin/applications/${organizationId}`];
    for (const route of routes) {
      assert.equal((await api.request(route, { token })).status, 401, route);
      assert.equal((await api.request(route, { token })).headers.get('cache-control'), 'no-store');
      assert.equal((await api.request(route)).status, 401, route + ' without credentials');
    }
    for (const route of [`/api/v1/admin/contacts/${contactId}/status`, `/api/v1/admin/applications/${studentId}/status`]) assert.equal((await api.request(route, { token, method: 'PATCH', body: { status: 'ARCHIVED' } })).status, 401);
    assert.equal((await api.request('/api/v1/admin/auth/logout', { token, method: 'POST' })).status, 401);
    assert.equal((await api.request('/api/v1/admin/auth/me', { token: secondToken })).status, 200, 'Other sessions remain valid');
  });

  await suite.test('idempotent migrations retain submissions/revocations and signing in again works', async () => {
    await api.migrate();
    assert.equal((await api.database.query('SELECT COUNT(*)::int AS count FROM applications')).rows[0].count, 2);
    assert.equal((await api.request('/api/v1/admin/auth/me', { token })).status, 401);
    const signedIn = await api.login();
    assert.equal(signedIn.status, 200);
    assert.equal((await api.request('/api/v1/admin/auth/me', { token: signedIn.data.token })).status, 200);
    await api.database.query('UPDATE admin_users SET is_active = FALSE WHERE id = $1', [api.admin.id]);
    assert.equal((await api.request('/api/v1/admin/auth/me', { token: signedIn.data.token })).status, 401);
  });
});
