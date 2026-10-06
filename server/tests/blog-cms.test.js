const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs/promises');
const path = require('node:path');
const sharp = require('sharp');
const { createTestApi } = require('./helpers/test-api');
const { inventory, legacyMarkdown } = require('../src/services/migrate-blogs');

test('one blog database serves migration, publishing, media and separate analytics', async suite => {
  const api = await createTestApi();
  suite.after(() => api.close());
  const token = (await api.login()).data.token;
  const admin = (route, options = {}) => api.request('/api/v1/admin' + route, { token, ...options });
  let original;
  let created;
  let uploaded;
  const draft = { title: 'A real CMS draft', slug: 'a-real-cms-draft', excerpt: 'A practical experiment.', content: 'An introduction.\n\n## Build and test\n\nFull article content with **emphasis**.', category: 'STEM Education', tags: ['Experiments', 'Schools'], image: inventory.articles[0].image, imageAlt: 'Students conducting an experiment', imageCaption: 'A real school session', author: 'Editorial team', seoTitle: 'CMS experiment guide', seoDescription: 'A custom description for search engines.', status: 'DRAFT' };

  await suite.test('every old article retains full content, dates, images, metadata and public URL', async () => {
    const list = await api.request('/api/v1/blogs?limit=100');
    assert.equal(list.status, 200);
    assert.equal(list.data.pagination.total, inventory.articles.length);
    assert.equal((await admin('/blogs')).data.pagination.total, inventory.articles.length);
    for (const post of inventory.articles) {
      const result = await api.request(`/api/v1/blogs/${post.slug}`);
      assert.equal(result.status, 200, post.slug);
      const actual = result.data.data;
      assert.equal(actual.title, post.title); assert.equal(actual.slug, post.slug);
      assert.equal(actual.content, legacyMarkdown(post)); assert.equal(actual.excerpt, post.excerpt);
      assert.equal(actual.category, post.category); assert.deepEqual(actual.tags, []);
      assert.equal(actual.image, post.image); assert.equal(actual.imageAlt, post.alt);
      assert.equal(actual.imageCaption, post.imageCaption);
      assert.equal(actual.publishedAt, new Date(`${post.date}T00:00:00+05:30`).toISOString());
      assert.equal(actual.seoTitle, post.title); assert.equal(actual.seoDescription, post.excerpt);
      assert.equal(actual.author, 'Ignited Brains');
      assert.equal(actual.views, undefined); assert.equal(actual.impressions, undefined);
      const image = await fs.readFile(path.join(__dirname, '../../client/public', post.image));
      assert.ok(image.length > 0); assert.ok((await sharp(image).metadata()).width > 0);
      const editable = await admin(`/blogs/${actual.id}`);
      assert.equal(editable.data.data.content, actual.content);
      if (!original) original = editable.data.data;
    }
    const marker = (await api.database.query('SELECT * FROM blog_migrations')).rows[0];
    assert.equal(marker.article_count, 6); assert.ok(marker.verified_at);
  });

  await suite.test('draft CRUD, public exclusion, field validation, duplicate slugs and stale edits', async () => {
    assert.equal((await admin('/blogs', { method: 'POST', body: {} })).status, 400);
    assert.equal((await admin('/blogs', { method: 'POST', body: { ...draft, slug: '../bad' } })).status, 400);
    assert.equal((await admin('/blogs', { method: 'POST', body: { ...draft, image: 'https://untrusted.test/image.svg' } })).status, 400);
    for (const publishedAt of [false, 0, '0000-01-01T00:00:00Z', '2026-02-30T00:00:00Z', '2999-01-01T00:00:00Z']) assert.equal((await admin('/blogs', { method: 'POST', body: { ...draft, publishedAt } })).status, 400);
    const result = await admin('/blogs', { method: 'POST', body: draft });
    assert.equal(result.status, 201); created = result.data.data;
    for (const key of ['title', 'slug', 'excerpt', 'content', 'category', 'image', 'imageAlt', 'imageCaption', 'author', 'seoTitle', 'seoDescription']) assert.equal(created[key], draft[key]);
    assert.deepEqual(created.tags, draft.tags); assert.equal(created.publishedAt, null);
    assert.equal((await api.request(`/api/v1/blogs/${created.slug}`)).status, 404);
    assert.equal((await api.request('/api/v1/blogs?query=A%20real%20CMS%20draft')).data.pagination.total, 0);
    assert.equal((await admin('/blogs?status=DRAFT&query=CMS')).data.pagination.total, 1);
    assert.equal((await admin('/blogs', { method: 'POST', body: draft })).status, 409);
    assert.equal((await admin(`/blogs/${created.id}`, { method: 'PATCH', body: { ...draft, version: created.version, status: 'PUBLISHED', content: '' } })).status, 400);
    const changed = await admin(`/blogs/${created.id}`, { method: 'PATCH', body: { ...draft, version: created.version, title: 'Edited draft', status: 'PUBLISHED' } });
    assert.equal(changed.status, 200); created = changed.data.data;
    assert.ok(created.publishedAt); assert.equal(created.version, 2);
    const published = await api.request(`/api/v1/blogs/${created.slug}`);
    assert.equal(published.data.data.title, 'Edited draft'); assert.equal(published.data.data.seoTitle, draft.seoTitle);
    assert.ok((await api.request('/api/v1/blogs/sitemap')).data.data.some(item => item.slug === created.slug));
    assert.equal((await admin(`/blogs/${created.id}`, { method: 'PATCH', body: { ...draft, version: 1 } })).status, 409);
    assert.equal((await admin(`/blogs/${created.id}`, { method: 'PATCH', body: draft })).status, 400);
    assert.equal((await admin(`/blogs/${created.id}`, { method: 'PATCH', body: { ...draft, version: 999999999999 } })).status, 400);
    assert.equal((await admin(`/blogs/${crypto.randomUUID()}`)).status, 404);
  });

  await suite.test('separate deduplicated impressions and views retain no raw visitor identifiers', async () => {
    const visitorId = crypto.randomUUID();
    const event = { blogId: original.id, visitorId, kind: 'IMPRESSION', source: 'LISTING' };
    const send = body => api.request('/api/v1/blog-events', { method: 'POST', body });
    const concurrent = await Promise.all([send(event), send(event), send(event)]);
    assert.equal(concurrent.filter(result => result.data.recorded).length, 1);
    assert.equal((await send({ ...event, source: 'RELATED' })).data.recorded, false);
    assert.equal((await send({ ...event, kind: 'VIEW', source: 'ARTICLE' })).data.recorded, true);
    assert.equal((await send({ ...event, kind: 'VIEW', source: 'ARTICLE' })).data.recorded, false);
    assert.equal((await send({ ...event, visitorId: crypto.randomUUID() })).data.recorded, true);
    const updated = (await admin(`/blogs/${original.id}`)).data.data;
    assert.equal(updated.impressions, 2); assert.equal(updated.views, 1);
    assert.equal((await send({ ...event, visitorId: 'invalid' })).status, 400);
    assert.equal((await send({ ...event, kind: 'VIEW' })).status, 400);
    const rows = (await api.database.query('SELECT * FROM blog_events WHERE blog_id=$1', [original.id])).rows;
    assert.equal(rows.length, 3); assert.equal(JSON.stringify(rows).includes(visitorId), false);
    const summary = (await admin('/dashboard/summary')).data.blogs;
    assert.equal(summary.views, 1); assert.equal(summary.impressions, 2);
  });

  await suite.test('renaming a migrated article preserves original links; seed never overwrites CMS edits', async () => {
    const oldSlug = original.slug;
    original = (await admin(`/blogs/${original.id}`, { method: 'PATCH', body: { ...original, title: 'An edited existing article', slug: 'edited-existing-article', tags: ['Migrated'], version: original.version } })).data.data;
    assert.equal(original.slug, 'edited-existing-article');
    assert.equal((await api.request(`/api/v1/blogs/${oldSlug}`)).data.data.slug, original.slug);
    assert.equal((await api.request(`/api/v1/blog-resolve/${oldSlug}`)).data.data.slug, original.slug);
    assert.equal((await admin('/blogs', { method: 'POST', body: { ...draft, slug: oldSlug } })).status, 409);
    await api.migrate(); await api.migrate();
    assert.equal((await admin(`/blogs/${original.id}`)).data.data.title, original.title);
    assert.equal((await api.database.query('SELECT COUNT(*)::int AS count FROM blogs')).rows[0].count, 7);
    const sitemap = (await api.request('/api/v1/blogs/sitemap')).data.data;
    assert.ok(sitemap.some(item => item.slug === original.slug)); assert.ok(!sitemap.some(item => item.slug === oldSlug));
  });

  await suite.test('archive hides both canonical and old URLs while retaining content and analytics; restore works', async () => {
    const archived = await admin(`/blogs/${original.id}/archive`, { method: 'POST', body: { version: original.version } });
    assert.equal(archived.status, 200); original = archived.data.data;
    assert.equal(original.status, 'ARCHIVED'); assert.ok(original.archivedAt);
    assert.equal(original.views, 1); assert.equal(original.impressions, 2);
    assert.equal((await api.request(`/api/v1/blogs/${original.slug}`)).status, 404);
    assert.equal((await api.request(`/api/v1/blogs/${inventory.articles[0].slug}`)).status, 404);
    assert.equal((await api.request(`/api/v1/blog-resolve/${inventory.articles[0].slug}`)).status, 404);
    assert.ok(!(await api.request('/api/v1/blogs/sitemap')).data.data.some(item => item.slug === original.slug));
    assert.equal((await admin('/blogs?status=ARCHIVED')).data.pagination.total, 1);
    await api.migrate();
    assert.equal((await admin(`/blogs/${original.id}`)).data.data.status, 'ARCHIVED');
    assert.equal((await api.database.query('SELECT COUNT(*)::int AS count FROM blog_events WHERE blog_id=$1', [original.id])).rows[0].count, 3);
    original = (await admin(`/blogs/${original.id}`, { method: 'PATCH', body: { ...original, status: 'PUBLISHED', version: original.version } })).data.data;
    assert.equal(original.archivedAt, null); assert.equal(original.views, 1);
    assert.equal((await api.request(`/api/v1/blogs/${original.slug}`)).status, 200);
    const unpublished = await admin(`/blogs/${original.id}`, { method: 'PATCH', body: { ...original, status: 'DRAFT', version: original.version } });
    assert.equal(unpublished.status, 200); assert.equal((await api.request(`/api/v1/blogs/${original.slug}`)).status, 404);
  });

  await suite.test('image uploads are validated, optimized, durable, deduplicated and publicly served', async () => {
    async function upload(bytes, contentType = 'image/png', bearer = token) {
      const response = await fetch(api.origin + '/api/v1/admin/blog-media', { method: 'POST', headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': contentType }, body: bytes });
      return { status: response.status, data: await response.json() };
    }
    assert.equal((await upload(Buffer.from('<svg onload="alert(1)"/>'), 'image/svg+xml')).status, 400);
    assert.equal((await upload(Buffer.from('not an image'))).status, 400);
    assert.equal((await upload(await sharp({ create: { width: 20, height: 20, channels: 3, background: '#ff7f32' } }).png().toBuffer())).status, 400);
    const bytes = await sharp({ create: { width: 2200, height: 1200, channels: 3, background: '#113057' } }).png().toBuffer();
    uploaded = (await upload(bytes)).data.data;
    assert.ok(uploaded.url.startsWith('/api/v1/media/')); assert.equal(uploaded.width, 1600);
    assert.ok(uploaded.bytes < 700 * 1024);
    assert.equal((await upload(bytes)).data.data.url, uploaded.url);
    const served = await fetch(api.origin + uploaded.url);
    assert.equal(served.headers.get('content-type'), 'image/webp');
    assert.ok(served.headers.get('cache-control').includes('immutable'));
    assert.equal((await sharp(Buffer.from(await served.arrayBuffer())).metadata()).width, 1600);
    const cached = await fetch(api.origin + uploaded.url, { headers: { 'If-None-Match': served.headers.get('etag') } });
    assert.equal(cached.status, 304);
    created = (await admin(`/blogs/${created.id}`, { method: 'PATCH', body: { ...created, image: uploaded.url, version: created.version } })).data.data;
    assert.equal(created.image, uploaded.url); assert.equal(created.content, draft.content);
    assert.equal((await upload(bytes, 'image/png', 'bad-token')).status, 401);
  });

  await suite.test('pagination, category/date search and every CMS write require authentication', async () => {
    const list = await admin('/blogs?page=2&limit=2');
    assert.equal(list.data.data.length, 2); assert.equal(list.data.pagination.total, 7); assert.equal(list.data.pagination.totalPages, 4);
    assert.equal((await api.request('/api/v1/blogs?category=STEM%20Education&query=experiment')).status, 200);
    assert.equal((await admin('/blogs?dateFrom=2026-02-30')).status, 400);
    assert.equal((await admin('/blogs?dateFrom=2026-10-06&dateTo=2026-10-05')).status, 400);
    for (const [route, method, body] of [['/blogs', 'POST', draft], [`/blogs/${created.id}`, 'PATCH', { ...created }], [`/blogs/${created.id}/archive`, 'POST', { version: created.version }]]) assert.equal((await api.request('/api/v1/admin' + route, { method, body })).status, 401);
    for (const route of ['/blogs', `/blogs/${created.id}`, '/blog-assets']) assert.equal((await api.request('/api/v1/admin' + route)).status, 401);
    await api.request('/api/v1/admin/auth/logout', { token, method: 'POST' });
    assert.equal((await admin(`/blogs/${created.id}`, { method: 'PATCH', body: created })).status, 401);
  });
});
