export interface Country {
  code: string;
  name: string;
  ports: Port[];
}

export interface Port {
  code: string;
  name: string;
  country: string;
  type: 'seaport' | 'airport' | 'land';
}

export const portosBrasileiros: Port[] = [
  { code: 'BRSSZ', name: 'Santos', country: 'BR', type: 'seaport' },
  { code: 'BRRIO', name: 'Rio de Janeiro', country: 'BR', type: 'seaport' },
  { code: 'BRPAR', name: 'Paranaguá', country: 'BR', type: 'seaport' },
  { code: 'BRITJ', name: 'Itajaí', country: 'BR', type: 'seaport' },
  { code: 'BRVIT', name: 'Vitória', country: 'BR', type: 'seaport' },
  { code: 'BRSUP', name: 'Suape', country: 'BR', type: 'seaport' },
  { code: 'BRMAN', name: 'Manaus', country: 'BR', type: 'seaport' },
  { code: 'BRFOR', name: 'Fortaleza', country: 'BR', type: 'seaport' },
  { code: 'BRREC', name: 'Recife', country: 'BR', type: 'seaport' },
  { code: 'BRSSA', name: 'Salvador', country: 'BR', type: 'seaport' },
];

export const paisesImportacao: Country[] = [
  {
    code: 'CN',
    name: 'China',
    ports: [
      { code: 'CNSHA', name: 'Shanghai', country: 'CN', type: 'seaport' },
      { code: 'CNNGB', name: 'Ningbo', country: 'CN', type: 'seaport' },
      { code: 'CNSZX', name: 'Shenzhen', country: 'CN', type: 'seaport' },
      { code: 'CNTXG', name: 'Tianjin', country: 'CN', type: 'seaport' },
      { code: 'CNGGZ', name: 'Guangzhou', country: 'CN', type: 'seaport' },
    ]
  },
  {
    code: 'US',
    name: 'Estados Unidos',
    ports: [
      { code: 'USLAX', name: 'Los Angeles', country: 'US', type: 'seaport' },
      { code: 'USNYC', name: 'New York', country: 'US', type: 'seaport' },
      { code: 'USHOU', name: 'Houston', country: 'US', type: 'seaport' },
      { code: 'USCHI', name: 'Chicago', country: 'US', type: 'seaport' },
      { code: 'USMIA', name: 'Miami', country: 'US', type: 'seaport' },
    ]
  },
  {
    code: 'DE',
    name: 'Alemanha',
    ports: [
      { code: 'DEHAM', name: 'Hamburg', country: 'DE', type: 'seaport' },
      { code: 'DEBRE', name: 'Bremen', country: 'DE', type: 'seaport' },
      { code: 'DEBER', name: 'Berlin', country: 'DE', type: 'airport' },
      { code: 'DEMUC', name: 'Munich', country: 'DE', type: 'airport' },
    ]
  },
  {
    code: 'JP',
    name: 'Japão',
    ports: [
      { code: 'JPTYO', name: 'Tokyo', country: 'JP', type: 'seaport' },
      { code: 'JPYOK', name: 'Yokohama', country: 'JP', type: 'seaport' },
      { code: 'JPOSA', name: 'Osaka', country: 'JP', type: 'seaport' },
      { code: 'JPKOB', name: 'Kobe', country: 'JP', type: 'seaport' },
    ]
  },
  {
    code: 'KR',
    name: 'Coreia do Sul',
    ports: [
      { code: 'KRICN', name: 'Incheon', country: 'KR', type: 'seaport' },
      { code: 'KRBUS', name: 'Busan', country: 'KR', type: 'seaport' },
      { code: 'KRGMP', name: 'Gimpo', country: 'KR', type: 'airport' },
    ]
  },
  {
    code: 'IN',
    name: 'Índia',
    ports: [
      { code: 'INMUM', name: 'Mumbai', country: 'IN', type: 'seaport' },
      { code: 'INCCU', name: 'Kolkata', country: 'IN', type: 'seaport' },
      { code: 'INBLR', name: 'Bangalore', country: 'IN', type: 'airport' },
    ]
  },
  {
    code: 'MX',
    name: 'México',
    ports: [
      { code: 'MXVER', name: 'Veracruz', country: 'MX', type: 'seaport' },
      { code: 'MXGDL', name: 'Guadalajara', country: 'MX', type: 'airport' },
      { code: 'MXMEX', name: 'Cidade do México', country: 'MX', type: 'airport' },
    ]
  },
  {
    code: 'AR',
    name: 'Argentina',
    ports: [
      { code: 'ARBUE', name: 'Buenos Aires', country: 'AR', type: 'seaport' },
      { code: 'ARROS', name: 'Rosário', country: 'AR', type: 'seaport' },
    ]
  },
  {
    code: 'CL',
    name: 'Chile',
    ports: [
      { code: 'CLVAP', name: 'Valparaíso', country: 'CL', type: 'seaport' },
      { code: 'CLSCL', name: 'Santiago', country: 'CL', type: 'airport' },
    ]
  },
  {
    code: 'CO',
    name: 'Colômbia',
    ports: [
      { code: 'COBOG', name: 'Bogotá', country: 'CO', type: 'airport' },
      { code: 'COMDE', name: 'Medellín', country: 'CO', type: 'airport' },
    ]
  },
];

export const getAllCountries = (): Country[] => {
  return paisesImportacao;
};

export const getCountryByCode = (code: string): Country | undefined => {
  return paisesImportacao.find(country => country.code === code);
};

export const getPortsByCountry = (countryCode: string): Port[] => {
  const country = getCountryByCode(countryCode);
  return country ? country.ports : [];
};

export const getPortByCode = (portCode: string): Port | undefined => {
  for (const country of paisesImportacao) {
    const port = country.ports.find(p => p.code === portCode);
    if (port) return port;
  }
  return undefined;
}; 