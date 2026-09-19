const express = require('express');
const { asyncHandler } = require('../utils/http');
const { parseContactPayload, parseApplicationPayload } = require('../utils/validation');
const { createContact, createApplication } = require('../services/submissions');
const { createRateLimiter } = require('../middleware/security');

const router = express.Router();

const publicSubmissionLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000,
  max: 20,
});

router.post('/contact', publicSubmissionLimiter, asyncHandler(async (req, res) => {
  const payload = parseContactPayload(req.body);
  const created = await createContact(payload);

  res.status(201).json({
    message: 'Your enquiry has been submitted successfully.',
    id: created.id,
  });
}));

router.post('/applications', publicSubmissionLimiter, asyncHandler(async (req, res) => {
  const payload = parseApplicationPayload(req.body);
  const created = await createApplication(payload);

  res.status(201).json({
    message: 'Your application has been submitted successfully.',
    id: created.id,
    applicantType: created.applicant_type,
  });
}));

module.exports = router;
