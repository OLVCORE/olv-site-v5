"use client";

import React, { useState, useRef, useEffect } from 'react';
import InfoTooltip from '../ui/InfoTooltip';
import Image from 'next/image';
import RealtimeQuotes from '../radar/RealtimeQuotes';
import SimulatorDisclaimer from './SimulatorDisclaimer';

// Função toNumber global para uso em todo o componente
const toNumber = (s:string)=>{
  const value=s.trim();
  if(!value) return 0;
  const cleanValue = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleanValue) || 0;
};

interface Props { showQuotes?: boolean }

// Interface para dados de NCM da API TTCE
interface NcmData {
  code: string;
  description: string;
  reintegra: string;
  drawback: string;
  iof?: string;
  pis?: string;
  cofins?: string;
}

// Interface para simulação salva
interface SavedSimulation {
  id: string;
  timestamp: Date;
  name: string;
  data: {
    ncm: string;
    fob: string;
    freight: string;
    insurance: string;
    inland: string;
    port: string;
    misc: string;
    reintegra: string;
    drawback: string;
    exchange: string;
    selectedCurrency: string;
  };
  result: {
    totalCosts: number;
    revenueUSD: number;
    revenueBRL: number;
    reintegraValue: number;
    drawbackValue: number;
    markup: number;
  };
}

// Interface para template de produto
interface ProductTemplate {
  id: string;
  name: string;
  category: string;
  ncm: string;
  defaultFob: string;
  defaultFreight: string;
  defaultInsurance: string;
  defaultInland: string;
  defaultPort: string;
  defaultMisc: string;
}

export default function ExportCostCalculator({showQuotes=true}:Props) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [result, setResult] = useState<null | {
    totalCosts: number;
    revenueUSD: number;
    revenueBRL: number;
    reintegraValue: number;
    drawbackValue: number;
    markup: number;
    profitMargin: number;
    markupValue: number;
    profitMarginValue: number;
    suggestedPriceWithMarkup: number;
    actualProfit: number;
    scenarioOptimistic: {
      revenueUSD: number;
      revenueBRL: number;
    };
    scenarioPessimistic: {
      revenueUSD: number;
      revenueBRL: number;
    };
  }>(null);
  const [rate, setRate] = useState(1);
  const [fileType, setFileType] = useState<'pdf' | 'xls'>('pdf');
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const contactRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | HTMLInputElement | null>>({});
  
  // Estados para o seletor de NCM real
  const [selectedNcm, setSelectedNcm] = useState<NcmData | null>(null);
  const [ncmSearch, setNcmSearch] = useState('');
  const [showNcmDropdown, setShowNcmDropdown] = useState(false);
  const [ncmResults, setNcmResults] = useState<NcmData[]>([]);
  const [isLoadingNcm, setIsLoadingNcm] = useState(false);

  // Estados para histórico e templates
  const [savedSimulations, setSavedSimulations] = useState<SavedSimulation[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProductTemplate | null>(null);

  // Estados para o seletor de moedas
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencyRates, setCurrencyRates] = useState<Record<string, number>>({});
  const [isManualRate, setIsManualRate] = useState(false);
  const [manualRate, setManualRate] = useState('');

  // Lista de moedas disponíveis
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
    { code: 'BTC', name: 'Bitcoin', symbol: '₿' }
  ];

  // Templates de produtos para exportação
  const productTemplates: ProductTemplate[] = [
    {
      id: '1',
      name: 'Eletrônicos',
      category: 'Tecnologia',
      ncm: '8517.13.00',
      defaultFob: '500',
      defaultFreight: '50',
      defaultInsurance: '10',
      defaultInland: '20',
      defaultPort: '15',
      defaultMisc: '5'
    },
    {
      id: '2',
      name: 'Têxteis',
      category: 'Vestuário',
      ncm: '6104.43.00',
      defaultFob: '200',
      defaultFreight: '30',
      defaultInsurance: '5',
      defaultInland: '15',
      defaultPort: '10',
      defaultMisc: '3'
    },
    {
      id: '3',
      name: 'Automotivo',
      category: 'Indústria',
      ncm: '8708.99.00',
      defaultFob: '1000',
      defaultFreight: '100',
      defaultInsurance: '20',
      defaultInland: '40',
      defaultPort: '25',
      defaultMisc: '10'
    },
    {
      id: '4',
      name: 'Alimentos',
      category: 'Agro',
      ncm: '0801.32.00',
      defaultFob: '300',
      defaultFreight: '40',
      defaultInsurance: '8',
      defaultInland: '25',
      defaultPort: '18',
      defaultMisc: '7'
    },
    {
      id: '5',
      name: 'Químicos',
      category: 'Indústria',
      ncm: '3824.99.00',
      defaultFob: '800',
      defaultFreight: '80',
      defaultInsurance: '15',
      defaultInland: '35',
      defaultPort: '22',
      defaultMisc: '8'
    }
  ];

  // Funções de formatação de moeda
  const brl = (v:number)=> v.toLocaleString('pt-BR', {style:'currency',currency:'BRL', minimumFractionDigits: 2, maximumFractionDigits: 4});
  
  // Função dinâmica para formatação na moeda selecionada
  const formatCurrency = (v: number, currency: string = selectedCurrency) => {
    return v.toLocaleString('pt-BR', {
      style: 'currency', 
      currency: currency, 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 4
    });
  };
  
  // Função para obter símbolo da moeda
  const getCurrencySymbol = (currency: string) => {
    const currencyMap: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'CNY': '¥',
      'JPY': '¥',
      'ARS': '$',
      'CLP': '$',
      'MXN': '$',
      'CAD': '$',
      'AUD': '$',
      'CHF': 'CHF',
      'BRL': 'R$',
      'BTC': '₿'
    };
    return currencyMap[currency] || currency;
  };

  // Função para buscar cotações em tempo real
  const fetchCurrencyRates = async () => {
    try {
      const symbols = availableCurrencies.map(c => c.code).join(',');
      const response = await fetch(`/api/radar/quotes?symbols=${symbols}`);
      const data = await response.json();
      if (data.rates) {
        setCurrencyRates(data.rates);
        if (!isManualRate && inputRefs.current.exchange) {
          const currentRate = getCurrentRate();
          inputRefs.current.exchange.value = currentRate.toFixed(4);
          setRate(currentRate);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    }
  };

  // Função para obter cotação atual da moeda selecionada
  const getCurrentRate = () => {
    if (isManualRate && manualRate) {
      return toNumber(manualRate);
    }
    const rate = currencyRates[selectedCurrency] || 0;
    if (rate === 0) {
      // Taxas padrão de fallback
      const defaultRates: Record<string, number> = {
        'USD': 5.0,
        'EUR': 5.5,
        'GBP': 6.3,
        'CNY': 0.7,
        'JPY': 0.034,
        'ARS': 0.006,
        'CLP': 0.006,
        'MXN': 0.3,
        'CAD': 3.7,
        'AUD': 3.3,
        'CHF': 5.7,
        'BRL': 1.0,
        'BTC': 250000
      };
      return defaultRates[selectedCurrency] || 5.0;
    }
    return rate;
  };

  // Função para atualizar cotação quando moeda muda
  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency);
    setIsManualRate(false);
    setManualRate('');
    
    // Atualizar campo de cotação automaticamente
    if (inputRefs.current.exchange) {
      const rate = currencyRates[currency] || 0;
      inputRefs.current.exchange.value = rate.toFixed(4);
      setRate(rate);
    }
  };

  // Função para limpar todos os campos
  const clearAllFields = () => {
    const fields = ['fob', 'freight', 'insurance', 'inland', 'port', 'misc', 'reintegra', 'drawback'];
    fields.forEach(field => {
      const input = inputRefs.current[field];
      if (input) {
        input.value = '';
      }
    });
    setResult(null);
    setSelectedNcm(null);
    setNcmSearch('');
    setSelectedTemplate(null);
  };

  // Função para buscar NCM na API TTCE (simulada - em produção seria API real)
  const searchNcm = async (query: string) => {
    if (query.length < 3) return;
    
    setIsLoadingNcm(true);
    try {
      // Simulação de API TTCE - em produção seria fetch real
      const mockResults: NcmData[] = [
        { code: '8471.30.12', description: 'Notebooks e laptops', reintegra: '1.5', drawback: '0.0' },
        { code: '8517.13.00', description: 'Smartphones', reintegra: '1.5', drawback: '0.0' },
        { code: '8703.23.00', description: 'Automóveis de passageiros', reintegra: '1.0', drawback: '0.0' },
        { code: '8708.99.00', description: 'Peças de veículos', reintegra: '2.0', drawback: '0.0' },
        { code: '8544.49.00', description: 'Cabos elétricos', reintegra: '2.0', drawback: '0.0' },
        { code: '8517.62.00', description: 'Roteadores de rede', reintegra: '1.5', drawback: '0.0' },
        { code: '8528.72.00', description: 'Monitores de TV', reintegra: '1.5', drawback: '0.0' },
        { code: '9503.00.00', description: 'Brinquedos', reintegra: '2.0', drawback: '0.0' },
        { code: '6403.59.00', description: 'Calçados esportivos', reintegra: '2.0', drawback: '0.0' },
        { code: '4202.12.00', description: 'Malas e bolsas', reintegra: '2.0', drawback: '0.0' },
      ].filter(ncm => 
        ncm.code.includes(query) || 
        ncm.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setNcmResults(mockResults);
    } catch (error) {
      console.error('Erro ao buscar NCM:', error);
    } finally {
      setIsLoadingNcm(false);
    }
  };

  // Selecionar NCM e aplicar alíquotas automaticamente
  const handleNcmSelect = (ncm: NcmData) => {
    setSelectedNcm(ncm);
    setNcmSearch(ncm.code);
    setShowNcmDropdown(false);
    
    // Aplicar alíquotas automaticamente
    const reintegraInput = inputRefs.current['reintegra'];
    const drawbackInput = inputRefs.current['drawback'];
    
    if (reintegraInput) reintegraInput.value = ncm.reintegra;
    if (drawbackInput) drawbackInput.value = ncm.drawback;
  };

  // Aplicar template de produto
  const applyTemplate = (template: ProductTemplate) => {
    setSelectedTemplate(template);
    setNcmSearch(template.ncm);
    
    // Preencher campos com valores do template
    const fields = ['fob', 'freight', 'insurance', 'inland', 'port', 'misc'];
    fields.forEach(field => {
      const input = inputRefs.current[field];
      if (input) {
        input.value = (template as any)[`default${field.charAt(0).toUpperCase() + field.slice(1)}`];
      }
    });
    
    // Buscar NCM do template
    searchNcm(template.ncm);
    setShowTemplates(false);
  };

  // Salvar simulação
  const saveSimulation = (name: string) => {
    if (!result) return;
    
    const simulation: SavedSimulation = {
      id: Date.now().toString(),
      timestamp: new Date(),
      name,
      data: {
        ncm: selectedNcm?.code || '',
        fob: getVal('fob'),
        freight: getVal('freight'),
        insurance: getVal('insurance'),
        inland: getVal('inland'),
        port: getVal('port'),
        misc: getVal('misc'),
        reintegra: getVal('reintegra'),
        drawback: getVal('drawback'),
        exchange: getVal('exchange'),
        selectedCurrency: selectedCurrency,
      },
      result
    };
    
    const updated = [simulation, ...savedSimulations.slice(0, 9)]; // Manter apenas 10
    setSavedSimulations(updated);
    localStorage.setItem('exportSimulations', JSON.stringify(updated));
  };

  // Carregar simulações salvas
  useEffect(() => {
    const saved = localStorage.getItem('exportSimulations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedSimulations(parsed);
      } catch (error) {
        console.error('Erro ao carregar simulações:', error);
      }
    }
  }, []);

  // Buscar cotações ao carregar o componente e quando moeda muda
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const symbols = availableCurrencies.map(c => c.code).join(',');
        const response = await fetch(`/api/radar/quotes?symbols=${symbols}`);
        const data = await response.json();
        if (data.rates) {
          setCurrencyRates(data.rates);
          // Atualizar taxa de câmbio selecionada
          const currentRate = data.rates[selectedCurrency];
          if (currentRate && !isManualRate && inputRefs.current.exchange) {
            inputRefs.current.exchange.value = currentRate.toFixed(4);
            setRate(currentRate);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar cotações:', error);
      }
    };
    
    fetchRates();
    const interval = setInterval(fetchRates, 300000); // A cada 5 minutos
    return () => clearInterval(interval);
  }, [selectedCurrency, isManualRate]);

  // Buscar NCM quando o usuário digita
  useEffect(() => {
    if (ncmSearch.length >= 3) {
      searchNcm(ncmSearch);
    } else {
      setNcmResults([]);
    }
  }, [ncmSearch]);

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.ncm-dropdown-container')) {
        setShowNcmDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Funções auxiliares
  const getVal = (key: string) => inputRefs.current[key]?.value || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fob = toNumber(getVal('fob'));
    const freight = toNumber(getVal('freight'));
    const insurance = toNumber(getVal('insurance'));
    const inland = toNumber(getVal('inland'));
    const port = toNumber(getVal('port'));
    const misc = toNumber(getVal('misc'));
    const reintegra = toNumber(getVal('reintegra')) || 0;
    const drawback = toNumber(getVal('drawback')) || 0;
    const exchange = getCurrentRate();

    const totalCosts = fob + freight + insurance + inland + port + misc;
    const revenueUSD = fob;
    const revenueBRL = revenueUSD * exchange;
    
    const reintegraValue = revenueUSD * (reintegra / 100);
    const drawbackValue = revenueUSD * (drawback / 100);
    
    const markup = 20; // Markup padrão de 20%
    const markupValue = revenueUSD * (markup / 100);
    const profitMargin = 15; // Margem de lucro padrão de 15%
    const profitMarginValue = revenueUSD * (profitMargin / 100);
    
    const suggestedPriceWithMarkup = revenueUSD + markupValue;
    const actualProfit = revenueUSD - totalCosts + reintegraValue + drawbackValue;
    
    const scenarioOptimistic = {
      revenueUSD: revenueUSD * 1.1,
      revenueBRL: revenueUSD * 1.1 * exchange
    };
    
    const scenarioPessimistic = {
      revenueUSD: revenueUSD * 0.9,
      revenueBRL: revenueUSD * 0.9 * exchange
    };

    setRate(exchange);
    setResult({
      totalCosts,
      revenueUSD,
      revenueBRL,
      reintegraValue,
      drawbackValue,
      markup,
      profitMargin,
      markupValue,
      profitMarginValue,
      suggestedPriceWithMarkup,
      actualProfit,
      scenarioOptimistic,
      scenarioPessimistic
    });
    
    // ✅ VALORES MANTIDOS - usuário pode editar e recalcular
    // ✅ Só serão limpos quando clicar em "Limpar Tudo"
  };

  // Funções de formatação e validação
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, '');
    const value = e.currentTarget.value;
    const commaCount = (value.match(/,/g) || []).length;
    const dotCount = (value.match(/\./g) || []).length;
    if (commaCount > 1) {
      e.currentTarget.value = value.replace(/,/g, (match, index) => 
        index === value.lastIndexOf(',') ? match : ''
      );
    }
    if (dotCount > 1) {
      e.currentTarget.value = value.replace(/\./g, (match, index) => 
        index === value.lastIndexOf('.') ? match : ''
      );
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const raw = e.currentTarget.value.replace(/\./g, '').replace(',', '.');
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      const isPercentage = ['reintegra', 'drawback'].includes(e.currentTarget.name);
      const maxDigits = isPercentage ? 2 : 4;
      e.currentTarget.value = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: maxDigits,
      }).format(num);
    }
  };

  // Componente Field reutilizável
  interface FieldProps { name: string; label: string; suffix?: string; tip?: string; }
  const Field = ({ name, label, suffix, tip }: FieldProps) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 dark:text-accent-light mb-1">
        <span className="inline-flex items-center gap-1">
          {label}
          {tip && <InfoTooltip content={tip} />}
        </span>
      </label>
      <div className="relative">
        <input
          ref={(el) => { inputRefs.current[name] = el; }}
          type="text"
          inputMode="decimal"
          onChange={handleChange}
          onBlur={handleBlur}
          className="w-full rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
          placeholder="0,00"
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );

  // Função para exportar relatório
  const exportReport = async () => {
    if (!result) return;
    
    const reportData = {
      title: 'Relatório de Custo de Exportação',
      date: new Date().toLocaleDateString('pt-BR'),
      currency: selectedCurrency,
      exchangeRate: rate,
      inputs: {
        fob: getVal('fob'),
        freight: getVal('freight'),
        insurance: getVal('insurance'),
        inland: getVal('inland'),
        port: getVal('port'),
        misc: getVal('misc'),
        reintegra: getVal('reintegra'),
        drawback: getVal('drawback'),
        exchange: getVal('exchange'),
      },
      results: result,
      ncm: selectedNcm?.code || 'Não informado',
      ncmDescription: selectedNcm?.description || 'Não informado'
    };

    if (fileType === 'pdf') {
      // Implementar geração de PDF
      console.log('Gerando PDF:', reportData);
      alert('Funcionalidade de PDF em desenvolvimento');
    } else {
      // Implementar geração de XLS
      console.log('Gerando XLS:', reportData);
      alert('Funcionalidade de XLS em desenvolvimento');
    }
  };

  // Função para enviar formulário de contato
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar envio do formulário
    alert('Formulário enviado com sucesso!');
  };

  return (
    <>
    <div className="grid gap-8 lg:grid-cols-[10cm_minmax(0,1fr)_15cm]">
      {/* Disclaimer Compacto no Início */}
      <div className="col-span-full mb-4">
        <SimulatorDisclaimer variant="compact" />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Barra de ferramentas */}
        <div className="flex items-center gap-1 mb-3">
          <button
            type="button"
            onClick={() => setShowTemplates(true)}
            className="glass px-2 py-1 rounded-md text-white shadow-gold card-hover transition-all duration-300 flex items-center gap-1 border border-accent/20 backdrop-blur-sm text-xs"
          >
            <img src="/icons/templates-glass.svg" alt="Templates" className="w-3 h-3" />
            Templates
          </button>
          <button
            type="button"
            onClick={() => setShowHistory(true)}
            className="glass px-2 py-1 rounded-md text-white shadow-gold card-hover transition-all duration-300 flex items-center gap-1 border border-accent/20 backdrop-blur-sm text-xs"
          >
            <img src="/icons/history-glass.svg" alt="Histórico" className="w-3 h-3" />
            Histórico
          </button>
          <button
            type="button"
            onClick={() => alert('Funcionalidade em desenvolvimento')}
            className="glass px-2 py-1 rounded-md text-white shadow-gold card-hover transition-all duration-300 flex items-center gap-1 border border-accent/20 backdrop-blur-sm text-xs"
          >
            <img src="/icons/markup-glass.svg" alt="Markup" className="w-3 h-3" />
            Markup
          </button>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={false}
              onChange={() => alert('Funcionalidade em desenvolvimento')}
              className="rounded"
            />
            Auto-save
          </label>
        </div>

        {/* Seletor de Moeda Único */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-200 dark:text-accent-light mb-1">
            <span className="inline-flex items-center gap-1">
              Moeda de Origem
              <InfoTooltip content="Selecione a moeda do valor FOB para conversão automática" />
            </span>
          </label>
          <div className="flex gap-2">
            <select
              value={selectedCurrency}
              onChange={(e) => handleCurrencyChange(e.target.value)}
              className="flex-1 rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm text-gray-900 dark:text-white"
            >
              {availableCurrencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setIsManualRate(!isManualRate)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                isManualRate 
                  ? 'bg-yellow-600 text-white hover:bg-yellow-700' 
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
              title={isManualRate ? "Usando cotação manual" : "Adicionar cotação manual"}
            >
              {isManualRate ? '📝' : '✏️'}
            </button>
          </div>
          
          {/* Campo de Cotação Inteligente */}
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-200 dark:text-accent-light mb-1">
              <span className="inline-flex items-center gap-1">
                Cotação (BRL)
                <InfoTooltip content={isManualRate ? "Cotação manual - responsabilidade do usuário" : "Cotação automática em tempo real"} />
              </span>
            </label>
            <div className="flex gap-2">
              <input
                ref={(el) => { inputRefs.current.exchange = el; }}
                type="text"
                inputMode="decimal"
                defaultValue={currencyRates[selectedCurrency]?.toFixed(4) || "5,0000"}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`flex-1 rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm text-gray-900 dark:text-white ${
                  isManualRate ? 'border-2 border-yellow-500' : ''
                }`}
                placeholder="0,0000"
                disabled={!isManualRate}
              />
              {!isManualRate && (
                <div className="flex items-center px-3 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-xs">
                  <span className="mr-1">🔄</span>
                  Tempo Real
                </div>
              )}
              {isManualRate && (
                <div className="flex items-center px-3 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md text-xs">
                  <span className="mr-1">⚠️</span>
                  Manual
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Seletor de NCM real */}
        <div className="relative dropdown-container">
          <label className="block text-sm font-medium text-gray-200 dark:text-accent-light mb-1">
            <span className="inline-flex items-center gap-1">
              NCM do Produto (TTCE)
              <InfoTooltip content="Digite o código NCM ou descrição para buscar na Tabela de Tributação do Comércio Exterior" />
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={ncmSearch}
              onChange={(e) => {
                setNcmSearch(e.target.value);
                setShowNcmDropdown(true);
              }}
              onFocus={() => setShowNcmDropdown(true)}
              placeholder="Digite o NCM ou descrição do produto..."
              className="w-full rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
            />
            {isLoadingNcm && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
              </div>
            )}
            {showNcmDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {ncmResults.length > 0 ? (
                  ncmResults.map((ncm) => (
                    <button
                      key={ncm.code}
                      type="button"
                      onClick={() => handleNcmSelect(ncm)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{ncm.code}</div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">{ncm.description}</div>
                      <div className="text-accent text-xs">
                        Reintegra: {ncm.reintegra}% | Drawback: {ncm.drawback}%
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                    {isLoadingNcm ? 'Buscando...' : 'Nenhum NCM encontrado'}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <Field name="fob" label={`Valor FOB (${selectedCurrency})`} suffix={selectedCurrency} tip="Valor da mercadoria para exportação." />
        <Field name="freight" label={`Frete Internacional (${selectedCurrency})`} suffix={selectedCurrency} tip="Custo de frete até o destino." />
        <Field name="insurance" label={`Seguro (${selectedCurrency})`} suffix={selectedCurrency} tip="Seguro internacional da carga." />
        <Field name="inland" label={`Frete Interno (${selectedCurrency})`} suffix={selectedCurrency} tip="Transporte até porto/aeroporto." />
        <Field name="port" label={`Taxas Portuárias (${selectedCurrency})`} suffix={selectedCurrency} tip="THC, documentação, etc." />
        <Field name="misc" label={`Outras Despesas (${selectedCurrency})`} suffix={selectedCurrency} tip="Despesas adicionais." />
        <Field name="reintegra" label="Reintegra" suffix="%" tip="Alíquota de crédito (0-3%)." />
        <Field name="drawback" label="Drawback" suffix="%" tip="Alíquota de drawback (0-100%)." />
        
        {/* Seção de Markup e Margem */}
        <div className="border-t border-gray-300 dark:border-gray-600 pt-4 mt-4">
          <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">📊 Configurações de Rentabilidade</h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 dark:text-accent-light mb-1">
                <span className="inline-flex items-center gap-1">
                  Markup Desejado
                  <InfoTooltip content="Percentual sobre o custo total para definir preço de venda sugerido" />
                </span>
              </label>
              <div className="relative">
                              <input
                type="text"
                value="20"
                onChange={() => alert('Funcionalidade em desenvolvimento')}
                  className="w-full rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                  placeholder="20"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500 pointer-events-none">
                  %
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 dark:text-accent-light mb-1">
                <span className="inline-flex items-center gap-1">
                  Margem de Lucro
                  <InfoTooltip content="Percentual de lucro sobre o preço de venda final" />
                </span>
              </label>
              <div className="relative">
                              <input
                type="text"
                value="15"
                onChange={() => alert('Funcionalidade em desenvolvimento')}
                  className="w-full rounded-md bg-gray-100 dark:bg-gray-700 border-none focus:ring-accent p-2 text-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
                  placeholder="16.67"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-xs text-gray-500 pointer-events-none">
                  %
                </span>
              </div>
            </div>
          </div>
          
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-800 dark:text-blue-200">
            <strong>💡 Dica:</strong> Markup é sobre o custo, Margem é sobre o preço final. Ex: 20% markup = 16.67% margem.
          </div>
        </div>
        
        <div className="flex gap-2 mt-2">
          <button type="submit" className="btn btn-primary flex-1">Calcular</button>
          <button 
            type="button" 
            onClick={clearAllFields}
            className="btn bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            🗑️ Limpar Tudo
          </button>
        </div>
      </form>

      {result && (
        <div
          ref={resultRef}
          className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-lg text-sm md:text-base col-span-2"
        >
          {/* Cabeçalho Corporativo */}
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Relatório de Custo de Exportação
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Análise detalhada de custos e benefícios fiscais para exportação
            </p>
          </div>
          
          {selectedNcm && (
            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gray-600 dark:text-gray-400">📋</span>
                <span className="font-semibold text-gray-900 dark:text-white">Produto Identificado</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                <strong>NCM:</strong> {selectedNcm.code} - {selectedNcm.description}
              </div>
            </div>
          )}

          {/* Seção 1: Valor Base */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">1. Valor FOB (Base de Cálculo)</h4>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-lg p-4 bg-white dark:bg-gray-800">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Valor da mercadoria:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(toNumber(getVal('fob')))} / {brl(toNumber(getVal('fob')) * rate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 2: Custos de Exportação */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">2. Custos de Exportação</h4>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-lg p-4 bg-white dark:bg-gray-800">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Frete Internacional:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(toNumber(getVal('freight')))} / {brl(toNumber(getVal('freight')) * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Seguro:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(toNumber(getVal('insurance')))} / {brl(toNumber(getVal('insurance')) * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Frete Interno:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(toNumber(getVal('inland')))} / {brl(toNumber(getVal('inland')) * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Taxas Portuárias:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(toNumber(getVal('port')))} / {brl(toNumber(getVal('port')) * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Outras Despesas:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(toNumber(getVal('misc')))} / {brl(toNumber(getVal('misc')) * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-3">
                  <span className="font-semibold text-gray-900 dark:text-white">Total de Custos:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formatCurrency(result.totalCosts)} / {brl(result.totalCosts * rate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 3: Benefícios Fiscais */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">3. Benefícios Fiscais (Incentivos)</h4>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-lg p-4 bg-white dark:bg-gray-800">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Crédito Reintegra ({getVal('reintegra')}%):</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(result.reintegraValue)} / {brl(result.reintegraValue * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Crédito Drawback ({getVal('drawback')}%):</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    {formatCurrency(result.drawbackValue)} / {brl(result.drawbackValue * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-3">
                  <span className="font-semibold text-gray-900 dark:text-white">Total de Benefícios:</span>
                  <span className="font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(result.reintegraValue + result.drawbackValue)} / {brl((result.reintegraValue + result.drawbackValue) * rate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 4: Resultado Final */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">4. Resultado Final</h4>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-lg p-4 bg-white dark:bg-gray-800">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Valor FOB:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(toNumber(getVal('fob')))} / {brl(toNumber(getVal('fob')) * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">- Custos Totais:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">
                    -{formatCurrency(result.totalCosts)} / -{brl(result.totalCosts * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">+ Benefícios Fiscais:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    +{formatCurrency(result.reintegraValue + result.drawbackValue)} / +{brl((result.reintegraValue + result.drawbackValue) * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-4 bg-gray-50 dark:bg-gray-700 rounded-lg px-3">
                  <span className="font-bold text-gray-900 dark:text-white text-lg">Receita Líquida:</span>
                  <span className="font-bold text-xl text-green-600 dark:text-green-400">
                    {formatCurrency(result.revenueUSD)} / {brl(result.revenueBRL)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 5: Análise de Rentabilidade */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">5. Análise de Rentabilidade</h4>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-lg p-4 bg-white dark:bg-gray-800">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Lucro Real:</span>
                  <span className={`font-medium ${result.actualProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {result.actualProfit >= 0 ? '+' : ''}{formatCurrency(result.actualProfit)} / {result.actualProfit >= 0 ? '+' : ''}{brl(result.actualProfit * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Markup Real (sobre FOB):</span>
                  <span className={`font-medium ${result.markup >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {result.markup >= 0 ? '+' : ''}{result.markup.toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Margem Real (sobre receita):</span>
                  <span className={`font-medium ${result.profitMargin >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {result.profitMargin >= 0 ? '+' : ''}{result.profitMargin.toFixed(2)}%
                  </span>
                </div>
                
                {/* Status de Viabilidade */}
                <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-3">
                  <span className="font-semibold text-gray-900 dark:text-white">Status da Exportação:</span>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm ${
                    result.revenueUSD > toNumber(getVal('fob')) 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-800'
                  }`}>
                    {result.revenueUSD > toNumber(getVal('fob')) ? (
                      <>
                        <span className="text-green-600">✅</span>
                        <span>Lucrativa</span>
                      </>
                    ) : (
                      <>
                        <span className="text-orange-600">⚠️</span>
                        <span>Precisa Otimização</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* Call-to-Action Corporativo */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Consultoria Especializada</h4>
            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
              <p>• <strong>Reduzir custos</strong> com negociação de fretes e seguros</p>
              <p>• <strong>Maximizar benefícios</strong> fiscais (Reintegra/Drawback)</p>
              <p>• <strong>Otimizar NCM</strong> para alíquotas corretas</p>
              <p>• <strong>Consultoria especializada</strong> em comércio exterior</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            ⚠️ Valores aproximados. Para cálculos precisos e otimização, consulte nossos especialistas.
          </p>

          {/* Botões de Ação Elegantes */}
          <div className="mt-6 space-y-4">
            {/* Seção de Download */}
            <div className="flex items-center gap-3">
              <select 
                value={fileType} 
                onChange={(e) => setFileType(e.target.value as 'pdf' | 'xls')} 
                className="glass px-4 py-2 rounded-lg text-white shadow-gold card-hover transition-all duration-300 border border-accent/20 backdrop-blur-sm text-sm bg-transparent"
              >
                <option value="pdf" className="bg-gray-800 text-white">📄 PDF</option>
                <option value="xls" className="bg-gray-800 text-white">📊 XLS</option>
              </select>
              <button 
                type="button" 
                onClick={exportReport}
                className="glass px-6 py-2 rounded-lg text-white shadow-gold card-hover transition-all duration-300 flex items-center gap-2 border border-accent/20 backdrop-blur-sm text-sm font-medium"
              >
                <span className="text-accent">⬇️</span>
                Baixar Relatório
              </button>
            </div>

            {/* Botões de Ação Principais */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                type="button"
                onClick={() => {
                  const name = prompt('Nome para salvar a simulação:');
                  if (name && result) saveSimulation(name);
                }}
                className="glass px-6 py-3 rounded-lg text-white shadow-gold card-hover transition-all duration-300 flex items-center justify-center gap-2 border border-green-500/20 backdrop-blur-sm text-sm font-medium bg-gradient-to-r from-green-600/20 to-green-700/20"
              >
                <span className="text-green-400">💾</span>
                Salvar Simulação
              </button>
              
              <a 
                href="/contato" 
                className="glass px-6 py-3 rounded-lg text-white shadow-gold card-hover transition-all duration-300 flex items-center justify-center gap-2 border border-accent/20 backdrop-blur-sm text-sm font-medium bg-gradient-to-r from-accent/20 to-accent/30 animate-pulse"
              >
                <span className="text-accent">💬</span>
                Falar com Especialista
              </a>
            </div>
          </div>

          <Image src="/images/BANNER-HOME.jpeg" alt="Banner OLV" width={1200} height={300} className="mt-8 rounded-lg w-full" />
        </div>
      )}
    </div>

    {/* Modal de Templates */}
    {showTemplates && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Templates de Produtos</h3>
          <div className="grid gap-3">
            {productTemplates.map((template) => (
              <button
                key={template.id}
                onClick={() => applyTemplate(template)}
                className="text-left p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="font-medium text-gray-900 dark:text-white">{template.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{template.category}</div>
                <div className="text-xs text-accent">NCM: {template.ncm}</div>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowTemplates(false)}
            className="btn mt-4 w-full"
          >
            Fechar
          </button>
        </div>
      </div>
    )}

    {/* Modal de Histórico */}
    {showHistory && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Histórico de Simulações</h3>
          {savedSimulations.length > 0 ? (
            <div className="space-y-3">
              {savedSimulations.map((sim) => (
                <div key={sim.id} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg">
                  <div className="font-medium text-gray-900 dark:text-white">{sim.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {sim.timestamp.toLocaleString('pt-BR')}
                  </div>
                  <div className="text-xs text-accent">
                    NCM: {sim.data.ncm} | Receita: {formatCurrency(sim.result.revenueUSD)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Nenhuma simulação salva ainda.</p>
          )}
          <button
            type="button"
            onClick={() => setShowHistory(false)}
            className="btn mt-4 w-full"
          >
            Fechar
          </button>
        </div>
      </div>
    )}

    {/* Modal de Calculadora de Markup */}
    {/* Remover modal de calculadora de markup */}

    {/* Modal de formulário de contato */}
    {showForm && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <form onSubmit={handleFormSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 border-2 border-accent">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Preencha para baixar o relatório</h3>
          <input ref={el => { contactRefs.current.name = el; }} required placeholder="Nome completo*" className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white" />
          <input ref={el => { contactRefs.current.phone = el; }} required placeholder="Telefone / WhatsApp*" pattern="[0-9\s\-()+]{8,15}" className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white" />
          <input type="email" ref={el => { contactRefs.current.email = el; }} required placeholder="Melhor e-mail*" className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white" />
          <textarea ref={el => { contactRefs.current.comments = el; }} required rows={3} placeholder="Empresa ou projeto*" className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white"></textarea>
          <label className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" ref={el => { contactRefs.current.consent = el; }} required className="mt-1" />
            <span>Autorizo a OLV Internacional a entrar em contato com base nos dados fornecidos, conforme a LGPD.</span>
          </label>
          <div className="flex gap-3 justify-end">
            <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancelar</button>
            <button type="submit" className="btn btn-primary">Enviar & Baixar</button>
          </div>
        </form>
      </div>
    )}

    {/* Disclaimer Detalhado no Final */}
    <div className="col-span-full mt-8">
      <SimulatorDisclaimer variant="detailed" />
    </div>
    </>
  );
} 