const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  questions: [
    {
      questionText: {
        type: String,
        required: true
      },
      questionType: {
        type: String, // e.g., 'text', 'multiple-choice', 'checkbox'
        required: true
      },
      options: [String] // For multiple-choice or checkbox questions
    }
  ]
});

module.exports = mongoose.model('Form', FormSchema);
