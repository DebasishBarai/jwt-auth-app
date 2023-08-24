// routes/protected.js
const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');

dotenv.config();

const router = express.Router();

// In-memory user database (replace with a real database in production)
const users = [];

router.get('/protected', (req, res) => {
    // Verify JWT token
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token missing' });
    }
    
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const user = users.find(u => u.id === decoded.userId);
      if (!user) {
        throw new Error();
      }
      
      res.json({ message: 'Welcome to the protected route, ' + user.username });
    } catch (err) {
      res.status(401).json({ message: 'Token invalid' });
    }
  });

  module.exports = router;