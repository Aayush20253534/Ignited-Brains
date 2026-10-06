const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { createTestApi } = require('./helpers/test-api');

test('admin filters use complete submissions, IST date boundaries and stable pagination', async suite => {
  const api = await createTestApi(); suite.after(() => api.close());
  const token = (await api.login()).data.token;
  const request = route => api.request('/api/v1/admin/' + route, { token });
  const individual = crypto.randomUUID(), organization = crypto.randomUUID();
  await api.database.query(`INSERT INTO contact_submissions(id,name,email,organization,message,status,created_at)
    VALUES($1,'Individual record','individual@example.test',NULL,'Meteor astronomy discussion','NEW','2026-10-05T18:29:59Z'),
      ($2,'School record','school@example.test','Verification School','Meteor astronomy follow-up','RESOLVED','2026-10-05T18:30:00Z')`, [individual, organization]);
  const student = crypto.randomUUID(), institution = crypto.randomUUID();
  await api.database.query(`INSERT INTO applications(id,applicant_type,name,email,phone,city,state,message,details,status,created_at)
    VALUES($1,'STUDENT','Student record','student@example.test','9999999999','Lucknow','Uttar Pradesh','Meteor astronomy','{"proposalDetails":"Telescope building"}','NEW','2026-10-05T18:29:59Z'),
      ($2,'ORGANIZATION','Principal record','principal@example.test','9999999999','Prayagraj','Uttar Pradesh','Astronomy collaboration','{"budgetRange":"Special allocation"}','IN_REVIEW','2026-10-05T18:30:00Z')`, [student, institution]);
  await suite.test('contact type, message search, status and inclusive IST dates compose correctly', async () => {
    const found = await request('contacts?type=ORGANIZATION&status=RESOLVED&query=Meteor&dateFrom=2026-10-06&dateTo=2026-10-06');
    assert.equal(found.status, 200); assert.equal(found.data.pagination.total, 1); assert.equal(found.data.data[0].id, organization);
    assert.equal((await request('contacts?type=INDIVIDUAL&dateTo=2026-10-05')).data.data[0].id, individual);
    assert.equal((await request('contacts?type=INDIVIDUAL&dateFrom=2026-10-06')).data.pagination.total, 0);
    assert.equal((await request('contacts?type=unknown')).status, 400);
  });
  await suite.test('application search covers location, messages and all details fields', async () => {
    assert.equal((await request('applications?query=Telescope')).data.data[0].id, student);
    assert.equal((await request('applications?query=Special%20allocation')).data.data[0].id, institution);
    assert.equal((await request('applications?query=Prayagraj&type=ORGANIZATION&status=IN_REVIEW&dateFrom=2026-10-06&dateTo=2026-10-06')).data.pagination.total, 1);
    assert.equal((await request('applications?query=Meteor&dateTo=2026-10-05')).data.data[0].id, student);
  });
  await suite.test('oldest/newest ordering, empty pages and invalid date/sort validation', async () => {
    assert.equal((await request('contacts?limit=1&sort=oldest')).data.data[0].id, individual);
    const second = await request('contacts?limit=1&page=2&sort=oldest');
    assert.equal(second.data.data[0].id, organization); assert.equal(second.data.pagination.totalPages, 2);
    assert.equal((await request('applications?limit=1&sort=newest')).data.data[0].id, institution);
    assert.equal((await request('applications?limit=1&page=10')).data.data.length, 0);
    for (const kind of ['contacts','applications']) {
      assert.equal((await request(kind + '?dateFrom=2026-02-30')).status, 400);
      assert.equal((await request(kind + '?dateFrom=2026-10-06&dateTo=2026-10-05')).status, 400);
      assert.equal((await request(kind + '?sort=unsafe')).status, 400);
    }
  });
});
