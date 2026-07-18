# SPEC.md - CERDAS BERKARAKTER Landing Page & CMS

## 1. Concept & Vision

**CERDAS BERKARAKTER** adalah platform ERP manajemen pendidikan modern yang terintegrasi untuk Schools, Pesantren, Campus, dan Bimbel. Website ini memancarkan kesan profesional, terpercaya, dan inovatif dengan animasi halus yang hidup di setiap scroll, memberikan pengalaman browsing yang premium dan engaging bagi pengunjung Indonesia.

---

## 2. Design Language

### Aesthetic Direction
Modern gradient-based design dengan sentuhan futuristik education-tech. Terinspirasi dari pintro.id dengan tambahan warna pink yang memberikan energi dan kehangatan.

### Color Palette

```css
:root {
  /* Primary Colors - Red Pink */
  --purple-900: #4a0920;
  --purple-800: #6b0d2e;
  --purple-700: #8e113c;
  --purple-600: #b2164b;
  --purple-500: #e11e62;
  --purple-400: #e84d82;

  /* Accent Colors - Pink */
  --pink-700: #C4276E;
  --pink-600: #D63384;
  --pink-500: #e11e62;
  --pink-400: #e84d82;
  --pink-300: #f07da6;

  /* Gradient Combinations */
  --gradient-primary: linear-gradient(135deg, #b2164b 0%, #e11e62 100%);
  --gradient-hero: linear-gradient(135deg, #0d0005 0%, #2a0112 45%, #8e0a3a 75%, #e11e62 100%);
  --gradient-card: linear-gradient(180deg, rgba(225, 30, 98, 0.08) 0%, rgba(225, 30, 98, 0.03) 100%);
  --gradient-text: linear-gradient(135deg, #7a0d32 0%, #c4175a 100%);

  /* Neutral Colors */
  --white: #FFFFFF;
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;

  /* Functional Colors */
  --success: #10B981;
  --success-light: #D1FAE5;
  --warning: #F59E0B;
  --error: #EF4444;
  --whatsapp: #25D366;
  --whatsapp-dark: #128C7E;
}
```

### Typography

```css
/* Headings */
font-family: 'Plus Jakarta Sans', sans-serif;
font-weight: 700;

/* Body */
font-family: 'Inter', sans-serif;
font-weight: 400;

/* Scale */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;     /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */
--text-5xl: 3rem;      /* 48px */
--text-6xl: 3.75rem;   /* 60px */
--text-7xl: 4.5rem;    /* 72px */
```

### Spacing System

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### Motion Philosophy

| Animation Type | Duration | Easing | Purpose |
|---------------|----------|--------|---------|
| Fade In Up | 600ms | ease-out | Content reveals |
| Fade In | 400ms | ease | Quick reveals |
| Slide In Left | 800ms | cubic-bezier(0.16, 1, 0.3, 1) | Hero elements |
| Scale Up | 500ms | cubic-bezier(0.34, 1.56, 0.64, 1) | Hover effects |
| Gradient Shift | 3000ms | ease-in-out | Background animation |
| Float | 4000ms | ease-in-out | Decorative elements |

### Visual Assets
- **Icons**: Lucide Icons (consistent stroke width 2px)
- **Illustrations**: Custom SVG illustrations with gradient fills
- **Images**: High-quality education-themed stock photos
- **Decorative**: Floating geometric shapes, gradient orbs, mesh gradients

---

## 3. Layout & Structure

### Page Sections (Landing Page)

```
┌─────────────────────────────────────────────────────────┐
│ NAVIGATION - Sticky, glass-morphism on scroll          │
├─────────────────────────────────────────────────────────┤
│ HERO - Full viewport, animated gradient background      │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Headline + Subheadline + CTA buttons                │ │
│ │ Floating phone mockup with app preview              │ │
│ │ Animated stats (650+ Institusi, 17 Tahun, dll)      │ │
│ └─────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│ SOCIAL PROOF - Auto-scrolling partner logos carousel    │
│ "Dipercaya oleh 650+ Institusi Pendidikan"             │
├─────────────────────────────────────────────────────────┤
│ MODULES GRID - 12 feature cards with hover animations   │
│ [5 PREMIUM] + [7 FREE]                                 │
├─────────────────────────────────────────────────────────┤
│ WHY CERDAS BERKARAKTER - 4 key advantages              │
│ [17 Tahun Pengalaman] [Whitelabel] [Cobrand] [ERP]      │
├─────────────────────────────────────────────────────────┤
│ ECOSYSTEM - Visual diagram of user types               │
│ [Siswa] [Calon Siswa] [Orang Tua] [Guru]                │
│ [Yayasan] [Kantin] [Bank]                               │
├─────────────────────────────────────────────────────────┤
│ TESTIMONIALS - Card carousel with photos                │
├─────────────────────────────────────────────────────────┤
│ BANKING PARTNERS - 8+ bank logos                       │
├─────────────────────────────────────────────────────────┤
│ MEDIA COVERAGE - News/media logos                       │
├─────────────────────────────────────────────────────────┤
│ CTA - WhatsApp + Phone contact                          │
├─────────────────────────────────────────────────────────┤
│ FOOTER - 4-column layout                                │
│ [Logo + Deskripsi] [Produk] [Perusahaan] [Kontak]       │
└─────────────────────────────────────────────────────────┘
```

### Responsive Breakpoints

```css
/* Mobile First Approach */
--breakpoint-sm: 640px;   /* Mobile landscape */
--breakpoint-md: 768px;   /* Tablet */
--breakpoint-lg: 1024px;  /* Desktop */
--breakpoint-xl: 1280px;  /* Large desktop */
--breakpoint-2xl: 1536px; /* Extra large */
```

### Grid System
- Container max-width: 1280px
- Section padding: 96px vertical (desktop), 64px (tablet), 48px (mobile)
- Card gap: 24px
- Content max-width for text: 768px

---

## 4. Features & Interactions

### Navigation
- **Default**: Transparent background
- **On scroll (>50px)**: Glass-morphism background (`backdrop-filter: blur(12px)`)
- **Mobile**: Hamburger menu with slide-in drawer
- **Dropdown**: Fade + scale animation on hover

### Hero Section
- **Background**: Animated gradient mesh
- **Headline**: Typewriter or split-text reveal animation
- **Stats Counter**: Count-up animation when in viewport
- **Floating Elements**: Gentle floating animation (parallax on scroll)
- **CTA Buttons**: Gradient hover, scale on hover

### Module Cards
- **Default**: Subtle shadow, gradient border
- **Hover**: Lift effect (translateY -8px), glow shadow, icon animation
- **Click**: Navigate to module detail or modal

### Partner Carousel
- **Animation**: Continuous horizontal scroll (CSS animation)
- **Pause**: On hover
- **Responsive**: 6 logos desktop, 4 tablet, 2 mobile

### Testimonial Cards
- **Layout**: 3 cards visible desktop, 1 mobile
- **Navigation**: Dots indicator + swipe
- **Auto-play**: 5 second intervals

### Pricing Cards
- **Scale (Popular)**: Slightly larger, glow effect, "Popular" badge
- **Hover**: Border glow animation
- **CTA**: Opens WhatsApp or modal

### CMS Features (Admin Dashboard)

#### Section Management
| Entity | CRUD | Fields |
|--------|------|--------|
| Hero | Full | Headline, subheadline, background_image, cta_buttons[], stats[] |
| Modules | Full | Title, description, icon, image, order, visibility |
| Testimonials | Full | Name, title, institution, quote, photo, order |
| Partners | Full | Name, logo, website_url, order |
| Pricing | Full | Name, price, period, features[], is_popular, cta_text |
| Banking Partners | Full | Bank name, logo |
| Media Coverage | Full | Media name, logo, article_url |
| Footer | Full | All footer content fields |
| Social Links | Full | Platform, url, icon |

#### Admin Features
- **Authentication**: JWT-based login
- **Dashboard**: Overview stats, recent updates
- **Media Library**: Upload/manage images
- **Preview**: Live preview sebelum publish
- **Versioning**: Undo/redo changes
- **Multi-language Ready**: Structure for Indonesian/English

### Error States
- **Form validation**: Inline error messages with shake animation
- **API errors**: Toast notification with retry option
- **Empty states**: Illustrated empty state with CTA

### Loading States
- **Skeleton**: Animated skeleton loaders matching content shape
- **Spinner**: Circular spinner for buttons
- **Progress**: Linear progress for uploads

---

## 5. Component Inventory

### Buttons
| Variant | Default | Hover | Active | Disabled |
|---------|---------|-------|--------|----------|
| Primary | Gradient bg, white text | Brightness +10%, scale 1.02 | Scale 0.98 | Opacity 50%, no pointer |
| Secondary | Transparent, gradient border | Gradient bg fills | Scale 0.98 | Opacity 50% |
| Ghost | Transparent, text only | Underline appears | Opacity 80% | Opacity 50% |
| WhatsApp | Green bg, white text | Darken 10% | Scale 0.98 | Opacity 50% |

### Cards
| Type | Structure |
|------|-----------|
| Module Card | Icon (48px) + Title + Description + Optional Image |
| Testimonial Card | Photo (circle 64px) + Quote + Name + Title |
| Pricing Card | Header + Price + Features List + CTA |
| Partner Card | Logo (auto-height, max 60px) |

### Navigation
| Element | States |
|---------|--------|
| Nav Link | Default, Hover (underline), Active (bold) |
| Dropdown | Closed, Open (fade+scale) |
| Mobile Menu | Closed, Open (slide-in) |
| Logo | Default, Hover (slight glow) |

### Form Elements
| Component | States |
|-----------|--------|
| Input | Default, Focus (border glow), Error (red border + message), Disabled |
| Textarea | Same as Input |
| Select | Default, Open, Focus |
| File Upload | Default, Dragging (border dashed + highlight), Uploading (progress) |
| Toggle | Off, On (animated slide) |

### Feedback
| Component | Usage |
|-----------|-------|
| Toast | Success (green), Error (red), Warning (yellow), Info (blue) |
| Modal | Centered, backdrop blur, slide-up animation |
| Tooltip | Appears on hover with fade |

---

## 6. Technical Approach

### Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND                             │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Landing Page (Static/SSR)                       │   │
│  │  - HTML5 + CSS3 + Vanilla JS                      │   │
│  │  - GSAP for animations                           │   │
│  │  - Fetch data from API                          │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  CMS Admin Dashboard                            │   │
│  │  - React.js                                     │   │
│  │  - Tailwind CSS                                │   │
│  │  - React Router                                │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                    BACKEND                              │
│  ┌─────────────────────────────────────────────────┐   │
│  │  Express.js REST API                           │   │
│  │  - Authentication (JWT)                         │   │
│  │  - CRUD endpoints for all entities              │   │
│  │  - File upload (Multer)                        │   │
│  │  - Validation (Joi/Zod)                         │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                    DATABASE                             │
│  ┌─────────────────────────────────────────────────┐   │
│  │  PostgreSQL                                     │   │
│  │  - Sequelize ORM                                │   │
│  │  - Migrations                                  │   │
│  │  - Seeders                                     │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Database Schema

```sql
-- Users (Admin)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role ENUM('admin', 'editor') DEFAULT 'editor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hero Section
CREATE TABLE heroes (
  id SERIAL PRIMARY KEY,
  headline VARCHAR(500),
  subheadline TEXT,
  background_image VARCHAR(500),
  cta_primary_text VARCHAR(100),
  cta_primary_url VARCHAR(500),
  cta_secondary_text VARCHAR(100),
  cta_secondary_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stats
CREATE TABLE hero_stats (
  id SERIAL PRIMARY KEY,
  hero_id INTEGER REFERENCES heroes(id),
  value VARCHAR(50),
  label VARCHAR(100),
  icon VARCHAR(50),
  display_order INTEGER
);

-- Modules
CREATE TABLE modules (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  image VARCHAR(500),
  features JSONB DEFAULT '[]',
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255),
  institution VARCHAR(255),
  quote TEXT NOT NULL,
  photo VARCHAR(500),
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Partners
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  logo VARCHAR(500),
  website_url VARCHAR(500),
  category ENUM('education', 'banking', 'media') NOT NULL,
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Pricing Packages
CREATE TABLE pricing_packages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  tagline VARCHAR(255),
  price VARCHAR(50),
  period VARCHAR(50),
  features JSONB DEFAULT '[]',
  is_popular BOOLEAN DEFAULT false,
  cta_text VARCHAR(100),
  cta_url VARCHAR(500),
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social Links
CREATE TABLE social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(50) NOT NULL,
  url VARCHAR(500) NOT NULL,
  icon VARCHAR(100),
  display_order INTEGER,
  is_active BOOLEAN DEFAULT true
);

-- Footer Content
CREATE TABLE footer_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  content JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Media Library
CREATE TABLE media (
  id SERIAL PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  mime_type VARCHAR(100),
  size INTEGER,
  url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255),
  uploaded_by INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Settings
CREATE TABLE settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### API Endpoints

```
Authentication:
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

Hero:
GET    /api/heroes           (public)
PUT    /api/heroes/:id       (auth)

Modules:
GET    /api/modules          (public)
POST   /api/modules          (auth)
PUT    /api/modules/:id      (auth)
DELETE /api/modules/:id      (auth)
PATCH  /api/modules/reorder  (auth)

Testimonials:
GET    /api/testimonials          (public)
POST   /api/testimonials          (auth)
PUT    /api/testimonials/:id      (auth)
DELETE /api/testimonials/:id      (auth)

Partners:
GET    /api/partners              (public)
POST   /api/partners              (auth)
PUT    /api/partners/:id          (auth)
DELETE /api/partners/:id          (auth)

Pricing:
GET    /api/pricing               (public)
POST   /api/pricing               (auth)
PUT    /api/pricing/:id           (auth)
DELETE /api/pricing/:id           (auth)

Media:
GET    /api/media                 (auth)
POST   /api/media/upload          (auth)
DELETE /api/media/:id             (auth)

Settings:
GET    /api/settings              (public)
PUT    /api/settings              (auth)

Dashboard:
GET    /api/dashboard/stats       (auth)
```

### File Structure

```
cerdasberkarakter-main/
├── public/                         # Static assets (served directly)
│   ├── landing.html                # Main landing page
│   ├── favicon.ico
│   ├── spt.ico
│   ├── assets/
│   │   ├── css/
│   │   │   ├── variables.css       # CSS variables & color palette
│   │   │   ├── components.css      # All component styles (nav, hero, cards, etc.)
│   │   │   └── animations.css      # Scroll reveal animations & transitions
│   │   ├── js/
│   │   │   └── main.js             # Frontend JS (fetch, render, interactions)
│   │   ├── images/
│   │   │   ├── logo/               # Brand logos (full, white, icon variants)
│   │   │   ├── hero/               # Hero phone mockup
│   │   │   └── placeholder.png
│   │   └── videos/                 # Video assets (e.g. phone mockup mp4)
│   └── uploads/                    # User-uploaded files (gitignored)
│
├── views/                          # EJS templates (server-side rendered CMS)
│   ├── admin/
│   │   ├── login.ejs               # Admin login page
│   │   ├── dashboard.ejs           # CMS dashboard overview
│   │   ├── hero.ejs                # Hero section editor
│   │   ├── modules.ejs             # Modules management
│   │   ├── partners.ejs            # Partner logos management
│   │   ├── testimonials.ejs        # Testimonials management
│   │   └── pricing.ejs             # Pricing packages management
│   │   └── footer.ejs              # Footer content editor
│   │   └── whyus.ejs               # (planned) Why Us content editor
│   │   └── ecosystem.ejs           # (planned) Ecosystem management
│   │   └── social.ejs              # (planned) Social links management
│   │   └── media.ejs               # (planned) Media library
│   │   └── settings.ejs            # (planned) Site settings
│
├── models/                         # Sequelize ORM models
│   ├── database.js                 # Sequelize connection config
│   ├── initDB.js                   # DB sync & seed data (force:true)
│   └── index.js                    # All model definitions (User, Hero, Module, etc.)
│
├── middleware/
│   └── auth.js                     # JWT authentication middleware
│
├── routes/
│   ├── index.js                    # Serves landing.html
│   ├── admin.js                    # CMS admin routes (EJS)
│   ├── api.js                      # Public + Protected REST API
│   └── auth.js                     # Login/logout routes
│
├── scripts/                        # One-off utility scripts (gitignored)
│   ├── force_color_update.js
│   ├── migrate_badge.js
│   ├── update_modules.js
│   ├── screenshot_test.js
│   └── test_browser.js
│
├── app.js                          # Main entry point (Express server)
├── package.json
├── deploy.sh                       # Deployment script (rsync + pm2)
├── SPEC.md                         # This specification
├── README.md
└── .env                            # Environment variables (gitignored)
```

### Security
- JWT token authentication for API endpoints (admin CMS uses session-based auth)
- Password hashing with bcrypt (12 rounds)
- CORS configuration
- SQL injection prevention via Sequelize ORM (parameterized queries)
- XSS prevention via EJS default escaping
- File upload validation (planned: type, size)
- **Missing**: Rate limiting, helmet security headers, CSRF protection, input validation library
- **Missing**: connect-pg-simple session store (package installed but not configured)

---

## 7. Target Institutions

| Tipe | Modul Utama |
|------|-------------|
| **Sekolah** | Siakad, Penerimaan, Kasir Digital, Raport Digital |
| **Pesantren** | Asrama, Siakad, Keuangan, Kitirongan |
| **Kampus** | SIAKAD, MBKM, Wisuda, Alumni |
| **Bimbel** | Pendaftaran, Jadwal, Ruangan, Keuangan |

---

## 8. Deliverables Checklist

- [x] Landing Page HTML/CSS/JS with all sections
- [x] Scroll reveal animations (CSS-based)
- [x] API Backend (Express + PostgreSQL + Sequelize)
- [x] Admin CMS Dashboard (EJS server-rendered)
- [x] Database models & seed data
- [x] JWT auth for API + Session auth for CMS
- [x] Deployment script (rsync + pm2)
- [ ] Admin pages: Why Us, Ecosystem, Social, Media, Settings
- [ ] Security hardening (helmet, rate limiting, input validation)
- [ ] EJS partials refactor (eliminate CSS/HTML duplication)
- [ ] Documentation

---

**Document Version**: 1.1
**Created**: 2026-07-08
**Last Updated**: 2026-07-15
