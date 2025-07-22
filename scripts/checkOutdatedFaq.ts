import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BASE_DIR = path.join(process.cwd(), 'content');
const MAX_DAYS = parseInt(process.env.MAX_DAYS ?? '60', 10); // default 60

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((ent) => {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) return walk(full);
    if (ent.isFile() && full.endsWith('.md')) return [full];
    return [];
  });
}

function daysBetween(a: Date, b: Date) {
  return Math.round(Math.abs((b.getTime() - a.getTime()) / 86400000));
}

const warn: string[] = [];
const today = new Date();

walk(BASE_DIR).forEach((file) => {
  const raw = fs.readFileSync(file, 'utf8');
  const { data } = matter(raw);
  const updated = data.updated ? new Date(data.updated) : null;
  if (!updated || isNaN(updated.getTime()) || daysBetween(updated, today) > MAX_DAYS) {
    warn.push(`${file} – updated: ${data.updated || 'unknown'}`);
  }
});

if (warn.length) {
  console.log('🔔 Outdated FAQ/Content detected:');
  warn.forEach((w) => console.log('- ' + w));
  process.exitCode = 1;
} else {
  console.log('✅ All content fresh.');
} 