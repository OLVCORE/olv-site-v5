import { NextResponse } from 'next/server';
import supabase from '../../../../lib/supabaseAdmin';

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    if (!slug) return NextResponse.json({ error: 'slug required' }, { status: 400 });

    await supabase.from('faq_views').insert({ slug });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('FAQ view log error', err);
    return NextResponse.json({ error: 'server error' }, { status: 500 });
  }
} 