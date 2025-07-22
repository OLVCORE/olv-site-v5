#!/usr/bin/env tsx
import fs from 'fs';

const REQUIRED_NODE = '20.';
const REQUIRED_DEPS = [
  'axios',
  '@supabase/supabase-js',
  'openai',
  'slugify',
  'fast-xml-parser',
  'cheerio',
  'tsx',
  'ts-node'
];
const REQUIRED_SCRIPTS = [
  'scripts/dailyBlogIngest.ts',
  'scripts/checkBlogStatus.js',
  'scripts/backfillFaqMeta.ts',
];
const REQUIRED_WORKFLOWS = [
  '.github/workflows/deploy-and-ingest.yml',
  '.github/workflows/lighthouse-ci.yml',
];

function checkNodeVersion() {
  const version = process.version;
  if (!version.startsWith('v' + REQUIRED_NODE)) {
    console.log(`\n[ALERTA] Node.js recomendado: v${REQUIRED_NODE}x. Versão atual: ${version}`);
  } else {
    console.log(`[OK] Node.js versão ${version}`);
  }
}

function checkDeps() {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
  let ok = true;
  for (const dep of REQUIRED_DEPS) {
    if (!allDeps[dep]) {
      console.log(`[FALTA] Dependência ausente: ${dep}`);
      ok = false;
    } else {
      console.log(`[OK] Dependência: ${dep}@${allDeps[dep]}`);
    }
  }
  return ok;
}

function checkScripts() {
  let ok = true;
  for (const script of REQUIRED_SCRIPTS) {
    if (!fs.existsSync(script)) {
      console.log(`[FALTA] Script ausente: ${script}`);
      ok = false;
    } else {
      console.log(`[OK] Script: ${script}`);
    }
  }
  return ok;
}

function checkWorkflows() {
  let ok = true;
  for (const wf of REQUIRED_WORKFLOWS) {
    if (!fs.existsSync(wf)) {
      console.log(`[FALTA] Workflow ausente: ${wf}`);
      ok = false;
      continue;
    }
    const content = fs.readFileSync(wf, 'utf-8');
    if (!content.includes("node-version: '20.x'")) {
      console.log(`[ALERTA] Workflow ${wf} não está usando Node.js 20.x`);
      ok = false;
    } else {
      console.log(`[OK] Workflow: ${wf} (Node.js 20.x)`);
    }
  }
  return ok;
}

function main() {
  console.log('==== CHECKUP UNIVERSAL OLV (Node, dependências, scripts, workflows) ====');
  checkNodeVersion();
  checkDeps();
  checkScripts();
  checkWorkflows();
  console.log('\n[INFO] Se houver alertas ou faltas acima, siga as instruções para corrigir antes de upgrades ou ingestões.');
  console.log('[INFO] Nenhum arquivo blindado foi modificado. Apenas análise e relatório.');
}

main(); 