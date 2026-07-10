require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const { sequelize } = require('./models/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const apiRoutes = require('./routes/api');
const indexRoutes = require('./routes/index');
const { initDB } = require('./models/initDB');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'cerdasberkarakter-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log('');
      console.log('╔═══════════════════════════════════════════════════════════╗');
      console.log('║                                                           ║');
      console.log('║   CERDAS BERKARAKTER - Platform ERP Pendidikan            ║');
      console.log('║                                                           ║');
      console.log('╠═══════════════════════════════════════════════════════════╣');
      console.log(`║   Landing Page :  http://localhost:${PORT}                    ║`);
      console.log(`║   Admin CMS    :  http://localhost:${PORT}/admin              ║`);
      console.log(`║   API Endpoint :  http://localhost:${PORT}/api              ║`);
      console.log('║                                                           ║');
      console.log('║   Login       :  admin@cerdasberkarakter.id               ║');
      console.log('║   Password     :  admin123                                ║');
      console.log('║                                                           ║');
      console.log('╚═══════════════════════════════════════════════════════════╝');
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

startServer();
