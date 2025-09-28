// @ts-nocheck
import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Only create Supabase client if environment variables are available
const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
}) : null;

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Rate limiting store (in production, use Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 60; // 60 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userLimit = rateLimit.get(ip);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

export async function GET(req: NextRequest) {
  try {
    // Check if Supabase is available
    if (!supabase) {
      return Response.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    // Rate limiting
    const clientIP = getClientIP(req);
    if (!checkRateLimit(clientIP)) {
      return Response.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50); // Max 50 posts
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Validate parameters
    if (limit < 1 || offset < 0) {
      return Response.json(
        { error: 'Invalid pagination parameters' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('posts')
      .select('slug, title, excerpt, category, cover_url, author, published_at, status')
      .eq('status', 'published') // Only published posts
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (category) {
      query = query.eq('category', category);
    }

    if (search && search.trim().length > 0) {
      // Sanitize search input
      const sanitizedSearch = search.trim().replace(/[%_]/g, '\\$&');
      query = query.or(`title.ilike.%${sanitizedSearch}%,excerpt.ilike.%${sanitizedSearch}%`);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return Response.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      );
    }

    // Validate data before sending
    const validatedData = data?.map(post => ({
      slug: post.slug || '',
      title: post.title || 'Untitled',
      excerpt: post.excerpt || '',
      category: post.category || 'uncategorized',
      cover_url: post.cover_url || null,
      author: post.author || 'Anonymous',
      published_at: post.published_at || new Date().toISOString(),
    })) || [];

    return Response.json({
      posts: validatedData,
      pagination: {
        offset,
        limit,
        total: count || 0,
        hasMore: (data?.length || 0) === limit
      },
      meta: {
        timestamp: new Date().toISOString(),
        cached: false
      }
    });

  } catch (error) {
    console.error('Posts API error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return Response.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return Response.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return Response.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
} 