"use client";

import React, { useState, useEffect, useRef } from 'react';
import { calculateImportCost } from '../../lib/importCost';
import RealtimeQuotes from '../radar/RealtimeQuotes';
import Image from 'next/image';
import InfoTooltip from '../ui/InfoTooltip';

interface Props { showQuotes?: boolean }

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

  const contactRefs = useRef<{name?:HTMLInputElement|null,phone?:HTMLInputElement|null,email?:HTMLInputElement|null,comments?:HTMLTextAreaElement|null,consent?:HTMLInputElement|null}>({});

  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  const brl = (v:number)=> v.toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
  const usd = (v:number)=> v.toLocaleString('en-US',{style:'currency',currency:'USD'});

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

  // auto-preencher taxa USD→BRL (sempre na primeira montagem)
  useEffect(() => {
    fetch('/api/radar/quotes?symbols=USD')
      .then((r) => r.json())
      .then((j) => {
        const brl = j?.rates?.USD;
        if (brl && typeof brl === 'number') {
          const usdBrl = brl; // endpoint já converte
          const exch = inputRefs.current['exchange'];
          if(exch) exch.value = usdBrl.toFixed(2);
          setRate(usdBrl);
        }
      })
      .catch(() => {});

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
    <div className={`grid gap-8 ${showQuotes ? 'lg:grid-cols-[10cm_minmax(0,1fr)_15cm]' : 'lg:grid-cols-[10cm_15cm]'}`}> 
      {showQuotes && (
        <div className="order-3 lg:order-1">
          <RealtimeQuotes symbols={[ 'USD', 'EUR', 'GBP', 'CNY' ]} />
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4 order-1 lg:order-1">
        <Field name="fob" label="Valor FOB" suffix="USD" tip="Valor da mercadoria no porto de origem, sem frete ou seguro." />
        <Field name="freight" label="Frete" suffix="USD" tip="Custo de transporte internacional." />
        <Field name="insurance" label="Seguro" suffix="USD" tip="Prêmio de seguro internacional." />
        <Field name="exchange" label="Taxa USD → BRL" suffix="R$" tip="Cotação do dólar no dia da operação." />
        <Field name="ii" label="II" suffix="%" tip="Imposto de Importação (%)." />
        <Field name="ipi" label="IPI" suffix="%" tip="Imposto sobre Produtos Industrializados (%)." />
        <Field name="pis" label="PIS" suffix="%" tip="Programa de Integração Social (%). Ex.: 2,10." />
        <Field name="cofins" label="COFINS" suffix="%" tip="Contribuição para Financiamento da Seguridade Social (%). Ex.: 9,65." />
        <Field name="icms" label="ICMS" suffix="%" tip="Imposto sobre Circulação de Mercadorias e Serviços. Varía por estado." />
        <Field name="customs" label="Despesas Aduaneiras" suffix="USD" tip="Despesas no desembaraço aduaneiro como armazenagem e taxas." />
        <Field name="misc" label="Outras Despesas" suffix="USD" tip="Qualquer outro custo não previsto no cálculo." />
        <button type="submit" className="btn btn-primary mt-2">Calcular</button>
      </form>
      {result && (
        <div
          ref={resultRef}
          className={`bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm md:text-base order-2 lg:order-${showQuotes ? '3' : '2'}`}
        >
          <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Resultado</h3>
          <table className="w-full text-left text-gray-700 dark:text-gray-300 text-sm">
            <thead>
              <tr><th></th><th>USD</th><th>BRL</th><th>% Import</th><th>% Merc.</th></tr>
            </thead>
            <tbody>
              {(()=>{
                const pctImport=(v:number)=>((v/result.finalCost)*100).toFixed(1)+'%';
                const pctMerc=(v:number)=>((v/result.cif)*100).toFixed(1)+'%';
                return (
                  <>
                  <tr><td>CIF</td><td>{usd(result.cif)}</td><td>{brl(result.cif*rate)}</td><td>{pctImport(result.cif)}</td><td>{pctMerc(result.cif)}</td></tr>
                  <tr><td>II</td><td>{usd(result.iiValue)}</td><td>{brl(result.iiValue*rate)}</td><td>{pctImport(result.iiValue)}</td><td>{pctMerc(result.iiValue)}</td></tr>
                  <tr><td>IPI</td><td>{usd(result.ipiValue)}</td><td>{brl(result.ipiValue*rate)}</td><td>{pctImport(result.ipiValue)}</td><td>{pctMerc(result.ipiValue)}</td></tr>
                  <tr><td>PIS</td><td>{usd(result.pisValue)}</td><td>{brl(result.pisValue*rate)}</td><td>{pctImport(result.pisValue)}</td><td>{pctMerc(result.pisValue)}</td></tr>
                  <tr><td>COFINS</td><td>{usd(result.cofinsValue)}</td><td>{brl(result.cofinsValue*rate)}</td><td>{pctImport(result.cofinsValue)}</td><td>{pctMerc(result.cofinsValue)}</td></tr>
                  <tr><td>ICMS</td><td>{usd(result.icmsValue)}</td><td>{brl(result.icmsValue*rate)}</td><td>{pctImport(result.icmsValue)}</td><td>{pctMerc(result.icmsValue)}</td></tr>
                  <tr><td>Despesas Aduaneiras</td><td>{usd(extras.customs)}</td><td>{brl(extras.customs*rate)}</td><td>{pctImport(extras.customs)}</td><td>{pctMerc(extras.customs)}</td></tr>
                  <tr><td>Outras Despesas</td><td>{usd(extras.misc)}</td><td>{brl(extras.misc*rate)}</td><td>{pctImport(extras.misc)}</td><td>{pctMerc(extras.misc)}</td></tr>
                  <tr className="font-semibold"><td>Total Tributos</td><td>{usd(result.totalTaxes)}</td><td>{brl(result.totalTaxes*rate)}</td><td>{pctImport(result.totalTaxes)}</td><td>{pctMerc(result.totalTaxes)}</td></tr>
                  <tr className="font-bold"><td>Custo Importação</td><td>{usd(result.landedCost)}</td><td>{brl(result.landedCost*rate)}</td><td>{pctImport(result.landedCost)}</td><td>{pctMerc(result.landedCost)}</td></tr>
                  <tr className="font-bold"><td>Custo Final</td><td>{usd(result.finalCost)}</td><td>{brl(result.finalCost*rate)}</td><td>100%</td><td>{pctMerc(result.finalCost)}</td></tr>
                  </>
                );
              })()}
            </tbody>
          </table>
          <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">Este simulador oferece uma estimativa simplificada. O resultado é de uso exclusivo e responsabilidade do usuário. Para análise completa, consulte um especialista da OLV Internacional.</p>
          <div className="mt-4 flex gap-4">
            <select value={fileType} onChange={e=>setFileType(e.target.value as 'pdf'|'xls')} className="border border-accent rounded-md bg-gray-100 dark:bg-gray-700 p-2 text-sm text-gray-900 dark:text-white focus:ring-accent focus:border-accent">
              <option value="pdf">PDF</option>
              <option value="xls">XLS</option>
            </select>
            <button type="button" className="btn bg-accent text-[#0a0f1d] hover:bg-[#b9952e]" onClick={exportReport}>Baixar</button>
            <a href="/contato" className="btn btn-gold animate-gold-pulse">Falar com Especialista</a>
          </div>
          <Image src="/images/BANNER-HOME.jpeg" alt="Banner OLV" width={1200} height={300} className="mt-8 rounded-lg w-full" priority={false} />
        </div>
      )}
    </div>
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
    </>
  );
} 