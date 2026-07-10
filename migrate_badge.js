/**
 * Migrate: tambah kolom badge ke tabel Modules + insert ulang data VideaClass
 */
require('dotenv').config();
const { sequelize, Module } = require('./models/index');
const { QueryInterface, DataTypes } = require('sequelize');

const videaclassModules = [
  { title: 'CBT Mobile',        description: 'Ujian lebih aman & efisien dengan perangkat mobile',                icon: 'smartphone',     features: ['Ujian Online','Anti-Cheating','Hasil Realtime'],      badge: 'PREMIUM', displayOrder: 1,  isActive: true },
  { title: 'LMS Online',        description: 'Kegiatan pembelajaran daring lebih mudah dan cepat',               icon: 'pencil-line',    features: ['Kelas Virtual','E-Tugas','E-Raport'],                  badge: 'PREMIUM', displayOrder: 2,  isActive: true },
  { title: 'Smart Attendance',  description: 'Pantau kehadiran siswa secara realtime dari mana saja',            icon: 'calendar-check', features: ['Absen Realtime','Notif Orang Tua','Rekap Otomatis'],   badge: 'PREMIUM', displayOrder: 3,  isActive: true },
  { title: 'Smart Bill',        description: 'Kelola pembayaran siswa lebih efisien dengan sistem digital',      icon: 'receipt',        features: ['Multi Bank','Auto Tagihan','Rekonsiliasi'],            badge: 'PREMIUM', displayOrder: 4,  isActive: true },
  { title: 'PPDB Online',       description: 'Jangkau peserta didik baru lebih luas melalui internet',          icon: 'user-plus',      features: ['Daftar Online','Seleksi Otomatis','Laporan Lengkap'],  badge: 'PREMIUM', displayOrder: 5,  isActive: true },
  { title: 'ViPay',             description: 'Bayar jajan gak perlu repot bawa uang cash',                      icon: 'wallet',         features: ['Dompet Digital','Limit Harian','Riwayat Belanja'],    badge: 'FREE',    displayOrder: 6,  isActive: true },
  { title: 'Website Sekolah',   description: 'Update informasi & berita terbaru sekolah melalui website',       icon: 'globe',          features: ['CMS Mudah','SEO Friendly','Responsif'],               badge: 'FREE',    displayOrder: 7,  isActive: true },
  { title: 'Smart Card',        description: 'Dapatkan kartu pelajar canggih & terintegrasi',                   icon: 'credit-card',    features: ['Kartu Siswa','Akses Kontrol','Multi-Fungsi'],          badge: 'FREE',    displayOrder: 8,  isActive: true },
  { title: 'Whatsapp Gateway',  description: 'Kelola pelayanan sekolah dengan whatsapp terpusat',               icon: 'message-circle', features: ['Notif Otomatis','Broadcast','Multi-Admin'],           badge: 'FREE',    displayOrder: 9,  isActive: true },
  { title: 'ViDemy',            description: 'Akses ratusan video pembelajaran dari guru terbaik',             icon: 'book-open',      features: ['Video HD','Playlist Mapel','Progress Tracking'],       badge: 'FREE',    displayOrder: 10, isActive: true },
  { title: 'ViHub',             description: 'Ruang diskusi online antar pelajar di seluruh dunia',             icon: 'message-square', features: ['Forum Diskusi','Tanya Jawab','Komunitas Aktif'],      badge: 'FREE',    displayOrder: 11, isActive: true },
  { title: 'Smart Controlling', description: 'Pantau aktifitas siswa & kelas secara realtime',                  icon: 'video',          features: ['CCTV Terintegrasi','Dashboard KBM','Pantau Realtime'],badge: 'FREE',    displayOrder: 12, isActive: true },
];

async function run() {
  try {
    const qi = sequelize.getQueryInterface();

    // 1. Tambah kolom badge jika belum ada
    const tableDesc = await qi.describeTable('Modules');
    if (!tableDesc.badge) {
      await qi.addColumn('Modules', 'badge', {
        type: DataTypes.STRING(20),
        defaultValue: null,
        allowNull: true
      });
      console.log('✅ Kolom badge berhasil ditambahkan ke tabel Modules');
    } else {
      console.log('ℹ️  Kolom badge sudah ada, skip migrasi.');
    }

    // 2. Hapus semua data lama
    await Module.destroy({ where: {}, truncate: true });
    console.log('🗑️  Data lama dihapus.');

    // 3. Insert data baru
    const rows = await Module.bulkCreate(videaclassModules);
    console.log(`\n✅ ${rows.length} fitur berhasil diinsert:\n`);
    rows.forEach(m => {
      const tag = m.badge === 'PREMIUM' ? '🔵 PREMIUM' : '🟢 FREE   ';
      console.log(`   ${tag} — ${m.title}`);
    });

    console.log('\n✅ Selesai! Restart server dan reload browser.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

run();
