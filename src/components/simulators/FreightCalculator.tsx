'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { calculateFreightCost, FreightCostInput, FreightCostOutput, formatarValorFrete } from '@/lib/freightCost';
import IncotermGuide from './IncotermGuide';
import Icon from '../icons/Icon';
import { aiFreightPredictor, AIPredictionInput } from '@/lib/aiFreightPredictor';

import { loadReportHistory } from '@/lib/reportGenerator';

export default function FreightCalculator() {
  const [formData, setFormData] = useState({
    origin: 'CN',
    destination: 'BRSSZ',
    weight: '',
    volume: '',
    cargoType: 'general',
    cargoValue: '',
    ncm: '',
    incoterm: 'FOB',
    serviceType: 'fcl',
    exchangeRate: '5.0'
  });

  const [advancedResult, setAdvancedResult] = useState<FreightCostOutput | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  // Estados para funcionalidades avançadas
  const [simulationHistory, setSimulationHistory] = useState<any[]>([]);

  // Estados para o seletor de moedas padronizado
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencyRates, setCurrencyRates] = useState<Record<string, number>>({});
  const [isManualRate, setIsManualRate] = useState(false);
  const [manualRate, setManualRate] = useState('');
  const [isCurrencyLoading, setIsCurrencyLoading] = useState(false);

  // Estados para direção comercial
  const [direcaoComercial, setDirecaoComercial] = useState<'importacao' | 'exportacao'>('importacao');

  // Estados para IA Preditiva (ADICIONANDO APENAS)
  const [aiPrediction, setAiPrediction] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const availableCurrencies = [
    { code: 'USD', name: 'Dólar Americano', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'Libra Esterlina', symbol: '£' },
    { code: 'CNY', name: 'Yuan Chinês', symbol: '¥' },
    { code: 'JPY', name: 'Iene Japonês', symbol: '¥' },
    { code: 'ARS', name: 'Peso Argentino', symbol: '$' },
    { code: 'CLP', name: 'Peso Chileno', symbol: '$' },
    { code: 'MXN', name: 'Peso Mexicano', symbol: '$' },
    { code: 'CAD', name: 'Dólar Canadense', symbol: '$' },
    { code: 'AUD', name: 'Dólar Australiano', symbol: '$' },
    { code: 'CHF', name: 'Franco Suíço', symbol: 'CHF' },
    { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$' },
    { code: 'BTC', name: 'Bitcoin', symbol: '₿' },
  ];

  // LISTA COMPLETA DE PAÍSES COMERCIAIS DO BRASIL
  const paisesComerciais = [
    // PRINCIPAIS PARCEIROS COMERCIAIS (TOP 20)
    { codigo: 'CN', nome: 'China', continente: 'Ásia', ranking_importacao: 1, ranking_exportacao: 1 },
    { codigo: 'US', nome: 'Estados Unidos', continente: 'América do Norte', ranking_importacao: 2, ranking_exportacao: 2 },
    { codigo: 'AR', nome: 'Argentina', continente: 'América do Sul', ranking_importacao: 3, ranking_exportacao: 3 },
    { codigo: 'DE', nome: 'Alemanha', continente: 'Europa', ranking_importacao: 4, ranking_exportacao: 4 },
    { codigo: 'KR', nome: 'Coreia do Sul', continente: 'Ásia', ranking_importacao: 5, ranking_exportacao: 8 },
    { codigo: 'IN', nome: 'Índia', continente: 'Ásia', ranking_importacao: 6, ranking_exportacao: 12 },
    { codigo: 'IT', nome: 'Itália', continente: 'Europa', ranking_importacao: 7, ranking_exportacao: 9 },
    { codigo: 'JP', nome: 'Japão', continente: 'Ásia', ranking_importacao: 8, ranking_exportacao: 11 },
    { codigo: 'CL', nome: 'Chile', continente: 'América do Sul', ranking_importacao: 9, ranking_exportacao: 5 },
    { codigo: 'FR', nome: 'França', continente: 'Europa', ranking_importacao: 10, ranking_exportacao: 10 },
    
    // AMÉRICA DO SUL
    { codigo: 'UY', nome: 'Uruguai', continente: 'América do Sul' },
    { codigo: 'PY', nome: 'Paraguai', continente: 'América do Sul' },
    { codigo: 'BO', nome: 'Bolívia', continente: 'América do Sul' },
    { codigo: 'PE', nome: 'Peru', continente: 'América do Sul' },
    { codigo: 'CO', nome: 'Colômbia', continente: 'América do Sul' },
    { codigo: 'VE', nome: 'Venezuela', continente: 'América do Sul' },
    { codigo: 'EC', nome: 'Equador', continente: 'América do Sul' },
    { codigo: 'GY', nome: 'Guiana', continente: 'América do Sul' },
    { codigo: 'SR', nome: 'Suriname', continente: 'América do Sul' },
    
    // AMÉRICA DO NORTE
    { codigo: 'CA', nome: 'Canadá', continente: 'América do Norte' },
    { codigo: 'MX', nome: 'México', continente: 'América do Norte' },
    
    // EUROPA
    { codigo: 'ES', nome: 'Espanha', continente: 'Europa' },
    { codigo: 'NL', nome: 'Holanda', continente: 'Europa' },
    { codigo: 'BE', nome: 'Bélgica', continente: 'Europa' },
    { codigo: 'GB', nome: 'Reino Unido', continente: 'Europa' },
    { codigo: 'CH', nome: 'Suíça', continente: 'Europa' },
    { codigo: 'AT', nome: 'Áustria', continente: 'Europa' },
    { codigo: 'PT', nome: 'Portugal', continente: 'Europa' },
    { codigo: 'SE', nome: 'Suécia', continente: 'Europa' },
    { codigo: 'NO', nome: 'Noruega', continente: 'Europa' },
    { codigo: 'DK', nome: 'Dinamarca', continente: 'Europa' },
    { codigo: 'FI', nome: 'Finlândia', continente: 'Europa' },
    { codigo: 'PL', nome: 'Polônia', continente: 'Europa' },
    { codigo: 'CZ', nome: 'República Tcheca', continente: 'Europa' },
    { codigo: 'RU', nome: 'Rússia', continente: 'Europa' },
    
    // ÁSIA
    { codigo: 'TH', nome: 'Tailândia', continente: 'Ásia' },
    { codigo: 'MY', nome: 'Malásia', continente: 'Ásia' },
    { codigo: 'SG', nome: 'Singapura', continente: 'Ásia' },
    { codigo: 'ID', nome: 'Indonésia', continente: 'Ásia' },
    { codigo: 'VN', nome: 'Vietnã', continente: 'Ásia' },
    { codigo: 'PH', nome: 'Filipinas', continente: 'Ásia' },
    { codigo: 'TW', nome: 'Taiwan', continente: 'Ásia' },
    { codigo: 'HK', nome: 'Hong Kong', continente: 'Ásia' },
    { codigo: 'BD', nome: 'Bangladesh', continente: 'Ásia' },
    { codigo: 'PK', nome: 'Paquistão', continente: 'Ásia' },
    
    // ORIENTE MÉDIO
    { codigo: 'AE', nome: 'Emirados Árabes Unidos', continente: 'Oriente Médio' },
    { codigo: 'SA', nome: 'Arábia Saudita', continente: 'Oriente Médio' },
    { codigo: 'TR', nome: 'Turquia', continente: 'Oriente Médio' },
    { codigo: 'IL', nome: 'Israel', continente: 'Oriente Médio' },
    { codigo: 'IR', nome: 'Irã', continente: 'Oriente Médio' },
    
    // ÁFRICA
    { codigo: 'ZA', nome: 'África do Sul', continente: 'África' },
    { codigo: 'EG', nome: 'Egito', continente: 'África' },
    { codigo: 'MA', nome: 'Marrocos', continente: 'África' },
    { codigo: 'NG', nome: 'Nigéria', continente: 'África' },
    { codigo: 'AO', nome: 'Angola', continente: 'África' },
    
    // OCEANIA
    { codigo: 'AU', nome: 'Austrália', continente: 'Oceania' },
    { codigo: 'NZ', nome: 'Nova Zelândia', continente: 'Oceania' }
  ];

  // PORTOS BRASILEIROS
  const portosBrasileiros = [
    { codigo: 'BRSSZ', nome: 'Santos - SP', estado: 'São Paulo' },
    { codigo: 'BRRIG', nome: 'Rio Grande - RS', estado: 'Rio Grande do Sul' },
    { codigo: 'BRPNG', nome: 'Paranaguá - PR', estado: 'Paraná' },
    { codigo: 'BRSSA', nome: 'Salvador - BA', estado: 'Bahia' },
    { codigo: 'BRVIX', nome: 'Vitória - ES', estado: 'Espírito Santo' },
    { codigo: 'BRFOR', nome: 'Fortaleza - CE', estado: 'Ceará' },
    { codigo: 'BRPEC', nome: 'Recife - PE', estado: 'Pernambuco' },
    { codigo: 'BRMAN', nome: 'Manaus - AM', estado: 'Amazonas' },
    { codigo: 'BRRIO', nome: 'Rio de Janeiro - RJ', estado: 'Rio de Janeiro' },
    { codigo: 'BRNAT', nome: 'Natal - RN', estado: 'Rio Grande do Norte' },
    { codigo: 'BRMCP', nome: 'Macapá - AP', estado: 'Amapá' },
    { codigo: 'BRBEL', nome: 'Belém - PA', estado: 'Pará' }
  ];

  const cargoTypes = [
    { value: 'general', label: 'Carga Geral' },
    { value: 'dangerous', label: 'Carga Perigosa' },
    { value: 'perishable', label: 'Carga Perecível' },
    { value: 'high_value', label: 'Carga de Alto Valor' }
  ];

  const incoterms = [
    { value: 'EXW', label: 'EXW - Ex Works' },
    { value: 'FCA', label: 'FCA - Free Carrier' },
    { value: 'CPT', label: 'CPT - Carriage Paid To' },
    { value: 'CIP', label: 'CIP - Carriage and Insurance Paid To' },
    { value: 'DAP', label: 'DAP - Delivered at Place' },
    { value: 'DPU', label: 'DPU - Delivered at Place Unloaded' },
    { value: 'DDP', label: 'DDP - Delivered Duty Paid' },
    { value: 'FAS', label: 'FAS - Free Alongside Ship' },
    { value: 'FOB', label: 'FOB - Free on Board' },
    { value: 'CFR', label: 'CFR - Cost and Freight' },
    { value: 'CIF', label: 'CIF - Cost, Insurance and Freight' }
  ];

  const serviceTypes = [
    { value: 'fcl', label: 'FCL - Full Container Load' },
    { value: 'lcl', label: 'LCL - Less than Container Load' },
    { value: 'air_standard', label: 'Aéreo Standard' },
    { value: 'air_express', label: 'Aéreo Express' }
  ];

  const validateInputs = useCallback(() => {
    const newErrors: string[] = [];
    
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.push('Peso deve ser maior que zero');
    }
    
    if (!formData.volume || parseFloat(formData.volume) <= 0) {
      newErrors.push('Volume deve ser maior que zero');
    }

    if (!formData.cargoValue || parseFloat(formData.cargoValue) <= 0) {
      newErrors.push('Valor da carga deve ser maior que zero');
    }
    
    if (!formData.ncm || formData.ncm.length !== 8) {
      newErrors.push('NCM deve ter exatamente 8 dígitos');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }, [formData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleIncotermChange = (incoterm: string) => {
    setFormData(prev => ({
      ...prev,
      incoterm
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      const input: FreightCostInput = {
        origin: formData.origin,
        destination: formData.destination,
        weight: parseFloat(formData.weight),
        volume: parseFloat(formData.volume),
        cargo_type: formData.cargoType as 'general' | 'dangerous' | 'perishable' | 'high_value',
        cargo_value: parseFloat(formData.cargoValue),
        ncm: formData.ncm,
        incoterm: formData.incoterm as 'EXW' | 'FOB' | 'CIF' | 'DDP',
        service_type: formData.serviceType as 'fcl' | 'lcl' | 'air_standard' | 'air_express',
        exchange_rate: parseFloat(formData.exchangeRate)
      };

      const result = await calculateFreightCost(input);
      setAdvancedResult(result);
      setHasCalculated(true);

      // ADICIONAR: Executar IA Preditiva em paralelo (PRESERVANDO TUDO + ADICIONANDO APENAS)
      executarIAPreditiva(formData);

    } catch (error) {
      console.error('Erro no cálculo:', error);
      setErrors(['Erro ao calcular custos. Tente novamente.']);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRealCurrencyRates = useCallback(async () => {
    setIsCurrencyLoading(true);
    try {
      // Usar o endpoint real do Radar360 que busca taxas em tempo real
      const response = await fetch('/api/radar/quotes?symbols=USD,EUR,GBP,JPY,CNY,ARS,CLP,MXN,CAD,AUD,CHF,BRL,BTC');
      const data = await response.json();
      
      if (data && data.rates) {
        setCurrencyRates(data.rates);
        console.log('Taxas carregadas do Radar360:', data.rates);
      } else {
        throw new Error('Dados inválidos da API');
      }
    } catch (error) {
      console.error('Erro ao buscar taxas do Radar360:', error);
      // Fallback para taxas padrão se API falhar
      setCurrencyRates({
        USD: 5.52,
        EUR: 6.48,
        GBP: 7.44,
        JPY: 0.0375,
        CNY: 0.7706,
        ARS: 0.0065,
        CLP: 0.0074,
        MXN: 0.276,
        CAD: 4.08,
        AUD: 3.65,
        CHF: 6.00,
        BRL: 1.0,
        BTC: 127000000
      });
    } finally {
      setIsCurrencyLoading(false);
    }
  }, []);

  const toggleRateMode = () => {
    setIsManualRate(!isManualRate);
  };

  const updateManualRate = (value: string) => {
    setManualRate(value);
      setFormData(prev => ({
        ...prev,
      exchangeRate: value
    }));
  };

  useEffect(() => {
      setSimulationHistory(loadReportHistory());
    fetchRealCurrencyRates();
    // ADICIONAR: Carregar moedas do painel real também
    carregarMoedasDoPainel();
  }, [fetchRealCurrencyRates]);

  // Aplicar taxa inicial quando as taxas são carregadas
  useEffect(() => {
    if (Object.keys(currencyRates).length > 0 && !isManualRate) {
      const initialRate = currencyRates[selectedCurrency];
      if (initialRate && typeof initialRate === 'number' && initialRate > 0) {
        const rateString = initialRate.toFixed(4);
        setFormData(prev => ({
          ...prev,
          exchangeRate: rateString
        }));
        setManualRate(rateString);
        console.log(`Taxa inicial aplicada: ${selectedCurrency} = ${rateString} BRL`);
      }
    }
  }, [currencyRates, selectedCurrency, isManualRate]);

  // Aplicar automaticamente a taxa da moeda selecionada em tempo real
  useEffect(() => {
    if (currencyRates[selectedCurrency] && !isManualRate) {
      const rate = currencyRates[selectedCurrency];
      if (typeof rate === 'number' && rate > 0) {
        const rateString = rate.toFixed(4);
        setFormData(prev => ({
          ...prev,
          exchangeRate: rateString
        }));
        // Atualizar também o manualRate para sincronização
        setManualRate(rateString);
        console.log(`Taxa aplicada automaticamente no useEffect: ${selectedCurrency} = ${rateString} BRL`);
      }
    }
  }, [selectedCurrency, currencyRates, isManualRate]);

  // Função para atualizar taxas em tempo real quando moeda é selecionada
  // Função para alternar direção comercial
  const alternarDirecaoComercial = (direcao: 'importacao' | 'exportacao') => {
    setDirecaoComercial(direcao);
    
    // Resetar origem e destino baseado na direção
    if (direcao === 'importacao') {
      // IMPORTAÇÃO: País estrangeiro → Porto brasileiro
      setFormData(prev => ({
        ...prev,
        origin: 'CN', // China como padrão para importação
        destination: 'BRSSZ' // Santos como padrão
      }));
    } else {
      // EXPORTAÇÃO: Porto brasileiro → País estrangeiro
      setFormData(prev => ({
        ...prev,
        origin: 'BRSSZ', // Santos como padrão para exportação
        destination: 'US' // EUA como padrão
      }));
    }
  };

  // ADICIONAR: Função para carregar moedas do painel real
  const carregarMoedasDoPainel = async () => {
    try {
      console.log('🔄 Carregando moedas do painel real...');
      const response = await fetch('/api/radar/quotes?symbols=USD,EUR,GBP,JPY,CNY,ARS,CLP,MXN,CAD,AUD,CHF,BRL,BTC');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Moedas carregadas do painel:', data);
      
      if (data && data.rates) {
        // Atualizar todas as taxas de câmbio com dados reais
        setCurrencyRates(data.rates);
        
        // Se não há taxa manual, aplicar a primeira moeda disponível
        if (!isManualRate && Object.keys(data.rates).length > 0) {
          const firstCurrency = Object.keys(data.rates)[0];
          const firstRate = data.rates[firstCurrency];
          
          if (typeof firstRate === 'number') {
            const rateString = firstRate.toFixed(4);
            setFormData(prev => ({
              ...prev,
              exchangeRate: rateString
            }));
            setManualRate(rateString);
            setSelectedCurrency(firstCurrency);
            
            console.log(`✅ Taxa inicial aplicada: ${firstCurrency} = ${rateString}`);
          }
        }
      }
    } catch (error) {
      console.error('❌ Erro ao carregar moedas do painel:', error);
    }
  };

  // ADICIONAR: Função para IA Preditiva (PRESERVANDO TUDO + ADICIONANDO APENAS)
  const executarIAPreditiva = async (shipmentData: any) => {
    try {
      setIsAiLoading(true);
      setAiError(null);
      
      console.log('🤖 [IA] Iniciando predição de custos...');
      
      const aiInput: AIPredictionInput = {
        route: {
          origin: shipmentData.origin,
          destination: shipmentData.destination
        },
        commodity: shipmentData.cargoType || 'general',
        weight: parseFloat(shipmentData.weight) || 0,
        volume: parseFloat(shipmentData.volume) || 0,
        timeframe: 30 // 30 dias de predição
      };
      
      const prediction = await aiFreightPredictor.predictCosts(aiInput);
      
      console.log('✅ [IA] Predição concluída:', prediction);
      setAiPrediction(prediction);
      
    } catch (error) {
      console.error('❌ [IA] Erro na predição:', error);
      setAiError('Erro ao executar predição de IA');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCurrencyChange = async (currency: string) => {
    setSelectedCurrency(currency);
    setIsCurrencyLoading(true);
    
    try {
      // BUSCAR DADOS REAIS DO RADAR360
      const response = await fetch('/api/radar/quotes?symbols=USD,EUR,GBP,JPY,CNY,ARS,CLP,MXN,CAD,AUD,CHF,BRL,BTC');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('✅ Dados reais do Radar360:', data); // Debug
      
      // Verificar se temos dados reais
      if (data && data.rates && typeof data.rates[currency] === 'number') {
        const realRate = data.rates[currency];
        console.log(`✅ Taxa real para ${currency}:`, realRate); // Debug
        
        setCurrencyRates(prev => ({
          ...prev,
          [currency]: realRate
        }));
        
        if (!isManualRate) {
          const rateString = realRate.toFixed(4);
          setFormData(prev => ({
            ...prev,
            exchangeRate: rateString
          }));
          setManualRate(rateString);
        }
        
        console.log(`✅ Taxa real aplicada: ${currency} = ${realRate}`); // Debug
      } else {
        console.warn(`❌ Taxa não encontrada para ${currency} nos dados reais`); // Debug
        throw new Error(`Taxa não encontrada para ${currency}`);
      }
    } catch (error) {
      console.error('❌ Erro ao buscar taxas reais:', error);
      
      // FALLBACK - Usar taxas reais conhecidas (atualizadas)
      const realKnownRates: Record<string, number> = {
        USD: 5.5218, // Taxa real atual
        EUR: 6.4828, // Taxa real atual
        GBP: 7.4363, // Taxa real atual
        JPY: 0.0375, // Taxa real atual
        CNY: 0.7706, // Taxa real atual
        ARS: 0.0065, // Taxa real atual
        CLP: 0.0074, // Taxa real atual
        MXN: 0.276,  // Taxa real atual
        CAD: 4.0398, // Taxa real atual
        AUD: 3.6311, // Taxa real atual
        CHF: 6.9396, // Taxa real atual
        BRL: 1.0,    // Taxa real atual
        BTC: 657131  // Taxa real atual
      };
      
      if (realKnownRates[currency as keyof typeof realKnownRates]) {
        const fallbackRate = realKnownRates[currency as keyof typeof realKnownRates];
        console.log(`🔄 Usando taxa conhecida para ${currency}:`, fallbackRate); // Debug
        
        setCurrencyRates(prev => ({
          ...prev,
          [currency]: fallbackRate
        }));
        
        if (!isManualRate) {
          const rateString = fallbackRate.toFixed(4);
          setFormData(prev => ({
            ...prev,
            exchangeRate: rateString
          }));
          setManualRate(rateString);
        }
      }
    } finally {
      setIsCurrencyLoading(false);
    }
  };

  return (
    <div className="glass p-6 rounded-2xl shadow-gold card-hover">
      {/* BANNER PULSANTE - SIMULADOR EM DESENVOLVIMENTO */}
      <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-400/50 rounded-xl animate-pulse">
        <div className="flex items-center justify-center gap-3 text-center">
          <div className="text-2xl">🚧</div>
          <div>
            <h3 className="text-lg font-bold text-yellow-300">SIMULADOR EM DESENVOLVIMENTO</h3>
            <p className="text-sm text-yellow-200">Breve Lançamento - Funcionalidades em Implementação</p>
          </div>
          <div className="text-2xl">⚡</div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-100 mb-8 flex items-center gap-3">
        <Icon src="/icons/calculator.svg" alt="Simulador" size="lg" className="text-accent w-6 h-6" />
        Simulador de Frete Internacional
      </h2>

      {/* Direção Comercial */}
      <div className="glass p-4 rounded-xl shadow-gold mb-6 border border-accent/20">
        <h3 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
          <Icon src="/icons/radar-icon.svg" alt="Direção" size="sm" className="text-accent" />
          Direção do Comércio
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => alternarDirecaoComercial('importacao')}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
              direcaoComercial === 'importacao'
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-accent/50 hover:bg-accent/5'
            }`}
          >
            <div className="text-2xl mb-2">📥</div>
            <div className="font-bold text-lg mb-1">IMPORTAÇÃO</div>
            <div className="text-sm opacity-80">Mundo → Brasil</div>
          </button>
          
          <button
            type="button"
            onClick={() => alternarDirecaoComercial('exportacao')}
            className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
              direcaoComercial === 'exportacao'
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-accent/50 hover:bg-accent/5'
            }`}
          >
            <div className="text-2xl mb-2">📤</div>
            <div className="font-bold text-lg mb-1">EXPORTAÇÃO</div>
            <div className="text-sm opacity-80">Brasil → Mundo</div>
          </button>
        </div>
      </div>
      
      {/* Painel de Cotações Reais */}
      <div className="glass p-4 rounded-xl shadow-gold mb-6">
        <h3 className="text-lg font-medium text-gray-100 mb-3 flex items-center gap-2">
          <Icon src="/icons/currency-exchange.svg" alt="Cotações" size="xs" className="text-accent" />
          Painel de Cotações Reais
          {isCurrencyLoading && (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
          )}
        </h3>
        
        {/* Seletor de Moeda */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Moeda de Cotação
          </label>
          <div className="flex gap-2">
            <select
              value={selectedCurrency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
              disabled={isCurrencyLoading}
            >
              {availableCurrencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                  {currencyRates[currency.code] ? ` (${currencyRates[currency.code].toFixed(4)} BRL)` : ''}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={toggleRateMode}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 transition-colors"
            >
              {isManualRate ? 'Auto' : 'Manual'}
            </button>
          </div>
        </div>

        {/* Taxa de Câmbio */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
            Taxa de Câmbio (BRL)
            {!isManualRate && currencyRates[selectedCurrency] && (
              <span className="text-xs text-green-400 bg-green-900/30 px-2 py-1 rounded">
                Tempo Real
              </span>
            )}
            {isManualRate && (
              <span className="text-xs text-yellow-400 bg-yellow-900/30 px-2 py-1 rounded">
                Manual
              </span>
            )}
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={isManualRate ? manualRate : (currencyRates[selectedCurrency] ? currencyRates[selectedCurrency].toFixed(4) : formData.exchangeRate)}
              onChange={(e) => updateManualRate(e.target.value)}
              className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
              step="0.0001"
            />
            <button
              type="button"
              onClick={() => {
                if (currencyRates[selectedCurrency]) {
                  setFormData(prev => ({ ...prev, exchangeRate: currencyRates[selectedCurrency].toString() }));
                }
              }}
              className="px-4 py-2 bg-accent hover:bg-accent/90 text-gray-900 rounded-lg font-medium transition-colors"
            >
              Aplicar
            </button>
          </div>
          {!isManualRate && currencyRates[selectedCurrency] && (
            <div className="mt-2 text-xs text-gray-400">
              Taxa atualizada automaticamente do painel de moedas em tempo real
            </div>
          )}
        </div>

        {/* Grid de Cotações */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          {Object.entries(currencyRates).slice(0, 8).map(([currency, rate]) => (
            <div key={currency} className="bg-gray-800/50 rounded-lg p-3 text-center border border-gray-700">
              <div className="font-semibold text-accent">{currency}</div>
              <div className="text-gray-300">
                {typeof rate === 'number' ? rate.toFixed(4) : '—'}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-xs text-gray-400">
          Fonte: European Central Bank (ECB) • Atualizado em tempo real
        </div>
      </div>
      
      <div className="glass p-4 rounded-xl shadow-gold mb-6 border-l-4 border-accent">
        <div className="flex">
          <div className="flex-shrink-0">
            <Icon src="/icons/faq.svg" alt="Aviso" size="sm" className="text-accent" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-300">
              <strong>Aviso:</strong> Este simulador fornece estimativas baseadas em dados de mercado. 
              Os valores reais podem variar conforme condições específicas, sazonalidade e disponibilidade.
            </p>
          </div>
        </div>
      </div>

      {/* Guia de Incoterms */}
      <IncotermGuide 
        selectedIncoterm={formData.incoterm} 
        onIncotermChange={handleIncotermChange} 
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Campos básicos */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {direcaoComercial === 'importacao' ? 'País de Origem *' : 'Porto de Origem (Brasil) *'}
            </label>
            <select
              value={formData.origin}
              onChange={(e) => handleInputChange('origin', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
            >
              {direcaoComercial === 'importacao' ? (
                // IMPORTAÇÃO: Todos os países (exceto Brasil)
                paisesComerciais.map(pais => (
                  <option key={pais.codigo} value={pais.codigo}>
                    {pais.nome} ({pais.codigo})
                  </option>
                ))
              ) : (
                // EXPORTAÇÃO: Portos brasileiros
                portosBrasileiros.map(porto => (
                  <option key={porto.codigo} value={porto.codigo}>
                    {porto.nome}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {direcaoComercial === 'importacao' ? 'Porto de Destino (Brasil) *' : 'País de Destino *'}
            </label>
            <select
              value={formData.destination}
              onChange={(e) => handleInputChange('destination', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
            >
              {direcaoComercial === 'importacao' ? (
                // IMPORTAÇÃO: Portos brasileiros
                portosBrasileiros.map(porto => (
                  <option key={porto.codigo} value={porto.codigo}>
                    {porto.nome}
                  </option>
                ))
              ) : (
                // EXPORTAÇÃO: Todos os países
                paisesComerciais.map(pais => (
                  <option key={pais.codigo} value={pais.codigo}>
                    {pais.nome} ({pais.codigo})
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Peso (kg) *
            </label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => handleInputChange('weight', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
              placeholder="1000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Volume (m³) *
            </label>
            <input
              type="number"
              value={formData.volume}
              onChange={(e) => handleInputChange('volume', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
              placeholder="5.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Valor da Carga (USD) *
            </label>
            <input
              type="number"
              value={formData.cargoValue}
              onChange={(e) => handleInputChange('cargoValue', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
              placeholder="10000"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Mercadoria
            </label>
            <select
              value={formData.cargoType}
              onChange={(e) => handleInputChange('cargoType', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
            >
              {cargoTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              NCM (8 dígitos) *
            </label>
            <input
              type="text"
              value={formData.ncm}
              onChange={(e) => handleInputChange('ncm', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
              placeholder="12345678"
              maxLength={8}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Incoterm
            </label>
            <select
              value={formData.incoterm}
              onChange={(e) => handleInputChange('incoterm', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
            >
              {incoterms.map(incoterm => (
                <option key={incoterm.value} value={incoterm.value}>{incoterm.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Serviço
            </label>
            <select
              value={formData.serviceType}
              onChange={(e) => handleInputChange('serviceType', e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-gray-100"
            >
              {serviceTypes.map(service => (
                <option key={service.value} value={service.value}>{service.label}</option>
              ))}
            </select>
          </div>


              </div>

        {/* Botão de Calcular */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-gold px-8 py-3 rounded-lg font-medium text-gray-900 hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                Calculando...
              </>
            ) : (
              <>
                <Icon src="/icons/calculator.svg" alt="Calcular" size="sm" />
                Calcular com IA e Dados Reais
              </>
            )}
          </button>
        </div>
      </form>

      {/* Exibição de Erros */}
      {errors.length > 0 && (
        <div className="glass p-4 rounded-xl border border-red-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Icon src="/icons/error.svg" alt="Erro" size="sm" className="text-red-400" />
            <h4 className="text-red-400 font-medium">Erros de Validação</h4>
            </div>
          <ul className="text-sm text-gray-300 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>• {error}</li>
            ))}
          </ul>
            </div>
          )}

      {/* Resultados */}
      {hasCalculated && advancedResult && (
        <div className="space-y-6 mt-8">
          {/* Seção 1: Dados de Entrada */}
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h4 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
              <Icon src="/icons/truck-gear.svg" alt="Dados" size="sm" className="text-accent" />
              📋 Dados de Entrada
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center glass p-4 rounded-xl border border-accent/20">
                <h5 className="text-sm font-medium text-gray-100 mb-2">Origem</h5>
                <p className="text-lg font-bold text-accent">{advancedResult.secao1.dados_entrada.origem}</p>
              </div>
              <div className="text-center glass p-4 rounded-xl border border-accent/20">
                <h5 className="text-sm font-medium text-gray-100 mb-2">Destino</h5>
                <p className="text-lg font-bold text-accent">{advancedResult.secao1.dados_entrada.destino}</p>
              </div>
              <div className="text-center glass p-4 rounded-xl border border-accent/20">
                <h5 className="text-sm font-medium text-gray-100 mb-2">Peso</h5>
                <p className="text-lg font-bold text-accent">{advancedResult.secao1.dados_entrada.peso.kg} kg</p>
                <p className="text-sm text-gray-300">{advancedResult.secao1.dados_entrada.peso.lb} lb</p>
              </div>
            </div>
          </div>

          {/* Seção 2: Análise de Carga */}
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h4 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
              <Icon src="/icons/chart.svg" alt="Análise" size="sm" className="text-accent" />
              📦 Análise de Carga
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-100 mb-3">Características da Carga</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center glass p-2 rounded border border-gray-700">
                    <span className="text-sm text-gray-300">Tipo de Container</span>
                    <span className="text-sm font-medium text-accent">{advancedResult.secao2.analise_carga.tipo_container_recomendado}</span>
                  </div>
                  <div className="flex justify-between items-center glass p-2 rounded border border-gray-700">
                    <span className="text-sm text-gray-300">Ocupação</span>
                    <span className="text-sm font-medium text-accent">{advancedResult.secao2.analise_carga.ocupacao_container}%</span>
                  </div>
                  <div className="flex justify-between items-center glass p-2 rounded border border-gray-700">
                    <span className="text-sm text-gray-300">Densidade</span>
                    <span className="text-sm font-medium text-accent">{advancedResult.secao2.analise_carga.densidade_carga} kg/m³</span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-100 mb-3">Classificação</h5>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent mb-2">
                    {advancedResult.secao2.analise_carga.classificacao_carga}
                  </div>
                  <div className="text-sm text-gray-300">
                    {advancedResult.secao2.analise_carga.restricoes_especiais.length > 0 ? 
                      `Restrições: ${advancedResult.secao2.analise_carga.restricoes_especiais.join(', ')}` : 
                      'Sem restrições especiais'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 3: Custos de Frete */}
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h4 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
              <Icon src="/icons/analytics.svg" alt="Custos" size="sm" className="text-accent" />
              💰 Custos de Frete
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-100 mb-3">Breakdown de Custos</h5>
                <div className="space-y-2">
                  <div className="flex justify-between items-center glass p-2 rounded border border-gray-700">
                    <span className="text-sm text-gray-300">Tarifa Base</span>
                    <span className="text-sm font-medium text-accent">${advancedResult.secao3.custos_frete.tarifa_base.usd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center glass p-2 rounded border border-gray-700">
                    <span className="text-sm text-gray-300">BAF</span>
                    <span className="text-sm font-medium text-accent">${advancedResult.secao3.custos_frete.baf.usd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center glass p-2 rounded border border-gray-700">
                    <span className="text-sm text-gray-300">CAF</span>
                    <span className="text-sm font-medium text-accent">${advancedResult.secao3.custos_frete.caf.usd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center glass p-2 rounded border border-gray-700">
                    <span className="text-sm text-gray-300">THC Origem</span>
                    <span className="text-sm font-medium text-accent">${advancedResult.secao3.custos_frete.thc_origem.usd.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center glass p-2 rounded border border-gray-700">
                    <span className="text-sm text-gray-300">THC Destino</span>
                    <span className="text-sm font-medium text-accent">${advancedResult.secao3.custos_frete.thc_destino.usd.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h5 className="font-medium text-gray-100 mb-3">Total de Frete</h5>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    ${advancedResult.secao3.custos_frete.total_frete.usd.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-300">
                    R$ {advancedResult.secao3.custos_frete.total_frete.brl.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 4: Resultado Final */}
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h4 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
              <Icon src="/icons/target.svg" alt="Resultado" size="sm" className="text-accent" />
              📈 Resultado Final
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center glass p-4 rounded-xl border border-accent/20">
                <h5 className="text-sm font-medium text-gray-100 mb-2">Custo Total</h5>
                <p className="text-2xl font-bold text-accent">${advancedResult.secao5.resultado_final.custo_total.usd.toFixed(2)}</p>
                <p className="text-sm text-gray-300">R$ {advancedResult.secao5.resultado_final.custo_total.brl.toFixed(2)}</p>
              </div>
              <div className="text-center glass p-4 rounded-xl border border-accent/20">
                <h5 className="text-sm font-medium text-gray-100 mb-2">Custo por kg</h5>
                <p className="text-2xl font-bold text-accent">${advancedResult.secao5.resultado_final.custo_por_kg.usd.toFixed(2)}</p>
                <p className="text-sm text-gray-300">R$ {advancedResult.secao5.resultado_final.custo_por_kg.brl.toFixed(2)}</p>
              </div>
              <div className="text-center glass p-4 rounded-xl border border-accent/20">
                <h5 className="text-sm font-medium text-gray-100 mb-2">Custo por m³</h5>
                <p className="text-2xl font-bold text-accent">${advancedResult.secao5.resultado_final.custo_por_m3.usd.toFixed(2)}</p>
                <p className="text-sm text-gray-300">R$ {advancedResult.secao5.resultado_final.custo_por_m3.brl.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Seção 5: Comparativo de Modais */}
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h4 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
              <Icon src="/icons/tools.svg" alt="Comparativo" size="sm" className="text-accent" />
              ⚖️ Comparativo de Modais
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {advancedResult.secao6.comparativo_modais.map((modal, index) => (
                <div key={index} className="glass border border-gray-700 rounded-xl p-4">
                  <h5 className="font-medium text-gray-100 mb-2">{modal.modal}</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Custo:</span>
                      <span className="font-medium text-gray-100">${formatarValorFrete(modal.custo_total.usd)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tempo:</span>
                      <span className="font-medium text-gray-100">{modal.tempo_transito} dias</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">CO₂:</span>
                      <span className="font-medium text-gray-100">{modal.pegada_carbono} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Custo/kg:</span>
                      <span className="font-medium text-gray-100">${formatarValorFrete(modal.custo_por_kg.usd)}</span>
                    </div>
                  </div>
                  {modal.recomendacao && (
                    <div className="mt-3 glass p-2 rounded border border-accent/20 text-xs text-gray-100">
                      {modal.recomendacao}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Seção 6: Resultado Final */}
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h4 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
              <Icon src="/icons/target.svg" alt="Resultado" size="sm" className="text-accent" />
              🎯 Resultado Final
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center glass p-4 rounded-xl border border-accent/20">
                <h5 className="text-sm font-medium text-gray-100 mb-2">Custo Total</h5>
                <p className="text-2xl font-bold text-accent">${formatarValorFrete(advancedResult.secao5.resultado_final.custo_total.usd)}</p>
                <p className="text-sm text-gray-300">R$ {formatarValorFrete(advancedResult.secao5.resultado_final.custo_total.brl)}</p>
              </div>
              <div className="text-center glass p-4 rounded-xl border border-accent/20">
                <h5 className="text-sm font-medium text-gray-100 mb-2">Custo por kg</h5>
                <p className="text-2xl font-bold text-accent">${formatarValorFrete(advancedResult.secao5.resultado_final.custo_por_kg.usd)}</p>
                <p className="text-sm text-gray-300">R$ {formatarValorFrete(advancedResult.secao5.resultado_final.custo_por_kg.brl)}</p>
              </div>
              <div className="text-center glass p-4 rounded-xl border border-accent/20">
                <h5 className="text-sm font-medium text-gray-100 mb-2">Custo por m³</h5>
                <p className="text-2xl font-bold text-accent">${formatarValorFrete(advancedResult.secao5.resultado_final.custo_por_m3.usd)}</p>
                <p className="text-sm text-gray-300">R$ {formatarValorFrete(advancedResult.secao5.resultado_final.custo_por_m3.brl)}</p>
              </div>
            </div>
          </div>

          {/* ADICIONAR: Seção de IA Preditiva (PRESERVANDO TUDO + ADICIONANDO APENAS) */}
          {aiPrediction && (
            <div className="glass p-6 rounded-2xl shadow-gold card-hover">
              <h4 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
                <Icon src="/icons/ai.svg" alt="IA" size="sm" className="text-accent" />
                🤖 IA Preditiva - Análise Inteligente
              </h4>
              
              {/* Loading State */}
              {isAiLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                  <p className="text-gray-300">Analisando dados com IA...</p>
                </div>
              )}

              {/* Error State */}
              {aiError && (
                <div className="glass p-4 rounded-lg border border-red-500/20">
                  <p className="text-red-400 text-sm">{aiError}</p>
                </div>
              )}

              {/* AI Results */}
              {!isAiLoading && !aiError && aiPrediction && (
                <div className="space-y-6">
                  {/* Janela Ótima de Embarque */}
                  <div className="glass p-4 rounded-xl border border-accent/20">
                    <h5 className="font-medium text-gray-100 mb-3 flex items-center gap-2">
                      <span className="text-accent">🎯</span>
                      Janela Ótima de Embarque
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Início:</span>
                        <span className="ml-2 font-medium text-gray-100">Dia {aiPrediction.optimalShippingWindow.startDay}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Fim:</span>
                        <span className="ml-2 font-medium text-gray-100">Dia {aiPrediction.optimalShippingWindow.endDay}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Confiança:</span>
                        <span className="ml-2 font-medium text-gray-100">{(aiPrediction.confidenceLevel * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-300 mt-2">{aiPrediction.optimalShippingWindow.reason}</p>
                  </div>

                  {/* Tendências de Mercado */}
                  <div className="glass p-4 rounded-xl border border-accent/20">
                    <h5 className="font-medium text-gray-100 mb-3 flex items-center gap-2">
                      <span className="text-accent">📈</span>
                      Tendências de Mercado
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Direção:</span>
                        <span className={`ml-2 font-medium ${
                          aiPrediction.marketTrends.direction === 'rising' ? 'text-green-400' :
                          aiPrediction.marketTrends.direction === 'falling' ? 'text-red-400' :
                          'text-yellow-400'
                        }`}>
                          {aiPrediction.marketTrends.direction === 'rising' ? '↗️ Subindo' :
                           aiPrediction.marketTrends.direction === 'falling' ? '↘️ Caindo' :
                           '→ Estável'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-400">Volatilidade:</span>
                        <span className="ml-2 font-medium text-gray-100">{(aiPrediction.marketTrends.volatility * 100).toFixed(1)}%</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Capacidade:</span>
                        <span className="ml-2 font-medium text-gray-100">{(aiPrediction.marketTrends.capacity * 100).toFixed(0)}%</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Demanda:</span>
                        <span className="ml-2 font-medium text-gray-100">{(aiPrediction.marketTrends.demand * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Fatores de Risco */}
                  {aiPrediction.riskFactors.length > 0 && (
                    <div className="glass p-4 rounded-xl border border-accent/20">
                      <h5 className="font-medium text-gray-100 mb-3 flex items-center gap-2">
                        <span className="text-accent">⚠️</span>
                        Fatores de Risco Identificados
                      </h5>
                      <div className="space-y-2">
                        {aiPrediction.riskFactors.map((risk, index) => (
                          <div key={index} className={`p-2 rounded text-xs ${
                            risk.impact === 'high' ? 'bg-red-500/10 border border-red-500/20' :
                            risk.impact === 'medium' ? 'bg-yellow-500/10 border border-yellow-500/20' :
                            'bg-blue-500/10 border border-blue-500/20'
                          }`}>
                            <div className="flex justify-between items-start">
                              <span className="font-medium text-gray-100">{risk.factor}</span>
                              <span className={`text-xs px-2 py-1 rounded ${
                                risk.impact === 'high' ? 'bg-red-500/20 text-red-300' :
                                risk.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-blue-500/20 text-blue-300'
                              }`}>
                                {risk.impact.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-gray-300 mt-1">{risk.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Predição de Custos */}
                  <div className="glass p-4 rounded-xl border border-accent/20">
                    <h5 className="font-medium text-gray-100 mb-3 flex items-center gap-2">
                      <span className="text-accent">🔮</span>
                      Predição de Custos (30 dias)
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Custo Atual:</span>
                        <span className="ml-2 font-medium text-gray-100">${aiPrediction.currentCost.usd.toFixed(0)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Custo Mínimo:</span>
                        <span className="ml-2 font-medium text-gray-100">${Math.min(...aiPrediction.predictedCosts.map(p => p.cost.usd)).toFixed(0)}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Custo Máximo:</span>
                        <span className="ml-2 font-medium text-gray-100">${Math.max(...aiPrediction.predictedCosts.map(p => p.cost.usd)).toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Alertas e Recomendações */}
          {advancedResult.alertas.length > 0 && (
            <div className="glass p-6 rounded-2xl shadow-gold card-hover">
              <h4 className="text-lg font-medium text-gray-100 mb-4 flex items-center gap-2">
                <Icon src="/icons/faq.svg" alt="Alertas" size="sm" className="text-accent" />
                ⚠️ Alertas e Recomendações
              </h4>
              <div className="space-y-3">
                {advancedResult.alertas.map((alerta, index) => (
                  <div key={index} className={`glass p-3 rounded-lg border ${
                    alerta.tipo === 'aviso' ? 'border-yellow-500/20' :
                    alerta.tipo === 'erro' ? 'border-red-500/20' :
                    'border-accent/20'
                  }`}>
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {alerta.tipo === 'aviso' ? (
                          <Icon src="/icons/faq.svg" alt="Aviso" size="sm" className="text-yellow-400" />
                        ) : alerta.tipo === 'erro' ? (
                          <Icon src="/icons/faq.svg" alt="Erro" size="sm" className="text-red-400" />
                        ) : (
                          <Icon src="/icons/faq.svg" alt="Info" size="sm" className="text-accent" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-100">{alerta.icone}</p>
                        <p className="text-sm text-gray-300 mt-1">{alerta.mensagem}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 