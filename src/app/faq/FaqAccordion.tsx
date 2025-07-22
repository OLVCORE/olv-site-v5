"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { motion, AnimatePresence } from 'framer-motion';

export interface AnswerItem { title: string; slug: string; updated?: string; }

interface Props {
  grouped: Record<string, AnswerItem[]>;
  initialOpen?: string[]; // categorias inicialmente abertas
  search?: string; // termo de busca
  startDate?: string; // filtro inicial YYYY-MM-DD
  endDate?: string; // filtro final
  orderMap?: Record<string, number>; // ranking por popularidade (menor valor = mais popular)
  onChange?: (openCats: string[]) => void;
}

export default function FaqAccordion({ grouped, initialOpen = [], search = '', startDate, endDate, orderMap, onChange }: Props) {
  const [openCats, setOpenCats] = useState<string[]>(initialOpen);

  // sync external change (hash/localStorage)
  useEffect(() => {
    setOpenCats(initialOpen);
  }, [initialOpen]);

  const toggle = (cat: string) => {
    const next = openCats.includes(cat)
      ? openCats.filter((c) => c !== cat)
      : [...openCats, cat];
    setOpenCats(next);
    onChange?.(next);
  };

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([cat, items]) => {
        // filtra itens pelo termo de busca
        let filtered = search.trim()
          ? items.filter((i) => i.title.toLowerCase().includes(search.toLowerCase()))
          : items;
        // filtra por intervalo de data se fornecido
        if (startDate || endDate) {
          const startMs = startDate ? Date.parse(startDate) : -Infinity;
          const endMs = endDate ? Date.parse(endDate) + 86_399_999 : Infinity; // até fim do dia
          filtered = filtered.filter((i) => {
            if (!i.updated) return false;
            const ts = Date.parse(i.updated);
            return ts >= startMs && ts <= endMs;
          });
        }
        // ordena
        if (orderMap) {
          filtered = filtered.sort((a, b) => (orderMap[a.slug] ?? 1e9) - (orderMap[b.slug] ?? 1e9));
        } else {
          // por data desc (recentes)
          filtered = filtered.sort((a, b) => {
            const da = a.updated ? Date.parse(a.updated) : 0;
            const db = b.updated ? Date.parse(b.updated) : 0;
            return db - da;
          });
        }
        if (!filtered.length) return null; // esconde categoria vazia

        const isOpen = openCats.includes(cat);

        return (
          <div key={cat} className="border border-[#2a3448] rounded-lg">
            <button
              className="w-full text-left px-4 py-3 font-semibold flex justify-between items-center hover:bg-[#2a3448]/40"
              onClick={() => toggle(cat)}
            >
              <span>{cat}</span>
              <span>{isOpen ? '−' : '+'}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.ul
                  key="list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="px-6 py-3 space-y-2 overflow-hidden"
                >
                  {filtered.map((a) => (
                    <li key={a.slug} className="flex items-center gap-2">
                      <Link
                        href={`/answers/${a.slug}`}
                        className="text-[#d4af37] hover:underline"
                        onClick={() => {
                          fetch('/api/faq/view', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ slug: a.slug }),
                          }).catch(() => {});
                        }}
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: search.trim()
                              ? a.title.replace(new RegExp(`(${search})`, 'ig'), '<mark>$1</mark>')
                              : a.title,
                          }}
                        />
                      </Link>
                      {a.updated && (
                        <Tippy content={`Atualizado em ${new Date(a.updated).toLocaleDateString('pt-BR')}`}>
                          <span className="text-xs text-gray-400 border border-[#2a3448] px-1.5 py-0.5 rounded cursor-help">
                            Atualizado{' '}
                            {new Date(a.updated).toLocaleDateString('pt-BR', {
                              month: '2-digit',
                              year: '2-digit',
                            })}
                          </span>
                        </Tippy>
                      )}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
} 