#!/usr/bin/env tsx
/**
 * Script de Teste - Configuração de Email
 * 
 * Este script testa se as variáveis de ambiente de email estão
 * configuradas corretamente e se o envio está funcionando.
 * 
 * USO:
 *   npx tsx scripts/testEmail.ts
 * 
 * OU adicione em package.json:
 *   "test:email": "tsx scripts/testEmail.ts"
 *   
 * E execute:
 *   npm run test:email
 */

import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config({ path: '.env.local' });

// Cores para console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message: string, color: keyof typeof colors = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message: string) {
  console.log('\n' + '='.repeat(60));
  log(message, 'cyan');
  console.log('='.repeat(60) + '\n');
}

async function testEmailConfiguration() {
  logHeader('TESTE DE CONFIGURAÇÃO DE EMAIL');

  // 1. Verificar variáveis de ambiente
  log('1. Verificando variáveis de ambiente...', 'blue');
  
  const requiredVars = {
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  };

  let allVarsSet = true;
  
  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value) {
      log(`  ✗ ${key}: NÃO CONFIGURADA`, 'red');
      allVarsSet = false;
    } else {
      const displayValue = key === 'EMAIL_PASS' 
        ? '*'.repeat(value.length) 
        : value;
      log(`  ✓ ${key}: ${displayValue}`, 'green');
    }
  }

  if (!allVarsSet) {
    log('\n❌ ERRO: Variáveis de ambiente faltando!', 'red');
    log('\nSolução:', 'yellow');
    log('1. Crie o arquivo .env.local na raiz do projeto', 'yellow');
    log('2. Adicione as variáveis necessárias (veja .env.example)', 'yellow');
    log('3. Execute este script novamente\n', 'yellow');
    process.exit(1);
  }

  log('\n✅ Todas as variáveis estão configuradas!\n', 'green');

  // 2. Criar transporter
  log('2. Criando transporter do Nodemailer...', 'blue');
  
  let transporter;
  try {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    log('  ✓ Transporter criado com sucesso', 'green');
  } catch (error) {
    log(`  ✗ Erro ao criar transporter: ${error}`, 'red');
    process.exit(1);
  }

  // 3. Verificar conexão SMTP
  log('\n3. Testando conexão SMTP...', 'blue');
  
  try {
    await transporter.verify();
    log('  ✓ Conexão SMTP verificada com sucesso!', 'green');
    log(`  ✓ Servidor: ${process.env.EMAIL_HOST}:${process.env.EMAIL_PORT}`, 'green');
  } catch (error: any) {
    log('  ✗ Falha na verificação SMTP', 'red');
    log(`  Erro: ${error.message}`, 'red');
    
    log('\nPossíveis causas:', 'yellow');
    log('• Senha incorreta', 'yellow');
    log('• Porta bloqueada por firewall', 'yellow');
    log('• Servidor SMTP indisponível', 'yellow');
    log('• Credenciais inválidas\n', 'yellow');
    
    process.exit(1);
  }

  // 4. Enviar email de teste
  log('\n4. Enviando email de teste...', 'blue');
  
  const timestamp = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const testHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #0a58ca 0%, #003366 100%); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
        .success { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 15px 0; }
        .footer { background: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #666; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🧪 Email de Teste - OLV Internacional</h2>
        </div>
        
        <div class="content">
          <div class="success">
            <strong>✅ SUCESSO!</strong><br>
            A configuração de email está funcionando perfeitamente.
          </div>
          
          <p><strong>Informações do Teste:</strong></p>
          <ul>
            <li><strong>Data/Hora:</strong> ${timestamp}</li>
            <li><strong>Servidor SMTP:</strong> ${process.env.EMAIL_HOST}</li>
            <li><strong>Porta:</strong> ${process.env.EMAIL_PORT}</li>
            <li><strong>Usuário:</strong> ${process.env.EMAIL_USER}</li>
          </ul>

          <p>Este é um email de teste gerado automaticamente pelo script <code>scripts/testEmail.ts</code>.</p>
          
          <p><strong>Próximos passos:</strong></p>
          <ol>
            <li>Verifique se este email chegou corretamente</li>
            <li>Teste o formulário de contato em: <a href="http://localhost:3999/contato">http://localhost:3999/contato</a></li>
            <li>Configure as mesmas variáveis no Vercel para produção</li>
          </ol>
        </div>
        
        <div class="footer">
          <p>OLV Internacional - Supply Chain Global</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `OLV Internacional <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: '🧪 Teste de Configuração de Email - OLV Internacional',
      html: testHtml,
    });
    
    log('  ✓ Email de teste enviado com sucesso!', 'green');
    log(`  ✓ Destinatário: ${process.env.EMAIL_USER}`, 'green');
    
  } catch (error: any) {
    log('  ✗ Falha ao enviar email de teste', 'red');
    log(`  Erro: ${error.message}`, 'red');
    process.exit(1);
  }

  // Resumo final
  logHeader('RESULTADO DO TESTE');
  
  log('✅ TUDO FUNCIONANDO PERFEITAMENTE!', 'green');
  log('\nO que foi testado:', 'cyan');
  log('  ✓ Variáveis de ambiente configuradas', 'green');
  log('  ✓ Transporter do Nodemailer criado', 'green');
  log('  ✓ Conexão SMTP verificada', 'green');
  log('  ✓ Email de teste enviado', 'green');
  
  log('\nPróximos passos:', 'yellow');
  log('1. Verifique sua caixa de entrada:', 'yellow');
  log(`   ${process.env.EMAIL_USER}`, 'yellow');
  log('2. Confirme o recebimento do email de teste', 'yellow');
  log('3. Teste o formulário em: http://localhost:3999/contato', 'yellow');
  log('4. Configure as mesmas variáveis no Vercel (Settings > Environment Variables)', 'yellow');
  
  log('\n✨ Configuração validada com sucesso!\n', 'green');
}

// Executar teste
testEmailConfiguration()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    log('\n❌ Erro inesperado:', 'red');
    console.error(error);
    process.exit(1);
  });

