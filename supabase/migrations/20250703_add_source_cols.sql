-- Migration: add source attribution columns to posts
alter table posts
  add column if not exists source_name text,
  add column if not exists source_url text; 