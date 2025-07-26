// Motor de Cálculo de Exportação - Conforme Legislação Brasileira
// Implementação completa seguindo especificações técnicas fornecidas

export interface ExportCostInput {
  // Dados do produto
  ncm?: string;
  valor_fob_usd: number;
  
  // Custos de exportação
  frete_internacional_usd: number;
  seguro_usd: number;
  frete_interno_usd: number;
  taxas_portuarias_usd: number;
  outras_despesas_usd: number;
  
  // Incentivos fiscais (percentuais sobre FOB)
  reintegra_percent: number;
  drawback_percent: number;
  
  // Configurações de rentabilidade
  markup_desejado: number;
  margem_lucro: number;
  
  // Taxa de câmbio
  exchangeRate: number;
}

export interface ExportCostOutput {
  // Seção 1: Valor FOB
  secao1: {
    valor_mercadoria: {
      usd: number;
      brl: number;
      label: string;
    };
  };
  
  // Seção 2: Custos de Exportação
  secao2: {
    frete_internacional: {
      usd: number;
      brl: number;
      label: string;
    };
    seguro: {
      usd: number;
      brl: number;
      label: string;
    };
    frete_interno: {
      usd: number;
      brl: number;
      label: string;
    };
    taxas_portuarias: {
      usd: number;
      brl: number;
      label: string;
    };
    outras_despesas: {
      usd: number;
      brl: number;
      label: string;
    };
    total_custos: {
      usd: number;
      brl: number;
      label: string;
    };
  };
  
  // Seção 3: Benefícios Fiscais
  secao3: {
    credito_reintegra: {
      usd: number;
      brl: number;
      percentual: number;
      label: string;
    };
    credito_drawback: {
      usd: number;
      brl: number;
      percentual: number;
      label: string;
    };
    total_beneficios: {
      usd: number;
      brl: number;
      label: string;
    };
  };
  
  // Seção 4: Resultado Final
  secao4: {
    valor_fob: {
      usd: number;
      brl: number;
      label: string;
    };
    custos_totais: {
      usd: number;
      brl: number;
      label: string;
      sinal: string;
    };
    beneficios_fiscais: {
      usd: number;
      brl: number;
      label: string;
      sinal: string;
    };
    receita_liquida: {
      usd: number;
      brl: number;
      label: string;
    };
  };
  
  // Seção 5: Análise de Rentabilidade
  secao5: {
    lucro_real: {
      usd: number;
      brl: number;
      label: string;
      sinal: string;
    };
    markup_real: {
      valor: number;
      label: string;
      comparacao_desejado: number;
      status: string;
    };
    margem_real: {
      valor: number;
      label: string;
      comparacao_desejado: number;
      status: string;
    };
    status_exportacao: string;
  };
  
  // Seção 6: Preços Sugeridos
  secao6: {
    preco_atual: {
      usd: number;
      brl: number;
      label: string;
    };
    preco_markup_desejado: {
      usd: number;
      brl: number;
      label: string;
      diferenca_usd: number;
      diferenca_percent: number;
    };
    preco_margem_desejada: {
      usd: number;
      brl: number;
      label: string;
      diferenca_usd: number;
      diferenca_percent: number;
    };
  };
  
  // Métricas de análise
  custo_real_usd: number;
  custo_real_brl: number;
  lucro_real_usd: number;
  lucro_real_brl: number;
  markup_real: number;
  margem_real: number;
  
  // Status e alertas
  status: 'valido' | 'aviso' | 'erro';
  alertas: Alert[];
}

export interface Alert {
  tipo: 'erro' | 'aviso' | 'info';
  mensagem: string;
  campo?: string;
  icone: string;
}

export interface ValidationResult {
  valido: boolean;
  alertas: Alert[];
}

// Funções auxiliares
const toDecimal = (percentual: number): number => percentual / 100;

const converterParaBRL = (valorUSD: number, taxa: number): number => {
  return valorUSD * taxa;
};

const formatarNumero = (valor: number, casasDecimais: number = 2): number => {
  return Math.round(valor * Math.pow(10, casasDecimais)) / Math.pow(10, casasDecimais);
};

// Função de validação obrigatória
export function validarInputsExportacao(dados: ExportCostInput): ValidationResult {
  const alertas: Alert[] = [];
  
  // Validação de valores negativos
  const valoresParaValidar = [
    { valor: dados.valor_fob_usd, nome: 'Valor FOB', campo: 'valor_fob_usd' },
    { valor: dados.frete_internacional_usd, nome: 'Frete Internacional', campo: 'frete_internacional_usd' },
    { valor: dados.seguro_usd, nome: 'Seguro', campo: 'seguro_usd' },
    { valor: dados.frete_interno_usd, nome: 'Frete Interno', campo: 'frete_interno_usd' },
    { valor: dados.taxas_portuarias_usd, nome: 'Taxas Portuárias', campo: 'taxas_portuarias_usd' },
    { valor: dados.outras_despesas_usd, nome: 'Outras Despesas', campo: 'outras_despesas_usd' }
  ];
  
  valoresParaValidar.forEach(({ valor, nome, campo }) => {
    if (valor < 0) {
      alertas.push({
        tipo: 'erro',
        mensagem: `${nome} não pode ser negativo`,
        campo,
        icone: '❌'
      });
    }
  });
  
  // Validação de incentivos inválidos
  if (dados.reintegra_percent < 0 || dados.reintegra_percent > 3) {
    alertas.push({
      tipo: 'erro',
      mensagem: 'Reintegra deve estar entre 0% e 3%',
      campo: 'reintegra_percent',
      icone: '❌'
    });
  }
  
  if (dados.drawback_percent < 0 || dados.drawback_percent > 100) {
    alertas.push({
      tipo: 'erro',
      mensagem: 'Drawback deve estar entre 0% e 100%',
      campo: 'drawback_percent',
      icone: '❌'
    });
  }
  
  // Validação de rentabilidade inválida
  if (dados.markup_desejado < 0 || dados.markup_desejado > 1000) {
    alertas.push({
      tipo: 'erro',
      mensagem: 'Markup desejado deve estar entre 0% e 1000%',
      campo: 'markup_desejado',
      icone: '❌'
    });
  }
  
  if (dados.margem_lucro < 0 || dados.margem_lucro >= 100) {
    alertas.push({
      tipo: 'erro',
      mensagem: 'Margem de lucro deve estar entre 0% e 99%',
      campo: 'margem_lucro',
      icone: '❌'
    });
  }
  
  // Validação de FOB zero
  if (dados.valor_fob_usd <= 0) {
    alertas.push({
      tipo: 'erro',
      mensagem: 'Valor FOB deve ser maior que zero',
      campo: 'valor_fob_usd',
      icone: '❌'
    });
  }
  
  // Validação de taxa de câmbio
  if (dados.exchangeRate <= 0) {
    alertas.push({
      tipo: 'erro',
      mensagem: 'Taxa de câmbio deve ser maior que zero',
      campo: 'exchangeRate',
      icone: '❌'
    });
  }
  
  // Validação de NCM (se fornecido)
  if (dados.ncm && !/^\d{8}$/.test(dados.ncm.replace(/[^\d]/g, ''))) {
    alertas.push({
      tipo: 'aviso',
      mensagem: 'NCM deve ter 8 dígitos numéricos',
      campo: 'ncm',
      icone: '⚠️'
    });
  }
  
  return {
    valido: alertas.filter(a => a.tipo === 'erro').length === 0,
    alertas
  };
}

// Função para determinar status da exportação
function determinarStatusExportacao(markupReal: number, margemReal: number, markupDesejado: number, margemDesejado: number): string {
  const markupOK = markupReal >= markupDesejado;
  const margemOK = margemReal >= margemDesejado;
  
  if (markupOK && margemOK) {
    return "✅ Exportação Viável";
  } else if (markupReal > 0 && margemReal > 0) {
    return "⚠️ Precisa Otimização";
  } else {
    return "🚫 Não Viável";
  }
}

// Função para gerar alertas inteligentes
function gerarAlertas(dados: ExportCostInput, resultados: any): Alert[] {
  const alertas: Alert[] = [];
  
  // Análise de custos
  const percentualCustos = dados.valor_fob_usd > 0 ? 
    ((dados.frete_internacional_usd + dados.seguro_usd + dados.frete_interno_usd + 
      dados.taxas_portuarias_usd + dados.outras_despesas_usd) / dados.valor_fob_usd) * 100 : 0;
  
  if (percentualCustos > 20) {
    alertas.push({
      tipo: 'aviso',
      mensagem: `Custos representam ${percentualCustos.toFixed(1)}% do FOB - revisar logística`,
      icone: '⚠️'
    });
  }
  
  // Análise de incentivos
  if (dados.reintegra_percent === 0 && dados.drawback_percent === 0) {
    alertas.push({
      tipo: 'info',
      mensagem: 'Considere utilizar incentivos fiscais (Reintegra/Drawback)',
      icone: '💡'
    });
  }
  
  // Análise de rentabilidade
  if (resultados.markup_real < dados.markup_desejado) {
    const ajuste = ((dados.markup_desejado - resultados.markup_real) / 100) * dados.valor_fob_usd;
    alertas.push({
      tipo: 'aviso',
      mensagem: `Aumentar preço em US$ ${ajuste.toFixed(2)} para atingir markup desejado`,
      icone: '📈'
    });
  }
  
  // Análise de margem
  if (resultados.margem_real < dados.margem_lucro) {
    alertas.push({
      tipo: 'aviso',
      mensagem: 'Margem abaixo do desejado - otimizar custos ou ajustar preços',
      icone: '📊'
    });
  }
  
  // Análise de competitividade
  if (resultados.markup_real > 50) {
    alertas.push({
      tipo: 'info',
      mensagem: 'Markup muito alto - verificar competitividade no mercado',
      icone: '🎯'
    });
  }
  
  return alertas;
}

// Função para determinar status geral
function determinarStatus(alertas: Alert[]): 'valido' | 'aviso' | 'erro' {
  const erros = alertas.filter(a => a.tipo === 'erro').length;
  const avisos = alertas.filter(a => a.tipo === 'aviso').length;
  
  if (erros > 0) return 'erro';
  if (avisos > 0) return 'aviso';
  return 'valido';
}

// Motor de cálculo principal
export function calculateExportCost(inputs: ExportCostInput): ExportCostOutput {
  // ETAPA 1: Validação de inputs
  const validacao = validarInputsExportacao(inputs);
  if (!validacao.valido) {
    throw new Error(`Validação falhou: ${validacao.alertas.map(a => a.mensagem).join(', ')}`);
  }
  
  // ETAPA 2: Conversão inicial para BRL
  const valor_fob_brl = converterParaBRL(inputs.valor_fob_usd, inputs.exchangeRate);
  const frete_internacional_brl = converterParaBRL(inputs.frete_internacional_usd, inputs.exchangeRate);
  const seguro_brl = converterParaBRL(inputs.seguro_usd, inputs.exchangeRate);
  const frete_interno_brl = converterParaBRL(inputs.frete_interno_usd, inputs.exchangeRate);
  const taxas_portuarias_brl = converterParaBRL(inputs.taxas_portuarias_usd, inputs.exchangeRate);
  const outras_despesas_brl = converterParaBRL(inputs.outras_despesas_usd, inputs.exchangeRate);
  
  // ETAPA 3: Cálculo dos custos totais
  const total_custos_usd = inputs.frete_internacional_usd + inputs.seguro_usd + 
                          inputs.frete_interno_usd + inputs.taxas_portuarias_usd + inputs.outras_despesas_usd;
  const total_custos_brl = converterParaBRL(total_custos_usd, inputs.exchangeRate);
  
  // ETAPA 4: Cálculo dos benefícios fiscais
  const credito_reintegra_usd = inputs.valor_fob_usd * toDecimal(inputs.reintegra_percent);
  const credito_reintegra_brl = converterParaBRL(credito_reintegra_usd, inputs.exchangeRate);
  
  const credito_drawback_usd = inputs.valor_fob_usd * toDecimal(inputs.drawback_percent);
  const credito_drawback_brl = converterParaBRL(credito_drawback_usd, inputs.exchangeRate);
  
  const total_beneficios_usd = credito_reintegra_usd + credito_drawback_usd;
  const total_beneficios_brl = converterParaBRL(total_beneficios_usd, inputs.exchangeRate);
  
  // ETAPA 5: Receita líquida
  const receita_liquida_usd = inputs.valor_fob_usd - total_custos_usd + total_beneficios_usd;
  const receita_liquida_brl = converterParaBRL(receita_liquida_usd, inputs.exchangeRate);
  
  // ETAPA 6: Análise de rentabilidade
  const custo_real_usd = inputs.valor_fob_usd + total_custos_usd - total_beneficios_usd;
  const custo_real_brl = converterParaBRL(custo_real_usd, inputs.exchangeRate);
  
  const lucro_real_usd = receita_liquida_usd - custo_real_usd;
  const lucro_real_brl = converterParaBRL(lucro_real_usd, inputs.exchangeRate);
  
  const markup_real = custo_real_usd > 0 ? 
    ((receita_liquida_usd - custo_real_usd) / custo_real_usd) * 100 : 0;
  
  const margem_real = receita_liquida_usd > 0 ? 
    ((receita_liquida_usd - custo_real_usd) / receita_liquida_usd) * 100 : 0;
  
  // ETAPA 7: Preços sugeridos
  const preco_markup_usd = custo_real_usd * (1 + toDecimal(inputs.markup_desejado));
  const preco_markup_brl = converterParaBRL(preco_markup_usd, inputs.exchangeRate);
  
  const preco_margem_usd = custo_real_usd / (1 - toDecimal(inputs.margem_lucro));
  const preco_margem_brl = converterParaBRL(preco_margem_usd, inputs.exchangeRate);
  
  // ETAPA 8: Geração de alertas
  const alertasCalculo = gerarAlertas(inputs, { markup_real, margem_real });
  const todosAlertas = [...validacao.alertas, ...alertasCalculo];
  const status = determinarStatus(todosAlertas);
  
  // ETAPA 9: Montagem do resultado
  const resultado: ExportCostOutput = {
    // Seção 1: Valor FOB
    secao1: {
      valor_mercadoria: {
        usd: formatarNumero(inputs.valor_fob_usd),
        brl: formatarNumero(valor_fob_brl),
        label: "Valor da mercadoria"
      }
    },
    
    // Seção 2: Custos de Exportação
    secao2: {
      frete_internacional: {
        usd: formatarNumero(inputs.frete_internacional_usd),
        brl: formatarNumero(frete_internacional_brl),
        label: "Frete Internacional"
      },
      seguro: {
        usd: formatarNumero(inputs.seguro_usd),
        brl: formatarNumero(seguro_brl),
        label: "Seguro"
      },
      frete_interno: {
        usd: formatarNumero(inputs.frete_interno_usd),
        brl: formatarNumero(frete_interno_brl),
        label: "Frete Interno"
      },
      taxas_portuarias: {
        usd: formatarNumero(inputs.taxas_portuarias_usd),
        brl: formatarNumero(taxas_portuarias_brl),
        label: "Taxas Portuárias"
      },
      outras_despesas: {
        usd: formatarNumero(inputs.outras_despesas_usd),
        brl: formatarNumero(outras_despesas_brl),
        label: "Outras Despesas"
      },
      total_custos: {
        usd: formatarNumero(total_custos_usd),
        brl: formatarNumero(total_custos_brl),
        label: "Total de Custos"
      }
    },
    
    // Seção 3: Benefícios Fiscais
    secao3: {
      credito_reintegra: {
        usd: formatarNumero(credito_reintegra_usd),
        brl: formatarNumero(credito_reintegra_brl),
        percentual: inputs.reintegra_percent,
        label: `Crédito Reintegra (${inputs.reintegra_percent}%)`
      },
      credito_drawback: {
        usd: formatarNumero(credito_drawback_usd),
        brl: formatarNumero(credito_drawback_brl),
        percentual: inputs.drawback_percent,
        label: `Crédito Drawback (${inputs.drawback_percent}%)`
      },
      total_beneficios: {
        usd: formatarNumero(total_beneficios_usd),
        brl: formatarNumero(total_beneficios_brl),
        label: "Total de Benefícios"
      }
    },
    
    // Seção 4: Resultado Final
    secao4: {
      valor_fob: {
        usd: formatarNumero(inputs.valor_fob_usd),
        brl: formatarNumero(valor_fob_brl),
        label: "Valor FOB"
      },
      custos_totais: {
        usd: formatarNumero(-total_custos_usd),
        brl: formatarNumero(-total_custos_brl),
        label: "- Custos Totais",
        sinal: "negativo"
      },
      beneficios_fiscais: {
        usd: formatarNumero(total_beneficios_usd),
        brl: formatarNumero(total_beneficios_brl),
        label: "+ Benefícios Fiscais",
        sinal: "positivo"
      },
      receita_liquida: {
        usd: formatarNumero(receita_liquida_usd),
        brl: formatarNumero(receita_liquida_brl),
        label: "Receita Líquida"
      }
    },
    
    // Seção 5: Análise de Rentabilidade
    secao5: {
      lucro_real: {
        usd: formatarNumero(lucro_real_usd),
        brl: formatarNumero(lucro_real_brl),
        label: "Lucro Real",
        sinal: lucro_real_usd >= 0 ? "positivo" : "negativo"
      },
      markup_real: {
        valor: formatarNumero(markup_real, 2),
        label: "Markup Real (sobre custo)",
        comparacao_desejado: inputs.markup_desejado,
        status: markup_real >= inputs.markup_desejado ? "atingido" : "abaixo"
      },
      margem_real: {
        valor: formatarNumero(margem_real, 2),
        label: "Margem Real (sobre receita)",
        comparacao_desejado: inputs.margem_lucro,
        status: margem_real >= inputs.margem_lucro ? "atingido" : "abaixo"
      },
      status_exportacao: determinarStatusExportacao(markup_real, margem_real, inputs.markup_desejado, inputs.margem_lucro)
    },
    
    // Seção 6: Preços Sugeridos
    secao6: {
      preco_atual: {
        usd: formatarNumero(inputs.valor_fob_usd),
        brl: formatarNumero(valor_fob_brl),
        label: "Preço Atual (FOB)"
      },
      preco_markup_desejado: {
        usd: formatarNumero(preco_markup_usd),
        brl: formatarNumero(preco_markup_brl),
        label: `Preço p/ Markup ${inputs.markup_desejado}%`,
        diferenca_usd: formatarNumero(preco_markup_usd - inputs.valor_fob_usd),
        diferenca_percent: inputs.valor_fob_usd > 0 ? 
          formatarNumero(((preco_markup_usd - inputs.valor_fob_usd) / inputs.valor_fob_usd) * 100, 2) : 0
      },
      preco_margem_desejada: {
        usd: formatarNumero(preco_margem_usd),
        brl: formatarNumero(preco_margem_brl),
        label: `Preço p/ Margem ${inputs.margem_lucro}%`,
        diferenca_usd: formatarNumero(preco_margem_usd - inputs.valor_fob_usd),
        diferenca_percent: inputs.valor_fob_usd > 0 ? 
          formatarNumero(((preco_margem_usd - inputs.valor_fob_usd) / inputs.valor_fob_usd) * 100, 2) : 0
      }
    },
    
    // Métricas de análise
    custo_real_usd: formatarNumero(custo_real_usd),
    custo_real_brl: formatarNumero(custo_real_brl),
    lucro_real_usd: formatarNumero(lucro_real_usd),
    lucro_real_brl: formatarNumero(lucro_real_brl),
    markup_real: formatarNumero(markup_real, 2),
    margem_real: formatarNumero(margem_real, 2),
    
    // Status e alertas
    status,
    alertas: todosAlertas
  };
  
  return resultado;
}

// Funções de formatação obrigatórias
export function formatarValorExportacao(valorUSD: number, valorBRL: number, sinal: string | null = null): string {
  let prefixo = "";
  if (sinal === "positivo") prefixo = "+";
  if (sinal === "negativo") prefixo = "-";
  
  const usdFormatado = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(Math.abs(valorUSD));
  
  const brlFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(Math.abs(valorBRL));
  
  return `${prefixo}${usdFormatado} / ${prefixo}${brlFormatado}`;
}

export function formatarPercentualExportacao(valor: number, casasDecimais: number = 2): string {
  const sinal = valor >= 0 ? "+" : "";
  return `${sinal}${valor.toFixed(casasDecimais)}%`;
}

// Função de análise de competitividade
export function analisarCompetitividade(markupReal: number, margemReal: number) {
  const competitividade = {
    markup: {
      status: markupReal > 30 ? "alto" : markupReal > 15 ? "moderado" : "baixo",
      recomendacao: markupReal < 10 ? "Revisar custos e preços" : "Dentro do esperado"
    },
    margem: {
      status: margemReal > 25 ? "alta" : margemReal > 10 ? "moderada" : "baixa",
      recomendacao: margemReal < 5 ? "Rever estratégia de preços" : "Aceitável"
    }
  };
  
  return competitividade;
}

// Função de compatibilidade para versões anteriores
export function calculateExportCostLegacy(inputs: any): any {
  console.warn('calculateExportCostLegacy está obsoleta. Use calculateExportCost.');
  return calculateExportCost(inputs);
} 