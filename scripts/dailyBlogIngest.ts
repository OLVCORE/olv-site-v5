// Operação Blindada: trigger institucional para disparo do workflow de ingestão automatizada
import axios from 'axios';
// @ts-nocheck

import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import slugify from 'slugify';
import { XMLParser } from 'fast-xml-parser';
import * as cheerio from 'cheerio';

/**
 * ENV required:
 *  SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, OPENAI_API_KEY, UNSPLASH_ACCESS_KEY
 */
const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY) as string;
const openaiKey = process.env.OPENAI_API_KEY as string;

if (!supabaseUrl || !supabaseKey || !openaiKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const openai = new OpenAI({ apiKey: openaiKey });

interface Source {
  url: string;
  category: string;
}

// Função para extrair imagem do item RSS
function extractImageFromRssItem(item: any): string | null {
  if (item['media:content']?.url) return item['media:content'].url;
  if (item.enclosure?.url) return item.enclosure.url;
  if (item.image?.url) return item.image.url;
  if (item.description) {
    const match = item.description.match(/<img[^>]+src="([^">]+)"/i);
    if (match) return match[1];
    const ogMatch = item.description.match(/property="og:image" content="([^">]+)"/i);
    if (ogMatch) return ogMatch[1];
  }
  return null;
}

// Função para buscar imagem segura no Unsplash por categoria
async function fetchUnsplashImageByCategory(category: string): Promise<string | null> {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) return null;
    // Termos seguros e futuristas por categoria
    const safeTerms: Record<string, string> = {
      'Estratégia Internacional': 'global strategy, world map, business, modern, abstract, future',
      'Business Intelligence': 'data analytics, dashboard, technology, modern, abstract, future',
      'Importação': 'container ship, cargo, logistics, modern, abstract, future',
      'Exportação': 'export, shipping, logistics, modern, abstract, future',
      'Compliance': 'compliance, law, contract, modern, abstract, future',
      'Logística': 'logistics, warehouse, transport, modern, abstract, future',
      'Finanças': 'finance, fintech, money, modern, abstract, future',
      'Supply Chain': 'supply chain, network, logistics, modern, abstract, future',
      'Gestão': 'management, leadership, business, modern, abstract, future',
      'Internacional': 'international, globe, world, modern, abstract, future',
      'PMEs': 'small business, entrepreneur, modern, abstract, future',
      'Outros': 'business, technology, modern, abstract, future',
    };
    const query = safeTerms[category] || safeTerms['Outros'];
    const url = `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&client_id=${accessKey}`;
    const res = await axios.get(url);
    // Filtro extra: não aceitar imagens com pessoas, marcas, ou conteúdo sensível
    const img = res.data?.urls?.regular || null;
    const desc = (res.data?.description || '').toLowerCase();
    const altDesc = (res.data?.alt_description || '').toLowerCase();
    if (
      img &&
      !desc.includes('person') &&
      !desc.includes('people') &&
      !desc.includes('face') &&
      !desc.includes('brand') &&
      !desc.includes('logo') &&
      !altDesc.includes('person') &&
      !altDesc.includes('people') &&
      !altDesc.includes('face') &&
      !altDesc.includes('brand') &&
      !altDesc.includes('logo')
    ) {
      return img;
    }
    return null;
  } catch (e) {
    console.error('Erro ao buscar imagem no Unsplash:', e.message);
    return null;
  }
}

// Função para buscar imagem principal da página da fonte
async function fetchMainImageFromSourcePage(url: string): Promise<string | null> {
  try {
    const { data: html } = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(html);
    // 1. Tenta pegar og:image
    const ogImage = $('meta[property="og:image"]').attr('content');
    if (ogImage && ogImage.startsWith('http')) return ogImage;
    // 2. Tenta pegar primeira imagem relevante
    const mainImg = $('img').first().attr('src');
    if (mainImg && mainImg.startsWith('http')) return mainImg;
    return null;
  } catch (e) {
    console.error('Erro ao buscar imagem da página da fonte:', url, e.message);
    return null;
  }
}

// Fontes RSS expandidas para 42 feeds conforme recomendação
const SOURCES: Source[] = [
  // Comércio Exterior e Logística Internacional
  { url: 'https://www.comexstat.mdic.gov.br/feed/', category: 'Comércio Exterior' },
  { url: 'https://www.gov.br/receitafederal/pt-br/assuntos/noticias/feed', category: 'Comércio Exterior' },
  { url: 'https://www.gov.br/mdic/pt-br/assuntos/noticias/feed', category: 'Comércio Exterior' },
  { url: 'https://www.gov.br/antaq/pt-br/assuntos/noticias/feed', category: 'Logística' },
  { url: 'https://www.gov.br/anvisa/pt-br/assuntos/noticias/feed', category: 'Compliance' },
  { url: 'https://portosenavios.com.br/feed/', category: 'Logística' },
  { url: 'https://www.porttechnology.org/feed/', category: 'Logística' },
  { url: 'https://www.worldmaritimenews.com/feed/', category: 'Logística' },
  { url: 'https://www.tradewindsnews.com/rss', category: 'Logística' },
  { url: 'https://www.hellenicshippingnews.com/feed/', category: 'Logística' },
  { url: 'https://www.joc.com/rss', category: 'Logística' },
  { url: 'https://www.seatrade-maritime.com/rss', category: 'Logística' },

  // Finanças, Câmbio e Economia Internacional
  { url: 'https://www.bcb.gov.br/novosnoticias/rss/noticias.xml', category: 'Finanças' },
  { url: 'https://valor.globo.com/rss/feed/feed.xml', category: 'Finanças' },
  { url: 'https://www.bloomberg.com/feed/podcast/etf-report.xml', category: 'Finanças' },
  { url: 'https://www.investing.com/rss/news_301.rss', category: 'Finanças' },
  { url: 'https://economia.estadao.com.br/rss.xml', category: 'Finanças' },
  { url: 'https://www.reuters.com/rssCommoditiesNews', category: 'Finanças' },

  // Exportação Agrícola, Indústria e Setores Específicos
  { url: 'https://www.agrolink.com.br/rss/exportacao.xml', category: 'Exportação' },
  { url: 'https://g1.globo.com/rss/g1/economia/agronegocio/', category: 'Exportação' },
  { url: 'https://www.abag.com.br/rss/noticias.xml', category: 'Exportação' },
  { url: 'https://www.abimaq.org.br/rss/noticias.xml', category: 'Exportação' },
  { url: 'https://www.cnabrasil.org.br/rss/agroexportacao.xml', category: 'Exportação' },

  // Inovação, Tecnologia e Supply Chain
  { url: 'https://scm.mit.edu/feed/', category: 'Supply Chain' },
  { url: 'https://www.supplychaindive.com/rss/', category: 'Supply Chain' },
  { url: 'https://www.logisticsmgmt.com/rss/', category: 'Supply Chain' },
  { url: 'https://www.freightwaves.com/rss', category: 'Supply Chain' },
  { url: 'https://www.inboundlogistics.com/rss/', category: 'Supply Chain' },
  { url: 'https://theloadstar.com/feed/', category: 'Supply Chain' },
  { url: 'https://www.ttnews.com/rss', category: 'Supply Chain' },
  { url: 'https://www.smartindustry.com/rss/', category: 'Supply Chain' },

  // Compliance, Exportação Legal e Operações Internacionais
  { url: 'https://www.tradecompliance.com/rss', category: 'Compliance' },
  { url: 'https://www.wto.org/english/news_e/rss_e/rss_e.xml', category: 'Compliance' },
  { url: 'https://www.export.gov/rss', category: 'Compliance' },
  { url: 'https://www.customstoday.com/rss', category: 'Compliance' },
  { url: 'https://www.trade.gov/rss.xml', category: 'Compliance' },
  { url: 'https://www.globalcompliancepanel.com/rss', category: 'Compliance' },

  // Agências e Órgãos Oficiais Internacionais
  { url: 'https://www.oecd.org/trade/rss.xml', category: 'Internacional' },
  { url: 'https://unctad.org/rss.xml', category: 'Internacional' },
  { url: 'https://iccwbo.org/rss/', category: 'Internacional' },
  { url: 'https://data.worldbank.org/rss', category: 'Internacional' },
  { url: 'https://www.imf.org/rss', category: 'Internacional' }
];

const xmlParser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });

async function fetchRssFeed(url: string) {
  const res = await fetch(url);
  const text = await res.text();
  const parsed = xmlParser.parse(text);
  const items = parsed.rss?.channel?.item ?? [];
  return items.map((it: any) => ({
    title: it.title,
    link: it.link,
    pubDate: it.pubDate,
    description: it.description ?? '',
    // Adicione outros campos se necessário
  }));
}

const CATEGORIES = [
  'Estratégia Internacional',
  'Business Intelligence',
  'Importação',
  'Exportação',
  'Compliance',
  'Logística',
  'Finanças',
  'Supply Chain',
  'Gestão',
  'Internacional',
  'PMEs',
  'Outros'
];

// Função para obter imagem padrão OLV por categoria
function getDefaultImageForCategory(category: string) {
  const map: Record<string, string> = {
    'Estratégia Internacional': '/images/blog/default-internacional.png',
    'Business Intelligence': '/images/blog/default-bi.png',
    'Importação': '/images/blog/default-importacao.png',
    'Exportação': '/images/blog/default-exportacao.png',
    'Compliance': '/images/blog/default-compliance.png',
    'Logística': '/images/blog/default-logistica.png',
    'Finanças': '/images/blog/default-financas.png',
    'Supply Chain': '/images/blog/default-supplychain.png',
    'Gestão': '/images/blog/default-gestao.png',
    'Internacional': '/images/blog/default-internacional.png',
    'PMEs': '/images/blog/default-pmes.png',
    'Outros': '/images/blog/default-outros.png',
  };
  return map[category] || '/images/blog/default-news.svg';
}

// NOVA FUNÇÃO BLINDADA
// Função de retry para lidar com rate limiting
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 2000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.message?.includes('429') && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1); // Backoff exponencial
        console.log(`Rate limit atingido, tentativa ${attempt}/${maxRetries}. Aguardando ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Máximo de tentativas excedido');
}

async function generatePostContent(
  title: string,
  sourceText: string,
  link: string,
  pubDate: string,
  cover: string | null
) {
  const prompt = {
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
Você é um editor-chefe de um blog institucional premium focado em comércio exterior, negócios internacionais e PMEs brasileiras. Sua missão é transformar notícias de fontes oficiais em cards editoriais de alta qualidade para o Blog OLV Internacional.

Regras obrigatórias:
- Reescreva o TÍTULO em português (PT-BR), de forma editorial, clara, atrativa e profissional. Não traduza literalmente: adapte para o público brasileiro, com foco em PMEs e contexto nacional.
- Gere um RESUMO (lead) de até 500 caracteres, em até duas frases, objetivo, técnico e que estimule o clique.
- Traduza/adapte e reescreva o CONTEÚDO COMPLETO da matéria, em português, de forma clara, consultiva, sofisticada e fiel ao original, sem copiar trechos literais. Estruture o texto em até 10 parágrafos coesos, mantendo tabelas, listas e destaques, se houver. Se a matéria for menor, traga tudo; se for maior, faça um resumo editorial mantendo o sentido e a qualidade. Nunca inclua prefixos YAML, JSON ou metadados, apenas o texto limpo e bem formatado.
- Classifique a matéria em uma das categorias: Estratégia Internacional, Business Intelligence, Importação, Exportação, Compliance, Logística, Finanças, Supply Chain, Gestão, Internacional, PMEs, Outros.
- Se houver imagem destacada (Open Graph ou similar), use-a; caso contrário, indique "imagem padrão OLV + categoria".
- Informe a DATA da matéria original (ou de ingestão, se indisponível).
- Inclua o NOME da FONTE (ex: Reuters, ComexStat) e o LINK da FONTE ORIGINAL.
- O conteúdo deve ser claro, sem clickbait, sem erros gramaticais, e com tom consultivo premium, elegante e objetivo.

Formato de resposta obrigatório (JSON):
{
  "titulo": "...",
  "resumo": "...",
  "conteudo": "...",
  "categoria": "...",
  "imagem": "...",
  "data": "...",
  "fonte_nome": "...",
  "fonte_url": "..."
}
        `.trim()
      },
      {
        role: 'user',
        content: `
Título original: ${title}
Conteúdo original: ${sourceText}
Link: ${link}
Data: ${pubDate}
Imagem: ${cover || 'não informada'}
        `.trim()
      }
    ],
    temperature: 0.4,
  };
  const completion = await retryWithBackoff(() => openai.chat.completions.create(prompt as any));
  const response = completion.choices[0].message?.content ?? '';
  try {
    const json = JSON.parse(response);
    // Se a imagem não for uma URL, substitui pela imagem padrão OLV da categoria
    if (!json.imagem || !json.imagem.startsWith('http')) {
      json.imagem = getDefaultImageForCategory(json.categoria);
    }
    return json;
  } catch (e) {
    console.error('Erro ao fazer parse do JSON do OpenAI:', response);
    return null;
  }
}

// AJUSTE BLINDADO: log detalhado do resultado do upsert
async function upsertPost({ title, excerpt, content, category, cover, source_name, source_url }: { title: string; excerpt: string; content: string; category: string; cover: string | null; source_name: string | null; source_url: string | null }) {
  const slug = slugify(title, { lower: true, strict: true });
  // Salvar apenas o texto limpo no content_mdx, sem YAML/JSON
  const { data, error } = await supabase.from('posts').upsert(
    {
      slug,
      title,
      excerpt,
      content_mdx: content,
      category,
      cover_url: cover || getDefaultImageForCategory(category),
      source_name,
      source_url,
      status: 'published',
    },
    { onConflict: 'slug' },
  );
  // LOG DETALHADO
  console.log('Supabase upsert data:', data);
  console.log('Supabase upsert error:', error);
}

async function logIngest({ source, rss_title, parsing_status, parsing_error, exec_time_ms, status, message, stderr }: any) {
  await supabase.from('ingest_logs').insert([
    {
      created_at: new Date().toISOString(),
      source,
      rss_title,
      parsing_status,
      parsing_error,
      exec_time_ms,
      status,
      message,
      stderr: stderr || null,
    },
  ]);
}

async function run() {
  console.log('==== INÍCIO DA INGESTÃO BLINDADA ====');
  for (const src of SOURCES) {
    console.log('Fetching:', src.url);
    try {
      const t0 = Date.now();
      const items = await fetchRssFeed(src.url);
      console.log(`[${src.url}] Itens encontrados:`, items.length);
      const latest = items.slice(0, 2); // max 2 per category per run
      for (const item of latest) {
        // DELAY OTIMIZADO - 1 segundo entre requests (aumentado para evitar rate limiting)
        await new Promise(resolve => setTimeout(resolve, 1000));
        const start = Date.now();
        let parsing_status = 'ok';
        let parsing_error = null;
        let mdx = null;
        try {
          // 1. Tenta extrair imagem real do feed
          let cover = extractImageFromRssItem(item);
          // 2. Se não houver, busca imagem principal da página da fonte
          if (!cover && item.link) {
            cover = await fetchMainImageFromSourcePage(item.link);
          }
          // 3. Se ainda não houver, busca no Unsplash pela categoria (futurista, moderna, elegante)
          if (!cover) {
            cover = await fetchUnsplashImageByCategory(src.category || item.category || 'Outros');
          }
          // 4. Se ainda não houver, usa imagem padrão OLV
          if (!cover) {
            cover = getDefaultImageForCategory(src.category || item.title);
          }

          // 5. Passa a melhor imagem para o OpenAI (que pode usar ou não)
          mdx = await generatePostContent(
            item.title,
            item.description ?? item.title,
            item.link,
            item.pubDate,
            cover
          );
          console.log(`[${src.url}] OpenAI resposta recebida para:`, item.title, 'Tamanho:', mdx ? JSON.stringify(mdx).length : 0);
        } catch (err: any) {
          parsing_status = 'error';
          parsing_error = err.message;
          console.error(`[${src.url}] Erro OpenAI:`, err.message);
        }
        const exec_time_ms = Date.now() - start;
        try {
          if (parsing_status === 'ok' && mdx) {
            await upsertPost({
              title: mdx.titulo,
              excerpt: mdx.resumo,
              content: mdx.conteudo, // conteúdo completo traduzido/adaptado
              category: mdx.categoria,
              cover: mdx.imagem,
              source_name: mdx.fonte_nome || null,
              source_url: mdx.fonte_url || null,
            });
            console.log(`[${src.url}] Inserido no Supabase:`, mdx.titulo);
          }
          await logIngest({
            source: src.url,
            rss_title: item.title,
            parsing_status,
            parsing_error,
            exec_time_ms,
            status: parsing_status === 'ok' ? 'sucesso' : 'erro',
            message: parsing_status === 'ok' ? 'Artigo processado' : 'Erro ao processar artigo',
            stderr: null,
          });
        } catch (err: any) {
          console.error(`[${src.url}] Erro ao inserir no Supabase:`, err.message);
          await logIngest({
            source: src.url,
            rss_title: item.title,
            parsing_status,
            parsing_error: parsing_error || err.message,
            exec_time_ms,
            status: 'erro',
            message: 'Erro ao inserir artigo',
            stderr: err.message,
          });
        }
      }
      const exec_time_ms = Date.now() - t0;
      await logIngest({
        source: src.url,
        rss_title: null,
        parsing_status: 'batch',
        parsing_error: null,
        exec_time_ms,
        status: 'batch',
        message: 'Batch processado',
        stderr: null,
      });
      
      // DELAY OTIMIZADO - 2 segundos entre feeds (aumentado para evitar rate limiting)
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (err: any) {
      console.error(`[${src.url}] Erro geral:`, err.message);
      await logIngest({
        source: src.url,
        rss_title: null,
        parsing_status: 'fatal',
        parsing_error: err.message,
        exec_time_ms: 0,
        status: 'erro',
        message: 'Erro geral no batch',
        stderr: err.message,
      });
    }
  }
}

if (require.main === module) {
  run().then(() => {
    console.log('Ingestão finalizada.');
    process.exit(0);
  });
}