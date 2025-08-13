require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./models/user');
const FlashcardSet = require('./models/FlashcardSet');
const Doubts = require('./models/Doubts')

//  Import all routes
const flashcardRoutes = require('./routes/flashcard.routes');
const issueRoutes = require('./routes/issues.routes');
const feedbackRoutes = require('./routes/feedback.routes');
const bookmarkRoutes = require('./routes/bookmark.routes'); 
const doubtRoutes = require('./routes/doubts.routes'); 
const contactRoutes = require('./routes/contact.routes');


const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'yourSecretKey';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection failed', err));


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}


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


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal error during login' });
  }
});


app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

app.put('/users/:id', authenticateToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
});


app.delete('/users/:id', authenticateToken, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ message: 'Failed to delete user' });
  }
});



app.use('/flashcards', authenticateToken, flashcardRoutes);
app.use('/issues', authenticateToken, issueRoutes);
app.use('/feedback', authenticateToken, feedbackRoutes);
app.use('/bookmarks', authenticateToken, bookmarkRoutes);  // ✅ NEW
app.use('/doubts', authenticateToken, doubtRoutes); 
app.use('/contacts', authenticateToken, contactRoutes);



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
