/**
 * Browser Test — Verifikasi fitur section di localhost:3000
 * Menggunakan Chrome Remote Debugging (tanpa puppeteer)
 */
const http = require('http');
const { execSync, spawn } = require('child_process');
const fs = require('fs');

const SCREENSHOT_DIR = '/home/ridho/.gemini/antigravity-ide/brain/ecc80223-e68e-4392-aa4f-a0e7713b1633';
const OUTPUT_FILE = `${SCREENSHOT_DIR}/modules_rendered.png`;

// Launch Chrome dengan remote debugging
console.log('🚀 Meluncurkan Chrome headless...');

const chrome = spawn('google-chrome', [
  '--headless=new',
  '--no-sandbox',
  '--disable-gpu',
  '--remote-debugging-port=9222',
  '--window-size=1280,3000',
  'http://localhost:3000/'
], { stdio: 'pipe' });

// Tunggu Chrome siap
setTimeout(async () => {
  try {
    // Dapatkan daftar tab
    const tabsData = await fetch('http://localhost:9222/json').then(r => r.json());
    const tab = tabsData[0];
    console.log('📋 Tab aktif:', tab.url);

    // Ambil websocket URL
    const wsUrl = tab.webSocketDebuggerUrl;
    console.log('🔌 WebSocket URL:', wsUrl);

    // Gunakan CDP via WebSocket
    const { WebSocket } = await import('ws').catch(() => null) || {};
    
    if (!WebSocket) {
      console.log('❌ ws module tidak tersedia, menggunakan screenshot langsung...');
      chrome.kill();
      
      // Fallback: screenshot dengan delay lebih lama
      execSync(`google-chrome \
        --headless=new \
        --no-sandbox \
        --disable-gpu \
        --virtual-time-budget=8000 \
        --screenshot="${OUTPUT_FILE}" \
        --window-size=1280,5000 \
        "javascript:void(0)" \
        2>/dev/null || true`);
      return;
    }

  } catch(e) {
    console.error('Error:', e.message);
  } finally {
    chrome.kill();
  }
}, 3000);
