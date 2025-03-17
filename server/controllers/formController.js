const { v4: uuidv4 } = require('uuid');
const Form = require('../models/Form');
const User = require('../models/User');

const createForm = async (req, res) => {
  const { title, inputs } = req.body;
  const userId = req.user.id; // From JWT middleware
  try {
    const formId = uuidv4();
    const link = `/form/${formId}`;
    const form = new Form({ userId, title, inputs, link });
    await form.save();

    await User.findByIdAndUpdate(userId, { $push: { forms: form._id } });
    res.status(201).json({ link, formId: form._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserForms = async (req, res) => {
  const userId = req.user.id;
  try {
    const forms = await Form.find({ userId });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getFormById = async (req, res) => {
  const { formId } = req.params;
  try {
    const form = await Form.findOne({ link: `/form/${formId}` });
    if (!form) return res.status(404).json({ message: 'Form not found' });
    res.json(form);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteForm = async (req, res) => {
  const formId = req.params.formId; // The MongoDB _id of the form
  const userId = req.user.id;
  try {
    const form = await Form.findOne({ _id: formId, userId });
    if (!form) {
      return res.status(404).json({ message: 'Form not found or unauthorized' });
    }

    // Delete the form
    await Form.deleteOne({ _id: formId });

    // Remove the form from the user's forms array
    await User.findByIdAndUpdate(userId, { $pull: { forms: formId } });

    res.json({ message: 'Form deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createForm, getUserForms, getFormById, deleteForm };