#!/usr/bin/env tsx
/**
 * Script de Validação de Prontidão para Lançamento
 * Verifica se o site OLV Internacional está pronto para o domínio oficial
 */

import fs from 'fs';
import path from 'path';

interface ValidationResult {
  check: string;
  status: 'PASS' | 'FAIL' | 'WARN';
  message: string;
  details?: string;
}

const results: ValidationResult[] = [];

// 1. Verificar configuração de domínio
function checkDomainConfig(): ValidationResult {
  try {
    const siteConfig = fs.readFileSync('src/lib/siteConfig.ts', 'utf8');
    if (siteConfig.includes('https://olvinternacional.com.br')) {
      return {
        check: 'Configuração de Domínio',
        status: 'PASS',
        message: 'Domínio oficial configurado corretamente'
      };
    } else {
      return {
        check: 'Configuração de Domínio',
        status: 'FAIL',
        message: 'Domínio ainda aponta para api.olvinternacional.com.br',
        details: 'Atualizar SITE_URL em src/lib/siteConfig.ts'
      };
    }
  } catch (error) {
    return {
      check: 'Configuração de Domínio',
      status: 'FAIL',
      message: 'Erro ao verificar configuração de domínio',
      details: error.message
    };
  }
}

// 2. Verificar headers de segurança
function checkSecurityHeaders(): ValidationResult {
  try {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8');
    const requiredHeaders = [
      'X-Frame-Options',
      'X-Content-Type-Options',
      'Referrer-Policy',
      'Permissions-Policy'
    ];
    
    const missingHeaders = requiredHeaders.filter(header => 
      !nextConfig.includes(header)
    );
    
    if (missingHeaders.length === 0) {
      return {
        check: 'Headers de Segurança',
        status: 'PASS',
        message: 'Todos os headers de segurança configurados'
      };
    } else {
      return {
        check: 'Headers de Segurança',
        status: 'FAIL',
        message: `Headers de segurança ausentes: ${missingHeaders.join(', ')}`,
        details: 'Adicionar headers em next.config.js'
      };
    }
  } catch (error) {
    return {
      check: 'Headers de Segurança',
      status: 'FAIL',
      message: 'Erro ao verificar headers de segurança',
      details: error.message
    };
  }
}

// 3. Verificar sitemap
function checkSitemap(): ValidationResult {
  try {
    const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
    if (sitemap.includes('https://olvinternacional.com.br')) {
      return {
        check: 'Sitemap XML',
        status: 'PASS',
        message: 'Sitemap atualizado com domínio oficial'
      };
    } else {
      return {
        check: 'Sitemap XML',
        status: 'FAIL',
        message: 'Sitemap ainda contém URLs antigas',
        details: 'Atualizar URLs em public/sitemap.xml'
      };
    }
  } catch (error) {
    return {
      check: 'Sitemap XML',
      status: 'FAIL',
      message: 'Erro ao verificar sitemap',
      details: error.message
    };
  }
}

// 4. Verificar robots.txt
function checkRobotsTxt(): ValidationResult {
  try {
    const robots = fs.readFileSync('public/robots.txt', 'utf8');
    if (robots.includes('https://olvinternacional.com.br')) {
      return {
        check: 'Robots.txt',
        status: 'PASS',
        message: 'Robots.txt configurado corretamente'
      };
    } else {
      return {
        check: 'Robots.txt',
        status: 'FAIL',
        message: 'Robots.txt ainda aponta para domínio antigo',
        details: 'Atualizar URL do sitemap em public/robots.txt'
      };
    }
  } catch (error) {
    return {
      check: 'Robots.txt',
      status: 'FAIL',
      message: 'Erro ao verificar robots.txt',
      details: error.message
    };
  }
}

// 5. Verificar variáveis de ambiente
function checkEnvironmentVariables(): ValidationResult {
  const requiredVars = [
    'NEXT_PUBLIC_SITE_URL',
    'SITE_URL',
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'OPENAI_API_KEY'
  ];
  
  const missingVars = requiredVars.filter(varName => 
    !process.env[varName]
  );
  
  if (missingVars.length === 0) {
    return {
      check: 'Variáveis de Ambiente',
      status: 'PASS',
      message: 'Todas as variáveis de ambiente configuradas'
    };
  } else {
    return {
      check: 'Variáveis de Ambiente',
      status: 'WARN',
      message: `Variáveis de ambiente ausentes: ${missingVars.join(', ')}`,
      details: 'Configurar variáveis no Vercel'
    };
  }
}

// 6. Verificar Google Tag Manager
function checkGoogleTagManager(): ValidationResult {
  try {
    const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
    if (layout.includes('GTM-T3P68DR') && layout.includes('googletagmanager.com')) {
      return {
        check: 'Google Tag Manager',
        status: 'PASS',
        message: 'Google Tag Manager configurado corretamente'
      };
    } else {
      return {
        check: 'Google Tag Manager',
        status: 'FAIL',
        message: 'Google Tag Manager não configurado',
        details: 'Adicionar código GTM no layout.tsx'
      };
    }
  } catch (error) {
    return {
      check: 'Google Tag Manager',
      status: 'FAIL',
      message: 'Erro ao verificar Google Tag Manager',
      details: error.message
    };
  }
}

// 7. Verificar estrutura de arquivos críticos

// 8. Verificar performance e otimizações
function checkPerformanceOptimizations(): ValidationResult {
  try {
    const nextConfig = fs.readFileSync('next.config.js', 'utf8');
    const hasSecurityHeaders = nextConfig.includes('X-Frame-Options') && 
                              nextConfig.includes('X-Content-Type-Options');
    const hasImageOptimization = nextConfig.includes('minimumCacheTTL');
    
    if (hasSecurityHeaders && hasImageOptimization) {
      return {
        check: 'Otimizações de Performance',
        status: 'PASS',
        message: 'Headers de segurança e otimizações de imagem configurados'
      };
    } else {
      return {
        check: 'Otimizações de Performance',
        status: 'WARN',
        message: 'Algumas otimizações podem estar faltando',
        details: 'Verificar headers de segurança e cache de imagens'
      };
    }
  } catch (error) {
    return {
      check: 'Otimizações de Performance',
      status: 'FAIL',
      message: 'Erro ao verificar otimizações',
      details: error.message
    };
  }
}

// 9. Verificar variáveis de ambiente críticas
function checkCriticalEnvVars(): ValidationResult {
  const requiredVars = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'OPENAI_API_KEY'
  ];
  
  const missingVars = requiredVars.filter(varName => 
    !process.env[varName] && !process.env[`NEXT_PUBLIC_${varName}`]
  );
  
  if (missingVars.length === 0) {
    return {
      check: 'Variáveis de Ambiente',
      status: 'PASS',
      message: 'Todas as variáveis críticas configuradas'
    };
  } else {
    return {
      check: 'Variáveis de Ambiente',
      status: 'FAIL',
      message: `Variáveis críticas ausentes: ${missingVars.join(', ')}`,
      details: 'Configurar no Vercel Dashboard'
    };
  }
}

// 10. Verificar estrutura de arquivos críticos
function checkCriticalFiles(): ValidationResult {
  const criticalFiles = [
    'src/app/layout.tsx',
    'src/components/layout/MainLayout.tsx',
    'src/components/layout/Header/index.tsx',
    'src/components/layout/Footer/index.tsx',
    'public/robots.txt',
    'public/sitemap.xml',
    'next.config.js',
    'package.json'
  ];
  
  const missingFiles = criticalFiles.filter(file => 
    !fs.existsSync(file)
  );
  
  if (missingFiles.length === 0) {
    return {
      check: 'Arquivos Críticos',
      status: 'PASS',
      message: 'Todos os arquivos críticos presentes'
    };
  } else {
    return {
      check: 'Arquivos Críticos',
      status: 'FAIL',
      message: `Arquivos críticos ausentes: ${missingFiles.join(', ')}`,
      details: 'Verificar integridade do projeto'
    };
  }
}

// 11. Verificar otimizações mobile
function checkMobileOptimizations(): ValidationResult {
  try {
    const globalsCss = fs.readFileSync('src/app/globals.css', 'utf8');
    const nextConfig = fs.readFileSync('next.config.js', 'utf8');
    
    const hasMobileOptimizations = 
      globalsCss.includes('@media (max-width: 768px)') &&
      globalsCss.includes('-webkit-font-smoothing: antialiased') &&
      globalsCss.includes('content-visibility: auto') &&
      nextConfig.includes('formats: [\'image/webp\', \'image/avif\']');
    
    if (hasMobileOptimizations) {
      return {
        check: 'Otimizações Mobile',
        status: 'PASS',
        message: 'Otimizações mobile implementadas'
      };
    } else {
      return {
        check: 'Otimizações Mobile',
        status: 'WARN',
        message: 'Algumas otimizações mobile podem estar faltando',
        details: 'Verificar CSS mobile-first e otimizações de imagem'
      };
    }
  } catch (error) {
    return {
      check: 'Otimizações Mobile',
      status: 'FAIL',
      message: 'Erro ao verificar otimizações mobile',
      details: error.message
    };
  }
}

// 12. Verificar Core Web Vitals
function checkCoreWebVitals(): ValidationResult {
  // Esta verificação seria idealmente feita com Lighthouse CI
  // Por enquanto, verificamos se as otimizações estão implementadas
  try {
    const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
    const hasPreloads = layout.includes('rel="preload"');
    const hasOptimizedImages = layout.includes('next/image');
    
    if (hasPreloads && hasOptimizedImages) {
      return {
        check: 'Core Web Vitals',
        status: 'PASS',
        message: 'Otimizações para Core Web Vitals implementadas'
      };
    } else {
      return {
        check: 'Core Web Vitals',
        status: 'WARN',
        message: 'Verificar otimizações de Core Web Vitals',
        details: 'Implementar preloads e otimização de imagens'
      };
    }
  } catch (error) {
    return {
      check: 'Core Web Vitals',
      status: 'FAIL',
      message: 'Erro ao verificar Core Web Vitals',
      details: error.message
    };
  }
}

// Executar todas as verificações
function runAllChecks() {
  console.log('🔍 INICIANDO VALIDAÇÃO DE PRONTIDÃO PARA LANÇAMENTO\n');
  
  results.push(checkDomainConfig());
  results.push(checkSecurityHeaders());
  results.push(checkSitemap());
  results.push(checkRobotsTxt());
  results.push(checkEnvironmentVariables());
  results.push(checkGoogleTagManager());
  results.push(checkPerformanceOptimizations());
  results.push(checkCriticalEnvVars());
  results.push(checkCriticalFiles());
  results.push(checkMobileOptimizations());
  results.push(checkCoreWebVitals());
  
  // Exibir resultados
  console.log('📊 RESULTADOS DA VALIDAÇÃO:\n');
  
  let passCount = 0;
  let failCount = 0;
  let warnCount = 0;
  
  results.forEach(result => {
    const icon = result.status === 'PASS' ? '✅' : result.status === 'FAIL' ? '❌' : '⚠️';
    console.log(`${icon} ${result.check}: ${result.message}`);
    if (result.details) {
      console.log(`   📝 ${result.details}`);
    }
    console.log('');
    
    if (result.status === 'PASS') passCount++;
    else if (result.status === 'FAIL') failCount++;
    else warnCount++;
  });
  
  // Resumo final
  console.log('📈 RESUMO FINAL:');
  console.log(`✅ Passou: ${passCount}`);
  console.log(`❌ Falhou: ${failCount}`);
  console.log(`⚠️ Avisos: ${warnCount}`);
  console.log('');
  
  if (failCount === 0 && warnCount === 0) {
    console.log('🎉 SITE PRONTO PARA LANÇAMENTO!');
    console.log('🚀 Todas as verificações críticas passaram.');
    console.log('📋 Próximos passos:');
    console.log('   1. Configurar domínio no Vercel');
    console.log('   2. Configurar Google Search Console');
    console.log('   3. Implementar Google Analytics');
    console.log('   4. Fazer deploy em produção');
  } else if (failCount > 0) {
    console.log('🚨 CORREÇÕES NECESSÁRIAS ANTES DO LANÇAMENTO');
    console.log('❌ Existem falhas críticas que devem ser corrigidas.');
    process.exit(1);
  } else {
    console.log('⚠️ AVISOS DETECTADOS');
    console.log('⚠️ Verificar variáveis de ambiente antes do lançamento.');
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  runAllChecks();
}

export { runAllChecks };
export type { ValidationResult }; 