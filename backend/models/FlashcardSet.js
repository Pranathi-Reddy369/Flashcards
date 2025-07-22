const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
  id: Number,
  question: String,
  answer: String,
  favorite: Boolean,
  difficulty: String,
  isReviewed: Boolean
});

const VideoSchema = new mongoose.Schema({
  title: String,
  url: String,
  duration: String
});

const ResourceSchema = new mongoose.Schema({
  title: String,
  link: String,
  type: String
});

const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
  difficulty: String
});

const ResponseSchema = new mongoose.Schema({
  user: String,
  answer: String
});

const DoubtSchema = new mongoose.Schema({
  id: String,
  setId: String,
  user: String,
  question: String,
  upvotes: Number,
  likedByUser: Boolean,
  responses: [ResponseSchema]
});

const FlashcardSetSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  cards: [FlashcardSchema],
  deletedAt: String,
  videos: [VideoSchema],
  resources: [ResourceSchema],
  quizzes: [QuizSchema],
  doubts: [DoubtSchema],
  lastReviewed: String,
  createdBy: String
});

module.exports = mongoose.model('FlashcardSet', FlashcardSetSchema);
