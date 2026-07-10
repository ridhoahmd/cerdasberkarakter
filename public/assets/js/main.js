/**
 * CERDAS BERKARAKTER - Main JavaScript
 * Handles animations, data loading, and interactions
 */

(function() {
  'use strict';

  // =============================================
  // Configuration
  // =============================================
  const CONFIG = {
    apiBase: '/apis',
    animationDuration: 0.6,
    scrollOffset: 80,
    counterSpeed: 2000,
    autoSlideInterval: 5000
  };

  // =============================================
  // DOM Elements
  // =============================================
  const DOM = {
    navbar: document.getElementById('navbar'),
    mobileToggle: document.getElementById('mobileToggle'),
    mobileMenu: document.getElementById('mobileMenu'),
    mobileOverlay: document.getElementById('mobileOverlay'),
    mobileClose: document.getElementById('mobileClose'),
    heroStats: document.getElementById('heroStats'),
    modulesGrid: document.getElementById('modulesGrid'),
    whyGrid: document.getElementById('whyGrid'),
    ecosystemGrid: document.getElementById('ecosystemGrid'),
    testimonialsTrack: document.getElementById('testimonialsTrack'),
    testimonialsNav: document.getElementById('testimonialsNav'),
    partnersTrack: document.getElementById('partnersTrack'),
    bankingTrack: document.getElementById('bankingTrack'),
    mediaTrack: document.getElementById('mediaTrack'),
    pricingGrid: document.getElementById('pricingGrid'),
    footerGrid: document.getElementById('footerGrid')
  };

  // =============================================
  // State
  // =============================================
  let state = {
    isScrolled: false,
    currentTestimonial: 0,
    autoSlideTimer: null,
    partners: [],
    modules: [],
    testimonials: [],
    pricing: [],
    whyUs: [],
    ecosystem: [],
    footer: {}
  };

  // =============================================
  // Utility Functions
  // =============================================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // =============================================
  // API Functions
  // =============================================
  async function fetchAPI(endpoint) {
    try {
      const response = await fetch(`${CONFIG.apiBase}${endpoint}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.warn(`API Error (${endpoint}):`, error.message);
      return null;
    }
  }

  // =============================================
  // Data Loading
  // =============================================
  async function loadHeroData() {
    const hero = await fetchAPI('/heroes');
    const headlineEl = document.getElementById('heroHeadline');
    const subtitleEl = document.getElementById('heroSubtitle');
    
    // Default fallback text if API fails
    let headlineText = 'Platform Tatakelola<br><span>Manajemen Pendidikan</span><br>Masa Depan';
    
    if (hero) {
      if (hero.headline) headlineText = hero.headline.replace(/\n/g, '<br>');
      if (hero.subheadline && subtitleEl) subtitleEl.textContent = hero.subheadline;
    }

    if (headlineEl) {
      if (typeof Typed !== 'undefined') {
        headlineEl.innerHTML = '';
        new Typed('#heroHeadline', {
          strings: [headlineText],
          typeSpeed: 40,
          showCursor: true,
          cursorChar: '|'
        });
      } else {
        headlineEl.innerHTML = headlineText;
      }
    }
  }

  async function loadPartners() {
    const data = await fetchAPI('/partners?category=education');
    if (data && data.length > 0) {
      state.partners = data;
      renderPartners();
    } else {
      renderDefaultPartners();
    }
  }

  async function loadModules() {
    const data = await fetchAPI('/modules');
    if (data && data.length > 0) {
      state.modules = data;
      renderModules();
    } else {
      renderDefaultModules();
    }
  }

  async function loadWhyUs() {
    const data = await fetchAPI('/why-us');
    if (data && data.length > 0) {
      state.whyUs = data;
      renderWhyUs();
    } else {
      renderDefaultWhyUs();
    }
  }

  async function loadEcosystem() {
    const data = await fetchAPI('/ecosystem');
    if (data && data.length > 0) {
      state.ecosystem = data;
      renderEcosystem();
    } else {
      renderDefaultEcosystem();
    }
  }

  async function loadTestimonials() {
    const data = await fetchAPI('/testimonials');
    if (data && data.length > 0) {
      state.testimonials = data;
      renderTestimonials();
      startAutoSlide();
    } else {
      renderDefaultTestimonials();
    }
  }

  async function loadPricing() {
    const data = await fetchAPI('/pricing');
    if (data && data.length > 0) {
      state.pricing = data;
      renderPricing();
    } else {
      renderDefaultPricing();
    }
  }

  async function loadFooter() {
    const data = await fetchAPI('/footer');
    if (data) {
      state.footer = data;
      renderFooter();
    }
  }

  async function loadBankingPartners() {
    const data = await fetchAPI('/partners?category=banking');
    if (data && data.length > 0) {
      renderBankingPartners(data);
    } else {
      renderDefaultBankingPartners();
    }
  }

  async function loadMediaPartners() {
    const data = await fetchAPI('/partners?category=media');
    if (data && data.length > 0) {
      renderMediaPartners(data);
    } else {
      renderDefaultMediaPartners();
    }
  }

  // =============================================
  // Render Functions (Default Data)
  // =============================================
  function renderDefaultPartners() {
    const defaultPartners = [
      'BMS Jakarta', 'Al Azhar', 'SMAN 1 Surabaya', 'SMPN 2 Bandung',
      'Ponpes Al Hidayah', 'Madrasah Aliyah 3', 'SMK Negeri 5', 'SMP Islam Terpadu'
    ];
    const html = defaultPartners.map(p => `
      <div class="partner-item">
        <span class="partner-name">${p}</span>
      </div>
    `).join('');
    DOM.partnersTrack.innerHTML = html + html; // Duplicate for seamless loop
  }

  function renderPartners() {
    const html = state.partners.map(p => `
      <div class="partner-item">
        <span class="partner-name">${p.name}</span>
      </div>
    `).join('');
    DOM.partnersTrack.innerHTML = html + html;
  }

  function renderDefaultModules() {
    // Fitur identik 1:1 dengan VideaClass
    const modules = [
      // ── PREMIUM ──────────────────────────────────────────────────────────
      {
        icon: 'smartphone',
        title: 'CBT Mobile',
        desc: 'Ujian lebih aman & efisien dengan perangkat mobile',
        badge: 'PREMIUM',
        badgeType: 'premium'
      },
      {
        icon: 'pencil-line',
        title: 'LMS Online',
        desc: 'Kegiatan pembelajaran daring lebih mudah dan cepat',
        badge: 'PREMIUM',
        badgeType: 'premium'
      },
      {
        icon: 'calendar-check',
        title: 'Smart Attendance',
        desc: 'Pantau kehadiran siswa secara realtime dari mana saja',
        badge: 'PREMIUM',
        badgeType: 'premium'
      },
      {
        icon: 'receipt',
        title: 'Smart Bill',
        desc: 'Kelola pembayaran siswa lebih efisien dengan sistem digital',
        badge: 'PREMIUM',
        badgeType: 'premium'
      },
      {
        icon: 'user-plus',
        title: 'PPDB Online',
        desc: 'Jangkau peserta didik baru lebih luas melalui internet',
        badge: 'PREMIUM',
        badgeType: 'premium'
      },
      // ── FREE ─────────────────────────────────────────────────────────────
      {
        icon: 'wallet',
        title: 'ViPay',
        desc: 'Bayar jajan gak perlu repot bawa uang cash',
        badge: 'FREE',
        badgeType: 'free'
      },
      {
        icon: 'monitor',
        title: 'Website Sekolah',
        desc: 'Update informasi & berita terbaru sekolah melalui website',
        badge: 'FREE',
        badgeType: 'free'
      },
      {
        icon: 'credit-card',
        title: 'Smart Card',
        desc: 'Dapatkan kartu pelajar canggih & terintegrasi',
        badge: 'FREE',
        badgeType: 'free'
      },
      {
        icon: 'message-circle',
        title: 'Whatsapp Gateway',
        desc: 'Kelola pelayanan sekolah dengan whatsapp terpusat',
        badge: 'FREE',
        badgeType: 'free'
      },
      {
        icon: 'book-open',
        title: 'ViDemy',
        desc: 'Akses ratusan video pembelajaran dari guru terbaik',
        badge: 'FREE',
        badgeType: 'free'
      },
      {
        icon: 'message-square',
        title: 'ViHub',
        desc: 'Ruang diskusi online antar pelajar di seluruh dunia',
        badge: 'FREE',
        badgeType: 'free'
      },
      {
        icon: 'video',
        title: 'Smart Controlling',
        desc: 'Pantau aktifitas siswa & kelas secara realtime',
        badge: 'FREE',
        badgeType: 'free'
      }
    ];
    renderModulesHTML(modules);
  }

  function renderModules() {
    renderModulesHTML(state.modules.map(m => ({
      icon: m.icon,
      color: m.color,
      title: m.title,
      desc: m.description,
      features: m.features,
      badge: m.badge || null,
      badgeType: m.badge ? m.badge.toLowerCase() : null
    })));
  }

  function renderModulesHTML(modules) {
    DOM.modulesGrid.innerHTML = modules.map((m, i) => {
      const isPremium = m.badgeType === 'premium';
      const color = m.color || (isPremium ? '#3b82f6' : '#10b981');

      const badgeHTML = m.badge
        ? `<span class="module-feature-tag" style="
              background: ${isPremium ? 'rgba(59,130,246,0.12)' : 'rgba(16,185,129,0.12)'};
              color: ${isPremium ? '#3b82f6' : '#10b981'};
              font-weight: 700;
              letter-spacing: 0.08em;
              font-size: 0.68rem;
            ">${m.badge}</span>`
        : '';
        
      const iconHTML = (m.icon && m.icon.includes(':'))
        ? `<iconify-icon icon="${m.icon}"></iconify-icon>`
        : `<i data-lucide="${m.icon || 'box'}"></i>`;

      return `
        <div class="module-card" data-animate data-delay="${i * 80}">
          <div class="module-icon" style="background: ${color}; color: #ffffff; border-radius: 16px; font-size: 36px; box-shadow: 0 8px 16px ${color}40;">
            ${iconHTML}
          </div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <h3 style="margin:0;">${m.title}</h3>
            ${badgeHTML}
          </div>
          <p>${m.desc}</p>
          <div class="module-features">
            ${(m.features || []).slice(0, 3).map(f => `<span class="module-feature-tag">${f}</span>`).join('')}
          </div>
        </div>
      `;
    }).join('');
    lucide.createIcons();
    initScrollAnimations();
  }

  function renderDefaultWhyUs() {
    const whyUs = [
      { icon: 'award', title: '17 Tahun Pengalaman', desc: 'Telah melayani ratusan institusi pendidikan.' },
      { icon: 'palette', title: 'Whitelabel & Kustomisasi', desc: 'Sesuaikan sesuai brand institusi Anda.' },
      { icon: 'landmark', title: 'Co-branding & Bank', desc: 'Didukung oleh 12+ bank besar Indonesia.' },
      { icon: 'cpu', title: 'ERP-Based End-to-End', desc: 'Semua fitur terintegrasi dalam satu platform.' }
    ];
    renderWhyUsHTML(whyUs);
  }

  function renderWhyUs() {
    renderWhyUsHTML(state.whyUs.map(w => ({
      icon: w.icon,
      title: w.title,
      desc: w.description
    })));
  }

  function renderWhyUsHTML(whyUs) {
    DOM.whyGrid.innerHTML = whyUs.map((w, i) => `
      <div class="why-card" data-animate data-delay="${i * 100}">
        <div class="why-bg-number">${(i + 1).toString().padStart(2, '0')}</div>
        <div class="why-icon">
          <i data-lucide="${w.icon || 'star'}"></i>
        </div>
        <h3>${w.title}</h3>
        <p>${w.desc}</p>
      </div>
    `).join('');
    lucide.createIcons();
    initScrollAnimations();
  }

  function renderDefaultEcosystem() {
    const ecosystem = [
      { icon: 'user', name: 'Siswa' },
      { icon: 'user-plus', name: 'Calon Siswa' },
      { icon: 'users', name: 'Orang Tua' },
      { icon: 'book-open', name: 'Guru' },
      { icon: 'building', name: 'Yayasan' },
      { icon: 'coffee', name: 'Kantin' },
      { icon: 'landmark', name: 'Bank' }
    ];
    renderEcosystemHTML(ecosystem);
  }

  function renderEcosystem() {
    renderEcosystemHTML(state.ecosystem.map(e => ({
      icon: e.icon,
      name: e.name
    })));
  }

  function renderEcosystemHTML(ecosystem) {
    DOM.ecosystemGrid.innerHTML = ecosystem.map((e, i) => `
      <div class="ecosystem-item" data-animate data-delay="${i * 50}">
        <div class="ecosystem-icon">
          <i data-lucide="${e.icon || 'user'}"></i>
        </div>
        <span class="ecosystem-text">${e.name}</span>
      </div>
    `).join('');
    lucide.createIcons();
    initScrollAnimations();
  }

  function renderDefaultTestimonials() {
    const testimonials = [
      { name: 'Dr. H. Ahmad Wijaya', title: 'Kepala Sekolah', institution: 'BMS Jakarta', quote: 'CERDAS BERKARAKTER sangat membantu kami dalam mengelola seluruh aspek operasional sekolah. Integrasi dengan bank membuat pembayaran spp menjadi lebih mudah.' },
      { name: 'Ustadz H. Abdullah Faqih', title: 'Pengasuh', institution: 'Pondok Al Azhar', quote: 'Fitur manajemen asrama sangat lengkap. Kami bisa memantau kehadiran dan kesehatan santri secara real-time.' },
      { name: 'Budi Santoso', title: 'Dirut', institution: 'Bank Mega Syariah', quote: 'Kolaborasi dengan CERDAS BERKARAKTER memberikan nilai tambah bagi nasabahnya dalam hal kemudahan pembayaran pendidikan.' }
    ];
    renderTestimonialsHTML(testimonials);
  }

  function renderTestimonials() {
    renderTestimonialsHTML(state.testimonials.map(t => ({
      name: t.name,
      title: t.title,
      institution: t.institution,
      quote: t.quote
    })));
  }

  function renderTestimonialsHTML(testimonials) {
    DOM.testimonialsTrack.innerHTML = testimonials.map((t, i) => `
      <div class="testimonial-card">
        <p class="testimonial-quote">${t.quote}</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${t.name.charAt(0)}</div>
          <div class="testimonial-info">
            <h4>${t.name}</h4>
            <p>${t.title} - ${t.institution}</p>
          </div>
        </div>
      </div>
    `).join('');

    // Create navigation dots
    DOM.testimonialsNav.innerHTML = testimonials.map((_, i) => `
      <button class="testimonials-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>
    `).join('');

    // Add click handlers to dots
    DOM.testimonialsNav.querySelectorAll('.testimonials-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        goToTestimonial(parseInt(dot.dataset.index));
      });
    });

    initScrollAnimations();
  }

  function renderDefaultPricing() {
    const pricing = [
      {
        name: 'Starter',
        tagline: 'Untuk institusi kecil',
        price: 'Rp 5.000.000',
        period: '/tahun',
        features: ['SIAKAD Basic', '50 Akun Pengguna', 'Laporan Standar', 'Email Support', 'Backup Mingguan'],
        popular: false,
        cta: 'Mulai Sekarang'
      },
      {
        name: 'Scale',
        tagline: 'Paling Populer',
        price: 'Rp 15.000.000',
        period: '/tahun',
        features: ['Semua Fitur Starter', 'SIAKAD Lengkap + LMS', '500 Akun Pengguna', 'Kasir Digital', 'Mobile App', 'Priority Support'],
        popular: true,
        cta: 'Minta Demo'
      },
      {
        name: 'Premium',
        tagline: 'Untuk enterprise',
        price: 'Hubungi Kami',
        period: '',
        features: ['Semua Fitur Scale', 'Unlimited Akun', 'Multi Satuan', 'Custom Branding', 'Dedicated Support', 'API Access'],
        popular: false,
        cta: 'Hubungi Sales'
      }
    ];
    renderPricingHTML(pricing);
  }

  function renderPricing() {
    renderPricingHTML(state.pricing.map(p => ({
      name: p.name,
      tagline: p.tagline,
      price: p.price,
      period: p.period,
      features: p.features,
      popular: p.isPopular,
      cta: p.ctaText
    })));
  }

  function renderPricingHTML(pricing) {
    DOM.pricingGrid.innerHTML = pricing.map((p, i) => `
      <div class="pricing-card ${p.popular ? 'popular' : ''}" data-animate data-delay="${i * 100}">
        ${p.popular ? '<div class="pricing-badge">Paling Populer</div>' : ''}
        <div class="pricing-header">
          <h3 class="pricing-name">${p.name}</h3>
          <p class="pricing-tagline">${p.tagline}</p>
          <div class="pricing-price">
            ${p.price}${p.period ? `<span>${p.period}</span>` : ''}
          </div>
        </div>
        <ul class="pricing-features">
          ${p.features.map(f => `
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              ${f}
            </li>
          `).join('')}
        </ul>
        <a href="https://wa.me/6281234567890?text=Halo, saya tertarik dengan paket ${p.name}" class="btn ${p.popular ? 'btn-primary' : 'btn-secondary'} pricing-cta">
          ${p.cta}
        </a>
      </div>
    `).join('');
    initScrollAnimations();
  }

  function renderDefaultBankingPartners() {
    const banks = ['Mandiri', 'BCA', 'BRI', 'BNI', 'Muamalat', 'Mega Syariah', 'Permata', 'BTN'];
    renderBankingPartnersHTML(banks);
  }

  function renderBankingPartners(banks) {
    renderBankingPartnersHTML(banks.map(b => b.name));
  }

  function renderBankingPartnersHTML(banks) {
    DOM.bankingTrack.innerHTML = banks.map(b => `
      <div class="partner-item">
        <span class="partner-name">Bank ${b}</span>
      </div>
    `).join('') + banks.map(b => `
      <div class="partner-item">
        <span class="partner-name">Bank ${b}</span>
      </div>
    `).join('');
  }

  function renderDefaultMediaPartners() {
    const media = ['Media Indonesia', 'Digital Bank', 'iNews', 'Republika', 'Kompas', 'Tempo'];
    renderMediaPartnersHTML(media);
  }

  function renderMediaPartners(media) {
    renderMediaPartnersHTML(media.map(m => m.name));
  }

  function renderMediaPartnersHTML(media) {
    DOM.mediaTrack.innerHTML = media.map(m => `
      <div class="partner-item">
        <span class="partner-name">${m}</span>
      </div>
    `).join('') + media.map(m => `
      <div class="partner-item">
        <span class="partner-name">${m}</span>
      </div>
    `).join('');
  }

  function renderFooter() {
    const html = `
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="/assets/images/logo.png" alt="CERDAS BERKARAKTER" onerror="this.style.display='none'">
          <span>CERDAS BERKARAKTER</span>
        </div>
        <p class="footer-desc">${state.footer.about?.description || 'Platform ERP Manajemen Pendidikan untuk sekolah, pesantren, kampus, dan bimbel.'}</p>
        <div class="footer-social">
          <a href="#"><i data-lucide="facebook"></i></a>
          <a href="#"><i data-lucide="instagram"></i></a>
          <a href="#"><i data-lucide="youtube"></i></a>
          <a href="#"><i data-lucide="linkedin"></i></a>
        </div>
      </div>
      <div class="footer-column">
        <h4>Fitur Premium</h4>
        <div class="footer-links">
          <a href="#modules">CBT Mobile</a>
          <a href="#modules">LMS Online</a>
          <a href="#modules">Smart Attendance</a>
          <a href="#modules">Smart Bill</a>
          <a href="#modules">PPDB Online</a>
        </div>
      </div>
      <div class="footer-column">
        <h4>Fitur Free</h4>
        <div class="footer-links">
          <a href="#modules">Kantin Digital</a>
          <a href="#modules">Website Sekolah</a>
          <a href="#modules">Smart Card</a>
          <a href="#modules">WhatsApp Gateway</a>
          <a href="#modules">ViDemy & ViHub</a>
        </div>
      </div>
      <div class="footer-column">
        <h4>Perusahaan</h4>
        <div class="footer-links">
          <a href="#">Tentang Kami</a>
          <a href="#">Karir</a>
          <a href="#">Blog</a>
          <a href="#">Kontak</a>
        </div>
      </div>
      <div class="footer-column">
        <h4>Kontak</h4>
        <div class="footer-links">
          <a href="#">${state.footer.about?.address || 'Jakarta, Indonesia'}</a>
          <a href="tel:${state.footer.about?.phone || '+622112345678'}">${state.footer.about?.phone || '(021) 1234-5678'}</a>
          <a href="mailto:${state.footer.about?.email || 'info@cerdasberkarakter.id'}">${state.footer.about?.email || 'info@cerdasberkarakter.id'}</a>
        </div>
      </div>
    `;
    DOM.footerGrid.innerHTML = html;
    lucide.createIcons();
  }

  // =============================================
  // Navigation Functions
  // =============================================
  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50 && !state.isScrolled) {
      DOM.navbar.classList.add('scrolled');
      state.isScrolled = true;
    } else if (scrollY <= 50 && state.isScrolled) {
      DOM.navbar.classList.remove('scrolled');
      state.isScrolled = false;
    }
  }

  function openMobileMenu() {
    DOM.mobileMenu.classList.add('active');
    DOM.mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    DOM.mobileMenu.classList.remove('active');
    DOM.mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // =============================================
  // Testimonial Slider
  // =============================================
  function goToTestimonial(index) {
    const cards = DOM.testimonialsTrack.querySelectorAll('.testimonial-card');
    const dots = DOM.testimonialsNav.querySelectorAll('.testimonials-dot');
    const cardWidth = cards[0]?.offsetWidth + 24; // Including gap
    const maxIndex = cards.length - Math.floor(DOM.testimonialsTrack.parentElement.offsetWidth / cardWidth);

    state.currentTestimonial = Math.max(0, Math.min(index, maxIndex));
    DOM.testimonialsTrack.style.transform = `translateX(-${state.currentTestimonial * cardWidth}px)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === state.currentTestimonial);
    });
  }

  function nextTestimonial() {
    const cards = DOM.testimonialsTrack.querySelectorAll('.testimonial-card');
    const maxIndex = cards.length - Math.floor(DOM.testimonialsTrack.parentElement.offsetWidth / (cards[0]?.offsetWidth + 24)) - 1;
    goToTestimonial(state.currentTestimonial >= maxIndex ? 0 : state.currentTestimonial + 1);
  }

  function startAutoSlide() {
    if (state.autoSlideTimer) clearInterval(state.autoSlideTimer);
    state.autoSlideTimer = setInterval(nextTestimonial, CONFIG.autoSlideInterval);
  }

  // =============================================
  // Counter Animation
  // =============================================
  function animateCounters() {
    const counters = DOM.heroStats?.querySelectorAll('.hero-stat-value[data-count]');
    if (!counters) return;

    counters.forEach(counter => {
      const target = parseInt(counter.dataset.count);
      const suffix = counter.dataset.suffix || '';
      const duration = CONFIG.counterSpeed;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString() + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
        }
      };

      // Start animation when in view
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(counter);
    });
  }

  // =============================================
  // Scroll Animations
  // =============================================
  function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  // =============================================
  // GSAP Animations
  // =============================================
  function initGSAP() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-badge', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.2
    });

    gsap.from('.hero h1', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.4
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.6
    });

    gsap.from('.hero-actions', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.8
    });

    gsap.from('.hero-stat', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      stagger: 0.1,
      delay: 1
    });

    // Section animations
    gsap.utils.toArray('.section-header').forEach(header => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8
      });
    });

    // Module cards
    gsap.utils.toArray('.module-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        },
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: i * 0.1
      });
    });

    // Parallax effect for hero shapes
    gsap.to('.hero-bg-shape-1', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 200,
      opacity: 0
    });

    gsap.to('.hero-bg-shape-2', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      },
      y: 150,
      opacity: 0
    });
  }

  // =============================================
  // Smooth Scroll
  // =============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offset = CONFIG.scrollOffset;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          closeMobileMenu();
        }
      });
    });
  }

  // =============================================
  // Initialize
  // =============================================
  async function init() {
    // Event listeners
    window.addEventListener('scroll', throttle(handleScroll, 100));

    if (DOM.mobileToggle) {
      DOM.mobileToggle.addEventListener('click', openMobileMenu);
    }

    if (DOM.mobileClose) {
      DOM.mobileClose.addEventListener('click', closeMobileMenu);
    }

    if (DOM.mobileOverlay) {
      DOM.mobileOverlay.addEventListener('click', closeMobileMenu);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });

    // Load all data
    await Promise.all([
      loadHeroData(),
      loadPartners(),
      loadModules(),
      loadWhyUs(),
      loadEcosystem(),
      loadTestimonials(),
      loadPricing(),
      loadFooter(),
      loadBankingPartners(),
      loadMediaPartners()
    ]);

    // Initialize animations
    initScrollAnimations();
    initSmoothScroll();
    initGSAP();
    animateCounters();

    // Pause auto-slide on hover
    if (DOM.testimonialsTrack) {
      DOM.testimonialsTrack.addEventListener('mouseenter', () => {
        if (state.autoSlideTimer) clearInterval(state.autoSlideTimer);
      });

      DOM.testimonialsTrack.addEventListener('mouseleave', startAutoSlide);
    }

    console.log('CERDAS BERKARAKTER initialized successfully!');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
