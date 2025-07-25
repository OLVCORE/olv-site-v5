export const runtime = 'nodejs';
// Removido revalidate para evitar conflito com SWR
// export const revalidate = 600; // 10 min

import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const symbols = 'BZ=F,GC=F,DC=F,ALI=F,ZW=F,ZC=F,KC=F,CT=F';
    const key = process.env.FMP_API_KEY ?? 'demo';
    const res = await fetch(`https://financialmodelingprep.com/api/v3/quote/${symbols}?apikey=${key}`);
    const json = await res.json(); // array of quotes
    const pricesUSD: Record<string, number> = {};

    // some symbols come back as BZUSD instead of BZ=F, etc.
    const alias: Record<string, string> = {
      'BZUSD': 'BZ=F',
      'GCUSD': 'GC=F',
      'DCUSD': 'DC=F',
      'ALIUSD': 'ALI=F',
      'ZWUSD': 'ZW=F',
      'ZCUSD': 'ZC=F',
      'KCUSD': 'KC=F',
      'CTUSD': 'CT=F',
    };

    json.forEach((q: any) => {
      const key = alias[q.symbol] ?? q.symbol;
      pricesUSD[key] = q.price;
    });

    // convert to BRL using Open ER API USD rate
    let usdToBrl = 0;
    try {
      const fx = await fetch('https://open.er-api.com/v6/latest/BRL').then(r=>r.json());
      usdToBrl = fx && fx.result==='success' ? 1/(fx.rates.USD as number):0;
    }catch{}

    const pricesBRL: Record<string, number> = {};
    Object.entries(pricesUSD).forEach(([sym,val])=>{
      pricesBRL[sym]= usdToBrl? (val as number)*usdToBrl : val;
    });

    // Headers para evitar cache e garantir dados frescos
    return Response.json(
      { prices: pricesBRL, base: 'BRL', updatedAt: Date.now(), source:'financialmodelingprep.com' },
      {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Updated-At': Date.now().toString(),
        }
      }
    );
  } catch (e) {
    return Response.json({ error: 'failed', message: (e as Error).message }, { status: 500 });
  }
} 