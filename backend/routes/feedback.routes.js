const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');


router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: 'Failed to submit feedback', details: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch feedbacks', details: err.message });
  }
});

module.exports = router;
