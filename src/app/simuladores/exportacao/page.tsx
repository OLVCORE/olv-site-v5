import React from 'react';
import { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ExportCostCalculator from '@/components/simulators/ExportCostCalculator';
import RealtimeQuotes from '@/components/radar/RealtimeQuotes';
import Icon from '@/components/icons/Icon';
import Link from 'next/link';
import SimLayout from '@/components/simulators/SimLayout';

export const metadata: Metadata = {
  title: 'Simulador de Custos de Exportação - OLV Internacional',
  description: 'Calcule receita líquida e crédito Reintegra para suas operações de exportação.',
  keywords: 'simulador, exportação, custos, reintegra, receita líquida',
  openGraph: {
    title: 'Simulador de Custos de Exportação - OLV Internacional',
    description: 'Calcule receita líquida e crédito Reintegra para suas operações de exportação.',
    type: 'website',
  },
};

export default function SimuladorExportacaoPage() {
  return (
    <MainLayout>
      <div className="container import-sim-container pb-12 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-[0.5cm]">
          <h1 className="import-sim-heading text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Icon src="/icons/calculator.svg" alt="Simulador" size="sm" className="text-accent w-6 h-6 shrink-0" />
            Simulador de Custos de Exportação
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
          calculator={<ExportCostCalculator showQuotes={false} />}
          guide={(
            <div className="glass p-6 rounded-2xl shadow-gold card-hover">
              <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
                <Icon src="/icons/info.svg" alt="Guia" size="xs" className="text-accent" />
                Como Calcular Custos de Exportação
              </h2>
              <ol className="list-decimal pl-4 space-y-2 text-gray-300 text-sm leading-relaxed">
                <li><strong>Valor FOB</strong>: preço da mercadoria no porto de embarque, sem frete internacional.</li>
                <li><strong>Custos de Exportação</strong>: frete, seguro, despesas internas e portuárias.</li>
                <li><strong>Crédito Reintegra</strong>: benefício fiscal de 0% a 3% sobre o valor FOB.</li>
                <li><strong>Receita Líquida</strong>: FOB - custos + benefícios fiscais.</li>
              </ol>
            </div>
          )}
        />
      </div>
    </MainLayout>
  );
} 