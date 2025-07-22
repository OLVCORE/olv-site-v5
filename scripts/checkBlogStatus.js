const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Variáveis de ambiente do Supabase não encontradas');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function checkBlogStatus() {
  console.log('=== VERIFICAÇÃO DO STATUS DO BLOG ===');
  
  try {
    // 1. Verificar posts no banco
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('❌ Erro ao buscar posts:', error);
      return;
    }

    console.log(`\n�� POSTS ENCONTRADOS: ${posts?.length || 0}`);
    
    if (posts && posts.length > 0) {
      posts.forEach((post, index) => {
        console.log(`\n${index + 1}. ${post.title}`);
        console.log(`   Categoria: ${post.category}`);
        console.log(`   Slug: ${post.slug}`);
        console.log(`   Cover URL: ${post.cover_url || 'NÃO DEFINIDA'}`);
        console.log(`   Publicado: ${post.published_at}`);
        console.log(`   Status: ${post.status}`);
      });
    } else {
      console.log('❌ NENHUM POST ENCONTRADO NO BANCO');
    }

    // 2. Verificar logs de ingestão
    const { data: logs, error: logsError } = await supabase
      .from('ingest_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5);

    if (logsError) {
      console.error('❌ Erro ao buscar logs:', logsError);
    } else {
      console.log(`\n�� ÚLTIMOS LOGS DE INGESTÃO: ${logs?.length || 0}`);
      if (logs && logs.length > 0) {
        logs.forEach((log, index) => {
          console.log(`\n${index + 1}. [${log.status}] ${log.source}`);
          console.log(`   Título: ${log.rss_title || 'N/A'}`);
          console.log(`   Status: ${log.parsing_status}`);
          console.log(`   Tempo: ${log.exec_time_ms}ms`);
          console.log(`   Data: ${log.created_at}`);
        });
      }
    }

    // 3. Verificar se as imagens padrão existem
    console.log('\n🖼️ VERIFICANDO IMAGENS PADRÃO:');
    const defaultImages = [
      '/images/blog/default-news.svg',
      '/images/blog/default-internacional.png',
      '/images/blog/default-bi.png',
      '/images/blog/default-importacao.png',
      '/images/blog/default-exportacao.png',
      '/images/blog/default-compliance.png',
      '/images/blog/default-logistica.png',
      '/images/blog/default-financas.png',
      '/images/blog/default-supplychain.png',
      '/images/blog/default-gestao.png',
      '/images/blog/default-pmes.png',
      '/images/blog/default-outros.png'
    ];

    defaultImages.forEach(img => {
      const exists = fs.existsSync(`public${img}`);
      console.log(`   ${img}: ${exists ? '✅ EXISTE' : '❌ NÃO EXISTE'}`);
    });

  } catch (error) {
    console.error('❌ Erro geral:', error);
  }
}

checkBlogStatus().then(() => {
  console.log('\n=== VERIFICAÇÃO CONCLUÍDA ===');
  process.exit(0);
}).catch(error => {
  console.error('❌ Erro na execução:', error);
  process.exit(1);
});
