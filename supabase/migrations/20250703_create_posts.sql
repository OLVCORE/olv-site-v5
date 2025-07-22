-- Migration: create posts table and RLS for blog

-- Create posts table for blog content
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

-- Enable Row Level Security
alter table posts enable row level security;

-- Allow anonymous select only for published posts
create policy if not exists "public posts" on posts
  for select using (status = 'published'); 