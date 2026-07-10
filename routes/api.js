const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User, Hero, HeroStat, Module, Testimonial, Partner, PricingPackage, SocialLink, FooterContent, Setting, WhyUs, EcosystemUser } = require('../models');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Public Routes

// Get Hero (active only)
router.get('/heroes', async (req, res) => {
  try {
    const hero = await Hero.findOne({
      where: { isActive: true },
      include: [{ model: HeroStat, as: 'stats', order: [['displayOrder', 'ASC']] }]
    });
    res.json(hero);
  } catch (error) {
    console.error('Error fetching hero:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Modules (active only)
router.get('/modules', async (req, res) => {
  try {
    const modules = await Module.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']]
    });
    res.json(modules);
  } catch (error) {
    console.error('Error fetching modules:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Why Us (active only)
router.get('/why-us', async (req, res) => {
  try {
    const whyUs = await WhyUs.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']]
    });
    res.json(whyUs);
  } catch (error) {
    console.error('Error fetching why us:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Ecosystem (active only)
router.get('/ecosystem', async (req, res) => {
  try {
    const ecosystem = await EcosystemUser.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']]
    });
    res.json(ecosystem);
  } catch (error) {
    console.error('Error fetching ecosystem:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Testimonials (active only)
router.get('/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']]
    });
    res.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Partners by category
router.get('/partners', async (req, res) => {
  try {
    const { category } = req.query;
    const where = { isActive: true };
    if (category) where.category = category;

    const partners = await Partner.findAll({
      where,
      order: [['displayOrder', 'ASC']]
    });
    res.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Pricing Packages (active only)
router.get('/pricing', async (req, res) => {
  try {
    const pricing = await PricingPackage.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']]
    });
    res.json(pricing);
  } catch (error) {
    console.error('Error fetching pricing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Social Links (active only)
router.get('/social', async (req, res) => {
  try {
    const social = await SocialLink.findAll({
      where: { isActive: true },
      order: [['displayOrder', 'ASC']]
    });
    res.json(social);
  } catch (error) {
    console.error('Error fetching social links:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Footer Content
router.get('/footer', async (req, res) => {
  try {
    const footer = await FooterContent.findAll();
    const result = {};
    footer.forEach(f => {
      result[f.section] = f.content;
    });
    res.json(result);
  } catch (error) {
    console.error('Error fetching footer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Settings
router.get('/settings', async (req, res) => {
  try {
    const settings = await Setting.findAll();
    const result = {};
    settings.forEach(s => {
      result[s.key] = s.value;
    });
    res.json(result);
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =============================================
// Admin Routes (Protected)
// =============================================

// Update Hero
router.put('/heroes/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { headline, subheadline, backgroundImage, ctaPrimaryText, ctaPrimaryUrl, ctaSecondaryText, ctaSecondaryUrl, isActive } = req.body;

    const hero = await Hero.findByPk(id);
    if (!hero) {
      return res.status(404).json({ error: 'Hero not found' });
    }

    await hero.update({
      headline,
      subheadline,
      backgroundImage,
      ctaPrimaryText,
      ctaPrimaryUrl,
      ctaSecondaryText,
      ctaSecondaryUrl,
      isActive
    });

    res.json(hero);
  } catch (error) {
    console.error('Error updating hero:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Hero Stats
router.put('/hero-stats/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { value, label, icon, displayOrder } = req.body;

    const stat = await HeroStat.findByPk(id);
    if (!stat) {
      return res.status(404).json({ error: 'Stat not found' });
    }

    await stat.update({ value, label, icon, displayOrder });
    res.json(stat);
  } catch (error) {
    console.error('Error updating stat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Module
router.post('/modules', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { title, description, icon, image, color, badge, features, displayOrder } = req.body;
    const module = await Module.create({
      title,
      description,
      icon,
      image,
      color: color || null,
      badge: badge || null,
      features: features || [],
      displayOrder: displayOrder || 0
    });
    res.status(201).json(module);
  } catch (error) {
    console.error('Error creating module:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Module
router.put('/modules/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, image, color, badge, features, displayOrder, isActive } = req.body;

    const module = await Module.findByPk(id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }

    await module.update({
      title,
      description,
      icon,
      image,
      color,
      badge,
      features,
      displayOrder,
      isActive
    });

    res.json(module);
  } catch (error) {
    console.error('Error updating module:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Module
router.delete('/modules/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const module = await Module.findByPk(id);
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    await module.destroy();
    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    console.error('Error deleting module:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Testimonial
router.post('/testimonials', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, title, institution, quote, photo, displayOrder } = req.body;
    const testimonial = await Testimonial.create({
      name,
      title,
      institution,
      quote,
      photo,
      displayOrder: displayOrder || 0
    });
    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Testimonial
router.put('/testimonials/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, title, institution, quote, photo, displayOrder, isActive } = req.body;

    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }

    await testimonial.update({
      name,
      title,
      institution,
      quote,
      photo,
      displayOrder,
      isActive
    });

    res.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Testimonial
router.delete('/testimonials/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findByPk(id);
    if (!testimonial) {
      return res.status(404).json({ error: 'Testimonial not found' });
    }
    await testimonial.destroy();
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Partner
router.post('/partners', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, logo, websiteUrl, category, displayOrder } = req.body;
    const partner = await Partner.create({
      name,
      logo,
      websiteUrl,
      category,
      displayOrder: displayOrder || 0
    });
    res.status(201).json(partner);
  } catch (error) {
    console.error('Error creating partner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Partner
router.put('/partners/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo, websiteUrl, category, displayOrder, isActive } = req.body;

    const partner = await Partner.findByPk(id);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }

    await partner.update({
      name,
      logo,
      websiteUrl,
      category,
      displayOrder,
      isActive
    });

    res.json(partner);
  } catch (error) {
    console.error('Error updating partner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Partner
router.delete('/partners/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const partner = await Partner.findByPk(id);
    if (!partner) {
      return res.status(404).json({ error: 'Partner not found' });
    }
    await partner.destroy();
    res.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Pricing Package
router.post('/pricing', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, tagline, price, period, features, isPopular, ctaText, ctaUrl, displayOrder } = req.body;
    const pricing = await PricingPackage.create({
      name,
      tagline,
      price,
      period,
      features: features || [],
      isPopular: isPopular || false,
      ctaText,
      ctaUrl,
      displayOrder: displayOrder || 0
    });
    res.status(201).json(pricing);
  } catch (error) {
    console.error('Error creating pricing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Pricing Package
router.put('/pricing/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tagline, price, period, features, isPopular, ctaText, ctaUrl, displayOrder, isActive } = req.body;

    const pricing = await PricingPackage.findByPk(id);
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing package not found' });
    }

    await pricing.update({
      name,
      tagline,
      price,
      period,
      features,
      isPopular,
      ctaText,
      ctaUrl,
      displayOrder,
      isActive
    });

    res.json(pricing);
  } catch (error) {
    console.error('Error updating pricing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete Pricing Package
router.delete('/pricing/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const pricing = await PricingPackage.findByPk(id);
    if (!pricing) {
      return res.status(404).json({ error: 'Pricing package not found' });
    }
    await pricing.destroy();
    res.json({ message: 'Pricing package deleted successfully' });
  } catch (error) {
    console.error('Error deleting pricing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Footer
router.put('/footer/:section', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { section } = req.params;
    const { content } = req.body;

    const [footer] = await FooterContent.findOrCreate({
      where: { section },
      defaults: { section, content }
    });

    if (footer) {
      await footer.update({ content });
    }

    res.json(footer);
  } catch (error) {
    console.error('Error updating footer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CRUD Why Us
router.post('/why-us', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { title, description, icon, displayOrder } = req.body;
    const whyUs = await WhyUs.create({ title, description, icon, displayOrder: displayOrder || 0 });
    res.status(201).json(whyUs);
  } catch (error) {
    console.error('Error creating why us:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/why-us/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, icon, displayOrder, isActive } = req.body;
    const whyUs = await WhyUs.findByPk(id);
    if (!whyUs) return res.status(404).json({ error: 'Not found' });
    await whyUs.update({ title, description, icon, displayOrder, isActive });
    res.json(whyUs);
  } catch (error) {
    console.error('Error updating why us:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/why-us/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const whyUs = await WhyUs.findByPk(id);
    if (!whyUs) return res.status(404).json({ error: 'Not found' });
    await whyUs.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting why us:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CRUD Ecosystem
router.post('/ecosystem', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { name, icon, description, displayOrder } = req.body;
    const ecosystem = await EcosystemUser.create({ name, icon, description, displayOrder: displayOrder || 0 });
    res.status(201).json(ecosystem);
  } catch (error) {
    console.error('Error creating ecosystem:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/ecosystem/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon, description, displayOrder, isActive } = req.body;
    const ecosystem = await EcosystemUser.findByPk(id);
    if (!ecosystem) return res.status(404).json({ error: 'Not found' });
    await ecosystem.update({ name, icon, description, displayOrder, isActive });
    res.json(ecosystem);
  } catch (error) {
    console.error('Error updating ecosystem:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/ecosystem/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const ecosystem = await EcosystemUser.findByPk(id);
    if (!ecosystem) return res.status(404).json({ error: 'Not found' });
    await ecosystem.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting ecosystem:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Dashboard Stats
router.get('/dashboard/stats', authenticateToken, async (req, res) => {
  try {
    const [modules, testimonials, partners, pricing] = await Promise.all([
      Module.count({ where: { isActive: true } }),
      Testimonial.count({ where: { isActive: true } }),
      Partner.count({ where: { isActive: true } }),
      PricingPackage.count({ where: { isActive: true } })
    ]);

    res.json({
      modules,
      testimonials,
      partners,
      pricing
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
