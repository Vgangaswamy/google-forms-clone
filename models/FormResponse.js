const mongoose = require('mongoose');

const FormResponseSchema = new mongoose.Schema({
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true
  },
  answers: {
    type: Map,
    of: mongoose.Schema.Types.Mixed, // Mixed type because answers can be strings, arrays, etc.
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('FormResponse', FormResponseSchema);
