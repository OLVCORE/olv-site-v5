"use client";
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import useSWR from 'swr';

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  cover_url?: string;
  author: string;
  published_at: string;
  category: string;
}

interface BlogSearchProps {
  posts: Post[];
}

// Função para remover acentos e normalizar texto para busca
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s]/g, ' ') // Remove pontuação
    .replace(/\s+/g, ' ') // Normaliza espaços
    .trim();
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [search, setSearch] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();

  // Busca local para fallback
  const localFilteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    
    const normalizedSearch = normalizeText(search);
    const searchTerms = normalizedSearch.split(' ').filter(term => term.length > 0);
    
    return posts.filter(post => {
      const normalizedTitle = normalizeText(post.title || '');
      const normalizedExcerpt = normalizeText(post.excerpt || '');
      const normalizedCategory = normalizeText(post.category || '');
      
      return searchTerms.every(term => 
        normalizedTitle.includes(term) ||
        normalizedExcerpt.includes(term) ||
        normalizedCategory.includes(term)
      );
    });
  }, [search, posts]);

  // Busca via API quando há mais de 2 caracteres
  const { data: apiResults } = useSWR(
    search.length > 2 ? `/api/blog-search?q=${encodeURIComponent(search)}&limit=10` : null,
    fetcher
  );

  // Usa resultados da API se disponível, senão usa busca local
  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    const results = apiResults?.results || localFilteredPosts;
    return results.slice(0, 8);
  }, [search, apiResults, localFilteredPosts]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        router.push(`/blog/${suggestions[selectedIndex].slug}`);
        setSearch('');
        setShowAutocomplete(false);
        setSelectedIndex(-1);
      } else if (suggestions.length > 0) {
        router.push(`/blog/${suggestions[0].slug}`);
        setSearch('');
        setShowAutocomplete(false);
        setSelectedIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false);
      setSelectedIndex(-1);
    }
  };

  const handleSuggestionClick = (post: Post) => {
    router.push(`/blog/${post.slug}`);
    setSearch('');
    setShowAutocomplete(false);
    setSelectedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setShowAutocomplete(true);
    setSelectedIndex(-1);
  };

  // Highlight do texto de busca
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const normalizedText = normalizeText(text);
    const normalizedQuery = normalizeText(query);
    const searchTerms = normalizedQuery.split(' ').filter(term => term.length > 0);
    
    let highlightedText = text;
    searchTerms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 font-semibold">$1</mark>');
    });
    
    return highlightedText;
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={search}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setShowAutocomplete(true)}
        onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
        placeholder="Buscar no blog..."
        className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
        autoComplete="off"
      />
      
      {showAutocomplete && suggestions.length > 0 && (
        <ul className="absolute z-50 left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {suggestions.map((post, idx) => (
            <li
              key={post.slug}
              className={`px-4 py-3 cursor-pointer border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${
                idx === selectedIndex 
                  ? 'bg-accent text-white' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onMouseDown={() => handleSuggestionClick(post)}
            >
              <div className="flex items-start gap-3">
                {post.cover_url && (
                  <img 
                    src={post.cover_url} 
                    alt={post.title}
                    className="w-12 h-12 object-cover rounded flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 
                    className="font-medium text-gray-900 dark:text-white truncate"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightText(post.title, search) 
                    }}
                  />
                  {post.excerpt && (
                    <p 
                      className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2"
                      dangerouslySetInnerHTML={{ 
                        __html: highlightText(post.excerpt, search) 
                      }}
                    />
                  )}
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span>{new Date(post.published_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
          
          {suggestions.length > 0 && (
            <li className="px-4 py-2 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900">
              Pressione Enter para ver mais resultados
            </li>
          )}
        </ul>
      )}
      
      <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
}