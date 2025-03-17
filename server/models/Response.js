const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  formId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  answers: [
    {
      questionId: Number,
      value: String,
    },
  ],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Response', responseSchema);