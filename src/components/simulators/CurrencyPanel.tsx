"use client";
import React, { useEffect, useState } from 'react';

interface Rates { [k: string]: number | null }

export default function CurrencyPanel() {
  const [rates, setRates] = useState<Rates>({});

  useEffect(() => {
    fetch('/api/radar/quotes?symbols=USD,EUR,GBP')
      .then((r) => r.json())
      .then((j) => setRates(j.rates || {}))
      .catch(() => {});
  }, []);

  const symbols = ['USD','EUR','GBP'];
  return (
    <div className="mb-6 grid grid-cols-3 gap-4 text-sm">
      {symbols.map(sym=>{
        const v=rates[sym];
        return (
          <div key={sym} className="bg-gray-800/30 rounded p-2 flex flex-col items-center">
            <span className="font-semibold text-accent">{sym}</span>
            <span className="mt-1">{typeof v==='number'? v.toFixed(2):'—'}</span>
          </div>
        );
      })}
    </div>
  );
} 