"use client";
import React, { useState, useRef } from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const fetcher = (url: string) => fetch(url).then((r) => {
  if (!r.ok) {
    throw new Error('Failed to fetch search results');
  }
  return r.json() as Promise<{results: any[]}>;
});

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { data, error: swrError } = useSWR(
    query.length > 1 ? `/api/search?q=${encodeURIComponent(query)}` : null, 
    fetcher,
    {
      onError: (err) => {
        console.error('Search error:', err);
        setError('Erro na busca. Tente novamente.');
      },
      onSuccess: () => {
        setError(null);
      }
    }
  );
  
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
      e.preventDefault();
      if (data?.results && data.results[active]) {
        sessionStorage.setItem('lastSearchTerm', query);
        router.push(data.results[active].slug);
        setQuery('');
      } else if (query.trim().length > 0) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setQuery('');
      }
    } else if (e.key === 'Escape') {
      setQuery('');
      setError(null);
      inputRef.current?.blur();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setActive(0); // Reset active item when query changes
    
    // Clear error if user is typing
    if (error) {
      setError(null);
    }
  };

  return (
    <div className="relative w-64 md:w-80">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar..."
          ref={inputRef}
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full px-3 py-2 pr-8 rounded bg-gray-700 text-white placeholder-gray-300 outline-none border border-gray-600 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          data-testid="global-search-input"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setError(null);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            data-testid="clear-search"
          >
            ✕
          </button>
        )}
      </div>

      {error && (
        <div className="absolute z-50 mt-2 w-full bg-red-500/10 border border-red-500/30 rounded p-2 text-red-400 text-sm">
          {error}
        </div>
      )}

      {query.length > 1 && !error && (
        <>
          {data?.results?.length > 0 ? (
            <ul className="absolute z-50 mt-2 w-full bg-gray-800 rounded shadow-lg max-h-72 overflow-auto border border-gray-600" data-testid="search-results">
              {data.results.map((item, idx) => {
                const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                const highlight = (text: string) => {
                  if (!text) return '';
                  return text.split(regex).map((part, i) => (
                    regex.test(part) ? 
                      <mark key={i} className="bg-purple-600/40 text-gray-100 font-bold">{part}</mark> : 
                      part
                  ));
                };
                
                return (
                  <li 
                    key={item.slug} 
                    className={`${idx === active ? 'bg-gray-700' : ''} px-3 py-2 hover:bg-gray-700 cursor-pointer`}
                    data-testid={`search-result-${idx}`}
                  >
                    <Link 
                      href={item.slug} 
                      onClick={() => { 
                        sessionStorage.setItem('lastSearchTerm', query); 
                        setQuery(''); 
                      }} 
                      className="block"
                    >
                      <div className="text-white">
                        {highlight(item.title)}
                      </div>
                      {item.excerpt && (
                        <p className="text-sm text-gray-300 truncate mt-1">
                          {highlight(item.excerpt)}
                        </p>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : query.length > 1 && !data && !swrError ? (
            <div className="absolute z-50 mt-2 w-full bg-gray-800 rounded shadow-lg border border-gray-600 p-3 text-gray-300 text-sm">
              Buscando...
            </div>
          ) : data && data.results.length === 0 ? (
            <div className="absolute z-50 mt-2 w-full bg-gray-800 rounded shadow-lg border border-gray-600 p-3 text-gray-300 text-sm" data-testid="no-results">
              Nenhum resultado encontrado para "{query}"
            </div>
          ) : null}
        </>
      )}
    </div>
  );
} 