/**
 * Script update fitur modules di database
 * agar identik 1:1 dengan VideaClass
 */
require('dotenv').config();
const { Module } = require('./models/index');

const videaclassModules = [
  // ── PREMIUM ──────────────────────────────────────────────────────────
  {
    title: 'CBT Mobile',
    description: 'Ujian lebih aman & efisien dengan perangkat mobile',
    icon: 'smartphone',
    features: ['Ujian Online', 'Anti-Cheating', 'Hasil Realtime'],
    badge: 'PREMIUM',
    displayOrder: 1,
    isActive: true
  },
  {
    title: 'LMS Online',
    description: 'Kegiatan pembelajaran daring lebih mudah dan cepat',
    icon: 'pencil-line',
    features: ['Kelas Virtual', 'E-Tugas', 'E-Raport'],
    badge: 'PREMIUM',
    displayOrder: 2,
    isActive: true
  },
  {
    title: 'Smart Attendance',
    description: 'Pantau kehadiran siswa secara realtime dari mana saja',
    icon: 'calendar-check',
    features: ['Absen Realtime', 'Notif Orang Tua', 'Rekap Otomatis'],
    badge: 'PREMIUM',
    displayOrder: 3,
    isActive: true
  },
  {
    title: 'Smart Bill',
    description: 'Kelola pembayaran siswa lebih efisien dengan sistem digital',
    icon: 'receipt',
    features: ['Multi Bank', 'Auto Tagihan', 'Rekonsiliasi'],
    badge: 'PREMIUM',
    displayOrder: 4,
    isActive: true
  },
  {
    title: 'PPDB Online',
    description: 'Jangkau peserta didik baru lebih luas melalui internet',
    icon: 'user-plus',
    features: ['Daftar Online', 'Seleksi Otomatis', 'Laporan Lengkap'],
    badge: 'PREMIUM',
    displayOrder: 5,
    isActive: true
  },
  // ── FREE ─────────────────────────────────────────────────────────────
  {
    title: 'ViPay',
    description: 'Bayar jajan gak perlu repot bawa uang cash',
    icon: 'wallet',
    features: ['Dompet Digital', 'Limit Harian', 'Riwayat Belanja'],
    badge: 'FREE',
    displayOrder: 6,
    isActive: true
  },
  {
    title: 'Website Sekolah',
    description: 'Update informasi & berita terbaru sekolah melalui website',
    icon: 'globe',
    features: ['CMS Mudah', 'SEO Friendly', 'Responsif'],
    badge: 'FREE',
    displayOrder: 7,
    isActive: true
  },
  {
    title: 'Smart Card',
    description: 'Dapatkan kartu pelajar canggih & terintegrasi',
    icon: 'credit-card',
    features: ['Kartu Siswa', 'Akses Kontrol', 'Multi-Fungsi'],
    badge: 'FREE',
    displayOrder: 8,
    isActive: true
  },
  {
    title: 'Whatsapp Gateway',
    description: 'Kelola pelayanan sekolah dengan whatsapp terpusat',
    icon: 'message-circle',
    features: ['Notif Otomatis', 'Broadcast', 'Multi-Admin'],
    badge: 'FREE',
    displayOrder: 9,
    isActive: true
  },
  {
    title: 'ViDemy',
    description: 'Akses ratusan video pembelajaran dari guru terbaik',
    icon: 'book-open',
    features: ['Video HD', 'Playlist Mapel', 'Progress Tracking'],
    badge: 'FREE',
    displayOrder: 10,
    isActive: true
  },
  {
    title: 'ViHub',
    description: 'Ruang diskusi online antar pelajar di seluruh dunia',
    icon: 'message-square',
    features: ['Forum Diskusi', 'Tanya Jawab', 'Komunitas Aktif'],
    badge: 'FREE',
    displayOrder: 11,
    isActive: true
  },
  {
    title: 'Smart Controlling',
    description: 'Pantau aktifitas siswa & kelas secara realtime',
    icon: 'video',
    features: ['CCTV Terintegrasi', 'Dashboard KBM', 'Pantau Realtime'],
    badge: 'FREE',
    displayOrder: 12,
    isActive: true
  }
];

async function updateModules() {
  try {
    // Hapus semua modul lama
    const deleted = await Module.destroy({ where: {}, truncate: true });
    console.log(`🗑️  Menghapus ${deleted} modul lama...`);

    // Insert data baru
    const created = await Module.bulkCreate(videaclassModules);
    console.log(`✅ Berhasil insert ${created.length} modul baru:`);

    created.forEach(m => {
      const tag = m.badge === 'PREMIUM' ? '🔵 PREMIUM' : '🟢 FREE';
      console.log(`   ${tag} — ${m.title}`);
    });

    console.log('\n✅ Database berhasil diupdate! Silakan reload browser.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

updateModules();
