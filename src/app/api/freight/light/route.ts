// Simple placeholder freight cost estimator for light version
// GET params: origin=ISO country, destination=ISO country, weight (kg), volume (m3)
// Returns rough cost estimates for various modes until external API key configured.

import { NextRequest } from 'next/server';
import { getMarketRate } from '@/lib/marketRates';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface ContainerSpec {
  vol: number; // m3
  weight: number; // kg
  base: number; // USD base cost por container
}

const CONTAINER_SPECS: Record<string, ContainerSpec> = {
  '20′ Dry': { vol: 33, weight: 28200, base: 1800 },
  '40′ Dry': { vol: 67, weight: 28600, base: 2500 },
  '40′ HC': { vol: 76, weight: 28600, base: 2600 },
  '20′ OT': { vol: 32, weight: 28000, base: 1900 },
  '40′ OT': { vol: 66, weight: 28500, base: 2550 },
  "45′ HC": { vol: 86, weight: 29500, base: 3000 },
  "20′ FR": { vol: 30, weight: 27000, base: 2000 },
  "40′ FR": { vol: 65, weight: 28500, base: 2600 },
  "ISO Tank": { vol: 25, weight: 26000, base: 2300 },
  "FlexiTank": { vol: 24, weight: 24000, base: 2250 },
  "Bulk-Bag": { vol: 30, weight: 20000, base: 1900 },
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // Normalizamos removendo espaços e convertendo para maiúsculas
  const origin = searchParams.get('origin')?.trim().toUpperCase();
  const destination = searchParams.get('destination')?.trim().toUpperCase();
  const weight = parseFloat(searchParams.get('weight') || '0'); // kg
  const volume = parseFloat(searchParams.get('volume') || '0'); // m3
  const containerType = decodeURIComponent(searchParams.get('container') || '40′ Dry');
  const modeParam = (searchParams.get('mode') || 'all').toLowerCase();

  if (!origin || !destination || !weight || !volume) {
    return Response.json(
      { error: 'Missing parameters' },
      { status: 400, headers: { 'content-type': 'application/json' } }
    );
  }

  // Container metrics for possible cost multiplication
  const spec = CONTAINER_SPECS[containerType] || CONTAINER_SPECS['40′ Dry'];
  const containersByVol = Math.ceil(volume / spec.vol);
  const containersByWeight = Math.ceil(weight / spec.weight);
  const nContainers = Math.max(containersByVol, containersByWeight);

  // Try to override with market rates where available
  const airRate = getMarketRate(origin,destination,'air');
  const seaLclRate = getMarketRate(origin,destination,'sea_lcl');
  const seaFclRate = getMarketRate(origin,destination,'sea_fcl');
  const roadLtlRate = getMarketRate(origin,destination,'road_ltl');
  const roadFtlRate = getMarketRate(origin,destination,'road_ftl');
  const railRate = getMarketRate(origin,destination,'rail');

  // helper – adjust base rate depending on container size if we only have one generic rate (20')
  const getSeaFclRateForContainer = (rate: any, type: string) => {
    if (!rate) return undefined;
    const is40 = /40|45/.test(type);
    if (!is40) return rate.valueUSD; // assume 20′ equivalência
    // use simple uplift if 40/45 – dataset usually traz 40′ mas caso não exista aplicamos fator 1.4
    const alt = getMarketRate(origin, destination, 'sea_fcl'); // tentativa extra (poderíamos filtrar por unidade futuramente)
    if (alt && alt.unit === 'container_40') return alt.valueUSD;
    return rate.valueUSD * 1.4; // fallback
  };

  const calcCost = (rate:any, factor:number|undefined)=> {
    if(!rate) return null;
    if(factor===undefined) return rate.valueUSD;
    return rate.valueUSD * factor;
  };

  const airCostFinal = calcCost(airRate, weight);
  const seaLclCostFinal = calcCost(seaLclRate, volume);
  const seaFclPerContainer = getSeaFclRateForContainer(seaFclRate, containerType);
  const seaFclCost = seaFclPerContainer ? seaFclPerContainer * nContainers : null;

  const sameCountry = origin === destination;
  const cabotageCost = sameCountry ? 100 + volume * 12 : null;

  // road/rail eligibility across Americas
  const AMERICAS_ROAD = ['AR','BO','BR','CL','CO','EC','GY','PY','PE','SR','UY','VE','BZ','CR','GT','HN','NI','PA','SV','MX','US','CA'];
  const interAmerica = AMERICAS_ROAD.includes(origin) && AMERICAS_ROAD.includes(destination);
  const roadEligible = sameCountry || interAmerica;
  const railEligible = sameCountry || interAmerica;

  // LTL assume tarifa por tonelada (1000 kg)
  const roadLtlCost = roadEligible && roadLtlRate ? roadLtlRate.valueUSD * (weight / 1000) : null;

  // FTL – custo por caminhão completo (payload ~28 t)
  const TRUCK_PAYLOAD_KG = 28000;
  const nTrucks = Math.ceil(weight / TRUCK_PAYLOAD_KG);
  const roadFtlCost = roadEligible && roadFtlRate ? roadFtlRate.valueUSD * nTrucks : null;

  // Estimativa ferroviária – aplicável a rotas onde exista interligação terrestre.
  const railCost = railEligible && railRate ? railRate.valueUSD * weight : null;

  return Response.json({
    origin,
    destination,
    weightKg: weight,
    volumeM3: volume,
    currency: 'USD',
    estimates: {
      air: modeParam === 'all' || modeParam === 'air' ? airCostFinal : null,
      sea_lcl: modeParam === 'all' || modeParam === 'sea_lcl' ? seaLclCostFinal : null,
      sea_fcl: modeParam === 'all' || modeParam === 'sea_fcl' ? seaFclCost : null,
      cabotage: modeParam === 'all' || modeParam === 'cabotage' ? cabotageCost : null,
      road_ltl: (modeParam==='all'||modeParam==='road_ltl') && roadEligible ? roadLtlCost : null,
      road_ftl: (modeParam==='all'||modeParam==='road_ftl') && roadEligible ? roadFtlCost : null,
      rail: modeParam === 'all' || modeParam === 'rail' ? railCost : null,
    },
    disclaimer: `Valores aproximados para fins de demonstração. Containers: ${nContainers}; caminhões: ${nTrucks}. Para cotações em tempo real utilize a versão Premium.`
  });
} 