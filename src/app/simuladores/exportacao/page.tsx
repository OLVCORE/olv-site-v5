import React from 'react';
import MainLayout from '../../../components/layout/MainLayout';
import ExportCostCalculator from '../../../components/simulators/ExportCostCalculator';
import ImportSimWrapper from '../../../components/simulators/ImportSimWrapper';
import Icon from '../../../components/icons/Icon';
import SimLayout from '../../../components/simulators/SimLayout';
import RealtimeQuotes from '../../../components/radar/RealtimeQuotes';

export const metadata = {
  title: 'Simulador de Custos de Exportação | OLV Internacional',
  description: 'Calcule custos logísticos e receita líquida de exportação com base no crédito Reintegra e despesas de frete.',
};

export default function ExportSimPage() {
  return (
    <MainLayout>
      <div className="container import-sim-container pb-12 mx-auto max-w-7xl">
        <h1 className="import-sim-heading text-3xl font-bold flex items-center gap-2 mb-[0.5cm] text-gray-900 dark:text-white">
          <Icon src="/icons/calculator.svg" alt="Simulador" size="sm" className="text-accent w-6 h-6 shrink-0" />
          Simulador de Custos de Exportação
        </h1>
        <SimLayout
          quotes={<RealtimeQuotes symbols={['USD','EUR','GBP','CNY']} />}
          calculator={<ImportSimWrapper><ExportCostCalculator showQuotes={false} /></ImportSimWrapper>}
          guide={(
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h2 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
              <Icon src="/icons/info.svg" alt="Guia" size="xs" className="text-accent" />
              Como Precificar uma Exportação
            </h2>
            <ol className="list-decimal pl-4 space-y-2 text-gray-300 text-sm leading-relaxed">
              <li><strong>FOB</strong>: valor da mercadoria pronta para embarque no porto/aeroporto de saída.</li>
              <li><strong>Custos Logísticos</strong>: frete internacional, seguro, transporte interno, taxas portuárias e despesas diversas.</li>
              <li><strong>Reintegra</strong>: crédito fiscal concedido (0-3 %) sobre o valor exportado — aumenta a margem.</li>
              <li><strong>Receita Líquida</strong>: FOB – custos + crédito Reintegra. Use-a para definir sua margem e preço de venda.</li>
              <li>Mercados diferentes ⇒ requisitos diferentes. Avalie <em>incoterms</em>, barreiras técnicas e preferências de consumo.</li>
            </ol>
            <p className="mt-4 text-xs"><span className="text-accent">Precificar corretamente é o primeiro passo; dominar requisitos de mercado garante que sua oferta seja competitiva e compliant. Conte com a OLV Internacional para abrir novos destinos e maximizar resultados.</span></p>
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