const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  inputs: [{
    type: { type: String, enum: ['mcq', 'text'], required: true },
    question: { type: String, required: true },
    options: [{ type: String }], // Only for MCQ
  }],
  link: { type: String, unique: true },
});

module.exports = mongoose.model('Form', formSchema);