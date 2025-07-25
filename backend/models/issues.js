const mongoose = require('mongoose');

const IssueSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Issue', IssueSchema);
