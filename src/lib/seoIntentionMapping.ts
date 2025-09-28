// Mapeamento de Intenção do Usuário para Google AI Mode
// Baseado na nova estratégia: "intenção do consumidor" como principal motor

export const userIntentionMapping = {
  // 🎯 INTENÇÕES PRIMÁRIAS (O que o usuário quer resolver)
  primaryIntentions: {
    // Consultoria e Serviços
    "resolver-problema-comex": {
      intention: "Preciso resolver problemas específicos de comércio exterior",
      userJourney: ["identificar-problema", "buscar-solucao", "avaliar-opcoes", "contratar-servico"],
      contentTriggers: ["como resolver", "problema com", "erro em", "não consigo"],
      solutionMapping: "consultoria-especializada"
    },
    
    "otimizar-custos-importacao": {
      intention: "Quero reduzir custos de importação e ser mais eficiente",
      userJourney: ["analisar-custos-atual", "identificar-otimizacoes", "implementar-solucoes", "monitorar-resultados"],
      contentTriggers: ["reduzir custos", "otimizar", "economizar", "mais barato"],
      solutionMapping: "otimizacao-supply-chain"
    },
    
    "iniciar-exportacao": {
      intention: "Quero começar a exportar meus produtos",
      userJourney: ["avaliar-viabilidade", "preparar-documentacao", "encontrar-mercados", "executar-primeira-exportacao"],
      contentTriggers: ["como exportar", "primeira exportação", "começar a exportar", "iniciar comex"],
      solutionMapping: "consultoria-exportacao"
    },
    
    "habilitar-radar-siscomex": {
      intention: "Preciso habilitar minha empresa no Radar SISCOMEX",
      userJourney: ["entender-requisitos", "preparar-documentos", "solicitar-habilitacao", "manter-compliancy"],
      contentTriggers: ["habilitar radar", "siscomex", "radar siscomex", "habilitacao"],
      solutionMapping: "servico-radar-siscomex"
    }
  },

  // 🧠 INTENÇÕES SECUNDÁRIAS (Contexto e comportamento)
  secondaryIntentions: {
    "urgencia-alta": {
      intention: "Preciso de solução imediata",
      behaviorPatterns: ["busca-rapida", "contato-direto", "preco-nao-e-barreira"],
      contentStrategy: "destaque-urgencia-e-disponibilidade"
    },
    
    "pesquisa-inicial": {
      intention: "Estou pesquisando opções e comparando",
      behaviorPatterns: ["consome-conteudo", "compara-opcoes", "busca-informacoes"],
      contentStrategy: "conteudo-educativo-e-comparativo"
    },
    
    "decisao-empresarial": {
      intention: "Decisão estratégica da empresa",
      behaviorPatterns: ["analise-detalhada", "busca-referencias", "avalia-roi"],
      contentStrategy: "casos-de-sucesso-e-metricas"
    }
  },

  // 🎨 ESTRATÉGIAS DE COPY POR INTENÇÃO
  copyStrategies: {
    "resolver-problema-comex": {
      headline: "Resolvemos seu problema de comércio exterior em 24h",
      subheadline: "35 anos de experiência resolvendo os desafios mais complexos de importação e exportação",
      cta: "Fale com especialista agora",
      trustSignals: ["Volkswagen", "Ericsson", "Lupatech", "35 anos"]
    },
    
    "otimizar-custos-importacao": {
      headline: "Reduza até 30% dos custos de importação",
      subheadline: "Análise completa da sua operação com foco em economia e eficiência",
      cta: "Simule sua economia",
      trustSignals: ["Economia comprovada", "ROI em 90 dias", "Análise gratuita"]
    },
    
    "iniciar-exportacao": {
      headline: "Transforme sua empresa em exportadora",
      subheadline: "Do zero à primeira exportação em 60 dias com nossa metodologia comprovada",
      cta: "Comece sua exportação",
      trustSignals: ["Metodologia própria", "60 dias", "Suporte completo"]
    }
  },

  // 📊 DADOS COMPORTAMENTAIS PARA IA
  behavioralData: {
    "pme-industrial": {
      painPoints: ["custos-altos", "burocracia", "falta-conhecimento", "risco-cambial"],
      decisionFactors: ["preco", "confianca", "experiencia", "suporte"],
      contentPreferences: ["casos-praticos", "numeros-concretos", "depoimentos", "metodologias"]
    },
    
    "multinacional": {
      painPoints: ["compliance", "escalabilidade", "padronizacao", "risco-regulatorio"],
      decisionFactors: ["conformidade", "escalabilidade", "tecnologia", "relacionamento"],
      contentPreferences: ["white-papers", "estudos-caso", "certificacoes", "tecnologia"]
    }
  }
};

// Função para detectar intenção baseada em comportamento
export function detectUserIntention(searchQuery: string, _userContext: Record<string, unknown>) {
  const query = searchQuery.toLowerCase();
  
  // Mapear query para intenção primária
  for (const [intentionKey, intentionData] of Object.entries(userIntentionMapping.primaryIntentions)) {
    if (intentionData.contentTriggers.some(trigger => query.includes(trigger))) {
      return {
        primaryIntention: intentionKey,
        intentionData,
        copyStrategy: userIntentionMapping.copyStrategies[intentionKey as keyof typeof userIntentionMapping.copyStrategies]
      };
    }
  }
  
  return null;
}

// Função para gerar copy otimizada para Google AI
export function generateAIOptimizedCopy(intention: string, userType: string) {
  const intentionData = userIntentionMapping.primaryIntentions[intention as keyof typeof userIntentionMapping.primaryIntentions];
  const behavioralData = userIntentionMapping.behavioralData[userType as keyof typeof userIntentionMapping.behavioralData];
  
  if (!intentionData || !behavioralData) return null;
  
  return {
    headline: intentionData.intention,
    subheadline: `Solução especializada para ${userType} com ${behavioralData.decisionFactors.join(', ')}`,
    content: `Entendemos sua necessidade de ${intentionData.intention}. Nossa experiência de 35 anos em ${intentionData.solutionMapping} garante resultados comprovados.`,
    cta: `Resolva seu ${intention.replace('-', ' ')} agora`
  };
}
