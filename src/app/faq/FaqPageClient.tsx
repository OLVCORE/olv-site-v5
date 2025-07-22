"use client";

import { useState, useEffect } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import FaqAccordion, { AnswerItem } from './FaqAccordion';

interface Props {
  grouped: Record<string, AnswerItem[]>;
}

export default function FaqPageClient({ grouped }: Props) {
  const [search, setSearch] = useState('');
  const [openCats, setOpenCats] = useState<string[]>([]);
  const [start, setStart] = useState(''); // yyyy-mm-dd
  const [end, setEnd] = useState('');
  const [sort, setSort] = useState<'recent' | 'popular'>('recent');
  const [orderMap, setOrderMap] = useState<Record<string, number> | undefined>();

  // init from hash/localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('faqOpenCats') || '[]');
    let initial: string[] = Array.isArray(saved) ? saved : [];
    const hash = window.location.hash.replace('#', '');
    if (hash) initial = Array.from(new Set([...initial, decodeURIComponent(hash)]));
    setOpenCats(initial);
  }, []);

  const handleChange = (cats: string[]) => {
    setOpenCats(cats);
    localStorage.setItem('faqOpenCats', JSON.stringify(cats));
    if (cats.length === 1) {
      history.replaceState(null, '', `#${encodeURIComponent(cats[0])}`);
    }
  };

  const expandAll = () => handleChange(Object.keys(grouped));
  const collapseAll = () => handleChange([]);

  // helper to set preset range
  const applyPreset = (days: number) => {
    const today = new Date();
    const from = new Date(today.getTime() - days * 24 * 60 * 60 * 1000);
    setStart(from.toISOString().slice(0, 10));
    setEnd(today.toISOString().slice(0, 10));
  };

  // fetch popular when sort or date range changes
  useEffect(() => {
    if (sort !== 'popular') {
      setOrderMap(undefined);
      return;
    }
    // compute days range (default 30)
    let days = 30;
    if (start) {
      const startMs = Date.parse(start);
      days = Math.max(1, Math.round((Date.now() - startMs) / (24 * 60 * 60 * 1000)));
    }
    fetch(`/api/faq/hot?days=${days}&limit=100`)
      .then((r) => r.json())
      .then((json) => {
        const map: Record<string, number> = {};
        json.items?.forEach((item: any, idx: number) => {
          map[item.slug] = idx;
        });
        setOrderMap(map);
      })
      .catch(() => {});
  }, [sort, start, end]);

  return (
    <MainLayout className="faq-page">
      <div className="main-content container py-10">
        <h1 className="text-3xl font-bold mb-6 text-accent">Perguntas Frequentes (FAQ)</h1>
        {/* Controles: busca + filtros (sticky) */}
        <div className="sticky top-0 z-10 bg-[#0f172a]/80 backdrop-blur pb-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="search"
              placeholder="Buscar pergunta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 px-4 py-2 rounded-md bg-[#1a2338] border border-[#2a3448] focus:border-accent focus:outline-none text-sm"
            />
            <div className="flex gap-2">
              <button
                className="text-xs px-3 py-1 rounded border border-[#2a3448] hover:bg-[#2a3448]/40"
                onClick={expandAll}
              >
                Expandir tudo
              </button>
              <button
                className="text-xs px-3 py-1 rounded border border-[#2a3448] hover:bg-[#2a3448]/40"
                onClick={collapseAll}
              >
                Recolher tudo
              </button>
              {/* sort buttons */}
              <button
                className={`text-xs px-3 py-1 rounded border border-[#2a3448] hover:bg-[#2a3448]/40 ${sort==='recent' ? 'bg-[#2a3448]/40' : ''}`}
                onClick={() => setSort('recent')}
              >
                Recentes
              </button>
              <button
                className={`text-xs px-3 py-1 rounded border border-[#2a3448] hover:bg-[#2a3448]/40 ${sort==='popular' ? 'bg-[#2a3448]/40' : ''}`}
                onClick={() => setSort('popular')}
              >
                Populares
              </button>
            </div>
          </div>
          {/* Date range filter */}
          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="px-3 py-1 rounded bg-[#1a2338] border border-[#2a3448] text-sm"
            />
            <span className="hidden md:inline">—</span>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="px-3 py-1 rounded bg-[#1a2338] border border-[#2a3448] text-sm"
            />
            <div className="flex gap-2 flex-wrap">
              {[
                { label: '30d', days: 30 },
                { label: '3m', days: 90 },
                { label: '12m', days: 365 },
              ].map((p) => (
                <button
                  key={p.label}
                  className="text-xs px-2 py-0.5 border border-[#2a3448] rounded hover:bg-[#2a3448]/40"
                  onClick={() => applyPreset(p.days)}
                >
                  {p.label}
                </button>
              ))}
              <button
                className="text-xs px-2 py-0.5 border border-[#2a3448] rounded hover:bg-[#2a3448]/40"
                onClick={() => {
                  setStart('');
                  setEnd('');
                }}
              >
                Limpar
              </button>
            </div>
          </div>
        </div>
        <FaqAccordion
          grouped={grouped}
          initialOpen={openCats}
          search={search}
          startDate={start}
          endDate={end}
          orderMap={orderMap}
          onChange={handleChange}
        />
      </div>
    </MainLayout>
  );
} 