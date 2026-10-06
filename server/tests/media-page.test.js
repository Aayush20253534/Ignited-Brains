const test = require('node:test');
const assert = require('node:assert/strict');
const { createTestApi } = require('./helpers/test-api');

test('Media page content is database-backed and admin-only for writes', async (suite) => {
  const api = await createTestApi();
  suite.after(() => api.close());

  const initial = await api.request('/api/v1/media-page');
  assert.equal(initial.status, 200);
  assert.equal(initial.data.data.content.hero.eyebrow, 'Media & Stories');
  assert.equal(initial.data.data.content.events.items.length, 1);

  const login = await api.login();
  assert.equal(login.status, 200);
  const token = login.data.token;

  await suite.test('unauthenticated writes are rejected', async () => {
    const denied = await api.request('/api/v1/admin/media-page', {
      method: 'PATCH',
      body: { content: initial.data.data.content, version: initial.data.data.version },
    });
    assert.equal(denied.status, 401);
  });

  await suite.test('admin can update existing Media content and public endpoint reflects it', async () => {
    const content = structuredClone(initial.data.data.content);
    content.hero.heading = 'Curiosity, edited\n*from Admin.*';
    content.learning.steps = ['Ask', 'Build', 'Discover'];
    content.events.items[0].title = 'Updated community event';
    content.press.visible = false;

    const saved = await api.request('/api/v1/admin/media-page', {
      token,
      method: 'PATCH',
      body: { content, version: initial.data.data.version },
    });
    assert.equal(saved.status, 200);
    assert.equal(saved.data.data.version, initial.data.data.version + 1);
    assert.equal(saved.data.data.content.hero.heading, 'Curiosity, edited\n*from Admin.*');

    const publicPage = await api.request('/api/v1/media-page');
    assert.equal(publicPage.status, 200);
    assert.equal(publicPage.data.data.content.learning.steps.length, 3);
    assert.equal(publicPage.data.data.content.events.items[0].title, 'Updated community event');
    assert.equal(publicPage.data.data.content.press.visible, false);
  });

  await suite.test('stale versions cannot overwrite newer content', async () => {
    const stale = await api.request('/api/v1/admin/media-page', {
      token,
      method: 'PATCH',
      body: { content: initial.data.data.content, version: initial.data.data.version },
    });
    assert.equal(stale.status, 409);
  });

  await suite.test('unsafe links and missing image sources are rejected', async () => {
    const current = await api.request('/api/v1/admin/media-page', { token });
    const unsafe = structuredClone(current.data.data.content);
    unsafe.hero.primaryCta.href = 'javascript:alert(1)';
    const badLink = await api.request('/api/v1/admin/media-page', {
      token,
      method: 'PATCH',
      body: { content: unsafe, version: current.data.data.version },
    });
    assert.equal(badLink.status, 400);

    const missingImage = structuredClone(current.data.data.content);
    missingImage.hero.image.src = '';
    const badImage = await api.request('/api/v1/admin/media-page', {
      token,
      method: 'PATCH',
      body: { content: missingImage, version: current.data.data.version },
    });
    assert.equal(badImage.status, 400);
  });
});
