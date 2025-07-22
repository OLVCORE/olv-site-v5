import { NextRequest } from 'next/server';
import { getMarketRate } from '@/lib/marketRates';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const origin = (searchParams.get('origin') || '').toUpperCase();
  const destination = (searchParams.get('destination') || '').toUpperCase();
  const modal = (searchParams.get('modal') || '').toLowerCase();

  if(!origin || !destination || !modal){
    return Response.json({error:'Missing params'}, {status:400});
  }

  const rate = getMarketRate(origin,destination,modal);
  if(!rate){
    return Response.json({error:'Rate not found'}, {status:404});
  }

  return Response.json(rate, {status:200});
} 