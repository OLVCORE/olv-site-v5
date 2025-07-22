-- Migration: create ingest_logs table for tracking blog ingestion

create table if not exists ingest_logs (
  id bigint primary key generated always as identity,
  created_at timestamptz default now(),
  source text not null,
  rss_title text,
  parsing_status text,
  parsing_error text,
  exec_time_ms integer,
  status text,
  message text,
  stderr text
);

-- Enable Row Level Security
alter table ingest_logs enable row level security;

-- Allow anonymous select for monitoring
create policy if not exists "public ingest_logs" on ingest_logs
  for select using (true);

-- Allow service role to insert logs
create policy if not exists "service_role ingest_logs" on ingest_logs
  for insert with check (true); 