// Sistema de integração com APIs de shipping lines
// Este é um sistema mock que simula integrações reais

export interface ShippingLine {
  id: string;
  name: string;
  code: string;
  website: string;
  apiEndpoint?: string;
  reliability: number; // 0-100
  coverage: string[];
  specialties: string[];
}

export interface VesselInfo {
  id: string;
  name: string;
  imo: string;
  mmsi: string;
  flag: string;
  vesselType: string;
  capacity: {
    teu: number;
    weight: number;
  };
  currentPosition?: {
    lat: number;
    lng: number;
    timestamp: Date;
  };
  status: 'active' | 'maintenance' | 'inactive';
}

export interface RouteInfo {
  id: string;
  origin: string;
  destination: string;
  transitTime: number; // days
  frequency: number; // departures per week
  vessels: VesselInfo[];
  currentRate: number; // USD per TEU
  rateHistory: Array<{
    date: Date;
    rate: number;
  }>;
  capacity: {
    available: number;
    total: number;
  };
}

export interface PortInfo {
  id: string;
  name: string;
  code: string;
  country: string;
  location: {
    lat: number;
    lng: number;
  };
  facilities: string[];
  congestion: number; // 0-100
  freeTime: number; // days
  demurrageRate: number; // USD per day
  weather: {
    condition: string;
    temperature: number;
    windSpeed: number;
  };
}

export interface FreightQuote {
  id: string;
  shippingLine: string;
  origin: string;
  destination: string;
  rate: number; // USD per TEU
  transitTime: number; // days
  validity: Date;
  surcharges: Array<{
    name: string;
    amount: number;
    currency: string;
  }>;
  totalCost: number;
  vessel: VesselInfo;
  departureDate: Date;
  arrivalDate: Date;
  capacity: {
    available: number;
    total: number;
  };
}

// Shipping lines principais
export const SHIPPING_LINES: ShippingLine[] = [
  {
    id: 'maersk',
    name: 'Maersk Line',
    code: 'MAEU',
    website: 'https://www.maersk.com',
    reliability: 95,
    coverage: ['Global'],
    specialties: ['Container', 'Reefer', 'Special Cargo']
  },
  {
    id: 'msc',
    name: 'Mediterranean Shipping Company',
    code: 'MSCU',
    website: 'https://www.msc.com',
    reliability: 92,
    coverage: ['Global'],
    specialties: ['Container', 'Bulk', 'Cruise']
  },
  {
    id: 'cosco',
    name: 'COSCO Shipping',
    code: 'COSU',
    website: 'https://www.cosco-shipping.com',
    reliability: 88,
    coverage: ['Asia', 'Europe', 'Americas'],
    specialties: ['Container', 'Bulk', 'Tankers']
  },
  {
    id: 'cma-cgm',
    name: 'CMA CGM',
    code: 'CMDU',
    website: 'https://www.cma-cgm.com',
    reliability: 90,
    coverage: ['Global'],
    specialties: ['Container', 'Reefer', 'Special Cargo']
  },
  {
    id: 'hapag-lloyd',
    name: 'Hapag-Lloyd',
    code: 'HLCU',
    website: 'https://www.hapag-lloyd.com',
    reliability: 93,
    coverage: ['Global'],
    specialties: ['Container', 'Reefer', 'Special Cargo']
  },
  {
    id: 'one',
    name: 'Ocean Network Express',
    code: 'ONEY',
    website: 'https://www.one-line.com',
    reliability: 89,
    coverage: ['Global'],
    specialties: ['Container', 'Reefer']
  },
  {
    id: 'evergreen',
    name: 'Evergreen Marine',
    code: 'EGLV',
    website: 'https://www.evergreen-marine.com',
    reliability: 87,
    coverage: ['Global'],
    specialties: ['Container', 'Reefer']
  },
  {
    id: 'yang-ming',
    name: 'Yang Ming Marine',
    code: 'YMLU',
    website: 'https://www.yangming.com',
    reliability: 85,
    coverage: ['Global'],
    specialties: ['Container', 'Reefer']
  }
];

// Função para simular busca de cotações
export async function getFreightQuotes(
  origin: string,
  destination: string,
  containerType: string = '20GP',
  weight: number = 0
): Promise<FreightQuote[]> {
  // Simular delay de API
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const quotes: FreightQuote[] = [];
  const baseRate = 1500 + Math.random() * 2000;
  
  SHIPPING_LINES.forEach((line, index) => {
    const rateVariation = 0.8 + (Math.random() * 0.4); // ±20%
    const rate = baseRate * rateVariation;
    
    const transitTime = 15 + Math.random() * 10; // 15-25 days
    const departureDate = new Date();
    departureDate.setDate(departureDate.getDate() + Math.floor(Math.random() * 7));
    
    const arrivalDate = new Date(departureDate);
    arrivalDate.setDate(arrivalDate.getDate() + transitTime);
    
    const surcharges = [
      { name: 'BAF', amount: rate * 0.1, currency: 'USD' },
      { name: 'CAF', amount: rate * 0.05, currency: 'USD' },
      { name: 'THC', amount: 150 + Math.random() * 100, currency: 'USD' },
      { name: 'ISPS', amount: 10 + Math.random() * 5, currency: 'USD' }
    ];
    
    const totalSurcharges = surcharges.reduce((sum, surcharge) => sum + surcharge.amount, 0);
    
    quotes.push({
      id: `quote-${line.id}-${Date.now()}-${index}`,
      shippingLine: line.name,
      origin,
      destination,
      rate,
      transitTime,
      validity: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      surcharges,
      totalCost: rate + totalSurcharges,
      vessel: {
        id: `vessel-${line.id}-${index}`,
        name: `${line.name} Vessel ${index + 1}`,
        imo: `IMO${Math.floor(Math.random() * 10000000)}`,
        mmsi: `MMSI${Math.floor(Math.random() * 100000000)}`,
        flag: ['Panama', 'Liberia', 'Marshall Islands', 'Singapore'][Math.floor(Math.random() * 4)],
        vesselType: 'Container Ship',
        capacity: {
          teu: 5000 + Math.floor(Math.random() * 5000),
          weight: 50000 + Math.floor(Math.random() * 50000)
        },
        status: 'active'
      },
      departureDate,
      arrivalDate,
      capacity: {
        available: Math.floor(Math.random() * 100),
        total: 100
      }
    });
  });
  
  // Ordenar por custo total
  return quotes.sort((a, b) => a.totalCost - b.totalCost);
}

// Função para simular busca de informações de portos
export async function getPortInfo(portCode: string): Promise<PortInfo | null> {
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
  
  const ports: Record<string, PortInfo> = {
    'CNSHA': {
      id: 'cnsha',
      name: 'Shanghai Port',
      code: 'CNSHA',
      country: 'China',
      location: { lat: 31.2304, lng: 121.4737 },
      facilities: ['Container Terminal', 'Bulk Terminal', 'Oil Terminal'],
      congestion: 20 + Math.random() * 30,
      freeTime: 7,
      demurrageRate: 100 + Math.random() * 50,
      weather: {
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
        temperature: 15 + Math.random() * 20,
        windSpeed: Math.random() * 20
      }
    },
    'USNYC': {
      id: 'usnyc',
      name: 'Port of New York and New Jersey',
      code: 'USNYC',
      country: 'United States',
      location: { lat: 40.7128, lng: -74.0060 },
      facilities: ['Container Terminal', 'Bulk Terminal'],
      congestion: 15 + Math.random() * 25,
      freeTime: 5,
      demurrageRate: 150 + Math.random() * 100,
      weather: {
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
        temperature: 10 + Math.random() * 25,
        windSpeed: Math.random() * 25
      }
    },
    'DEHAM': {
      id: 'deham',
      name: 'Port of Hamburg',
      code: 'DEHAM',
      country: 'Germany',
      location: { lat: 53.5511, lng: 9.9937 },
      facilities: ['Container Terminal', 'Bulk Terminal', 'Cruise Terminal'],
      congestion: 10 + Math.random() * 20,
      freeTime: 6,
      demurrageRate: 120 + Math.random() * 80,
      weather: {
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
        temperature: 5 + Math.random() * 20,
        windSpeed: Math.random() * 30
      }
    },
    'BRSSZ': {
      id: 'brssz',
      name: 'Port of Santos',
      code: 'BRSSZ',
      country: 'Brazil',
      location: { lat: -23.9608, lng: -46.3339 },
      facilities: ['Container Terminal', 'Bulk Terminal', 'Oil Terminal'],
      congestion: 25 + Math.random() * 35,
      freeTime: 8,
      demurrageRate: 80 + Math.random() * 60,
      weather: {
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
        temperature: 20 + Math.random() * 15,
        windSpeed: Math.random() * 15
      }
    }
  };
  
  return ports[portCode.toUpperCase()] || null;
}

// Função para simular busca de rotas
export async function getRoutes(origin: string, destination: string): Promise<RouteInfo[]> {
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
  
  const routes: RouteInfo[] = [];
  const baseTransitTime = 18 + Math.random() * 7; // 18-25 days
  
  SHIPPING_LINES.slice(0, 5).forEach((line, index) => {
    const transitTime = baseTransitTime + (Math.random() - 0.5) * 4; // ±2 days
    const frequency = 1 + Math.floor(Math.random() * 3); // 1-3 departures per week
    
    const rateHistory = [];
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const baseRate = 1500 + Math.random() * 2000;
      const variation = 0.9 + (Math.random() * 0.2); // ±10%
      rateHistory.push({
        date,
        rate: baseRate * variation
      });
    }
    
    routes.push({
      id: `route-${line.id}-${origin}-${destination}`,
      origin,
      destination,
      transitTime: Math.round(transitTime),
      frequency,
      vessels: [{
        id: `vessel-${line.id}-${index}`,
        name: `${line.name} Vessel ${index + 1}`,
        imo: `IMO${Math.floor(Math.random() * 10000000)}`,
        mmsi: `MMSI${Math.floor(Math.random() * 100000000)}`,
        flag: ['Panama', 'Liberia', 'Marshall Islands'][Math.floor(Math.random() * 3)],
        vesselType: 'Container Ship',
        capacity: {
          teu: 5000 + Math.floor(Math.random() * 5000),
          weight: 50000 + Math.floor(Math.random() * 50000)
        },
        status: 'active'
      }],
      currentRate: 1500 + Math.random() * 2000,
      rateHistory,
      capacity: {
        available: Math.floor(Math.random() * 200),
        total: 200 + Math.floor(Math.random() * 300)
      }
    });
  });
  
  return routes;
}

// Função para simular tracking de vessel
export async function trackVessel(vesselId: string): Promise<VesselInfo | null> {
  await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));
  
  // Simular dados de tracking
  const vessel: VesselInfo = {
    id: vesselId,
    name: `Vessel ${vesselId}`,
    imo: `IMO${Math.floor(Math.random() * 10000000)}`,
    mmsi: `MMSI${Math.floor(Math.random() * 100000000)}`,
    flag: ['Panama', 'Liberia', 'Marshall Islands', 'Singapore'][Math.floor(Math.random() * 4)],
    vesselType: 'Container Ship',
    capacity: {
      teu: 5000 + Math.floor(Math.random() * 5000),
      weight: 50000 + Math.floor(Math.random() * 50000)
    },
    currentPosition: {
      lat: 30 + Math.random() * 40, // Entre 30-70°N
      lng: -180 + Math.random() * 360, // Longitude global
      timestamp: new Date()
    },
    status: 'active'
  };
  
  return vessel;
}

// Função para simular dados de congestionamento de portos
export async function getPortCongestion(portCode: string): Promise<number> {
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
  
  // Simular níveis de congestionamento baseados no porto
  const congestionLevels: Record<string, number> = {
    'CNSHA': 20 + Math.random() * 30, // Shanghai: 20-50%
    'USNYC': 15 + Math.random() * 25, // NYC: 15-40%
    'DEHAM': 10 + Math.random() * 20, // Hamburg: 10-30%
    'BRSSZ': 25 + Math.random() * 35  // Santos: 25-60%
  };
  
  return congestionLevels[portCode.toUpperCase()] || (10 + Math.random() * 20);
}

// Função para simular dados de mercado
export async function getMarketData(route: string): Promise<{
  currentRate: number;
  trend: 'up' | 'down' | 'stable';
  volatility: number;
  forecast: Array<{ date: Date; rate: number }>;
}> {
  await new Promise(resolve => setTimeout(resolve, 400 + Math.random() * 600));
  
  const baseRate = 1500 + Math.random() * 2000;
  const trend = ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'stable';
  const volatility = 5 + Math.random() * 15; // 5-20%
  
  const forecast = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    let rate = baseRate;
    if (trend === 'up') {
      rate += (i * 10) + (Math.random() - 0.5) * 50;
    } else if (trend === 'down') {
      rate -= (i * 8) + (Math.random() - 0.5) * 40;
    } else {
      rate += (Math.random() - 0.5) * 30;
    }
    
    forecast.push({ date, rate: Math.max(rate, 500) });
  }
  
  return {
    currentRate: baseRate,
    trend,
    volatility,
    forecast
  };
}

// Função para simular dados de weather
export async function getWeatherData(lat: number, lng: number): Promise<{
  condition: string;
  temperature: number;
  windSpeed: number;
  visibility: number;
  waveHeight: number;
}> {
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 400));
  
  const conditions = ['Sunny', 'Cloudy', 'Rainy', 'Stormy', 'Foggy'];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  
  return {
    condition,
    temperature: 10 + Math.random() * 30,
    windSpeed: Math.random() * 40,
    visibility: 5 + Math.random() * 15,
    waveHeight: Math.random() * 5
  };
}

// Função para simular dados de fuel prices
export async function getFuelPrices(): Promise<{
  vlsfo: number; // Very Low Sulphur Fuel Oil
  hfo: number;   // Heavy Fuel Oil
  mgo: number;   // Marine Gas Oil
  lng: number;   // Liquefied Natural Gas
}> {
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
  
  return {
    vlsfo: 600 + Math.random() * 200, // $600-800 per ton
    hfo: 400 + Math.random() * 150,   // $400-550 per ton
    mgo: 800 + Math.random() * 300,   // $800-1100 per ton
    lng: 500 + Math.random() * 200    // $500-700 per ton
  };
}

// Função para simular dados de capacity
export async function getCapacityData(route: string): Promise<{
  available: number;
  total: number;
  utilization: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}> {
  await new Promise(resolve => setTimeout(resolve, 250 + Math.random() * 350));
  
  const total = 1000 + Math.floor(Math.random() * 2000);
  const available = Math.floor(Math.random() * total);
  const utilization = ((total - available) / total) * 100;
  
  const trends: Array<'increasing' | 'decreasing' | 'stable'> = ['increasing', 'decreasing', 'stable'];
  const trend = trends[Math.floor(Math.random() * trends.length)];
  
  return {
    available,
    total,
    utilization,
    trend
  };
} 