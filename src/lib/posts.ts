import supabase from './supabaseAdmin';

export interface Post {
  slug: string;
  title: string;
  excerpt: string | null;
  content_mdx: string;
  category: string | null;
  cover_url: string | null;
  author: string | null;
  published_at: string;
  source_name?: string | null;
  source_url?: string | null;
}

export async function getAllPosts(limit = 12): Promise<Post[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('posts')
    .select('*', { head: false })
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit)
    .abortSignal(undefined)
    ;
  if (error) {
    console.error('getAllPosts error', error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();
  if (error) {
    console.error('getPostBySlug error', error.message);
    return null;
  }
  return data as Post;
}

export async function getPostsByCategory(category: string, limit = 10, page = 1): Promise<Post[]> {
  if (!supabase) return [];
  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .order('published_at', { ascending: false })
    .range(from, to);
  if (error) {
    console.error('getPostsByCategory error', error.message);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getCategoryCounts() {
  if (!supabase) return {};
  const { data, error } = await supabase
    .from('posts')
    .select('category')
    .eq('status', 'published');
  if (error) {
    console.error('getCategoryCounts error', error.message);
    return {};
  }
  const counts: Record<string, number> = {};
  (data ?? []).forEach((post: { category: string | null }) => {
    const cat = post.category || 'Outros';
    counts[cat] = (counts[cat] || 0) + 1;
  });
  return counts;
} 