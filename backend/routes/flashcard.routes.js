const express = require('express');
const router = express.Router();
const FlashcardSet = require('../models/FlashcardSet'); 
router.get('/', async (req, res) => {
  try {
    const sets = await FlashcardSet.find();
    res.json(sets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch sets', error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const set = await FlashcardSet.findById(req.params.id);
    if (!set) return res.status(404).json({ message: 'Set not found' });
    res.json(set);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching set', error: err.message });
  }
});


router.post('/', async (req, res) => {
  const set = new FlashcardSet(req.body);
  try {
    const newSet = await set.save();
    res.status(201).json(newSet);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create set', error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedSet = await FlashcardSet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSet) return res.status(404).json({ message: 'Set not found for update' });
    res.json(updatedSet);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update set', error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedSet = await FlashcardSet.findByIdAndDelete(req.params.id);
    if (!deletedSet) return res.status(404).json({ message: 'Set not found for deletion' });
    res.json({ message: 'Flashcard set deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete set', error: err.message });
  }
});

module.exports = router;
