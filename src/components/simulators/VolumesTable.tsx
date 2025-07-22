import React, { useState, useEffect } from 'react';

interface PackageLine {
  length: string; // cm
  width: string;
  height: string;
  qty: string;
  weight: string; // kg per unit
}

interface Props {
  onChange: (totalWeight: number, totalVolume: number, rows: PackageLine[]) => void;
  maxLines?: number;
  premium?: boolean;
}

const VolumesTable: React.FC<Props> = ({ onChange, maxLines = 15, premium = true }) => {
  const [rows, setRows] = useState<PackageLine[]>([
    { length: '', width: '', height: '', qty: '', weight: '' },
  ]);
  const [tot, setTot] = useState({ peso: 0, volume: 0 });

  function handleRowChange(index: number, field: keyof PackageLine, value: string) {
    const copy = [...rows];
    copy[index] = { ...copy[index], [field]: value } as PackageLine;
    setRows(copy);
    computeTotals(copy);
  }

  function addRow() {
    if (rows.length >= maxLines) return;
    setRows([...rows, { length: '', width: '', height: '', qty: '', weight: '' }]);
    computeTotals([...rows, { length: '', width: '', height: '', qty: '', weight: '' }]);
  }

  function computeTotals(arr: PackageLine[]) {
    let totWeight = 0;
    let totVol = 0;
    arr.forEach((p) => {
      const L = parseFloat(p.length) / 100;
      const W = parseFloat(p.width) / 100;
      const H = parseFloat(p.height) / 100;
      const Q = parseFloat(p.qty);
      const kg = parseFloat(p.weight);
      if (L && W && H && Q && kg) {
        totWeight += kg * Q;
        totVol += L * W * H * Q;
      }
    });
    setTot({ peso: totWeight, volume: totVol });
    onChange(totWeight, totVol, arr);
  }

  useEffect(()=>{ computeTotals(rows); },[rows]);

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <div key={i} className="grid grid-cols-5 gap-2">
          {(['length','width','height','weight','qty'] as (keyof PackageLine)[]).map(f=> (
            <input
              key={f}
              type="number"
              value={row[f]}
              onChange={(e)=>handleRowChange(i,f,e.target.value)}
              onKeyDown={(e)=>{ if(i===rows.length-1 && f==='qty' && (e.key==='Enter' || e.key==='Tab')) { addRow(); } }}
              placeholder={f==='qty' ? 'Qtde' : f==='weight'? 'Peso kg': f==='length' ? 'COMPR cm' : f==='width' ? 'LARG cm' : 'ALT cm'}
              className="p-1 bg-gray-100 dark:bg-gray-700 rounded text-xs"
            />
          ))}
        </div>
      ))}
      <button type="button" onClick={addRow} className="text-xs text-accent mt-1">
        ➕ Adicionar volume
      </button>
      <p className="text-xs mt-1 text-gray-500">Peso bruto total: <strong>{tot.peso.toFixed(2)} kg</strong> • Volume total: <strong>{tot.volume.toFixed(4)} m³</strong></p>
    </div>
  );
};

export default VolumesTable; 