const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');

router.post('/', async (req, res) => {
  try {
    const newBookmark = new Bookmark(req.body);
    await newBookmark.save();
    res.status(201).json({ message: 'Bookmark saved ', bookmark: newBookmark });
  } catch (error) {
    console.error('Bookmark Save Error:', error.stack || error); 
    res.status(500).json({ message: 'Failed to save bookmark', error: error.message });
  }
});




router.get('/set/:setId', async (req, res) => {
  try {
    const query = { setId: req.params.setId };
    if (req.query.cardId) {
      query.cardId = Number(req.query.cardId);
    }
    const bookmarks = await Bookmark.find(query);
    res.json(bookmarks);
  } catch (error) {
    console.error('Fetch Bookmarks Error:', error);
    res.status(500).json({ message: 'Failed to fetch bookmarks' });
  }
});



router.delete('/:id', async (req, res) => {
  try {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bookmark deleted ✅' });
  } catch (error) {
    console.error('Delete Bookmark Error:', error);
    res.status(500).json({ message: 'Failed to delete bookmark' });
  }
});




router.get('/', async (req, res) => {
  try {
    const bookmarks = await Bookmark.find(); 
    res.status(200).json(bookmarks);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ message: 'Failed to fetch bookmarks' });
  }
});
module.exports = router;
