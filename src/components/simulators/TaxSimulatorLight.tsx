'use client';

import { useState } from 'react';
import SimulatorDisclaimer from './SimulatorDisclaimer';

interface Result {
  rates: {
    federal: number;
    estadual: number;
    municipal: number;
  };
  amounts: {
    federal: number;
    estadual: number;
    municipal: number;
  };
  totalTax: number;
}

export default function TaxSimulatorLight() {
  const [ncm, setNcm] = useState('90189099');
  const [uf, setUf] = useState('SP');
  const [value, setValue] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Result | null>(null);
  const [error, setError] = useState('');

  function validateInputs() {
    if (!/^\d{8}$/.test(ncm)) {
      return 'NCM deve conter 8 dígitos numéricos';
    }
    if (!/^[A-Z]{2}$/.test(uf)) {
      return 'UF deve ter 2 letras';
    }
    if (value <= 0) {
      return 'Valor FOB deve ser maior que zero';
    }
    return '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationMsg = validateInputs();
    if (validationMsg) {
      setError(validationMsg);
      return;
    }
    setLoading(true);
    setError('');
    setData(null);
    try {
      const res = await fetch(`/api/tax/light?ncm=${ncm}&uf=${uf}&value=${value}`);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt);
      }
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError('Falha ao calcular impostos: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Disclaimer Compacto */}
      <SimulatorDisclaimer variant="compact" />
      
      <h2 className="text-xl font-semibold">Simulador Tributário Comex (Light)</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
        <label className="flex flex-col text-sm col-span-1">
          NCM
          <input
            className="input"
            value={ncm}
            onChange={(e) => setNcm(e.target.value)}
          />
        </label>
        <label className="flex flex-col text-sm col-span-1">
          UF Destino
          <input
            className="input"
            value={uf}
            onChange={(e) => setUf(e.target.value.toUpperCase())}
          />
        </label>
        <label className="flex flex-col text-sm col-span-1">
          Valor FOB (USD)
          <input
            type="number"
            className="input"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </label>
        <button type="submit" className="col-span-3 btn btn-primary" disabled={loading}>
          {loading ? 'Calculando…' : 'Calcular'}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div className="mt-6 text-sm">
          <p>Alíquotas:</p>
          <ul className="list-disc ml-4">
            <li>Federal: {data.rates.federal}%</li>
            <li>Estadual: {data.rates.estadual}%</li>
            <li>Municipal: {data.rates.municipal}%</li>
          </ul>
          <p className="mt-4">Impostos (BRL equivalente):</p>
          <ul className="list-disc ml-4">
            <li>Federal: ${data.amounts.federal.toFixed(2)}</li>
            <li>Estadual: ${data.amounts.estadual.toFixed(2)}</li>
            <li>Municipal: ${data.amounts.municipal.toFixed(2)}</li>
          </ul>
          <p className="font-semibold mt-4">Total: ${data.totalTax.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
} 