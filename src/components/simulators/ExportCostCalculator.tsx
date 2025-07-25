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

// Dados de NCMs comuns para exportação
const COMMON_NCMS = [
  { code: '8471.30.12', description: 'Notebooks e laptops', reintegra: '1.5' },
  { code: '8517.13.00', description: 'Smartphones', reintegra: '1.5' },
  { code: '8703.23.00', description: 'Automóveis de passageiros', reintegra: '1.0' },
  { code: '8708.99.00', description: 'Peças de veículos', reintegra: '2.0' },
  { code: '8544.49.00', description: 'Cabos elétricos', reintegra: '2.0' },
  { code: '8517.62.00', description: 'Roteadores de rede', reintegra: '1.5' },
  { code: '8528.72.00', description: 'Monitores de TV', reintegra: '1.5' },
  { code: '9503.00.00', description: 'Brinquedos', reintegra: '2.0' },
  { code: '6403.59.00', description: 'Calçados esportivos', reintegra: '2.0' },
  { code: '4202.12.00', description: 'Malas e bolsas', reintegra: '2.0' },
];

export default function ExportCostCalculator({showQuotes=true}:Props) {
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [result, setResult] = useState<null | {
    totalCosts: number;
    revenueUSD: number;
    revenueBRL: number;
    reintegraValue: number;
  }>(null);
  const [rate, setRate] = useState(1);
  const [fileType, setFileType] = useState<'pdf' | 'xls'>('pdf');
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const contactRefs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | HTMLInputElement | null>>({});
  
  // Estados para o seletor de NCM
  const [selectedNcm, setSelectedNcm] = useState('');
  const [ncmSearch, setNcmSearch] = useState('');
  const [showNcmDropdown, setShowNcmDropdown] = useState(false);

  const defaultInputs = {
    fob: '10000',
    freight: '800',
    insurance: '80',
    inland: '500',
    port: '250',
    misc: '100',
    reintegra: '1,5',
    exchange: '5,10',
  };

  const brl = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const usd = (v: number) => v.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  // Filtrar NCMs baseado na busca
  const filteredNcms = COMMON_NCMS.filter(ncm => 
    ncm.code.includes(ncmSearch) || 
    ncm.description.toLowerCase().includes(ncmSearch.toLowerCase())
  );

  // Selecionar NCM e aplicar alíquota de Reintegra
  const handleNcmSelect = (ncm: typeof COMMON_NCMS[0]) => {
    setSelectedNcm(ncm.code);
    setNcmSearch(ncm.code);
    setShowNcmDropdown(false);
    
    // Aplicar alíquota de Reintegra automaticamente
    const reintegraInput = inputRefs.current['reintegra'];
    if (reintegraInput) {
      reintegraInput.value = ncm.reintegra;
    }
  };

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
    const exchange = toNumber(getVal('exchange')) || 1;
    setRate(exchange);

    const totalCosts = freight + insurance + inland + port + misc;
    const reintegraValue = fob * (reintegraPct / 100);
    const revenueUSD = fob - totalCosts + reintegraValue;
    const revenueBRL = revenueUSD * exchange;

    setResult({ totalCosts, revenueUSD, revenueBRL, reintegraValue });
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
        ['NCM Selecionado', selectedNcm || 'Não informado', ''],
        ['Crédito Reintegra', result.reintegraValue, result.reintegraValue * rate],
        ['Custos Totais', result.totalCosts, result.totalCosts * rate],
        ['Receita Líquida', result.revenueUSD, result.revenueBRL],
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
        {/* Seletor de NCM */}
        <div className="relative ncm-dropdown-container">
          <label className="block text-sm font-medium text-gray-200 dark:text-accent-light mb-1">
            <span className="inline-flex items-center gap-1">
              NCM do Produto 
              <InfoTooltip content="Selecione o NCM para aplicar alíquota correta de Reintegra automaticamente" />
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
            {showNcmDropdown && (
              <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {filteredNcms.length > 0 ? (
                  filteredNcms.map((ncm) => (
                    <button
                      key={ncm.code}
                      type="button"
                      onClick={() => handleNcmSelect(ncm)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm border-b border-gray-200 dark:border-gray-600 last:border-b-0"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{ncm.code}</div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">{ncm.description}</div>
                      <div className="text-accent text-xs">Reintegra: {ncm.reintegra}%</div>
                    </button>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500 dark:text-gray-400 text-sm">
                    Nenhum NCM encontrado
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
        <Field name="exchange" label="Taxa USD → BRL" suffix="R$" tip="Cotação do dólar para conversão." />
        <button type="submit" className="btn btn-primary mt-2">Calcular</button>
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
              <strong>NCM:</strong> {selectedNcm}
            </div>
          )}
          <table className="w-full text-left text-gray-700 dark:text-gray-300 text-sm">
            <tbody>
              <tr><td className="pr-4">Crédito Reintegra</td><td>{usd(result.reintegraValue)}</td><td>{brl(result.reintegraValue * rate)}</td></tr>
              <tr><td className="pr-4">Custos Totais</td><td>{usd(result.totalCosts)}</td><td>{brl(result.totalCosts * rate)}</td></tr>
              <tr className="font-bold"><td className="pr-4">Receita Líquida</td><td>{usd(result.revenueUSD)}</td><td>{brl(result.revenueBRL)}</td></tr>
            </tbody>
          </table>
          <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">Valores aproximados. Consulte seu despachante para detalhes fiscais.</p>
          <div className="mt-4 flex gap-4">
            <select value={fileType} onChange={(e) => setFileType(e.target.value as 'pdf' | 'xls')} className="border border-accent rounded-md bg-gray-100 dark:bg-gray-700 p-2 text-sm text-gray-900 dark:text-white focus:ring-accent focus:border-accent">
              <option value="pdf">PDF</option>
              <option value="xls">XLS</option>
            </select>
            <button type="button" className="btn bg-accent text-[#0a0f1d] hover:bg-[#b9952e]" onClick={exportReport}>Baixar</button>
            <a href="/contato" className="btn btn-gold animate-gold-pulse">Falar com Especialista</a>
          </div>
          <Image src="/images/BANNER-HOME.jpeg" alt="Banner OLV" width={1200} height={300} className="mt-8 rounded-lg w-full" />
        </div>
      )}
    </div>
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