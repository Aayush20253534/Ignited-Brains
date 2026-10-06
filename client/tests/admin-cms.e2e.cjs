const assert = require('node:assert/strict');
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const { spawn } = require('node:child_process');
const { chromium } = require('playwright');
const sharp = require('../../server/node_modules/sharp');
const { createTestApi } = require('../../server/tests/helpers/test-api');
const { inventory } = require('../../server/src/services/migrate-blogs');

// Real Express handlers, PostgreSQL, and a production Next build. The fixture
// explicitly replaces deployment credentials and disables outgoing email.
const client = path.resolve(__dirname, '..');
const port = Number(process.env.E2E_PORT || 3401);
const base = `http://127.0.0.1:${port}`;
const directory = process.env.TEST_ARTIFACT_DIR || path.join(client, 'test-results/admin-cms');
fs.mkdirSync(directory, { recursive: true });
const results = [], accessibility = [], errors = [], failedAssets = [];
let api, frontend, browser, page, token;
const pass = name => { results.push(name); console.log('Passed: ' + name); };
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function bounds(label, target = page) {
  const value = await target.evaluate(() => ({ width: innerWidth, document: document.documentElement.scrollWidth }));
  assert(value.document <= value.width, label + ' horizontal overflow: ' + JSON.stringify(value));
}
async function screenshot(name, target = page) {
  await target.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].filter(image => image.getBoundingClientRect().top < innerHeight && image.getBoundingClientRect().bottom > 0).map(image => image.decode().catch(() => {})));
  });
  await target.screenshot({ path: path.join(directory, name + '.png') });
}
async function audit(label, target = page) {
  await target.addScriptTag({ path: require.resolve('axe-core/axe.min.js') });
  const violations = await target.evaluate(async () => {
    const result = await axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa'] } });
    return result.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => ({ target: node.target, message: node.failureSummary })) }));
  });
  accessibility.push({ label, violations });
  if (violations.length) console.log('Accessibility findings: ' + label + ' ' + JSON.stringify(violations));
}
async function readyPage(route) {
  const response = await page.goto(base + route);
  assert.equal(response.status(), 200);
  await page.locator('h1').first().waitFor();
  assert.equal(await page.locator('[data-nextjs-dialog], .vite-error-overlay').count(), 0);
}
async function next(title) {
  await page.getByRole('button', { name: 'Save & Continue', exact: true }).click();
  await page.getByRole('heading', { name: title, exact: true }).waitFor();
  await bounds(title);
}
async function navigate(name) {
  const menu = page.getByRole('button', { name: 'Open admin navigation', exact: true });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole('navigation', { name: 'Admin sections' }).getByRole('button', { name: new RegExp('^' + name) }).click();
  await tableReady();
}
async function tableReady() {
  await page.waitForFunction(() => [...document.querySelectorAll('main [aria-busy]')].every(element => element.getAttribute('aria-busy') !== 'true'));
}
async function login() {
  await page.getByLabel('Email address', { exact: true }).fill(api.admin.email);
  await page.getByLabel('Password', { exact: true }).fill(api.admin.password);
  await page.getByRole('button', { name: 'Sign in to Admin', exact: true }).click();
  await page.getByRole('heading', { name: 'Dashboard Overview', exact: true }).waitFor();
  await page.waitForFunction(() => !document.querySelector('[aria-label="Refresh admin data"]').disabled);
  token = await page.evaluate(() => sessionStorage.getItem('ignited-brains-admin-token'));
}
async function signOut() {
  const menu = page.getByRole('button', { name: 'Open admin navigation', exact: true });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await page.getByRole('heading', { name: 'You’ve been signed out', exact: true }).waitFor();
  assert.equal(await page.evaluate(() => sessionStorage.getItem('ignited-brains-admin-token')), null);
}
const admin = (route, options = {}) => api.request('/api/v1/admin' + route, { token, ...options });
async function blog(id) { const result = await admin(`/blogs/${id}`); assert.equal(result.status, 200); return result.data.data; }

async function publicForms() {
  // Six-step student journey with errors, keyboard focus, saved answers, review/edit and real POST.
  await page.setViewportSize({ width: 1536, height: 1024 });
  await readyPage('/apply/student');
  assert.equal(await page.getByRole('button', { name: /Academic Details/ }).isDisabled(), true);
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  assert.equal(await page.getByLabel('Full Name', { exact: false }).getAttribute('aria-invalid'), 'true');
  await page.waitForFunction(() => document.activeElement.name === 'name');
  await page.getByLabel('Full Name', { exact: false }).fill('Browser Student');
  await page.locator('main').getByLabel('Email Address', { exact: false }).fill('bad-email');
  await page.getByLabel('Phone Number', { exact: false }).fill('+91 9876543210');
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.waitForFunction(() => document.activeElement.name === 'email');
  await page.locator('main').getByLabel('Email Address', { exact: false }).fill('student.browser@example.test');
  await page.getByLabel('City', { exact: true }).fill('Lucknow');
  await page.getByLabel('State', { exact: true }).fill('Uttar Pradesh');
  await next('Academic Details');
  await page.waitForFunction(() => document.activeElement.id === 'student-step-title');
  await page.getByLabel('School / Institution Name', { exact: false }).fill('Browser Student School');
  await page.getByLabel('Current Class / Education Level', { exact: false }).fill('Class 11');
  await page.getByLabel('Institution City', { exact: true }).fill('Lucknow');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  assert.equal(await page.getByLabel('Full Name', { exact: false }).inputValue(), 'Browser Student');
  await next('Academic Details');
  assert.equal(await page.getByLabel('School / Institution Name', { exact: false }).inputValue(), 'Browser Student School');
  await next('Interest Areas');
  await page.getByRole('button', { name: 'Astronomy & space science', exact: true }).click();
  await next('Project / Idea Details');
  await page.getByLabel('Your Project Idea / Proposal', { exact: false }).fill('A real browser submission for an astronomy club and telescope project.');
  await next('Additional Information');
  await page.getByLabel('Interested in a setup at your institution?', { exact: true }).selectOption('yes');
  await page.getByLabel('Setup / Programme Interest', { exact: true }).fill('Space lab');
  await page.getByLabel('Additional Message', { exact: true }).fill('Please contact me about astronomy workshops.');
  await next('Review & Submit');
  await page.getByRole('button', { name: 'Edit Personal Information', exact: true }).click();
  await page.getByLabel('Full Name', { exact: false }).fill('Browser Student Updated');
  await page.getByRole('button', { name: /Review & Submit/ }).click();
  await screenshot('student-review-desktop');
  // Simulate one unavailable response, then submit to the real API without interception.
  await page.route('**/api/v1/applications', route => route.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ error: 'Verification: temporary connection problem' }) }), { times: 1 });
  await page.getByRole('button', { name: 'Submit Application', exact: true }).click();
  await page.getByRole('alert').filter({ hasText: 'temporary connection problem' }).waitFor();
  assert(await page.getByText('Browser Student Updated', { exact: true }).isVisible());
  let studentPosts = 0;
  const countStudent = request => { if (request.url().endsWith('/api/v1/applications') && request.method() === 'POST') studentPosts++; };
  page.on('request', countStudent);
  const studentResponse = page.waitForResponse(response => response.url().endsWith('/api/v1/applications') && response.status() === 201);
  await page.locator('main form').evaluate(form => { form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true })); });
  const studentReceipt = await (await studentResponse).json();
  await page.getByRole('heading', { name: 'Thank you for taking the first step.', exact: true }).waitFor();
  assert.equal(studentPosts, 1); page.off('request', countStudent);
  const student = (await api.database.query('SELECT * FROM applications WHERE id = $1', [studentReceipt.id])).rows[0];
  assert.equal(student.name, 'Browser Student Updated');
  assert.equal(student.applicant_type, 'STUDENT');
  assert.equal(student.details.wantsInstitutionSetup, true);
  assert.equal(student.details.institutionName, 'Browser Student School');
  pass('Student: six steps, validation/focus, back/edit, API error recovery, duplicate guard and actual database persistence');

  // Eight-step organisation journey on mobile, validating solution selection and numeric bounds.
  await page.setViewportSize({ width: 390, height: 844 });
  await readyPage('/apply/organisation');
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.waitForFunction(() => document.activeElement.name === 'organizationName');
  await page.getByLabel('Organisation / Institution Name', { exact: false }).fill('Browser Organisation School');
  await page.getByLabel('Type of Institution', { exact: false }).selectOption('SCHOOL');
  await page.getByLabel('Address of Institution', { exact: false }).fill('Browser address, Lucknow, Uttar Pradesh');
  await page.getByLabel('City', { exact: true }).fill('Lucknow');
  await page.getByLabel('State', { exact: true }).fill('Uttar Pradesh');
  await next('Contact Person');
  await page.getByLabel('Full Name', { exact: false }).fill('Browser Organisation Contact');
  await page.getByLabel('Designation', { exact: false }).fill('Principal');
  await page.locator('main').getByLabel('Email Address', { exact: false }).fill('organisation.browser@example.test');
  await page.getByLabel('Phone Number', { exact: false }).fill('+91 9876543210');
  await next('Institution Profile');
  await page.getByLabel('Estimated Number of Students', { exact: true }).fill('0');
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.getByText('Enter a whole number between 1 and 1,000,000.', { exact: true }).waitFor();
  await page.getByLabel('Estimated Number of Students', { exact: true }).fill('800');
  await next('Areas of Interest');
  await page.getByRole('button', { name: 'Save & Continue' }).click();
  await page.getByText('Select at least one solution.', { exact: true }).waitFor();
  await page.getByLabel('Space Lab', { exact: true }).check();
  await page.getByLabel('Teacher Training', { exact: true }).check();
  await next('Requirements');
  await page.getByLabel('Requirement Details', { exact: false }).fill('A real browser submission for a space lab with teacher training.');
  await next('Budget & Timeline');
  await page.getByLabel('Budget Range', { exact: true }).fill('To be discussed');
  await page.getByLabel('Expected Timeline', { exact: true }).fill('Within 3 months');
  await next('Additional Information');
  await page.getByLabel('Additional Message', { exact: true }).fill('Please plan a visit to our school.');
  await next('Review & Submit');
  await screenshot('organisation-review-mobile');
  const organizationResponse = page.waitForResponse(response => response.url().endsWith('/api/v1/applications') && response.status() === 201);
  await page.getByRole('button', { name: 'Submit Application', exact: true }).click();
  const organizationReceipt = await (await organizationResponse).json();
  await page.getByRole('heading', { name: 'Thank you for taking the first step.', exact: true }).waitFor();
  const organization = (await api.database.query('SELECT * FROM applications WHERE id = $1', [organizationReceipt.id])).rows[0];
  assert.equal(organization.applicant_type, 'ORGANIZATION'); assert.equal(organization.details.estimatedStudents, 800);
  assert.deepEqual(organization.details.requestedSolutions, ['SPACE_LAB', 'TEACHER_TRAINING']);
  pass('Organisation: eight mobile steps, validation, solution selection, review and actual database persistence');


}

async function fixtures() {
  for (let index = 0; index < 14; index++) {
    await api.database.query(`INSERT INTO contact_submissions(id,name,email,phone,organization,subject,message,status,created_at)
      VALUES($1,$2,$3,'9999999999',$4,$5,$6,$7,$8)`, [crypto.randomUUID(), index === 0 ? 'Contact Lead' : `Contact ${index}`, `contact${index}@example.test`, index % 2 ? null : 'Verification School', 'Science partnership', index === 0 ? 'A telescope proposal with a complete message.' : 'Classroom enquiry fixture.', index % 3 ? 'NEW' : 'IN_PROGRESS', index === 0 ? '2026-10-05T20:00:00Z' : `2026-09-${String(index + 1).padStart(2, '0')}T12:00:00Z`]);
    const student = index % 2 === 0;
    const details = student ? { institutionName: 'Verification Student School', educationLevel: 'Class 11', institutionCity: 'Lucknow', interestArea: 'Astronomy', proposalDetails: 'Build and calibrate a student telescope.', wantsInstitutionSetup: true, setupInterest: 'Space lab' } : { organizationName: 'Verification Organisation School', organizationType: 'SCHOOL', designation: 'Principal', institutionAddress: 'Full institution address in Prayagraj', requestedSolutions: ['SPACE_LAB','TEACHER_TRAINING'], requirementDetails: 'A space lab with teacher workshops.', estimatedStudents: 800, timeline: 'Within three months', budgetRange: 'To be discussed' };
    await api.database.query(`INSERT INTO applications(id,applicant_type,name,email,phone,city,state,message,details,status,created_at) VALUES($1,$2,$3,$4,'9999999999','Prayagraj','Uttar Pradesh','Additional application message',$5::jsonb,$6,$7)`, [crypto.randomUUID(), student ? 'STUDENT' : 'ORGANIZATION', index === 0 ? 'Student Applicant' : index === 1 ? 'Organisation Applicant' : `Applicant ${index}`, `applicant${index}@example.test`, JSON.stringify(details), index % 3 ? 'NEW' : 'IN_REVIEW', index < 2 ? `2026-10-05T${20 - index}:00:00Z` : `2026-09-${String(index + 1).padStart(2, '0')}T12:00:00Z`]);
  }
  const bearer = (await api.login()).data.token;
  for (let index = 0; index < 7; index++) assert.equal((await api.request('/api/v1/admin/blogs', { token: bearer, method: 'POST', body: { title: `Pagination draft ${index}`, slug: `pagination-draft-${index}`, category: 'Verification drafts', content: `Draft fixture ${index}`, status: 'DRAFT' } })).status, 201);
}

async function main() {
  api = await createTestApi();
  frontend = spawn(process.execPath, ['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)], { cwd: client, env: { ...process.env, NODE_ENV: 'production', API_ORIGIN: api.origin }, stdio: ['ignore','pipe','pipe'] });
  await new Promise((resolve, reject) => { frontend.stdout.on('data', data => { if (data.toString().includes('Ready')) resolve(); }); frontend.stderr.on('data', data => process.stderr.write(data)); frontend.on('exit', code => reject(new Error('Frontend exited: ' + code))); });
  browser = await chromium.launch({ headless: true, ...(process.env.BROWSER_EXECUTABLE_PATH ? { executablePath: process.env.BROWSER_EXECUTABLE_PATH } : {}), args: ['--no-sandbox', ...(process.env.BROWSER_SINGLE_PROCESS === '1' ? ['--no-zygote','--single-process','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] : [])] });
  const context = await browser.newContext({ viewport: { width: 1536, height: 960 }, reducedMotion: 'reduce' });
  page = await context.newPage(); page.setDefaultTimeout(15000);
  page.on('pageerror', error => errors.push(error.message));
  page.on('dialog', dialog => dialog.accept());
  page.on('response', response => { if (response.status() >= 400 && (/\.(webp|png|svg|woff)(\?|$)/.test(response.url()) || response.url().includes('/_next/image'))) failedAssets.push({ url: response.url(), status: response.status() }); });
  await publicForms();
  await fixtures();
  await page.setViewportSize({ width: 1536, height: 960 });

  await readyPage('/admin');
  await page.getByRole('heading', { name: 'Welcome back.', exact: true }).waitFor();
  await audit('Sign in');
  await page.getByLabel('Email address', { exact: true }).fill(api.admin.email);
  await page.getByLabel('Password', { exact: true }).fill('incorrect-password');
  await page.getByRole('button', { name: 'Sign in to Admin', exact: true }).click();
  await page.getByRole('alert').filter({ hasText: 'Invalid email or password' }).waitFor();
  await login();
  pass('Valid sign-in, invalid credentials and authenticated dashboard');
  const summary = (await admin('/dashboard/summary')).data;
  assert.equal(summary.contacts.total, 14); assert.equal(summary.applications.total, 16); assert.equal(summary.blogs.total, 13);
  await page.getByRole('button', { name: 'Refresh admin data', exact: true }).click();
  await page.waitForFunction(() => !document.querySelector('[aria-label="Refresh admin data"]').disabled);
  await screenshot('overview-desktop'); await audit('Overview');
  await page.getByRole('button', { name: /Contact Lead/ }).click();
  await page.getByRole('dialog').getByText('A telescope proposal with a complete message.', { exact: true }).waitFor();
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /Student Applicant/ }).click();
  await page.getByRole('dialog').getByText('Build and calibrate a student telescope.', { exact: true }).waitFor();
  await page.keyboard.press('Escape');
  pass('Real counts, refresh and recent enquiry/application drawers');

  await navigate('Contact Enquiries');
  await screenshot('contacts-desktop'); await audit('Contact Enquiries');
  await page.getByRole('button', { name: 'Next page', exact: true }).click(); await tableReady();
  await page.getByText('Showing 11–14 of 14 enquiries', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Previous page', exact: true }).click(); await tableReady();
  await page.getByLabel('Search enquiries', { exact: true }).fill('telescope'); await tableReady();
  await page.getByRole('button', { name: 'View Contact Lead', exact: true }).waitFor();
  await page.getByLabel('Type', { exact: true }).selectOption('INDIVIDUAL'); await tableReady();
  await page.getByText('No submissions match these filters.', { exact: true }).waitFor();
  await page.getByLabel('Type', { exact: true }).selectOption('ORGANIZATION');
  await page.getByLabel('From date (IST)', { exact: true }).fill('2026-10-06');
  await page.getByLabel('To date (IST)', { exact: true }).fill('2026-10-06');
  await page.getByLabel('Status', { exact: true }).selectOption('IN_PROGRESS'); await tableReady();
  await page.getByRole('button', { name: 'View Contact Lead', exact: true }).click();
  const detail = page.getByRole('dialog'); await detail.getByText('A telescope proposal with a complete message.', { exact: true }).waitFor();
  await detail.getByLabel('Update status', { exact: true }).selectOption('RESOLVED');
  await detail.getByRole('button', { name: 'Save Status', exact: true }).click();
  await detail.getByText('Resolved', { exact: true }).first().waitFor();
  assert.equal((await api.database.query("SELECT status FROM contact_submissions WHERE name='Contact Lead'")).rows[0].status, 'RESOLVED');
  await page.keyboard.press('Escape');
  await page.getByLabel('Status', { exact: true }).selectOption('RESOLVED'); await tableReady();
  await page.getByRole('button', { name: 'View Contact Lead', exact: true }).waitFor();
  pass('Contact search, type/status/IST date filters, pagination, full details and persistent status');

  await navigate('Applications');
  await screenshot('applications-desktop'); await audit('Applications');
  await page.getByRole('button', { name: 'Next page', exact: true }).click(); await tableReady();
  await page.getByText('Showing 11–16 of 16 applications', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Previous page', exact: true }).click();
  await page.getByLabel('Search applications', { exact: true }).fill('calibrate');
  await page.getByLabel('Type', { exact: true }).selectOption('STUDENT');
  await page.getByLabel('Status', { exact: true }).selectOption('IN_REVIEW');
  await page.getByLabel('From date (IST)', { exact: true }).fill('2026-10-06');
  await page.getByLabel('To date (IST)', { exact: true }).fill('2026-10-06'); await tableReady();
  await page.getByRole('button', { name: 'View Student Applicant', exact: true }).click();
  await detail.getByText('Verification Student School', { exact: true }).waitFor();
  await detail.getByText('Yes', { exact: true }).waitFor();
  await detail.getByLabel('Update status', { exact: true }).selectOption('APPROVED');
  await detail.getByRole('button', { name: 'Save Status', exact: true }).click();
  await detail.getByText('Approved', { exact: true }).first().waitFor();
  assert.equal((await api.database.query("SELECT status FROM applications WHERE name='Student Applicant'")).rows[0].status, 'APPROVED');
  await page.keyboard.press('Escape'); await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await page.getByLabel('Search applications', { exact: true }).fill('Principal');
  await page.getByLabel('Type', { exact: true }).selectOption('ORGANIZATION'); await tableReady();
  await page.getByRole('button', { name: 'View Organisation Applicant', exact: true }).click();
  await detail.getByText('Verification Organisation School', { exact: true }).waitFor();
  await detail.getByText('Space Lab, Teacher Training', { exact: true }).waitFor();
  await detail.getByText('800', { exact: true }).waitFor();
  await screenshot('organisation-details'); await audit('Application details');
  await page.keyboard.press('Escape');
  pass('Application search, type/status/date filters, pagination, both full detail contracts and persistent status');

  await navigate('Blog Management');
  await screenshot('blogs-desktop'); await audit('Blog Management');
  await page.getByRole('button', { name: 'Next page', exact: true }).click(); await tableReady();
  await page.getByText('Showing 6–10 of 13 blogs', { exact: true }).waitFor();
  await page.getByLabel('Search blogs', { exact: true }).fill('hands-on science lesson'); await tableReady();
  await page.getByRole('button', { name: `Edit ${inventory.articles[0].title}`, exact: true }).click();
  await detail.getByRole('textbox', { name: /^Content/ }).waitFor();
  assert((await detail.getByRole('textbox', { name: /^Content/ }).inputValue()).includes(inventory.articles[0].introduction));
  assert.equal(await detail.getByLabel(/^Blog Title/).inputValue(), inventory.articles[0].title);
  await page.keyboard.press('Escape');
  await page.getByLabel('Search blogs', { exact: true }).fill('');
  await page.getByLabel('Publication status', { exact: true }).selectOption('PUBLISHED'); await tableReady();
  assert.equal(await page.getByRole('button', { name: /^Edit / }).count(), 5);
  await page.getByLabel('Category', { exact: true }).selectOption(inventory.articles[0].category); await tableReady();
  await page.getByRole('button', { name: `Preview ${inventory.articles[0].title}`, exact: true }).click();
  await detail.getByRole('heading', { name: inventory.articles[0].title, exact: true }).waitFor();
  await page.keyboard.press('Escape');
  await page.getByLabel('Publication status', { exact: true }).selectOption('');
  await page.getByLabel('Category', { exact: true }).selectOption('');
  pass('Migrated blogs are editable and previewable; CMS search, status/category filters and pagination');

  await page.getByRole('button', { name: 'Add New Blog', exact: true }).click();
  await detail.getByLabel(/^Blog Title/).fill('Browser CMS article');
  assert.equal(await detail.getByLabel(/^Slug/).inputValue(), 'browser-cms-article');
  await detail.getByLabel('Category', { exact: false }).fill('Browser learning');
  await detail.getByLabel('Author', { exact: true }).fill('Browser editor');
  await detail.getByLabel('Choose an existing image', { exact: true }).selectOption(inventory.articles[0].image);
  await detail.getByLabel(/^Image description/).fill('Students exploring a working prototype');
  await detail.getByLabel('Image caption', { exact: true }).fill('An authentic school demonstration.');
  await detail.getByLabel(/^Excerpt/).fill('A database-backed article created from the browser.');
  await detail.getByRole('textbox', { name: /^Content/ }).fill('A complete article introduction.\n\n## Build and test\n\nUse **evidence** and *iteration*.\n\n- Build a model\n- Test it fairly\n\n> Keep asking questions.\n\n[Visit the school projects](/projects)\n\n<script>window.__unsafeBlogScript = true</script>\n');
  await detail.getByLabel('Tags', { exact: true }).fill('orbit, workshops');
  await detail.locator('summary').filter({ hasText: 'SEO settings' }).click();
  await detail.getByLabel('SEO title', { exact: true }).fill('Browser CMS SEO title');
  await detail.getByLabel('SEO description', { exact: true }).fill('A real SEO description saved in the database.');
  await screenshot('blog-editor-desktop'); await audit('Blog editor');
  await detail.getByRole('button', { name: 'Preview', exact: true }).click();
  await detail.getByRole('heading', { name: 'Browser CMS article', exact: true }).waitFor();
  assert.equal(await page.evaluate(() => window.__unsafeBlogScript), undefined);
  await detail.getByRole('button', { name: 'Save Draft', exact: true }).click(); await detail.waitFor({ state: 'detached' });
  let created = (await admin('/blogs?query=Browser%20CMS%20article')).data.data[0]; assert(created);
  created = await blog(created.id); assert.equal(created.status, 'DRAFT'); assert.deepEqual(created.tags, ['orbit','workshops']); assert.equal(created.author, 'Browser editor');
  assert.equal((await api.request('/api/v1/blogs/browser-cms-article')).status, 404);
  const publicContext = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  const visitor = await publicContext.newPage(); visitor.setDefaultTimeout(15000); visitor.on('pageerror', error => errors.push(error.message));
  // Next can stream a not-found boundary with a 200 status to regular browsers.
  // The page must still render the 404 boundary with noindex and no article.
  const draftPage = await visitor.goto(base + '/blog/browser-cms-article');
  assert([200, 404].includes(draftPage.status()));
  await visitor.getByRole('heading', { name: 'This page does not exist.', exact: true }).waitFor();
  assert.equal(await visitor.getByRole('heading', { name: 'Browser CMS article', exact: true }).count(), 0);
  assert(await visitor.locator('meta[name="robots"][content*="noindex"]').count() > 0);
  pass('Create draft with every field, auto slug, private preview, safe Markdown and public exclusion');

  await page.getByLabel('Search blogs', { exact: true }).fill('Browser CMS article'); await tableReady();
  await page.getByRole('button', { name: 'Edit Browser CMS article', exact: true }).click();
  await detail.getByLabel('Upload featured image', { exact: true }).setInputFiles({ name: 'unsupported.svg', mimeType: 'image/svg+xml', buffer: Buffer.from('<svg/>') });
  await detail.getByRole('alert').filter({ hasText: 'Choose a JPG' }).waitFor();
  const image = await sharp(fs.readFileSync(path.join(client, 'public', inventory.articles[0].image))).resize({ width: 1000 }).png().toBuffer();
  const uploaded = page.waitForResponse(response => response.url().endsWith('/api/v1/admin/blog-media') && response.status() === 201);
  await detail.getByLabel('Upload featured image', { exact: true }).setInputFiles({ name: 'school.png', mimeType: 'image/png', buffer: image });
  const upload = (await (await uploaded).json()).data;
  await detail.getByLabel('Status', { exact: true }).selectOption('PUBLISHED');
  await detail.getByRole('button', { name: 'Publish Blog', exact: true }).click(); await detail.waitFor({ state: 'detached' });
  created = await blog(created.id); assert.equal(created.status, 'PUBLISHED'); assert.equal(created.image, upload.url);
  assert.equal((await fetch(base + upload.url)).headers.get('content-type'), 'image/webp');
  assert.equal((await fetch(base + '/blog/browser-cms-article')).status, 200);
  pass('Validated upload travels through the real frontend proxy, persists and publishes a public article');

  // All six original public articles must render their full archive, not a fallback dataset.
  for (const legacy of inventory.articles) {
    assert.equal((await visitor.goto(base + '/blog/' + legacy.slug)).status(), 200);
    await visitor.getByRole('heading', { name: legacy.title, exact: true }).waitFor();
    const rendered = (await visitor.locator('main > article').innerText()).replace(/\s+/g, ' ');
    for (const text of [legacy.introduction, legacy.takeaway, ...legacy.sections.flatMap(section => [section.title, ...section.paragraphs, ...(section.steps || [])]), ...legacy.resources.map(resource => resource.label)]) assert(rendered.includes(text.replace(/\s+/g, ' ')), legacy.slug + ' complete content: ' + text.slice(0, 50));
    assert.equal(await visitor.locator('meta[name="description"]').getAttribute('content'), legacy.excerpt);
    assert.equal(new URL(await visitor.locator('link[rel="canonical"]').getAttribute('href')).pathname, '/blog/' + legacy.slug);
    await visitor.locator('article header time').first().waitFor();
    assert.equal(await visitor.locator('article header time').first().getAttribute('datetime'), new Date(`${legacy.date}T00:00:00+05:30`).toISOString());
    await visitor.locator('article figure img').first().evaluate(image => image.decode());
    assert(await visitor.locator('article figure img').first().evaluate(image => image.naturalWidth > 0));
  }
  await api.migrate();
  assert.equal((await api.database.query("SELECT COUNT(*)::int AS count FROM blogs WHERE legacy_key LIKE 'code:%'")).rows[0].count, 6);
  pass('Every original slug, title, full article, image, date, metadata and URL renders from PostgreSQL; rerun is idempotent');

  created = await blog(created.id); const before = { views: created.views, impressions: created.impressions };
  await visitor.goto(base + '/blog');
  await visitor.getByRole('heading', { name: 'Browser CMS article', exact: true }).waitFor();
  await visitor.getByRole('heading', { name: 'Browser CMS article', exact: true }).scrollIntoViewIfNeeded();
  await delay(1500);
  let metrics = await blog(created.id);
  assert.equal(metrics.views, before.views); assert.equal(metrics.impressions, before.impressions + 1);
  for (let index = 0; index < 4; index++) { await visitor.evaluate(() => scrollTo(0, 0)); await visitor.getByRole('heading', { name: 'Browser CMS article', exact: true }).scrollIntoViewIfNeeded(); await delay(1100); }
  assert.equal((await blog(created.id)).impressions, metrics.impressions);
  await visitor.goto(base + '/blog/browser-cms-article'); await delay(1400);
  assert.equal(await visitor.locator('meta[name="description"]').getAttribute('content'), created.seoDescription);
  assert((await visitor.title()).includes(created.seoTitle));
  assert.equal(await visitor.evaluate(() => window.__unsafeBlogScript), undefined);
  metrics = await blog(created.id); assert.equal(metrics.views, before.views + 1);
  await visitor.reload(); await delay(1300); assert.equal((await blog(created.id)).views, metrics.views);
  await screenshot('public-article', visitor); await audit('Public article', visitor);
  await page.getByRole('button', { name: 'Refresh admin data', exact: true }).click(); await tableReady();
  const metricsRow = page.getByRole('row').filter({ hasText: 'Browser CMS article' });
  await metricsRow.getByRole('cell', { name: String(metrics.impressions), exact: true }).first().waitFor();
  pass('Real viewport impressions, repeat-scroll deduplication, separate article views, refresh deduplication, SEO and real Admin metrics');

  await page.getByRole('button', { name: 'Edit Browser CMS article', exact: true }).click();
  await detail.getByLabel(/^Blog Title/).fill('Browser CMS article updated');
  await detail.getByLabel(/^Slug/).fill('browser-cms-article-updated');
  await detail.getByRole('button', { name: 'Save Blog', exact: true }).click(); await detail.waitFor({ state: 'detached' });
  const oldDate = created.createdAt; created = await blog(created.id);
  assert.equal(created.createdAt, oldDate); assert.equal(created.views, metrics.views); assert.equal(created.impressions, metrics.impressions);
  const redirect = await fetch(base + '/blog/browser-cms-article', { redirect: 'manual' });
  assert.equal(redirect.status, 308); assert.equal(new URL(redirect.headers.get('location'), base).pathname, '/blog/browser-cms-article-updated');
  await visitor.goto(base + '/blog/browser-cms-article'); assert.equal(visitor.url(), base + '/blog/browser-cms-article-updated');
  const sitemap = await (await fetch(base + '/sitemap.xml')).text();
  assert(sitemap.includes('/blog/browser-cms-article-updated</loc>')); assert(!sitemap.includes('/blog/browser-cms-article</loc>'));
  pass('Editing retains history/analytics; renamed slug redirects old URLs and updates sitemap');

  await page.getByRole('button', { name: 'Add New Blog', exact: true }).click();
  await detail.getByLabel(/^Blog Title/).fill('Duplicate attempt'); await detail.getByLabel(/^Slug/).fill('browser-cms-article');
  await detail.getByRole('button', { name: 'Save Draft', exact: true }).click();
  await detail.getByRole('alert').filter({ hasText: 'already in use' }).waitFor();
  await detail.getByRole('button', { name: 'Cancel', exact: true }).click();
  await page.getByRole('button', { name: 'Remove Browser CMS article updated', exact: true }).click();
  await detail.getByRole('button', { name: 'Cancel', exact: true }).click();
  assert.equal((await api.request('/api/v1/blogs/browser-cms-article-updated')).status, 200);
  await page.getByRole('button', { name: 'Remove Browser CMS article updated', exact: true }).click();
  await detail.getByRole('button', { name: 'Remove Blog', exact: true }).click(); await detail.waitFor({ state: 'detached' });
  created = await blog(created.id); assert.equal(created.status, 'ARCHIVED'); assert.equal(created.views, metrics.views);
  assert.equal((await api.request('/api/v1/blogs/browser-cms-article-updated')).status, 404);
  await visitor.goto(base + '/blog/browser-cms-article-updated');
  await visitor.getByRole('heading', { name: 'This page does not exist.', exact: true }).waitFor();
  assert.equal(await visitor.getByRole('heading', { name: 'Browser CMS article updated', exact: true }).count(), 0);
  assert(!(await (await fetch(base + '/sitemap.xml')).text()).includes('/blog/browser-cms-article-updated</loc>'));
  await page.getByLabel('Publication status', { exact: true }).selectOption('ARCHIVED'); await tableReady();
  await page.getByRole('button', { name: 'Restore Browser CMS article updated', exact: true }).click();
  await detail.getByLabel('Status', { exact: true }).selectOption('PUBLISHED');
  await detail.getByRole('button', { name: 'Publish Blog', exact: true }).click(); await detail.waitFor({ state: 'detached' });
  assert.equal((await api.request('/api/v1/blogs/browser-cms-article-updated')).status, 200);
  await api.migrate(); assert.equal((await blog(created.id)).title, 'Browser CMS article updated');
  pass('Reserved duplicate slug rejection, confirmation/cancel, real soft archive, public/sitemap exclusion and restore');

  // Migrated records must follow the exact same UI write/archive path as new posts.
  const legacy = inventory.articles[0];
  await page.getByLabel('Publication status', { exact: true }).selectOption('');
  await page.getByLabel('Search blogs', { exact: true }).fill('hands-on science lesson'); await tableReady();
  await page.getByRole('button', { name: `Edit ${legacy.title}`, exact: true }).click();
  await detail.getByLabel(/^Blog Title/).fill(legacy.title + ' (CMS updated)');
  assert.equal(await detail.getByLabel(/^Slug/).inputValue(), legacy.slug);
  const originalContent = await detail.getByRole('textbox', { name: /^Content/ }).inputValue();
  await detail.getByRole('textbox', { name: /^Content/ }).fill(originalContent + '\n\nAn editorial note added through Admin.');
  await detail.getByRole('button', { name: 'Save Blog', exact: true }).click(); await detail.waitFor({ state: 'detached' });
  const revised = (await api.request('/api/v1/blogs/' + legacy.slug)).data.data;
  assert.equal(revised.title, legacy.title + ' (CMS updated)'); assert(revised.content.endsWith('An editorial note added through Admin.'));
  assert.equal(revised.publishedAt, new Date(`${legacy.date}T00:00:00+05:30`).toISOString());
  await visitor.goto(base + '/blog/' + legacy.slug); await visitor.getByRole('heading', { name: revised.title, exact: true }).waitFor();
  await page.getByRole('button', { name: `Remove ${revised.title}`, exact: true }).click();
  await detail.getByRole('button', { name: 'Remove Blog', exact: true }).click(); await detail.waitFor({ state: 'detached' });
  await api.migrate();
  assert.equal((await api.request('/api/v1/blogs/' + legacy.slug)).status, 404);
  assert.equal((await blog(revised.id)).status, 'ARCHIVED');
  await page.getByLabel('Publication status', { exact: true }).selectOption('ARCHIVED'); await tableReady();
  await page.getByRole('button', { name: `Restore ${revised.title}`, exact: true }).click();
  await detail.getByLabel('Status', { exact: true }).selectOption('PUBLISHED');
  await detail.getByRole('button', { name: 'Publish Blog', exact: true }).click(); await detail.waitFor({ state: 'detached' });
  await api.migrate();
  assert.equal((await api.request('/api/v1/blogs/' + legacy.slug)).data.data.title, revised.title);
  pass('Existing migrated blog edited, publicly updated, archived and restored through the same UI; migration preserves every change');

  // Exercise every admin workspace at common widths, including full editor keyboard containment.
  for (const [width, height] of [[1536,960],[1280,800],[768,1024],[390,844],[320,740]]) {
    await page.setViewportSize({ width, height });
    for (const name of ['Overview','Contact Enquiries','Applications','Blog Management']) {
      await navigate(name); await bounds(`${width} ${name}`); await screenshot(`${width}-${name.toLowerCase().replaceAll(' ', '-')}`);
    }
    await page.getByRole('button', { name: 'Add New Blog', exact: true }).click();
    await detail.getByLabel(/^Blog Title/).waitFor(); await bounds(`${width} editor`);
    await detail.getByRole('button', { name: 'Save Blog', exact: true }).evaluate(button => { const r = button.getBoundingClientRect(); if (r.bottom > innerHeight || r.top < 0) throw new Error('Save action is clipped'); });
    await page.keyboard.press('Tab'); assert(await page.evaluate(() => document.querySelector('dialog').contains(document.activeElement)));
    await screenshot(`${width}-editor`); if (width === 390 || width === 768) await audit(`${width} editor`);
    await page.keyboard.press('Escape'); await detail.waitFor({ state: 'detached' });
    if (width === 390 || width === 768) await audit(`${width} blog workspace`);
    pass(`All four admin views and accessible editor at ${width}×${height}`);
  }
  await page.setViewportSize({ width: 1536, height: 960 });
  const oldToken = token;
  await page.route('**/api/v1/admin/auth/logout', route => route.abort('failed'), { times: 1 });
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await page.getByRole('heading', { name: 'Finish signing out', exact: true }).waitFor();
  assert.equal(await page.evaluate(() => sessionStorage.getItem('ignited-brains-admin-token')), null);
  await page.getByRole('button', { name: 'Retry Sign Out', exact: true }).click();
  await page.getByRole('heading', { name: 'You’ve been signed out', exact: true }).waitFor();
  await audit('Signed out');
  for (const route of ['/blogs','/contacts','/applications','/dashboard/summary','/blog-assets']) {
    assert.equal((await api.request('/api/v1/admin' + route, { token: oldToken })).status, 401);
    assert.equal((await fetch(base + '/api/v1/admin' + route)).status, 401);
  }
  await page.getByRole('button', { name: 'Sign in again', exact: true }).click(); await login();
  await page.reload(); await page.getByRole('heading', { name: 'Dashboard Overview', exact: true }).waitFor();
  await signOut();
  await page.evaluate(bearer => sessionStorage.setItem('ignited-brains-admin-token', bearer), oldToken); await page.reload();
  await page.getByRole('heading', { name: 'Welcome back.', exact: true }).waitFor();
  assert.equal(await page.evaluate(() => sessionStorage.getItem('ignited-brains-admin-token')), null);
  pass('Session restoration, logout failure/retry, signed-out screen, revoked token replay and protected API rejection');
  await visitor.close().catch(() => {}); await publicContext.close().catch(() => {});
  assert.deepEqual(errors, [], 'No browser runtime exceptions'); assert.deepEqual(failedAssets, [], 'No failed image/font requests');
  assert.deepEqual(accessibility.filter(report => report.violations.length), [], 'All accessibility audits pass');
  console.log(`Completed ${results.length} browser checks and ${accessibility.length} accessibility audits.`);
}
main().catch(async error => {
  console.error(error); process.exitCode = 1;
  if (page) { await screenshot('failure').catch(() => {}); fs.writeFileSync(path.join(directory, 'failure.html'), await page.content().catch(() => '')); }
}).finally(async () => {
  fs.writeFileSync(path.join(directory, 'report.json'), JSON.stringify({ results, accessibility, errors, failedAssets }, null, 2));
  if (browser) await browser.close(); if (frontend) frontend.kill('SIGTERM'); if (api) await api.close();
});
