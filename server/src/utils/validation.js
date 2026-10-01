const { HttpError } = require('./http');
const { cleanString, normalizeEmail, isValidEmail } = require('./text');

const CONTACT_STATUSES = ['NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'];
const APPLICATION_TYPES = ['STUDENT', 'ORGANIZATION'];
const APPLICATION_STATUSES = ['NEW', 'IN_REVIEW', 'CONTACTED', 'APPROVED', 'REJECTED', 'ARCHIVED'];
const ORGANIZATION_TYPES = ['SCHOOL', 'COLLEGE', 'UNIVERSITY', 'GOVERNMENT', 'NGO', 'COMPANY', 'OTHER'];
const SOLUTIONS = [
  'SCIENCE_KITS',
  'SCIENCE_PARK',
  'SPACE_LAB',
  'STEM_LAB',
  'WORKSHOP_TRAINING',
  'TEACHER_TRAINING',
  'CUSTOM',
];

const requireString = (value, field, maxLength) => {
  const result = cleanString(value, maxLength);
  if (!result) throw new HttpError(400, `${field} is required`);
  return result;
};

const optionalString = (value, maxLength) => {
  const result = cleanString(value, maxLength);
  return result || null;
};

const parseContactPayload = (body = {}) => {
  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) throw new HttpError(400, 'A valid email is required');

  return {
    name: requireString(body.name, 'name', 120),
    email,
    phone: optionalString(body.phone, 32),
    organization: optionalString(body.organization, 180),
    subject: optionalString(body.subject, 180),
    message: requireString(body.message, 'message', 5000),
  };
};

const parseStudentDetails = (details = {}) => ({
  institutionName: requireString(details.institutionName, 'details.institutionName', 180),
  educationLevel: requireString(details.educationLevel, 'details.educationLevel', 100),
  interestArea: requireString(details.interestArea, 'details.interestArea', 180),
  proposalDetails: requireString(details.proposalDetails, 'details.proposalDetails', 5000),
  wantsInstitutionSetup: Boolean(details.wantsInstitutionSetup),
  setupInterest: optionalString(details.setupInterest, 500),
  institutionCity: optionalString(details.institutionCity, 120),
});

const parseOrganizationDetails = (details = {}) => {
  const organizationType = cleanString(details.organizationType, 40).toUpperCase();
  if (!ORGANIZATION_TYPES.includes(organizationType)) {
    throw new HttpError(400, `details.organizationType must be one of: ${ORGANIZATION_TYPES.join(', ')}`);
  }

  const requestedSolutions = Array.isArray(details.requestedSolutions)
    ? [...new Set(details.requestedSolutions.map((item) => cleanString(item, 80).toUpperCase()).filter(Boolean))]
    : [];

  if (requestedSolutions.length === 0 || requestedSolutions.some((item) => !SOLUTIONS.includes(item))) {
    throw new HttpError(400, `details.requestedSolutions must contain one or more of: ${SOLUTIONS.join(', ')}`);
  }

  let estimatedStudents = null;
  if (details.estimatedStudents !== undefined && details.estimatedStudents !== null && details.estimatedStudents !== '') {
    estimatedStudents = Number.parseInt(details.estimatedStudents, 10);
    if (!Number.isInteger(estimatedStudents) || estimatedStudents < 1 || estimatedStudents > 1_000_000) {
      throw new HttpError(400, 'details.estimatedStudents must be a positive integer');
    }
  }

  return {
    organizationName: requireString(details.organizationName, 'details.organizationName', 180),
    organizationType,
    designation: requireString(details.designation, 'details.designation', 120),
    institutionAddress: requireString(details.institutionAddress, 'details.institutionAddress', 1000),
    requestedSolutions,
    requirementDetails: requireString(details.requirementDetails, 'details.requirementDetails', 5000),
    estimatedStudents,
    timeline: optionalString(details.timeline, 180),
    budgetRange: optionalString(details.budgetRange, 180),
  };
};

const parseApplicationPayload = (body = {}) => {
  const applicantType = cleanString(body.applicantType, 30).toUpperCase();
  if (!APPLICATION_TYPES.includes(applicantType)) {
    throw new HttpError(400, `applicantType must be one of: ${APPLICATION_TYPES.join(', ')}`);
  }

  const email = normalizeEmail(body.email);
  if (!isValidEmail(email)) throw new HttpError(400, 'A valid email is required');

  return {
    applicantType,
    name: requireString(body.name, 'name', 120),
    email,
    phone: requireString(body.phone, 'phone', 32),
    city: optionalString(body.city, 120),
    state: optionalString(body.state, 120),
    message: optionalString(body.message, 3000),
    details: applicantType === 'STUDENT'
      ? parseStudentDetails(body.details)
      : parseOrganizationDetails(body.details),
  };
};

const parsePagination = (query = {}) => {
  const page = Math.max(1, Number.parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, Number.parseInt(query.limit, 10) || 20));
  return { page, limit, offset: (page - 1) * limit };
};

const parseEnumQuery = (value, allowedValues, field) => {
  if (!value) return null;
  const normalized = cleanString(value, 60).toUpperCase();
  if (!allowedValues.includes(normalized)) {
    throw new HttpError(400, `${field} must be one of: ${allowedValues.join(', ')}`);
  }
  return normalized;
};

module.exports = {
  CONTACT_STATUSES,
  APPLICATION_TYPES,
  APPLICATION_STATUSES,
  parseContactPayload,
  parseApplicationPayload,
  parsePagination,
  parseEnumQuery,
};
