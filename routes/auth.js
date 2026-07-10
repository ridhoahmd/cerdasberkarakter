const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/index');
const { JWT_SECRET } = require('../middleware/auth');

router.get('/login', (req, res) => {
  res.render('admin/login');
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      req.session.token = token;
      req.session.userId = user.id;
      req.session.isAdmin = user.role === 'admin';

      return res.redirect('/admin/dashboard');
    }

    res.render('admin/login', { error: 'Email atau password salah' });
  } catch (error) {
    console.error('Login error:', error);
    res.render('admin/login', { error: 'Terjadi kesalahan sistem' });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

module.exports = router;
