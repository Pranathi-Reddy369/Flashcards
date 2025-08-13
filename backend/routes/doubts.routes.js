const express = require('express');
const router = express.Router();
const Doubt = require('../models/Doubts');


router.post('/', async (req, res) => {
  try {
    const newDoubt = new Doubt(req.body);
    const saved = await newDoubt.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Failed to submit doubt:', error);
    res.status(500).json({ message: 'Failed to submit doubt' });
  }
});

router.get('/', async (req, res) => {
  try {
    const doubts = await Doubt.find();
    res.json(doubts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch doubts' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updated = await Doubt.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('Failed to update doubt:', error);
    res.status(500).json({ message: 'Failed to update doubt' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    await Doubt.findByIdAndDelete(req.params.id);
    res.json({ message: 'Doubt deleted successfully ✅' });
  } catch (error) {
    console.error('Failed to delete doubt:', error);
    res.status(500).json({ message: 'Failed to delete doubt' });
  }
});
module.exports = router;
