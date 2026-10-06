const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const inventory = require('../../data/legacy-blogs.json');

function escapeMarkdown(value) { return value.replace(/[\\`*_{}\[\]<>#~]/g, '\\$&'); }
function legacyMarkdown(post) {
  return [escapeMarkdown(post.introduction), ...post.sections.map(section =>
    [`## ${escapeMarkdown(section.title)} {#${section.id}}`, ...section.paragraphs.map(escapeMarkdown), ...(section.steps || []).map(step => `- ${escapeMarkdown(step)}`)].join('\n\n')),
    `> ${escapeMarkdown(post.takeaway)}`, '## Further reading {#further-reading}', 'Explore these teaching resources alongside this guide.',
    ...post.resources.map(resource => `- [${escapeMarkdown(resource.label)}](${resource.href})`)].join('\n\n');
}

async function migrateExistingBlogs(client) {
  // The caller owns a transaction. A stable legacy_key prevents reimport after
  // an administrator renames or archives an article; existing rows are never updated.
  // The uncommitted marker serializes simultaneous startup migrations. It is
  // rolled back with the articles if verification fails.
  const claim = await client.query('INSERT INTO blog_migrations (name,source_sha256,article_count) VALUES ($1,$2,0) ON CONFLICT DO NOTHING RETURNING name', [inventory.migration,inventory.sourceSha256]);
  if (!claim.rows.length) {
    const recorded = await client.query('SELECT * FROM blog_migrations WHERE name=$1', [inventory.migration]);
    assert.equal(recorded.rows[0].source_sha256, inventory.sourceSha256, 'Legacy archive changed after migration');
    assert.equal(recorded.rows[0].article_count, inventory.articles.length, 'Incomplete migration marker');
    const retained = await client.query('SELECT COUNT(*)::int AS count FROM blogs WHERE legacy_key = ANY($1::text[])', [inventory.articles.map(post => `code:${post.slug}`)]);
    assert.equal(retained.rows[0].count, inventory.articles.length, 'A migrated record is missing; archive articles through CMS instead of deleting database rows');
    return { migrated: false, articles: recorded.rows[0].article_count };
  }
  for (const post of inventory.articles) {
    const legacyKey = `code:${post.slug}`;
    const exists = await client.query('SELECT id FROM blogs WHERE legacy_key=$1', [legacyKey]);
    const id = exists.rows[0]?.id || crypto.randomUUID();
    const date = `${post.date}T00:00:00+05:30`;
    await client.query(`INSERT INTO blogs (id,legacy_key,title,slug,excerpt,content,category,featured_image,image_alt,image_caption,author,seo_title,seo_description,status,published_at,created_at,updated_at)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'Ignited Brains',$3,$5,'PUBLISHED',$11,$11,$11)
      ON CONFLICT (legacy_key) DO NOTHING`, [id,legacyKey,post.title,post.slug,post.excerpt,legacyMarkdown(post),post.category,post.image,post.alt,post.imageCaption,date]);
    await client.query('INSERT INTO blog_slug_aliases (slug,blog_id) VALUES ($1,$2) ON CONFLICT DO NOTHING', [post.slug,id]);
  }
  const migrated = await client.query("SELECT * FROM blogs WHERE legacy_key LIKE 'code:%'");
  assert.equal(migrated.rows.length, inventory.articles.length, 'Every existing article must migrate');
  for (const post of inventory.articles) {
    const row = migrated.rows.find(item => item.legacy_key === `code:${post.slug}`);
    for (const [field,value] of Object.entries({ title:post.title,slug:post.slug,excerpt:post.excerpt,content:legacyMarkdown(post),category:post.category,featured_image:post.image,image_alt:post.alt,image_caption:post.imageCaption,author:'Ignited Brains',seo_title:post.title,seo_description:post.excerpt,status:'PUBLISHED' })) assert.equal(row[field],value, `${post.slug}: ${field}`);
    assert.equal(new Date(row.published_at).toISOString(), new Date(`${post.date}T00:00:00+05:30`).toISOString(), `${post.slug}: original date`);
    const aliases = await client.query('SELECT blog_id FROM blog_slug_aliases WHERE slug=$1', [post.slug]);
    assert.equal(aliases.rows[0]?.blog_id, row.id, `${post.slug}: original URL`);
  }
  await client.query('UPDATE blog_migrations SET article_count=$2,verified_at=NOW() WHERE name=$1', [inventory.migration,inventory.articles.length]);
  return { migrated:true, articles:inventory.articles.length };
}
module.exports = { migrateExistingBlogs, legacyMarkdown, inventory };
