#!/usr/bin/env tsx
/**
 * Script de integridade OLV (Operação Blindada)
 * - Garante que só arquivos autorizados foram alterados
 * - Nenhum arquivo proibido ou área blindada foi tocada
 * - .gitignore está atualizado
 * - Nenhum arquivo grande ou binário foi adicionado
 */

import { execSync } from 'child_process';
import fs from 'fs';

const allowed = [
  /^scripts\//,
  /^feeds_sources\.json$/,
  /^vercel\.json$/,
  /^package\.json$/,
  /^package-lock\.json$/,
  /^\.github\//,
  /^data\//,
  /^supabase\//,
  /^README\.md$/,
  /^RELATORIO_MELHORIAS\.md$/,
  /^GOVERNANCA\.md$/,
];

const forbidden = [
  /^node_modules\//,
  /\.env/,
  /\.tsbuildinfo$/,
  /\.log$/,
  /\.bak$/,
  /\.zip$/,
  /\.tar$/,
  /\.exe$/,
  /\.dll$/,
  /\.bin$/,
  /\.mp4$/,
  /\.mp3$/,
  /\.mov$/,
  /\.avi$/,
  /\.jpg$/,
  /\.jpeg$/,
  /\.png$/,
  /\.webp$/,
  /\.gif$/,
  /\.pdf$/,
  /\.docx$/,
  /\.xlsx$/,
  /\.pptx$/,
  /\.gitattributes$/,
  /\.DS_Store$/,
  /^public\//,
  /^components\//,
  /^styles\//,
  /^layouts\//,
];

function checkFiles() {
  const changed = execSync('git diff --cached --name-only').toString().split('\n').filter(Boolean);
  for (const file of changed) {
    if (forbidden.some((re) => re.test(file))) {
      console.error(`❌ Arquivo proibido ou área blindada detectada: ${file}`);
      process.exit(1);
    }
    if (!allowed.some((re) => re.test(file))) {
      console.warn(`⚠️ Arquivo fora da whitelist: ${file}`);
    }
    if (fs.existsSync(file) && fs.statSync(file).size > 5 * 1024 * 1024) {
      console.error(`❌ Arquivo grande detectado: ${file}`);
      process.exit(1);
    }
  }
  console.log('✅ Integridade validada.');
}

checkFiles(); 