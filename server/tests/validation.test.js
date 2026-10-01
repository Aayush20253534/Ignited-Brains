const test = require('node:test');
const assert = require('node:assert/strict');
const { parseContactPayload, parseApplicationPayload } = require('../src/utils/validation');

test('contact payload is normalized', () => {
  const result = parseContactPayload({
    name: '  Test User  ',
    email: 'TEST@Example.com ',
    message: 'Need information about science kits.',
  });

  assert.equal(result.name, 'Test User');
  assert.equal(result.email, 'test@example.com');
});

test('student application requires student details', () => {
  assert.throws(() => parseApplicationPayload({
    applicantType: 'student',
    name: 'Student',
    email: 'student@example.com',
    phone: '9999999999',
    details: {},
  }), /institution name is required/);
});

test('organization application accepts structured requirements', () => {
  const result = parseApplicationPayload({
    applicantType: 'organization',
    name: 'Principal',
    email: 'principal@example.edu',
    phone: '9999999999',
    details: {
      organizationName: 'Example School',
      organizationType: 'school',
      designation: 'Principal',
      institutionAddress: 'Prayagraj, Uttar Pradesh',
      requestedSolutions: ['science_park', 'space_lab'],
      requirementDetails: 'We want a science park and space lab for students.',
      estimatedStudents: 800,
    },
  });

  assert.equal(result.applicantType, 'ORGANIZATION');
  assert.deepEqual(result.details.requestedSolutions, ['SCIENCE_PARK', 'SPACE_LAB']);
});

const organizationPayload = (details) => ({
  applicantType: 'ORGANIZATION', name: 'Educator', email: 'teacher@example.com', phone: '9999999999',
  details: { organizationName: 'Example School', organizationType: 'SCHOOL', designation: 'Teacher', institutionAddress: 'Example City', requirementDetails: 'A robotics lab', ...details },
});

test('AI robotics is accepted and duplicate solution requests are normalized', () => {
  const result = parseApplicationPayload(organizationPayload({ requestedSolutions: ['ai_robotics', 'AI_ROBOTICS'] }));
  assert.deepEqual(result.details.requestedSolutions, ['AI_ROBOTICS']);
});

test('student count rejects fractional and partially numeric values', () => {
  for (const estimatedStudents of ['1.5', '12students', '0', '1000001']) {
    assert.throws(() => parseApplicationPayload(organizationPayload({ requestedSolutions: ['AI_ROBOTICS'], estimatedStudents })), /whole number/);
  }
});
