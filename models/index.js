const { sequelize } = require('./database');
const { DataTypes } = require('sequelize');

// ==================== USER MODEL ====================
const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM('admin', 'editor'), defaultValue: 'editor' },
  avatar: { type: DataTypes.STRING }
});

// ==================== HERO MODEL ====================
const Hero = sequelize.define('Hero', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  headline: { type: DataTypes.STRING(500) },
  subheadline: { type: DataTypes.TEXT },
  backgroundImage: { type: DataTypes.STRING(500) },
  ctaPrimaryText: { type: DataTypes.STRING(100) },
  ctaPrimaryUrl: { type: DataTypes.STRING(500) },
  ctaSecondaryText: { type: DataTypes.STRING(100) },
  ctaSecondaryUrl: { type: DataTypes.STRING(500) },
  phoneImage: { type: DataTypes.STRING(500) },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// ==================== HERO STATS MODEL ====================
const HeroStat = sequelize.define('HeroStat', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  heroId: { type: DataTypes.INTEGER },
  value: { type: DataTypes.STRING(50) },
  label: { type: DataTypes.STRING(100) },
  icon: { type: DataTypes.STRING(50) },
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 }
});

// ==================== MODULE MODEL ====================
const Module = sequelize.define('Module', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  icon: { type: DataTypes.STRING(100) },
  image: { type: DataTypes.STRING(500) },
  features: { type: DataTypes.JSONB, defaultValue: [] },
  badge: { type: DataTypes.STRING(20), defaultValue: null },   // 'PREMIUM' | 'FREE' | null
  color: { type: DataTypes.STRING(50), defaultValue: null },   // e.g., '#d8373f'
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// ==================== TESTIMONIAL MODEL ====================
const Testimonial = sequelize.define('Testimonial', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  title: { type: DataTypes.STRING(255) },
  institution: { type: DataTypes.STRING(255) },
  quote: { type: DataTypes.TEXT, allowNull: false },
  photo: { type: DataTypes.STRING(500) },
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// ==================== PARTNER MODEL ====================
const Partner = sequelize.define('Partner', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  logo: { type: DataTypes.STRING(500) },
  websiteUrl: { type: DataTypes.STRING(500) },
  category: { type: DataTypes.ENUM('education', 'banking', 'media'), allowNull: false },
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// ==================== PRICING MODEL ====================
const PricingPackage = sequelize.define('PricingPackage', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  tagline: { type: DataTypes.STRING(255) },
  price: { type: DataTypes.STRING(50) },
  period: { type: DataTypes.STRING(50) },
  features: { type: DataTypes.JSONB, defaultValue: [] },
  isPopular: { type: DataTypes.BOOLEAN, defaultValue: false },
  ctaText: { type: DataTypes.STRING(100) },
  ctaUrl: { type: DataTypes.STRING(500) },
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// ==================== SOCIAL LINK MODEL ====================
const SocialLink = sequelize.define('SocialLink', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  platform: { type: DataTypes.STRING(50), allowNull: false },
  url: { type: DataTypes.STRING(500), allowNull: false },
  icon: { type: DataTypes.STRING(100) },
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// ==================== FOOTER MODEL ====================
const FooterContent = sequelize.define('FooterContent', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  section: { type: DataTypes.STRING(100), allowNull: false },
  content: { type: DataTypes.JSONB }
});

// ==================== MEDIA MODEL ====================
const Media = sequelize.define('Media', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  filename: { type: DataTypes.STRING(255), allowNull: false },
  originalName: { type: DataTypes.STRING(255) },
  mimeType: { type: DataTypes.STRING(100) },
  size: { type: DataTypes.INTEGER },
  url: { type: DataTypes.STRING(500), allowNull: false },
  altText: { type: DataTypes.STRING(255) },
  uploadedBy: { type: DataTypes.INTEGER }
});

// ==================== SETTINGS MODEL ====================
const Setting = sequelize.define('Setting', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  key: { type: DataTypes.STRING(100), unique: true, allowNull: false },
  value: { type: DataTypes.JSONB }
});

// ==================== WHY US MODEL ====================
const WhyUs = sequelize.define('WhyUs', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  description: { type: DataTypes.TEXT },
  icon: { type: DataTypes.STRING(100) },
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// ==================== ECOSYSTEM USER MODEL ====================
const EcosystemUser = sequelize.define('EcosystemUser', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  icon: { type: DataTypes.STRING(100) },
  description: { type: DataTypes.STRING(255) },
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// ==================== VIDEO TUTORIAL MODEL ====================
const VideoTutorial = sequelize.define('VideoTutorial', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(255), allowNull: false },
  youtubeId: { type: DataTypes.STRING(100) },
  thumbnail: { type: DataTypes.STRING(500) },
  description: { type: DataTypes.TEXT },
  displayOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// ==================== RELATIONS ====================
Hero.hasMany(HeroStat, { foreignKey: 'heroId', as: 'stats' });
HeroStat.belongsTo(Hero, { foreignKey: 'heroId', as: 'hero' });

User.hasMany(Media, { foreignKey: 'uploadedBy', as: 'uploads' });
Media.belongsTo(User, { foreignKey: 'uploadedBy', as: 'uploader' });

module.exports = {
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
};
