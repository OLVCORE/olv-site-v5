// Run: node scripts/fix-icon-color.js
// Replaces hard-coded #0066CC (blue) by #D4AF37 (gold) in all SVG icons under public/icons.

const fs = require('fs');
const path = require('path');

const ICON_DIR = path.join(process.cwd(), 'public', 'icons');
const BLUE = /#0066CC/gi;
const GOLD = '#D4AF37';

function walk(dir) {
  return fs.readdirSync(dir).flatMap((item) => {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) return walk(full);
    return full;
  });
}

const files = walk(ICON_DIR).filter((p) => p.endsWith('.svg'));
let changed = 0;
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  if (BLUE.test(text)) {
    const out = text.replace(BLUE, GOLD);
    fs.writeFileSync(file, out, 'utf8');
    changed++;
    console.log(`Updated ${path.relative(process.cwd(), file)}`);
  }
}

console.log(`Done. ${changed} SVGs updated.`); 