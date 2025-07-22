const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { execSync } = require('child_process');

const ANSWERS_DIR = path.join(process.cwd(), 'content', 'answers');

function lastCommitISO(file) {
  try {
    return execSync(`git log -1 --format=%cI -- "${file}"`, { encoding: 'utf8' }).trim();
  } catch {
    return null;
  }
}

function keywordsFromTitle(title) {
  const stop = new Set(['de', 'da', 'do', 'e', 'em', 'na', 'no', 'para', 'dos', 'das', 'como', 'que']);
  return Array.from(new Set(
    title.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').split(/\s+/).filter(w => w && !stop.has(w))
  )).slice(0, 8).join(', ');
}

fs.readdirSync(ANSWERS_DIR).forEach(file => {
  if (!file.endsWith('.md')) return;
  const full = path.join(ANSWERS_DIR, file);
  const parsed = matter.read(full);
  let changed = false;

  if (!parsed.data.updated) {
    parsed.data.updated = (lastCommitISO(full) || new Date().toISOString()).split('T')[0];
    changed = true;
  }
  if (!parsed.data.keywords) {
    parsed.data.keywords = keywordsFromTitle(parsed.data.title || '');
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(full, matter.stringify(parsed.content, parsed.data), 'utf8');
    console.log('updated', file);
  }
}); 