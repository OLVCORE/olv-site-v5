"use client";

import useSWR from 'swr';
import Icon from '../icons/Icon';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function formatBRL(value: number | null | undefined) {
  return typeof value === 'number'
    ? value.toLocaleString('pt-BR', { 
        style: 'currency', 
        currency: 'BRL',
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      })
    : '—';
}

type Props = {
  symbols?: string[];
};

export default function RealtimeQuotes({ symbols }: Props) {
  const defaultList = [
    'USD',
    'EUR',
    'GBP',
    'JPY',
    'AUD',
    'CAD',
    'CHF',
    'CNY',
    'BTC',
  ];

  const symbolList = symbols && symbols.length > 0 ? symbols : defaultList;

  // Adicionar timestamp para forçar atualizações
  const timestamp = Math.floor(Date.now() / 180000); // Muda a cada 3 minutos
  const apiUrl = `/api/radar/quotes?symbols=${symbolList.join(',')}&t=${timestamp}`;

  const { data, isValidating } = useSWR(
    apiUrl,
    fetcher,
    {
      refreshInterval: 180_000, // 3 minutos
      revalidateOnFocus: true, // Revalidar quando a aba ganha foco
      revalidateOnReconnect: true, // Revalidar quando reconecta
      errorRetryCount: 3, // Tentar 3 vezes em caso de erro
      errorRetryInterval: 5000, // Esperar 5s entre tentativas
      keepPreviousData: false, // Não manter dados anteriores
    }
  );

  const rates = data?.rates ?? {};

  const labelMap: Record<string, string> = {
    USD: 'Dólar (USD)',
    EUR: 'Euro (EUR)',
    GBP: 'Libra Esterlina (GBP)',
    JPY: 'Iene (JPY)',
    AUD: 'Dólar Australiano (AUD)',
    CAD: 'Dólar Canadense (CAD)',
    CHF: 'Franco Suíço (CHF)',
    CNY: 'Yuan (CNY)',
    BTC: 'Bitcoin (BTC)',
  };

  // Formatar horário da última atualização
  const updatedAt = data?.updatedAt
    ? new Date(data.updatedAt).toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    : null;

  return (
    <div className="overflow-x-auto">
      {/* Indicador de status e horário */}
      <div className="flex items-center justify-between mb-2 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span>
            {isValidating ? '🔄 Atualizando...' : '✅ Atualizado'}
          </span>
          {isValidating && (
            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-500"></div>
          )}
        </div>
        {updatedAt && (
          <span>Última atualização: {updatedAt}</span>
        )}
      </div>

      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm md:text-base">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              scope="col"
              className="px-4 py-2 text-left font-semibold text-gray-900 dark:text-gray-300 whitespace-nowrap"
            >
              Moeda
            </th>
            <th
              scope="col"
              className="px-4 py-2 text-right font-semibold text-gray-900 dark:text-gray-300"
            >
              Cotação (BRL)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {symbolList.map((sym) => (
            <tr key={sym} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="px-4 py-2 flex items-center gap-2 text-black dark:text-gray-100 whitespace-nowrap">
                <Icon
                  src="/icons/currency-exchange.svg"
                  alt="icon"
                  size="xs"
                  className="text-accent"
                />
                {labelMap[sym]}
              </td>
              <td className="px-4 py-2 text-right text-black dark:text-gray-100 font-medium">
                {formatBRL(rates[sym])}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Rodapé com fontes de dados */}
      <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span>📊 Fontes:</span>
            <span>💱 Moedas: European Central Bank (ECB)</span>
            <span>₿ Crypto: CoinGecko</span>
          </div>
          <span className="text-xs opacity-75">
            Dados em tempo real • Atualização automática
          </span>
        </div>
      </div>
    </div>
  );
} 