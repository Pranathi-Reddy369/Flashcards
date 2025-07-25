const express = require('express');
const router = express.Router();
const Issue = require('../models/issues');

// Create a new issue (POST /)
router.post('/', async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create issue: ' + error.message });
  }
});

// Get all issues (GET /)
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch issues: ' + error.message });
  }
});

module.exports = router;
