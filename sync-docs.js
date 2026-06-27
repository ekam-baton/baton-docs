import chokidar from 'chokidar';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HARDCODED PATHS - Prevents Path Traversal
const BACKEND_DIR = path.resolve(__dirname, '..', 'baton-backend', 'mcp-connector', 'src');
const BACKEND_FILE = path.join(BACKEND_DIR, 'main.rs');

const ANDROID_ASSETS_DIR = path.resolve(__dirname, '..', 'baton', 'app', 'src', 'main', 'assets');
const TERMS_FILE = path.join(ANDROID_ASSETS_DIR, 'terms_of_service.txt');
const PRIVACY_FILE = path.join(ANDROID_ASSETS_DIR, 'privacy_policy.txt');

const OUTPUT_ADAPTERS = path.join(__dirname, 'src', 'data', 'adapters.json');
const OUTPUT_TERMS_JSX = path.join(__dirname, 'src', 'pages', 'Terms.jsx');
const OUTPUT_PRIVACY_JSX = path.join(__dirname, 'src', 'pages', 'Privacy.jsx');

console.log(`[BATON Security Sync] Starting daemon with Path Locked execution.`);

let isPrompting = false;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function sanitizeForReact(text) {
  // STRICT SANITIZATION to prevent XSS attacks
  const sanitized = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const lines = sanitized.split('\n');
  let html = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push('<div style={{height: "1.5rem"}}></div>');
      continue;
    }

    // Detect Numbered Headers e.g., "1. SCOPE OF SERVICE"
    if (/^\d+\.\s+[A-Z]/.test(line)) {
      if (inList) { html.push('</ul>'); inList = false; }
      html.push(`<h2 className="legal-header">${line}</h2>`);
      continue;
    }

    // Detect Bullet Points e.g., "- Responsibility: ..."
    if (line.startsWith('- ')) {
      if (!inList) { html.push('<ul className="legal-list">'); inList = true; }
      html.push(`<li className="legal-list-item">${line.substring(2)}</li>`);
      continue;
    }

    // Normal Text
    if (inList) { html.push('</ul>'); inList = false; }
    
    // Check if it's the main title
    if (line === "BATON TERMS OF SERVICE" || line === "BATON PRIVACY POLICY") {
       continue; // Handled by the page h1
    }

    html.push(`<p className="legal-text">${line}</p>`);
  }

  if (inList) html.push('</ul>');

  return html.join('\n');
}

function generateLegalPage(title, textFile, outputFile) {
  if (!fs.existsSync(textFile)) return;
  const rawText = fs.readFileSync(textFile, 'utf-8');
  const safeHtml = sanitizeForReact(rawText);
  
  const jsxCode = `import React from 'react';

export default function ${title}() {
  return (
    <div className="page-header" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>${title}</h1>
      <div className="card" style={{ padding: '2rem', lineHeight: '1.8' }}>
        ${safeHtml}
      </div>
    </div>
  );
}`;
  fs.writeFileSync(outputFile, jsxCode);
}

function updateDocs() {
  try {
    // 1. Update Adapters
    if (fs.existsSync(BACKEND_FILE)) {
      const code = fs.readFileSync(BACKEND_FILE, 'utf-8');
      const regex = /struct\s+([A-Za-z0-9_]+Adapter)/g;
      let match;
      const adapters = [];
      while ((match = regex.exec(code)) !== null) {
        adapters.push(match[1]);
      }
      
      const dir = path.dirname(OUTPUT_ADAPTERS);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(OUTPUT_ADAPTERS, JSON.stringify({ lastUpdated: new Date().toISOString(), adapters }, null, 2));
      console.log(`[BATON Sync] Synced ${adapters.length} adapters.`);
    }

    // 2. Update Legal Pages securely
    generateLegalPage('Terms', TERMS_FILE, OUTPUT_TERMS_JSX);
    generateLegalPage('Privacy', PRIVACY_FILE, OUTPUT_PRIVACY_JSX);
    console.log(`[BATON Sync] Synced Legal documents successfully.`);

  } catch (err) {
    console.error(`[BATON Sync] Error parsing files:`, err.message);
  }
}

// Initial Sync
updateDocs();

// Watch both Backend and Android Assets
const watcher = chokidar.watch([BACKEND_DIR, ANDROID_ASSETS_DIR], { persistent: true });

watcher.on('change', (changedPath) => {
  if (isPrompting) return;
  isPrompting = true;
  
  rl.question(`\n[BATON Security Sync] Detected changes in source files.\nDo you want to securely regenerate the website? (y/N) `, (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      console.log('[BATON Sync] Permission granted. Updating securely...');
      updateDocs();
    } else {
      console.log('[BATON Sync] Update cancelled.');
    }
    isPrompting = false;
  });
});
