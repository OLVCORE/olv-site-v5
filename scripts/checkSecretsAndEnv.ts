#!/usr/bin/env tsx
/**
 * Validador Universal de Secrets e Ambiente OLV (Operação Blindada)
 * - Valida presença e formato de variáveis essenciais
 * - Testa conexão real com Supabase e OpenAI
 * - Envia alerta via Telegram em caso de erro crítico
 * - Saída institucional e clara
 */

import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

const REQUIRED_VARS = [
  'SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'OPENAI_API_KEY',
  'STRIPE_SECRET_KEY',
  'SITE_URL',
  'NEXT_PUBLIC_SITE_URL',
  'TELEGRAM_BOT_TOKEN',
  'TELEGRAM_CHAT_ID'
];

const errors: string[] = [];
const warnings: string[] = [];
const oks: string[] = [];

function checkVar(name: string, isUrl = false) {
  const value = process.env[name];
  if (!value) {
    errors.push(`[FALTA] ${name} ausente!`);
    return;
  }
  if (isUrl && !/^https?:\/\/.+/.test(value)) {
    errors.push(`[ERRO] ${name} formato inválido: ${value}`);
    return;
  }
  oks.push(`[OK] ${name} presente${isUrl ? ' (URL válida)' : ''}.`);
}

function logAndMaybeAlert() {
  oks.forEach((msg) => console.log(msg));
  warnings.forEach((msg) => console.warn(msg));
  errors.forEach((msg) => console.error(msg));
  if (errors.length > 0) {
    sendTelegramAlert(errors.join('\n')).then(() => {
      process.exit(1);
    });
  }
}

async function testSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase.from('posts').select('*').limit(1);
    if (error) {
      errors.push(`[ERRO] Conexão Supabase: ${error.message}`);
    } else {
      oks.push('[OK] Conexão Supabase: SUCESSO.');
    }
  } catch (e: any) {
    errors.push(`[ERRO] Conexão Supabase: ${e.message}`);
  }
}

async function testOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return;
  try {
    const resp = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: 'ping' }, { role: 'user', content: 'ping' }]
      },
      { headers: { Authorization: `Bearer ${key}` }, timeout: 5000 }
    );
    if (resp.data && resp.data.choices) {
      oks.push('[OK] Conexão OpenAI: SUCESSO.');
    } else {
      errors.push('[ERRO] Conexão OpenAI: resposta inesperada.');
    }
  } catch (e: any) {
    errors.push(`[ERRO] Conexão OpenAI: ${e.response?.data?.error?.message || e.message}`);
  }
}

async function sendTelegramAlert(msg: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  try {
    await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: `[ALERTA OLV]\n${msg}`,
      parse_mode: 'Markdown'
    });
    console.log('[INFO] Alerta enviado ao Telegram.');
  } catch (e: any) {
    console.error('[ERRO] Falha ao enviar alerta Telegram:', e.message);
  }
}

async function main() {
  console.log('==== CHECKUP UNIVERSAL DE SECRETS E AMBIENTE OLV (Operação Blindada) ====');
  checkVar('SUPABASE_URL', true);
  checkVar('SUPABASE_SERVICE_ROLE_KEY');
  checkVar('NEXT_PUBLIC_SUPABASE_URL', true);
  checkVar('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  checkVar('OPENAI_API_KEY');
  checkVar('STRIPE_SECRET_KEY');
  checkVar('SITE_URL', true);
  checkVar('NEXT_PUBLIC_SITE_URL', true);
  checkVar('TELEGRAM_BOT_TOKEN');
  checkVar('TELEGRAM_CHAT_ID');
  await testSupabase();
  await testOpenAI();
  logAndMaybeAlert();
  if (errors.length === 0) {
    console.log('[SUCESSO] Ambiente validado e pronto para ingestão/deploy.');
  }
}

main();