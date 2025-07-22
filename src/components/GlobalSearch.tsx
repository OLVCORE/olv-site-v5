"use client";
import React, { useState, useRef } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then((r) => r.json() as Promise<{results: any[]}>);

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const { data } = useSWR(query.length > 1 ? `/api/search?q=${encodeURIComponent(query)}` : null, fetcher);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (data?.results) setActive((prev) => Math.min(prev + 1, data.results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (data?.results) setActive((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter') {
      if (data?.results && data.results[active]) {
        sessionStorage.setItem('lastSearchTerm', query);
        router.push(data.results[active].slug);
        setQuery('');
      } else if (query.trim().length > 0) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setQuery('');
      }
    }
  };

  return (
    <div className="relative w-64 md:w-80">
      <input
        type="text"
        placeholder="Buscar..."
        ref={inputRef}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="px-3 py-2 rounded bg-gray-700 text-white placeholder-gray-300 outline-none border border-gray-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
      />
      {data?.results?.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-surface rounded shadow-lg max-h-72 overflow-auto">
          {data.results.map((item, idx) => {
            const regex = new RegExp(`(${query})`, 'gi');
            const highlight = (text: string) => text.split(regex).map((part, i) => (
              regex.test(part) ? <mark key={i} className="bg-purple-600/40 text-gray-100 font-bold">{part}</mark> : part
            ));
            return (
              <li key={item.slug} className={`${idx === active ? 'bg-surface-light' : ''} px-3 py-2 hover:bg-surface-light`}>
                <Link href={item.slug} onClick={() => { sessionStorage.setItem('lastSearchTerm', query); setQuery(''); }} className="block">
                  <div>
                    {highlight(item.title)}
                  </div>
                  {item.excerpt && (
                    <p className="text-sm text-on-surface/70 truncate">{highlight(item.excerpt)}</p>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
} 