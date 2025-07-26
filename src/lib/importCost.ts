export interface ImportCostInput {
  fob: number; // valor FOB em moeda estrangeira
  freight: number; // frete internacional
  insurance: number; // seguro internacional
  customs: number; // despesas aduaneiras
  misc: number; // outras despesas
  ii: number; // Imposto de Importação em %
  ipi: number; // IPI em %
  pis: number; // PIS em %
  cofins: number; // COFINS em %
  icms: number; // ICMS em %
  exchangeRate: number; // taxa de câmbio para conversão
  ncm?: string; // código NCM (opcional para validação)
}

export interface ImportCostOutput {
  // Valores em moeda estrangeira
  cif: number;
  iiValue: number;
  ipiValue: number;
  pisValue: number;
  cofinsValue: number;
  icmsValue: number;
  totalTaxes: number;
  landedCost: number;
  finalCost: number;
  
  // Valores em BRL
  cifBRL: number;
  iiValueBRL: number;
  ipiValueBRL: number;
  pisValueBRL: number;
  cofinsValueBRL: number;
  icmsValueBRL: number;
  totalTaxesBRL: number;
  landedCostBRL: number;
  finalCostBRL: number;
  
  // Análise de viabilidade
  cargaTributaria: number; // % sobre custo final
  impactoTributos: number; // % sobre CIF
  custoAdicional: number; // % sobre CIF
  
  // Status e alertas
  status: 'valido' | 'aviso' | 'erro';
  alertas: Alert[];
}

export interface Alert {
  tipo: 'info' | 'aviso' | 'erro';
  mensagem: string;
  icone: string;
  campo?: string;
}

export interface ValidationResult {
  valido: boolean;
  erros: string[];
  alertas: Alert[];
}

// ===========================================
// VALIDAÇÕES OBRIGATÓRIAS
// ===========================================

export function validarInputs(dados: ImportCostInput): ValidationResult {
  const erros: string[] = [];
  const alertas: Alert[] = [];

  // 1. Validação de valores negativos
  if (dados.fob < 0) erros.push('Valor FOB não pode ser negativo');
  if (dados.freight < 0) erros.push('Frete internacional não pode ser negativo');
  if (dados.insurance < 0) erros.push('Seguro não pode ser negativo');
  if (dados.customs < 0) erros.push('Despesas aduaneiras não podem ser negativas');
  if (dados.misc < 0) erros.push('Outras despesas não podem ser negativas');

  // 2. Validação de alíquotas
  if (dados.ii < 0 || dados.ii > 100) erros.push('Alíquota II deve estar entre 0% e 100%');
  if (dados.ipi < 0 || dados.ipi > 100) erros.push('Alíquota IPI deve estar entre 0% e 100%');
  if (dados.pis < 0 || dados.pis > 100) erros.push('Alíquota PIS deve estar entre 0% e 100%');
  if (dados.cofins < 0 || dados.cofins > 100) erros.push('Alíquota COFINS deve estar entre 0% e 100%');
  if (dados.icms < 0 || dados.icms >= 100) erros.push('Alíquota ICMS deve estar entre 0% e 99,99%');

  // 3. Validação de taxa de câmbio
  if (dados.exchangeRate <= 0) erros.push('Taxa de câmbio deve ser maior que zero');
  if (dados.exchangeRate > 1000) erros.push('Taxa de câmbio parece incorreta (muito alta)');

  // 4. Validação de NCM (se fornecido)
  if (dados.ncm && !/^\d{8}$/.test(dados.ncm)) {
    erros.push('NCM deve ter exatamente 8 dígitos numéricos');
  }

  // 5. Alertas para valores atípicos
  if (dados.ii > 50) {
    alertas.push({
      tipo: 'aviso',
      mensagem: 'Alíquota II muito alta (>50%). Verifique se está correta.',
      icone: '⚠️',
      campo: 'ii'
    });
  }

  if (dados.icms > 25) {
    alertas.push({
      tipo: 'aviso',
      mensagem: 'Alíquota ICMS alta (>25%). Confirme o estado de destino.',
      icone: '⚠️',
      campo: 'icms'
    });
  }

  if (dados.fob === 0) {
    alertas.push({
      tipo: 'info',
      mensagem: 'Valor FOB é zero. Verifique se o valor foi informado.',
      icone: 'ℹ️',
      campo: 'fob'
    });
  }

  return { valido: erros.length === 0, erros, alertas };
}

// ===========================================
// FUNÇÕES AUXILIARES
// ===========================================

function toDecimal(percentual: number): number {
  return percentual / 100;
}

function converterParaBRL(valor: number, taxa: number): number {
  return valor * taxa;
}

function formatarNumero(valor: number, casasDecimais: number = 2): number {
  if (isNaN(valor) || !isFinite(valor)) return 0;
  const multiplicador = Math.pow(10, casasDecimais);
  return Math.round(valor * multiplicador) / multiplicador;
}

// ===========================================
// MOTOR DE CÁLCULO PRINCIPAL
// ===========================================

export function calculateImportCost(input: ImportCostInput): ImportCostOutput {
  // 1. VALIDAÇÃO INICIAL
  const validacao = validarInputs(input);
  if (!validacao.valido) {
    throw new Error(`Dados inválidos: ${validacao.erros.join(', ')}`);
  }

  // 2. CONVERSÕES PARA BRL
  const valorFobBRL = converterParaBRL(input.fob, input.exchangeRate);
  const freteBRL = converterParaBRL(input.freight, input.exchangeRate);
  const seguroBRL = converterParaBRL(input.insurance, input.exchangeRate);
  const despesasAduaneirasBRL = converterParaBRL(input.customs, input.exchangeRate);
  const outrasDespesasBRL = converterParaBRL(input.misc, input.exchangeRate);

  // 3. CÁLCULO DO VALOR CIF
  const valorCifUSD = input.fob + input.freight + input.insurance;
  const valorCifBRL = valorFobBRL + freteBRL + seguroBRL;

  // 4. SEQUÊNCIA DE CÁLCULO DOS TRIBUTOS (CONFORME LEGISLAÇÃO)

  // 4.1 Imposto de Importação (II)
  const iiBRL = valorCifBRL * toDecimal(input.ii);
  const iiUSD = iiBRL / input.exchangeRate;

  // 4.2 IPI (incide sobre CIF + II)
  const baseIpiBRL = valorCifBRL + iiBRL;
  const ipiBRL = baseIpiBRL * toDecimal(input.ipi);
  const ipiUSD = ipiBRL / input.exchangeRate;

  // 4.3 PIS (incide sobre CIF + II + IPI)
  const basePisBRL = valorCifBRL + iiBRL + ipiBRL;
  const pisBRL = basePisBRL * toDecimal(input.pis);
  const pisUSD = pisBRL / input.exchangeRate;

  // 4.4 COFINS (incide sobre CIF + II + IPI)
  const baseCofinsBRL = valorCifBRL + iiBRL + ipiBRL;
  const cofinsBRL = baseCofinsBRL * toDecimal(input.cofins);
  const cofinsUSD = cofinsBRL / input.exchangeRate;

  // 4.5 ICMS (cálculo "por dentro" - CRÍTICO)
  const aliquotaIcmsDecimal = toDecimal(input.icms);
  const divisorIcms = 1 - aliquotaIcmsDecimal;
  
  if (divisorIcms <= 0) {
    throw new Error('Alíquota de ICMS inválida (100% ou superior)');
  }

  // Base sem ICMS: CIF + II + IPI + PIS + COFINS + Despesas Aduaneiras
  const baseIcmsSemIcmsBRL = valorCifBRL + iiBRL + ipiBRL + pisBRL + cofinsBRL + despesasAduaneirasBRL;
  
  // Base do ICMS (cálculo "por dentro")
  const baseIcmsBRL = baseIcmsSemIcmsBRL / divisorIcms;
  const icmsBRL = baseIcmsBRL * aliquotaIcmsDecimal;
  const icmsUSD = icmsBRL / input.exchangeRate;

  // 5. TOTALIZAÇÕES
  const totalTributosFederaisBRL = iiBRL + ipiBRL + pisBRL + cofinsBRL;
  const totalTributosFederaisUSD = totalTributosFederaisBRL / input.exchangeRate;

  const totalTributosEstaduaisBRL = icmsBRL;
  const totalTributosEstaduaisUSD = icmsBRL / input.exchangeRate;

  const totalTributosBRL = totalTributosFederaisBRL + totalTributosEstaduaisBRL;
  const totalTributosUSD = totalTributosBRL / input.exchangeRate;

  const custosLogisticosBRL = despesasAduaneirasBRL + outrasDespesasBRL;
  const custosLogisticosUSD = custosLogisticosBRL / input.exchangeRate;

  const landedCostBRL = valorCifBRL + totalTributosBRL + custosLogisticosBRL;
  const landedCostUSD = landedCostBRL / input.exchangeRate;

  const finalCostBRL = landedCostBRL;
  const finalCostUSD = finalCostBRL / input.exchangeRate;

  // 6. ANÁLISE DE VIABILIDADE
  const cargaTributaria = valorCifBRL > 0 ? (totalTributosBRL / finalCostBRL) * 100 : 0;
  const impactoTributos = valorCifBRL > 0 ? (totalTributosBRL / valorCifBRL) * 100 : 0;
  const custoAdicional = valorCifBRL > 0 ? ((finalCostBRL - valorCifBRL) / valorCifBRL) * 100 : 0;

  // 7. GERAÇÃO DE ALERTAS ADICIONAIS
  const alertasAdicionais = gerarAlertas({
    cargaTributaria,
    impactoTributos,
    custoAdicional,
    icmsBRL,
    finalCostBRL,
    valorCifBRL,
    input
  });

  // 8. DETERMINAÇÃO DO STATUS
  const status = determinarStatus(cargaTributaria, validacao.alertas, alertasAdicionais);

  return {
    // Valores em moeda estrangeira
    cif: formatarNumero(valorCifUSD, 2),
    iiValue: formatarNumero(iiUSD, 2),
    ipiValue: formatarNumero(ipiUSD, 2),
    pisValue: formatarNumero(pisUSD, 2),
    cofinsValue: formatarNumero(cofinsUSD, 2),
    icmsValue: formatarNumero(icmsUSD, 2),
    totalTaxes: formatarNumero(totalTributosUSD, 2),
    landedCost: formatarNumero(landedCostUSD, 2),
    finalCost: formatarNumero(finalCostUSD, 2),

    // Valores em BRL
    cifBRL: formatarNumero(valorCifBRL, 2),
    iiValueBRL: formatarNumero(iiBRL, 2),
    ipiValueBRL: formatarNumero(ipiBRL, 2),
    pisValueBRL: formatarNumero(pisBRL, 2),
    cofinsValueBRL: formatarNumero(cofinsBRL, 2),
    icmsValueBRL: formatarNumero(icmsBRL, 2),
    totalTaxesBRL: formatarNumero(totalTributosBRL, 2),
    landedCostBRL: formatarNumero(landedCostBRL, 2),
    finalCostBRL: formatarNumero(finalCostBRL, 2),

    // Análise de viabilidade
    cargaTributaria: formatarNumero(cargaTributaria, 1),
    impactoTributos: formatarNumero(impactoTributos, 1),
    custoAdicional: formatarNumero(custoAdicional, 1),

    // Status e alertas
    status,
    alertas: [...validacao.alertas, ...alertasAdicionais]
  };
}

// ===========================================
// FUNÇÕES DE ANÁLISE E ALERTAS
// ===========================================

function gerarAlertas(dados: {
  cargaTributaria: number;
  impactoTributos: number;
  custoAdicional: number;
  icmsBRL: number;
  finalCostBRL: number;
  valorCifBRL: number;
  input: ImportCostInput;
}): Alert[] {
  const alertas: Alert[] = [];

  // Alertas de carga tributária
  if (dados.cargaTributaria > 80) {
    alertas.push({
      tipo: 'erro',
      mensagem: 'Carga tributária muito alta (>80%). Verifique alíquotas e considere consultoria especializada.',
      icone: '🚫'
    });
  } else if (dados.cargaTributaria > 60) {
    alertas.push({
      tipo: 'aviso',
      mensagem: 'Carga tributária alta (>60%). Considere otimização fiscal.',
      icone: '⚠️'
    });
  }

  // Alertas de ICMS
  const percentualIcms = dados.finalCostBRL > 0 ? (dados.icmsBRL / dados.finalCostBRL) * 100 : 0;
  if (percentualIcms > 50) {
    alertas.push({
      tipo: 'aviso',
      mensagem: 'ICMS representa mais de 50% do custo final. Verifique alíquota e estado de destino.',
      icone: '⚠️'
    });
  }

  // Alertas de custo adicional
  if (dados.custoAdicional > 100) {
    alertas.push({
      tipo: 'aviso',
      mensagem: 'Custo adicional superior a 100% do CIF. Verifique se todos os custos estão corretos.',
      icone: '⚠️'
    });
  }

  // Alertas de valores zero
  if (dados.valorCifBRL === 0) {
    alertas.push({
      tipo: 'info',
      mensagem: 'Valor CIF é zero. Verifique se todos os valores foram informados corretamente.',
      icone: 'ℹ️'
    });
  }

  return alertas;
}

function determinarStatus(cargaTributaria: number, alertasValidacao: Alert[], alertasAdicionais: Alert[]): 'valido' | 'aviso' | 'erro' {
  // Se há erros, status é erro
  if (alertasValidacao.some(a => a.tipo === 'erro') || alertasAdicionais.some(a => a.tipo === 'erro')) {
    return 'erro';
  }

  // Se há avisos ou carga tributária alta, status é aviso
  if (alertasValidacao.some(a => a.tipo === 'aviso') || 
      alertasAdicionais.some(a => a.tipo === 'aviso') || 
      cargaTributaria > 60) {
    return 'aviso';
  }

  // Caso contrário, status é válido
  return 'valido';
}

// ===========================================
// FUNÇÃO LEGACY PARA COMPATIBILIDADE
// ===========================================

export function calculateImportCostLegacy(input: ImportCostInput): ImportCostOutput {
  console.warn('Usando função legacy. Recomenda-se usar calculateImportCost()');
  return calculateImportCost(input);
} 