"use client";

import React, { useState } from 'react';
import InfoTooltip from '../ui/InfoTooltip';

function toNumber(s: string): number {
  if (!s) return 0;
  // remove milhares e converte vírgula em ponto
  return parseFloat(s.replace(/\./g, '').replace(',', '.')) || 0;
}

type Mode = 'air' | 'road' | 'sea';

const FACTORS: Record<Mode, number> = {
  air: 167, // kg por m³ (IATA)
  road: 333, // kg por m³ (média)
  sea: 1000, // kg por m³ (LCL: 1t = 1 m³)
};

export default function WeightVolumeConverter() {
  const [inputs, setInputs] = useState({
    length: '40', // cm
    width: '40',
    height: '40',
    weight: '20', // kg
    qty: '1',
    mode: 'air' as Mode,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const L = toNumber(inputs.length) / 100; // metros
  const W = toNumber(inputs.width) / 100;
  const H = toNumber(inputs.height) / 100;
  const Q = Math.max(1, toNumber(inputs.qty));
  const grossWeight = toNumber(inputs.weight) * Q; // kg
  const volumePerUnit = L * W * H; // m³
  const totalVolume = volumePerUnit * Q;
  const volFactor = FACTORS[inputs.mode as Mode];
  const volumetricWeight = totalVolume * volFactor; // kg
  const chargeable = Math.max(grossWeight, volumetricWeight);

  const br = (n: number, dec = 2) => n.toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec });

  interface FieldProps { name: string; label: string; suffix?: string; tip?: string; }
  const Field = ({ name, label, suffix, tip }: FieldProps) => (
    <label className="block text-sm font-medium text-gray-200 dark:text-accent-light">
      <span className="inline-flex items-center gap-1">{label} {tip && <InfoTooltip content={tip} />}</span>
      <div className="relative mt-1">
        <input
          type="text"
          inputMode="decimal"
          name={name}
          value={(inputs as any)[name]}
          onChange={handleChange}
          className="w-full rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 pr-12 text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
          placeholder="0,00"
        />
        {suffix && (
          <span className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500 pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Field name="length" label="Comprimento" suffix="cm" tip="Tamanho da caixa (lado maior)" />
        <Field name="width" label="Largura" suffix="cm" tip="Lado intermediário" />
        <Field name="height" label="Altura" suffix="cm" tip="Lado menor" />
        <Field name="weight" label="Peso Bruto" suffix="kg" tip="Peso real por unidade" />
        <Field name="qty" label="Quantidade" tip="Número de unidades" />
        <label className="block text-sm font-medium text-gray-200 dark:text-accent-light">
          <span className="inline-flex items-center gap-1">Modal de Transporte <InfoTooltip content="Define o fator de cubagem conforme o modal" /></span>
          <select name="mode" value={inputs.mode} onChange={handleChange} className="w-full mt-1 rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm text-gray-900 dark:text-white">
            <option value="air">Aéreo (167 kg/m³)</option>
            <option value="road">Rodoviário (333 kg/m³)</option>
            <option value="sea">Marítimo LCL (1.000 kg/m³)</option>
          </select>
        </label>
      </div>

      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm md:text-base">
        <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white">Resultado</h3>
        <table className="w-full text-left text-gray-700 dark:text-gray-300 text-sm">
          <tbody>
            <tr><td className="pr-4">Volume por unidade</td><td>{br(volumePerUnit, 4)} m³</td></tr>
            <tr><td className="pr-4">Volume total</td><td>{br(totalVolume, 4)} m³</td></tr>
            <tr><td className="pr-4">Peso bruto total</td><td>{br(grossWeight)} kg</td></tr>
            <tr><td className="pr-4">Peso cubado</td><td>{br(volumetricWeight)} kg</td></tr>
            <tr className="font-bold"><td className="pr-4">Peso taxável</td><td>{br(chargeable)} kg</td></tr>
          </tbody>
        </table>
        <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">Consulte seu agente de carga para fatores específicos e políticas de arredondamento.</p>
      </div>
    </div>
  );
} 