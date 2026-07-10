require('dotenv').config();
const { Module } = require('./models/index');

const colorMap = {
  'CBT Mobile': '#c73434', // Merah
  'LMS Online': '#2b74b6', // Biru
  'Smart Attendance': '#107759', // Hijau
  'Smart Bill': '#d5a417', // Kuning
  'PPDB Online': '#2b74b6', // Biru
  'ViPay': '#d5a417', // Kuning
  'Website Sekolah': '#107759', // Hijau
  'Smart Card': '#c73434', // Merah
  'Whatsapp Gateway': '#107759', // Hijau
  'ViDemy': '#c73434', // Merah
  'ViHub': '#d5a417', // Kuning
  'Smart Controlling': '#2b74b6' // Biru
};

async function forceUpdateColors() {
  try {
    for (const [title, color] of Object.entries(colorMap)) {
      await Module.update({ color: color }, { where: { title: title } });
      console.log(`Updated ${title} to ${color}`);
    }
    console.log('✅ Semua warna berhasil dipaksa update di database!');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

forceUpdateColors();
