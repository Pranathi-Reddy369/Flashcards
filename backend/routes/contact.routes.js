const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST: Submit contact message
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Contact message submitted successfully' });
  } catch (err) {
    console.error('Contact submit error:', err);
    res.status(500).json({ message: 'Failed to submit contact' });
  }
});

// GET: Fetch all contact messages (admin usage)
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contact messages' });
  }
});

module.exports = router;
