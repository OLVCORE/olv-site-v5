import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

// Função para normalizar texto (igual ao frontend)
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s]/g, ' ') // Remove pontuação
    .replace(/\s+/g, ' ') // Normaliza espaços
    .trim();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || '';
  const limit = parseInt(searchParams.get('limit') || '10');
  
  if (!q.trim()) {
    return NextResponse.json({ results: [] });
  }

  // Check if Supabase is available
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
  }

  try {
    // Busca usando full-text search do PostgreSQL
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${q}%,excerpt.ilike.%${q}%,category.ilike.%${q}%`)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Blog search error:', error);
      return NextResponse.json({ error: 'Erro na busca' }, { status: 500 });
    }

    // Filtro adicional no backend para melhor precisão
    const normalizedQuery = normalizeText(q);
    const searchTerms = normalizedQuery.split(' ').filter(term => term.length > 0);
    
    const filteredResults = (data || []).filter(post => {
      const normalizedTitle = normalizeText(post.title || '');
      const normalizedExcerpt = normalizeText(post.excerpt || '');
      const normalizedCategory = normalizeText(post.category || '');
      
      // Busca por todos os termos (AND logic)
      return searchTerms.every(term => 
        normalizedTitle.includes(term) ||
        normalizedExcerpt.includes(term) ||
        normalizedCategory.includes(term)
      );
    });

    return NextResponse.json({ 
      results: filteredResults,
      total: filteredResults.length,
      query: q
    });

  } catch (error) {
    console.error('Blog search error:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}