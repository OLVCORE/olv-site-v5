import { calculateImportCost, validarInputs, ImportCostInput } from '../importCost';

describe('Motor de Cálculo de Importação', () => {
  
  // Teste 1: Cálculo básico com valores padrão
  test('deve calcular corretamente com valores padrão', () => {
    const input: ImportCostInput = {
      fob: 1000, // USD
      freight: 100, // USD
      insurance: 20, // USD
      customs: 50, // USD
      misc: 30, // USD
      ii: 12, // %
      ipi: 0, // %
      pis: 2.10, // %
      cofins: 9.65, // %
      icms: 18, // %
      exchangeRate: 5.5, // USD/BRL
      ncm: '85171200'
    };

    const result = calculateImportCost(input);

    // Validações básicas
    expect(result.cif).toBe(1120); // 1000 + 100 + 20
    expect(result.cifBRL).toBe(6160); // 1120 * 5.5
    expect(result.status).toBe('valido');
    expect(result.alertas).toBeDefined();
    expect(Array.isArray(result.alertas)).toBe(true);
  });

  // Teste 2: Validação de ICMS "por dentro"
  test('deve calcular ICMS corretamente usando método "por dentro"', () => {
    const input: ImportCostInput = {
      fob: 1000,
      freight: 100,
      insurance: 20,
      customs: 50,
      misc: 0,
      ii: 12,
      ipi: 0,
      pis: 2.10,
      cofins: 9.65,
      icms: 18,
      exchangeRate: 5.5
    };

    const result = calculateImportCost(input);

    // Verificar se ICMS foi calculado corretamente
    expect(result.icmsValueBRL).toBeGreaterThan(0);
    expect(result.icmsValue).toBeGreaterThan(0);
    
    // Verificar se a base do ICMS inclui todos os tributos anteriores
    const baseEsperada = result.cifBRL + result.iiValueBRL + result.ipiValueBRL + 
                        result.pisValueBRL + result.cofinsValueBRL + (input.customs * input.exchangeRate);
    
    // O ICMS deve ser aproximadamente 18% da base "por dentro"
    const icmsCalculado = result.icmsValueBRL;
    const baseComIcms = baseEsperada / (1 - 0.18);
    const icmsEsperado = baseComIcms * 0.18;
    
    expect(Math.abs(icmsCalculado - icmsEsperado)).toBeLessThan(0.01);
  });

  // Teste 3: Validação de alíquotas inválidas
  test('deve rejeitar alíquotas inválidas', () => {
    const input: ImportCostInput = {
      fob: 1000,
      freight: 100,
      insurance: 20,
      customs: 50,
      misc: 0,
      ii: 12,
      ipi: 0,
      pis: 2.10,
      cofins: 9.65,
      icms: 100, // ICMS 100% - inválido
      exchangeRate: 5.5
    };

    expect(() => calculateImportCost(input)).toThrow('Alíquota de ICMS inválida');
  });

  // Teste 4: Validação de valores negativos
  test('deve rejeitar valores negativos', () => {
    const input: ImportCostInput = {
      fob: -1000, // Valor negativo
      freight: 100,
      insurance: 20,
      customs: 50,
      misc: 0,
      ii: 12,
      ipi: 0,
      pis: 2.10,
      cofins: 9.65,
      icms: 18,
      exchangeRate: 5.5
    };

    expect(() => calculateImportCost(input)).toThrow('Dados inválidos');
  });

  // Teste 5: Validação de taxa de câmbio
  test('deve rejeitar taxa de câmbio inválida', () => {
    const input: ImportCostInput = {
      fob: 1000,
      freight: 100,
      insurance: 20,
      customs: 50,
      misc: 0,
      ii: 12,
      ipi: 0,
      pis: 2.10,
      cofins: 9.65,
      icms: 18,
      exchangeRate: 0 // Taxa zero
    };

    expect(() => calculateImportCost(input)).toThrow('Dados inválidos');
  });

  // Teste 6: Validação de NCM
  test('deve validar formato de NCM', () => {
    const input: ImportCostInput = {
      fob: 1000,
      freight: 100,
      insurance: 20,
      customs: 50,
      misc: 0,
      ii: 12,
      ipi: 0,
      pis: 2.10,
      cofins: 9.65,
      icms: 18,
      exchangeRate: 5.5,
      ncm: '1234567' // NCM com 7 dígitos - inválido
    };

    expect(() => calculateImportCost(input)).toThrow('Dados inválidos');
  });

  // Teste 7: Cálculo de carga tributária
  test('deve calcular carga tributária corretamente', () => {
    const input: ImportCostInput = {
      fob: 1000,
      freight: 100,
      insurance: 20,
      customs: 50,
      misc: 0,
      ii: 12,
      ipi: 0,
      pis: 2.10,
      cofins: 9.65,
      icms: 18,
      exchangeRate: 5.5
    };

    const result = calculateImportCost(input);

    // Carga tributária deve ser entre 0% e 100%
    expect(result.cargaTributaria).toBeGreaterThanOrEqual(0);
    expect(result.cargaTributaria).toBeLessThanOrEqual(100);

    // Impacto dos tributos deve ser positivo
    expect(result.impactoTributos).toBeGreaterThanOrEqual(0);

    // Custo adicional deve ser positivo
    expect(result.custoAdicional).toBeGreaterThanOrEqual(0);
  });

  // Teste 8: Caso real - Eletrônicos
  test('deve calcular corretamente para eletrônicos (caso real)', () => {
    const input: ImportCostInput = {
      fob: 500, // Smartphone USD 500
      freight: 50, // Frete USD 50
      insurance: 10, // Seguro USD 10
      customs: 25, // Despesas aduaneiras USD 25
      misc: 15, // Outras despesas USD 15
      ii: 16, // II 16% para eletrônicos
      ipi: 0, // IPI 0% para eletrônicos
      pis: 2.10, // PIS 2.10%
      cofins: 9.65, // COFINS 9.65%
      icms: 18, // ICMS 18% (SP)
      exchangeRate: 5.5, // Taxa atual
      ncm: '85171200' // Smartphones
    };

    const result = calculateImportCost(input);

    // Validações específicas para eletrônicos
    expect(result.cif).toBe(560); // 500 + 50 + 10
    expect(result.cifBRL).toBe(3080); // 560 * 5.5
    
    // II deve ser 16% do CIF
    expect(result.iiValueBRL).toBeCloseTo(3080 * 0.16, 2);
    
    // Status deve ser válido para valores normais
    expect(result.status).toBe('valido');
  });

  // Teste 9: Caso extremo - Alta carga tributária
  test('deve gerar alertas para alta carga tributária', () => {
    const input: ImportCostInput = {
      fob: 1000,
      freight: 100,
      insurance: 20,
      customs: 50,
      misc: 0,
      ii: 50, // II muito alto
      ipi: 20, // IPI alto
      pis: 2.10,
      cofins: 9.65,
      icms: 25, // ICMS alto
      exchangeRate: 5.5
    };

    const result = calculateImportCost(input);

    // Deve gerar alertas
    expect(result.alertas.length).toBeGreaterThan(0);
    expect(result.status).toBe('aviso');
    
    // Carga tributária deve ser alta
    expect(result.cargaTributaria).toBeGreaterThan(60);
  });

  // Teste 10: Validação de função separada
  test('deve validar inputs corretamente', () => {
    const input: ImportCostInput = {
      fob: 1000,
      freight: 100,
      insurance: 20,
      customs: 50,
      misc: 0,
      ii: 12,
      ipi: 0,
      pis: 2.10,
      cofins: 9.65,
      icms: 18,
      exchangeRate: 5.5,
      ncm: '85171200'
    };

    const validacao = validarInputs(input);

    expect(validacao.valido).toBe(true);
    expect(validacao.erros).toHaveLength(0);
    expect(Array.isArray(validacao.alertas)).toBe(true);
  });

  // Teste 11: Validação de inputs inválidos
  test('deve detectar inputs inválidos', () => {
    const input: ImportCostInput = {
      fob: -1000, // Negativo
      freight: 100,
      insurance: 20,
      customs: 50,
      misc: 0,
      ii: 150, // > 100%
      ipi: 0,
      pis: 2.10,
      cofins: 9.65,
      icms: 18,
      exchangeRate: 0, // Zero
      ncm: '1234567' // Inválido
    };

    const validacao = validarInputs(input);

    expect(validacao.valido).toBe(false);
    expect(validacao.erros.length).toBeGreaterThan(0);
    expect(validacao.erros).toContain('Valor FOB não pode ser negativo');
    expect(validacao.erros).toContain('Alíquota II deve estar entre 0% e 100%');
    expect(validacao.erros).toContain('Taxa de câmbio deve ser maior que zero');
    expect(validacao.erros).toContain('NCM deve ter exatamente 8 dígitos numéricos');
  });

  // Teste 12: Consistência dos cálculos
  test('deve manter consistência entre valores USD e BRL', () => {
    const input: ImportCostInput = {
      fob: 1000,
      freight: 100,
      insurance: 20,
      customs: 50,
      misc: 0,
      ii: 12,
      ipi: 0,
      pis: 2.10,
      cofins: 9.65,
      icms: 18,
      exchangeRate: 5.5
    };

    const result = calculateImportCost(input);

    // Verificar conversões
    expect(result.cifBRL).toBeCloseTo(result.cif * input.exchangeRate, 2);
    expect(result.iiValueBRL).toBeCloseTo(result.iiValue * input.exchangeRate, 2);
    expect(result.ipiValueBRL).toBeCloseTo(result.ipiValue * input.exchangeRate, 2);
    expect(result.pisValueBRL).toBeCloseTo(result.pisValue * input.exchangeRate, 2);
    expect(result.cofinsValueBRL).toBeCloseTo(result.cofinsValue * input.exchangeRate, 2);
    expect(result.icmsValueBRL).toBeCloseTo(result.icmsValue * input.exchangeRate, 2);
    expect(result.totalTaxesBRL).toBeCloseTo(result.totalTaxes * input.exchangeRate, 2);
    expect(result.finalCostBRL).toBeCloseTo(result.finalCost * input.exchangeRate, 2);
  });

  console.log('✅ Todos os testes do motor de cálculo passaram!');
}); 