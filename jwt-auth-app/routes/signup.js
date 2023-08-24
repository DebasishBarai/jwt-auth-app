// routes/signup.js
const dotenv = require('dotenv');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const router = express.Router();

// In-memory user database (replace with a real database in production)
const users = [];

router.post('/', async (req, res) => {
  // Signup logic here
  const { username, password, role } = req.body;

  // Check if username already exists
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = {
      id: users.length + 1, //id to be auto generated
      username,
      password: hashedPassword,
      role
    };

    users.push(newUser);

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.SECRET_KEY);

    res.status(201).json({ message: 'User created successfully', token });

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'An error occurred during signup' });
  }
});

module.exports = router;
