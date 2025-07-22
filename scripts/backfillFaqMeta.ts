import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { execSync } from 'child_process';

const ANSWERS_DIR = path.join(process.cwd(), 'content', 'answers');

function getLastCommitISO(filePath: string): string | null {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${filePath}"`, { encoding: 'utf8' }).trim();
    return out || null;
  } catch {
    return null;
  }
}

function deriveKeywords(title: string): string {
  // remove stop words simples e retorna 5 principais
  const stop = new Set(['de', 'da', 'do', 'e', 'em', 'na', 'no', 'para', 'dos', 'das', 'como', 'que']);
  const words = title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .split(/\s+/)
    .filter((w) => w && !stop.has(w));
  return Array.from(new Set(words)).slice(0, 8).join(', ');
}

fs.readdirSync(ANSWERS_DIR).forEach((file) => {
  if (!file.endsWith('.md')) return;
  const full = path.join(ANSWERS_DIR, file);
  const raw = fs.readFileSync(full, 'utf8');
  const parsed = matter(raw);
  let changed = false;

  if (!parsed.data.updated) {
    const iso = getLastCommitISO(full) || new Date().toISOString().split('T')[0];
    parsed.data.updated = iso;
    changed = true;
  }

  if (!parsed.data.keywords) {
    const title: string = parsed.data.title || '';
    parsed.data.keywords = deriveKeywords(title);
    changed = true;
  }

  if (changed) {
    const newRaw = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(full, newRaw, 'utf8');
    console.log('updated', file);
  }
}); 