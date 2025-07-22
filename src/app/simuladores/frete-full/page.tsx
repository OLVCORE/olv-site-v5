'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import DisclaimerAlert from '@/components/DisclaimerAlert';
import FreightCalculatorLight from '@/components/simulators/FreightCalculatorLight';
import VolumesTable from '@/components/simulators/VolumesTable';
import { PackageInput } from '@/lib/binPacking';
import DomesticBR from '@/components/simulators/DomesticBR';
import PackageTypeSelector, { PackageKind } from '@/components/simulators/PackageTypeSelector';
import MainLayout from '@/components/layout/MainLayout';

type LoadPlan = {
  containers: {
    container: { code: string; internalVolume: number; payloadKg: number };
    usedVolume: number;
    usedWeight: number;
    packages: { id: string; qty: number }[];
  }[];
};

export default function FreightFullPage() {
  const [tab, setTab] = useState<0 | 1 | 2 | 3>(0);
  const [packages, setPackages] = useState<PackageInput[]>([]);
  const [plan, setPlan] = useState<LoadPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [pkgType, setPkgType] = useState<PackageKind | ''>('');

  const generatePlan = async () => {
    if (!packages.length) return;
    setLoading(true);
    try {
      const res = await fetch('/api/load-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packages }),
      });
      const data = await res.json();
      setPlan(data);
      setTab(2);
    } catch (err) {
      console.error(err);
      alert('Erro ao gerar plano');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
    <div className="import-sim-container mx-auto max-w-6xl py-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="import-sim-heading text-2xl font-bold">Simulador de Fretes – Versão FULL</h1>
        <Link
          href="/radar360"
          className="inline-flex items-center px-4 py-2 bg-[#d4af37] text-gray-900 font-semibold rounded-lg hover:bg-[#b8941f] transition-colors text-sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Voltar ao Radar 360
        </Link>
      </div>

      <DisclaimerAlert />

      <div className="flex gap-4 border-b mb-4 text-sm">
        {['Calculadora Internacional','Estufagem','Resultado Estufagem','Frete Doméstico'].map((t,i)=>(
          <button key={i} className={tab===i? 'border-b-2 border-accent':'opacity-60'} onClick={()=>setTab(i as any)}>{t}</button>
        ))}
      </div>

      {tab===0 && (
        <Suspense fallback={<p>Carregando…</p>}>
          <FreightCalculatorLight />
        </Suspense>
      )}
      {tab===1 && (
        <div>
          <h3 className="font-medium mb-2">1. Tipo de Embalagem</h3>
          <PackageTypeSelector value={pkgType} onChange={setPkgType} />

          <h3 className="font-medium mb-2 mt-4">2. Tabela de Volumes</h3>
          <VolumesTable /*@ts-ignore*/
            onChange={(w,v,rows)=>{
              const pkgs: PackageInput[] = rows.filter(r=>r.length && r.width && r.height && r.weight && r.qty).map((r,idx)=>({
                id:`row-${idx}`,
                length:parseFloat(r.length),
                width:parseFloat(r.width),
                height:parseFloat(r.height),
                weight:parseFloat(r.weight),
                quantity:parseInt(r.qty,10)
              }));
              setPackages(pkgs);
            }}
            maxLines={30}
            premium={true}
          />
          <button
            className="btn-primary mt-4"
            disabled={!packages.length || loading}
            onClick={generatePlan}
          >
            {loading ? 'Gerando…' : 'Gerar plano'}
          </button>
        </div>
      )}
      {tab===2 && plan && (
        <div className="space-y-4">
          {plan.containers.map((c,idx)=>(
            <div key={idx} className="border p-3 rounded">
              <h3 className="font-medium mb-2">{c.container.code} – {idx+1}</h3>
              <p>Peso usado: {c.usedWeight.toFixed(2)} kg • Volume usado: {c.usedVolume.toFixed(3)} m³</p>
              <p>Pacotes: {c.packages.length} {pkgType && (`• Tipo: ${pkgType}`)}</p>
            </div>
          ))}
        </div>
      )}
      {tab===3 && (
        <DomesticBR weightKg={packages.reduce((acc,p)=>acc+p.weight*p.quantity,0)} />
      )}
    </div>
    </MainLayout>
  );
} 