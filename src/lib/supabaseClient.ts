"use client";

import { createClient } from '@supabase/supabase-js';

declare const process: { env: Record<string, string | undefined> };

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const supabase = typeof window !== 'undefined' && supabaseUrl && supabaseAnon
  ? createClient(supabaseUrl, supabaseAnon, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : ({} as any); 