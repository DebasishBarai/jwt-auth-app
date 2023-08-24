// routes/login.js
const dotenv = require('dotenv');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const router = express.Router();

// In-memory user database (replace with a real database in production)
const users = [];

router.post('/', async (req, res) => {
  // login logic here
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.status(401).json({ message: 'user does not exist' });
  }

  try {
    // Validate password using bcryptjs
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

    res.status(201).json({ message: 'User login successful', token });
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

module.exports = router;
