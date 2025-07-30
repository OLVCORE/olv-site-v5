'use client';
import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import useSWRInfinite from 'swr/infinite';


export const dynamic = 'force-dynamic';

function Results() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const PAGE_SIZE = 20;

  const getKey = (pageIndex: number, previousPageData: { hasMore: boolean } | null) => {
    if (!q) return null; // no query
    if (previousPageData && !previousPageData.hasMore) return null; // reached end
    const offset = pageIndex * PAGE_SIZE;
    return `/api/search?q=${encodeURIComponent(q)}&limit=${PAGE_SIZE}&offset=${offset}`;
  };

  const { data, setSize, isLoading } = useSWRInfinite(getKey, (url: string) => fetch(url).then((r) => r.json() as Promise<{results: any[]; hasMore: boolean}>));

  const results = data ? data.flatMap((p: any) => p.results) : [];
  const hasMore = data ? data[data.length - 1]?.hasMore : false;

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-white">Resultados para "{q}"</h1>
      {q === '' && <p className="text-gray-300">Digite um termo na busca.</p>}
      {q && (
        <>
          {results.length === 0 && !isLoading && <p className="text-gray-300">Nenhum resultado encontrado.</p>}
          <ul className="space-y-4">
            {results.map((item: any) => (
              <li key={item.slug} className="border-b border-gray-700 pb-4">
                <Link href={item.slug} className="text-accent hover:underline font-semibold">
                  {item.title}
                </Link>
                {item.excerpt && <p className="text-gray-300 mt-1">{item.excerpt}</p>}
              </li>
            ))}
          </ul>
          {hasMore && (
            <button onClick={() => setSize(s => s + 1)} className="mt-6 btn btn-primary">
              {isLoading ? 'Carregando...' : 'Carregar mais'}
            </button>
          )}
        </>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Suspense fallback={<p className="p-8 text-white">Carregando...</p>}>
        <Results />
      </Suspense>

    </div>
  );
} 