require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const FlashcardSet = require('./models/FlashcardSet');

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'yourSecretKey';

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected ✅'))
  .catch(err => console.error('MongoDB connection failed ❌', err));

// 🔐 Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ✅ Signup Route
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, gender, joined } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstName, lastName, email, password: hashedPassword, gender, joined });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully ✅' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Internal error during signup' });
  }
});

// ✅ Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal error during login' });
  }
});

// 📘 Flashcard API (Protected with JWT middleware)

// Create Flashcard Set
app.post('/flashcards', authenticateToken, async (req, res) => {
  try {
    const set = new FlashcardSet(req.body);
    await set.save();
    res.status(201).json(set);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create flashcard set' });
  }
});

// Get All Sets
app.get('/flashcards', async (req, res) => {
  try {
    const sets = await FlashcardSet.find();
    res.json(sets);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch flashcard sets' });
  }
});

// Get Single Set
app.get('/flashcards/:id', async (req, res) => {
  try {
    const set = await FlashcardSet.findById(req.params.id);
    if (!set) return res.status(404).json({ message: 'Set not found' });
    res.json(set);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching set' });
  }
});

// Update Set
app.put('/flashcards/:id', authenticateToken, async (req, res) => {
  try {
    const updated = await FlashcardSet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating set' });
  }
});

// Delete Set
app.delete('/flashcards/:id', authenticateToken, async (req, res) => {
  try {
    await FlashcardSet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Set deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting set' });
  }
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
