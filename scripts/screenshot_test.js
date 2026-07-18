/**
 * Puppeteer screenshot — Fitur section dengan badge PREMIUM/FREE
 */
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('🌐 Membuka http://localhost:3000/ ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0', timeout: 30000 });

  // Tunggu section modules muncul
  await page.waitForSelector('#modulesGrid .module-card', { timeout: 15000 });
  console.log('✅ Module cards ditemukan di DOM!');

  // Scroll ke section modules
  await page.evaluate(() => {
    document.getElementById('modules').scrollIntoView({ behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 500));

  // Cek badge yang ada
  const badges = await page.evaluate(() => {
    const cards = document.querySelectorAll('#modulesGrid .module-card');
    return Array.from(cards).map(card => {
      const title = card.querySelector('h3')?.textContent?.trim();
      const badge = card.querySelector('.module-feature-tag[style*="font-weight: 700"]')?.textContent?.trim();
      return { title, badge };
    });
  });

  console.log('\n📋 Hasil render fitur:');
  badges.forEach(b => {
    const icon = b.badge === 'PREMIUM' ? '🔵' : b.badge === 'FREE' ? '🟢' : '⚪';
    console.log(`  ${icon} [${(b.badge || 'no badge').padEnd(7)}] ${b.title}`);
  });

  // Screenshot modules section saja
  const modulesSection = await page.$('#modules');
  await modulesSection.screenshot({
    path: '/home/ridho/.gemini/antigravity-ide/brain/ecc80223-e68e-4392-aa4f-a0e7713b1633/modules_badges_final.png'
  });
  console.log('\n📸 Screenshot section modules disimpan!');

  // Screenshot full page
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({
    path: '/home/ridho/.gemini/antigravity-ide/brain/ecc80223-e68e-4392-aa4f-a0e7713b1633/fullpage_badges.png',
    fullPage: true
  });
  console.log('📸 Full page screenshot disimpan!');

  await browser.close();
  console.log('\n✅ Selesai!');
  process.exit(0);
})().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
