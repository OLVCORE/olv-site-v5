// Interfaces para IA Preditiva de Frete
export interface AIPredictionInput {
  origin: string;
  destination: string;
  weight: number;
  volume: number;
  cargoType: string;
  cargoValue: number;
  serviceType: string;
}

export interface AIPredictionOutput {
  predictedCost: number;
  confidence: number;
  factors: string[];
  recommendations: string[];
}

// Função para predição de custos de frete usando IA
export async function aiFreightPredictor(inputs: AIPredictionInput): Promise<AIPredictionOutput> {
  // Simulação de predição de IA - em produção seria integrado com modelo real
  const baseCost = inputs.weight * 0.5 + inputs.volume * 0.3;
  
  // Fatores que influenciam o custo
  const factors = [];
  let multiplier = 1.0;
  
  // Fator de rota
  if (inputs.origin === 'CN' && inputs.destination === 'BRSSZ') {
    factors.push('Rota China-Brasil (alta demanda)');
    multiplier *= 1.2;
  }
  
  // Fator de tipo de carga
  if (inputs.cargoType === 'dangerous') {
    factors.push('Carga perigosa (taxas adicionais)');
    multiplier *= 1.5;
  } else if (inputs.cargoType === 'perishable') {
    factors.push('Carga perecível (refrigeração)');
    multiplier *= 1.3;
  }
  
  // Fator de valor
  if (inputs.cargoValue > 10000) {
    factors.push('Carga de alto valor (seguro adicional)');
    multiplier *= 1.1;
  }
  
  // Fator de modal
  if (inputs.serviceType === 'air_express') {
    factors.push('Serviço expresso (premium)');
    multiplier *= 2.0;
  } else if (inputs.serviceType === 'air_standard') {
    factors.push('Serviço aéreo (rápido)');
    multiplier *= 1.8;
  }
  
  const predictedCost = baseCost * multiplier;
  const confidence = Math.min(0.95, 0.7 + (Math.random() * 0.25)); // 70-95% de confiança
  
  const recommendations = [
    'Considere consolidar cargas para reduzir custos',
    'Verifique sazonalidade da rota',
    'Compare diferentes modais de transporte',
    'Negocie com múltiplas transportadoras'
  ];
  
  return {
    predictedCost,
    confidence,
    factors,
    recommendations
  };
} 