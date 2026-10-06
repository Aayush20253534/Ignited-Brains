const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const { createTestApi } = require('./helpers/test-api');

test('gallery management is authenticated and only publishes approved photos', async (suite) => {
  const api = await createTestApi();
  suite.after(() => api.close());

  const login = await api.login();
  assert.equal(login.status, 200);
  const token = login.data.token;

  const mediaId = crypto.randomUUID();
  await api.database.query(
    `INSERT INTO blog_media(id,content_hash,mime_type,bytes,width,height,uploaded_by)
     VALUES($1,$2,'image/webp',$3,1200,800,$4)`,
    [mediaId, crypto.createHash('sha256').update('gallery-test').digest('hex'), Buffer.from('gallery-test'), api.admin.id],
  );

  await suite.test('admin gallery endpoints reject missing authentication', async () => {
    assert.equal((await api.request('/api/v1/admin/gallery')).status, 401);
    assert.equal((await api.request('/api/v1/admin/gallery', {
      method: 'POST',
      body: { mediaId, title: 'Private photo', altText: 'Private test photo', category: 'STEM Lab', status: 'DRAFT' },
    })).status, 401);
  });

  let item;
  await suite.test('admin can create a published gallery item', async () => {
    const created = await api.request('/api/v1/admin/gallery', {
      token,
      method: 'POST',
      body: {
        mediaId,
        title: 'STEM workshop',
        caption: 'Students exploring a hands-on STEM activity.',
        altText: 'Students working together around a STEM activity table',
        category: 'STEM Lab',
        location: 'Lucknow',
        displayOrder: 2,
        isFeatured: true,
        status: 'PUBLISHED',
      },
    });
    assert.equal(created.status, 201);
    item = created.data.data;
    assert.equal(item.mediaId, mediaId);
    assert.equal(item.status, 'PUBLISHED');
    assert.equal(item.isFeatured, true);
  });

  await suite.test('published gallery item is public and summary is accurate', async () => {
    const publicGallery = await api.request('/api/v1/gallery?limit=10');
    assert.equal(publicGallery.status, 200);
    assert.equal(publicGallery.data.data.length, 1);
    assert.equal(publicGallery.data.data[0].id, item.id);

    const summary = await api.request('/api/v1/admin/dashboard/summary', { token });
    assert.deepEqual(summary.data.gallery, { total: 1, published: 1, drafts: 0, archived: 0, featured: 1 });
  });

  await suite.test('archiving retains the record but removes it publicly', async () => {
    const archived = await api.request(`/api/v1/admin/gallery/${item.id}/archive`, {
      token,
      method: 'POST',
      body: { version: item.version },
    });
    assert.equal(archived.status, 200);
    assert.equal(archived.data.data.status, 'ARCHIVED');

    const publicGallery = await api.request('/api/v1/gallery?limit=10');
    assert.equal(publicGallery.data.data.length, 0);

    const adminGallery = await api.request('/api/v1/admin/gallery?status=ARCHIVED', { token });
    assert.equal(adminGallery.data.data.length, 1);
    assert.equal(adminGallery.data.data[0].id, item.id);
  });
});
