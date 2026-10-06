const { HttpError } = require('../utils/http');

const managedImage = /^\/api\/v1\/media\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/i;
const topLevelSections = [
  'hero','learning','featured','insights','visualStories','moments','field',
  'photoJournal','students','events','press','manifesto','earthCta',
];

function assertPlainObject(value, field) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new HttpError(400, field + ' must be an object');
  }
}

function validateNode(value, path = 'content', depth = 0) {
  if (depth > 10) throw new HttpError(400, 'Media page content is nested too deeply');
  if (value === null) return;

  if (typeof value === 'string') {
    if (value.length > 6000) throw new HttpError(400, path + ' is too long');
    if (value.includes('\u0000')) throw new HttpError(400, path + ' contains an unsupported control character');
    if ((/\.href$/.test(path) || /\.externalUrl$/.test(path)) && value && !value.startsWith('/') && !value.startsWith('#') && !/^https:\/\//i.test(value)) {
      throw new HttpError(400, path + ' must be an internal path, page anchor or HTTPS URL');
    }
    if (/\.src$/.test(path) && value) {
      if (!value.startsWith('/') || value.startsWith('//') || /[<>]/.test(value)) {
        throw new HttpError(400, path + ' must be a local image path');
      }
    }
    return;
  }

  if (typeof value === 'number') {
    if (!Number.isFinite(value) || value < 0 || value > 100000) throw new HttpError(400, path + ' contains an invalid number');
    return;
  }

  if (typeof value === 'boolean') return;

  if (Array.isArray(value)) {
    if (value.length > 60) throw new HttpError(400, path + ' contains too many items');
    value.forEach((item, index) => validateNode(item, path + '[' + index + ']', depth + 1));
    return;
  }

  assertPlainObject(value, path);
  if ('src' in value && 'alt' in value && 'width' in value && 'height' in value) {
    if (typeof value.src !== 'string' || !value.src.trim()) throw new HttpError(400, path + '.src is required');
    if (typeof value.alt !== 'string') throw new HttpError(400, path + '.alt must be text');
    if (!Number.isFinite(value.width) || value.width < 1 || !Number.isFinite(value.height) || value.height < 1) {
      throw new HttpError(400, path + ' contains invalid image dimensions');
    }
  }
  const keys = Object.keys(value);
  if (keys.length > 80) throw new HttpError(400, path + ' contains too many fields');
  for (const [key, child] of Object.entries(value)) {
    if (!/^[A-Za-z][A-Za-z0-9]*$/.test(key)) throw new HttpError(400, path + ' contains an unsupported field');
    validateNode(child, path + '.' + key, depth + 1);
  }
}

function collectManagedImageIds(value, ids = new Set()) {
  if (Array.isArray(value)) {
    value.forEach(item => collectManagedImageIds(item, ids));
    return ids;
  }
  if (!value || typeof value !== 'object') return ids;
  for (const [key, child] of Object.entries(value)) {
    if (key === 'src' && typeof child === 'string') {
      const match = child.match(managedImage);
      if (match) ids.add(match[1]);
    } else {
      collectManagedImageIds(child, ids);
    }
  }
  return ids;
}

async function validateMediaPageContent(client, content) {
  assertPlainObject(content, 'content');
  const keys = Object.keys(content);
  for (const section of topLevelSections) {
    if (!(section in content)) throw new HttpError(400, 'Missing media page section: ' + section);
    assertPlainObject(content[section], 'content.' + section);
    if (typeof content[section].visible !== 'boolean') throw new HttpError(400, 'content.' + section + '.visible must be true or false');
  }
  if (keys.some(key => !topLevelSections.includes(key))) throw new HttpError(400, 'Media page content contains an unsupported section');

  const encoded = JSON.stringify(content);
  if (Buffer.byteLength(encoded, 'utf8') > 220 * 1024) throw new HttpError(400, 'Media page content is too large');
  validateNode(content);

  const ids = [...collectManagedImageIds(content)];
  if (ids.length) {
    const found = await client.query('SELECT id FROM blog_media WHERE id = ANY($1::text[])', [ids]);
    const available = new Set(found.rows.map(row => row.id));
    const missing = ids.filter(id => !available.has(id));
    if (missing.length) throw new HttpError(400, 'One or more uploaded media images no longer exist');
  }
  return content;
}

function checkVersion(value) {
  if (!Number.isSafeInteger(value) || value < 1 || value > 2147483647) {
    throw new HttpError(400, 'The current media page version is required. Reload the editor.');
  }
  return value;
}

module.exports = { validateMediaPageContent, checkVersion };
