const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');
const auth = require('../middleware/auth');

router.post('/create', auth, formController.createForm);
router.get('/user', auth, formController.getUserForms);
router.get('/:formId', formController.getFormById);
router.delete('/delete/:formId', auth, formController.deleteForm); // Ensure this line exists

module.exports = router;