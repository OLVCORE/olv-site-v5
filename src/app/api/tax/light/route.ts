import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function fetchIBPT(ncm: string, uf: string) {
  try {
    const url = `https://ibpt.nfe.io/ncm/${uf.toLowerCase()}/${ncm}.json`;
    const res = await fetch(url, {
      timeout: 10000, // 10 second timeout
      headers: {
        'User-Agent': 'OLV-Internacional-Tax-Calculator'
      }
    });
    
    if (!res.ok) {
      if (res.status === 404) {
        return null; // NCM not found
      }
      throw new Error(`IBPT API error: ${res.status}`);
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching IBPT data:', error);
    return null;
  }
}

function validateInputs(ncm: string | null, uf: string, value: number) {
  const errors: string[] = [];
  
  if (!ncm) {
    errors.push('NCM é obrigatório');
  } else if (!/^\d{8}$/.test(ncm)) {
    errors.push('NCM deve conter exatamente 8 dígitos numéricos');
  }
  
  if (!uf || !/^[A-Z]{2}$/.test(uf)) {
    errors.push('UF deve conter exatamente 2 letras maiúsculas');
  }
  
  if (isNaN(value) || value <= 0) {
    errors.push('Valor deve ser um número maior que zero');
  }
  
  if (value > 10000000) {
    errors.push('Valor deve ser menor que 10 milhões USD');
  }
  
  return errors;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ncm = searchParams.get('ncm');
    const uf = (searchParams.get('uf') || '').toUpperCase();
    const value = parseFloat(searchParams.get('value') || '0');

    // Validate inputs
    const validationErrors = validateInputs(ncm, uf, value);
    if (validationErrors.length > 0) {
      return Response.json({ 
        error: validationErrors.join('; '),
        details: validationErrors 
      }, { status: 400 });
    }

    // Fetch tax data from IBPT
    const data = await fetchIBPT(ncm!, uf);
    if (!data) {
      return Response.json({ 
        error: 'NCM não encontrado na base de dados IBPT',
        ncm,
        uf,
        suggestion: 'Verifique se o código NCM está correto ou consulte a tabela NCM oficial'
      }, { status: 404 });
    }

    // Parse tax rates with fallbacks
    const federalRate = parseFloat(data.federalImportado ?? data.federal ?? '0') || 0;
    const estadualRate = parseFloat(data.estadual ?? '0') || 0;
    const municipalRate = parseFloat(data.municipal ?? '0') || 0;

    // Calculate tax amounts
    const federalTax = (value * federalRate) / 100;
    const estadualTax = (value * estadualRate) / 100;
    const municipalTax = (value * municipalRate) / 100;
    const totalTax = federalTax + estadualTax + municipalTax;

    // Validate calculated values
    if (isNaN(totalTax) || totalTax < 0) {
      return Response.json({ 
        error: 'Erro no cálculo dos impostos',
        details: 'Valores calculados são inválidos'
      }, { status: 500 });
    }

    return Response.json({
      ncm,
      uf,
      baseValue: value,
      rates: {
        federal: Number(federalRate.toFixed(4)),
        estadual: Number(estadualRate.toFixed(4)),
        municipal: Number(municipalRate.toFixed(4)),
      },
      amounts: {
        federal: Number(federalTax.toFixed(2)),
        estadual: Number(estadualTax.toFixed(2)),
        municipal: Number(municipalTax.toFixed(2)),
      },
      totalTax: Number(totalTax.toFixed(2)),
      effectiveRate: Number(((totalTax / value) * 100).toFixed(2)),
      source: 'ibpt.nfe.io',
      timestamp: new Date().toISOString(),
      disclaimer: 'Estimativa simplificada baseada na tabela IBPT. Não inclui regimes especiais, ICMS ST, nem taxas locais. Consulte um contador especializado para cálculos precisos.'
    });
    
  } catch (error) {
    console.error('Tax calculation API error:', error);
    return Response.json({ 
      error: 'Erro interno do servidor',
      message: 'Falha ao processar cálculo tributário'
    }, { status: 500 });
  }
} 