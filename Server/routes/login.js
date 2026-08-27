const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('email match:', email === process.env.ADMIN_EMAIL);
  console.log('hash exists:', !!process.env.ADMIN_PASSWORD);

  const user = process.env.ADMIN_EMAIL;
  if (user!=email) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ email, role:'admin'  }, process.env.SECRET_KEY, { expiresIn: '1h' });
  
  res.cookie('token', token, {
    httpOnly: true,   
    secure: true,     
    maxAge: 60 * 60 * 1000  
  });

  res.json({ message: 'Logged in!' });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out!' });
});

module.exports = router;