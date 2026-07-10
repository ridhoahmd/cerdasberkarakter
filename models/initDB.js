const bcrypt = require('bcryptjs');
const {
  sequelize,
  User,
  Hero,
  HeroStat,
  Module,
  Testimonial,
  Partner,
  PricingPackage,
  SocialLink,
  FooterContent,
  Media,
  Setting,
  WhyUs,
  EcosystemUser,
  VideoTutorial
} = require('./index');

const initDB = async () => {
  try {
    // Force sync to ensure schema matches models
    await sequelize.sync({ force: true });
    console.log('✅ Database tables synchronized (forced).');

    // Create default admin
    const adminExists = await User.findOne({ where: { email: 'admin@cerdasberkarakter.id' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      await User.create({
        email: 'admin@cerdasberkarakter.id',
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin'
      });
      console.log('✅ Default admin created (email: admin@cerdasberkarakter.id, pass: admin123)');
    }

    // Seed Hero Section
    const heroCount = await Hero.count();
    if (heroCount === 0) {
      const hero = await Hero.create({
        headline: 'Platform Tatakelola Manajemen Pendidikan Masa Depan',
        subheadline: 'One Digital Platform Based on ERP - Solusi lengkap untuk sekolah, pesantren, kampus, dan bimbel dalam satu sistem terintegrasi.',
        ctaPrimaryText: 'Minta Demo Gratis',
        ctaPrimaryUrl: '#pricing',
        ctaSecondaryText: 'Pelajari Lebih Lanjut',
        ctaSecondaryUrl: '#modules',
        isActive: true
      });

      await HeroStat.bulkCreate([
        { heroId: hero.id, value: '650+', label: 'Institusi Pendidikan', icon: 'building', displayOrder: 1 },
        { heroId: hero.id, value: '17 Tahun', label: 'Pengalaman', icon: 'calendar', displayOrder: 2 },
        { heroId: hero.id, value: '1 Juta+', label: 'Pengguna Aktif', icon: 'users', displayOrder: 3 },
        { heroId: hero.id, value: '99.9%', label: 'Uptime', icon: 'zap', displayOrder: 4 }
      ]);
      console.log('✅ Hero section seeded.');
    }

    // Seed Modules
    const moduleCount = await Module.count();
    if (moduleCount === 0) {
      await Module.bulkCreate([
        // ── PREMIUM ──────────────────────────────────────────────────────────
        {
          title: 'CBT Mobile',
          description: 'Ujian lebih aman & efisien dengan perangkat mobile',
          icon: 'solar:iphone-line-duotone',
          color: '#c73434',
          features: ['Ujian Online', 'Anti-Cheating', 'Hasil Realtime'],
          badge: 'PREMIUM',
          displayOrder: 1,
          isActive: true
        },
        {
          title: 'LMS Online',
          description: 'Kegiatan pembelajaran daring lebih mudah dan cepat',
          icon: 'solar:pen-new-square-line-duotone',
          color: '#2b74b6',
          features: ['Kelas Virtual', 'E-Tugas', 'E-Raport'],
          badge: 'PREMIUM',
          displayOrder: 2,
          isActive: true
        },
        {
          title: 'Smart Attendance',
          description: 'Pantau kehadiran siswa secara realtime dari mana saja',
          icon: 'solar:calendar-date-line-duotone',
          color: '#107759',
          features: ['Absen Realtime', 'Notif Orang Tua', 'Rekap Otomatis'],
          badge: 'PREMIUM',
          displayOrder: 3,
          isActive: true
        },
        {
          title: 'Smart Bill',
          description: 'Kelola pembayaran siswa lebih efisien dengan sistem digital',
          icon: 'solar:bill-list-line-duotone',
          color: '#d5a417',
          features: ['Multi Bank', 'Auto Tagihan', 'Rekonsiliasi'],
          badge: 'PREMIUM',
          displayOrder: 4,
          isActive: true
        },
        {
          title: 'PPDB Online',
          description: 'Jangkau peserta didik baru lebih luas melalui internet',
          icon: 'solar:user-plus-rounded-line-duotone',
          color: '#2b74b6',
          features: ['Daftar Online', 'Seleksi Otomatis', 'Laporan Lengkap'],
          badge: 'PREMIUM',
          displayOrder: 5,
          isActive: true
        },
        // ── FREE ─────────────────────────────────────────────────────────────
        {
          title: 'ViPay',
          description: 'Bayar jajan gak perlu repot bawa uang cash',
          icon: 'solar:wallet-2-line-duotone',
          color: '#d5a417',
          features: ['Dompet Digital', 'Limit Harian', 'Riwayat Belanja'],
          badge: 'FREE',
          displayOrder: 6,
          isActive: true
        },
        {
          title: 'Website Sekolah',
          description: 'Update informasi & berita terbaru sekolah melalui website',
          icon: 'solar:monitor-line-duotone',
          color: '#107759',
          features: ['CMS Mudah', 'SEO Friendly', 'Responsif'],
          badge: 'FREE',
          displayOrder: 7,
          isActive: true
        },
        {
          title: 'Smart Card',
          description: 'Dapatkan kartu pelajar canggih & terintegrasi',
          icon: 'solar:card-line-duotone',
          color: '#c73434',
          features: ['Kartu Siswa', 'Akses Kontrol', 'Multi-Fungsi'],
          badge: 'FREE',
          displayOrder: 8,
          isActive: true
        },
        {
          title: 'Whatsapp Gateway',
          description: 'Kelola pelayanan sekolah dengan whatsapp terpusat',
          icon: 'solar:call-chat-line-duotone',
          color: '#107759',
          features: ['Notif Otomatis', 'Broadcast', 'Multi-Admin'],
          badge: 'FREE',
          displayOrder: 9,
          isActive: true
        },
        {
          title: 'ViDemy',
          description: 'Akses ratusan video pembelajaran dari guru terbaik',
          icon: 'solar:notebook-minimalistic-line-duotone',
          color: '#c73434',
          features: ['Video HD', 'Playlist Mapel', 'Progress Tracking'],
          badge: 'FREE',
          displayOrder: 10,
          isActive: true
        },
        {
          title: 'ViHub',
          description: 'Ruang diskusi online antar pelajar di seluruh dunia',
          icon: 'solar:chat-round-call-line-duotone',
          color: '#d5a417',
          features: ['Forum Diskusi', 'Tanya Jawab', 'Komunitas Aktif'],
          badge: 'FREE',
          displayOrder: 11,
          isActive: true
        },
        {
          title: 'Smart Controlling',
          description: 'Pantau aktifitas siswa & kelas secara realtime',
          icon: 'solar:monitor-camera-line-duotone',
          color: '#2b74b6',
          features: ['CCTV Terintegrasi', 'Dashboard KBM', 'Pantau Realtime'],
          badge: 'FREE',
          displayOrder: 12,
          isActive: true
        }
      ]);
      console.log('✅ Modules seeded (12 fitur VideaClass: 5 PREMIUM + 7 FREE).');
    }


    // Seed Why Us
    const whyUsCount = await WhyUs.count();
    if (whyUsCount === 0) {
      await WhyUs.bulkCreate([
        {
          title: '17 Tahun Pengalaman',
          description: 'Telah melayani ratusan institusi pendidikan di seluruh Indonesia sejak 2007.',
          icon: 'award',
          displayOrder: 1,
          isActive: true
        },
        {
          title: 'Whitelabel & Kustomisasi',
          description: 'Sesuaikan tampilan dan fitur sesuai brand dan kebutuhan institusi Anda.',
          icon: 'palette',
          displayOrder: 2,
          isActive: true
        },
        {
          title: 'Co-branding & Dukungan Bank',
          description: 'Didukung oleh 12+ bank besar Indonesia untuk solusi pembayaran yang terpercaya.',
          icon: 'landmark',
          displayOrder: 3,
          isActive: true
        },
        {
          title: 'ERP-Based End-to-End',
          description: 'Semua fitur terintegrasi dalam satu platform ERP yang solid dan scalable.',
          icon: 'cpu',
          displayOrder: 4,
          isActive: true
        }
      ]);
      console.log('✅ Why Us section seeded.');
    }

    // Seed Ecosystem Users
    const ecosystemCount = await EcosystemUser.count();
    if (ecosystemCount === 0) {
      await EcosystemUser.bulkCreate([
        { name: 'Siswa', icon: 'user', description: 'Akses pembelajaran & nilai', displayOrder: 1, isActive: true },
        { name: 'Calon Siswa', icon: 'user-plus', description: 'Pendaftaran online', displayOrder: 2, isActive: true },
        { name: 'Orang Tua', icon: 'users', description: 'Monitoring & komunikasi', displayOrder: 3, isActive: true },
        { name: 'Guru', icon: 'book-open', description: 'Pengelolaan kelas', displayOrder: 4, isActive: true },
        { name: 'Yayasan', icon: 'building', description: 'Konsolidasi laporan', displayOrder: 5, isActive: true },
        { name: 'Kantin', icon: 'coffee', description: 'Kasir & inventory', displayOrder: 6, isActive: true },
        { name: 'Bank', icon: 'landmark', description: 'Pembayaran digital', displayOrder: 7, isActive: true }
      ]);
      console.log('✅ Ecosystem users seeded.');
    }

    // Seed Testimonials
    const testimonialCount = await Testimonial.count();
    if (testimonialCount === 0) {
      await Testimonial.bulkCreate([
        {
          name: 'Dr. H. Ahmad Wijaya',
          title: 'Kepala Sekolah',
          institution: 'BMS Jakarta',
          quote: 'CERDAS BERKARAKTER sangat membantu kami dalam mengelola seluruh aspek operasional sekolah. Integrasi dengan bank membuat pembayaran spp menjadi lebih mudah dan transparan.',
          displayOrder: 1,
          isActive: true
        },
        {
          name: 'Ustadz H. Abdullah Faqih',
          title: 'Pengasuh',
          institution: 'Pondok Al Azhar',
          quote: 'Fitur manajemen asrama sangat lengkap. Kami bisa memantau kehadiran dan kesehatan santri secara real-time. Sangat recommended untuk pesantren.',
          displayOrder: 2,
          isActive: true
        },
        {
          name: 'Budi Santoso',
          title: 'Dirut',
          institution: 'Bank Mega Syariah',
          quote: 'Kolaborasi dengan CERDAS BERKARAKTER memberikan nilai tambah bagi nasabahnya dalam hal kemudahan pembayaran pendidikan. Sistem yang sangat handal.',
          displayOrder: 3,
          isActive: true
        }
      ]);
      console.log('✅ Testimonials seeded.');
    }

    // Seed Banking Partners
    const partnerCount = await Partner.count();
    if (partnerCount === 0) {
      await Partner.bulkCreate([
        { name: 'Bank Mandiri', category: 'banking', displayOrder: 1, isActive: true },
        { name: 'Bank BCA', category: 'banking', displayOrder: 2, isActive: true },
        { name: 'Bank BRI', category: 'banking', displayOrder: 3, isActive: true },
        { name: 'Bank BNI', category: 'banking', displayOrder: 4, isActive: true },
        { name: 'Bank Muamalat', category: 'banking', displayOrder: 5, isActive: true },
        { name: 'Bank Mega Syariah', category: 'banking', displayOrder: 6, isActive: true },
        { name: 'Bank Permata', category: 'banking', displayOrder: 7, isActive: true },
        { name: 'Bank BTN', category: 'banking', displayOrder: 8, isActive: true },
        { name: 'Media Indonesia', category: 'media', displayOrder: 9, isActive: true },
        { name: 'Digital Bank', category: 'media', displayOrder: 10, isActive: true },
        { name: 'iNews', category: 'media', displayOrder: 11, isActive: true },
        { name: 'Republika', category: 'media', displayOrder: 12, isActive: true }
      ]);
      console.log('✅ Partners seeded.');
    }

    // Seed Pricing Packages
    const pricingCount = await PricingPackage.count();
    if (pricingCount === 0) {
      await PricingPackage.bulkCreate([
        {
          name: 'Starter',
          tagline: 'Untuk institusi kecil',
          price: 'Rp 5.000.000',
          period: '/tahun',
          features: [
            'SIAKAD Basic',
            '50 Akun Pengguna',
            'Laporan Standar',
            'Email Support',
            'Backup Mingguan'
          ],
          isPopular: false,
          ctaText: 'Mulai Sekarang',
          displayOrder: 1,
          isActive: true
        },
        {
          name: 'Scale',
          tagline: 'Paling Populer',
          price: 'Rp 15.000.000',
          period: '/tahun',
          features: [
            'Semua Fitur Starter',
            'SIAKAD Lengkap + LMS',
            '500 Akun Pengguna',
            'Kasir Digital',
            'Mobile App',
            'Priority Support',
            'Backup Harian'
          ],
          isPopular: true,
          ctaText: 'Minta Demo',
          displayOrder: 2,
          isActive: true
        },
        {
          name: 'Premium',
          tagline: 'Untuk enterprise',
          price: 'Hubungi Kami',
          period: '',
          features: [
            'Semua Fitur Scale',
            'Unlimited Akun',
            'Multi Satuan',
            'Custom Branding',
            'Dedicated Support',
            'API Access',
            'Custom Integration',
            'SLA Guarantee'
          ],
          isPopular: false,
          ctaText: 'Hubungi Sales',
          displayOrder: 3,
          isActive: true
        }
      ]);
      console.log('✅ Pricing packages seeded.');
    }

    // Seed Social Links
    const socialCount = await SocialLink.count();
    if (socialCount === 0) {
      await SocialLink.bulkCreate([
        { platform: 'WhatsApp', url: 'https://wa.me/6281234567890', icon: 'message-circle', displayOrder: 1, isActive: true },
        { platform: 'Instagram', url: 'https://instagram.com/cerdasberkarakter', icon: 'instagram', displayOrder: 2, isActive: true },
        { platform: 'Facebook', url: 'https://facebook.com/cerdasberkarakter', icon: 'facebook', displayOrder: 3, isActive: true },
        { platform: 'Youtube', url: 'https://youtube.com/@cerdasberkarakter', icon: 'youtube', displayOrder: 4, isActive: true },
        { platform: 'LinkedIn', url: 'https://linkedin.com/company/cerdasberkarakter', icon: 'linkedin', displayOrder: 5, isActive: true }
      ]);
      console.log('✅ Social links seeded.');
    }

    // Seed Footer Content
    const footerCount = await FooterContent.count();
    if (footerCount === 0) {
      await FooterContent.bulkCreate([
        {
          section: 'about',
          content: {
            tagline: 'Platform ERP Manajemen Pendidikan',
            description: 'CERDAS BERKARAKTER adalah solusi lengkap untuk tatakelola pendidikan modern di Indonesia.',
            address: 'Jl. Sudirman No. 123, Jakarta Pusat 10220',
            phone: '(021) 1234-5678',
            email: 'info@cerdasberkarakter.id'
          }
        },
        {
          section: 'products',
          content: {
            title: 'Produk',
            items: ['Penerimaan Siswa', 'SIAKAD & LMS', 'Kasir Digital', 'Asrama', 'Enterprise', 'Sekolah Virtual']
          }
        },
        {
          section: 'company',
          content: {
            title: 'Perusahaan',
            items: ['Tentang Kami', 'Karir', 'Blog', 'Press Kit', 'Kontak']
          }
        },
        {
          section: 'download',
          content: {
            title: 'Download',
            items: ['App Store', 'Google Play', 'Brosur PDF']
          }
        }
      ]);
      console.log('✅ Footer content seeded.');
    }

    // Seed Settings
    const settingCount = await Setting.count();
    if (settingCount === 0) {
      await Setting.create({
        key: 'site',
        value: {
          name: 'CERDAS BERKARAKTER',
          logo: '/assets/images/logo.png',
          favicon: '/assets/images/favicon.ico',
          whatsapp: '6281234567890',
          email: 'info@cerdasberkarakter.id'
        }
      });
      console.log('✅ Settings seeded.');
    }

    console.log('✅ Database initialization complete!');

  } catch (error) {
    console.error('❌ Init DB Error:', error);
    throw error;
  }
};

module.exports = { initDB };
