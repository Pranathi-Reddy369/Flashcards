const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  user: { type: String, required: true },
  answer: { type: String, required: true }
});

const doubtSchema = new mongoose.Schema({
  setId: { type: String, required: true },
  user: { type: String, required: true },
  question: { type: String, required: true },
  upvotes: { type: Number, default: 0 },
  responses: { type: [responseSchema], default: [] }
});

module.exports = mongoose.model('Doubt', doubtSchema);
