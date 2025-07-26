import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import ImportCostCalculator from '../../../components/simulators/ImportCostCalculator';
import ImportSimWrapper from '../../../components/simulators/ImportSimWrapper';
import Icon from '../../../components/icons/Icon';
import SimLayout from '../../../components/simulators/SimLayout';
import RealtimeQuotes from '../../../components/radar/RealtimeQuotes';

export const metadata = {
  title: 'Simulador de Custos de Importação | OLV Internacional',
  description: 'Calcule de forma rápida impostos e custos de importação (II, IPI, PIS/COFINS, ICMS) com o simulador gratuito da OLV Internacional.',
};

export default function ImportSimPage() {
  return (
    <MainLayout>
      <div className="container import-sim-container pb-12 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-[0.5cm]">
          <h1 className="import-sim-heading text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Icon src="/icons/calculator.svg" alt="Simulador" size="sm" className="text-accent w-6 h-6 shrink-0" />
            Simulador de Custos de Importação
          </h1>
          <Link
            href="/radar360"
            className="inline-flex items-center px-4 py-2 bg-[#d4af37] text-gray-900 font-semibold rounded-lg hover:bg-[#b8941f] transition-colors text-sm"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            Voltar ao Radar 360
          </Link>
        </div>

        <SimLayout
          quotes={<RealtimeQuotes symbols={['USD','EUR','GBP','CNY']} />}
          calculator={<ImportSimWrapper><ImportCostCalculator /></ImportSimWrapper>}
          guide={(
            <div className="glass p-6 rounded-2xl shadow-gold card-hover">
              <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <Icon src="/icons/info.svg" alt="Guia" size="xs" className="text-accent" />
                Como Calcular Custos de Importação
              </h2>
              <ol className="list-decimal pl-4 space-y-2 text-gray-300 text-sm leading-relaxed">
                <li><strong>Valor da Mercadoria</strong>: preço FOB no exterior sem impostos brasileiros.</li>
                <li><strong>Impostos Federais</strong>: II, IPI, PIS e COFINS variam conforme NCM.</li>
                <li><strong>ICMS</strong>: depende do estado de destino; incide sobre CIF + impostos.</li>
                <li><strong>Despesas Logísticas</strong>: frete internacional, seguro, taxas portuárias, transporte interno.</li>
                <li><strong>Custo Total Importação</strong>: soma de impostos + despesas + preço mercadoria (CIF).</li>
              </ol>
              <div className="mt-4">
                <a href="/contato" className="btn btn-gold animate-gold-pulse">Fale com um Especialista</a>
              </div>
            </div>
          )}
        />
      </div>
    </MainLayout>
  );
} 