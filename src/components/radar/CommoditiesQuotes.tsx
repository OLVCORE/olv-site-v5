"use client";

import useSWR from 'swr';
import Icon from '../icons/Icon';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function CommoditiesQuotes() {
  const { data, error } = useSWR('/api/radar/commodities', fetcher, {
    refreshInterval: 300_000,
  });

  if (error)
    return <p className="text-red-500">Erro ao carregar preços de commodities.</p>;

  const prices = data?.prices ?? {};

  const rows = [
    { key: 'BZ=F', label: 'Petróleo Brent', icon: '/icons/oil.svg' },
    { key: 'GC=F', label: 'Ouro (Oz)', icon: '/icons/gold.svg' },
    { key: 'DC=F', label: 'Aço Dalian', icon: '/icons/steel.svg' },
    { key: 'ALI=F', label: 'Alumínio', icon: '/icons/aluminum.svg' },
    { key: 'ZW=F', label: 'Trigo', icon: '/icons/wheat.svg' },
    { key: 'ZC=F', label: 'Milho', icon: '/icons/corn.svg' },
    { key: 'KC=F', label: 'Café', icon: '/icons/coffee.svg' },
    { key: 'CT=F', label: 'Algodão', icon: '/icons/cotton.svg' },
  ];

  const cards = rows.map((r) => ({
    ...r,
    value: prices[r.key] ?? prices[r.key.replace('=F', 'USD')] ?? null,
  }));

  const formatBRL = (v: number) =>
    typeof v === 'number'
      ? v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      : '—';

  const updatedAt = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className="mt-6">
      {updatedAt && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
          Atualizado às {updatedAt}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm md:text-base">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
                Commodity
              </th>
              <th className="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-300">
                Preço (BRL)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
            {cards.map((c) => (
              <tr key={c.label} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <td className="px-4 py-2 flex items-center gap-2 text-gray-900 dark:text-gray-100 whitespace-nowrap">
                  <Icon src={c.icon} alt="icon" size="xs" className="text-sky-600 dark:text-sky-400" />
                  {c.label}
                </td>
                <td className="px-4 py-2 text-right text-gray-900 dark:text-gray-100 font-medium">
                  {c.value !== null ? formatBRL(c.value as number) : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 