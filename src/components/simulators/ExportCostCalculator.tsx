"use client";

import React, { useState, useRef, useEffect } from 'react';
import InfoTooltip from '../ui/InfoTooltip';
import Image from 'next/image';
import RealtimeQuotes from '../radar/RealtimeQuotes';

function toNumber(s: string): number {
  if (!s) return 0;
  return parseFloat(s.replace(/\./g, '').replace(',', '.')) || 0;
}

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

  // Estados para histórico de simulações
  const [savedSimulations, setSavedSimulations] = useState<SavedSimulation[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Estados para comparação de cenários
  const [showScenarios, setShowScenarios] = useState(false);

  // Estados para templates
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<ProductTemplate | null>(null);

  // Estados para markup
  const [showMarkupCalculator, setShowMarkupCalculator] = useState(false);
  const [markupPercentage, setMarkupPercentage] = useState('20');

  // Estados para salvamento automático
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);

  const defaultInputs = {
    fob: '10000',
    freight: '800',
    insurance: '80',
    inland: '500',
    port: '250',
    misc: '100',
    reintegra: '1,5',
    drawback: '0,0',
    exchange: '5,10',
  };

  // Templates de produtos frequentes
  const productTemplates: ProductTemplate[] = [
    {
      id: '1',
      name: 'Notebooks e Laptops',
      category: 'Eletrônicos',
      ncm: '8471.30.12',
      defaultFob: '800',
      defaultFreight: '50',
      defaultInsurance: '8',
      defaultInland: '30',
      defaultPort: '15',
      defaultMisc: '10'
    },
    {
      id: '2',
      name: 'Smartphones',
      category: 'Eletrônicos',
      ncm: '8517.13.00',
      defaultFob: '300',
      defaultFreight: '20',
      defaultInsurance: '3',
      defaultInland: '15',
      defaultPort: '10',
      defaultMisc: '5'
    },
    {
      id: '3',
      name: 'Automóveis',
      category: 'Veículos',
      ncm: '8703.23.00',
      defaultFob: '25000',
      defaultFreight: '2000',
      defaultInsurance: '200',
      defaultInland: '500',
      defaultPort: '300',
      defaultMisc: '100'
    },
    {
      id: '4',
      name: 'Calçados Esportivos',
      category: 'Vestuário',
      ncm: '6403.59.00',
      defaultFob: '25',
      defaultFreight: '3',
      defaultInsurance: '0.5',
      defaultInland: '2',
      defaultPort: '1',
      defaultMisc: '0.5'
    }
  ];

  const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const usd = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

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
      }, 30000); // Auto-save a cada 30 segundos
      
      return () => clearTimeout(timer);
    }
  }, [result, autoSaveEnabled]);

  // Buscar NCM quando digitar
  useEffect(() => {
    const timer = setTimeout(() => {
      if (ncmSearch.length >= 3) {
        searchNcm(ncmSearch);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [ncmSearch]);

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

  const getVal = (key: string) => inputRefs.current[key]?.value || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fob = toNumber(getVal('fob'));
    const freight = toNumber(getVal('freight'));
    const insurance = toNumber(getVal('insurance'));
    const inland = toNumber(getVal('inland'));
    const port = toNumber(getVal('port'));
    const misc = toNumber(getVal('misc'));
    const reintegraPct = toNumber(getVal('reintegra'));
    const drawbackPct = toNumber(getVal('drawback'));
    const exchange = toNumber(getVal('exchange')) || 1;
    setRate(exchange);

    const totalCosts = freight + insurance + inland + port + misc;
    const reintegraValue = fob * (reintegraPct / 100);
    const drawbackValue = fob * (drawbackPct / 100);
    const revenueUSD = fob - totalCosts + reintegraValue + drawbackValue;
    const revenueBRL = revenueUSD * exchange;
    const markup = ((revenueUSD - fob) / fob) * 100;

    // Cenários otimista e pessimista
    const scenarioOptimistic = {
      revenueUSD: revenueUSD * 1.1, // +10%
      revenueBRL: revenueBRL * 1.1
    };
    const scenarioPessimistic = {
      revenueUSD: revenueUSD * 0.9, // -10%
      revenueBRL: revenueBRL * 0.9
    };

    setResult({ 
      totalCosts, 
      revenueUSD, 
      revenueBRL, 
      reintegraValue, 
      drawbackValue, 
      markup,
      scenarioOptimistic,
      scenarioPessimistic
    });
  };

  // Auto-fill exchange rate (USD→BRL) once on mount
  useEffect(() => {
    fetch('/api/radar/quotes?symbols=USD')
      .then((r) => r.json())
      .then((j) => {
        const brl = j?.rates?.USD;
        if (brl && typeof brl === 'number') {
          const exch = inputRefs.current['exchange'];
          if (exch) exch.value = brl.toFixed(2);
          setRate(brl);
        }
      })
      .catch(() => {});
  }, []);

  // Fechar dropdowns quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowNcmDropdown(false);
        setShowTemplates(false);
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const exportReport = async () => {
    if (!submitted) {
      setShowForm(true);
      return;
    }
    if (!result) return;

    if (fileType === 'pdf') {
      const html2canvas = (await import('html2canvas')).default;
      const { default: jsPDF } = await import('jspdf');
      if (!resultRef.current) return;
      const canvas = await html2canvas(resultRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'p', unit: 'px', format: 'a4' });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const ratio = pageWidth / canvas.width;
      const imgHeight = canvas.height * ratio;
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, imgHeight);
      pdf.save('simulador-exportacao.pdf');
    } else {
      const XLSXMod = await import('xlsx');
      const XLSX = (XLSXMod as any).default ?? XLSXMod;
      const rows = [
        ['Item', 'USD', 'BRL'],
        ['NCM Selecionado', selectedNcm?.code || 'Não informado', ''],
        ['Crédito Reintegra', result.reintegraValue, result.reintegraValue * rate],
        ['Crédito Drawback', result.drawbackValue, result.drawbackValue * rate],
        ['Custos Totais', result.totalCosts, result.totalCosts * rate],
        ['Receita Líquida', result.revenueUSD, result.revenueBRL],
        ['Markup (%)', result.markup.toFixed(2), ''],
      ];
      const ws = XLSX.utils.aoa_to_sheet(rows);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Relatorio');
      XLSX.writeFile(wb, 'simulador-exportacao.xlsx');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = (contactRefs.current.name as HTMLInputElement)?.value.trim() || '';
    const phone = (contactRefs.current.phone as HTMLInputElement)?.value.trim() || '';
    const email = (contactRefs.current.email as HTMLInputElement)?.value.trim() || '';
    const comments = (contactRefs.current.comments as HTMLTextAreaElement)?.value.trim() || '';
    const consentChecked = (contactRefs.current.consent as HTMLInputElement)?.checked;
    if (!name || !phone || !email || !comments || !consentChecked) { alert('Preencha todos os campos obrigatórios'); return; }
    try {
      await fetch('/api/report-download', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, phone, email, comments, format: fileType, type: 'export' }) });
    } catch { }
    setSubmitted(true);
    setShowForm(false);
    exportReport();
  };

  return (
    <>
    <div className={`grid gap-8 ${showQuotes ? 'lg:grid-cols-[10cm_minmax(0,1fr)_15cm]' : 'lg:grid-cols-[10cm_15cm]'}`}>
      {showQuotes && (
        <div className="order-3 lg:order-1">
          <RealtimeQuotes symbols={[ 'USD', 'EUR', 'GBP', 'CNY' ]} />
        </div>
      )}

      {/* Coluna 2 – Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4 order-1 lg:order-1">
        {/* Barra de ferramentas */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            onClick={() => setShowTemplates(true)}
            className="btn btn-sm bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <img src="/icons/templates-glass.svg" alt="Templates" className="w-4 h-4" />
            Templates
          </button>
          <button
            type="button"
            onClick={() => setShowHistory(true)}
            className="btn btn-sm bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <img src="/icons/history-glass.svg" alt="Histórico" className="w-4 h-4" />
            Histórico
          </button>
          <button
            type="button"
            onClick={() => setShowMarkupCalculator(true)}
            className="btn btn-sm bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <img src="/icons/markup-glass.svg" alt="Markup" className="w-4 h-4" />
            Markup
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

        <Field name="fob" label="Valor FOB" suffix="USD" tip="Valor da mercadoria para exportação." />
        <Field name="freight" label="Frete Internacional" suffix="USD" tip="Custo de frete até o destino." />
        <Field name="insurance" label="Seguro" suffix="USD" tip="Seguro internacional da carga." />
        <Field name="inland" label="Frete Interno" suffix="USD" tip="Transporte até porto/aeroporto." />
        <Field name="port" label="Taxas Portuárias" suffix="USD" tip="THC, documentação, etc." />
        <Field name="misc" label="Outras Despesas" suffix="USD" tip="Despesas adicionais." />
        <Field name="reintegra" label="Reintegra" suffix="%" tip="Alíquota de crédito (0-3%)." />
        <Field name="drawback" label="Drawback" suffix="%" tip="Alíquota de drawback (0-100%)." />
        <Field name="exchange" label="Taxa USD → BRL" suffix="R$" tip="Cotação do dólar para conversão." />
        
        <button type="submit" className="btn btn-primary mt-2 w-full">Calcular</button>
      </form>

      {/* Coluna 3 – Resultado */}
      {result && (
        <div
          ref={resultRef}
          className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm md:text-base order-2 lg:order-${showQuotes ? '3' : '2'}`}
        >
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Resultado</h3>
          
          {selectedNcm && (
            <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-800 dark:text-blue-200">
              <strong>NCM:</strong> {selectedNcm.code} - {selectedNcm.description}
            </div>
          )}

          <table className="w-full text-left text-gray-700 dark:text-gray-300 text-sm mb-4">
            <tbody>
              <tr><td className="pr-4">Crédito Reintegra</td><td>{usd(result.reintegraValue)}</td><td>{brl(result.reintegraValue * rate)}</td></tr>
              <tr><td className="pr-4">Crédito Drawback</td><td>{usd(result.drawbackValue)}</td><td>{brl(result.drawbackValue * rate)}</td></tr>
              <tr><td className="pr-4">Custos Totais</td><td>{usd(result.totalCosts)}</td><td>{brl(result.totalCosts * rate)}</td></tr>
              <tr className="font-bold border-t"><td className="pr-4">Receita Líquida</td><td>{usd(result.revenueUSD)}</td><td>{brl(result.revenueBRL)}</td></tr>
              <tr><td className="pr-4">Markup</td><td colSpan={2}>{result.markup.toFixed(2)}%</td></tr>
            </tbody>
          </table>

          {/* Comparação de cenários */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowScenarios(!showScenarios)}
              className="text-sm text-accent hover:underline"
            >
              {showScenarios ? 'Ocultar' : 'Ver'} cenários otimista/pessimista
            </button>
            {showScenarios && (
              <div className="mt-2 space-y-2 text-xs">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                  <strong>Cenário Otimista (+10%):</strong> {usd(result.scenarioOptimistic.revenueUSD)} / {brl(result.scenarioOptimistic.revenueBRL)}
                </div>
                <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                  <strong>Cenário Pessimista (-10%):</strong> {usd(result.scenarioPessimistic.revenueUSD)} / {brl(result.scenarioPessimistic.revenueBRL)}
                </div>
              </div>
            )}
          </div>

          <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-4">
            Valores aproximados. Consulte seu despachante para detalhes fiscais.
          </p>

          {/* Botões de ação */}
          <div className="space-y-2">
            <div className="flex gap-2">
              <select 
                value={fileType} 
                onChange={(e) => setFileType(e.target.value as 'pdf' | 'xls')} 
                className="border border-accent rounded-md bg-gray-100 dark:bg-gray-700 p-2 text-sm text-gray-900 dark:text-white focus:ring-accent focus:border-accent"
              >
                <option value="pdf">PDF</option>
                <option value="xls">XLS</option>
              </select>
              <button type="button" className="btn bg-accent text-[#0a0f1d] hover:bg-[#b9952e]" onClick={exportReport}>
                Baixar
              </button>
            </div>
            
            <button
              type="button"
              onClick={() => {
                const name = prompt('Nome para salvar esta simulação:');
                if (name) saveSimulation(name);
              }}
              className="btn bg-green-600 hover:bg-green-700 text-white w-full"
            >
              💾 Salvar Simulação
            </button>
            
            <a href="/contato" className="btn btn-gold animate-gold-pulse w-full text-center">
              Falar com Especialista
            </a>
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
                    NCM: {sim.data.ncm} | Receita: {usd(sim.result.revenueUSD)}
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
    {showMarkupCalculator && (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Calculadora de Markup</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Markup Desejado (%)
              </label>
              <input
                type="number"
                value={markupPercentage}
                onChange={(e) => setMarkupPercentage(e.target.value)}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="20"
              />
            </div>
            {result && (
              <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-sm">
                  <div><strong>Preço de Venda Sugerido:</strong></div>
                  <div className="text-lg font-bold text-accent">
                    {usd(result.revenueUSD * (1 + parseFloat(markupPercentage) / 100))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setShowMarkupCalculator(false)}
            className="btn mt-4 w-full"
          >
            Fechar
          </button>
        </div>
      </div>
    )}

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
    </>
  );
} 