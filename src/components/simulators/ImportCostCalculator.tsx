"use client";

import React, { useState, useEffect, useRef } from 'react';
import { calculateImportCost } from '../../lib/importCost';
import Image from 'next/image';
import InfoTooltip from '../ui/InfoTooltip';
import SimulatorDisclaimer from './SimulatorDisclaimer';

interface Props { showQuotes?: boolean }

// Interface para dados de NCM da API TTCE
interface NcmData {
  code: string;
  description: string;
  ii: string;
  ipi: string;
  pis: string;
  cofins: string;
  icms: string;
}

// Interface para simulação salva
interface SavedSimulation {
  id: string;
  timestamp: Date;
  name: string;
  data: {
    fob: string;
    freight: string;
    insurance: string;
    exchange: string;
    ii: string;
    ipi: string;
    pis: string;
    cofins: string;
    icms: string;
    customs: string;
    misc: string;
    selectedCurrency: string;
  };
  result: any;
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
  defaultIi: string;
  defaultIpi: string;
  defaultPis: string;
  defaultCofins: string;
  defaultIcms: string;
}

export default function ImportCostCalculator({showQuotes=true}:Props) {
  const defaultInputs = {
    fob: '',
    freight: '',
    insurance: '',
    exchange: '5.00',
    ii: '12',
    ipi: '0',
    pis: '2,10',
    cofins: '9,65',
    icms: '18',
    customs: '0',
    misc: '0',
  } as const;
  
  const [result, setResult] = useState<null | ReturnType<typeof calculateImportCost>>(null);
  const [rate, setRate] = useState(5);
  const [extras, setExtras] = useState({customs:0,misc:0});
  const [fileType,setFileType]=useState<'pdf'|'xls'>('pdf');
  const resultRef = useRef<HTMLDivElement|null>(null);
  const [showForm,setShowForm]=useState(false);
  const [submitted,setSubmitted]=useState(false);

  // Estados para o seletor de moedas
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [currencyRates, setCurrencyRates] = useState<Record<string, number>>({});
  const [isManualRate, setIsManualRate] = useState(false);
  const [manualRate, setManualRate] = useState('');
  
  // Estados para o seletor de NCM
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

  // Estados para salvamento automático
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);

  const contactRefs = useRef<{name?:HTMLInputElement|null,phone?:HTMLInputElement|null,email?:HTMLInputElement|null,comments?:HTMLTextAreaElement|null,consent?:HTMLInputElement|null}>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Todas as moedas disponíveis da tabela geral
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

  // Templates de produtos frequentes
  const productTemplates: ProductTemplate[] = [
    {
      id: '1',
      name: 'Eletrônicos',
      category: 'Tecnologia',
      ncm: '8517.13.00',
      defaultFob: '500',
      defaultFreight: '50',
      defaultInsurance: '10',
      defaultIi: '16',
      defaultIpi: '0',
      defaultPis: '2.10',
      defaultCofins: '9.65',
      defaultIcms: '18'
    },
    {
      id: '2',
      name: 'Máquinas Industriais',
      category: 'Indústria',
      ncm: '8474.20.00',
      defaultFob: '10000',
      defaultFreight: '800',
      defaultInsurance: '200',
      defaultIi: '14',
      defaultIpi: '0',
      defaultPis: '2.10',
      defaultCofins: '9.65',
      defaultIcms: '18'
    },
    {
      id: '3',
      name: 'Produtos Químicos',
      category: 'Química',
      ncm: '3824.99.00',
      defaultFob: '2000',
      defaultFreight: '300',
      defaultInsurance: '60',
      defaultIi: '12',
      defaultIpi: '0',
      defaultPis: '2.10',
      defaultCofins: '9.65',
      defaultIcms: '18'
    }
  ];

  // mantém , ou . como separador decimal; remove caracteres inválidos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.,]/g, '');
  };

  // format value to pt-BR style (10.000,00) when input loses focus
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const raw = e.currentTarget.value.replace(/\./g, '').replace(/,/g, '.');
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      e.currentTarget.value = new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    }
  };

  // Função para buscar cotações em tempo real
  const fetchCurrencyRates = async () => {
    try {
      const symbols = availableCurrencies.map(c => c.code).join(',');
      const response = await fetch(`/api/radar/quotes?symbols=${symbols}`);
      const data = await response.json();
      if (data.rates) {
        setCurrencyRates(data.rates);
      }
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
    }
  };

  // Buscar cotações ao carregar o componente
  useEffect(() => {
    fetchCurrencyRates();
  }, []);

  // Função para obter cotação atual da moeda selecionada
  const getCurrentRate = () => {
    if (isManualRate && manualRate) {
      return toNumber(manualRate);
    }
    return currencyRates[selectedCurrency] || 0;
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
    const fields = ['fob', 'freight', 'insurance', 'ii', 'ipi', 'pis', 'cofins', 'icms', 'customs', 'misc'];
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const getVal=(key:string)=> inputRefs.current[key]?.value||'';
    const parsed = {
      fob: toNumber(getVal('fob')),
      freight: toNumber(getVal('freight')),
      insurance: toNumber(getVal('insurance')),
      ii: toNumber(getVal('ii'))||0,
      ipi: toNumber(getVal('ipi'))||0,
      pis: toNumber(getVal('pis'))||0,
      cofins: toNumber(getVal('cofins'))||0,
      icms: toNumber(getVal('icms'))||0,
      customs: toNumber(getVal('customs')),
      misc: toNumber(getVal('misc')),
    };
    const usdRes=calculateImportCost(parsed);
    const r= toNumber(getVal('exchange'))||1;
    setRate(r);
    setExtras({customs:parsed.customs,misc:parsed.misc});
    setResult(usdRes);
    
    // ✅ VALORES MANTIDOS - usuário pode editar e recalcular
    // ✅ Só serão limpos quando clicar em "Limpar Tudo"
  };

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

  // Função toNumber global para uso em todo o componente
  const toNumber = (s:string)=>{
    const value=s.trim();
    if(!value) return 0;
    const lastComma=value.lastIndexOf(',');
    const lastDot=value.lastIndexOf('.');
    let decimalSep='';
    if(lastComma>lastDot){ decimalSep=','; }
    else if(lastDot>lastComma){ decimalSep='.'; }
    if(decimalSep){
      const [intPart,decPart]=value.split(decimalSep);
      const intClean=intPart.replace(/[^0-9]/g,'');
      const decClean=decPart?.replace(/[^0-9]/g,'')||'';
      return parseFloat(intClean+'.'+decClean)||0;
    }
    // nenhum separador decimal
    return parseFloat(value.replace(/[^0-9]/g,''))||0;
  };

  // Função para buscar NCM na API TTCE (simulada)
  const searchNcm = async (query: string) => {
    if (query.length < 3) return;
    
    setIsLoadingNcm(true);
    try {
      // Simulação de API TTCE - em produção seria fetch real
      const mockResults: NcmData[] = [
        { code: '8517.13.00', description: 'Smartphones', ii: '16', ipi: '0', pis: '2.10', cofins: '9.65', icms: '18' },
        { code: '8474.20.00', description: 'Máquinas industriais', ii: '14', ipi: '0', pis: '2.10', cofins: '9.65', icms: '18' },
        { code: '3824.99.00', description: 'Produtos químicos', ii: '12', ipi: '0', pis: '2.10', cofins: '9.65', icms: '18' },
        { code: '8703.23.00', description: 'Automóveis', ii: '35', ipi: '0', pis: '2.10', cofins: '9.65', icms: '18' },
        { code: '9503.00.00', description: 'Brinquedos', ii: '20', ipi: '0', pis: '2.10', cofins: '9.65', icms: '18' },
      ].filter(ncm => 
        ncm.code.includes(query) || 
        ncm.description.toLowerCase().includes(query.toLowerCase())
      );
      
      setNcmResults(mockResults);
    } catch (error) {
      console.error('Erro ao buscar NCM:', error);
      setNcmResults([]);
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
    const fields = ['ii', 'ipi', 'pis', 'cofins', 'icms'];
    fields.forEach(field => {
      const input = inputRefs.current[field];
      if (input) {
        input.value = (ncm as any)[field];
      }
    });
  };

  // Aplicar template de produto
  const applyTemplate = (template: ProductTemplate) => {
    setSelectedTemplate(template);
    setNcmSearch(template.ncm);
    
    // Preencher campos com valores do template
    const fields = ['fob', 'freight', 'insurance', 'ii', 'ipi', 'pis', 'cofins', 'icms'];
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
        fob: getVal('fob'),
        freight: getVal('freight'),
        insurance: getVal('insurance'),
        exchange: getVal('exchange'),
        ii: getVal('ii'),
        ipi: getVal('ipi'),
        pis: getVal('pis'),
        cofins: getVal('cofins'),
        icms: getVal('icms'),
        customs: getVal('customs'),
        misc: getVal('misc'),
        selectedCurrency,
      },
      result
    };
    
    const updated = [simulation, ...savedSimulations.slice(0, 9)]; // Manter apenas 10
    setSavedSimulations(updated);
    localStorage.setItem('importSimulations', JSON.stringify(updated));
  };

  // Carregar simulações salvas
  useEffect(() => {
    const saved = localStorage.getItem('importSimulations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedSimulations(parsed.map((sim: any) => ({
          ...sim,
          timestamp: new Date(sim.timestamp)
        })));
      } catch (error) {
        console.error('Erro ao carregar simulações:', error);
      }
    }
  }, []);

  // Auto-save
  useEffect(() => {
    if (autoSaveEnabled && result) {
      const timer = setTimeout(() => {
        saveSimulation(`Auto-save ${new Date().toLocaleTimeString()}`);
        setLastAutoSave(new Date());
      }, 60000); // A cada 1 minuto
      return () => clearTimeout(timer);
    }
  }, [autoSaveEnabled, result]);

  // Atualizar taxas de câmbio
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('/api/radar/quotes?symbols=USD,EUR,GBP,CNY');
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
        console.error('Erro ao buscar taxas:', error);
      }
    };
    
    fetchRates();
    const interval = setInterval(fetchRates, 300000); // A cada 5 minutos
    return () => clearInterval(interval);
  }, [selectedCurrency, isManualRate]);

  // Função para obter valor do input
  const getVal = (key: string) => inputRefs.current[key]?.value || '';

  interface FieldProps { name: string; label: string; suffix?: string; tip?: string; }
  const Field = ({ name, label, suffix, tip }: FieldProps) => (
    <label className="block text-sm font-medium text-gray-200 dark:text-accent-light">
      <span className="inline-flex items-center gap-1">{label} {tip && <InfoTooltip content={tip} />}</span>
      <div className="relative mt-1">
        <input
          type="text"
          inputMode="decimal"
          name={name}
          defaultValue={(defaultInputs as any)[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          ref={(el) => { inputRefs.current[name] = el; }}
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



  // Efeito para buscar NCM ao digitar
  useEffect(() => {
    const handler = setTimeout(() => {
      if (ncmSearch.length >= 3) {
        searchNcm(ncmSearch);
      } else {
        setNcmResults([]);
      }
    }, 500); // Debounce de 500ms
    return () => clearTimeout(handler);
  }, [ncmSearch]);

  // Fechar dropdown de NCM quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.ncm-dropdown-container')) {
        setShowNcmDropdown(false);
      }
    };

    if (showNcmDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showNcmDropdown]);

  // Auto-save
  useEffect(() => {
    if (autoSaveEnabled && result) {
      const timer = setTimeout(() => {
        saveSimulation(`Auto-save ${new Date().toLocaleTimeString()}`);
        setLastAutoSave(new Date());
      }, 60000); // A cada 1 minuto
      return () => clearTimeout(timer);
    }
  }, [autoSaveEnabled, result]);

  // Carregar simulações salvas
  useEffect(() => {
    const saved = localStorage.getItem('importSimulations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSavedSimulations(parsed.map((sim: any) => ({
          ...sim,
          timestamp: new Date(sim.timestamp)
        })));
      } catch (error) {
        console.error('Erro ao carregar simulações:', error);
      }
    }

    // desabilita foco dos links do ticker/header para evitar perda de foco nos inputs
    document.querySelectorAll('header a, nav a').forEach((el) => {
      (el as HTMLElement).setAttribute('tabindex', '-1');
    });

    // set initial focus on FOB after DOM ready
    inputRefs.current['fob']?.focus();
  }, []);

  const exportReport=async()=>{
    if(!submitted){
      setShowForm(true);
      return;
    }
    if(!result) return;
    if(fileType==='pdf'){
      const html2canvas = (await import('html2canvas')).default;
      const { default: jsPDF } = await import('jspdf');
      if(!resultRef.current) return;
      const canvas = await html2canvas(resultRef.current,{scale:2});
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({orientation:'p',unit:'px',format:'a4'});
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgProps = {w: canvas.width, h: canvas.height};
      const ratio = pageWidth/imgProps.w;
      const imgHeight = imgProps.h*ratio;
      pdf.addImage(imgData,'PNG',0,0,pageWidth,imgHeight);
      pdf.save('simulador-importacao.pdf');
    }else{
      // generate XLS using sheetjs
      const XLSXMod = await import('xlsx');
      const XLSX = (XLSXMod as any).default ?? XLSXMod;
      const rows=[
        ['Item','USD','BRL','% Import','% Merc.'],
        ['CIF',result.cif,result.cif*rate,((result.cif/result.finalCost)*100).toFixed(1)+'%',((result.cif/result.cif)*100).toFixed(1)+'%'],
        ['II',result.iiValue,result.iiValue*rate,((result.iiValue/result.finalCost)*100).toFixed(1)+'%',((result.iiValue/result.cif)*100).toFixed(1)+'%'],
        ['IPI',result.ipiValue,result.ipiValue*rate,((result.ipiValue/result.finalCost)*100).toFixed(1)+'%',((result.ipiValue/result.cif)*100).toFixed(1)+'%'],
        ['PIS',result.pisValue,result.pisValue*rate,((result.pisValue/result.finalCost)*100).toFixed(1)+'%',((result.pisValue/result.cif)*100).toFixed(1)+'%'],
        ['COFINS',result.cofinsValue,result.cofinsValue*rate,((result.cofinsValue/result.finalCost)*100).toFixed(1)+'%',((result.cofinsValue/result.cif)*100).toFixed(1)+'%'],
        ['ICMS',result.icmsValue,result.icmsValue*rate,((result.icmsValue/result.finalCost)*100).toFixed(1)+'%',((result.icmsValue/result.cif)*100).toFixed(1)+'%'],
        ['Despesas Aduaneiras',extras.customs,extras.customs*rate,((extras.customs/result.finalCost)*100).toFixed(1)+'%',((extras.customs/result.cif)*100).toFixed(1)+'%'],
        ['Outras Despesas',extras.misc,extras.misc*rate,((extras.misc/result.finalCost)*100).toFixed(1)+'%',((extras.misc/result.cif)*100).toFixed(1)+'%'],
        ['Total Tributos',result.totalTaxes,result.totalTaxes*rate,((result.totalTaxes/result.finalCost)*100).toFixed(1)+'%',((result.totalTaxes/result.cif)*100).toFixed(1)+'%'],
        ['Custo Importação',result.landedCost,result.landedCost*rate,((result.landedCost/result.finalCost)*100).toFixed(1)+'%',((result.landedCost/result.cif)*100).toFixed(1)+'%'],
        ['Custo Final',result.finalCost,result.finalCost*rate,'100%',''+((result.finalCost/result.cif)*100).toFixed(1)+'%'],
      ];
      const ws=XLSX.utils.aoa_to_sheet(rows);
      const wb=XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,ws,'Relatorio');
      XLSX.writeFile(wb,'simulador-importacao.xlsx');
    }
  };

  const handleFormSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
    const name=contactRefs.current.name?.value.trim()||'';
    const phone=contactRefs.current.phone?.value.trim()||'';
    const email=contactRefs.current.email?.value.trim()||'';
    const comments=contactRefs.current.comments?.value.trim()||'';
    const consentChecked = contactRefs.current.consent?.checked;
    const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    const phoneRegex=/^[0-9]{8,15}$/;
    if(!name||!phone||!email||!comments||!consentChecked){ alert('Preencha todos os campos obrigatórios'); return; }
    if(!emailRegex.test(email)){ alert('E-mail inválido'); return; }
    if(!phoneRegex.test(phone.replace(/[^0-9]/g,''))){ alert('Telefone inválido'); return; }
    try {
      await fetch('/api/report-download',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,phone,email,comments,format:fileType})});
    }catch{}
    setSubmitted(true);
    setShowForm(false);
    exportReport();
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
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoSaveEnabled}
              onChange={(e) => setAutoSaveEnabled(e.target.checked)}
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
                defaultValue={getCurrentRate().toFixed(4)}
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

        {/* Seletor de NCM */}
        <div className="relative ncm-dropdown-container">
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
                        II: {ncm.ii}% | IPI: {ncm.ipi}% | ICMS: {ncm.icms}%
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

        <Field name="fob" label={`Valor FOB (${selectedCurrency})`} suffix={selectedCurrency} tip="Valor da mercadoria no porto de origem, sem frete ou seguro." />
        <Field name="freight" label="Frete Internacional" suffix={selectedCurrency} tip="Custo de transporte internacional." />
        <Field name="insurance" label="Seguro" suffix={selectedCurrency} tip="Prêmio de seguro internacional." />
        <Field name="ii" label="II" suffix="%" tip="Imposto de Importação (%)." />
        <Field name="ipi" label="IPI" suffix="%" tip="Imposto sobre Produtos Industrializados (%)." />
        <Field name="pis" label="PIS" suffix="%" tip="Programa de Integração Social (%). Ex.: 2,10." />
        <Field name="cofins" label="COFINS" suffix="%" tip="Contribuição para Financiamento da Seguridade Social (%). Ex.: 9,65." />
        <Field name="icms" label="ICMS" suffix="%" tip="Imposto sobre Circulação de Mercadorias e Serviços. Varía por estado." />
        <Field name="customs" label="Despesas Aduaneiras" suffix={selectedCurrency} tip="Despesas no desembaraço aduaneiro como armazenagem e taxas." />
        <Field name="misc" label="Outras Despesas" suffix={selectedCurrency} tip="Qualquer outro custo não previsto no cálculo." />
        
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
              Relatório de Custo de Importação
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Análise detalhada de custos e tributos para importação
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
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">1. Valor Base (CIF)</h4>
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
                <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-3">
                  <span className="font-semibold text-gray-900 dark:text-white">Valor CIF Total:</span>
                  <span className="font-bold text-lg text-gray-900 dark:text-white">
                    {formatCurrency(result.cif)} / {brl(result.cif * rate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 2: Custos Logísticos */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">2. Custos Logísticos</h4>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-lg p-4 bg-white dark:bg-gray-800">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Despesas Aduaneiras:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(extras.customs)} / {brl(extras.customs * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Outras Despesas:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(extras.misc)} / {brl(extras.misc * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-3">
                  <span className="font-semibold text-gray-900 dark:text-white">Total Custos Logísticos:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formatCurrency(extras.customs + extras.misc)} / {brl((extras.customs + extras.misc) * rate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 3: Tributos Federais */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">3. Tributos Federais</h4>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-lg p-4 bg-white dark:bg-gray-800">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Imposto de Importação ({getVal('ii')}%):</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(result.iiValue)} / {brl(result.iiValue * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">IPI ({getVal('ipi')}%):</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(result.ipiValue)} / {brl(result.ipiValue * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">PIS ({getVal('pis')}%):</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(result.pisValue)} / {brl(result.pisValue * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">COFINS ({getVal('cofins')}%):</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(result.cofinsValue)} / {brl(result.cofinsValue * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-3">
                  <span className="font-semibold text-gray-900 dark:text-white">Total Tributos Federais:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formatCurrency(result.iiValue + result.ipiValue + result.pisValue + result.cofinsValue)} / {brl((result.iiValue + result.ipiValue + result.pisValue + result.cofinsValue) * rate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 4: Tributos Estaduais */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">4. Tributos Estaduais</h4>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-lg p-4 bg-white dark:bg-gray-800">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">ICMS ({getVal('icms')}%):</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formatCurrency(result.icmsValue)} / {brl(result.icmsValue * rate)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-3">
                  <span className="font-semibold text-gray-900 dark:text-white">Total Tributos Estaduais:</span>
                  <span className="font-bold text-gray-900 dark:text-white">
                    {formatCurrency(result.icmsValue)} / {brl(result.icmsValue * rate)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Seção 5: Resultado Final */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">5. Resultado Final</h4>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-lg p-4 bg-white dark:bg-gray-800">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Valor CIF:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formatCurrency(result.cif)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">+ Custos Logísticos:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">+{formatCurrency(extras.customs + extras.misc)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">+ Tributos Federais:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">+{formatCurrency(result.iiValue + result.ipiValue + result.pisValue + result.cofinsValue)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">+ Tributos Estaduais:</span>
                  <span className="font-medium text-red-600 dark:text-red-400">+{formatCurrency(result.icmsValue)}</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-gray-50 dark:bg-gray-700 rounded-lg px-3">
                  <span className="font-bold text-gray-900 dark:text-white text-lg">Custo Final:</span>
                  <span className="font-bold text-xl text-red-600 dark:text-red-400">
                    {formatCurrency(result.finalCost)} / {brl(result.finalCost * rate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Seção 6: Análise de Viabilidade */}
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-t-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-semibold text-gray-900 dark:text-white text-lg">6. Análise de Viabilidade</h4>
            </div>
            <div className="border border-gray-200 dark:border-gray-600 border-t-0 rounded-b-lg p-4 bg-white dark:bg-gray-800">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Carga Tributária Total:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{((result.totalTaxes / result.finalCost) * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Impacto dos Tributos:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{((result.totalTaxes / result.cif) * 100).toFixed(1)}% sobre CIF</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-700 dark:text-gray-300">Custo Adicional:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{((result.finalCost - result.cif) / result.cif * 100).toFixed(1)}% sobre CIF</span>
                </div>
                
                {/* Status de Viabilidade */}
                <div className="flex justify-between items-center py-3 bg-gray-50 dark:bg-gray-700 rounded-lg px-3">
                  <span className="font-semibold text-gray-900 dark:text-white">Status da Importação:</span>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full font-semibold text-sm ${
                    ((result.totalTaxes / result.finalCost) * 100) < 50 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-800' 
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border border-orange-200 dark:border-orange-800'
                  }`}>
                    {((result.totalTaxes / result.finalCost) * 100) < 50 ? (
                      <>
                        <span className="text-green-600">✅</span>
                        <span>Viável</span>
                      </>
                    ) : (
                      <>
                        <span className="text-orange-600">⚠️</span>
                        <span>Alta Carga Tributária</span>
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
              <p>• <strong>Minimizar tributos</strong> com classificação NCM correta</p>
              <p>• <strong>Otimizar logística</strong> com roteirização inteligente</p>
              <p>• <strong>Consultoria especializada</strong> em comércio exterior</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            ⚠️ Valores aproximados. Para cálculos precisos e otimização, consulte nossos especialistas.
          </p>

          {/* Botões de Ação */}
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
          <Image src="/images/BANNER-HOME.jpeg" alt="Banner OLV" width={1200} height={300} className="mt-8 rounded-lg w-full" priority={false} />
        </div>
      )}
    </div>
    {/* Modais */}
    {showTemplates && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 border-2 border-accent">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Templates de Produtos</h3>
          {productTemplates.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {productTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template)}
                  className="w-full text-left p-3 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white">{template.name} ({template.category})</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">NCM: {template.ncm}</div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Nenhum template disponível.</p>
          )}
          <div className="flex justify-end">
            <button type="button" className="btn" onClick={() => setShowTemplates(false)}>Fechar</button>
          </div>
        </div>
      </div>
    )}

    {showHistory && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 border-2 border-accent">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Histórico de Simulações</h3>
          {savedSimulations.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {savedSimulations.map(sim => (
                <div key={sim.id} className="p-3 rounded-md bg-gray-100 dark:bg-gray-700 flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{sim.name}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      {new Date(sim.timestamp).toLocaleString()} - {formatCurrency(sim.result.finalCost)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white" onClick={() => {
                      // Carregar simulação
                      if (inputRefs.current.fob) inputRefs.current.fob.value = sim.data.fob;
                      if (inputRefs.current.freight) inputRefs.current.freight.value = sim.data.freight;
                      if (inputRefs.current.insurance) inputRefs.current.insurance.value = sim.data.insurance;
                      if (inputRefs.current.exchange) inputRefs.current.exchange.value = sim.data.exchange;
                      if (inputRefs.current.ii) inputRefs.current.ii.value = sim.data.ii;
                      if (inputRefs.current.ipi) inputRefs.current.ipi.value = sim.data.ipi;
                      if (inputRefs.current.pis) inputRefs.current.pis.value = sim.data.pis;
                      if (inputRefs.current.cofins) inputRefs.current.cofins.value = sim.data.cofins;
                      if (inputRefs.current.icms) inputRefs.current.icms.value = sim.data.icms;
                      if (inputRefs.current.customs) inputRefs.current.customs.value = sim.data.customs;
                      if (inputRefs.current.misc) inputRefs.current.misc.value = sim.data.misc;
                      setSelectedCurrency(sim.data.selectedCurrency);
                      setResult(sim.result);
                      setShowHistory(false);
                      alert('Simulação carregada!');
                    }}>Carregar</button>
                    <button type="button" className="btn btn-sm bg-red-500 hover:bg-red-600 text-white" onClick={() => {
                      const updated = savedSimulations.filter(s => s.id !== sim.id);
                      setSavedSimulations(updated);
                      localStorage.setItem('importSimulations', JSON.stringify(updated));
                      alert('Simulação deletada!');
                    }}>Deletar</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Nenhuma simulação salva ainda.</p>
          )}
          <div className="flex justify-end">
            <button type="button" className="btn" onClick={() => setShowHistory(false)}>Fechar</button>
          </div>
        </div>
      </div>
    )}

    {showForm && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <form onSubmit={handleFormSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md space-y-4 border-2 border-accent">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Preencha para baixar o relatório</h3>
          <input ref={el=>{contactRefs.current.name=el;}} required placeholder="Nome completo*" className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white" />
          <input ref={el=>{contactRefs.current.phone=el;}} required placeholder="Telefone / WhatsApp*" pattern="[0-9\s\-()+]{8,15}" className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white" />
          <input type="email" ref={el=>{contactRefs.current.email=el;}} required placeholder="Melhor e-mail*" className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white" />
          <textarea ref={el=>{contactRefs.current.comments=el;}} required rows={3} placeholder="Empresa ou projeto*" className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-700 border-none text-gray-900 dark:text-white"></textarea>
          <label className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" ref={el=>{contactRefs.current.consent=el;}} required className="mt-1" />
            <span>Autorizo a OLV Internacional a entrar em contato com base nos dados fornecidos, conforme a LGPD.</span>
          </label>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={()=>setShowForm(false)} className="btn">Cancelar</button>
            <button type="submit" className="btn btn-primary">Enviar e Baixar</button>
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