'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import VolumesTable from './VolumesTable';

interface Estimate {
  air: number;
  sea_lcl: number;
  sea_fcl: number;
  cabotage: number | null;
  road_ltl: number | null;
  road_ftl: number | null;
  rail: number | null;
}

interface ContainerInfo { vol: number; payload: number }

// capacidade volumétrica em m³ (aprox.) e payload máximo operacional (kg) — usaremos 90 % para cálculos
const CONTAINER_INFO: Record<string, ContainerInfo> = {
  "20′ Dry": { vol: 33, payload: 24000 },
  "40′ Dry": { vol: 67, payload: 26500 },
  "40′ HC": { vol: 76, payload: 28000 },
  "45′ HC": { vol: 86, payload: 29500 },
  "20′ OT": { vol: 32, payload: 28000 },
  "40′ OT": { vol: 66, payload: 28500 },
  "20′ FR": { vol: 30, payload: 27000 },
  "40′ FR": { vol: 65, payload: 28500 },
  "ISO Tank": { vol: 25, payload: 26000 },
  "FlexiTank": { vol: 24, payload: 24000 },
  "Bulk-Bag": { vol: 30, payload: 20000 },
};

const CAPACITY_FACTOR = 0.9; // usamos 90 % do payload por segurança

const CONTAINER_CAPACITY = Object.fromEntries(
  Object.entries(CONTAINER_INFO).map(([k, v]) => [k, v.vol])
);

// Países das Américas onde o modal rodoviário/ferroviário é viável
const AMERICAS_ROAD: string[] = [
  'AR','BO','BR','CL','CO','EC','GY','PY','PE','SR','UY','VE', // América do Sul
  'BZ','CR','GT','HN','NI','PA','SV','MX','US','CA' // América Central/Norte
];

function isRoadPossible(o: string, d: string) {
  if(!o || !d) return false;
  const oo = o.trim().toUpperCase();
  const dd = d.trim().toUpperCase();
  if(oo===dd) return true;
  return AMERICAS_ROAD.includes(oo) && AMERICAS_ROAD.includes(dd);
}

const isRailPossible = isRoadPossible;

// Lista de países ISO-2 (amostra ampla para testes – pode ser extendida até 250)
const COUNTRIES: { code: string; name: string }[] = [
  { code: 'AR', name: 'Argentina' },
  { code: 'AU', name: 'Australia' },
  { code: 'BR', name: 'Brazil' },
  { code: 'CA', name: 'Canada' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'CN', name: 'China' },
  { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' },
  { code: 'FR', name: 'France' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'IN', name: 'India' },
  { code: 'IT', name: 'Italy' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'MX', name: 'Mexico' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'RU', name: 'Russia' },
  { code: 'TR', name: 'Turkey' },
  { code: 'US', name: 'United States' },
  { code: 'ZA', name: 'South Africa' },
  // América do Sul
  { code: 'BO', name: 'Bolivia' },
  { code: 'CL', name: 'Chile' },
  { code: 'CO', name: 'Colombia' },
  { code: 'EC', name: 'Ecuador' },
  { code: 'GY', name: 'Guyana' },
  { code: 'PY', name: 'Paraguay' },
  { code: 'PE', name: 'Peru' },
  { code: 'SR', name: 'Suriname' },
  { code: 'UY', name: 'Uruguay' },
  { code: 'VE', name: 'Venezuela' },
  // América Central
  { code: 'BZ', name: 'Belize' },
  { code: 'CR', name: 'Costa Rica' },
  { code: 'GT', name: 'Guatemala' },
  { code: 'HN', name: 'Honduras' },
  { code: 'NI', name: 'Nicaragua' },
  { code: 'PA', name: 'Panama' },
  { code: 'SV', name: 'El Salvador' },
  // Caribe
  { code: 'AG', name: 'Antigua and Barbuda' },
  { code: 'BS', name: 'Bahamas' },
  { code: 'BB', name: 'Barbados' },
  { code: 'CU', name: 'Cuba' },
  { code: 'DM', name: 'Dominica' },
  { code: 'DO', name: 'Dominican Republic' },
  { code: 'GD', name: 'Grenada' },
  { code: 'HT', name: 'Haiti' },
  { code: 'JM', name: 'Jamaica' },
  { code: 'KN', name: 'Saint Kitts and Nevis' },
  { code: 'LC', name: 'Saint Lucia' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines' },
  { code: 'TT', name: 'Trinidad and Tobago' },
];

function suggestModal(weight: number, volume: number, sameCountry: boolean) {
  if (sameCountry) {
    return weight < 15000 ? 'road' : 'rail';
  }
  if (weight < 300 && volume < 1) return 'air';
  if (volume < 15) return 'sea_lcl';
  return 'sea_fcl';
}

function computeContainerSuggestion(weight: number, volume: number) {
  // Greedy fill from smallest to biggest following order.
  const order = ["20′ Dry","40′ Dry","40′ HC","45′ HC","20′ OT","40′ OT","20′ FR","40′ FR"];
  const result: Record<string,{qty:number,occ:number}> = {};
  let remW = weight;
  let remV = volume;

  for(const type of order){
    if(remW<=0.1 && remV<=0.0001) break;
    const info = CONTAINER_INFO[type];
    const capW = info.payload*CAPACITY_FACTOR;
    const capV = info.vol;
    // Determine how many containers of this type are required by limiting factor
    const needByW = capW>0 ? Math.ceil(remW/capW) : 0;
    const needByV = capV>0 ? Math.ceil(remV/capV) : 0;
    const qty = Math.max(needByW, needByV);
    if(qty>0){
      // occupancy of last container based on limiting factor volume
      const usedV = Math.min(remV, qty*capV);
      const occ = Number(((usedV/(qty*capV))*100).toFixed(1));
      result[type] = { qty, occ };
      // subtract filled capacity
      remW = Math.max(0, remW - qty*capW);
      remV = Math.max(0, remV - qty*capV);
    }
  }
  return result;
}

const CONTAINER_ORDERS: string[][] = [
  ["20′ Dry","40′ Dry","40′ HC","45′ HC"], // menor → maior (já existia)
  ["45′ HC","40′ HC","40′ Dry","20′ Dry"], // maior → menor
  ["40′ Dry","20′ Dry","40′ HC","45′ HC"],  // mix comum
];

function fillUsingOrder(order: string[], weight: number, volume: number){
  const plan: Record<string,{qty:number,occ:number}> = {};
  let remW = weight;
  let remV = volume;
  for(const type of order){
    if(remW<=0.1 && remV<=0.0001) break;
    const info = CONTAINER_INFO[type];
    const capW = info.payload*CAPACITY_FACTOR;
    const capV = info.vol;
    const needByW = capW>0 ? Math.ceil(remW/capW) : 0;
    const needByV = capV>0 ? Math.ceil(remV/capV) : 0;
    const qty = Math.max(needByW, needByV);
    if(qty>0){
      const usedV = Math.min(remV, qty*capV);
      const occ = Number(((usedV/(qty*capV))*100).toFixed(1));
      plan[type]={qty,occ};
      remW=Math.max(0,remW-qty*capW);
      remV=Math.max(0,remV-qty*capV);
    }
  }
  return plan;
}

function computeContainerAlternatives(weight:number, volume:number, maxAlt:number=3){
  const alts: Record<string,{qty:number,occ:number}>[] = [];
  for(const ord of CONTAINER_ORDERS){
    const plan = fillUsingOrder(ord, weight, volume);
    if(Object.keys(plan).length>0){
      // avoid duplicates by summary string
      const sig = Object.entries(plan).map(([k,v])=>`${v.qty}x${k}`).join('+');
      if(!alts.some(p=>Object.entries(p).map(([k,v])=>`${v.qty}x${k}`).join('+')===sig)){
        alts.push(plan);
      }
    }
    if(alts.length>=maxAlt) break;
  }
  return alts;
}

function planToString(plan:Record<string,{qty:number,occ:number}>){
  return Object.entries(plan).map(([k,v])=>`${v.qty} × ${k} (${v.occ}% occ.)`).join(' + ');
}

// Veículos rodoviários simplificados
const ROAD_VEHICLES: {name:string; payload:number}[] = [
  {name:'Carreta 3-eixos', payload:28000},
  {name:'Truck toco', payload:14000},
  {name:'VUC', payload:3000},
];
function roadSuggestions(weight:number){
  if(weight<=0) return [];
  const suggestions:string[]=[];
  // opção 1 – carreta(s)
  const nCarreta = Math.ceil(weight/ROAD_VEHICLES[0].payload);
  suggestions.push(`${nCarreta} × ${ROAD_VEHICLES[0].name}`);
  // opção 2 – mix truck toco
  const nToco = Math.ceil(weight/ROAD_VEHICLES[1].payload);
  suggestions.push(`${nToco} × ${ROAD_VEHICLES[1].name}`);
  return suggestions;
}

const ENABLED_CONTAINERS = new Set<string>([
  "20′ Dry","40′ Dry","40′ HC","45′ HC","20′ OT","40′ OT","20′ FR","40′ FR","ISO Tank","FlexiTank","Bulk-Bag"
]);
const formatter = new Intl.NumberFormat('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});

export default function FreightCalculatorLight() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [container, setContainer] = useState('');
  const [mode, setMode] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Estimate | null>(null);
  const [error, setError] = useState('');
  const [totWeight, setTotWeight] = useState(0);
  const [totVolume, setTotVolume] = useState(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const paramToken = searchParams.get('token');
    const stored = typeof window !== 'undefined' ? localStorage.getItem('freight_token') : null;
    const token = paramToken || stored;
    if (!token) return;
    // store for next visits
    if (paramToken) localStorage.setItem('freight_token', paramToken);
    (async () => {
      try {
        const res = await fetch(`/api/validate?token=${token}`);
        const json = await res.json();
        if (json.valid) {
          // unlocked logic would be here
        }
      } catch {
        // ignore
      }
    })();
  }, [searchParams]);

  function validateInputs() {
    const o = origin.trim().toUpperCase();
    const d = destination.trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(o)) return 'Origem deve ter código ISO-2';
    if (!/^[A-Z]{2}$/.test(d)) return 'Destino deve ter código ISO-2';
    if (totWeight <= 0) return 'Peso deve ser maior que zero';
    if (totVolume <= 0) return 'Volume deve ser maior que zero';
    return '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const msg = validateInputs();
    if (msg) {
      setError(msg);
      return;
    }
    setLoading(true);
    setError('');
    setData(null);
    try {
      const safeMode = 'all';
      const o = origin.trim().toUpperCase();
      const d = destination.trim().toUpperCase();
      const res = await fetch(
        `/api/freight/light?origin=${o}&destination=${d}&weight=${totWeight}&volume=${totVolume}&container=${encodeURIComponent(container || fallbackContainer)}&mode=${safeMode}`
      );
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt);
      }
      const json = await res.json();
      setData(json.estimates);
    } catch (err: any) {
      setError('Falha ao obter estimativas: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  const suggestedModal = suggestModal(totWeight, totVolume, origin.trim().toUpperCase() === destination.trim().toUpperCase());
  const containerAlternatives = computeContainerAlternatives(totWeight, totVolume);
  const containerPlan = containerAlternatives[0] || {};
  const fallbackContainer = Object.keys(containerPlan)[0] ?? '';
  const utilization = container
    ? ((totVolume / CONTAINER_CAPACITY[container]) * 100).toFixed(1)
    : undefined;

  const isAirDisabled = false;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Calculadora de Fretes (Versão Light)</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Coluna 1 – Entradas */}
        <div className="space-y-4">
          <label className="flex flex-col text-sm">
            Origem (ISO)
            <input list="countryList" type="text" value={origin} onChange={(e)=>setOrigin(e.target.value.toUpperCase())} className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded"/>
          </label>
          <label className="flex flex-col text-sm">
            Destino (ISO)
            <input list="countryList" type="text" value={destination} onChange={(e)=>setDestination(e.target.value.toUpperCase())} className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded"/>
          </label>
          <datalist id="countryList">
            {COUNTRIES.map(c=> <option key={c.code} value={c.code}>{c.name}</option>)}
          </datalist>
          {/* Volumes */}
          <VolumesTable /*@ts-ignore*/ onChange={(w,v)=>{setTotWeight(w);setTotVolume(v);}} maxLines={15} premium={true} />
          <label className="flex flex-col text-sm">
            Tipo de Container
            <select value={container} onChange={(e)=>setContainer(e.target.value)} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
              <option value="">Escolha sua opção…</option>
              {Object.keys(CONTAINER_INFO).map(key=> (
                <option key={key} value={key} disabled={!ENABLED_CONTAINERS.has(key)} className={!ENABLED_CONTAINERS.has(key)?'text-gray-400':''}>{key}</option>
              ))}
            </select>
            {container && (
              <span className="text-xs text-gray-500 mt-1">
                Capacidade: {CONTAINER_INFO[container].vol} m³ • {CONTAINER_INFO[container].payload.toLocaleString()} kg (90 % →{' '}
                {(CONTAINER_INFO[container].payload * CAPACITY_FACTOR).toLocaleString()} kg)
              </span>
            )}
          </label>
          <label className="flex flex-col text-sm">
            Modal de Cálculo
            <select value={mode} onChange={(e)=>setMode(e.target.value)} className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
              <option value="">Escolha sua opção…</option>
              {[
                {val:'air', label:'Aéreo', disabled:isAirDisabled},
                {val:'sea_lcl', label:'Marítimo LCL', disabled:false},
                {val:'sea_fcl', label:'Marítimo FCL', disabled:false},
                {val:'road_ltl', label:'Rodoviário LTL', disabled: !isRoadPossible(origin,destination)},
                {val:'road_ftl', label:'Rodoviário FTL', disabled: !isRoadPossible(origin,destination)},
                {val:'rail', label:'Ferroviário', disabled: !isRailPossible(origin,destination)},
                {val:'cabotage', label:'Cabotagem', disabled: origin!==destination},
              ].map(opt=> (
                <option key={opt.val} value={opt.val} disabled={opt.disabled} className={opt.disabled? 'text-gray-400':''} title={opt.disabled? 'Modal indisponível para esta configuração':''}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="px-4 py-2 bg-accent rounded text-white">Calcular</button>
        </div>

        {/* Coluna 2 – Resultados */}
        <div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          {data && (
            <>
              <table className="table-auto w-full text-sm border">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-600">
                    <th className="px-3 py-1 border">Modal</th>
                    <th className="px-3 py-1 border">Custo (USD)</th>
                  </tr>
                </thead>
                <tbody>
                  {(
                    ['air','sea_lcl','sea_fcl','road_ltl','road_ftl','rail','cabotage'] as any
                  ).map((modal)=>{
                    const value = (data as any)[modal];
                    if(value===null) return null;
                    const isSelected = mode && mode!=='' && mode===modal;
                    return (
                      <tr key={modal} className={isSelected ? 'bg-accent/10 font-medium' : ''}>
                        <td className="border px-3 py-1 capitalize">{modal.replace('_',' ').toUpperCase()}</td>
                        <td className="border px-3 py-1">{formatter.format(value)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {container && (
                <p className="text-xs text-gray-400 mt-2">
                  Volume total: {totVolume.toFixed(3)} m³ — container&nbsp;escolhido: {container}{' '}
                  • ocupação {utilization}%
                </p>
              )}

              <p className="text-xs text-gray-400 mt-2">Peso bruto total: {totWeight.toFixed(2)} kg • Volume total: {totVolume.toFixed(4)} m³</p>

              {/* Disclaimer destacado */}
              <div className="mt-3 p-3 rounded bg-yellow-100 dark:bg-yellow-900/30 text-xs text-yellow-900 dark:text-yellow-200">
                Estas estimativas são apenas referência. Para valores finais e requisitos operacionais,
                consulte seu agente de carga ou especialista logístico.
              </div>

              {/* Sugestões Premium (visíveis aqui para testes) */}
              <div className="mt-4 text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded space-y-1">
                <p className="font-medium">Sugestões automáticas</p>
                <p>Modal ideal: <strong className="capitalize">{suggestedModal.replace('_',' ')}</strong></p>
                {/* Containers */}
                {containerAlternatives.length>0 && (
                  <p>Configurações de contêiner:&nbsp;
                    <strong>
                      {containerAlternatives.map(plan=>planToString(plan)).join(' ou ')}
                    </strong>
                  </p>
                )}
                {/* Road vehicles */}
                {isRoadPossible(origin,destination) && (
                  <p className="text-xs text-gray-500">Opções rodoviárias: {roadSuggestions(totWeight).join(' ou ')}</p>
                )}
                <p className="text-[10px] text-gray-500">Occupação calculada com 90&nbsp;% do payload máximo.</p>
              </div>

              {/* Domestic section movido para aba Frete Doméstico */}
            </>
          )}
        </div>
      </form>
    </div>
  );
} 