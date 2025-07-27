// Interfaces para o simulador de frete
export interface FreightCostInput {
  origin: string;
  destination: string;
  weight: number;
  volume: number;
  cargoType: string;
  cargoValue: number;
  ncm: string;
  incoterm: string;
  serviceType: string;
  exchangeRate: number;
}

export interface FreightCostOutput {
  totalCost: number;
  breakdown: {
    freight: number;
    insurance: number;
    customs: number;
    portFees: number;
    documentation: number;
  };
  currency: string;
  exchangeRate: number;
}

// Função para calcular custos de frete
export function calculateFreightCost(inputs: FreightCostInput): FreightCostOutput {
  const { weight, volume, cargoValue, exchangeRate } = inputs;
  
  // Cálculos simulados - em produção seria integrado com APIs reais
  const freight = weight * 0.5 + volume * 0.3;
  const insurance = cargoValue * 0.01;
  const customs = cargoValue * 0.05;
  const portFees = weight * 0.2;
  const documentation = 150;
  
  const totalCost = freight + insurance + customs + portFees + documentation;
  
  return {
    totalCost,
    breakdown: {
      freight,
      insurance,
      customs,
      portFees,
      documentation
    },
    currency: 'USD',
    exchangeRate
  };
}

// Função para formatar valores de frete
export function formatarValorFrete(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency === 'USD' ? 'USD' : 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
} 