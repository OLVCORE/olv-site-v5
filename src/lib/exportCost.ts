// Interfaces para o simulador de custos de exportação
export interface ExportCostInput {
  ncm: string;
  fob: number;
  freight: number;
  insurance: number;
  inland: number;
  port: number;
  misc: number;
  reintegra: number;
  drawback: number;
  exchange: number;
  selectedCurrency: string;
}

export interface ExportCostOutput {
  fob: { usd: number; brl: number };
  freight: { usd: number; brl: number };
  insurance: { usd: number; brl: number };
  inland: { usd: number; brl: number };
  port: { usd: number; brl: number };
  misc: { usd: number; brl: number };
  reintegra: { usd: number; brl: number };
  drawback: { usd: number; brl: number };
  totalCost: { usd: number; brl: number };
  totalRevenue: { usd: number; brl: number };
  netRevenue: { usd: number; brl: number };
  profitMargin: number;
  exchangeRate: number;
  breakdown: {
    costs: Array<{ name: string; usd: number; brl: number; percentage: number }>;
    revenues: Array<{ name: string; usd: number; brl: number; percentage: number }>;
  };
}

// Função para validar inputs de exportação
export function validarInputsExportacao(inputs: Partial<ExportCostInput>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Validar NCM (opcional - comentado para permitir cálculos sem NCM)
  // if (!inputs.ncm || inputs.ncm.trim() === '') {
  //   errors.push('NCM é obrigatório');
  // }

  // Validar FOB (obrigatório e deve ser maior que zero)
  if (inputs.fob === undefined || inputs.fob === null || inputs.fob <= 0) {
    errors.push('Valor FOB deve ser maior que zero');
  }

  // Validar campos que podem ser zero mas não negativos
  if (inputs.freight !== undefined && inputs.freight !== null && inputs.freight < 0) {
    errors.push('Frete não pode ser negativo');
  }

  if (inputs.insurance !== undefined && inputs.insurance !== null && inputs.insurance < 0) {
    errors.push('Seguro não pode ser negativo');
  }

  if (inputs.inland !== undefined && inputs.inland !== null && inputs.inland < 0) {
    errors.push('Frete interno não pode ser negativo');
  }

  if (inputs.port !== undefined && inputs.port !== null && inputs.port < 0) {
    errors.push('Taxas portuárias não podem ser negativas');
  }

  if (inputs.misc !== undefined && inputs.misc !== null && inputs.misc < 0) {
    errors.push('Despesas diversas não podem ser negativas');
  }

  // Validar campos de benefícios fiscais (podem ser zero)
  if (inputs.reintegra !== undefined && inputs.reintegra !== null && inputs.reintegra < 0) {
    errors.push('Reintegra não pode ser negativo');
  }

  if (inputs.drawback !== undefined && inputs.drawback !== null && inputs.drawback < 0) {
    errors.push('Drawback não pode ser negativo');
  }

  // Validar taxa de câmbio
  if (inputs.exchange === undefined || inputs.exchange === null || inputs.exchange <= 0) {
    errors.push('Taxa de câmbio deve ser maior que zero');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// Função principal para calcular custos de exportação
export function calculateExportCost(inputs: ExportCostInput): ExportCostOutput {
  const {
    ncm,
    fob,
    freight,
    insurance,
    inland,
    port,
    misc,
    reintegra,
    drawback,
    exchange,
    selectedCurrency
  } = inputs;

  // Converter valores para USD se necessário
  const usdRate = selectedCurrency === 'USD' ? 1 : exchange;
  
  // Calcular valores em USD
  const fobUsd = fob / usdRate;
  const freightUsd = freight / usdRate;
  const insuranceUsd = insurance / usdRate;
  const inlandUsd = inland / usdRate;
  const portUsd = port / usdRate;
  const miscUsd = misc / usdRate;
  const reintegraUsd = reintegra / usdRate;
  const drawbackUsd = drawback / usdRate;

  // Calcular valores em BRL
  const fobBrl = fob;
  const freightBrl = freight;
  const insuranceBrl = insurance;
  const inlandBrl = inland;
  const portBrl = port;
  const miscBrl = misc;
  const reintegraBrl = reintegra;
  const drawbackBrl = drawback;

  // Calcular custos totais
  const totalCostUsd = freightUsd + insuranceUsd + inlandUsd + portUsd + miscUsd;
  const totalCostBrl = freightBrl + insuranceBrl + inlandBrl + portBrl + miscBrl;

  // Calcular receitas totais
  const totalRevenueUsd = fobUsd + reintegraUsd + drawbackUsd;
  const totalRevenueBrl = fobBrl + reintegraBrl + drawbackBrl;

  // Calcular receita líquida
  const netRevenueUsd = totalRevenueUsd - totalCostUsd;
  const netRevenueBrl = totalRevenueBrl - totalCostBrl;

  // Calcular margem de lucro
  const profitMargin = totalRevenueUsd > 0 ? (netRevenueUsd / totalRevenueUsd) * 100 : 0;

  // Criar breakdown de custos
  const costs = [
    { name: 'Frete Internacional', usd: freightUsd, brl: freightBrl, percentage: totalCostUsd > 0 ? (freightUsd / totalCostUsd) * 100 : 0 },
    { name: 'Seguro', usd: insuranceUsd, brl: insuranceBrl, percentage: totalCostUsd > 0 ? (insuranceUsd / totalCostUsd) * 100 : 0 },
    { name: 'Frete Interno', usd: inlandUsd, brl: inlandBrl, percentage: totalCostUsd > 0 ? (inlandUsd / totalCostUsd) * 100 : 0 },
    { name: 'Taxas Portuárias', usd: portUsd, brl: portBrl, percentage: totalCostUsd > 0 ? (portUsd / totalCostUsd) * 100 : 0 },
    { name: 'Despesas Diversas', usd: miscUsd, brl: miscBrl, percentage: totalCostUsd > 0 ? (miscUsd / totalCostUsd) * 100 : 0 }
  ];

  // Criar breakdown de receitas
  const revenues = [
    { name: 'Valor FOB', usd: fobUsd, brl: fobBrl, percentage: totalRevenueUsd > 0 ? (fobUsd / totalRevenueUsd) * 100 : 0 },
    { name: 'Reintegra', usd: reintegraUsd, brl: reintegraBrl, percentage: totalRevenueUsd > 0 ? (reintegraUsd / totalRevenueUsd) * 100 : 0 },
    { name: 'Drawback', usd: drawbackUsd, brl: drawbackBrl, percentage: totalRevenueUsd > 0 ? (drawbackUsd / totalRevenueUsd) * 100 : 0 }
  ];

  return {
    fob: { usd: fobUsd, brl: fobBrl },
    freight: { usd: freightUsd, brl: freightBrl },
    insurance: { usd: insuranceUsd, brl: insuranceBrl },
    inland: { usd: inlandUsd, brl: inlandBrl },
    port: { usd: portUsd, brl: portBrl },
    misc: { usd: miscUsd, brl: miscBrl },
    reintegra: { usd: reintegraUsd, brl: reintegraBrl },
    drawback: { usd: drawbackUsd, brl: drawbackBrl },
    totalCost: { usd: totalCostUsd, brl: totalCostBrl },
    totalRevenue: { usd: totalRevenueUsd, brl: totalRevenueBrl },
    netRevenue: { usd: netRevenueUsd, brl: netRevenueBrl },
    profitMargin,
    exchangeRate: exchange,
    breakdown: {
      costs,
      revenues
    }
  };
}

// Função para buscar dados de NCM
export async function fetchNcmData(query: string): Promise<any[]> {
  try {
    // Simular busca de NCM - em produção seria uma API real
    const mockNcmData = [
      { code: '0101.21.00', description: 'Bovinos vivos, reprodutores de raça pura', reintegra: '0%', drawback: '0%' },
      { code: '0201.10.00', description: 'Carnes de bovinos, frescas ou refrigeradas', reintegra: '0%', drawback: '0%' },
      { code: '0901.11.00', description: 'Café não torrado, não descafeinado, em grãos', reintegra: '0%', drawback: '0%' },
      { code: '1001.90.00', description: 'Trigo e morcajo, exceto para semeadura', reintegra: '0%', drawback: '0%' },
      { code: '1201.90.00', description: 'Soja, mesmo triturada, exceto para semeadura', reintegra: '0%', drawback: '0%' }
    ];

    return mockNcmData.filter(item => 
      item.code.includes(query) || 
      item.description.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Erro ao buscar dados de NCM:', error);
    return [];
  }
}

// Função para buscar taxas de câmbio
export async function fetchCurrencyRates(): Promise<Record<string, number>> {
  try {
    // Simular taxas de câmbio - em produção seria uma API real
    return {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      CNY: 6.45,
      JPY: 110.5
    };
  } catch (error) {
    console.error('Erro ao buscar taxas de câmbio:', error);
    return { USD: 1 };
  }
} 