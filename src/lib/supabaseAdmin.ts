import { createClient } from '@supabase/supabase-js';

// Admin client (service role key) – created only if all required env vars exist.
// This prevents build-time crashes on Vercel Preview/CI when secrets are absent.

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SERVICE_ROLE_KEY;

let supabase: any = null;

if (url && key) {
  supabase = createClient(url, key, { auth: { persistSession: false } });
}

export default supabase;
export { supabase };

// Observação: rotas que dependem dele devem tratar supabase === null como modo degradado.
