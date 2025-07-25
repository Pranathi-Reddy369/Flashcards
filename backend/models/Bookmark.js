const mongoose = require('mongoose');
const bookmarkSchema = new mongoose.Schema({
  setId: { type: String, required: true },
  cardId: { type: Number, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true }
});


module.exports = mongoose.model('Bookmark', bookmarkSchema);
