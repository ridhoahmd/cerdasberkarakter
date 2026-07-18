const jwt = require('jsonwebtoken');
const { User } = require('../models');

if (!process.env.JWT_SECRET) {
  throw new Error('❌ JWT_SECRET wajib diset di file .env! Jangan gunakan nilai default.');
}
const JWT_SECRET = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  let token = authHeader && authHeader.split(' ')[1];

  // Fallback to session token for CMS routes that don't send Authorization header
  if (!token && req.session && req.session.token) {
    token = req.session.token;
  }

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
}

function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Admin access required' });
  }
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

module.exports = { authenticateToken, isAdmin, generateToken, JWT_SECRET };
