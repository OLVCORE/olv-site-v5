"use client";

import React, { useEffect, useState } from 'react';
import InfoTooltip from '../ui/InfoTooltip';

const CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'CNY',
  'JPY',
  'ARS',
  'CLP',
  'MXN',
  'CAD',
  'AUD',
  'CHF',
  'BRL',
  'BTC',
] as const;

type Currency = typeof CURRENCIES[number];

type Rates = Record<string, number | null>;

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('100');
  const [from, setFrom] = useState<Currency>('USD');
  const [to, setTo] = useState<Currency>('BRL');
  const [rates, setRates] = useState<Rates>({});

  const fetchRates = async (syms: Currency[]) => {
    const unique = Array.from(new Set(syms.filter((s) => s !== 'BRL')));
    if (!unique.length) return;
    try {
      const res = await fetch(`/api/radar/quotes?symbols=${unique.join(',')}`);
      const json = await res.json();
      setRates((prev) => ({ ...prev, ...(json.rates as Rates) }));
    } catch (_) {}
  };

  useEffect(() => {
    fetchRates([from, to]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  const toNumber = (s: string) => parseFloat(s.replace(/,/g, '.')) || 0;
  const amt = toNumber(amount);
  const rateFrom = from === 'BRL' ? 1 : rates[from] ?? null;
  const rateTo = to === 'BRL' ? 1 : rates[to] ?? null;
  const converted = rateFrom && rateTo ? (amt * rateFrom) / rateTo : null;

  const fmt = (v: number, cur: Currency) => {
    if (cur === 'BTC') return v.toFixed(6) + ' BTC';
    return v.toLocaleString('en-US', {
      style: 'currency',
      currency: cur,
      minimumFractionDigits: 2,
    });
  };

  const PT_NAMES: Record<Currency, string> = {
    USD: 'Dólar Americano',
    EUR: 'Euro',
    GBP: 'Libra Esterlina',
    CNY: 'Yuan Chinês',
    JPY: 'Iene Japonês',
    ARS: 'Peso Argentino',
    CLP: 'Peso Chileno',
    MXN: 'Peso Mexicano',
    CAD: 'Dólar Canadense',
    AUD: 'Dólar Australiano',
    CHF: 'Franco Suíço',
    BRL: 'Real Brasileiro',
    BTC: 'Bitcoin',
  } as const;

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid md:grid-cols-2 gap-4">
        <label className="block text-sm font-medium text-gray-200 dark:text-accent-light">
          <span className="inline-flex items-center gap-1">Valor <InfoTooltip content="Valor a converter" /></span>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm text-gray-900 dark:text-white"
          />
        </label>
        <label className="block text-sm font-medium text-gray-200 dark:text-accent-light">
          <span>Moeda Origem</span>
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value as Currency)}
            className="w-full mt-1 rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm text-gray-900 dark:text-white"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium text-gray-200 dark:text-accent-light">
          <span>Moeda Destino</span>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value as Currency)}
            className="w-full mt-1 rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm text-gray-900 dark:text-white"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Resultado */}
      {converted !== null ? (
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">Resultado</p>
          <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
            {fmt(converted, to)}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{PT_NAMES[to]}</p>
        </div>
      ) : (
        <p className="text-sm text-yellow-500">Obtendo cotações...</p>
      )}

      {/* Glossário de Moedas */}
      <details className="text-sm text-accent">
        <summary className="cursor-pointer select-none">Glossário de Moedas</summary>
        <ul className="mt-2 grid grid-cols-2 gap-1 text-gray-300 dark:text-gray-400">
          {CURRENCIES.map((c) => (
            <li key={c}>
              <strong>{c}</strong> – {PT_NAMES[c]}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
} 