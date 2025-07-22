import { NextResponse } from 'next/server';
import supabase from '../../../../lib/supabaseAdmin';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const days = Number(searchParams.get('days') || '30');
  const limit = Number(searchParams.get('limit') || '10');

  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('faq_views')
    .select('slug')
    .gte('inserted_at', since);

  if (error) {
    console.error('FAQ hot error', error);
    return NextResponse.json({ error: 'db error' }, { status: 500 });
  }

  const counts: Record<string, number> = {};
  data?.forEach((row: any) => {
    counts[row.slug] = (counts[row.slug] || 0) + 1;
  });

  const sorted = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([slug, count]) => ({ slug, count }));

  return NextResponse.json({ since, items: sorted });
} 