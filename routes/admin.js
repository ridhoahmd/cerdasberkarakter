const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');
const { Module, Testimonial, Partner, PricingPackage, Hero, HeroStat, WhyUs, EcosystemUser, FooterContent } = require('../models/index');

// Apply authentication middleware to all routes
function requireAuth(req, res, next) {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  res.redirect('/admin/login');
}

// Admin login page
router.get('/login', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/admin/dashboard');
  }
  res.render('admin/login', { error: null });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

// Redirect /admin to /admin/login
router.get('/', (req, res) => {
  if (req.session && req.session.isAdmin) {
    return res.redirect('/admin/dashboard');
  }
  res.redirect('/admin/login');
});

router.get('/dashboard', requireAuth, async (req, res) => {
  try {
    const [modules, testimonials, partners, pricing, hero, whyUs, ecosystem] = await Promise.all([
      Module.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] }),
      Testimonial.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] }),
      Partner.findAll({ where: { isActive: true, category: 'education' }, order: [['displayOrder', 'ASC']] }),
      PricingPackage.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] }),
      Hero.findOne({ include: [{ model: HeroStat, as: 'stats' }] }),
      WhyUs.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] }),
      EcosystemUser.findAll({ where: { isActive: true }, order: [['displayOrder', 'ASC']] })
    ]);

    res.render('admin/dashboard', {
      modules,
      testimonials,
      partners,
      pricing,
      hero,
      whyUs,
      ecosystem,
      user: req.session
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.redirect('/admin/login');
  }
});

router.get('/modules', requireAuth, async (req, res) => {
  const modules = await Module.findAll({ order: [['displayOrder', 'ASC']] });
  res.render('admin/modules', { modules });
});

router.get('/testimonials', requireAuth, async (req, res) => {
  const testimonials = await Testimonial.findAll({ order: [['displayOrder', 'ASC']] });
  res.render('admin/testimonials', { testimonials });
});

router.get('/partners', requireAuth, async (req, res) => {
  const partners = await Partner.findAll({ order: [['displayOrder', 'ASC']] });
  res.render('admin/partners', { partners });
});

router.get('/pricing', requireAuth, async (req, res) => {
  const pricing = await PricingPackage.findAll({ order: [['displayOrder', 'ASC']] });
  res.render('admin/pricing', { pricing });
});

router.get('/hero', requireAuth, async (req, res) => {
  const hero = await Hero.findOne({ include: [{ model: HeroStat, as: 'stats' }] });
  res.render('admin/hero', { hero });
});

router.get('/footer', requireAuth, async (req, res) => {
  const footer = await FooterContent.findAll();
  res.render('admin/footer', { footer });
});

module.exports = router;
