// SISTEMA DE SEO OTIMIZADO PARA GOOGLE AI MODE
// Foco na INTENÇÃO DO USUÁRIO ao invés de palavras-chave tradicionais
// Compatível com AI Max for Search e Agentic

import { userIntentionMapping } from './seoIntentionMapping';
import { contentOptimizer } from './seoContentOptimizer';
import { transparencyCompliance } from './seoTransparencyCompliance';

export const seoKeywords = {
  // 📁 CONSULTORIA EM EXPORTAÇÃO
  consultoriaExportacao: [
    "consultoria em exportação",
    "como exportar legalmente",
    "especialistas em comex",
    "planeje sua exportação",
    "exportação para iniciantes",
    "documentação de comex",
    "treinamento em comércio",
    "passo a passo da exportação",
    "exportar alimentos do brasil",
    "exportar com lucro real",
    "exportação legalizada e fácil",
    "exportação sem erros",
    "exportação diferencial pmes",
    "marketing internacional pmes",
    "financiamento exim para exportação",
    "termos de pagamento exterior",
    "cadeia fria exportação perecíveis",
    "compliance export control usa eu"
  ],

  // 📁 CONSULTORIA EM IMPORTAÇÃO
  consultoriaImportacao: [
    "consultoria em importação",
    "abra sua importadora",
    "importação sem burocracia",
    "importar com segurança",
    "desembaraço aduaneiro rápido",
    "importar com redução fiscal",
    "consultoria para radar siscomex",
    "regularize sua empresa comex",
    "importação para revenda",
    "reduza custos de importação",
    "reduzir custos de importação",
    "suporte total no comex",
    "montamos sua operação comex",
    "suporte do radar ao embarque"
  ],

  // 📁 EXPORTAÇÃO DE PRODUTOS
  exportacaoProdutos: [
    "exportação de produtos",
    "exportação café e soja",
    "logística 3pl para exportação",
    "exportar com baixo custo"
  ],

  // 📁 LOGÍSTICA INTERNACIONAL / 3PL / 4PL
  logisticaInternacional: [
    "logística internacional",
    "3pl",
    "4pl",
    "supply chain global",
    "comércio exterior pme",
    "desembaraço aduaneiro",
    "radar siscomex",
    "planejamento tributário comex",
    "importação insumos industriais",
    "exportação produtos acabados",
    "otimização supply chain",
    "consultoria comex industrial",
    "frete internacional",
    "câmbio importação",
    "impostos importação",
    "compliance aduaneiro",
    "logística 4.0",
    "automação comex",
    "inteligência mercado industrial",
    "consultoria estratégica industrial",
    "pme industrial",
    "multinacionais experiência",
    "volkswagen ericsson lupatech",
    "expertise industrial",
    "cadeia suprimentos",
    "otimização estoques",
    "lead time importação",
    "custos portuários",
    "demurrage porto",
    "incoterms 2020",
    "ncm classificação fiscal",
    "drawback suspensão",
    "regime aduaneiro especial",
    "due diligence global",
    "trading company",
    "importação drop shipping",
    "commodities importação",
    "bens capital importação",
    "produtos acabados importação",
    "insumos matéria prima",
    "licenciamento anvisa",
    "certificado origem",
    "compliance aeo oea",
    "controle riscos aduaneiros",
    "digitalização processos comex",
    "documentos exportação",
    "financiamento exim",
    "habilitar radar siscomex",
    "cotação dólar importação",
    "custos portuários despacho",
    "demurrage porto evitar",
    "despacho aduaneiro etapas",
    "diferença incoterms 2020",
    "documentos necessários exportação",
    "drawback suspensão benefícios",
    "engage o que é",
    "escolha mercado alvo exportação",
    "escolher transportadora internacional",
    "exceltta o que é",
    "finx o que é",
    "habilitar radar siscomex requisitos",
    "importação bens capital",
    "importação commodities",
    "importação drop shipping regulamentação",
    "importação insumos matéria prima",
    "importação produtos acabados",
    "labs o que é",
    "licenciamento anvisa importação",
    "logística 4.0 benefícios supply chain",
    "negociar câmbio importação",
    "otimização estoques importação",
    "passos li anvisa",
    "planejamento tributário importação",
    "plano internacionalização pme",
    "quanto custa importar china",
    "reduzir lead time importação",
    "regimes aduaneiros especiais",
    "risco cambial hedge",
    "seguro carga internacional",
    "simulador custo importação",
    "simulador frete internacional",
    "simulador tax importação",
    "siscomex li declaração",
    "stratevo o que é",
    "supply chain resiliente",
    "trading company vs importação própria",
    "ventures o que é",
    "veritus o que é"
  ],

  // 🎯 PALAVRAS-CHAVE DE INTENÇÃO (Nova estratégia Google AI)
  intencaoUsuario: [
    "como iniciar exportação",
    "como reduzir custos importação",
    "como habilitar radar siscomex",
    "como planejar tributário comex",
    "como otimizar supply chain",
    "como escolher transportadora internacional",
    "como negociar câmbio importação",
    "como evitar demurrage porto",
    "como classificar ncm corretamente",
    "como obter licenciamento anvisa",
    "como estruturar operação comex",
    "como reduzir lead time",
    "como implementar logística 4.0",
    "como fazer due diligence global",
    "como obter certificado origem",
    "como implementar compliance aeo",
    "como controlar riscos aduaneiros",
    "como digitalizar processos comex",
    "como financiar exportação exim",
    "como calcular custos portuários",
    "como emitir du-e corretamente",
    "como escolher incoterms 2020",
    "como implementar drawback",
    "como estruturar trading company",
    "como importar drop shipping",
    "como importar commodities",
    "como importar bens capital",
    "como importar produtos acabados",
    "como importar insumos matéria prima",
    "como obter compliance oea",
    "como controlar risco cambial",
    "como contratar seguro carga",
    "como usar simulador importação",
    "como usar simulador frete",
    "como usar simulador tributário",
    "como declarar siscomex",
    "como implementar supply chain resiliente",
    "como escolher entre trading vs importação própria"
  ],

  // 🏭 PALAVRAS-CHAVE INDUSTRIAIS (Foco setorial)
  setoresIndustriais: [
    "agroindústria comex",
    "mineração importação exportação",
    "energia supply chain",
    "petróleo gás logística",
    "metalurgia comex",
    "bens capital importação",
    "máquinas equipamentos exportação",
    "manufatura logística internacional",
    "logística industrial",
    "supply chain industrial",
    "comex industrial",
    "importação insumos industriais",
    "exportação produtos industriais",
    "logística fabril",
    "cadeia suprimentos industrial",
    "otimização industrial",
    "redução custos indústria",
    "consultoria industrial",
    "setores industriais"
  ]
};

// Função para gerar lista completa de palavras-chave
export function getAllKeywords(): string {
  const allKeywords = [
    ...seoKeywords.consultoriaExportacao,
    ...seoKeywords.consultoriaImportacao,
    ...seoKeywords.exportacaoProdutos,
    ...seoKeywords.logisticaInternacional,
    ...seoKeywords.intencaoUsuario,
    ...seoKeywords.setoresIndustriais
  ];
  
  // Remove duplicatas e retorna string única
  return [...new Set(allKeywords)].join(', ');
}

// Função para gerar palavras-chave por grupo
export function getKeywordsByGroup(group: keyof typeof seoKeywords): string {
  return seoKeywords[group].join(', ');
}

// Função para gerar descrições otimizadas por intenção
export function getDescriptionByIntention(intention: string): string {
  const descriptions = {
    consultoria: "Consultoria especializada em Supply Chain Global e Comércio Exterior para PMEs. 35 anos de experiência em multinacionais (Volkswagen, Ericsson, Lupatech). Otimizamos importação de insumos, exportação de produtos acabados e redução de custos logísticos.",
    exportacao: "Especialistas em exportação legal e eficiente. Habilitação Radar SISCOMEX, documentação, compliance e otimização de processos para empresas que querem exportar com segurança e lucro real.",
    importacao: "Consultoria completa em importação para PMEs. Redução de custos, desembaraço aduaneiro rápido, planejamento tributário e suporte total desde a negociação até a entrega.",
    logistica: "Logística internacional 3PL/4PL especializada em Supply Chain Global. Otimização de rotas, redução de lead time, controle de custos portuários e implementação de logística 4.0.",
    industrial: "Supply Chain Global especializada para setores industriais: agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura."
  };
  
  return descriptions[intention as keyof typeof descriptions] || descriptions.consultoria;
}

// 🚀 NOVAS FUNÇÕES PARA GOOGLE AI MODE

// Função para detectar intenção do usuário (substitui palavras-chave tradicionais)
export function detectUserIntentionFromQuery(query: string, context: any = {}) {
  return userIntentionMapping.detectUserIntention(query, context);
}

// Função para gerar copy otimizada para Google AI
export function generateAIOptimizedCopy(intention: string, userType: string) {
  return userIntentionMapping.generateAIOptimizedCopy(intention, userType);
}

// Função para otimizar conteúdo baseado em intenção
export function optimizeContentForGoogleAI(content: string, intention: string, userType: string) {
  return contentOptimizer.optimizeContentForAI(content, intention, userType);
}

// Função para validar compliance de transparência (política outubro 2025)
export function validateGoogleAdsCompliance(content: any) {
  return transparencyCompliance.validateTransparencyCompliance(content);
}

// Função para gerar dados estruturados para IA
export function generateStructuredDataForAI(pageType: string, content: any) {
  return contentOptimizer.generateStructuredDataForAI(pageType, content);
}

// Função para gerar conteúdo transparente
export function generateTransparentContent(serviceType: string) {
  return transparencyCompliance.generateTransparentContent(serviceType);
}

// 🎯 ESTRATÉGIA DE INTENÇÃO (Nova abordagem)
export const intentionStrategy = {
  // Mapear intenções primárias para soluções
  mapIntentionToSolution: (intention: string) => {
    const intentionData = userIntentionMapping.primaryIntentions[intention as keyof typeof userIntentionMapping.primaryIntentions];
    return intentionData?.solutionMapping || 'consultoria-geral';
  },

  // Gerar jornada de intenção
  generateIntentionJourney: (intention: string) => {
    const intentionData = userIntentionMapping.primaryIntentions[intention as keyof typeof userIntentionMapping.primaryIntentions];
    return intentionData?.userJourney || [];
  },

  // Otimizar para comportamento do usuário
  optimizeForBehavior: (userType: string, intention: string) => {
    const behavioralData = userIntentionMapping.behavioralData[userType as keyof typeof userIntentionMapping.behavioralData];
    const intentionData = userIntentionMapping.primaryIntentions[intention as keyof typeof userIntentionMapping.primaryIntentions];
    
    return {
      painPoints: behavioralData?.painPoints || [],
      decisionFactors: behavioralData?.decisionFactors || [],
      contentPreferences: behavioralData?.contentPreferences || [],
      solutionMapping: intentionData?.solutionMapping || 'consultoria-geral'
    };
  }
}; 