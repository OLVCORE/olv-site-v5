import { calculateExportCost, validarInputsExportacao, ExportCostInput } from '../exportCost';

describe('Motor de Cálculo de Exportação', () => {
  test('deve calcular corretamente com valores padrão', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 100,
      seguro_usd: 20,
      frete_interno_usd: 30,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 10,
      reintegra_percent: 1.5,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 15,
      exchangeRate: 5.0
    };

    const resultado = calculateExportCost(inputs);

    expect(resultado.secao1.valor_mercadoria.usd).toBe(1000);
    expect(resultado.secao1.valor_mercadoria.brl).toBe(5000);
    expect(resultado.secao2.total_custos.usd).toBe(175); // 100+20+30+15+10
    expect(resultado.secao3.credito_reintegra.usd).toBe(15); // 1000 * 1.5%
    expect(resultado.secao4.receita_liquida.usd).toBe(840); // 1000 - 175 + 15
    expect(resultado.status).toBe('valido');
  });

  test('deve calcular benefícios fiscais corretamente', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 5000,
      frete_internacional_usd: 200,
      seguro_usd: 50,
      frete_interno_usd: 100,
      taxas_portuarias_usd: 75,
      outras_despesas_usd: 25,
      reintegra_percent: 2.0,
      drawback_percent: 5.0,
      markup_desejado: 25,
      margem_lucro: 20,
      exchangeRate: 5.2
    };

    const resultado = calculateExportCost(inputs);

    expect(resultado.secao3.credito_reintegra.usd).toBe(100); // 5000 * 2%
    expect(resultado.secao3.credito_drawback.usd).toBe(250); // 5000 * 5%
    expect(resultado.secao3.total_beneficios.usd).toBe(350); // 100 + 250
  });

  test('deve calcular markup e margem real corretamente', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 2000,
      frete_internacional_usd: 150,
      seguro_usd: 30,
      frete_interno_usd: 50,
      taxas_portuarias_usd: 40,
      outras_despesas_usd: 20,
      reintegra_percent: 1.0,
      drawback_percent: 0,
      markup_desejado: 30,
      margem_lucro: 25,
      exchangeRate: 5.0
    };

    const resultado = calculateExportCost(inputs);

    // Custo real = 2000 + 290 - 20 = 2270
    // Receita líquida = 2000 - 290 + 20 = 1730
    // Markup real = (1730 - 2270) / 2270 * 100 = -23.79%
    // Margem real = (1730 - 2270) / 1730 * 100 = -31.21%

    expect(resultado.markup_real).toBeCloseTo(-23.79, 1);
    expect(resultado.margem_real).toBeCloseTo(-31.21, 1);
    expect(resultado.secao5.markup_real.status).toBe('abaixo');
    expect(resultado.secao5.margem_real.status).toBe('abaixo');
  });

  test('deve calcular preços sugeridos corretamente', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 50,
      seguro_usd: 10,
      frete_interno_usd: 20,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 5,
      reintegra_percent: 1.0,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 15,
      exchangeRate: 5.0
    };

    const resultado = calculateExportCost(inputs);

    // Custo real = 1000 + 100 - 10 = 1090
    // Preço markup = 1090 * 1.20 = 1308
    // Preço margem = 1090 / 0.85 = 1282.35

    expect(resultado.secao6.preco_markup_desejado.usd).toBeCloseTo(1308, 0);
    expect(resultado.secao6.preco_margem_desejada.usd).toBeCloseTo(1282.35, 0);
    expect(resultado.secao6.preco_markup_desejado.diferenca_usd).toBeCloseTo(308, 0);
    expect(resultado.secao6.preco_margem_desejada.diferenca_usd).toBeCloseTo(282.35, 0);
  });

  test('deve rejeitar valores negativos', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: -100,
      frete_internacional_usd: 50,
      seguro_usd: 10,
      frete_interno_usd: 20,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 5,
      reintegra_percent: 1.0,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 15,
      exchangeRate: 5.0
    };

    expect(() => calculateExportCost(inputs)).toThrow('Valor FOB não pode ser negativo');
  });

  test('deve rejeitar alíquotas inválidas', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 50,
      seguro_usd: 10,
      frete_interno_usd: 20,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 5,
      reintegra_percent: 5.0, // Inválido: > 3%
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 15,
      exchangeRate: 5.0
    };

    expect(() => calculateExportCost(inputs)).toThrow('Reintegra deve estar entre 0% e 3%');
  });

  test('deve rejeitar margem de lucro inválida', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 50,
      seguro_usd: 10,
      frete_interno_usd: 20,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 5,
      reintegra_percent: 1.0,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 100, // Inválido: >= 100%
      exchangeRate: 5.0
    };

    expect(() => calculateExportCost(inputs)).toThrow('Margem de lucro deve estar entre 0% e 99%');
  });

  test('deve rejeitar taxa de câmbio inválida', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 50,
      seguro_usd: 10,
      frete_interno_usd: 20,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 5,
      reintegra_percent: 1.0,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 15,
      exchangeRate: 0 // Inválido: <= 0
    };

    expect(() => calculateExportCost(inputs)).toThrow('Taxa de câmbio deve ser maior que zero');
  });

  test('deve validar formato de NCM', () => {
    const inputs: ExportCostInput = {
      ncm: '12345', // Inválido: menos de 8 dígitos
      valor_fob_usd: 1000,
      frete_internacional_usd: 50,
      seguro_usd: 10,
      frete_interno_usd: 20,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 5,
      reintegra_percent: 1.0,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 15,
      exchangeRate: 5.0
    };

    const resultado = calculateExportCost(inputs);
    const alertaNCM = resultado.alertas.find(a => a.mensagem.includes('NCM deve ter 8 dígitos'));
    expect(alertaNCM).toBeDefined();
    expect(alertaNCM?.tipo).toBe('aviso');
  });

  test('deve calcular status de exportação corretamente', () => {
    // Caso viável
    const inputsViavel: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 50,
      seguro_usd: 10,
      frete_interno_usd: 20,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 5,
      reintegra_percent: 2.0,
      drawback_percent: 0,
      markup_desejado: 10,
      margem_lucro: 10,
      exchangeRate: 5.0
    };

    const resultadoViavel = calculateExportCost(inputsViavel);
    expect(resultadoViavel.secao5.status_exportacao).toContain('Viável');

    // Caso não viável
    const inputsNaoViavel: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 500, // Custos muito altos
      seguro_usd: 100,
      frete_interno_usd: 200,
      taxas_portuarias_usd: 150,
      outras_despesas_usd: 50,
      reintegra_percent: 0,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 15,
      exchangeRate: 5.0
    };

    const resultadoNaoViavel = calculateExportCost(inputsNaoViavel);
    expect(resultadoNaoViavel.secao5.status_exportacao).toContain('Não Viável');
  });

  test('deve gerar alertas inteligentes', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 300, // 30% do FOB - deve gerar alerta
      seguro_usd: 50,
      frete_interno_usd: 100,
      taxas_portuarias_usd: 75,
      outras_despesas_usd: 25,
      reintegra_percent: 0, // Deve gerar alerta
      drawback_percent: 0,
      markup_desejado: 30,
      margem_lucro: 25,
      exchangeRate: 5.0
    };

    const resultado = calculateExportCost(inputs);
    
    const alertaCustos = resultado.alertas.find(a => a.mensagem.includes('Custos representam'));
    const alertaIncentivos = resultado.alertas.find(a => a.mensagem.includes('Considere utilizar incentivos'));
    
    expect(alertaCustos).toBeDefined();
    expect(alertaIncentivos).toBeDefined();
    expect(alertaCustos?.tipo).toBe('aviso');
    expect(alertaIncentivos?.tipo).toBe('info');
  });

  test('deve validar inputs corretamente', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 50,
      seguro_usd: 10,
      frete_interno_usd: 20,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 5,
      reintegra_percent: 1.5,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 15,
      exchangeRate: 5.0
    };

    const validacao = validarInputsExportacao(inputs);
    expect(validacao.valido).toBe(true);
    expect(validacao.alertas.length).toBe(0);
  });

  test('deve detectar inputs inválidos', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: -100,
      frete_internacional_usd: 50,
      seguro_usd: 10,
      frete_interno_usd: 20,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 5,
      reintegra_percent: 5.0,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 100,
      exchangeRate: 0
    };

    const validacao = validarInputsExportacao(inputs);
    expect(validacao.valido).toBe(false);
    expect(validacao.alertas.length).toBeGreaterThan(0);
    expect(validacao.alertas.some(a => a.tipo === 'erro')).toBe(true);
  });

  test('deve manter consistência entre valores USD e BRL', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 100,
      seguro_usd: 20,
      frete_interno_usd: 30,
      taxas_portuarias_usd: 15,
      outras_despesas_usd: 10,
      reintegra_percent: 1.5,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 15,
      exchangeRate: 5.2
    };

    const resultado = calculateExportCost(inputs);

    // Verificar se BRL = USD * taxa de câmbio
    expect(resultado.secao1.valor_mercadoria.brl).toBeCloseTo(
      resultado.secao1.valor_mercadoria.usd * inputs.exchangeRate, 2
    );
    expect(resultado.secao2.total_custos.brl).toBeCloseTo(
      resultado.secao2.total_custos.usd * inputs.exchangeRate, 2
    );
    expect(resultado.secao3.total_beneficios.brl).toBeCloseTo(
      resultado.secao3.total_beneficios.usd * inputs.exchangeRate, 2
    );
  });

  test('deve calcular corretamente para eletrônicos (caso real)', () => {
    const inputs: ExportCostInput = {
      ncm: '85171300',
      valor_fob_usd: 500,
      frete_internacional_usd: 45,
      seguro_usd: 8,
      frete_interno_usd: 25,
      taxas_portuarias_usd: 20,
      outras_despesas_usd: 12,
      reintegra_percent: 1.5,
      drawback_percent: 0,
      markup_desejado: 25,
      margem_lucro: 20,
      exchangeRate: 5.0
    };

    const resultado = calculateExportCost(inputs);

    // Verificações específicas para eletrônicos
    expect(resultado.secao1.valor_mercadoria.usd).toBe(500);
    expect(resultado.secao2.total_custos.usd).toBe(110); // 45+8+25+20+12
    expect(resultado.secao3.credito_reintegra.usd).toBe(7.5); // 500 * 1.5%
    expect(resultado.secao4.receita_liquida.usd).toBe(397.5); // 500 - 110 + 7.5
    expect(resultado.status).toBe('valido');
  });

  test('deve gerar alertas para alta carga de custos', () => {
    const inputs: ExportCostInput = {
      valor_fob_usd: 1000,
      frete_internacional_usd: 250, // 25% do FOB
      seguro_usd: 50,
      frete_interno_usd: 100,
      taxas_portuarias_usd: 75,
      outras_despesas_usd: 25,
      reintegra_percent: 1.0,
      drawback_percent: 0,
      markup_desejado: 20,
      margem_lucro: 15,
      exchangeRate: 5.0
    };

    const resultado = calculateExportCost(inputs);
    const alertaCustos = resultado.alertas.find(a => a.mensagem.includes('Custos representam'));
    
    expect(alertaCustos).toBeDefined();
    expect(alertaCustos?.tipo).toBe('aviso');
  });

  console.log('✅ Todos os testes do motor de cálculo de exportação passaram!');
}); 