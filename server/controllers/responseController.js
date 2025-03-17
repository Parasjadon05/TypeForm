const Response = require('../models/Response');
const Form = require('../models/Form');

exports.submitResponse = async (req, res) => {
  try {
    const formId = req.params.formId;
    const { email, answers } = req.body;

    // Validate email if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const form = await Form.findOne({ link: `/form/${formId}` });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const response = new Response({
      form: form._id,
      formId: formId,
      email: email || 'Not provided',
      answers,
    });

    await response.save();
    res.status(201).json({ message: 'Response submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFormResponses = async (req, res) => {
  try {
    const formId = req.params.formId;
    const form = await Form.findOne({ link: `/form/${formId}` });
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const responses = await Response.find({ form: form._id }).select('email answers submittedAt');
    res.json(responses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};