export interface ImportCostInput {
  fob: number; // valor FOB em BRL ou convertido
  freight: number;
  insurance: number;
  customs: number; // despesas aduaneiras
  ii: number; // em %
  ipi: number; // %
  pis: number; // %
  cofins: number; // %
  icms: number; // %
  misc: number; // outras despesas
}

export interface ImportCostOutput {
  cif: number;
  iiValue: number;
  ipiValue: number;
  pisValue: number;
  cofinsValue: number;
  icmsValue: number;
  totalTaxes: number;
  landedCost: number;
  finalCost: number;
}

export function calculateImportCost(input: ImportCostInput): ImportCostOutput {
  const toDecimal = (pct: number) => pct / 100;
  const cif = input.fob + input.freight + input.insurance;
  const iiValue = cif * toDecimal(input.ii);
  const ipiBase = cif + iiValue;
  const ipiValue = ipiBase * toDecimal(input.ipi);
  const pisBase = ipiBase + ipiValue;
  const pisValue = pisBase * toDecimal(input.pis);
  const cofinsBase = pisBase;
  const cofinsValue = cofinsBase * toDecimal(input.cofins);
  // cálculo simplificado de ICMS (utilizando base simples, sem "por dentro")
  const icmsBase = pisBase + pisValue + cofinsValue;
  const icmsValue = icmsBase * toDecimal(input.icms);
  const totalTaxes = iiValue + ipiValue + pisValue + cofinsValue + icmsValue;
  const landedCost = cif + totalTaxes + input.customs;
  const finalCost = landedCost + input.misc;
  return {
    cif,
    iiValue,
    ipiValue,
    pisValue,
    cofinsValue,
    icmsValue,
    totalTaxes,
    landedCost,
    finalCost,
  };
} 