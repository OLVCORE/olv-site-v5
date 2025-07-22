# OLV Site

Website institucional da OLV International.

## Últimas atualizações

- Implementação de responsividade mobile
- Ajustes no menu hamburger
- Otimizações de performance

## Blog Auto-Ingest Pipeline

1. Create table & RLS in Supabase

```sql
-- migrations/20250703_create_posts.sql
create table if not exists posts (
  slug text primary key,
  title text not null,
  excerpt text,
  content_mdx text not null,
  category text,
  cover_url text,
  author text default 'Equipe OLV',
  published_at timestamptz default now(),
  status text default 'published'
);
alter table posts enable row level security;
create policy if not exists "public posts" on posts
  for select using (status = 'published');
```

Apply via Supabase SQL editor or CLI `supabase db push`.

2. Environment variables

Create `.env.local` (exclude from VCS) with:

```
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
OPENAI_API_KEY=sk-...
```

3. Local test

```
npm run ts-node scripts/dailyBlogIngest.ts
```

4. Production cron

Schedule an Edge Function / bash job in Supabase:

```
cron: 0 8 * * *
command: node scripts/dailyBlogIngest.js
```
(08h UTC ≈ 05h BRT)

The pipeline fetches up to 2 articles per feed per run, summarises via GPT-4o, and inserts to `posts`. Pages will appear automatically thanks to ISR.
