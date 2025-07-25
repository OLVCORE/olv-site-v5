export const runtime = 'nodejs';
// Removido revalidate para evitar conflito com SWR
// export const revalidate = 300; // 5 minutes

import { NextRequest } from 'next/server';

async function fetchFiatRate(symbol: string): Promise<number | null> {
  // Primary source: Open ER API (all rates in one payload cached globally)
  if (openErRatesCache && typeof openErRatesCache[symbol] === 'number') {
    return openErRatesCache[symbol];
  }

  // Fallback: exchangerate.host per-symbol
  try {
    const res = await fetch(`https://api.exchangerate.host/convert?from=${symbol}&to=BRL`);
    const json = await res.json();
    return typeof json?.result === 'number' ? json.result : null;
  } catch (_) {
    return null;
  }
}

async function fetchBtcRate(): Promise<number | null> {
  try {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
    const json = await res.json();
    return typeof json?.bitcoin?.brl === 'number' ? json.bitcoin.brl : null;
  } catch (_) {
    return null;
  }
}

// preload Open ER rates once per invocation runtime (10 min cache handled by ISR)
let openErRatesCache: Record<string, number> | null = null;
async function loadOpenErRates() {
  if (openErRatesCache) return openErRatesCache;
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/BRL');
    const json = await res.json();
    if (json?.result === 'success') {
      // JSON returns rates[sym] = value of sym per BRL (i.e., 1 BRL = 0.18 USD)
      // We need BRL per sym ⇒ invert
      openErRatesCache = Object.fromEntries(
        Object.entries(json.rates).map(([sym, rate]) => [sym, 1 / (rate as number)])
      );
      return openErRatesCache;
    }
  } catch (_) {}
  return null;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbols = (searchParams.get('symbols') || 'USD,EUR,BTC')
    .split(',')
    .map((s) => s.trim().toUpperCase());

  // Preload open ER cache
  await loadOpenErRates();

  const result: Record<string, number | null> = {};

  const fiatSymbols = symbols.filter((s) => s !== 'BTC');
  await Promise.all(
    fiatSymbols.map(async (sym) => {
      result[sym] = await fetchFiatRate(sym);
    })
  );

  if (symbols.includes('BTC')) {
    result['BTC'] = await fetchBtcRate();
  }

  // Headers para evitar cache e garantir dados frescos
  return Response.json(
    { rates: result, base: 'BRL', updatedAt: Date.now() },
    {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
        'X-Updated-At': Date.now().toString(),
      }
    }
  );
} 