#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// URLs críticas para auditoria
const urls = [
  '/',
  '/sobre', 
  '/solucoes',
  '/radar360',
  '/blog',
  '/faq',
  '/contato',
  '/simuladores/importacao'
];

const base = 'https://olvinternacional.com.br';
const results = {};
const detailedResults = {};

console.log('🚀 Iniciando auditoria Lighthouse multi-página...');
console.log(`📊 Testando ${urls.length} URLs críticas`);
console.log('=' .repeat(60));

// Criar diretório de relatórios se não existir
const reportsDir = path.join(process.cwd(), 'reports', 'audit');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

urls.forEach((path, index) => {
  const url = base + path;
  console.log(`\n🔍 [${index + 1}/${urls.length}] Testando: ${url}`);
  
  try {
    // Executar Lighthouse CLI
    const command = `npx lighthouse "${url}" --only-categories=performance,accessibility,best-practices,seo --quiet --output=json --chrome-flags="--headless"`;
    const out = execSync(command).toString();
    const data = JSON.parse(out);
    
    // Extrair métricas principais
    const categories = data.categories;
    const audits = data.audits;
    
    const pageResult = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories['best-practices'].score * 100),
      seo: Math.round(categories.seo.score * 100),
      // Métricas detalhadas de performance
      fcp: audits['first-contentful-paint']?.displayValue || 'N/A',
      lcp: audits['largest-contentful-paint']?.displayValue || 'N/A',
      tbt: audits['total-blocking-time']?.displayValue || 'N/A',
      cls: audits['cumulative-layout-shift']?.displayValue || 'N/A',
      si: audits['speed-index']?.displayValue || 'N/A'
    };
    
    results[path] = pageResult;
    detailedResults[path] = {
      ...pageResult,
      timestamp: new Date().toISOString(),
      url: url,
      audits: audits
    };
    
    console.log(`   ✅ Performance: ${pageResult.performance}/100`);
    console.log(`   ✅ Accessibility: ${pageResult.accessibility}/100`);
    console.log(`   ✅ Best Practices: ${pageResult.bestPractices}/100`);
    console.log(`   ✅ SEO: ${pageResult.seo}/100`);
    console.log(`   📊 FCP: ${pageResult.fcp}, LCP: ${pageResult.lcp}, TBT: ${pageResult.tbt}`);
    
  } catch (error) {
    console.error(`   ❌ Erro ao testar ${url}: ${error.message}`);
    results[path] = {
      performance: 'Error',
      accessibility: 'Error', 
      bestPractices: 'Error',
      seo: 'Error',
      error: error.message
    };
  }
});

// Salvar relatório consolidado
const summaryPath = path.join(reportsDir, 'multi-page.json');
fs.writeFileSync(summaryPath, JSON.stringify(results, null, 2));

// Salvar relatório detalhado
const detailedPath = path.join(reportsDir, 'multi-page-detailed.json');
fs.writeFileSync(detailedPath, JSON.stringify(detailedResults, null, 2));

// Análise e ranking
console.log('\n' + '=' .repeat(60));
console.log('📊 RELATÓRIO CONSOLIDADO - AUDITORIA MULTI-PÁGINA');
console.log('=' .repeat(60));

// Ordenar por performance
const sortedByPerformance = Object.entries(results)
  .filter(([_, data]) => typeof data.performance === 'number')
  .sort(([_, a], [__, b]) => b.performance - a.performance);

console.log('\n🏆 RANKING POR PERFORMANCE:');
console.log('-' .repeat(40));
sortedByPerformance.forEach(([path, data], index) => {
  const status = data.performance >= 90 ? '🟢' : data.performance >= 70 ? '🟡' : '🔴';
  console.log(`${index + 1}. ${status} ${data.performance}/100 - ${path}`);
  console.log(`   📊 A: ${data.accessibility}, BP: ${data.bestPractices}, SEO: ${data.seo}`);
});

// Identificar páginas com problemas
const problemPages = Object.entries(results)
  .filter(([_, data]) => typeof data.performance === 'number' && data.performance < 80);

console.log('\n🚨 PÁGINAS COM PERFORMANCE < 80:');
console.log('-' .repeat(40));
if (problemPages.length === 0) {
  console.log('✅ Nenhuma página com problemas críticos!');
} else {
  problemPages.forEach(([path, data]) => {
    console.log(`🔴 ${data.performance}/100 - ${path}`);
    console.log(`   📊 FCP: ${data.fcp}, LCP: ${data.lcp}, TBT: ${data.tbt}`);
  });
}

// Estatísticas gerais
const validResults = Object.values(results).filter(data => typeof data.performance === 'number');
const avgPerformance = validResults.length > 0 
  ? Math.round(validResults.reduce((sum, data) => sum + data.performance, 0) / validResults.length)
  : 0;

console.log('\n📈 ESTATÍSTICAS GERAIS:');
console.log('-' .repeat(40));
console.log(`📊 Total de páginas testadas: ${urls.length}`);
console.log(`✅ Testes bem-sucedidos: ${validResults.length}/${urls.length}`);
console.log(`📊 Performance média: ${avgPerformance}/100`);
console.log(`🔴 Páginas com problemas: ${problemPages.length}`);

console.log('\n📁 RELATÓRIOS GERADOS:');
console.log(`📄 ${summaryPath}`);
console.log(`📄 ${detailedPath}`);

console.log('\n✅ Auditoria multi-página concluída com sucesso!');
