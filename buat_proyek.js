const fs = require('fs');
const path = require('path');

// Konfigurasi Struktur Folder & File
const projectStructure = {
  '.env': `PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cerdasberkarakter
DB_USER=postgres
DB_PASSWORD=ganti_dengan_password_anda
SESSION_SECRET=rahasia_cerdas_berkarakter_2024
NODE_ENV=development`,

  '.gitignore': `node_modules
.env
.DS_Store
*.log
public/uploads`,

  'package.json': `{
  "name": "cerdasberkarakter",
  "version": "1.0.0",
  "description": "Landing Page & CMS CERDAS BERKARAKTER",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "init-db": "node models/initDB.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "connect-pg-simple": "^9.0.0",
    "dotenv": "^16.3.1",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "pg": "^8.11.3",
    "pg-hstore": "^2.3.4",
    "sequelize": "^6.35.0"
  }
}`,

  'app.js': `require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const { sequelize } = require('./models/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const indexRoutes = require('./routes/index');
const { initDB } = require('./models/initDB');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);

const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(\`✅ Server berjalan: http://localhost:\${PORT}\`);
      console.log(\`✅ Admin: http://localhost:\${PORT}/admin/login (admin/admin123)\`);
    });
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

startServer();`,

  'middleware/auth.js': `const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.isAdmin) return next();
  return res.redirect('/admin/login');
};
module.exports = { isAuthenticated };`,

  'models/database.js': `const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false
});
module.exports = { sequelize };`,

  'models/index.js': `const { sequelize } = require('./database');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: 'admin' }
});

const Content = sequelize.define('Content', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  section: { type: DataTypes.STRING, allowNull: false }, // hero, features, about, contact
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  order: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = { sequelize, User, Content };`,

  'models/initDB.js': `const bcrypt = require('bcryptjs');
const { sequelize, User, Content } = require('./index');

const initDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synchronized.');

    const adminExists = await User.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({ username: 'admin', password: hashedPassword });
      console.log('✅ Default admin created (user: admin, pass: admin123)');
    }

    const contentCount = await Content.count();
    if (contentCount === 0) {
      await Content.bulkCreate([
        { section: 'hero', title: 'CERDAS BERKARAKTER', description: 'Platform Pendidikan Karakter Modern untuk Masa Depan Bangsa', order: 1 },
        { section: 'about', title: 'Tentang Kami', description: 'Kami berdedikasi membentuk generasi cerdas dan berkarakter.', order: 2 },
        { section: 'features', title: 'Fitur Unggulan', description: 'Kurikulum terstruktur, mentor ahli, dan komunitas positif.', order: 3 },
        { section: 'contact', title: 'Hubungi Kami', description: 'Siap berkolaborasi? Hubungi kami via WhatsApp.', order: 4 }
      ]);
      console.log('✅ Default content seeded.');
    }
  } catch (error) {
    console.error('❌ Init DB Error:', error);
  }
};

module.exports = { initDB };`,

  'routes/index.js': `const express = require('express');
const router = express.Router();
const { Content } = require('../models/index');

router.get('/', async (req, res) => {
  try {
    const contents = await Content.findAll({ order: [['order', 'ASC']] });
    res.render('index', { contents });
  } catch (error) {
    res.status(500).send('Error loading page');
  }
});

module.exports = router;`,

  'routes/auth.js': `const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User } = require('../models/index');

router.get('/login', (req, res) => res.render('admin/login'));

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.isAdmin = true;
    req.session.userId = user.id;
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', { error: 'Username atau password salah' });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

module.exports = router;`,

  'routes/admin.js': `const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const { Content, User } = require('../models/index');
const path = require('path');

router.get('/dashboard', isAuthenticated, async (req, res) => {
  const contents = await Content.findAll({ order: [['order', 'ASC']] });
  res.render('admin/dashboard', { contents });
});

router.post('/update-content', isAuthenticated, async (req, res) => {
  const { id, title, description } = req.body;
  await Content.update({ title, description }, { where: { id } });
  res.redirect('/admin/dashboard');
});

module.exports = router;`,

  'views/index.ejs': `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CERDAS BERKARAKTER</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <style>
        :root { --primary: #4A90E2; --pink: #FF69B4; --dark: #333; }
        body { font-family: 'Segoe UI', sans-serif; overflow-x: hidden; }
        .navbar { background: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .navbar-brand { font-weight: bold; color: var(--primary) !important; font-size: 1.5rem; }
        .hero { background: linear-gradient(135deg, var(--primary), var(--pink)); color: white; padding: 100px 0; text-align: center; }
        .btn-wa { background-color: #25D366; color: white; border: none; padding: 12px 30px; font-weight: bold; border-radius: 50px; }
        .section { padding: 80px 0; }
        .card-feature { border: none; shadow: 0 5px 15px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .card-feature:hover { transform: translateY(-10px); }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand animate__animated animate__fadeInDown" href="#">CERDAS BERKARAKTER</a>
        </div>
    </nav>

    <% const hero = contents.find(c => c.section === 'hero'); %>
    <section class="hero">
        <div class="container animate__animated animate__fadeInUp">
            <h1 class="display-4 fw-bold"><%= hero ? hero.title : 'CERDAS BERKARAKTER' %></h1>
            <p class="lead mt-3"><%= hero ? hero.description : 'Membangun Generasi Emas' %></p>
            <a href="https://wa.me/6281234567890" class="btn btn-wa mt-4 animate__animated animate__pulse animate__infinite">
                📞 Hubungi Kami via WhatsApp
            </a>
        </div>
    </section>

    <% const features = contents.filter(c => c.section === 'features'); %>
    <section class="section bg-light">
        <div class="container">
            <div class="row text-center">
                <div class="col-md-8 mx-auto mb-5">
                    <h2 class="fw-bold" style="color: var(--primary)">Mengapa Memilih Kami?</h2>
                </div>
                <% features.forEach((item, index) => { %>
                    <div class="col-md-4 mb-4 animate__animated animate__fadeInUp" style="animation-delay: <%= index * 0.2 %>s">
                        <div class="card card-feature h-100 p-4">
                            <div class="card-body">
                                <h4 class="card-title fw-bold"><%= item.title %></h4>
                                <p class="card-text text-muted"><%= item.description %></p>
                            </div>
                        </div>
                    </div>
                <% }) %>
            </div>
        </div>
    </section>

    <footer class="bg-dark text-white text-center py-4">
        <p>&copy; 2024 CERDAS BERKARAKTER. All Rights Reserved.</p>
    </footer>
</body>
</html>`,

  'views/admin/login.ejs': `<!DOCTYPE html>
<html>
<head>
    <title>Login Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light d-flex align-items-center justify-content-center" style="height: 100vh;">
    <div class="card p-4 shadow" style="width: 400px;">
        <h3 class="text-center mb-4">Login Admin</h3>
        <% if (typeof error !== 'undefined') { %>
            <div class="alert alert-danger"><%= error %></div>
        <% } %>
        <form action="/auth/login" method="POST">
            <div class="mb-3">
                <label>Username</label>
                <input type="text" name="username" class="form-control" required>
            </div>
            <div class="mb-3">
                <label>Password</label>
                <input type="password" name="password" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary w-100">Login</button>
        </form>
    </div>
</body>
</html>`,

  'views/admin/dashboard.ejs': `<!DOCTYPE html>
<html>
<head>
    <title>Dashboard Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <nav class="navbar navbar-dark bg-primary mb-4">
        <div class="container">
            <span class="navbar-brand">CMS CERDAS BERKARAKTER</span>
            <a href="/auth/logout" class="btn btn-light btn-sm">Logout</a>
        </div>
    </nav>
    <div class="container">
        <h2>Kelola Konten Landing Page</h2>
        <table class="table table-bordered mt-3">
            <thead><tr><th>Section</th><th>Judul</th><th>Deskripsi</th><th>Aksi</th></tr></thead>
            <tbody>
                <% contents.forEach(item => { %>
                <tr>
                    <td><%= item.section %></td>
                    <td><%= item.title %></td>
                    <td><%= item.description %></td>
                    <td>
                        <button class="btn btn-sm btn-warning" data-bs-toggle="modal" data-bs-target="#editModal<%= item.id %>">Edit</button>
                    </td>
                </tr>
                <!-- Modal Edit -->
                <div class="modal fade" id="editModal<%= item.id %>" tabindex="-1">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <form action="/admin/update-content" method="POST">
                                <input type="hidden" name="id" value="<%= item.id %>">
                                <div class="modal-header"><h5 class="modal-title">Edit <%= item.section %></h5></div>
                                <div class="modal-body">
                                    <div class="mb-2"><label>Judul</label><input type="text" name="title" class="form-control" value="<%= item.title %>"></div>
                                    <div class="mb-2"><label>Deskripsi</label><textarea name="description" class="form-control"><%= item.description %></textarea></div>
                                </div>
                                <div class="modal-footer"><button type="submit" class="btn btn-primary">Simpan</button></div>
                            </form>
                        </div>
                    </div>
                </div>
                <% }) %>
            </tbody>
        </table>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`
};

// Fungsi Eksekusi
console.log('🚀 Memulai pembuatan proyek CERDAS BERKARAKTER...');

Object.keys(projectStructure).forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  const dir = path.dirname(fullPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Folder dibuat: ${dir}`);
  }

  fs.writeFileSync(fullPath, projectStructure[filePath]);
  console.log(`📄 File dibuat: ${filePath}`);
});

console.log('\n✅ SELESAI! Semua file telah dibuat.');
console.log('👉 Langkah selanjutnya:');
console.log('1. Jalankan: npm install');
console.log('2. Pastikan PostgreSQL berjalan dan database "cerdasberkarakter" sudah dibuat.');
console.log('3. Edit file .env dan isi DB_PASSWORD Anda.');
console.log('4. Jalankan: npm start');