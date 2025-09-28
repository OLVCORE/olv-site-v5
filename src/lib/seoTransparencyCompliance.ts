// Sistema de Transparência de Preços - Compliance Google Ads 2025
// Implementação da nova política de deturpação de preços

export const transparencyCompliance = {
  // 📋 POLÍTICAS DE TRANSPARÊNCIA OBRIGATÓRIAS
  pricingTransparency: {
    // Modelos de pagamento claros
    paymentModels: {
      "consultoria-horaria": {
        model: "Por hora de consultoria",
        basePrice: "R$ 300/hora",
        totalCost: "Custo total = horas × R$ 300",
        additionalFees: "Sem taxas adicionais",
        disclosure: "Preço final calculado após análise inicial gratuita"
      },
      
      "projeto-completo": {
        model: "Projeto completo",
        basePrice: "A partir de R$ 5.000",
        totalCost: "Valor fixo para escopo definido",
        additionalFees: "Possíveis custos extras: documentação, deslocamento",
        disclosure: "Orçamento detalhado fornecido após briefing gratuito"
      },
      
      "suporte-mensal": {
        model: "Suporte mensal",
        basePrice: "R$ 2.500/mês",
        totalCost: "Valor mensal fixo",
        additionalFees: "Sem taxas ocultas",
        disclosure: "Cancelamento com 30 dias de antecedência"
      }
    },

    // Informações obrigatórias de transparência
    mandatoryDisclosures: {
      "teste-gratuito": {
        duration: "30 dias",
        autoRenewal: "Não renovação automática",
        cancellation: "Cancelamento sem custos",
        disclosure: "Teste gratuito por 30 dias, sem renovação automática. Cancele a qualquer momento sem custos."
      },
      
      "analise-gratuita": {
        scope: "Análise inicial completa",
        duration: "Até 2 horas",
        obligation: "Sem obrigação de contratação",
        disclosure: "Análise gratuita de até 2 horas, sem obrigação de contratação posterior."
      },
      
      "consultoria-inicial": {
        scope: "Primeira consultoria",
        duration: "1 hora",
        cost: "Gratuita",
        disclosure: "Primeira consultoria de 1 hora totalmente gratuita para avaliação de necessidades."
      }
    }
  },

  // 🚫 PRÁTICAS PROIBIDAS (evitar suspensão)
  prohibitedPractices: {
    "bait-and-switch": {
      description: "Anunciar preço baixo para atrair e depois oferecer produto/serviço diferente",
      ourCompliance: "Sempre anunciamos preços reais e serviços exatos",
      monitoring: "Auditoria mensal de anúncios e landing pages"
    },
    
    "price-exploitation": {
      description: "Aproveitar vulnerabilidade para cobrar preços abusivos",
      ourCompliance: "Preços justos baseados em valor real entregue",
      monitoring: "Comparação trimestral com mercado"
    },
    
    "hidden-fees": {
      description: "Ocultar taxas ou custos adicionais",
      ourCompliance: "Todos os custos são declarados antecipadamente",
      monitoring: "Checklist de transparência em cada proposta"
    },
    
    "false-free-trials": {
      description: "Promover teste gratuito sem clareza sobre cobrança",
      ourCompliance: "Testes gratuitos claramente definidos e sem cobrança automática",
      monitoring: "Revisão semanal de comunicações sobre testes"
    }
  },

  // 📊 SISTEMA DE MONITORAMENTO E COMPLIANCE
  complianceMonitoring: {
    // Checklist de transparência
    transparencyChecklist: {
      "preco-visivel": "Preço principal claramente visível",
      "custos-totais": "Custo total declarado",
      "taxas-adicionais": "Taxas adicionais listadas",
      "condicoes-cancelamento": "Condições de cancelamento claras",
      "renovacao-automatica": "Renovação automática claramente indicada",
      "teste-gratuito": "Condições de teste gratuito explícitas"
    },

    // Alertas de compliance
    complianceAlerts: {
      "preco-muito-baixo": "Alerta: Preço muito abaixo do mercado pode ser considerado 'bait'",
      "falta-transparencia": "Alerta: Informações de preço incompletas",
      "termos-confusos": "Alerta: Termos de cancelamento ou renovação confusos"
    },

    // Auditoria automática
    autoAudit: {
      frequency: "Semanal",
      scope: "Todos os anúncios e landing pages",
      actions: ["Verificar preços", "Validar transparência", "Testar clareza"]
    }
  },

  // 🎯 IMPLEMENTAÇÃO PRÁTICA
  implementation: {
    // Textos de transparência para usar
    transparencyTexts: {
      "header": "Transparência Total de Preços",
      "subheader": "Sem surpresas, sem taxas ocultas, sem pegadinhas",
      "pricing": "Preços claros e justos desde o primeiro contato",
      "guarantee": "Garantia de transparência ou devolução integral"
    },

    // Elementos visuais obrigatórios
    visualElements: {
      "price-badge": "Badge 'Preço Final' em destaque",
      "transparency-seal": "Selo '100% Transparente'",
      "no-hidden-fees": "Ícone 'Sem Taxas Ocultas'",
      "money-back": "Garantia de devolução visível"
    },

    // Estrutura de página obrigatória
    pageStructure: {
      "hero": "Preço principal em destaque",
      "details": "Detalhamento completo de custos",
      "guarantee": "Garantias e políticas claras",
      "contact": "Formas de contato para esclarecimentos"
    }
  }
};

// Função para validar compliance de transparência
export function validateTransparencyCompliance(content: any) {
  const checklist = transparencyCompliance.complianceMonitoring.transparencyChecklist;
  const violations = [];
  
  // Verificar cada item do checklist
  for (const [item, description] of Object.entries(checklist)) {
    if (!content.includes(description)) {
      violations.push({
        item,
        description,
        severity: "high",
        action: "Adicionar informação obrigatória"
      });
    }
  }
  
  return {
    compliant: violations.length === 0,
    violations,
    score: ((Object.keys(checklist).length - violations.length) / Object.keys(checklist).length) * 100
  };
}

// Função para gerar conteúdo transparente
export function generateTransparentContent(serviceType: string) {
  const paymentModel = transparencyCompliance.pricingTransparency.paymentModels[serviceType as keyof typeof transparencyCompliance.pricingTransparency.paymentModels];
  const disclosures = transparencyCompliance.pricingTransparency.mandatoryDisclosures;
  
  if (!paymentModel) return null;
  
  return {
    pricing: {
      model: paymentModel.model,
      basePrice: paymentModel.basePrice,
      totalCost: paymentModel.totalCost,
      additionalFees: paymentModel.additionalFees,
      disclosure: paymentModel.disclosure
    },
    transparency: {
      header: transparencyCompliance.implementation.transparencyTexts.header,
      subheader: transparencyCompliance.implementation.transparencyTexts.subheader,
      guarantee: transparencyCompliance.implementation.transparencyTexts.guarantee
    },
    compliance: {
      checklist: transparencyCompliance.complianceMonitoring.transparencyChecklist,
      alerts: transparencyCompliance.complianceMonitoring.complianceAlerts
    }
  };
}
