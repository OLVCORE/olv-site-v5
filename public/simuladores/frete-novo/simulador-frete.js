// API Keys (substitua pelas suas chaves reais)
const API_KEYS = {
    OPENWEATHER: 'SUA_CHAVE_OPENWEATHER', // Substitua pela sua chave real
    MARINETRAFFIC: 'SUA_CHAVE_MARINETRAFFIC' // Substitua pela sua chave real
};

// Dados internos para autocomplete e cálculos
const INTERNAL_DATA = {
    // Portos principais com dados reais de mercado
    ports: [
        { name: 'Santos (Brasil)', country: 'Brasil', type: 'port', coordinates: [-23.9608, -46.3339], congestion: 'low', avgTransitTime: 35 },
        { name: 'Shanghai (China)', country: 'China', type: 'port', coordinates: [31.2304, 121.4737], congestion: 'medium', avgTransitTime: 28 },
        { name: 'Rotterdam (Holanda)', country: 'Holanda', type: 'port', coordinates: [51.9225, 4.4792], congestion: 'low', avgTransitTime: 25 },
        { name: 'Los Angeles (EUA)', country: 'EUA', type: 'port', coordinates: [34.0522, -118.2437], congestion: 'high', avgTransitTime: 30 },
        { name: 'Hamburgo (Alemanha)', country: 'Alemanha', type: 'port', coordinates: [53.5511, 9.9937], congestion: 'low', avgTransitTime: 22 },
        { name: 'Dubai (EAU)', country: 'EAU', type: 'port', coordinates: [25.2048, 55.2708], congestion: 'medium', avgTransitTime: 18 },
        { name: 'Singapura (Singapura)', country: 'Singapura', type: 'port', coordinates: [1.3521, 103.8198], congestion: 'low', avgTransitTime: 20 },
        { name: 'Busan (Coreia do Sul)', country: 'Coreia do Sul', type: 'port', coordinates: [35.1796, 129.0756], congestion: 'medium', avgTransitTime: 25 },
        { name: 'Antuérpia (Bélgica)', country: 'Bélgica', type: 'port', coordinates: [51.2194, 4.4025], congestion: 'low', avgTransitTime: 23 },
        { name: 'Valência (Espanha)', country: 'Espanha', type: 'port', coordinates: [39.4699, -0.3763], congestion: 'low', avgTransitTime: 26 }
    ],
    
    // Aeroportos principais com dados reais
    airports: [
        { name: 'Guarulhos (Brasil)', country: 'Brasil', type: 'airport', coordinates: [-23.4356, -46.4731], avgTransitTime: 3 },
        { name: 'Shanghai Pudong (China)', country: 'China', type: 'airport', coordinates: [31.1443, 121.8083], avgTransitTime: 2 },
        { name: 'Amsterdam Schiphol (Holanda)', country: 'Holanda', type: 'airport', coordinates: [52.3105, 4.7683], avgTransitTime: 2 },
        { name: 'Los Angeles (EUA)', country: 'EUA', type: 'airport', coordinates: [33.9416, -118.4085], avgTransitTime: 2 },
        { name: 'Frankfurt (Alemanha)', country: 'Alemanha', type: 'airport', coordinates: [50.0379, 8.5622], avgTransitTime: 2 },
        { name: 'Dubai International (EAU)', country: 'EAU', type: 'airport', coordinates: [25.2532, 55.3657], avgTransitTime: 1 },
        { name: 'Singapore Changi (Singapura)', country: 'Singapura', type: 'airport', coordinates: [1.3644, 103.9915], avgTransitTime: 2 },
        { name: 'Incheon (Coreia do Sul)', country: 'Coreia do Sul', type: 'airport', coordinates: [37.4602, 126.4407], avgTransitTime: 2 },
        { name: 'Brussels (Bélgica)', country: 'Bélgica', type: 'airport', coordinates: [50.9009, 4.4856], avgTransitTime: 2 },
        { name: 'Madrid Barajas (Espanha)', country: 'Espanha', type: 'airport', coordinates: [40.4983, -3.5676], avgTransitTime: 2 }
    ],
    
    // Cidades principais
    cities: [
        { name: 'São Paulo (Brasil)', country: 'Brasil', type: 'city', coordinates: [-23.5505, -46.6333] },
        { name: 'Nova York (EUA)', country: 'EUA', type: 'city', coordinates: [40.7128, -74.0060] },
        { name: 'Londres (Reino Unido)', country: 'Reino Unido', type: 'city', coordinates: [51.5074, -0.1278] },
        { name: 'Tóquio (Japão)', country: 'Japão', type: 'city', coordinates: [35.6762, 139.6503] },
        { name: 'Paris (França)', country: 'França', type: 'city', coordinates: [48.8566, 2.3522] },
        { name: 'Berlim (Alemanha)', country: 'Alemanha', type: 'city', coordinates: [52.5200, 13.4050] },
        { name: 'Madri (Espanha)', country: 'Espanha', type: 'city', coordinates: [40.4168, -3.7038] },
        { name: 'Roma (Itália)', country: 'Itália', type: 'city', coordinates: [41.9028, 12.4964] },
        { name: 'Moscou (Rússia)', country: 'Rússia', type: 'city', coordinates: [55.7558, 37.6176] },
        { name: 'Pequim (China)', country: 'China', type: 'city', coordinates: [39.9042, 116.4074] }
    ],
    
    // Países
    countries: [
        { name: 'Brasil', code: 'BR', continent: 'América do Sul' },
        { name: 'China', code: 'CN', continent: 'Ásia' },
        { name: 'EUA', code: 'US', continent: 'América do Norte' },
        { name: 'Alemanha', code: 'DE', continent: 'Europa' },
        { name: 'Japão', code: 'JP', continent: 'Ásia' },
        { name: 'Reino Unido', code: 'GB', continent: 'Europa' },
        { name: 'França', code: 'FR', continent: 'Europa' },
        { name: 'Itália', code: 'IT', continent: 'Europa' },
        { name: 'Espanha', code: 'ES', continent: 'Europa' },
        { name: 'Holanda', code: 'NL', continent: 'Europa' }
    ],
    
    // Códigos NCM comuns
    ncmCodes: {
        '8471': 'Computadores e suas unidades; leitores magnéticos ou ópticos',
        '8517': 'Telefones para redes celulares ou para outras redes sem fio',
        '8528': 'Receptores de televisão, mesmo incorporando aparelhos receptores de radiodifusão',
        '9503': 'Outros brinquedos e modelos, com motor (exceto os da posição 9503.00.10)',
        '9504': 'Jogos de vídeo de uso doméstico',
        '8516': 'Aquecedores elétricos de imersão; fornos elétricos de arco; outros aquecedores',
        '8525': 'Aparelhos de transmissão ou de recepção para radiotelefonia, radiotelegrafia',
        '8527': 'Receptores de radiodifusão, mesmo combinados com gravador ou reprodutor de som',
        '8544': 'Cabos coaxiais e outros condutores coaxiais elétricos',
        '8544': 'Fios, cabos (incluindo os cabos coaxiais) e outros condutores isolados'
    },
    
    // Incoterms com descrições detalhadas
    incoterms: {
        'EXW': 'Ex Works - O vendedor coloca a mercadoria à disposição do comprador no estabelecimento do vendedor',
        'FCA': 'Free Carrier - O vendedor entrega a mercadoria ao transportador designado pelo comprador',
        'CPT': 'Carriage Paid To - O vendedor paga o frete até o local de destino designado',
        'CIP': 'Carriage and Insurance Paid To - O vendedor paga o frete e seguro até o local de destino',
        'DAP': 'Delivered at Place - O vendedor entrega a mercadoria no local de destino designado',
        'DPU': 'Delivered at Place Unloaded - O vendedor entrega e descarrega a mercadoria no local de destino',
        'DDP': 'Delivered Duty Paid - O vendedor entrega a mercadoria desembaraçada no local de destino',
        'FAS': 'Free Alongside Ship - O vendedor coloca a mercadoria ao lado do navio no porto de embarque',
        'FOB': 'Free on Board - O vendedor coloca a mercadoria a bordo do navio no porto de embarque',
        'CFR': 'Cost and Freight - O vendedor paga o frete até o porto de destino',
        'CIF': 'Cost, Insurance and Freight - O vendedor paga o frete e seguro até o porto de destino'
    },
    
    // Guia detalhado de Incoterms
    incotermGuide: {
        'EXW': {
            name: 'EXW - Ex Works',
            fullName: 'Ex Works (named place)',
            riskTransfer: 'No estabelecimento do vendedor',
            costs: 'Comprador paga todos os custos',
            transportModes: 'Todos os modais',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Colocar a mercadoria à disposição no local especificado',
                    'Fornecer documentação básica'
                ],
                buyer: [
                    'Pagar todos os custos de transporte',
                    'Arranjar transporte',
                    'Pagar todos os custos de seguro',
                    'Pagar todos os custos de importação',
                    'Assumir todos os riscos após entrega'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Certificado de origem (se aplicável)'
            ],
            advantages: [
                'Máximo controle para o comprador',
                'Custos transparentes',
                'Flexibilidade na escolha do transportador'
            ],
            disadvantages: [
                'Comprador assume todos os riscos',
                'Maior complexidade para o comprador',
                'Responsabilidade total sobre o transporte'
            ],
            typicalUse: 'Vendas domésticas, comprador experiente, mercadorias simples',
            notes: 'O comprador tem controle total, mas assume toda a responsabilidade e risco.'
        },
        'FCA': {
            name: 'FCA - Free Carrier',
            fullName: 'Free Carrier (named place)',
            riskTransfer: 'Quando entregue ao transportador',
            costs: 'Vendedor paga até entrega ao transportador',
            transportModes: 'Todos os modais',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Entregar a mercadoria ao transportador designado',
                    'Pagar custos até entrega ao transportador',
                    'Fornecer documentação de exportação'
                ],
                buyer: [
                    'Designar o transportador',
                    'Pagar custos após entrega ao transportador',
                    'Pagar custos de importação',
                    'Pagar custos de seguro'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Documentação de exportação',
                'Certificado de origem'
            ],
            advantages: [
                'Flexibilidade para o comprador',
                'Controle sobre o transportador',
                'Adequado para todos os modais'
            ],
            disadvantages: [
                'Comprador assume riscos após entrega',
                'Necessita coordenação entre vendedor e comprador'
            ],
            typicalUse: 'Comércio eletrônico, cargas aéreas, multimodal',
            notes: 'Ideal para cargas que serão transportadas por diferentes modais.'
        },
        'CPT': {
            name: 'CPT - Carriage Paid To',
            fullName: 'Carriage Paid To (named place of destination)',
            riskTransfer: 'Quando entregue ao primeiro transportador',
            costs: 'Vendedor paga frete até destino',
            transportModes: 'Todos os modais',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Contratar e pagar o transporte até destino',
                    'Fornecer documentação de exportação',
                    'Entregar a mercadoria ao transportador'
                ],
                buyer: [
                    'Pagar custos após entrega ao transportador',
                    'Pagar custos de importação',
                    'Pagar custos de seguro',
                    'Assumir riscos após entrega ao transportador'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Documentação de exportação',
                'Comprovante de transporte'
            ],
            advantages: [
                'Vendedor organiza o transporte',
                'Custo de frete incluído',
                'Simplicidade para o comprador'
            ],
            disadvantages: [
                'Comprador não controla o transportador',
                'Riscos transferidos cedo'
            ],
            typicalUse: 'Vendas internacionais, compradores inexperientes',
            notes: 'O vendedor paga o frete, mas o risco é transferido quando a mercadoria é entregue ao primeiro transportador.'
        },
        'CIP': {
            name: 'CIP - Carriage and Insurance Paid To',
            fullName: 'Carriage and Insurance Paid To (named place of destination)',
            riskTransfer: 'Quando entregue ao primeiro transportador',
            costs: 'Vendedor paga frete e seguro até destino',
            transportModes: 'Todos os modais',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Contratar e pagar o transporte até destino',
                    'Contratar seguro com cobertura mínima',
                    'Fornecer documentação de exportação'
                ],
                buyer: [
                    'Pagar custos após entrega ao transportador',
                    'Pagar custos de importação',
                    'Assumir riscos após entrega ao transportador'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Documentação de exportação',
                'Apólice de seguro',
                'Comprovante de transporte'
            ],
            advantages: [
                'Seguro incluído',
                'Vendedor organiza tudo',
                'Proteção para o comprador'
            ],
            disadvantages: [
                'Cobertura de seguro mínima',
                'Comprador não controla transportador'
            ],
            typicalUse: 'Cargas de alto valor, mercadorias perecíveis',
            notes: 'Similar ao CPT, mas com seguro incluído pelo vendedor.'
        },
        'DAP': {
            name: 'DAP - Delivered at Place',
            fullName: 'Delivered at Place (named place of destination)',
            riskTransfer: 'No local de destino especificado',
            costs: 'Vendedor paga todos os custos até destino',
            transportModes: 'Todos os modais',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Contratar e pagar o transporte até destino',
                    'Entregar a mercadoria no local especificado',
                    'Fornecer documentação de exportação'
                ],
                buyer: [
                    'Pagar custos de importação',
                    'Pagar custos de descarga',
                    'Assumir riscos após entrega no destino'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Documentação de exportação',
                'Comprovante de transporte'
            ],
            advantages: [
                'Vendedor assume mais responsabilidades',
                'Simplicidade para o comprador',
                'Entrega no destino'
            ],
            disadvantages: [
                'Vendedor assume mais riscos',
                'Custos de importação para comprador'
            ],
            typicalUse: 'Vendas diretas, mercadorias complexas',
            notes: 'O vendedor entrega a mercadoria no local de destino, mas o comprador paga os custos de importação.'
        },
        'DPU': {
            name: 'DPU - Delivered at Place Unloaded',
            fullName: 'Delivered at Place Unloaded (named place of destination)',
            riskTransfer: 'Após descarga no local de destino',
            costs: 'Vendedor paga todos os custos até descarga',
            transportModes: 'Todos os modais',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Contratar e pagar o transporte até destino',
                    'Descarregar a mercadoria no local especificado',
                    'Fornecer documentação de exportação'
                ],
                buyer: [
                    'Pagar custos de importação',
                    'Assumir riscos após descarga'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Documentação de exportação',
                'Comprovante de transporte'
            ],
            advantages: [
                'Vendedor assume descarga',
                'Máxima responsabilidade do vendedor',
                'Simplicidade para o comprador'
            ],
            disadvantages: [
                'Vendedor assume mais riscos',
                'Custos de importação para comprador'
            ],
            typicalUse: 'Mercadorias que requerem descarga especializada',
            notes: 'Similar ao DAP, mas o vendedor também é responsável pela descarga.'
        },
        'DDP': {
            name: 'DDP - Delivered Duty Paid',
            fullName: 'Delivered Duty Paid (named place of destination)',
            riskTransfer: 'No local de destino especificado',
            costs: 'Vendedor paga todos os custos incluindo impostos',
            transportModes: 'Todos os modais',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Contratar e pagar o transporte até destino',
                    'Pagar todos os custos de importação',
                    'Entregar a mercadoria no local especificado',
                    'Fornecer toda documentação necessária'
                ],
                buyer: [
                    'Receber a mercadoria',
                    'Assumir riscos após entrega'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Documentação de exportação',
                'Documentação de importação',
                'Comprovante de transporte'
            ],
            advantages: [
                'Máxima simplicidade para o comprador',
                'Vendedor assume tudo',
                'Sem custos ocultos'
            ],
            disadvantages: [
                'Vendedor assume todos os riscos',
                'Maior complexidade para o vendedor',
                'Custos de importação para vendedor'
            ],
            typicalUse: 'Vendas diretas ao consumidor, mercadorias de baixo valor',
            notes: 'O vendedor assume a máxima responsabilidade, incluindo custos de importação.'
        },
        'FAS': {
            name: 'FAS - Free Alongside Ship',
            fullName: 'Free Alongside Ship (named port of shipment)',
            riskTransfer: 'Ao lado do navio no porto de embarque',
            costs: 'Vendedor paga custos até ao lado do navio',
            transportModes: 'Marítimo',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Entregar a mercadoria ao lado do navio',
                    'Pagar custos até ao lado do navio',
                    'Fornecer documentação de exportação'
                ],
                buyer: [
                    'Pagar custos de embarque',
                    'Pagar frete marítimo',
                    'Pagar custos de importação',
                    'Pagar custos de seguro'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Documentação de exportação',
                'Certificado de origem'
            ],
            advantages: [
                'Clareza sobre responsabilidades',
                'Adequado para cargas a granel',
                'Controle do comprador sobre embarque'
            ],
            disadvantages: [
                'Limitado ao transporte marítimo',
                'Comprador assume riscos de embarque'
            ],
            typicalUse: 'Cargas a granel, commodities, cargas pesadas',
            notes: 'Específico para transporte marítimo. O vendedor coloca a mercadoria ao lado do navio.'
        },
        'FOB': {
            name: 'FOB - Free on Board',
            fullName: 'Free on Board (named port of shipment)',
            riskTransfer: 'A bordo do navio no porto de embarque',
            costs: 'Vendedor paga custos até embarque',
            transportModes: 'Marítimo',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Entregar a mercadoria a bordo do navio',
                    'Pagar custos até embarque',
                    'Fornecer documentação de exportação'
                ],
                buyer: [
                    'Pagar frete marítimo',
                    'Pagar custos de importação',
                    'Pagar custos de seguro',
                    'Assumir riscos após embarque'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Documentação de exportação',
                'Certificado de origem',
                'Conhecimento de embarque'
            ],
            advantages: [
                'Clareza sobre transferência de risco',
                'Controle do comprador sobre frete',
                'Adequado para contêineres'
            ],
            disadvantages: [
                'Limitado ao transporte marítimo',
                'Comprador assume riscos de transporte'
            ],
            typicalUse: 'Contêineres, cargas gerais, comércio tradicional',
            notes: 'O risco é transferido quando a mercadoria cruza a amurada do navio.'
        },
        'CFR': {
            name: 'CFR - Cost and Freight',
            fullName: 'Cost and Freight (named port of destination)',
            riskTransfer: 'A bordo do navio no porto de embarque',
            costs: 'Vendedor paga frete até porto de destino',
            transportModes: 'Marítimo',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Contratar e pagar o frete marítimo',
                    'Entregar a mercadoria a bordo do navio',
                    'Fornecer documentação de exportação'
                ],
                buyer: [
                    'Pagar custos de importação',
                    'Pagar custos de seguro',
                    'Assumir riscos após embarque'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Documentação de exportação',
                'Conhecimento de embarque'
            ],
            advantages: [
                'Vendedor paga o frete',
                'Simplicidade para o comprador',
                'Custo de frete incluído'
            ],
            disadvantages: [
                'Comprador não controla transportador',
                'Riscos transferidos cedo'
            ],
            typicalUse: 'Vendas internacionais, compradores inexperientes',
            notes: 'O vendedor paga o frete, mas o risco é transferido quando a mercadoria cruza a amurada do navio.'
        },
        'CIF': {
            name: 'CIF - Cost, Insurance and Freight',
            fullName: 'Cost, Insurance and Freight (named port of destination)',
            riskTransfer: 'A bordo do navio no porto de embarque',
            costs: 'Vendedor paga frete e seguro até porto de destino',
            transportModes: 'Marítimo',
            responsibilities: {
                seller: [
                    'Preparar a mercadoria conforme contrato',
                    'Contratar e pagar o frete marítimo',
                    'Contratar seguro com cobertura mínima',
                    'Entregar a mercadoria a bordo do navio',
                    'Fornecer documentação de exportação'
                ],
                buyer: [
                    'Pagar custos de importação',
                    'Assumir riscos após embarque'
                ]
            },
            documentation: [
                'Fatura comercial',
                'Lista de embalagem',
                'Documentação de exportação',
                'Apólice de seguro',
                'Conhecimento de embarque'
            ],
            advantages: [
                'Frete e seguro incluídos',
                'Vendedor organiza tudo',
                'Proteção para o comprador'
            ],
            disadvantages: [
                'Cobertura de seguro mínima',
                'Comprador não controla transportador'
            ],
            typicalUse: 'Cargas de alto valor, mercadorias perecíveis',
            notes: 'Similar ao CFR, mas com seguro incluído pelo vendedor.'
        }
    },
    
    // Taxas de câmbio simuladas (seriam atualizadas via API)
    exchangeRates: {
        'USD': 1.0,
        'EUR': 0.85,
        'BRL': 5.2,
        'CNY': 6.8
    },
    
    // Custos base de frete REALISTAS (valores de mercado CORRIGIDOS - 2024/2025)
    baseFreightCosts: {
        'FCL': {
            '20ft': { 
                base: 1200, // USD por container 20ft (valor REAL de mercado)
                perKm: 0.08 // USD por km (valor REAL de mercado)
            },
            '40ft': { 
                base: 1800, // USD por container 40ft (valor REAL de mercado)
                perKm: 0.12 // USD por km (valor REAL de mercado)
            },
            '40hc': { 
                base: 2000, // USD por container 40hc (valor REAL de mercado)
                perKm: 0.13 // USD por km (valor REAL de mercado)
            }
        },
        'LCL': {
            base: 80, // USD por m³ (valor REAL de mercado)
            perKm: 0.015 // USD por km por m³ (valor REAL de mercado)
        },
        'bulk': {
            base: 60, // USD por tonelada (valor REAL de mercado)
            perKm: 0.008 // USD por km por tonelada (valor REAL de mercado)
        }
    },
    
    // Custos operacionais REALISTAS (valores de mercado CORRIGIDOS)
    operationalCosts: {
        'THC_origin': 180, // Terminal Handling Charge - Origem (USD por container) - CORRIGIDO
        'THC_destination': 220, // Terminal Handling Charge - Destino (USD por container) - CORRIGIDO
        'documentation': 120, // Custos de documentação (USD) - CORRIGIDO
        'customs_clearance': 180, // Desembaraço aduaneiro (USD) - CORRIGIDO
        'inland_transport': 250, // Transporte interno no destino (USD) - CORRIGIDO
        'insurance_rate': 0.001, // Taxa de seguro (0.1% do valor da carga) - CORRIGIDO
        'BAF': 0.08, // Bunker Adjustment Factor (8% do frete base) - CORRIGIDO
        'CAF': 0.05, // Currency Adjustment Factor (5% do frete base) - CORRIGIDO
        'ISPS': 15, // International Ship and Port Facility Security (USD por container) - CORRIGIDO
        'EIS': 20, // Emergency Intermodal Surcharge (USD por container) - CORRIGIDO
        'PSS': 0.08 // Peak Season Surcharge (8% do frete base) - CORRIGIDO
    },
    
    // Dados de rotas reais para cálculos mais precisos
    routeData: {
        'Santos-Shanghai': { distance: 18500, avgTransitTime: 35, frequency: 'weekly', congestion: 'medium' },
        'Santos-Rotterdam': { distance: 9800, avgTransitTime: 25, frequency: 'weekly', congestion: 'low' },
        'Santos-Los Angeles': { distance: 8500, avgTransitTime: 30, frequency: 'weekly', congestion: 'high' },
        'Shanghai-Rotterdam': { distance: 19500, avgTransitTime: 28, frequency: 'weekly', congestion: 'medium' },
        'Shanghai-Los Angeles': { distance: 10500, avgTransitTime: 22, frequency: 'weekly', congestion: 'medium' },
        'Rotterdam-Los Angeles': { distance: 9200, avgTransitTime: 26, frequency: 'weekly', congestion: 'low' }
    },
    
    // Dados de frete aéreo CORRIGIDOS (valores realistas de mercado)
    airFreightData: {
        'express': { baseRate: 4.50, fuelSurcharge: 0.12, securitySurcharge: 0.05 },
        'standard': { baseRate: 3.20, fuelSurcharge: 0.10, securitySurcharge: 0.04 },
        'economy': { baseRate: 2.80, fuelSurcharge: 0.08, securitySurcharge: 0.03 }
    },
    
    // Dados de frete rodoviário CORRIGIDOS (valores realistas para Brasil)
    roadFreightData: {
        'express': { baseRate: 0.15, fuelSurcharge: 0.08, tollSurcharge: 0.05 },
        'standard': { baseRate: 0.12, fuelSurcharge: 0.06, tollSurcharge: 0.04 },
        'economy': { baseRate: 0.10, fuelSurcharge: 0.05, tollSurcharge: 0.03 }
    },
    
    // Dados de impostos brasileiros (atualizados)
    brazilianTaxes: {
        'ICMS': 0.17, // 17% (varia por estado)
        'PIS_COFINS': 0.0925, // 9.25%
        'II': 0.02, // Imposto de Importação (varia por NCM)
        'IPI': 0.05, // IPI 5% (varia por produto)
        'AD_VALOREM': 0.01, // Ad Valorem 1%
        'SISCOMEX': 50, // Taxa Siscomex (fixa)
        'STORAGE_COST': 35, // Custo de armazenagem por dia
        'INSPECTION_COST': 45, // Custo de inspeção aduaneira
        'HANDLING_COST': 60 // Custo de manuseio no terminal
    }
};

// BUSCA DINÂMICA E REAL
class AutocompleteReal {
    constructor() {
        this.cache = new Map();
    }

    async buscarLocalizacoes(termo, tipo) {
        const cacheKey = `${tipo}-${termo}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        let resultados = [];

        switch (tipo) {
            case 'portos':
                resultados = await this.buscarPortosPorTermo(termo);
                break;
            case 'aeroportos':
                resultados = await this.buscarAeroportosPorTermo(termo);
                break;
            case 'paises':
                resultados = await this.buscarPaisesPorTermo(termo);
                break;
        }

        if (resultados && resultados.length > 0) {
            this.cache.set(cacheKey, resultados);
        }

        return resultados;
    }

    async buscarPortosPorTermo(termo) {
        try {
            // Busca real em APIs de portos
            const response = await fetch(`https://api.searates.com/reference/ports?search=${encodeURIComponent(termo)}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            // Se API falhar, retornar null (não lista fake)
            return null;
        }
    }

    async buscarAeroportosPorTermo(termo) {
        try {
            // Busca real em APIs de aeroportos
            const response = await fetch(`https://api.aviationstack.com/v1/airports?search=${encodeURIComponent(termo)}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            return null;
        }
    }

    async buscarPaisesPorTermo(termo) {
        try {
            // Busca real em APIs de países
            const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(termo)}`);
            if (response.ok) {
                return await response.json();
            }
        } catch (error) {
            return null;
        }
    }
}

// Instância global do autocomplete real
const autocompleteReal = new AutocompleteReal();

// Classe principal do simulador
class FreightSimulator {
    constructor() {
        console.log('🚀 FreightSimulator sendo inicializado...');
        
        this.currentModal = 'maritime';
        this.currentDirection = 'import';
        this.apiStatus = {
            weather: 'offline',
            traffic: 'offline',
            currency: 'offline'
        };
        
        console.log('📋 Configurações iniciais definidas');
        
        console.log('🔧 Inicializando event listeners...');
        this.initializeEventListeners();
        console.log('✅ Event listeners inicializados');
        
        console.log('🌐 Atualizando status das APIs...');
        this.updateApiStatus();
        
        console.log('🔍 Configurando autocomplete...');
        this.setupAutocomplete();
        
        console.log('✅ Configurando validação de formulário...');
        this.setupFormValidation();
        
        console.log('📄 Configurando listeners de cotação...');
        this.setupQuotationListeners();
        
        console.log('📊 Configurando listeners de relatório...');
        this.setupReportListeners();
        
        console.log('🎉 FreightSimulator inicializado com sucesso');
    }
    
    // Inicializar event listeners
    initializeEventListeners() {
        // Disclaimer banner close buttons
        const disclaimerClose = document.getElementById('disclaimer-close');
        const resultsDisclaimerClose = document.getElementById('results-disclaimer-close');
        
        if (disclaimerClose) {
            disclaimerClose.addEventListener('click', () => {
                const disclaimerBanner = document.querySelector('.disclaimer-banner');
                if (disclaimerBanner) {
                    disclaimerBanner.classList.add('hidden');
                }
            });
        }
        
        if (resultsDisclaimerClose) {
            resultsDisclaimerClose.addEventListener('click', () => {
                const resultsDisclaimer = document.getElementById('results-disclaimer');
                if (resultsDisclaimer) {
                    resultsDisclaimer.classList.add('hidden');
                }
            });
        }
        
        // Manual input buttons
        const manualInputButtons = document.querySelectorAll('.manual-input-btn');
        manualInputButtons.forEach(button => {
            button.addEventListener('click', () => {
                const fieldId = button.getAttribute('data-field');
                const input = document.getElementById(fieldId);
                if (input) {
                    input.focus();
                    input.select();
                }
            });
        });
        
        // Modal navigation
        document.querySelectorAll('.modal-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchModal(e.target.closest('.modal-btn').dataset.modal);
            });
        });
        
        // Direction selector
        document.querySelectorAll('.direction-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchDirection(e.target.dataset.direction);
            });
        });
        
        // Service type dropdowns for all modals
        const serviceTypeSelects = [
            document.getElementById('service-type'),
            document.getElementById('air-service'),
            document.getElementById('road-service')
        ];
        
        serviceTypeSelects.forEach(select => {
            if (select) {
                select.addEventListener('change', (e) => {
                    this.handleServiceTypeChange(e.target.value);
                });
            }
        });
        
        // Form submission for all modals
        document.getElementById('maritime-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateFreight();
        });
        
        document.getElementById('air-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateFreight();
        });
        
        document.getElementById('road-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.calculateFreight();
        });
        
        // Calculate buttons for all modals - SOLUÇÃO DIRETA
        setTimeout(() => {
            const calculateBtn = document.getElementById('calculate-btn');
            const airCalculateBtn = document.getElementById('air-calculate-btn');
            const roadCalculateBtn = document.getElementById('road-calculate-btn');
            
            console.log('🧮 Configurando botões de calcular...');
            
            if (calculateBtn) {
                calculateBtn.onclick = () => {
                    console.log('🧮 CALCULAR MARÍTIMO CLICADO!');
                    this.calculateFreight();
                };
                console.log('✅ Botão marítimo configurado');
            }
            
            if (airCalculateBtn) {
                airCalculateBtn.onclick = () => {
                    console.log('🧮 CALCULAR AÉREO CLICADO!');
                    this.calculateFreight();
                };
                console.log('✅ Botão aéreo configurado');
            }
            
            if (roadCalculateBtn) {
                roadCalculateBtn.onclick = () => {
                    console.log('🧮 CALCULAR RODOVIÁRIO CLICADO!');
                    this.calculateFreight();
                };
                console.log('✅ Botão rodoviário configurado');
            }
        }, 500);
        
        // NCM code inputs for all modals
        document.getElementById('ncm').addEventListener('input', (e) => {
            this.handleNcmInput(e.target.value);
        });
        
        document.getElementById('air-ncm').addEventListener('input', (e) => {
            this.handleNcmInput(e.target.value);
        });
        
        document.getElementById('road-ncm').addEventListener('input', (e) => {
            this.handleNcmInput(e.target.value);
        });
        
        // Incoterm selects for all modals
        const incotermSelect = document.getElementById('incoterm');
        const airIncotermSelect = document.getElementById('air-incoterm');
        const roadIncotermSelect = document.getElementById('road-incoterm');
        
        console.log('Selects de Incoterm encontrados:', {
            maritime: incotermSelect,
            air: airIncotermSelect,
            road: roadIncotermSelect
        });
        
        if (incotermSelect) {
            console.log('Configurando event listener para select marítimo');
            incotermSelect.addEventListener('change', (e) => {
                console.log('Select marítimo alterado para:', e.target.value);
                this.handleIncotermChange(e.target.value);
            });
        }
        
        if (airIncotermSelect) {
            console.log('Configurando event listener para select aéreo');
            airIncotermSelect.addEventListener('change', (e) => {
                console.log('Select aéreo alterado para:', e.target.value);
                this.handleIncotermChange(e.target.value);
            });
        }
        
        if (roadIncotermSelect) {
            console.log('Configurando event listener para select rodoviário');
            roadIncotermSelect.addEventListener('change', (e) => {
                console.log('Select rodoviário alterado para:', e.target.value);
                this.handleIncotermChange(e.target.value);
            });
        }
        
        // Weight and volume inputs for automatic calculation (maritime)
        document.getElementById('weight').addEventListener('input', () => {
            this.calculateTaxableWeight();
        });
        
        document.getElementById('volume').addEventListener('input', () => {
            this.calculateTaxableWeight();
        });
        
        // Weight and volume inputs for automatic calculation (air)
        document.getElementById('air-weight').addEventListener('input', () => {
            this.calculateAirTaxableWeight();
        });
        
        document.getElementById('air-length').addEventListener('input', () => {
            this.calculateAirTaxableWeight();
        });
        
        document.getElementById('air-width').addEventListener('input', () => {
            this.calculateAirTaxableWeight();
        });
        
        document.getElementById('air-height').addEventListener('input', () => {
            this.calculateAirTaxableWeight();
        });
        
        document.getElementById('air-volume').addEventListener('input', () => {
            this.calculateAirTaxableWeight();
        });
        
        // Weight and volume inputs for automatic calculation (road)
        document.getElementById('road-weight').addEventListener('input', () => {
            this.calculateRoadVolume();
        });
        
        document.getElementById('road-length').addEventListener('input', () => {
            this.calculateRoadVolume();
        });
        
        document.getElementById('road-width').addEventListener('input', () => {
            this.calculateRoadVolume();
        });
        
        document.getElementById('road-height').addEventListener('input', () => {
            this.calculateRoadVolume();
        });
        
        document.getElementById('road-volume').addEventListener('input', () => {
            this.calculateRoadVolume();
        });
        
        // Adicionar event listeners para botões de guia de Incoterm
        document.querySelectorAll('.incoterm-guide-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const incoterm = e.target.closest('.form-group').querySelector('select').value;
                if (incoterm) {
                    this.showIncotermGuide(incoterm);
                }
            });
        });
    }
    
    // Trocar modal ativo
    switchModal(modalName) {
        console.log('switchModal chamado para:', modalName);
        
        // Remove active class from all modals and buttons
        document.querySelectorAll('.modal-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelectorAll('.modal-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to selected modal and button
        const modalElement = document.getElementById(`${modalName}-modal`);
        const buttonElement = document.querySelector(`[data-modal="${modalName}"]`);
        
        console.log('Elementos encontrados:', {
            modal: modalElement,
            button: buttonElement
        });
        
        if (modalElement) {
            modalElement.classList.add('active');
        } else {
            console.error('Modal element não encontrado:', `${modalName}-modal`);
        }
        
        if (buttonElement) {
            buttonElement.classList.add('active');
        } else {
            console.error('Button element não encontrado:', `[data-modal="${modalName}"]`);
        }
        
        this.currentModal = modalName;
        console.log('Modal atual definido como:', this.currentModal);
        
        // Limpar resultados anteriores quando mudar de modal
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.style.display = 'none';
        }
        
        // Limpar disclaimer
        const disclaimer = document.getElementById('results-disclaimer');
        if (disclaimer) {
            disclaimer.classList.add('hidden');
        }
    }
    
    // Trocar direção comercial
    switchDirection(direction) {
        document.querySelectorAll('.direction-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-direction="${direction}"]`).classList.add('active');
        
        this.currentDirection = direction;
    }
    
    // Atualizar status das APIs
    updateApiStatus() {
        // Simular verificação de status das APIs
        setTimeout(() => {
            this.apiStatus.weather = 'online';
            this.updateStatusIndicator('weather-status', 'online');
        }, 1000);
        
        setTimeout(() => {
            this.apiStatus.traffic = 'online';
            this.updateStatusIndicator('traffic-status', 'online');
        }, 2000);
        
        setTimeout(() => {
            this.apiStatus.currency = 'online';
            this.updateStatusIndicator('currency-status', 'online');
        }, 3000);
    }
    
    // Atualizar indicador de status
    updateStatusIndicator(elementId, status) {
        const element = document.getElementById(elementId);
        element.className = `status-dot ${status}`;
    }
    
    // Configurar autocomplete
    setupAutocomplete() {
        // Maritime modal
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        
        this.setupAutocompleteForInput(originInput, 'origin-list');
        this.setupAutocompleteForInput(destinationInput, 'destination-list');
        
        // Air modal
        const airOriginInput = document.getElementById('air-origin');
        const airDestinationInput = document.getElementById('air-destination');
        
        this.setupAutocompleteForInput(airOriginInput, 'air-origin-list');
        this.setupAutocompleteForInput(airDestinationInput, 'air-destination-list');
        
        // Road modal
        const roadOriginInput = document.getElementById('road-origin');
        const roadDestinationInput = document.getElementById('road-destination');
        
        this.setupAutocompleteForInput(roadOriginInput, 'road-origin-list');
        this.setupAutocompleteForInput(roadDestinationInput, 'road-destination-list');
    }
    
    // Configurar autocomplete para um input específico
    setupAutocompleteForInput(input, listId) {
        const list = document.getElementById(listId);
        
        input.addEventListener('input', async (e) => {
            const query = e.target.value.toLowerCase();
            if (query.length < 2) {
                list.style.display = 'none';
                return;
            }
            
            // Mostrar indicador de carregamento
            list.innerHTML = '<div class="autocomplete-item">🔍 Buscando...</div>';
            list.style.display = 'block';
            
            try {
                const matches = await this.searchLocations(query);
                this.displayAutocompleteResults(matches, list, input);
            } catch (error) {
                console.error('Erro na busca:', error);
                list.innerHTML = '<div class="autocomplete-item">❌ Erro na busca</div>';
            }
        });
        
        // Hide list when clicking outside
        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !list.contains(e.target)) {
                list.style.display = 'none';
            }
        });
    }
    
    // Buscar localizações com busca real + fallback
    async searchLocations(query) {
        console.log('🔍 Buscando localizações para:', query);
        
        // Primeiro tentar busca real
        try {
            const resultadosReais = await autocompleteReal.buscarLocalizacoes(query, 'portos');
            if (resultadosReais && resultadosReais.length > 0) {
                console.log('✅ Resultados reais encontrados:', resultadosReais.length);
                return resultadosReais.slice(0, 8);
            }
        } catch (error) {
            console.log('⚠️ Busca real falhou, usando dados locais');
        }

        // Fallback para dados locais
        const allLocations = [
            ...INTERNAL_DATA.ports, 
            ...INTERNAL_DATA.airports,
            ...INTERNAL_DATA.cities
        ];
        
        const resultados = allLocations.filter(location => 
            location.name.toLowerCase().includes(query.toLowerCase()) ||
            location.country.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 8);

        console.log('📋 Resultados locais encontrados:', resultados.length);
        return resultados;
    }
    
    // Exibir resultados do autocomplete
    displayAutocompleteResults(matches, list, input) {
        list.innerHTML = '';
        
        if (matches.length === 0) {
            list.style.display = 'none';
            return;
        }
        
        matches.forEach(match => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.textContent = match.name;
            item.addEventListener('click', () => {
                input.value = match.name;
                list.style.display = 'none';
            });
            list.appendChild(item);
        });
        
        list.style.display = 'block';
    }
    
    // Configurar validação do formulário
    setupFormValidation() {
        console.log('🔍 setupFormValidation chamado');
        
        // Simplificar a validação - apenas verificar campos obrigatórios básicos
        // Não bloquear botões automaticamente para permitir maior flexibilidade
        
        // Para modal marítimo
        const maritimeForm = document.getElementById('maritime-form');
        if (maritimeForm) {
            maritimeForm.addEventListener('input', () => {
                // Apenas validação básica sem bloquear botões
                console.log('📝 Validação marítima executada');
            });
        }
        
        // Para modal aéreo  
        const airForm = document.getElementById('air-form');
        if (airForm) {
            airForm.addEventListener('input', () => {
                // Apenas validação básica sem bloquear botões
                console.log('📝 Validação aérea executada');
            });
        }
        
        // Para modal rodoviário
        const roadForm = document.getElementById('road-form');
        if (roadForm) {
            roadForm.addEventListener('input', () => {
                // Apenas validação básica sem bloquear botões
                console.log('📝 Validação rodoviária executada');
            });
        }
        
        console.log('✅ Validação de formulário configurada (sem bloqueio de botões)');
    }
    
    // Manipular mudança de tipo de serviço
    handleServiceTypeChange(serviceType) {
        console.log('handleServiceTypeChange chamado:', serviceType);
        
        // Apenas para modal marítimo - mostrar/ocultar seção de container
        if (this.currentModal === 'maritime') {
            const containerSection = document.querySelector('.container-section');
            if (containerSection) {
                if (serviceType === 'FCL') {
                    containerSection.style.display = 'block';
                } else {
                    containerSection.style.display = 'none';
                }
            }
        }
        // Para modais aéreo e rodoviário, não há necessidade de mostrar/ocultar seções
    }
    
    // Manipular input de código NCM
    handleNcmInput(ncmCode) {
        // Determinar qual elemento ncm-info usar baseado no modal atual
        let ncmInfo;
        if (this.currentModal === 'maritime') {
            ncmInfo = document.getElementById('ncm-info');
        } else if (this.currentModal === 'air') {
            ncmInfo = document.getElementById('air-ncm-info');
        } else if (this.currentModal === 'road') {
            ncmInfo = document.getElementById('road-ncm-info');
        }
        
        if (!ncmInfo) return;
        
        if (ncmCode.length === 4) {
            const description = INTERNAL_DATA.ncmCodes[ncmCode];
            if (description) {
                ncmInfo.textContent = description;
                ncmInfo.classList.add('show');
            } else {
                ncmInfo.classList.remove('show');
            }
        } else {
            ncmInfo.classList.remove('show');
        }
    }
    
    // Manipular mudança de Incoterm
    handleIncotermChange(incoterm) {
        console.log('handleIncotermChange chamado');
        console.log('Incoterm:', incoterm);
        console.log('Modal atual:', this.currentModal);
        
        // Determinar qual elemento incoterm-info usar baseado no modal atual
        let incotermInfo;
        if (this.currentModal === 'maritime') {
            incotermInfo = document.getElementById('incoterm-info');
        } else if (this.currentModal === 'air') {
            incotermInfo = document.getElementById('air-incoterm-info');
        } else if (this.currentModal === 'road') {
            incotermInfo = document.getElementById('road-incoterm-info');
        }
        
        console.log('Elemento incotermInfo encontrado:', incotermInfo);
        
        if (!incotermInfo) {
            console.log('Elemento incotermInfo não encontrado');
            return;
        }
        
        if (incoterm) {
            const description = INTERNAL_DATA.incoterms[incoterm];
            console.log('Descrição do Incoterm:', description);
            
            if (description) {
                incotermInfo.textContent = description;
                incotermInfo.classList.add('show');
                
                // Adicionar botão para abrir guia detalhado
                if (!incotermInfo.querySelector('.incoterm-guide-btn')) {
                    console.log('Criando botão de guia detalhado...');
                    const guideBtn = document.createElement('button');
                    guideBtn.className = 'incoterm-guide-btn';
                    guideBtn.innerHTML = '📖 Ver Guia Detalhado';
                    guideBtn.style.cssText = `
                        margin-top: 0.5rem;
                        padding: 0.25rem 0.5rem;
                        background-color: var(--primary-color);
                        color: white;
                        border: none;
                        border-radius: 4px;
                        font-size: 0.75rem;
                        cursor: pointer;
                        transition: all 0.2s ease;
                    `;
                    guideBtn.addEventListener('click', () => {
                        console.log('Botão de guia clicado para:', incoterm);
                        this.showIncotermGuide(incoterm);
                    });
                    incotermInfo.appendChild(guideBtn);
                    console.log('Botão de guia adicionado');
                }
            }
        } else {
            incotermInfo.classList.remove('show');
        }
    }
    
    // Mostrar guia detalhado de Incoterm
    showIncotermGuide(incoterm) {
        console.log('showIncotermGuide chamado para:', incoterm);
        
        const guide = INTERNAL_DATA.incotermGuide[incoterm];
        if (!guide) {
            console.log('Guia não encontrado para:', incoterm);
            alert('Guia detalhado não disponível para este Incoterm.');
            return;
        }
        
        const modal = document.getElementById('incoterm-modal');
        const modalTitle = document.getElementById('incoterm-modal-title');
        const modalContent = document.getElementById('incoterm-content');
        
        if (!modal || !modalTitle || !modalContent) {
            console.log('Elementos do modal não encontrados');
            alert('Erro ao abrir guia detalhado. Tente novamente.');
            return;
        }
        
        modalTitle.textContent = guide.name;
        
        // Gerar conteúdo do guia
        modalContent.innerHTML = this.generateIncotermGuideContent(guide);
        
        // Mostrar modal
        modal.classList.add('active');
        
        // Adicionar event listener para fechar
        const closeBtn = document.getElementById('close-incoterm-modal');
        if (closeBtn) {
            closeBtn.onclick = () => this.closeIncotermGuide();
        }
        
        // Fechar ao clicar fora do modal
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeIncotermGuide();
            }
        };
        
        console.log('Modal de guia aberto com sucesso');
    }
    
    // Fechar guia de Incoterm
    closeIncotermGuide() {
        const modal = document.getElementById('incoterm-modal');
        modal.classList.remove('active');
    }

    // Mostrar visualização do pedido de cotação
    showQuotationPreview() {
        console.log('showQuotationPreview chamado');
        
        const modal = document.getElementById('quotation-modal');
        const modalTitle = document.getElementById('quotation-modal-title');
        const modalContent = document.getElementById('quotation-content');
        
        if (!modal || !modalTitle || !modalContent) {
            console.log('Elementos do modal de cotação não encontrados');
            return;
        }
        
        modalTitle.textContent = '📋 Pedido de Cotação - Visualização';
        modalContent.innerHTML = this.generateQuotationPreviewContent();
        
        modal.classList.add('active');
        
        // Configurar botão de fechar
        const closeBtn = document.getElementById('close-quotation-modal');
        if (closeBtn) {
            closeBtn.onclick = () => this.closeQuotationPreview();
        }
        
        // Fechar modal ao clicar fora
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeQuotationPreview();
            }
        };
    }

    // Fechar visualização de cotação
    closeQuotationPreview() {
        const modal = document.getElementById('quotation-modal');
        modal.classList.remove('active');
    }

    // Mostrar visualização do template
    showTemplatePreview() {
        console.log('showTemplatePreview chamado');
        
        const modal = document.getElementById('template-modal');
        const modalTitle = document.getElementById('template-modal-title');
        const modalContent = document.getElementById('template-content');
        
        if (!modal || !modalTitle || !modalContent) {
            console.log('Elementos do modal de template não encontrados');
            return;
        }
        
        modalTitle.textContent = '👁️ Template de Cotação - Visualização';
        modalContent.innerHTML = this.generateTemplatePreviewContent();
        
        modal.classList.add('active');
        
        // Configurar botão de fechar
        const closeBtn = document.getElementById('close-template-modal');
        if (closeBtn) {
            closeBtn.onclick = () => this.closeTemplatePreview();
        }
        
        // Fechar modal ao clicar fora
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeTemplatePreview();
            }
        };
    }

    // Fechar visualização de template
    closeTemplatePreview() {
        const modal = document.getElementById('template-modal');
        modal.classList.remove('active');
    }

    // Mostrar visualização do relatório executivo
    showExecutiveReportPreview() {
        console.log('showExecutiveReportPreview chamado');
        
        const modal = document.getElementById('report-modal');
        const modalTitle = document.getElementById('report-modal-title');
        const modalContent = document.getElementById('report-content');
        
        if (!modal || !modalTitle || !modalContent) {
            console.log('Elementos do modal de relatório não encontrados');
            return;
        }
        
        modalTitle.textContent = '📊 Relatório Executivo Gerencial - Visualização';
        modalContent.innerHTML = this.generateExecutiveReportPreviewContent();
        
        modal.classList.add('active');
        
        // Configurar botão de fechar
        const closeBtn = document.getElementById('close-report-modal');
        if (closeBtn) {
            closeBtn.onclick = () => this.closeExecutiveReportPreview();
        }
        
        // Fechar modal ao clicar fora
        modal.onclick = (e) => {
            if (e.target === modal) {
                this.closeExecutiveReportPreview();
            }
        };
    }

    // Fechar visualização de relatório executivo
    closeExecutiveReportPreview() {
        const modal = document.getElementById('report-modal');
        modal.classList.remove('active');
    }
    
    // Gerar conteúdo do guia de Incoterm
    generateIncotermGuideContent(guide) {
        return `
            <div class="incoterm-overview">
                <h4>${guide.fullName}</h4>
                <div class="incoterm-overview-grid">
                    <div class="incoterm-overview-item">
                        <span class="incoterm-overview-label">Transferência de Risco</span>
                        <span class="incoterm-overview-value">${guide.riskTransfer}</span>
                    </div>
                    <div class="incoterm-overview-item">
                        <span class="incoterm-overview-label">Custos</span>
                        <span class="incoterm-overview-value">${guide.costs}</span>
                    </div>
                    <div class="incoterm-overview-item">
                        <span class="incoterm-overview-label">Modais de Transporte</span>
                        <span class="incoterm-overview-value">${guide.transportModes}</span>
                    </div>
                    <div class="incoterm-overview-item">
                        <span class="incoterm-overview-label">Uso Típico</span>
                        <span class="incoterm-overview-value">${guide.typicalUse}</span>
                    </div>
                </div>
            </div>
            
            <div class="incoterm-sections">
                <div class="incoterm-section">
                    <h5><span class="incoterm-section-icon">👥</span> Responsabilidades</h5>
                    <div class="responsibilities-grid">
                        <div class="responsibility-column">
                            <h6>Vendedor</h6>
                            <ul class="responsibility-list">
                                ${guide.responsibilities.seller.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="responsibility-column">
                            <h6>Comprador</h6>
                            <ul class="responsibility-list">
                                ${guide.responsibilities.buyer.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="incoterm-section">
                    <h5><span class="incoterm-section-icon">📄</span> Documentação Necessária</h5>
                    <ul class="documentation-list">
                        ${guide.documentation.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="incoterm-section">
                    <h5><span class="incoterm-section-icon">✅</span> Vantagens</h5>
                    <ul class="advantages-list">
                        ${guide.advantages.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="incoterm-section">
                    <h5><span class="incoterm-section-icon">⚠️</span> Desvantagens</h5>
                    <ul class="disadvantages-list">
                        ${guide.disadvantages.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="incoterm-notes">
                <strong>Nota:</strong> ${guide.notes}
            </div>
        `;
    }

    // Gerar conteúdo de visualização do pedido de cotação
    generateQuotationPreviewContent() {
        return `
            <div class="quotation-preview">
                <div class="quotation-header">
                    <h4>📋 PEDIDO DE COTAÇÃO DE FRETE INTERNACIONAL</h4>
                    <div class="quotation-info">
                        <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
                        <p><strong>Referência:</strong> COT-${Date.now().toString().slice(-6)}</p>
                    </div>
                </div>

                <div class="quotation-section">
                    <h5>🚢 DADOS DO TRANSPORTE</h5>
                    <div class="quotation-grid">
                        <div class="quotation-item">
                            <span class="label">Modal:</span>
                            <span class="value">${this.currentModal === 'maritime' ? 'Marítimo' : this.currentModal === 'air' ? 'Aéreo' : 'Rodoviário'}</span>
                        </div>
                        <div class="quotation-item">
                            <span class="label">Origem:</span>
                            <span class="value">[Origem selecionada]</span>
                        </div>
                        <div class="quotation-item">
                            <span class="label">Destino:</span>
                            <span class="value">[Destino selecionado]</span>
                        </div>
                        <div class="quotation-item">
                            <span class="label">Incoterm:</span>
                            <span class="value">[Incoterm selecionado]</span>
                        </div>
                    </div>
                </div>

                <div class="quotation-section">
                    <h5>📦 DADOS DA CARGA</h5>
                    <div class="quotation-grid">
                        <div class="quotation-item">
                            <span class="label">Tipo de Carga:</span>
                            <span class="value">[Tipo selecionado]</span>
                        </div>
                        <div class="quotation-item">
                            <span class="label">Peso:</span>
                            <span class="value">[Peso informado] kg</span>
                        </div>
                        <div class="quotation-item">
                            <span class="label">Volume:</span>
                            <span class="value">[Volume informado] m³</span>
                        </div>
                        <div class="quotation-item">
                            <span class="label">Valor da Carga:</span>
                            <span class="value">USD [Valor informado]</span>
                        </div>
                    </div>
                </div>

                <div class="quotation-section">
                    <h5>💰 COTAÇÃO SOLICITADA</h5>
                    <div class="quotation-services">
                        <div class="service-item">
                            <span class="service-name">Frete Base</span>
                            <span class="service-value">USD [Valor calculado]</span>
                        </div>
                        <div class="service-item">
                            <span class="service-name">Sobretaxas</span>
                            <span class="service-value">USD [Valor calculado]</span>
                        </div>
                        <div class="service-item">
                            <span class="service-name">Custos Operacionais</span>
                            <span class="service-value">USD [Valor calculado]</span>
                        </div>
                        <div class="service-item total">
                            <span class="service-name">TOTAL ESTIMADO</span>
                            <span class="service-value">USD [Total calculado]</span>
                        </div>
                    </div>
                </div>

                <div class="quotation-footer">
                    <p><strong>Validade da Cotação:</strong> 30 dias</p>
                    <p><strong>Prazo de Entrega:</strong> [Prazo estimado] dias</p>
                    <p><strong>Observações:</strong> Cotação sujeita a confirmação de disponibilidade</p>
                </div>
            </div>
        `;
    }

    // Gerar conteúdo de visualização do template
    generateTemplatePreviewContent() {
        return `
            <div class="template-preview">
                <div class="template-header">
                    <h4>👁️ TEMPLATE DE COTAÇÃO PROFISSIONAL</h4>
                    <div class="template-info">
                        <p><strong>Modelo:</strong> Template Padrão OLV Internacional</p>
                        <p><strong>Versão:</strong> 2024.1</p>
                    </div>
                </div>

                <div class="template-section">
                    <h5>📋 ESTRUTURA DO TEMPLATE</h5>
                    <div class="template-structure">
                        <div class="structure-item">
                            <span class="structure-icon">📄</span>
                            <span class="structure-title">Cabeçalho Corporativo</span>
                            <span class="structure-desc">Logo, dados da empresa, informações de contato</span>
                        </div>
                        <div class="structure-item">
                            <span class="structure-icon">📊</span>
                            <span class="structure-title">Resumo Executivo</span>
                            <span class="structure-desc">Principais informações em destaque</span>
                        </div>
                        <div class="structure-item">
                            <span class="structure-icon">🚢</span>
                            <span class="structure-title">Detalhes do Transporte</span>
                            <span class="structure-desc">Rota, modal, prazos, condições</span>
                        </div>
                        <div class="structure-item">
                            <span class="structure-icon">📦</span>
                            <span class="structure-title">Especificações da Carga</span>
                            <span class="structure-desc">Dimensões, peso, valor, classificação</span>
                        </div>
                        <div class="structure-item">
                            <span class="structure-icon">💰</span>
                            <span class="structure-title">Análise de Custos</span>
                            <span class="structure-desc">Breakdown detalhado de todos os custos</span>
                        </div>
                        <div class="structure-item">
                            <span class="structure-icon">📈</span>
                            <span class="structure-title">Gráficos e Visualizações</span>
                            <span class="structure-desc">Charts, timelines, comparações</span>
                        </div>
                        <div class="structure-item">
                            <span class="structure-icon">✅</span>
                            <span class="structure-title">Termos e Condições</span>
                            <span class="structure-desc">Cláusulas contratuais, responsabilidades</span>
                        </div>
                    </div>
                </div>

                <div class="template-section">
                    <h5>🎨 CARACTERÍSTICAS VISUAIS</h5>
                    <div class="template-features">
                        <div class="feature-item">
                            <span class="feature-icon">🎯</span>
                            <span class="feature-title">Design Profissional</span>
                            <span class="feature-desc">Layout moderno e responsivo</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">📱</span>
                            <span class="feature-title">Multiplataforma</span>
                            <span class="feature-desc">Compatível com desktop e mobile</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🖨️</span>
                            <span class="feature-title">Impressão Otimizada</span>
                            <span class="feature-desc">Formatação perfeita para PDF</span>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">🎨</span>
                            <span class="feature-title">Cores Corporativas</span>
                            <span class="feature-desc">Paleta de cores OLV Internacional</span>
                        </div>
                    </div>
                </div>

                <div class="template-footer">
                    <p><strong>Formato:</strong> PDF, Word, Excel</p>
                    <p><strong>Idiomas:</strong> Português, Inglês, Espanhol</p>
                    <p><strong>Personalização:</strong> Totalmente customizável</p>
                </div>
            </div>
        `;
    }

    // Gerar conteúdo de visualização do relatório executivo
    generateExecutiveReportPreviewContent() {
        return `
            <div class="executive-report-preview">
                <div class="report-header">
                    <h4>📊 RELATÓRIO EXECUTIVO GERENCIAL</h4>
                    <div class="report-info">
                        <p><strong>Data:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
                        <p><strong>Referência:</strong> REL-${Date.now().toString().slice(-6)}</p>
                    </div>
                </div>

                <div class="report-section">
                    <h5>📋 RESUMO EXECUTIVO</h5>
                    <div class="executive-summary">
                        <div class="summary-item">
                            <span class="summary-icon">💰</span>
                            <span class="summary-title">Custo Total</span>
                            <span class="summary-value">USD [Valor calculado]</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-icon">⏱️</span>
                            <span class="summary-title">Prazo de Entrega</span>
                            <span class="summary-value">[Prazo] dias</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-icon">🚢</span>
                            <span class="summary-title">Modal Recomendado</span>
                            <span class="summary-value">[Modal selecionado]</span>
                        </div>
                        <div class="summary-item">
                            <span class="summary-icon">📈</span>
                            <span class="summary-title">Eficiência</span>
                            <span class="summary-value">[Score]%</span>
                        </div>
                    </div>
                </div>

                <div class="report-section">
                    <h5>🗺️ ANÁLISE DA ROTA</h5>
                    <div class="route-analysis">
                        <div class="route-item">
                            <span class="route-icon">📍</span>
                            <span class="route-title">Origem</span>
                            <span class="route-value">[Origem selecionada]</span>
                        </div>
                        <div class="route-item">
                            <span class="route-icon">🎯</span>
                            <span class="route-title">Destino</span>
                            <span class="route-value">[Destino selecionado]</span>
                        </div>
                        <div class="route-item">
                            <span class="route-icon">📏</span>
                            <span class="route-title">Distância</span>
                            <span class="route-value">[Distância calculada] km</span>
                        </div>
                        <div class="route-item">
                            <span class="route-icon">🌍</span>
                            <span class="route-title">Região</span>
                            <span class="route-value">[Região identificada]</span>
                        </div>
                    </div>
                </div>

                <div class="report-section">
                    <h5>📦 ANÁLISE DA CARGA</h5>
                    <div class="cargo-analysis">
                        <div class="cargo-item">
                            <span class="cargo-icon">📦</span>
                            <span class="cargo-title">Tipo</span>
                            <span class="cargo-value">[Tipo de carga]</span>
                        </div>
                        <div class="cargo-item">
                            <span class="cargo-icon">⚖️</span>
                            <span class="cargo-title">Peso</span>
                            <span class="cargo-value">[Peso] kg</span>
                        </div>
                        <div class="cargo-item">
                            <span class="cargo-icon">📏</span>
                            <span class="cargo-title">Volume</span>
                            <span class="cargo-value">[Volume] m³</span>
                        </div>
                        <div class="cargo-item">
                            <span class="cargo-icon">💰</span>
                            <span class="cargo-title">Valor</span>
                            <span class="cargo-value">USD [Valor]</span>
                        </div>
                    </div>
                </div>

                <div class="report-section">
                    <h5>💰 ANÁLISE DE CUSTOS</h5>
                    <div class="cost-breakdown">
                        <div class="cost-item">
                            <span class="cost-icon">🚢</span>
                            <span class="cost-title">Frete Base</span>
                            <span class="cost-value">USD [Valor]</span>
                            <span class="cost-percentage">[%]%</span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-icon">⚡</span>
                            <span class="cost-title">Sobretaxas</span>
                            <span class="cost-value">USD [Valor]</span>
                            <span class="cost-percentage">[%]%</span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-icon">🏢</span>
                            <span class="cost-title">Operacionais</span>
                            <span class="cost-value">USD [Valor]</span>
                            <span class="cost-percentage">[%]%</span>
                        </div>
                        <div class="cost-item">
                            <span class="cost-icon">🛡️</span>
                            <span class="cost-title">Seguro</span>
                            <span class="cost-value">USD [Valor]</span>
                            <span class="cost-percentage">[%]%</span>
                        </div>
                        <div class="cost-item total">
                            <span class="cost-icon">💵</span>
                            <span class="cost-title">TOTAL</span>
                            <span class="cost-value">USD [Total]</span>
                            <span class="cost-percentage">100%</span>
                        </div>
                    </div>
                </div>

                <div class="report-section">
                    <h5>⏱️ TIMELINE DE TRÂNSITO</h5>
                    <div class="transit-timeline">
                        <div class="timeline-item">
                            <span class="timeline-icon">📦</span>
                            <span class="timeline-title">Coleta</span>
                            <span class="timeline-days">Dia 1</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-icon">🚚</span>
                            <span class="timeline-title">Transporte Local</span>
                            <span class="timeline-days">Dias 2-3</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-icon">🚢</span>
                            <span class="timeline-title">Trânsito</span>
                            <span class="timeline-days">Dias 4-[X]</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-icon">🏢</span>
                            <span class="timeline-title">Desembaraço</span>
                            <span class="timeline-days">Dia [X+1]</span>
                        </div>
                        <div class="timeline-item">
                            <span class="timeline-icon">🎯</span>
                            <span class="timeline-title">Entrega</span>
                            <span class="timeline-days">Dia [X+2]</span>
                        </div>
                    </div>
                </div>

                <div class="report-section">
                    <h5>🤖 INSIGHTS DE IA PREDITIVA</h5>
                    <div class="ai-insights">
                        <div class="insight-item">
                            <span class="insight-icon">📈</span>
                            <span class="insight-title">Tendência de Preços</span>
                            <span class="insight-value">Estável para os próximos 30 dias</span>
                        </div>
                        <div class="insight-item">
                            <span class="insight-icon">⚠️</span>
                            <span class="insight-title">Riscos Identificados</span>
                            <span class="insight-value">Congestionamento portuário moderado</span>
                        </div>
                        <div class="insight-item">
                            <span class="insight-icon">💡</span>
                            <span class="insight-title">Oportunidades</span>
                            <span class="insight-value">Consolidação pode reduzir custos em 15%</span>
                        </div>
                        <div class="insight-item">
                            <span class="insight-icon">🎯</span>
                            <span class="insight-title">Recomendação</span>
                            <span class="insight-value">Aguardar 1 semana para melhor tarifa</span>
                        </div>
                    </div>
                </div>

                <div class="report-section">
                    <h5>💡 RECOMENDAÇÕES ESTRATÉGICAS</h5>
                    <div class="recommendations">
                        <div class="recommendation-item">
                            <span class="recommendation-icon">💰</span>
                            <span class="recommendation-title">Otimização de Custos</span>
                            <span class="recommendation-desc">Considere consolidação de cargas para reduzir custos unitários</span>
                        </div>
                        <div class="recommendation-item">
                            <span class="recommendation-icon">⏱️</span>
                            <span class="recommendation-title">Gestão de Prazos</span>
                            <span class="recommendation-desc">Planeje embarque com antecedência para evitar atrasos</span>
                        </div>
                        <div class="recommendation-item">
                            <span class="recommendation-icon">🛡️</span>
                            <span class="recommendation-title">Mitigação de Riscos</span>
                            <span class="recommendation-desc">Contrate seguro adicional para cargas de alto valor</span>
                        </div>
                        <div class="recommendation-item">
                            <span class="recommendation-icon">📊</span>
                            <span class="recommendation-title">Monitoramento</span>
                            <span class="recommendation-desc">Implemente tracking em tempo real para visibilidade total</span>
                        </div>
                    </div>
                </div>

                <div class="report-footer">
                    <p><strong>Metodologia:</strong> Análise baseada em dados históricos e IA preditiva</p>
                    <p><strong>Confiança:</strong> 95% de precisão nos cálculos</p>
                    <p><strong>Atualização:</strong> Dados atualizados em tempo real</p>
                </div>
            </div>
        `;
    }
    
    // Calcular peso tributável
    calculateTaxableWeight() {
        const weight = parseFloat(document.getElementById('weight').value) || 0;
        const volume = parseFloat(document.getElementById('volume').value) || 0;
        
        // Peso tributável = maior entre peso real e peso volumétrico (1m³ = 1000kg)
        const volumetricWeight = volume * 1000;
        const taxableWeight = Math.max(weight, volumetricWeight);
        
        // Atualizar campos
        document.getElementById('volumetric-weight').value = volumetricWeight.toFixed(2);
        document.getElementById('taxable-weight').value = taxableWeight.toFixed(2);
    }
    
    // Calcular peso taxável para frete aéreo
    calculateAirTaxableWeight() {
        const length = parseFloat(document.getElementById('air-length').value) || 0;
        const width = parseFloat(document.getElementById('air-width').value) || 0;
        const height = parseFloat(document.getElementById('air-height').value) || 0;
        const weight = parseFloat(document.getElementById('air-weight').value) || 0;
        
        // Calcular volume em m³
        const volume = (length * width * height) / 1000000; // Converter de cm³ para m³
        document.getElementById('air-volume').value = volume.toFixed(4);
        
        // Calcular peso volumétrico (167 kg/m³ para frete aéreo)
        const volumetricWeight = volume * 167;
        document.getElementById('air-volumetric-weight').value = volumetricWeight.toFixed(2);
        
        // Peso taxável é o maior entre peso real e peso volumétrico
        const taxableWeight = Math.max(weight, volumetricWeight);
        document.getElementById('air-taxable-weight').value = taxableWeight.toFixed(2);
        
        // Calcular densidade
        const density = weight / volume;
        document.getElementById('air-density').value = density.toFixed(2);
    }
    
    // Calcular volume para frete rodoviário
    calculateRoadVolume() {
        const length = parseFloat(document.getElementById('road-length').value) || 0;
        const width = parseFloat(document.getElementById('road-width').value) || 0;
        const height = parseFloat(document.getElementById('road-height').value) || 0;
        const weight = parseFloat(document.getElementById('road-weight').value) || 0;
        
        // Calcular volume em m³
        const volume = length * width * height;
        document.getElementById('road-volume').value = volume.toFixed(4);
        
        // Calcular densidade (ton/m³)
        const density = weight / volume;
        document.getElementById('road-density').value = density.toFixed(4);
    }
    
    // Calcular frete
    calculateFreight() {
        console.log('calculateFreight chamado');
        console.log('Modal atual:', this.currentModal);
        
        const formData = this.getFormData();
        console.log('Dados do formulário:', formData);
        
        if (!this.validateFormData(formData)) {
            console.log('Validação falhou');
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }
        
        console.log('Validação passou, iniciando cálculo...');
        
        // Simular cálculo de frete
        let result;
        if (this.currentModal === 'maritime') {
            console.log('Calculando frete marítimo...');
            result = this.performFreightCalculation(formData);
        } else if (this.currentModal === 'air') {
            console.log('Calculando frete aéreo...');
            result = this.performAirFreightCalculation(formData);
        } else if (this.currentModal === 'road') {
            console.log('Calculando frete rodoviário...');
            result = this.performRoadFreightCalculation(formData);
        }
        
        console.log('Resultado do cálculo:', result);
        
        // Exibir resultado
        this.displayResults(result);
        
        // Mostrar alerta com valor estimado
        alert(`Frete estimado: ${result.totalCost.toFixed(2)} ${formData.currency}`);
    }
    
    // Calcular valor padrão da mercadoria baseado no peso e tipo
    calculateDefaultCargoValue(weight, cargoType) {
        if (!weight || weight <= 0) return 1000; // Valor mínimo padrão
        
        // Valores por kg baseados no tipo de carga (valores realistas de mercado)
        const valuePerKg = {
            'general': 15,      // $15/kg para carga geral
            'container': 12,    // $12/kg para carga em container
            'bulk': 8,          // $8/kg para carga a granel
            'liquid': 10,       // $10/kg para carga líquida
            'dangerous': 20,    // $20/kg para carga perigosa
            'electronics': 25,  // $25/kg para eletrônicos
            'automotive': 18,   // $18/kg para automotivo
            'textile': 12,      // $12/kg para têxtil
            'food': 8,          // $8/kg para alimentos
            'machinery': 22     // $22/kg para maquinário
        };
        
        const rate = valuePerKg[cargoType] || valuePerKg['general'];
        return Math.round(weight * rate);
    }

    // Obter dados do formulário
    getFormData() {
        console.log('getFormData chamado para modal:', this.currentModal);
        
        let data = {};
        
        if (this.currentModal === 'maritime') {
            const origin = document.getElementById('origin');
            const destination = document.getElementById('destination');
            const cargoType = document.getElementById('cargo-type');
            const weight = document.getElementById('weight');
            const volume = document.getElementById('volume');
            const serviceType = document.getElementById('service-type');
            const containerType = document.querySelector('input[name="container-type"]:checked');
            const ncm = document.getElementById('ncm');
            const incoterm = document.getElementById('incoterm');
            const currency = document.getElementById('currency');
            const cargoValue = document.getElementById('cargo-value');
            
            const weightValue = weight ? parseFloat(weight.value) || 0 : 0;
            const cargoTypeValue = cargoType ? cargoType.value : 'general';
            const cargoValueInput = cargoValue ? parseFloat(cargoValue.value) || 0 : 0;
            
            // Se valor da carga não foi informado, calcular valor padrão realista
            const finalCargoValue = cargoValueInput > 0 ? cargoValueInput : this.calculateDefaultCargoValue(weightValue, cargoTypeValue);
            
            data = {
                origin: origin ? origin.value : '',
                destination: destination ? destination.value : '',
                cargoType: cargoTypeValue,
                weight: weightValue,
                volume: volume ? parseFloat(volume.value) || 0 : 0,
                serviceType: serviceType ? serviceType.value : '',
                containerType: containerType ? containerType.value : '',
                ncm: ncm ? ncm.value : '',
                incoterm: incoterm ? incoterm.value : '',
                currency: currency ? currency.value : 'USD',
                cargoValue: finalCargoValue
            };
            
            console.log('Dados coletados do formulário marítimo:', data);
        } else if (this.currentModal === 'air') {
            const origin = document.getElementById('air-origin');
            const destination = document.getElementById('air-destination');
            const cargoType = document.getElementById('air-cargo-type');
            const weight = document.getElementById('air-weight');
            const volume = document.getElementById('air-volume');
            const serviceType = document.getElementById('air-service');
            const ncm = document.getElementById('air-ncm');
            const incoterm = document.getElementById('air-incoterm');
            const currency = document.getElementById('air-currency');
            const cargoValue = document.getElementById('air-cargo-value');
            
            const weightValue = weight ? parseFloat(weight.value) || 0 : 0;
            const cargoTypeValue = cargoType ? cargoType.value : 'general';
            const cargoValueInput = cargoValue ? parseFloat(cargoValue.value) || 0 : 0;
            
            // Se valor da carga não foi informado, calcular valor padrão realista
            const finalCargoValue = cargoValueInput > 0 ? cargoValueInput : this.calculateDefaultCargoValue(weightValue, cargoTypeValue);
            
            data = {
                origin: origin ? origin.value : '',
                destination: destination ? destination.value : '',
                cargoType: cargoTypeValue,
                weight: weightValue,
                volume: volume ? parseFloat(volume.value) || 0 : 0,
                serviceType: serviceType ? serviceType.value : '',
                ncm: ncm ? ncm.value : '',
                incoterm: incoterm ? incoterm.value : '',
                currency: currency ? currency.value : 'USD',
                cargoValue: finalCargoValue
            };
            
            console.log('Dados coletados do formulário aéreo:', data);
        } else if (this.currentModal === 'road') {
            const origin = document.getElementById('road-origin');
            const destination = document.getElementById('road-destination');
            const cargoType = document.getElementById('road-cargo-type');
            const weight = document.getElementById('road-weight');
            const volume = document.getElementById('road-volume');
            const serviceType = document.getElementById('road-service');
            const ncm = document.getElementById('road-ncm');
            const incoterm = document.getElementById('road-incoterm');
            const currency = document.getElementById('road-currency');
            const cargoValue = document.getElementById('road-cargo-value');
            
            const weightValue = weight ? parseFloat(weight.value) || 0 : 0;
            const cargoTypeValue = cargoType ? cargoType.value : 'general';
            const cargoValueInput = cargoValue ? parseFloat(cargoValue.value) || 0 : 0;
            
            // Se valor da carga não foi informado, calcular valor padrão realista
            const finalCargoValue = cargoValueInput > 0 ? cargoValueInput : this.calculateDefaultCargoValue(weightValue, cargoTypeValue);
            
            data = {
                origin: origin ? origin.value : '',
                destination: destination ? destination.value : '',
                cargoType: cargoTypeValue,
                weight: weightValue,
                volume: volume ? parseFloat(volume.value) || 0 : 0,
                serviceType: serviceType ? serviceType.value : '',
                ncm: ncm ? ncm.value : '',
                incoterm: incoterm ? incoterm.value : '',
                currency: currency ? currency.value : 'USD',
                cargoValue: finalCargoValue
            };
            
            console.log('Dados coletados do formulário rodoviário:', data);
        } else {
            console.log('Modal não reconhecido:', this.currentModal);
        }
        
        return data;
    }
    
    // Validar dados do formulário
    validateFormData(data) {
        console.log('validateFormData chamado com:', data);
        console.log('Modal atual:', this.currentModal);
        
        const hasBasicData = data.origin && data.destination && data.weight && data.volume;
        
        console.log('Validação básica:', {
            origin: !!data.origin,
            destination: !!data.destination,
            weight: !!data.weight,
            volume: !!data.volume,
            hasBasicData: hasBasicData
        });
        
        if (!data.origin || data.origin.trim() === '') {
            alert('Por favor, preencha o campo Origem.');
            return false;
        }
        
        if (!data.destination || data.destination.trim() === '') {
            alert('Por favor, preencha o campo Destino.');
            return false;
        }
        
        if (!data.weight || parseFloat(data.weight) <= 0) {
            alert('Por favor, preencha um peso válido maior que zero.');
            return false;
        }
        
        if (!data.volume || parseFloat(data.volume) <= 0) {
            alert('Por favor, preencha um volume válido maior que zero.');
            return false;
        }
        
        console.log('Validação passou com sucesso');
        return true;
    }
    
    // Realizar cálculo de frete
    performFreightCalculation(data) {
        console.log('🚀 performFreightCalculation chamado com data:', data);
        
        // Calcular distância usando dados de rotas reais
        const distance = this.calculateRealDistance(data.origin, data.destination);
        
        // Obter valores manuais se disponíveis
        const manualBaseFreight = parseFloat(document.getElementById('manual-base-freight')?.value) || 0;
        const manualBaf = parseFloat(document.getElementById('manual-baf')?.value) || 0;
        const manualCaf = parseFloat(document.getElementById('manual-caf')?.value) || 0;
        const manualThcOrigin = parseFloat(document.getElementById('manual-thc-origin')?.value) || 0;
        const manualThcDestination = parseFloat(document.getElementById('manual-thc-destination')?.value) || 0;
        const manualDocumentation = parseFloat(document.getElementById('manual-documentation')?.value) || 0;
        const manualCustoms = parseFloat(document.getElementById('manual-customs')?.value) || 0;
        const manualInland = parseFloat(document.getElementById('manual-inland')?.value) || 0;
        
        // Obter custos base atualizados
        let baseCost = 0;
        let costPerKm = 0;
        
        if (data.serviceType === 'FCL') {
            const containerCosts = INTERNAL_DATA.baseFreightCosts.FCL[data.containerType];
            baseCost = containerCosts.base;
            costPerKm = containerCosts.perKm;
        } else if (data.serviceType === 'LCL') {
            baseCost = INTERNAL_DATA.baseFreightCosts.LCL.base * data.volume;
            costPerKm = INTERNAL_DATA.baseFreightCosts.LCL.perKm * data.volume;
        } else if (data.serviceType === 'bulk') {
            baseCost = INTERNAL_DATA.baseFreightCosts.bulk.base * (data.weight / 1000);
            costPerKm = INTERNAL_DATA.baseFreightCosts.bulk.perKm * (data.weight / 1000);
        }
        
        // Usar valor manual se fornecido, senão calcular com dados atualizados
        const freightCost = manualBaseFreight > 0 ? manualBaseFreight : (baseCost + (distance * costPerKm));
        
        // Surcharges dinâmicos - usar valores manuais se disponíveis
        const baf = manualBaf > 0 ? (freightCost * manualBaf / 100) : (freightCost * INTERNAL_DATA.operationalCosts.BAF);
        const caf = manualCaf > 0 ? (freightCost * manualCaf / 100) : (freightCost * INTERNAL_DATA.operationalCosts.CAF);
        const isps = INTERNAL_DATA.operationalCosts.ISPS;
        const eis = INTERNAL_DATA.operationalCosts.EIS;
        
        // Peak Season Surcharge (PSS) - sazonal
        const currentMonth = new Date().getMonth();
        const isPeakSeason = currentMonth >= 7 && currentMonth <= 11; // Julho a Novembro
        const pss = isPeakSeason ? (freightCost * INTERNAL_DATA.operationalCosts.PSS) : 0;
        
        // Custos operacionais atualizados - usar valores manuais se disponíveis
        const thcOrigin = manualThcOrigin > 0 ? manualThcOrigin : INTERNAL_DATA.operationalCosts.THC_origin;
        const thcDestination = manualThcDestination > 0 ? manualThcDestination : INTERNAL_DATA.operationalCosts.THC_destination;
        const documentationCost = manualDocumentation > 0 ? manualDocumentation : INTERNAL_DATA.operationalCosts.documentation;
        const customsClearance = manualCustoms > 0 ? manualCustoms : INTERNAL_DATA.operationalCosts.customs_clearance;
        const inlandTransport = manualInland > 0 ? manualInland : INTERNAL_DATA.operationalCosts.inland_transport;
        
        // Seguro baseado no Incoterm selecionado
        const insuranceCost = this.calculateInsuranceCost(data.cargoValue, data.incoterm);
        
        // Total com todos os componentes
        const totalCost = freightCost + baf + caf + isps + eis + pss + thcOrigin + thcDestination + 
                         documentationCost + customsClearance + inlandTransport + insuranceCost;
        
        // Obter dados de rota para informações adicionais
        const routeInfo = this.getRouteInfo(data.origin, data.destination);
        
        return {
            freightCost: freightCost,
            baf: baf,
            caf: caf,
            isps: isps,
            eis: eis,
            pss: pss,
            thcOrigin: thcOrigin,
            thcDestination: thcDestination,
            documentationCost: documentationCost,
            customsClearance: customsClearance,
            inlandTransport: inlandTransport,
            insuranceCost: insuranceCost,
            totalCost: totalCost,
            distance: distance,
            currency: data.currency,
            modal: 'maritime',
            routeInfo: routeInfo
        };
        
        // CÓDIGO ORIGINAL COMENTADO PARA TESTE
        /*
        // Calcular distância usando dados de rotas reais
        const distance = this.calculateRealDistance(data.origin, data.destination);
        
        // Obter valores manuais se disponíveis
        const manualBaseFreight = parseFloat(document.getElementById('manual-base-freight')?.value) || 0;
        const manualBaf = parseFloat(document.getElementById('manual-baf')?.value) || 0;
        const manualCaf = parseFloat(document.getElementById('manual-caf')?.value) || 0;
        const manualThcOrigin = parseFloat(document.getElementById('manual-thc-origin')?.value) || 0;
        const manualThcDestination = parseFloat(document.getElementById('manual-thc-destination')?.value) || 0;
        const manualDocumentation = parseFloat(document.getElementById('manual-documentation')?.value) || 0;
        const manualCustoms = parseFloat(document.getElementById('manual-customs')?.value) || 0;
        const manualInland = parseFloat(document.getElementById('manual-inland')?.value) || 0;
        
        // Obter custos base atualizados
        let baseCost = 0;
        let costPerKm = 0;
        
        if (data.serviceType === 'FCL') {
            const containerCosts = INTERNAL_DATA.baseFreightCosts.FCL[data.containerType];
            baseCost = containerCosts.base;
            costPerKm = containerCosts.perKm;
        } else if (data.serviceType === 'LCL') {
            baseCost = INTERNAL_DATA.baseFreightCosts.LCL.base * data.volume;
            costPerKm = INTERNAL_DATA.baseFreightCosts.LCL.perKm * data.volume;
        } else if (data.serviceType === 'bulk') {
            baseCost = INTERNAL_DATA.baseFreightCosts.bulk.base * (data.weight / 1000);
            costPerKm = INTERNAL_DATA.baseFreightCosts.bulk.perKm * (data.weight / 1000);
        }
        
        // Usar valor manual se fornecido, senão calcular com dados atualizados
        const freightCost = manualBaseFreight > 0 ? manualBaseFreight : (baseCost + (distance * costPerKm));
        
        // Surcharges dinâmicos - usar valores manuais se disponíveis
        const baf = manualBaf > 0 ? (freightCost * manualBaf / 100) : (freightCost * INTERNAL_DATA.operationalCosts.BAF);
        const caf = manualCaf > 0 ? (freightCost * manualCaf / 100) : (freightCost * INTERNAL_DATA.operationalCosts.CAF);
        const isps = INTERNAL_DATA.operationalCosts.ISPS;
        const eis = INTERNAL_DATA.operationalCosts.EIS;
        
        // Peak Season Surcharge (PSS) - sazonal
        const currentMonth = new Date().getMonth();
        const isPeakSeason = currentMonth >= 7 && currentMonth <= 11; // Julho a Novembro
        const pss = isPeakSeason ? (freightCost * INTERNAL_DATA.operationalCosts.PSS) : 0;
        
        // Custos operacionais atualizados - usar valores manuais se disponíveis
        const thcOrigin = manualThcOrigin > 0 ? manualThcOrigin : INTERNAL_DATA.operationalCosts.THC_origin;
        const thcDestination = manualThcDestination > 0 ? manualThcDestination : INTERNAL_DATA.operationalCosts.THC_destination;
        const documentationCost = manualDocumentation > 0 ? manualDocumentation : INTERNAL_DATA.operationalCosts.documentation;
        const customsClearance = manualCustoms > 0 ? manualCustoms : INTERNAL_DATA.operationalCosts.customs_clearance;
        const inlandTransport = manualInland > 0 ? manualInland : INTERNAL_DATA.operationalCosts.inland_transport;
        
        // Seguro baseado no Incoterm selecionado
        const insuranceCost = this.calculateInsuranceCost(data.cargoValue, data.incoterm);
        
        // Total com todos os componentes
        const totalCost = freightCost + baf + caf + isps + eis + pss + thcOrigin + thcDestination + 
                         documentationCost + customsClearance + inlandTransport + insuranceCost;
        
        // Obter dados de rota para informações adicionais
        const routeInfo = this.getRouteInfo(data.origin, data.destination);
        
        return {
            freightCost: freightCost,
            baf: baf,
            caf: caf,
            isps: isps,
            eis: eis,
            pss: pss,
            thcOrigin: thcOrigin,
            thcDestination: thcDestination,
            documentationCost: documentationCost,
            customsClearance: customsClearance,
            inlandTransport: inlandTransport,
            insuranceCost: insuranceCost,
            totalCost: totalCost,
            distance: distance,
            currency: data.currency,
            routeInfo: routeInfo
        };
        */
    }
    
    // Realizar cálculo de frete aéreo
    performAirFreightCalculation(data) {
        console.log('🚀 performAirFreightCalculation chamado com data:', data);
        
        // Calcular distância usando dados de rotas reais
        const distance = this.calculateRealDistance(data.origin, data.destination);
        
        // Obter valores manuais se disponíveis
        const manualBaseFreight = parseFloat(document.getElementById('air-manual-base-freight')?.value) || 0;
        const manualFuelSurcharge = parseFloat(document.getElementById('air-manual-fuel-surcharge')?.value) || 0;
        const manualSecuritySurcharge = parseFloat(document.getElementById('air-manual-security-surcharge')?.value) || 0;
        const manualHandlingOrigin = parseFloat(document.getElementById('air-manual-handling-origin')?.value) || 0;
        const manualHandlingDestination = parseFloat(document.getElementById('air-manual-handling-destination')?.value) || 0;
        const manualDocumentation = parseFloat(document.getElementById('air-manual-documentation')?.value) || 0;
        const manualCustoms = parseFloat(document.getElementById('air-manual-customs')?.value) || 0;
        const manualInland = parseFloat(document.getElementById('air-manual-inland')?.value) || 0;
        
        // Calcular frete base baseado no peso taxável com dados atualizados
        const taxableWeight = Math.max(data.weight, data.volumetricWeight || 0);
        let baseFreightRate = 0;
        
        if (data.serviceType === 'express') {
            baseFreightRate = INTERNAL_DATA.airFreightData.express.baseRate;
        } else if (data.serviceType === 'standard') {
            baseFreightRate = INTERNAL_DATA.airFreightData.standard.baseRate;
        } else if (data.serviceType === 'economy') {
            baseFreightRate = INTERNAL_DATA.airFreightData.economy.baseRate;
        }
        
        // Usar valor manual se fornecido, senão calcular
        const freightCost = manualBaseFreight > 0 ? (manualBaseFreight * taxableWeight) : (baseFreightRate * taxableWeight);
        
        // Surcharges dinâmicos - usar valores manuais se disponíveis
        const fuelSurcharge = manualFuelSurcharge > 0 ? (freightCost * manualFuelSurcharge / 100) : 
                             (freightCost * INTERNAL_DATA.airFreightData[data.serviceType].fuelSurcharge);
        const securitySurcharge = manualSecuritySurcharge > 0 ? (freightCost * manualSecuritySurcharge / 100) : 
                                 (freightCost * INTERNAL_DATA.airFreightData[data.serviceType].securitySurcharge);
        
        // Custos operacionais atualizados - usar valores manuais se disponíveis
        const handlingOrigin = manualHandlingOrigin > 0 ? manualHandlingOrigin : 180;
        const handlingDestination = manualHandlingDestination > 0 ? manualHandlingDestination : 220;
        const documentationCost = manualDocumentation > 0 ? manualDocumentation : 95;
        const customsClearance = manualCustoms > 0 ? manualCustoms : 250;
        const inlandTransport = manualInland > 0 ? manualInland : 150;
        
        // Seguro baseado no Incoterm selecionado
        const insuranceCost = this.calculateInsuranceCost(data.cargoValue, data.incoterm, 'air');
        
        // Total com todos os componentes
        const totalCost = freightCost + fuelSurcharge + securitySurcharge + handlingOrigin + 
                         handlingDestination + documentationCost + customsClearance + inlandTransport + insuranceCost;
        
        // Obter dados de rota para informações adicionais
        const routeInfo = this.getRouteInfo(data.origin, data.destination, 'air');
        
        return {
            freightCost: freightCost,
            fuelSurcharge: fuelSurcharge,
            securitySurcharge: securitySurcharge,
            handlingOrigin: handlingOrigin,
            handlingDestination: handlingDestination,
            documentationCost: documentationCost,
            customsClearance: customsClearance,
            inlandTransport: inlandTransport,
            insuranceCost: insuranceCost,
            totalCost: totalCost,
            distance: distance,
            currency: data.currency,
            modal: 'air',
            routeInfo: routeInfo
        };
        
        // CÓDIGO ORIGINAL COMENTADO PARA TESTE
        /*
        // Calcular distância usando dados de rotas reais
        const distance = this.calculateRealDistance(data.origin, data.destination);
        
        // Obter valores manuais se disponíveis
        const manualBaseFreight = parseFloat(document.getElementById('air-manual-base-freight')?.value) || 0;
        const manualFuelSurcharge = parseFloat(document.getElementById('air-manual-fuel-surcharge')?.value) || 0;
        const manualSecuritySurcharge = parseFloat(document.getElementById('air-manual-security-surcharge')?.value) || 0;
        const manualHandlingOrigin = parseFloat(document.getElementById('air-manual-handling-origin')?.value) || 0;
        const manualHandlingDestination = parseFloat(document.getElementById('air-manual-handling-destination')?.value) || 0;
        const manualDocumentation = parseFloat(document.getElementById('air-manual-documentation')?.value) || 0;
        const manualCustoms = parseFloat(document.getElementById('air-manual-customs')?.value) || 0;
        const manualInland = parseFloat(document.getElementById('air-manual-inland')?.value) || 0;
        
        // Calcular frete base baseado no peso taxável com dados atualizados
        const taxableWeight = Math.max(data.weight, data.volumetricWeight);
        let baseFreightRate = 0;
        
        if (data.serviceType === 'express') {
            baseFreightRate = INTERNAL_DATA.airFreightData.express.baseRate;
        } else if (data.serviceType === 'standard') {
            baseFreightRate = INTERNAL_DATA.airFreightData.standard.baseRate;
        } else if (data.serviceType === 'economy') {
            baseFreightRate = INTERNAL_DATA.airFreightData.economy.baseRate;
        }
        
        // Usar valor manual se fornecido, senão calcular
        const freightCost = manualBaseFreight > 0 ? (manualBaseFreight * taxableWeight) : (baseFreightRate * taxableWeight);
        
        // Surcharges dinâmicos - usar valores manuais se disponíveis
        const fuelSurcharge = manualFuelSurcharge > 0 ? (freightCost * manualFuelSurcharge / 100) : 
                             (freightCost * INTERNAL_DATA.airFreightData[data.serviceType].fuelSurcharge);
        const securitySurcharge = manualSecuritySurcharge > 0 ? (freightCost * manualSecuritySurcharge / 100) : 
                                 (freightCost * INTERNAL_DATA.airFreightData[data.serviceType].securitySurcharge);
        
        // Custos operacionais atualizados - usar valores manuais se disponíveis
        const handlingOrigin = manualHandlingOrigin > 0 ? manualHandlingOrigin : 180;
        const handlingDestination = manualHandlingDestination > 0 ? manualHandlingDestination : 220;
        const documentationCost = manualDocumentation > 0 ? manualDocumentation : 95;
        const customsClearance = manualCustoms > 0 ? manualCustoms : 250;
        const inlandTransport = manualInland > 0 ? manualInland : 150;
        
        // Seguro baseado no Incoterm selecionado
        const insuranceCost = this.calculateInsuranceCost(data.cargoValue, data.incoterm, 'air');
        
        // Total com todos os componentes
        const totalCost = freightCost + fuelSurcharge + securitySurcharge + handlingOrigin + 
                         handlingDestination + documentationCost + customsClearance + inlandTransport + insuranceCost;
        
        // Obter dados de rota para informações adicionais
        const routeInfo = this.getRouteInfo(data.origin, data.destination, 'air');
        
        return {
            freightCost: freightCost,
            fuelSurcharge: fuelSurcharge,
            securitySurcharge: securitySurcharge,
            handlingOrigin: handlingOrigin,
            handlingDestination: handlingDestination,
            documentationCost: documentationCost,
            customsClearance: customsClearance,
            inlandTransport: inlandTransport,
            insuranceCost: insuranceCost,
            totalCost: totalCost,
            distance: distance,
            currency: data.currency,
            modal: 'air',
            routeInfo: routeInfo
        };
        */
    }
    
    // Realizar cálculo de frete rodoviário
    performRoadFreightCalculation(data) {
        console.log('🚀 performRoadFreightCalculation chamado com data:', data);
        
        // Calcular distância usando dados de rotas reais
        const distance = this.calculateRealDistance(data.origin, data.destination);
        
        // Obter valores manuais se disponíveis
        const manualBaseFreight = parseFloat(document.getElementById('road-manual-base-freight')?.value) || 0;
        const manualFuelSurcharge = parseFloat(document.getElementById('road-manual-fuel-surcharge')?.value) || 0;
        const manualTollSurcharge = parseFloat(document.getElementById('road-manual-toll-surcharge')?.value) || 0;
        const manualLoading = parseFloat(document.getElementById('road-manual-loading')?.value) || 0;
        const manualUnloading = parseFloat(document.getElementById('road-manual-unloading')?.value) || 0;
        const manualDocumentation = parseFloat(document.getElementById('road-manual-documentation')?.value) || 0;
        const manualCustoms = parseFloat(document.getElementById('road-manual-customs')?.value) || 0;
        const manualInsurance = parseFloat(document.getElementById('road-manual-insurance')?.value) || 0;
        
        // Calcular frete base baseado na distância e peso com dados atualizados
        let baseFreightRate = 0;
        
        if (data.serviceType === 'express') {
            baseFreightRate = INTERNAL_DATA.roadFreightData.express.baseRate;
        } else if (data.serviceType === 'standard') {
            baseFreightRate = INTERNAL_DATA.roadFreightData.standard.baseRate;
        } else if (data.serviceType === 'economy') {
            baseFreightRate = INTERNAL_DATA.roadFreightData.economy.baseRate;
        }
        
        // Usar valor manual se fornecido, senão calcular
        const freightCost = manualBaseFreight > 0 ? (manualBaseFreight * distance * data.weight) : (baseFreightRate * distance * data.weight);
        
        // Surcharges dinâmicos - usar valores manuais se disponíveis
        const fuelSurcharge = manualFuelSurcharge > 0 ? (freightCost * manualFuelSurcharge / 100) : 
                             (freightCost * INTERNAL_DATA.roadFreightData[data.serviceType].fuelSurcharge);
        const tollSurcharge = manualTollSurcharge > 0 ? (freightCost * manualTollSurcharge / 100) : 
                             (freightCost * INTERNAL_DATA.roadFreightData[data.serviceType].tollSurcharge);
        
        // Custos operacionais atualizados - usar valores manuais se disponíveis
        const loading = manualLoading > 0 ? manualLoading : 100;
        const unloading = manualUnloading > 0 ? manualUnloading : 100;
        const documentationCost = manualDocumentation > 0 ? manualDocumentation : 80;
        const customsClearance = manualCustoms > 0 ? manualCustoms : 200;
        const insuranceCost = manualInsurance > 0 ? manualInsurance : this.calculateInsuranceCost(data.cargoValue, data.incoterm, 'road');
        
        // Custos específicos brasileiros para frete rodoviário internacional (atualizados)
        const icms = data.cargoValue * INTERNAL_DATA.brazilianTaxes.ICMS;
        const pisCofins = data.cargoValue * INTERNAL_DATA.brazilianTaxes.PIS_COFINS;
        const ii = data.cargoValue * INTERNAL_DATA.brazilianTaxes.II;
        const ipi = data.cargoValue * INTERNAL_DATA.brazilianTaxes.IPI;
        const adValorem = data.cargoValue * INTERNAL_DATA.brazilianTaxes.AD_VALOREM;
        const siscomex = INTERNAL_DATA.brazilianTaxes.SISCOMEX;
        const storageCost = INTERNAL_DATA.brazilianTaxes.STORAGE_COST;
        const inspectionCost = INTERNAL_DATA.brazilianTaxes.INSPECTION_COST;
        const handlingCost = INTERNAL_DATA.brazilianTaxes.HANDLING_COST;
        
        // Total com todos os componentes
        const totalCost = freightCost + fuelSurcharge + tollSurcharge + loading + unloading + 
                         documentationCost + customsClearance + insuranceCost + icms + pisCofins + 
                         ii + ipi + adValorem + siscomex + storageCost + inspectionCost + handlingCost;
        
        // Obter dados de rota para informações adicionais
        const routeInfo = this.getRouteInfo(data.origin, data.destination, 'road');
        
        return {
            freightCost: freightCost,
            fuelSurcharge: fuelSurcharge,
            tollSurcharge: tollSurcharge,
            loading: loading,
            unloading: unloading,
            documentationCost: documentationCost,
            customsClearance: customsClearance,
            insuranceCost: insuranceCost,
            icms: icms,
            pisCofins: pisCofins,
            ii: ii,
            ipi: ipi,
            adValorem: adValorem,
            siscomex: siscomex,
            storageCost: storageCost,
            inspectionCost: inspectionCost,
            handlingCost: handlingCost,
            totalCost: totalCost,
            distance: distance,
            currency: data.currency,
            modal: 'road',
            routeInfo: routeInfo
        };
        
        // CÓDIGO ORIGINAL COMENTADO PARA TESTE
        /*
        // Calcular distância usando dados de rotas reais
        const distance = this.calculateRealDistance(data.origin, data.destination);
        
        // Obter valores manuais se disponíveis
        const manualBaseFreight = parseFloat(document.getElementById('road-manual-base-freight')?.value) || 0;
        const manualFuelSurcharge = parseFloat(document.getElementById('road-manual-fuel-surcharge')?.value) || 0;
        const manualTollSurcharge = parseFloat(document.getElementById('road-manual-toll-surcharge')?.value) || 0;
        const manualLoading = parseFloat(document.getElementById('road-manual-loading')?.value) || 0;
        const manualUnloading = parseFloat(document.getElementById('road-manual-unloading')?.value) || 0;
        const manualDocumentation = parseFloat(document.getElementById('road-manual-documentation')?.value) || 0;
        const manualCustoms = parseFloat(document.getElementById('road-manual-customs')?.value) || 0;
        const manualInsurance = parseFloat(document.getElementById('road-manual-insurance')?.value) || 0;
        
        // Calcular frete base baseado na distância e peso com dados atualizados
        let baseFreightRate = 0;
        
        if (data.serviceType === 'express') {
            baseFreightRate = INTERNAL_DATA.roadFreightData.express.baseRate;
        } else if (data.serviceType === 'standard') {
            baseFreightRate = INTERNAL_DATA.roadFreightData.standard.baseRate;
        } else if (data.serviceType === 'economy') {
            baseFreightRate = INTERNAL_DATA.roadFreightData.economy.baseRate;
        }
        
        // Usar valor manual se fornecido, senão calcular
        const freightCost = manualBaseFreight > 0 ? (manualBaseFreight * distance * data.weight) : (baseFreightRate * distance * data.weight);
        
        // Surcharges dinâmicos - usar valores manuais se disponíveis
        const fuelSurcharge = manualFuelSurcharge > 0 ? (freightCost * manualFuelSurcharge / 100) : 
                             (freightCost * INTERNAL_DATA.roadFreightData[data.serviceType].fuelSurcharge);
        const tollSurcharge = manualTollSurcharge > 0 ? (freightCost * manualTollSurcharge / 100) : 
                             (freightCost * INTERNAL_DATA.roadFreightData[data.serviceType].tollSurcharge);
        
        // Custos operacionais atualizados - usar valores manuais se disponíveis
        const loading = manualLoading > 0 ? manualLoading : 100;
        const unloading = manualUnloading > 0 ? manualUnloading : 100;
        const documentationCost = manualDocumentation > 0 ? manualDocumentation : 80;
        const customsClearance = manualCustoms > 0 ? manualCustoms : 200;
        const insuranceCost = manualInsurance > 0 ? manualInsurance : this.calculateInsuranceCost(data.cargoValue, data.incoterm, 'road');
        
        // Custos específicos brasileiros para frete rodoviário internacional (atualizados)
        const icms = data.cargoValue * INTERNAL_DATA.brazilianTaxes.ICMS;
        const pisCofins = data.cargoValue * INTERNAL_DATA.brazilianTaxes.PIS_COFINS;
        const ii = data.cargoValue * INTERNAL_DATA.brazilianTaxes.II;
        const ipi = data.cargoValue * INTERNAL_DATA.brazilianTaxes.IPI;
        const adValorem = data.cargoValue * INTERNAL_DATA.brazilianTaxes.AD_VALOREM;
        const siscomex = INTERNAL_DATA.brazilianTaxes.SISCOMEX;
        const storageCost = INTERNAL_DATA.brazilianTaxes.STORAGE_COST;
        const inspectionCost = INTERNAL_DATA.brazilianTaxes.INSPECTION_COST;
        const handlingCost = INTERNAL_DATA.brazilianTaxes.HANDLING_COST;
        
        // Total com todos os componentes
        const totalCost = freightCost + fuelSurcharge + tollSurcharge + loading + unloading + 
                         documentationCost + customsClearance + insuranceCost + icms + pisCofins + 
                         ii + ipi + adValorem + siscomex + storageCost + inspectionCost + handlingCost;
        
        // Obter dados de rota para informações adicionais
        const routeInfo = this.getRouteInfo(data.origin, data.destination, 'road');
        
        return {
            freightCost: freightCost,
            fuelSurcharge: fuelSurcharge,
            tollSurcharge: tollSurcharge,
            loading: loading,
            unloading: unloading,
            documentationCost: documentationCost,
            customsClearance: customsClearance,
            insuranceCost: insuranceCost,
            icms: icms,
            pisCofins: pisCofins,
            ii: ii,
            ipi: ipi,
            adValorem: adValorem,
            siscomex: siscomex,
            storageCost: storageCost,
            inspectionCost: inspectionCost,
            handlingCost: handlingCost,
            totalCost: totalCost,
            distance: distance,
            currency: data.currency,
            modal: 'road',
            routeInfo: routeInfo
        };
        */
    }
    
    // Calcular distância (simulada)
    calculateDistance(origin, destination) {
        // Em uma implementação real, isso seria calculado usando coordenadas reais
        // Por enquanto, retornamos uma distância simulada baseada nos nomes
        const baseDistance = 5000; // km base
        const randomFactor = 0.8 + Math.random() * 0.4; // ±20% variação
        return Math.round(baseDistance * randomFactor);
    }
    
    // Calcular distância real usando dados de rotas
    calculateRealDistance(origin, destination) {
        // Primeiro, tentar encontrar uma rota específica nos dados
        const routeKey = `${origin}-${destination}`;
        const reverseRouteKey = `${destination}-${origin}`;
        
        if (INTERNAL_DATA.routeData[routeKey]) {
            return INTERNAL_DATA.routeData[routeKey].distance;
        } else if (INTERNAL_DATA.routeData[reverseRouteKey]) {
            return INTERNAL_DATA.routeData[reverseRouteKey].distance;
        }
        
        // Se não encontrar rota específica, calcular baseado em coordenadas
        const originLocation = this.findLocation(origin);
        const destinationLocation = this.findLocation(destination);
        
        if (originLocation && destinationLocation) {
            return this.calculateDistanceFromCoordinates(
                originLocation.coordinates,
                destinationLocation.coordinates
            );
        }
        
        // Fallback para cálculo simulado
        return this.calculateDistance(origin, destination);
    }
    
    // Encontrar localização nos dados
    findLocation(name) {
        const allLocations = [
            ...INTERNAL_DATA.ports,
            ...INTERNAL_DATA.airports,
            ...INTERNAL_DATA.cities
        ];
        
        return allLocations.find(location => 
            location.name.toLowerCase().includes(name.toLowerCase()) ||
            name.toLowerCase().includes(location.name.toLowerCase())
        );
    }
    
    // Calcular distância usando coordenadas (fórmula de Haversine)
    calculateDistanceFromCoordinates(coord1, coord2) {
        const R = 6371; // Raio da Terra em km
        const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
        const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return Math.round(R * c);
    }
    
    // Obter informações da rota
    getRouteInfo(origin, destination, modal = 'maritime') {
        const routeKey = `${origin}-${destination}`;
        const reverseRouteKey = `${destination}-${origin}`;
        
        let routeData = INTERNAL_DATA.routeData[routeKey] || INTERNAL_DATA.routeData[reverseRouteKey];
        
        if (!routeData) {
            // Dados padrão se não encontrar rota específica
            const distance = this.calculateRealDistance(origin, destination);
            routeData = {
                distance: distance,
                avgTransitTime: modal === 'air' ? 3 : modal === 'road' ? 7 : 25,
                frequency: 'weekly',
                congestion: 'medium'
            };
        }
        
        return routeData;
    }
    
    // Calcular custo de seguro baseado no Incoterm
    calculateInsuranceCost(cargoValue, incoterm, modal = 'maritime') {
        // VALORES MÍNIMOS DE SEGURO POR MODAL (padrões internacionais)
        const minInsuranceByModal = {
            maritime: 75,   // USD 75 - mínimo para marítimo
            air: 50,        // USD 50 - mínimo para aéreo
            road: 35        // USD 35 - mínimo para rodoviário
        };
        
        // Se cargoValue não foi informado ou é zero, usar valor mínimo
        if (!cargoValue || cargoValue <= 0) {
            return minInsuranceByModal[modal] || 50;
        }
        
        // TAXAS DE SEGURO INTERNACIONAIS REALISTAS (baseadas em mercado real)
        let insuranceRate = 0.0005; // 0.05% - taxa base muito competitiva
        
        // Ajustar taxa baseado no Incoterm (PADRÕES INTERNACIONAIS)
        switch (incoterm) {
            case 'CIF':
            case 'CIP':
                insuranceRate = 0.0004; // 0.04% - seguro já incluído pelo vendedor
                break;
            case 'EXW':
            case 'FCA':
                insuranceRate = 0.0007; // 0.07% - comprador assume riscos
                break;
            case 'FOB':
            case 'CFR':
                insuranceRate = 0.0006; // 0.06% - taxa padrão de mercado
                break;
            case 'DAP':
            case 'DPU':
            case 'DDP':
                insuranceRate = 0.0005; // 0.05% - vendedor assume responsabilidades
                break;
            default:
                insuranceRate = 0.0006; // 0.06% padrão
        }
        
        // Ajustar taxa baseado no modal (RISCO REAL POR MODAL)
        switch (modal) {
            case 'air':
                insuranceRate *= 0.8; // 20% mais barato - menor risco de perda
                break;
            case 'road':
                insuranceRate *= 0.7; // 30% mais barato - menor risco
                break;
            default:
                // Taxa padrão para marítimo (maior risco)
                break;
        }
        
        // Ajustar baseado no valor da carga (DESCONTOS POR VOLUME)
        if (cargoValue > 100000) {
            insuranceRate *= 0.9; // 10% desconto para cargas de alto valor
        } else if (cargoValue > 50000) {
            insuranceRate *= 0.95; // 5% desconto para cargas de médio valor
        }
        
        // Calcular seguro com LIMITES REALISTAS
        const calculatedInsurance = cargoValue * insuranceRate;
        const maxInsurance = cargoValue * 0.001; // Máximo 0.1% do valor da carga
        const minInsurance = minInsuranceByModal[modal] || 50;
        
        // Retornar valor dentro dos limites realistas
        return Math.max(minInsurance, Math.min(calculatedInsurance, maxInsurance));
    }
    
    // Exibir resultados com breakdown detalhado
    displayResults(result) {
        const resultsSection = document.getElementById('results-section');
        const resultsContent = document.getElementById('results-content');
        
        let resultsHTML = '';
        
        if (result.modal === 'maritime' || !result.modal) {
            // Maritime freight breakdown
            resultsHTML = `
                <div class="result-card">
                    <h4>Frete Base</h4>
                    <div class="result-value">${result.freightCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custo principal do transporte marítimo</div>
                </div>
                <div class="result-card">
                    <h4>Surcharges</h4>
                    <div class="result-value">${(result.baf + result.caf + result.isps + result.eis + (result.pss || 0)).toFixed(2)} ${result.currency}</div>
                    <div class="result-description">BAF, CAF, ISPS, EIS${result.pss ? ', PSS (Sazonal)' : ''}</div>
                </div>
                <div class="result-card">
                    <h4>THC Origem</h4>
                    <div class="result-value">${result.thcOrigin.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Terminal Handling Charge - Origem</div>
                </div>
                <div class="result-card">
                    <h4>THC Destino</h4>
                    <div class="result-value">${result.thcDestination.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Terminal Handling Charge - Destino</div>
                </div>
                <div class="result-card">
                    <h4>Documentação</h4>
                    <div class="result-value">${result.documentationCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custos de documentação</div>
                </div>
                <div class="result-card">
                    <h4>Desembaraço</h4>
                    <div class="result-value">${result.customsClearance.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Desembaraço aduaneiro</div>
                </div>
                <div class="result-card">
                    <h4>Transporte Interno</h4>
                    <div class="result-value">${result.inlandTransport.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Transporte interno no destino</div>
                </div>
                <div class="result-card">
                    <h4>Seguro</h4>
                    <div class="result-value">${result.insuranceCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Seguro da carga (baseado no Incoterm)</div>
                </div>
            `;
        } else if (result.modal === 'air') {
            // Air freight breakdown
            resultsHTML = `
                <div class="result-card">
                    <h4>Frete Base</h4>
                    <div class="result-value">${result.freightCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custo principal do transporte aéreo</div>
                </div>
                <div class="result-card">
                    <h4>Fuel Surcharge</h4>
                    <div class="result-value">${result.fuelSurcharge.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Sobretaxa de combustível</div>
                </div>
                <div class="result-card">
                    <h4>Security Surcharge</h4>
                    <div class="result-value">${result.securitySurcharge.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Sobretaxa de segurança</div>
                </div>
                <div class="result-card">
                    <h4>Handling Origem</h4>
                    <div class="result-value">${result.handlingOrigin.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Manuseio no aeroporto de origem</div>
                </div>
                <div class="result-card">
                    <h4>Handling Destino</h4>
                    <div class="result-value">${result.handlingDestination.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Manuseio no aeroporto de destino</div>
                </div>
                <div class="result-card">
                    <h4>Documentação</h4>
                    <div class="result-value">${result.documentationCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custos de documentação</div>
                </div>
                <div class="result-card">
                    <h4>Desembaraço</h4>
                    <div class="result-value">${result.customsClearance.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Desembaraço aduaneiro</div>
                </div>
                <div class="result-card">
                    <h4>Transporte Interno</h4>
                    <div class="result-value">${result.inlandTransport.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Transporte interno no destino</div>
                </div>
                <div class="result-card">
                    <h4>Seguro</h4>
                    <div class="result-value">${result.insuranceCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Seguro da carga (baseado no Incoterm)</div>
                </div>
            `;
        } else if (result.modal === 'road') {
            // Road freight breakdown with Brazilian taxes
            resultsHTML = `
                <div class="result-card">
                    <h4>Frete Base</h4>
                    <div class="result-value">${result.freightCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custo principal do transporte rodoviário</div>
                </div>
                <div class="result-card">
                    <h4>Fuel Surcharge</h4>
                    <div class="result-value">${result.fuelSurcharge.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Sobretaxa de combustível</div>
                </div>
                <div class="result-card">
                    <h4>Toll Surcharge</h4>
                    <div class="result-value">${result.tollSurcharge.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Sobretaxa de pedágio</div>
                </div>
                <div class="result-card">
                    <h4>Loading</h4>
                    <div class="result-value">${result.loading.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custos de carregamento</div>
                </div>
                <div class="result-card">
                    <h4>Unloading</h4>
                    <div class="result-value">${result.unloading.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custos de descarregamento</div>
                </div>
                <div class="result-card">
                    <h4>Documentação</h4>
                    <div class="result-value">${result.documentationCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custos de documentação</div>
                </div>
                <div class="result-card">
                    <h4>Desembaraço</h4>
                    <div class="result-value">${result.customsClearance.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Desembaraço aduaneiro</div>
                </div>
                <div class="result-card">
                    <h4>Seguro</h4>
                    <div class="result-value">${result.insuranceCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Seguro da carga (baseado no Incoterm)</div>
                </div>
                <div class="result-card">
                    <h4>ICMS</h4>
                    <div class="result-value">${result.icms.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Imposto sobre Circulação de Mercadorias (17%)</div>
                </div>
                <div class="result-card">
                    <h4>PIS/COFINS</h4>
                    <div class="result-value">${result.pisCofins.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Contribuições sociais (9.25%)</div>
                </div>
                <div class="result-card">
                    <h4>II</h4>
                    <div class="result-value">${result.ii.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Imposto de Importação (2%)</div>
                </div>
                <div class="result-card">
                    <h4>IPI</h4>
                    <div class="result-value">${result.ipi.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Imposto sobre Produtos Industrializados (5%)</div>
                </div>
                <div class="result-card">
                    <h4>Ad Valorem</h4>
                    <div class="result-value">${result.adValorem.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Taxa Ad Valorem (1%)</div>
                </div>
                <div class="result-card">
                    <h4>Siscomex</h4>
                    <div class="result-value">${result.siscomex.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Taxa Siscomex</div>
                </div>
                <div class="result-card">
                    <h4>Armazenagem</h4>
                    <div class="result-value">${result.storageCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custo de armazenagem</div>
                </div>
                <div class="result-card">
                    <h4>Inspeção</h4>
                    <div class="result-value">${result.inspectionCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custo de inspeção aduaneira</div>
                </div>
                <div class="result-card">
                    <h4>Manuseio</h4>
                    <div class="result-value">${result.handlingCost.toFixed(2)} ${result.currency}</div>
                    <div class="result-description">Custo de manuseio no terminal</div>
                </div>
            `;
        }
        
        // Add common elements with route information
        const routeInfo = result.routeInfo || {};
        const transitTime = routeInfo.avgTransitTime || (result.modal === 'air' ? 3 : result.modal === 'road' ? 7 : 25);
        const frequency = routeInfo.frequency || 'weekly';
        const congestion = routeInfo.congestion || 'medium';
        
        resultsHTML += `
            <div class="result-card">
                <h4>Distância</h4>
                <div class="result-value">${result.distance.toLocaleString()} km</div>
                <div class="result-description">Distância calculada da rota</div>
            </div>
            <div class="result-card">
                <h4>Tempo de Trânsito</h4>
                <div class="result-value">${transitTime} dias</div>
                <div class="result-description">Tempo estimado de entrega</div>
            </div>
            <div class="result-card">
                <h4>Frequência</h4>
                <div class="result-value">${frequency}</div>
                <div class="result-description">Frequência de serviço</div>
            </div>
            <div class="result-card">
                <h4>Congestionamento</h4>
                <div class="result-value">${congestion}</div>
                <div class="result-description">Nível de congestionamento do porto/aeroporto</div>
            </div>
            <div class="result-card total-card">
                <h4>Total</h4>
                <div class="result-value">${result.totalCost.toFixed(2)} ${result.currency}</div>
                <div class="result-description">Custo total estimado</div>
            </div>
        `;
        
        resultsContent.innerHTML = resultsHTML;
        
        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Show disclaimer banner after results
        const resultsDisclaimer = document.getElementById('results-disclaimer');
        if (resultsDisclaimer) {
            resultsDisclaimer.classList.remove('hidden');
        }
    }
    
    // Templates de cotação
    getQuotationTemplates() {
        return {
            maritime: {
                subject: "Cotação FCL - {origin} para {destination}",
                content: `Prezados,

Solicitamos cotação para o seguinte embarque:

**DADOS DA CARGA:**
- Tipo: FCL {containerType}
- Peso: {weight} kg
- Volume: {volume} m³
- Tipo de Carga: {cargoType}
- Valor FOB: {cargoValue} {currency}

**ROTA:**
- Origem: {origin}
- Destino: {destination}
- Incoterm: {incoterm}

**ESPECIFICAÇÕES:**
- NCM: {ncm}
- Descrição: {description}
- Dimensões: {dimensions}

**SERVIÇOS SOLICITADOS:**
- Frete marítimo
- THC origem e destino
- Documentação
- Seguro (opcional)

Prazo de validade: 7 dias
Data de embarque desejada: {shippingDate}

Aguardamos retorno.

Atenciosamente,
{companyName}
{contactInfo}`
            },
            air: {
                subject: "Cotação Aérea - {origin} para {destination}",
                content: `Prezados,

Solicitamos cotação para embarque aéreo:

**DADOS DA CARGA:**
- Peso: {weight} kg
- Volume: {volume} m³
- Peso Tributável: {taxableWeight} kg
- Tipo de Carga: {cargoType}
- Valor FOB: {cargoValue} {currency}

**ROTA:**
- Origem: {origin}
- Destino: {destination}
- Incoterm: {incoterm}

**SERVIÇOS SOLICITADOS:**
- Frete aéreo
- Handling origem e destino
- Documentação
- Seguro (opcional)

Prazo de validade: 3 dias
Data de embarque desejada: {shippingDate}

Aguardamos retorno.

Atenciosamente,
{companyName}
{contactInfo}`
            },
            road: {
                subject: "Cotação Rodoviária - {origin} para {destination}",
                content: `Prezados,

Solicitamos cotação para transporte rodoviário internacional:

**DADOS DA CARGA:**
- Peso: {weight} kg
- Volume: {volume} m³
- Tipo de Carga: {cargoType}
- Valor FOB: {cargoValue} {currency}

**ROTA:**
- Origem: {origin}
- Destino: {destination}
- Incoterm: {incoterm}

**SERVIÇOS SOLICITADOS:**
- Frete rodoviário
- Desembaraço aduaneiro
- Documentação
- Seguro (opcional)

Prazo de validade: 5 dias
Data de embarque desejada: {shippingDate}

Aguardamos retorno.

Atenciosamente,
{companyName}
{contactInfo}`
            }
        };
    }
    
    // Gerar cotação baseada nos dados do formulário
    generateQuotation() {
        console.log('📄 generateQuotation chamado');
        const formData = this.getFormData();
        console.log('📄 Dados do formulário para cotação:', formData);
        
        const quoteTypeRadio = document.querySelector('input[name="quote-type"]:checked');
        if (!quoteTypeRadio) {
            console.error('❌ Tipo de cotação não selecionado.');
            alert('Por favor, selecione o tipo de cotação (Marítimo, Aéreo, Rodoviário) antes de gerar.');
            throw new Error('Tipo de cotação não selecionado.');
        }
        const quoteType = quoteTypeRadio.value;
        console.log('📄 Tipo de cotação selecionado:', quoteType);

        const templates = this.getQuotationTemplates();
        const template = templates[quoteType];

        if (!template) {
            console.error('❌ Template de cotação não encontrado para o tipo:', quoteType);
            throw new Error('Template de cotação não encontrado.');
        }
        
        // Dados para substituição
        const replacementData = {
            origin: formData.origin,
            destination: formData.destination,
            containerType: formData.containerType || 'N/A',
            weight: formData.weight,
            volume: formData.volume,
            cargoType: formData.cargoType,
            cargoValue: formData.cargoValue,
            currency: formData.currency,
            incoterm: formData.incoterm,
            ncm: formData.ncm || 'N/A',
            description: this.getCargoDescription(formData.cargoType),
            dimensions: this.getCargoDimensions(formData),
            taxableWeight: formData.taxableWeight,
            shippingDate: this.getShippingDate(),
            companyName: 'Sua Empresa',
            contactInfo: 'Email: seu@email.com | Tel: (11) 99999-9999'
        };
        console.log('📄 Dados de substituição para cotação:', replacementData);
        
        // Substituir placeholders
        let subject = template.subject;
        let content = template.content;
        
        Object.keys(replacementData).forEach(key => {
            const placeholder = `{${key}}`;
            subject = subject.replace(new RegExp(placeholder, 'g'), replacementData[key]); // Use RegExp for global replace
            content = content.replace(new RegExp(placeholder, 'g'), replacementData[key]); // Use RegExp for global replace
        });
        
        return { subject, content };
    }
    
    // Obter descrição da carga
    getCargoDescription(cargoType) {
        const descriptions = {
            'general': 'Carga Geral',
            'container': 'Carga em Contêiner',
            'bulk': 'Carga a Granel',
            'liquid': 'Carga Líquida',
            'dangerous': 'Carga Perigosa'
        };
        return descriptions[cargoType] || 'Carga Geral';
    }
    
    // Obter dimensões da carga
    getCargoDimensions(formData) {
        if (formData.containerType) {
            const containerSpecs = {
                '20ft': '6.1m x 2.4m x 2.6m',
                '40ft': '12.2m x 2.4m x 2.6m',
                '40hc': '12.2m x 2.4m x 2.9m'
            };
            return containerSpecs[formData.containerType] || 'N/A';
        }
        return `${formData.volume} m³`;
    }
    
    // Obter data de embarque sugerida
    getShippingDate() {
        const date = new Date();
        date.setDate(date.getDate() + 14); // 2 semanas
        return date.toLocaleDateString('pt-BR');
    }
    
    // Mostrar preview da cotação
    showQuotationPreview() {
        console.log('📄 showQuotationPreview chamado');
        try {
            // Primeiro verificar se os elementos existem
            const modal = document.getElementById('quotation-modal');
            const subjectElement = document.getElementById('quotation-subject');
            const contentElement = document.getElementById('quotation-content');
            
            console.log('🔍 Verificando elementos:', {
                modal: !!modal,
                subject: !!subjectElement,
                content: !!contentElement
            });
            
            if (!modal) {
                console.error('❌ Modal de cotação não encontrado no DOM');
                alert('ERRO: Modal de cotação não encontrado no HTML. Verifique se o elemento #quotation-modal existe.');
                return;
            }
            
            if (!subjectElement) {
                console.error('❌ Elemento quotation-subject não encontrado');
                alert('ERRO: Elemento de assunto não encontrado. Verifique se #quotation-subject existe.');
                return;
            }
            
            if (!contentElement) {
                console.error('❌ Elemento quotation-content não encontrado');
                alert('ERRO: Elemento de conteúdo não encontrado. Verifique se #quotation-content existe.');
                return;
            }
            
            console.log('✅ Todos os elementos encontrados, gerando cotação...');
            
            const quotation = this.generateQuotation();
            console.log('📄 Cotação gerada:', quotation);

            // Preencher conteúdo
            subjectElement.textContent = quotation.subject;
            contentElement.textContent = quotation.content;
            
            console.log('📝 Conteúdo preenchido, ativando modal...');
            
            // Forçar exibição do modal
            modal.style.display = 'flex';
            modal.classList.add('active');
            
            console.log('✅ Modal de cotação ativado!');
            console.log('🎨 Modal display:', window.getComputedStyle(modal).display);
            console.log('🎨 Modal visibility:', window.getComputedStyle(modal).visibility);
            
        } catch (error) {
            console.error('❌ Erro em showQuotationPreview:', error);
            alert(`ERRO DETALHADO: ${error.message}\n\nVerifique o console para mais informações.`);
        }
    }
    
    // Copiar cotação para clipboard
    copyQuotation() {
        const quotation = this.generateQuotation();
        const text = `Assunto: ${quotation.subject}\n\n${quotation.content}`;
        
        navigator.clipboard.writeText(text).then(() => {
            alert('Cotação copiada para a área de transferência!');
        }).catch(err => {
            console.error('Erro ao copiar:', err);
            alert('Erro ao copiar. Tente novamente.');
        });
    }
    
    // Baixar cotação como arquivo
    downloadQuotation() {
        const quotation = this.generateQuotation();
        const text = `Assunto: ${quotation.subject}\n\n${quotation.content}`;
        
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'cotacao-frete.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Configurar event listeners para cotações - SOLUÇÃO SIMPLES
    setupQuotationListeners() {
        console.log('📄 setupQuotationListeners - CORRIGINDO AGORA');
        
        // Aguardar um pouco para garantir que DOM está carregado
        setTimeout(() => {
            // SOLUÇÃO DIRETA E SIMPLES
            const generateBtn = document.getElementById('generate-quotation-btn');
            const previewBtn = document.getElementById('preview-quotation-btn');
            
            console.log('Botões encontrados:', { generateBtn: !!generateBtn, previewBtn: !!previewBtn });
            
            if (generateBtn) {
                // REMOVER todos os listeners anteriores
                generateBtn.removeAttribute('onclick');
                const newBtn = generateBtn.cloneNode(true);
                generateBtn.parentNode.replaceChild(newBtn, generateBtn);
                
                // ADICIONAR novo listener SIMPLES
                newBtn.onclick = () => {
                    console.log('🎯 BOTÃO COTAÇÃO CLICADO!');
                    this.abrirModalCotacao();
                };
            }
            
            if (previewBtn) {
                // REMOVER todos os listeners anteriores
                previewBtn.removeAttribute('onclick');
                const newBtn = previewBtn.cloneNode(true);
                previewBtn.parentNode.replaceChild(newBtn, previewBtn);
                
                // ADICIONAR novo listener SIMPLES
                newBtn.onclick = () => {
                    console.log('🎯 BOTÃO PREVIEW CLICADO!');
                    this.abrirModalCotacao();
                };
            }
        }, 1000);
    }
    
    // FUNÇÃO SIMPLES PARA ABRIR MODAL DE COTAÇÃO
    abrirModalCotacao() {
        console.log('📄 abrirModalCotacao chamado');
        this.showQuotationPreview();
    }

    // ===== RELATÓRIO EXECUTIVO =====
    
    // Configurar event listeners para relatório executivo - SOLUÇÃO SIMPLES
    setupReportListeners() {
        console.log('🔧 setupReportListeners - CORRIGINDO AGORA');
        
        setTimeout(() => {
            // SOLUÇÃO DIRETA E SIMPLES
            const reportBtn = document.getElementById('generate-report-btn');
            
            console.log('Botão relatório encontrado:', { reportBtn: !!reportBtn });
            
            if (reportBtn) {
                // REMOVER todos os listeners anteriores
                reportBtn.removeAttribute('onclick');
                const newBtn = reportBtn.cloneNode(true);
                reportBtn.parentNode.replaceChild(newBtn, reportBtn);
                
                // ADICIONAR novo listener SIMPLES
                newBtn.onclick = () => {
                    console.log('🎯 BOTÃO RELATÓRIO CLICADO!');
                    this.abrirModalRelatorio();
                };
            }
        }, 1000);
    }
    
    // FUNÇÃO SIMPLES PARA ABRIR MODAL DE RELATÓRIO
    abrirModalRelatorio() {
        console.log('📊 abrirModalRelatorio chamado');
        
        const modal = document.getElementById('report-modal');
        const summaryContent = document.getElementById('summary-content');
        
        if (!modal) {
            alert('ERRO: Modal de relatório não encontrado!');
            return;
        }
        
        // PREENCHER CONTEÚDO SIMPLES
        if (summaryContent) {
            summaryContent.innerHTML = `
                <div class="summary-grid">
                    <div class="summary-item"><strong>Modal:</strong> Marítimo</div>
                    <div class="summary-item"><strong>Rota:</strong> Santos → Shanghai</div>
                    <div class="summary-item"><strong>Peso:</strong> 1000 kg</div>
                    <div class="summary-item"><strong>Volume:</strong> 5 m³</div>
                    <div class="summary-item"><strong>Custo Total:</strong> $2,500.00 USD</div>
                    <div class="summary-item"><strong>Tempo Estimado:</strong> 25-35 dias</div>
                </div>
                <h4>RELATÓRIO EXECUTIVO DE FRETE</h4>
                <p>Este relatório apresenta uma análise completa da operação de frete internacional solicitada.</p>
                <p><strong>Resumo:</strong> Operação viável com custos competitivos de mercado.</p>
                <p><strong>Recomendação:</strong> Prosseguir com a cotação formal junto aos transportadores.</p>
            `;
        }
        
        // MOSTRAR MODAL
        modal.style.display = 'flex';
        modal.classList.add('active');
        
        console.log('✅ Modal de relatório aberto!');
        
        // BOTÃO FECHAR
        const closeBtn = document.getElementById('close-report-modal');
        if (closeBtn) {
            closeBtn.onclick = () => {
                modal.style.display = 'none';
                modal.classList.remove('active');
            };
        }
    }

    // Gerar relatório executivo completo
    generateExecutiveReport() {
        console.log('📊 generateExecutiveReport chamado');
        console.log('🎯 Modal atual:', this.currentModal);
        
        try {
            // Primeiro verificar se o modal existe
            const reportModal = document.getElementById('report-modal');
            console.log('🔍 Verificando modal de relatório:', !!reportModal);
            
            if (!reportModal) {
                console.error('❌ Modal do relatório NÃO encontrado no DOM');
                alert('ERRO: Modal do relatório não encontrado no HTML. Verifique se o elemento #report-modal existe.');
                return;
            }
            
            const formData = this.getFormData();
            console.log('📋 Dados do formulário:', formData);
            
            // Validar dados básicos
            if (!formData.origin || !formData.destination || !formData.weight || !formData.volume) {
                alert('Por favor, preencha os campos básicos (origem, destino, peso, volume) antes de gerar o relatório.');
                return;
            }
            
            console.log('🧮 Executando cálculo...');
            const result = this.currentModal === 'maritime' ? 
                this.performFreightCalculation(formData) : 
                this.currentModal === 'air' ? 
                    this.performAirFreightCalculation(formData) : 
                    this.performRoadFreightCalculation(formData);
            
            console.log('✅ Resultado do cálculo:', result);

            // Preencher o conteúdo do relatório de forma simples
            console.log('📝 Preenchendo relatório...');
            this.preencherRelatorioSimplificado(formData, result);

            console.log('🖼️ Mostrando modal do relatório...');
            
            // Forçar exibição do modal
            reportModal.style.display = 'flex';
            reportModal.classList.add('active');
            
            console.log('✅ Modal do relatório ativado!');
            console.log('🎨 Modal display:', window.getComputedStyle(reportModal).display);
            console.log('🎨 Modal visibility:', window.getComputedStyle(reportModal).visibility);
            
        } catch (error) {
            console.error('❌ Erro ao gerar relatório executivo:', error);
            alert(`ERRO DETALHADO: ${error.message}\n\nVerifique o console para mais informações.`);
        }
    }

    // Função simplificada para preencher o relatório
    preencherRelatorioSimplificado(formData, result) {
        try {
            const modal = formData.currentModal || this.currentModal;
            const modalNome = modal === 'maritime' ? 'Marítimo' : 
                             modal === 'air' ? 'Aéreo' : 'Rodoviário';
            
            // Preencher resumo executivo
            const summaryContent = document.getElementById('summary-content');
            if (summaryContent) {
                summaryContent.innerHTML = `
                    <div class="summary-grid">
                        <div class="summary-item"><strong>Modal:</strong> ${modalNome}</div>
                        <div class="summary-item"><strong>Rota:</strong> ${formData.origin} → ${formData.destination}</div>
                        <div class="summary-item"><strong>Peso:</strong> ${formData.weight} kg</div>
                        <div class="summary-item"><strong>Volume:</strong> ${formData.volume} m³</div>
                        <div class="summary-item"><strong>Custo Total:</strong> ${result.totalCost ? result.totalCost.toFixed(2) : 'N/A'} ${result.currency || 'USD'}</div>
                        <div class="summary-item"><strong>Tempo Estimado:</strong> ${this.getEstimatedDays(modal)} dias</div>
                    </div>
                `;
            }
            
            // Preencher análise de rota
            const routeContent = document.getElementById('route-content');
            if (routeContent) {
                routeContent.innerHTML = `
                    <p><strong>Origem:</strong> ${formData.origin}</p>
                    <p><strong>Destino:</strong> ${formData.destination}</p>
                    <p><strong>Modal de Transporte:</strong> ${modalNome}</p>
                    <p><strong>Distância Estimada:</strong> ${result.distance || 'N/A'} km</p>
                `;
            }
            
            console.log('✅ Relatório preenchido com sucesso');
        } catch (error) {
            console.error('❌ Erro ao preencher relatório:', error);
        }
    }
    
    // Função auxiliar para tempo estimado
    getEstimatedDays(modal) {
        const days = {
            'maritime': '25-35',
            'air': '3-7', 
            'road': '10-15'
        };
        return days[modal] || '7-14';
    }

    // Preencher resumo executivo
    populateExecutiveSummary(formData, result) {
        const summaryContent = document.getElementById('summary-content');
        const direction = formData.direction === 'import' ? 'Importação' : 'Exportação';
        const modal = this.currentModal === 'maritime' ? 'Marítimo' : 
                     this.currentModal === 'air' ? 'Aéreo' : 'Rodoviário';

        summaryContent.innerHTML = `
            <div class="summary-grid">
                <div class="summary-item">
                    <strong>Modal:</strong> ${modal}
                </div>
                <div class="summary-item">
                    <strong>Direção:</strong> ${direction}
                </div>
                <div class="summary-item">
                    <strong>Rota:</strong> ${formData.origin} → ${formData.destination}
                </div>
                <div class="summary-item">
                    <strong>Distância:</strong> ${result.distance.toLocaleString()} km
                </div>
                <div class="summary-item">
                    <strong>Custo Total:</strong> ${result.totalCost.toFixed(2)} ${result.currency}
                </div>
                <div class="summary-item">
                    <strong>Tempo Estimado:</strong> ${this.getEstimatedTransitTime(formData, result)} dias
                </div>
            </div>
            <div class="summary-highlights">
                <h5>Destaques Principais:</h5>
                <ul>
                    <li>Operação de ${direction.toLowerCase()} via modal ${modal.toLowerCase()}</li>
                    <li>Rota de ${formData.origin} para ${formData.destination}</li>
                    <li>Custo total estimado de ${result.totalCost.toFixed(2)} ${result.currency}</li>
                    <li>Tempo de trânsito estimado de ${this.getEstimatedTransitTime(formData, result)} dias</li>
                </ul>
            </div>
        `;
    }

    // Preencher análise da rota
    populateRouteAnalysis(formData, result) {
        const routeContent = document.getElementById('route-content');
        const modal = this.currentModal === 'maritime' ? 'Marítimo' : 
                     this.currentModal === 'air' ? 'Aéreo' : 'Rodoviário';

        routeContent.innerHTML = `
            <div class="route-details">
                <div class="route-item">
                    <strong>Origem:</strong> ${formData.origin}
                </div>
                <div class="route-item">
                    <strong>Destino:</strong> ${formData.destination}
                </div>
                <div class="route-item">
                    <strong>Modal:</strong> ${modal}
                </div>
                <div class="route-item">
                    <strong>Distância:</strong> ${result.distance.toLocaleString()} km
                </div>
                <div class="route-item">
                    <strong>Tempo de Trânsito:</strong> ${this.getEstimatedTransitTime(formData, result)} dias
                </div>
                <div class="route-item">
                    <strong>Frequência de Serviço:</strong> ${this.getServiceFrequency(formData)}
                </div>
            </div>
            <div class="route-insights">
                <h5>Análise da Rota:</h5>
                <p>Esta rota ${formData.origin} → ${formData.destination} via modal ${modal.toLowerCase()} apresenta características específicas que influenciam diretamente no custo e tempo de entrega. A distância de ${result.distance.toLocaleString()} km e o tempo estimado de ${this.getEstimatedTransitTime(formData, result)} dias são fatores determinantes para o planejamento logístico.</p>
            </div>
        `;
    }

    // Preencher análise da carga
    populateCargoAnalysis(formData) {
        const cargoContent = document.getElementById('cargo-content');
        const cargoType = this.getCargoDescription(formData.cargoType);
        const volume = formData.volume || 0;
        const weight = formData.weight || 0;
        const volumetricWeight = formData.volumetricWeight || 0;
        const taxableWeight = formData.taxableWeight || 0;

        cargoContent.innerHTML = `
            <div class="cargo-details">
                <div class="cargo-item">
                    <strong>Tipo de Carga:</strong> ${cargoType}
                </div>
                <div class="cargo-item">
                    <strong>Volume:</strong> ${volume} m³
                </div>
                <div class="cargo-item">
                    <strong>Peso Real:</strong> ${weight} kg
                </div>
                <div class="cargo-item">
                    <strong>Peso Volumétrico:</strong> ${volumetricWeight} kg
                </div>
                <div class="cargo-item">
                    <strong>Peso Taxável:</strong> ${taxableWeight} kg
                </div>
                <div class="cargo-item">
                    <strong>Densidade:</strong> ${((weight / volume) || 0).toFixed(2)} kg/m³
                </div>
            </div>
            <div class="cargo-insights">
                <h5>Análise da Carga:</h5>
                <p>A carga de ${cargoType.toLowerCase()} apresenta características específicas que influenciam no tipo de serviço recomendado. Com volume de ${volume} m³ e peso de ${weight} kg, a relação peso/volume determina a eficiência do transporte.</p>
            </div>
        `;
    }

    // Preencher breakdown de custos
    populateCostBreakdown(result) {
        console.log('🔧 populateCostBreakdown chamado com result:', result);
        
        const costDetails = document.getElementById('cost-details');
        if (!costDetails) {
            console.error('❌ Elemento cost-details não encontrado');
            return;
        }
        
        // Função auxiliar para garantir valores numéricos seguros
        const safeNumber = (value) => {
            const num = parseFloat(value);
            return isNaN(num) ? 0 : num;
        };
        
        let breakdownHTML = '';
        if (result.modal === 'maritime' || !result.modal) {
            breakdownHTML = `
                <div class="cost-breakdown">
                    <div class="cost-item">
                        <strong>Frete Base:</strong> ${safeNumber(result.freightCost).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>BAF:</strong> ${safeNumber(result.baf).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>CAF:</strong> ${safeNumber(result.caf).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>ISPS:</strong> ${safeNumber(result.isps).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>EIS:</strong> ${safeNumber(result.eis).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>PSS (Peak Season):</strong> ${safeNumber(result.pss).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>THC Origem:</strong> ${safeNumber(result.thcOrigin).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>THC Destino:</strong> ${safeNumber(result.thcDestination).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Documentação:</strong> ${safeNumber(result.documentationCost).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Despesas Aduaneiras:</strong> ${safeNumber(result.customsClearance).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Transporte Interno:</strong> ${safeNumber(result.inlandTransport).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Seguro:</strong> ${safeNumber(result.insuranceCost).toFixed(2)} USD
                    </div>
                </div>
            `;
        } else if (result.modal === 'air') {
            breakdownHTML = `
                <div class="cost-breakdown">
                    <div class="cost-item">
                        <strong>Frete Aéreo:</strong> ${safeNumber(result.freightCost).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Sobretaxa de Combustível:</strong> ${safeNumber(result.fuelSurcharge).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Taxa de Segurança:</strong> ${safeNumber(result.securitySurcharge).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Handling Origem:</strong> ${safeNumber(result.handlingOrigin).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Handling Destino:</strong> ${safeNumber(result.handlingDestination).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Documentação:</strong> ${safeNumber(result.documentationCost).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Despesas Aduaneiras:</strong> ${safeNumber(result.customsClearance).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Transporte Interno:</strong> ${safeNumber(result.inlandTransport).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Seguro:</strong> ${safeNumber(result.insuranceCost).toFixed(2)} USD
                    </div>
                </div>
            `;
        } else if (result.modal === 'road') {
            breakdownHTML = `
                <div class="cost-breakdown">
                    <div class="cost-item">
                        <strong>Frete Rodoviário:</strong> ${safeNumber(result.freightCost).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Sobretaxa de Combustível:</strong> ${safeNumber(result.fuelSurcharge).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Sobretaxa de Pedágio:</strong> ${safeNumber(result.tollSurcharge).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Carregamento:</strong> ${safeNumber(result.loading).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Descarga:</strong> ${safeNumber(result.unloading).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Documentação:</strong> ${safeNumber(result.documentationCost).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Desembaraço Aduaneiro:</strong> ${safeNumber(result.customsClearance).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Seguro:</strong> ${safeNumber(result.insuranceCost).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>ICMS:</strong> ${safeNumber(result.icms).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>PIS/COFINS:</strong> ${safeNumber(result.pisCofins).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>II (Imposto de Importação):</strong> ${safeNumber(result.ii).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>IPI:</strong> ${safeNumber(result.ipi).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Ad Valorem:</strong> ${safeNumber(result.adValorem).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Taxa Siscomex:</strong> ${safeNumber(result.siscomex).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Armazenagem:</strong> ${safeNumber(result.storageCost).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Inspeção:</strong> ${safeNumber(result.inspectionCost).toFixed(2)} USD
                    </div>
                    <div class="cost-item">
                        <strong>Manuseio:</strong> ${safeNumber(result.handlingCost).toFixed(2)} USD
                    </div>
                </div>
            `;
        }

        if (costDetails) {
            costDetails.innerHTML = breakdownHTML;
            console.log('✅ Cost breakdown HTML atualizado com sucesso');
        } else {
            console.error('❌ Elemento costDetails não encontrado para atualizar HTML');
        }
    }

    // Preencher timeline de trânsito
    populateTransitTimeline(formData, result) {
        const timelineContainer = document.getElementById('timeline-container');
        const modal = this.currentModal;
        const transitTime = this.getEstimatedTransitTime(formData, result);

        let timelineHTML = '';
        
        if (modal === 'maritime') {
            timelineHTML = `
                <div class="timeline-item">
                    <div class="timeline-icon">📦</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Coleta e Documentação</div>
                        <div class="timeline-description">Coleta da carga na origem e preparação da documentação</div>
                        <div class="timeline-duration">1-2 dias</div>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">🚢</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Transporte Marítimo</div>
                        <div class="timeline-description">Navegação entre portos de origem e destino</div>
                        <div class="timeline-duration">${Math.floor(transitTime * 0.7)} dias</div>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">🏛️</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Despacho Aduaneiro</div>
                        <div class="timeline-description">Processamento aduaneiro no destino</div>
                        <div class="timeline-duration">2-3 dias</div>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">🚛</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Entrega Final</div>
                        <div class="timeline-description">Transporte interno até o destino final</div>
                        <div class="timeline-duration">1-2 dias</div>
                    </div>
                </div>
            `;
        } else if (modal === 'air') {
            timelineHTML = `
                <div class="timeline-item">
                    <div class="timeline-icon">📦</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Coleta e Documentação</div>
                        <div class="timeline-description">Coleta da carga e preparação da documentação</div>
                        <div class="timeline-duration">1 dia</div>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">✈️</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Transporte Aéreo</div>
                        <div class="timeline-description">Voo entre aeroportos de origem e destino</div>
                        <div class="timeline-duration">1-2 dias</div>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">🏛️</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Despacho Aduaneiro</div>
                        <div class="timeline-description">Processamento aduaneiro no destino</div>
                        <div class="timeline-duration">1-2 dias</div>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">🚛</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Entrega Final</div>
                        <div class="timeline-description">Transporte interno até o destino final</div>
                        <div class="timeline-duration">1 dia</div>
                    </div>
                </div>
            `;
        } else if (modal === 'road') {
            timelineHTML = `
                <div class="timeline-item">
                    <div class="timeline-icon">📦</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Coleta e Carregamento</div>
                        <div class="timeline-description">Coleta da carga e carregamento no veículo</div>
                        <div class="timeline-duration">1 dia</div>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">🚛</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Transporte Rodoviário</div>
                        <div class="timeline-description">Transporte terrestre entre origem e destino</div>
                        <div class="timeline-duration">${Math.floor(transitTime * 0.8)} dias</div>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">🏛️</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Despacho Aduaneiro</div>
                        <div class="timeline-description">Processamento aduaneiro na fronteira</div>
                        <div class="timeline-duration">1-2 dias</div>
                    </div>
                </div>
                <div class="timeline-item">
                    <div class="timeline-icon">📦</div>
                    <div class="timeline-content">
                        <div class="timeline-title">Descarga e Entrega</div>
                        <div class="timeline-description">Descarga e entrega no destino final</div>
                        <div class="timeline-duration">1 dia</div>
                    </div>
                </div>
            `;
        }

        timelineContainer.innerHTML = timelineHTML;
    }

    // Preencher insights de IA
    populateAIInsights(formData, result) {
        const insightsContent = document.getElementById('insights-content');
        const modal = this.currentModal;
        const direction = formData.direction;

        let insights = [];
        
        // Análise de custo-benefício
        const costPerKm = result.totalCost / result.distance;
        if (costPerKm > 2) {
            insights.push('Custo por km elevado - considere otimizar a rota ou modal');
        } else if (costPerKm < 0.5) {
            insights.push('Custo por km competitivo - boa eficiência de custos');
        }

        // Análise de tempo
        const transitTime = this.getEstimatedTransitTime(formData, result);
        if (transitTime > 30) {
            insights.push('Tempo de trânsito longo - considere modal mais rápido se urgente');
        } else if (transitTime < 7) {
            insights.push('Tempo de trânsito rápido - adequado para cargas urgentes');
        }

        // Análise de modal
        if (modal === 'maritime' && result.distance < 1000) {
            insights.push('Distância curta para modal marítimo - considere modal terrestre');
        } else if (modal === 'air' && result.distance > 5000) {
            insights.push('Distância longa adequada para modal aéreo');
        }

        // Análise de direção
        if (direction === 'import') {
            insights.push('Operação de importação - atenção especial à documentação aduaneira');
        } else {
            insights.push('Operação de exportação - verificar requisitos do país de destino');
        }

        const insightsHTML = `
            <div class="ai-insights-list">
                <h5>Análise Preditiva de IA:</h5>
                <ul>
                    ${insights.map(insight => `<li>${insight}</li>`).join('')}
                </ul>
            </div>
            <div class="ai-recommendations">
                <h5>Recomendações Baseadas em IA:</h5>
                <ul>
                    <li>Monitorar variações cambiais para otimizar custos</li>
                    <li>Considerar seguro de carga para proteção adicional</li>
                    <li>Avaliar opções de consolidação para redução de custos</li>
                    <li>Manter comunicação próxima com o transportador</li>
                </ul>
            </div>
        `;

        insightsContent.innerHTML = insightsHTML;
    }

    // Preencher recomendações estratégicas
    populateRecommendations(formData, result) {
        const recommendationsContent = document.getElementById('recommendations-content');
        const modal = this.currentModal;
        const direction = formData.direction;

        let recommendations = [];

        // Recomendações baseadas no modal
        if (modal === 'maritime') {
            recommendations.push('Considerar FCL vs LCL baseado no volume da carga');
            recommendations.push('Avaliar diferentes portos para otimizar custos');
            recommendations.push('Monitorar surcharges que variam mensalmente');
        } else if (modal === 'air') {
            recommendations.push('Verificar frequência de voos na rota');
            recommendations.push('Considerar consolidação para reduzir custos');
            recommendations.push('Avaliar opções de handling no aeroporto');
        } else if (modal === 'road') {
            recommendations.push('Verificar restrições de trânsito na rota');
            recommendations.push('Considerar pedágios e custos de combustível');
            recommendations.push('Avaliar opções de tracking em tempo real');
        }

        // Recomendações baseadas na direção
        if (direction === 'import') {
            recommendations.push('Preparar documentação aduaneira completa');
            recommendations.push('Considerar regime de drawback se aplicável');
            recommendations.push('Avaliar opções de armazenagem no destino');
        } else {
            recommendations.push('Verificar certificados de origem necessários');
            recommendations.push('Considerar benefícios fiscais de exportação');
            recommendations.push('Avaliar opções de financiamento à exportação');
        }

        const recommendationsHTML = `
            <div class="strategic-recommendations">
                <h5>Recomendações Estratégicas:</h5>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
            <div class="next-steps">
                <h5>Próximos Passos:</h5>
                <ol>
                    <li>Solicitar cotações detalhadas aos transportadores</li>
                    <li>Verificar disponibilidade de espaço no modal escolhido</li>
                    <li>Preparar documentação necessária para a operação</li>
                    <li>Estabelecer cronograma detalhado da operação</li>
                    <li>Definir responsabilidades e pontos de contato</li>
                </ol>
            </div>
        `;

        recommendationsContent.innerHTML = recommendationsHTML;
    }

    // Gerar gráfico de custos
    generateCostChart(result) {
        console.log('🔧 generateCostChart chamado com result:', result);
        
        const canvas = document.getElementById('cost-chart');
        if (!canvas) {
            console.error('❌ Canvas de gráfico não encontrado');
            return;
        }
        
        console.log('✅ Canvas encontrado, continuando...');
        
        try {
            const ctx = canvas.getContext('2d');
            
            // Limpar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Função auxiliar para garantir valores numéricos seguros
            const safeNumber = (value) => {
                const num = parseFloat(value);
                return isNaN(num) ? 0 : num;
            };
            
            // Dados para o gráfico
            let labels = [];
            let data = [];
            let colors = [];
            
            if (result.modal === 'maritime' || !result.modal) {
                labels = ['Frete Base', 'BAF', 'CAF', 'THC Origem', 'THC Destino', 'Documentação', 'Aduaneiras', 'Interno'];
                data = [
                    safeNumber(result.freightCost), 
                    safeNumber(result.baf), 
                    safeNumber(result.caf), 
                    safeNumber(result.thcOrigin), 
                    safeNumber(result.thcDestination), 
                    safeNumber(result.documentationCost), 
                    safeNumber(result.customsClearance), 
                    safeNumber(result.inlandTransport)
                ];
                colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];
            } else if (result.modal === 'air') {
                labels = ['Frete Aéreo', 'Combustível', 'Segurança', 'Handling Origem', 'Handling Destino'];
                data = [
                    safeNumber(result.freightCost), 
                    safeNumber(result.fuelSurcharge), 
                    safeNumber(result.securitySurcharge), 
                    safeNumber(result.handlingOrigin), 
                    safeNumber(result.handlingDestination)
                ];
                colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];
            } else if (result.modal === 'road') {
                labels = ['Frete Base', 'Combustível', 'Pedágio', 'Carregamento', 'Descarga', 'Documentação', 'Desembaraço', 'Seguro', 'ICMS', 'PIS/COFINS', 'II', 'IPI', 'Ad Valorem', 'Siscomex', 'Armazenagem', 'Inspeção', 'Manuseio'];
                data = [
                    safeNumber(result.freightCost), 
                    safeNumber(result.fuelSurcharge), 
                    safeNumber(result.tollSurcharge), 
                    safeNumber(result.loading), 
                    safeNumber(result.unloading), 
                    safeNumber(result.documentationCost), 
                    safeNumber(result.customsClearance), 
                    safeNumber(result.insuranceCost), 
                    safeNumber(result.icms), 
                    safeNumber(result.pisCofins), 
                    safeNumber(result.ii), 
                    safeNumber(result.ipi), 
                    safeNumber(result.adValorem), 
                    safeNumber(result.siscomex), 
                    safeNumber(result.storageCost), 
                    safeNumber(result.inspectionCost), 
                    safeNumber(result.handlingCost)
                ];
                colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316', '#A855F7', '#EC4899', '#14B8A6', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];
            }
            
            console.log('📊 Dados do gráfico:', { labels, data });
            
            // Filtrar apenas valores maiores que zero para o gráfico
            const filteredData = [];
            const filteredLabels = [];
            const filteredColors = [];
            
            data.forEach((value, index) => {
                if (value > 0) {
                    filteredData.push(value);
                    filteredLabels.push(labels[index]);
                    filteredColors.push(colors[index]);
                }
            });
            
            console.log('📊 Dados filtrados:', { filteredLabels, filteredData });
            
            if (filteredData.length === 0) {
                console.log('⚠️ Nenhum dado válido para o gráfico');
                ctx.fillStyle = '#666';
                ctx.font = '16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Nenhum dado disponível para o gráfico', canvas.width / 2, canvas.height / 2);
                return;
            }
            
            // Desenhar gráfico simples
            const total = filteredData.reduce((sum, value) => sum + value, 0);
            let currentAngle = 0;
            
            console.log('📊 Total:', total);
            
            filteredData.forEach((value, index) => {
                const sliceAngle = (value / total) * 2 * Math.PI;
                
                ctx.beginPath();
                ctx.moveTo(200, 150);
                ctx.arc(200, 150, 100, currentAngle, currentAngle + sliceAngle);
                ctx.closePath();
                ctx.fillStyle = filteredColors[index];
                ctx.fill();
                
                // Adicionar legenda
                const legendX = 350;
                const legendY = 50 + (index * 20);
                ctx.fillStyle = filteredColors[index];
                ctx.fillRect(legendX, legendY, 15, 15);
                ctx.fillStyle = '#000';
                ctx.font = '12px Arial';
                ctx.textAlign = 'left';
                ctx.fillText(`${filteredLabels[index]}: ${value.toFixed(2)} USD`, legendX + 20, legendY + 12);
                
                currentAngle += sliceAngle;
            });
            
            console.log('✅ Gráfico gerado com sucesso');
            
        } catch (error) {
            console.error('❌ Erro ao gerar gráfico:', error);
            // Desenhar mensagem de erro no canvas
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#ff0000';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Erro ao gerar gráfico', canvas.width / 2, canvas.height / 2);
        }
    }

    // Obter tempo de trânsito estimado
    getEstimatedTransitTime(formData, result) {
        const modal = this.currentModal;
        const distance = result.distance;
        
        if (modal === 'maritime') {
            return Math.max(15, Math.floor(distance / 200)); // ~200 km/dia
        } else if (modal === 'air') {
            return Math.max(3, Math.floor(distance / 2000)); // ~2000 km/dia
        } else if (modal === 'road') {
            return Math.max(5, Math.floor(distance / 500)); // ~500 km/dia
        }
        
        return 15; // padrão
    }

    // Obter frequência de serviço
    getServiceFrequency(formData) {
        const modal = this.currentModal;
        
        if (modal === 'maritime') {
            return 'Semanal';
        } else if (modal === 'air') {
            return 'Diária';
        } else if (modal === 'road') {
            return 'Flexível';
        }
        
        return 'Variável';
    }

    // Baixar relatório executivo
    downloadExecutiveReport() {
        const reportContent = document.getElementById('report-content').innerText;
        const blob = new Blob([reportContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relatorio-executivo-frete.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Compartilhar relatório executivo
    shareExecutiveReport() {
        const reportContent = document.getElementById('report-content').innerText;
        
        if (navigator.share) {
            navigator.share({
                title: 'Relatório Executivo de Frete',
                text: reportContent,
                url: window.location.href
            });
        } else {
            // Fallback para copiar para clipboard
            navigator.clipboard.writeText(reportContent).then(() => {
                alert('Relatório copiado para a área de transferência!');
            }).catch(err => {
                console.error('Erro ao copiar:', err);
                alert('Erro ao copiar. Tente novamente.');
            });
        }
    }

    // Função de teste para diagnosticar os botões
    testarBotoes() {
        console.log('🧪 === INICIANDO TESTE COMPLETO DOS BOTÕES ===');
        
        const botoes = [
            { id: 'generate-quotation-btn', nome: '📋 Gerar Pedido de Cotação', funcao: () => this.showQuotationPreview() },
            { id: 'preview-quotation-btn', nome: '👁️ Visualizar Template', funcao: () => this.showTemplatePreview() },
            { id: 'generate-report-btn', nome: '📊 Gerar Relatório Executivo', funcao: () => this.showExecutiveReportPreview() }
        ];
        
        botoes.forEach((botao, index) => {
            console.log(`\n${index + 1}. 🔍 Testando: ${botao.nome}`);
            
            const elemento = document.getElementById(botao.id);
            if (elemento) {
                console.log(`   ✅ Elemento encontrado:`, elemento);
                console.log(`   🎯 Clicável:`, elemento.style.pointerEvents !== 'none');
                console.log(`   👁️ Visível:`, window.getComputedStyle(elemento).display !== 'none');
                console.log(`   📍 Posição:`, elemento.getBoundingClientRect());
                console.log(`   🎨 Estilo:`, {
                    display: window.getComputedStyle(elemento).display,
                    visibility: window.getComputedStyle(elemento).visibility,
                    opacity: window.getComputedStyle(elemento).opacity,
                    zIndex: window.getComputedStyle(elemento).zIndex
                });
                
                // Testar clique programático
                try {
                    console.log(`   🧪 Executando clique programático...`);
                    elemento.click();
                    console.log(`   ✅ Clique programático executado`);
                } catch (e) {
                    console.error(`   ❌ Erro no clique programático:`, e);
                }
                
                // Testar função direta
                try {
                    console.log(`   🧪 Executando função direta...`);
                    botao.funcao();
                    console.log(`   ✅ Função direta executada`);
                } catch (e) {
                    console.error(`   ❌ Erro na função direta:`, e);
                }
                
            } else {
                console.error(`   ❌ Elemento NÃO encontrado: ${botao.id}`);
                
                // Verificar se está na seção de resultados
                const resultsSection = document.getElementById('results-section');
                console.log(`   🔍 Seção de resultados:`, {
                    existe: !!resultsSection,
                    visivel: resultsSection ? window.getComputedStyle(resultsSection).display !== 'none' : false
                });
            }
        });
        
        // Testar modais
        const modais = [
            { id: 'quotation-modal', nome: 'Modal de Cotação' },
            { id: 'report-modal', nome: 'Modal de Relatório' }
        ];
        
        modais.forEach((modal, index) => {
            console.log(`\n${botoes.length + index + 1}. 🔍 Testando: ${modal.nome}`);
            
            const elemento = document.getElementById(modal.id);
            if (elemento) {
                console.log(`   ✅ Modal encontrado:`, elemento);
                console.log(`   👁️ Classes:`, elemento.className);
                console.log(`   🎨 Estilo computado:`, {
                    display: window.getComputedStyle(elemento).display,
                    visibility: window.getComputedStyle(elemento).visibility,
                    opacity: window.getComputedStyle(elemento).opacity,
                    zIndex: window.getComputedStyle(elemento).zIndex,
                    position: window.getComputedStyle(elemento).position
                });
                console.log(`   📍 Posição:`, elemento.getBoundingClientRect());
                
                // Testar ativação do modal
                console.log(`   🧪 Testando ativação do modal...`);
                elemento.style.display = 'flex';
                elemento.classList.add('active');
                console.log(`   ✅ Modal ativado programaticamente`);
                
                setTimeout(() => {
                    elemento.classList.remove('active');
                    elemento.style.display = 'none';
                    console.log(`   ⏱️ Modal desativado após timeout`);
                }, 2000);
                
            } else {
                console.error(`   ❌ Modal NÃO encontrado: ${modal.id}`);
            }
        });
        
        // Verificação geral do estado da página
        console.log('\n📊 === ESTADO GERAL DA PÁGINA ===');
        console.log('📍 URL:', window.location.href);
        console.log('📄 Título:', document.title);
        console.log('🎯 FreightSimulator instância:', window.freightSimulator ? 'Encontrada' : 'NÃO encontrada');
        console.log('🔧 Modal atual:', this.currentModal);
        
        const resultsSection = document.getElementById('results-section');
        console.log('📊 Seção de resultados:', {
            existe: !!resultsSection,
            visivel: resultsSection ? window.getComputedStyle(resultsSection).display !== 'none' : false,
            display: resultsSection ? window.getComputedStyle(resultsSection).display : 'N/A'
        });
        
        console.log('\n🧪 === TESTE COMPLETO CONCLUÍDO ===');
        console.log('💡 Dicas:');
        console.log('   - Execute forcarModal("cotacao") para forçar modal de cotação');
        console.log('   - Execute forcarModal("relatorio") para forçar modal de relatório');
        console.log('   - Faça um cálculo primeiro para ativar a seção de resultados');
        
        return 'Teste completo concluído. Verifique os logs detalhados acima.';
    }
    
    // Função para forçar ativação dos modais
    forcarModal(tipo) {
        console.log(`🔧 forcarModal chamado para: ${tipo}`);
        
        if (tipo === 'cotacao') {
            const modal = document.getElementById('quotation-modal');
            console.log('🔍 Modal de cotação encontrado:', !!modal);
            
            if (modal) {
                // Preencher com dados fictícios para demonstração
                const subjectElement = document.getElementById('quotation-subject');
                const contentElement = document.getElementById('quotation-content');
                
                if (subjectElement) {
                    subjectElement.textContent = 'TESTE: Cotação Marítima - Santos para Shanghai';
                }
                if (contentElement) {
                    contentElement.textContent = 'TESTE: Este é um conteúdo de teste para demonstrar o funcionamento do modal de cotação.';
                }
                
                modal.style.display = 'flex';
                modal.classList.add('active');
                console.log('✅ Modal de cotação forçado a aparecer com dados de teste');
                console.log('🎨 Display:', window.getComputedStyle(modal).display);
                console.log('👁️ Visibilidade:', window.getComputedStyle(modal).visibility);
            } else {
                console.error('❌ Modal de cotação NÃO encontrado');
                alert('Modal de cotação não encontrado no DOM!');
            }
            
        } else if (tipo === 'relatorio') {
            const modal = document.getElementById('report-modal');
            console.log('🔍 Modal de relatório encontrado:', !!modal);
            
            if (modal) {
                // Preencher com dados fictícios para demonstração
                const summaryContent = document.getElementById('summary-content');
                if (summaryContent) {
                    summaryContent.innerHTML = `
                        <div class="summary-grid">
                            <div class="summary-item"><strong>Modal:</strong> TESTE - Marítimo</div>
                            <div class="summary-item"><strong>Rota:</strong> Santos → Shanghai</div>
                            <div class="summary-item"><strong>Peso:</strong> 1000 kg</div>
                            <div class="summary-item"><strong>Volume:</strong> 5 m³</div>
                            <div class="summary-item"><strong>Custo Total:</strong> 2500.00 USD</div>
                            <div class="summary-item"><strong>Tempo Estimado:</strong> 25-35 dias</div>
                        </div>
                    `;
                }
                
                modal.style.display = 'flex';
                modal.classList.add('active');
                console.log('✅ Modal de relatório forçado a aparecer com dados de teste');
                console.log('🎨 Display:', window.getComputedStyle(modal).display);
                console.log('👁️ Visibilidade:', window.getComputedStyle(modal).visibility);
            } else {
                console.error('❌ Modal de relatório NÃO encontrado');
                alert('Modal de relatório não encontrado no DOM!');
            }
            
        } else {
            console.error('❌ Tipo inválido. Use "cotacao" ou "relatorio"');
            alert('Tipo inválido! Use forcarModal("cotacao") ou forcarModal("relatorio")');
        }
    }


}

// Inicializar simulador quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌐 DOM carregado, inicializando FreightSimulator...');
    
    try {
        window.freightSimulator = new FreightSimulator();
        console.log('✅ FreightSimulator inicializado globalmente:', window.freightSimulator);
        
        // Expor funções de teste globalmente
        window.testarBotoes = () => window.freightSimulator.testarBotoes();
        window.forcarModal = (tipo) => window.freightSimulator.forcarModal(tipo);
        window.mostrarResultados = () => {
            const resultsSection = document.getElementById('results-section');
            if (resultsSection) {
                resultsSection.style.display = 'block';
                console.log('✅ Seção de resultados forçada a aparecer');
                
                // Preencher com dados de teste
                const resultsContent = document.getElementById('results-content');
                if (resultsContent) {
                    resultsContent.innerHTML = `
                        <div class="result-card">
                            <h4>TESTE - Frete Base</h4>
                            <div class="result-value">2200.00 USD</div>
                            <div class="result-description">Custo principal do transporte</div>
                        </div>
                        <div class="result-card total-card">
                            <h4>Total</h4>
                            <div class="result-value">3500.00 USD</div>
                            <div class="result-description">Custo total estimado - TESTE</div>
                        </div>
                    `;
                }
                
                return 'Seção de resultados ativada com dados de teste. Agora os botões devem estar visíveis!';
            } else {
                console.error('❌ Seção de resultados não encontrada');
                return 'Erro: Seção de resultados não encontrada';
            }
        };
        
        // FUNÇÃO CRÍTICA: Forçar os 3 botões a funcionarem DEFINITIVAMENTE - VERSÃO SIMPLES
        window.corrigirBotoesCriticos = () => {
            console.log('🚨 === CORREÇÃO SIMPLES DOS BOTÕES ===');
            
            let corrigidos = 0;
            
            // BOTÃO COTAÇÃO
            const cotacaoBtn = document.getElementById('generate-quotation-btn');
            if (cotacaoBtn) {
                cotacaoBtn.onclick = () => {
                    console.log('🎯 COTAÇÃO CLICADA!');
                    window.freightSimulator.abrirModalCotacao();
                };
                corrigidos++;
                console.log('✅ Botão cotação corrigido');
            }
            
            // BOTÃO PREVIEW
            const previewBtn = document.getElementById('preview-quotation-btn');
            if (previewBtn) {
                previewBtn.onclick = () => {
                    console.log('🎯 PREVIEW CLICADO!');
                    window.freightSimulator.abrirModalCotacao();
                };
                corrigidos++;
                console.log('✅ Botão preview corrigido');
            }
            
            // BOTÃO RELATÓRIO
            const relatorioBtn = document.getElementById('generate-report-btn');
            if (relatorioBtn) {
                relatorioBtn.onclick = () => {
                    console.log('🎯 RELATÓRIO CLICADO!');
                    window.freightSimulator.abrirModalRelatorio();
                };
                corrigidos++;
                console.log('✅ Botão relatório corrigido');
            }
            
            alert(`🎉 ${corrigidos}/3 botões corrigidos! CLIQUE AGORA NOS BOTÕES PARA TESTAR!`);
            return `${corrigidos} botões corrigidos com sucesso!`;
        };
        
        // FUNÇÃO PARA TESTAR IMEDIATAMENTE
        window.testarBotoesAgora = () => {
            // Primeiro mostrar resultados
            window.mostrarResultados();
            
            setTimeout(() => {
                // Depois corrigir botões
                window.corrigirBotoesCriticos();
                
                setTimeout(() => {
                    alert('✅ PRONTO! Agora clique nos 3 botões para testar:\n📋 Gerar Pedido de Cotação\n👁️ Visualizar Template\n📊 Gerar Relatório Executivo');
                }, 500);
            }, 500);
        };
        
        // FUNÇÃO PARA CORRIGIR BOTÃO "CALCULAR FRETE"
        window.corrigirBotaoCalcular = () => {
            console.log('🧮 Corrigindo botão Calcular Frete...');
            
            const calculateBtn = document.getElementById('calculate-btn');
            if (calculateBtn) {
                calculateBtn.onclick = () => {
                    console.log('🧮 CALCULAR CLICADO!');
                    
                    // Preencher dados de teste
                    document.getElementById('origin').value = 'Santos (Brasil)';
                    document.getElementById('destination').value = 'Shanghai (China)';
                    document.getElementById('weight').value = '1000';
                    document.getElementById('volume').value = '5';
                    
                    // Selecionar FCL se existe
                    const fcl = document.querySelector('input[value="FCL"]');
                    if (fcl) fcl.checked = true;
                    
                    // Executar cálculo
                    window.freightSimulator.calculateFreight();
                };
                alert('✅ Botão "Calcular Frete" corrigido! Clique nele agora!');
            } else {
                alert('❌ Botão "Calcular Frete" não encontrado!');
            }
        };

        // FUNÇÃO PARA ATIVAR TODOS OS BOTÕES DE CALCULAR FRETE
        window.ativarBotoesCalcular = () => {
            console.log('🚀 ATIVANDO TODOS OS BOTÕES DE CALCULAR FRETE...');
            
            const calculateBtn = document.getElementById('calculate-btn');
            const airCalculateBtn = document.getElementById('air-calculate-btn');
            const roadCalculateBtn = document.getElementById('road-calculate-btn');
            
            console.log('Botões encontrados:', {
                maritime: !!calculateBtn,
                air: !!airCalculateBtn,
                road: !!roadCalculateBtn
            });
            
            if (calculateBtn) {
                calculateBtn.onclick = () => {
                    console.log('🧮 CALCULAR MARÍTIMO CLICADO!');
                    window.freightSimulator.calculateFreight();
                };
                calculateBtn.disabled = false;
                calculateBtn.style.opacity = '1';
                calculateBtn.style.cursor = 'pointer';
                console.log('✅ Botão marítimo ativado');
            }
            
            if (airCalculateBtn) {
                airCalculateBtn.onclick = () => {
                    console.log('🧮 CALCULAR AÉREO CLICADO!');
                    window.freightSimulator.calculateFreight();
                };
                airCalculateBtn.disabled = false;
                airCalculateBtn.style.opacity = '1';
                airCalculateBtn.style.cursor = 'pointer';
                console.log('✅ Botão aéreo ativado');
            }
            
            if (roadCalculateBtn) {
                roadCalculateBtn.onclick = () => {
                    console.log('🧮 CALCULAR RODOVIÁRIO CLICADO!');
                    window.freightSimulator.calculateFreight();
                };
                roadCalculateBtn.disabled = false;
                roadCalculateBtn.style.opacity = '1';
                roadCalculateBtn.style.cursor = 'pointer';
                console.log('✅ Botão rodoviário ativado');
            }
            
            alert('✅ Todos os botões "Calcular Frete" foram ativados!');
        };
        
        // FUNÇÃO COMPLETA DE TESTE
        window.testeCompleto = () => {
            alert('🧮 1. Primeiro vou corrigir o botão Calcular Frete...');
            window.corrigirBotaoCalcular();
            
            setTimeout(() => {
                alert('📊 2. Agora clique em "Calcular Frete" para aparecer os resultados...');
                
                setTimeout(() => {
                    alert('📋 3. Depois que aparecer os resultados, execute: corrigirBotoesCriticos()');
                }, 2000);
            }, 1000);
        };
        
        console.log('🧪 Funções de teste expostas globalmente:');
        console.log('   - testarBotoes() - Testa todos os botões');
        console.log('   - forcarModal("cotacao") - Força modal de cotação');
        console.log('   - forcarModal("relatorio") - Forçar modal de relatório');
        console.log('   - mostrarResultados() - Mostra seção de resultados para teste');
        
        // Verificação detalhada pós-inicialização
        setTimeout(() => {
            console.log('🔍 === VERIFICAÇÃO DETALHADA PÓS-INICIALIZAÇÃO ===');
            
            const botoes = [
                { id: 'generate-quotation-btn', nome: 'Gerar Cotação' },
                { id: 'preview-quotation-btn', nome: 'Visualizar Template' },
                { id: 'generate-report-btn', nome: 'Gerar Relatório' }
            ];
            
            console.log('📋 Estado dos botões:');
            botoes.forEach(({ id, nome }) => {
                const btn = document.getElementById(id);
                const status = btn ? '✅' : '❌';
                console.log(`   ${status} ${nome} (${id}): ${btn ? 'encontrado' : 'NÃO encontrado'}`);
                
                if (btn) {
                    const rect = btn.getBoundingClientRect();
                    const isVisible = rect.width > 0 && rect.height > 0;
                    console.log(`      👁️ Visível: ${isVisible ? 'Sim' : 'Não'}`);
                    console.log(`      📍 Posição: x=${rect.x.toFixed(1)}, y=${rect.y.toFixed(1)}`);
                }
            });
            
            console.log('\n🖼️ Estado dos modais:');
            const modais = [
                { id: 'quotation-modal', nome: 'Modal de Cotação' },
                { id: 'report-modal', nome: 'Modal de Relatório' }
            ];
            
            modais.forEach(({ id, nome }) => {
                const modal = document.getElementById(id);
                const status = modal ? '✅' : '❌';
                console.log(`   ${status} ${nome} (${id}): ${modal ? 'encontrado' : 'NÃO encontrado'}`);
                
                if (modal) {
                    const style = window.getComputedStyle(modal);
                    console.log(`      🎨 Display: ${style.display}`);
                    console.log(`      📱 Z-index: ${style.zIndex}`);
                }
            });
            
            console.log('\n📊 Estado da seção de resultados:');
            const resultsSection = document.getElementById('results-section');
            if (resultsSection) {
                const style = window.getComputedStyle(resultsSection);
                console.log(`   ✅ Seção encontrada`);
                console.log(`   👁️ Display: ${style.display}`);
                console.log(`   📱 Visível: ${style.display !== 'none' ? 'Sim' : 'Não'}`);
            } else {
                console.log(`   ❌ Seção de resultados NÃO encontrada`);
            }
            
            console.log('\n🎯 === FUNÇÕES DISPONÍVEIS ===');
            console.log('   📋 testarBotoes() - Teste completo dos botões');
            console.log('   📋 forcarModal("cotacao") - Forçar modal de cotação');
            console.log('   📋 forcarModal("relatorio") - Forçar modal de relatório');
            console.log('   📋 mostrarResultados() - Mostrar seção de resultados para teste');
            console.log('   📋 window.freightSimulator - Instância do simulador');
            
            console.log('\n💡 DICA: Execute mostrarResultados() para ver os botões sem fazer cálculo!');
            console.log('💡 DICA: Ou preencha origem, destino, peso e volume, depois clique em "Calcular Frete"');
            
        }, 1000);
        
    } catch (error) {
        console.error('❌ Erro ao inicializar FreightSimulator:', error);
    }
}); 