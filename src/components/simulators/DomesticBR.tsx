"use client";
import { useState } from 'react';

export default function DomesticBR({ weightKg }: { weightKg: number }) {
  const DIST: Record<string, number> = {
    SP: 100, MG: 640, RJ: 450, ES: 850, PR: 500, SC: 750, RS: 1000,
    BA: 1500, DF: 1030, GO: 940, MT: 1400, MS: 900, PE: 2240, CE: 2800,
    PA: 2900, AM: 3800, MA: 2700, PI: 2500, RN: 2850,
  };
  const [ufDest, setUfDest] = useState('SP');
  const distKm = DIST[ufDest] ?? 1000;
  const tonnes = weightKg / 1000;
  const roadRate = 2.5;
  const tollRatePerKm = 0.2;
  const roadCostBRL = (tonnes * roadRate + tollRatePerKm) * distKm;
  const airRatePerKg = 6;
  const airCostBRL = weightKg * airRatePerKg + 200;

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded">
      <p className="font-medium mb-2">Frete Doméstico Brasil (Santos ➔ UF destino)</p>
      <label className="text-xs flex flex-col gap-1 w-40">
        UF Destino
        <select value={ufDest} onChange={e=>setUfDest(e.target.value)} className="p-1 rounded bg-gray-100 dark:bg-gray-700">
          {Object.keys(DIST).map(uf=>(<option key={uf} value={uf}>{uf}</option>))}
        </select>
      </label>
      <table className="table-auto mt-2 w-full text-xs border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Modal</th>
            <th className="border px-2 py-1">Distância (km)</th>
            <th className="border px-2 py-1">Custo (R$)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">Rodoviário</td>
            <td className="border px-2 py-1 text-center">{distKm}</td>
            <td className="border px-2 py-1">{roadCostBRL.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border px-2 py-1">Aéreo</td>
            <td className="border px-2 py-1 text-center">{distKm}</td>
            <td className="border px-2 py-1">{airCostBRL.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <p className="text-[10px] text-gray-500 mt-1">Cálculo baseado em piso mínimo ANTT (Res. 5.867/2020) e tarifa média aérea nacional. Valores de referência — consulte transportadora.</p>
    </div>
  );
} 