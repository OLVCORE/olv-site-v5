export const CATEGORIES = [
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
  'Outros',
] as const;

export type BlogCategory = (typeof CATEGORIES)[number];

export interface RssSource {
  url: string;
  category?: BlogCategory; // optional, AI can override
}

export const SOURCES: RssSource[] = [
  // Brasil
  { url: 'https://agenciabrasil.ebc.com.br/rss/comex', category: 'Internacional' },
  { url: 'https://www.gov.br/receitafederal/pt-br/assuntos/noticias/rss', category: 'Compliance' },
  { url: 'https://www.portosenavios.com.br/rss', category: 'Logística' },
  { url: 'https://valor.globo.com/financas/rss.xml', category: 'Finanças' },
  // Global
  { url: 'https://www.porttechnology.org/feed/', category: 'Logística' },
  { url: 'https://www.joc.com/rss', category: 'Logística' },
  { url: 'https://www.trade.gov/rss.xml', category: 'Exportação' },
  { url: 'https://www.reuters.com/rssCommoditiesNews', category: 'Finanças' },
]; 