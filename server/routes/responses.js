const express = require('express');
const router = express.Router();
const responseController = require('../controllers/responseController');
const auth = require('../middleware/auth');

router.post('/submit/:formId', responseController.submitResponse);
router.get('/form/:formId', auth, responseController.getFormResponses);

module.exports = router;