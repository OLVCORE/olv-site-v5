// Otimizador de Conteúdo para Google AI Mode
// Foco na intenção do usuário e contexto comportamental

export const contentOptimizer = {
  // 🎯 ESTRATÉGIAS DE CONTEÚDO POR INTENÇÃO
  intentionBasedContent: {
    "resolver-problema-comex": {
      titleTemplate: "Como Resolver [PROBLEMA] em Comércio Exterior - Solução Definitiva",
      metaDescriptionTemplate: "Resolva [PROBLEMA] de comércio exterior em 24h. 35 anos de experiência, casos reais, solução garantida. Fale com especialista.",
      contentStructure: {
        problem: "Identifique o problema específico",
        solution: "Apresente a solução clara",
        proof: "Mostre casos de sucesso",
        action: "Direcione para contato"
      },
      keywords: ["resolver", "problema", "comércio exterior", "solução", "especialista"]
    },
    
    "otimizar-custos-importacao": {
      titleTemplate: "Reduza [X]% dos Custos de Importação - Metodologia Comprovada",
      metaDescriptionTemplate: "Economize até 30% nos custos de importação. Análise gratuita, metodologia própria, ROI comprovado. Simule sua economia.",
      contentStructure: {
        currentState: "Mostre o cenário atual",
        optimization: "Apresente as oportunidades",
        results: "Demonstre resultados reais",
        cta: "Convide para simulação"
      },
      keywords: ["reduzir custos", "otimizar", "economia", "importação", "ROI"]
    },
    
    "iniciar-exportacao": {
      titleTemplate: "Como Começar a Exportar - Guia Completo para PMEs",
      metaDescriptionTemplate: "Transforme sua empresa em exportadora em 60 dias. Metodologia própria, suporte completo, primeira exportação garantida.",
      contentStructure: {
        preparation: "Prepare sua empresa",
        documentation: "Documentação necessária",
        execution: "Execute a exportação",
        support: "Suporte contínuo"
      },
      keywords: ["como exportar", "primeira exportação", "PME", "guia completo", "metodologia"]
    }
  },

  // 🧠 OTIMIZAÇÃO PARA GOOGLE AI
  aiOptimization: {
    // Estrutura de dados para IA entender o contexto
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "OLV Internacional",
      "description": "Consultoria especializada em Supply Chain Global e Comércio Exterior",
      "serviceType": "Consultoria Empresarial",
      "areaServed": "Brasil",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Serviços de Comércio Exterior",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Consultoria em Importação",
              "description": "Otimização de custos e processos de importação"
            }
          },
          {
            "@type": "Offer", 
            "itemOffered": {
              "@type": "Service",
              "name": "Consultoria em Exportação",
              "description": "Habilitação e execução de exportações"
            }
          }
        ]
      }
    },

    // Palavras-chave contextuais (não mais exatas)
    contextualKeywords: {
      "importacao": ["importar", "importação", "importador", "importadora", "importações"],
      "exportacao": ["exportar", "exportação", "exportador", "exportadora", "exportações"],
      "logistica": ["logística", "logístico", "logísticos", "supply chain", "cadeia suprimentos"],
      "consultoria": ["consultor", "consultores", "consultoria", "assessoria", "assessores"]
    },

    // Intenções semânticas para IA
    semanticIntentions: {
      "busca-solucao": {
        patterns: ["como resolver", "solução para", "ajuda com", "problema em"],
        contentFocus: "soluções práticas e imediatas"
      },
      "pesquisa-informacao": {
        patterns: ["o que é", "como funciona", "entender", "aprender sobre"],
        contentFocus: "conteúdo educativo e explicativo"
      },
      "comparacao-opcoes": {
        patterns: ["melhor", "comparar", "diferença entre", "qual escolher"],
        contentFocus: "comparativos e análises detalhadas"
      },
      "decisao-compra": {
        patterns: ["contratar", "preço", "custo", "investimento", "retorno"],
        contentFocus: "propostas comerciais e ROI"
      }
    }
  },

  // 📊 MÉTRICAS DE PERFORMANCE PARA IA
  performanceMetrics: {
    // Sinais de qualidade que a IA do Google valoriza
    qualitySignals: {
      "engagement": {
        metrics: ["tempo na página", "taxa de rejeição", "páginas por sessão"],
        target: "tempo > 2min, rejeição < 40%, páginas > 2"
      },
      "relevance": {
        metrics: ["CTR orgânico", "posição média", "impressões"],
        target: "CTR > 3%, posição < 5, impressões crescentes"
      },
      "conversion": {
        metrics: ["taxa de conversão", "leads gerados", "contatos"],
        target: "conversão > 2%, leads crescentes"
      }
    },

    // Dados comportamentais para otimização contínua
    behavioralData: {
      "userJourney": {
        "awareness": "conteúdo educativo",
        "consideration": "casos de sucesso",
        "decision": "propostas comerciais",
        "retention": "conteúdo avançado"
      },
      "contentPerformance": {
        "highPerforming": "conteúdo com alta intenção",
        "lowPerforming": "conteúdo genérico",
        "optimization": "ajuste baseado em dados"
      }
    }
  }
};

// Função para otimizar conteúdo baseado em intenção
export function optimizeContentForAI(content: string, intention: string, userType: string) {
  const intentionData = contentOptimizer.intentionBasedContent[intention as keyof typeof contentOptimizer.intentionBasedContent];
  
  if (!intentionData) return content;
  
  // Aplicar otimizações baseadas na intenção
  let optimizedContent = content;
  
  // 1. Otimizar título para intenção
  if (intentionData.titleTemplate) {
    optimizedContent = optimizedContent.replace(
      /<title>.*?<\/title>/g,
      `<title>${intentionData.titleTemplate}</title>`
    );
  }
  
  // 2. Otimizar meta description
  if (intentionData.metaDescriptionTemplate) {
    optimizedContent = optimizedContent.replace(
      /<meta name="description" content=".*?"/g,
      `<meta name="description" content="${intentionData.metaDescriptionTemplate}"`
    );
  }
  
  // 3. Adicionar palavras-chave contextuais
  const contextualKeywords = contentOptimizer.aiOptimization.contextualKeywords;
  for (const [key, variations] of Object.entries(contextualKeywords)) {
    if (content.includes(key)) {
      // Adicionar variações naturalmente no conteúdo
      variations.forEach(variation => {
        if (!content.includes(variation)) {
          optimizedContent = optimizedContent.replace(
            new RegExp(`\\b${key}\\b`, 'gi'),
            `${key} (${variation})`
          );
        }
      });
    }
  }
  
  return optimizedContent;
}

// Função para gerar dados estruturados para IA
export function generateStructuredDataForAI(pageType: string, content: any) {
  const baseStructuredData = contentOptimizer.aiOptimization.structuredData;
  
  // Personalizar dados estruturados baseado no tipo de página
  const pageSpecificData = {
    ...baseStructuredData,
    "@id": `https://olvinternacional.com.br/${pageType}`,
    "url": `https://olvinternacional.com.br/${pageType}`,
    "name": content.title || baseStructuredData.name,
    "description": content.description || baseStructuredData.description
  };
  
  return pageSpecificData;
}
