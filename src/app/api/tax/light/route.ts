import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function fetchIBPT(ncm: string, uf: string) {
  const url = `https://ibpt.nfe.io/ncm/${uf.toLowerCase()}/${ncm}.json`;
  const res = await fetch(url);
  if (!res.ok) return null;
  return res.json();
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ncm = searchParams.get('ncm');
  const uf = (searchParams.get('uf') || 'sp').toUpperCase();
  const value = parseFloat(searchParams.get('value') || '0');

  if (!ncm || !value) {
    return Response.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const data = await fetchIBPT(ncm, uf);
  if (!data) {
    return Response.json({ error: 'NCM não encontrado' }, { status: 404 });
  }

  const federalRate = parseFloat(data.federalImportado ?? data.federal ?? '0');
  const estadualRate = parseFloat(data.estadual ?? '0');
  const municipalRate = parseFloat(data.municipal ?? '0');

  const federalTax = (value * federalRate) / 100;
  const estadualTax = (value * estadualRate) / 100;
  const municipalTax = (value * municipalRate) / 100;

  return Response.json({
    ncm,
    uf,
    baseValue: value,
    rates: {
      federal: federalRate,
      estadual: estadualRate,
      municipal: municipalRate,
    },
    amounts: {
      federal: federalTax,
      estadual: estadualTax,
      municipal: municipalTax,
    },
    totalTax: federalTax + estadualTax + municipalTax,
    source: 'ibpt.nfe.io',
    disclaimer:
      'Estimativa simplificada baseada na tabela IBPT. Não inclui regimes especiais, ICMS ST, nem taxas locais.'
  });
} 