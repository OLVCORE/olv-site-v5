import React from 'react';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import WeightVolumeConverter from '../../../components/simulators/WeightVolumeConverter';
import ImportSimWrapper from '../../../components/simulators/ImportSimWrapper';
import Icon from '../../../components/icons/Icon';

export const metadata = {
  title: 'Conversor Peso x Volume (Cubagem) | OLV Internacional',
  description: 'Calcule rapidamente peso cubado e peso taxável para determinar frete aéreo, rodoviário ou marítimo.',
};

export default function CubagemSimPage() {
  return (
    <MainLayout>
      <div className="container import-sim-container pb-12 mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="import-sim-heading text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Icon src="/icons/weight.svg" alt="Conversor" size="sm" className="text-accent" />
            Conversor Peso ⚖️ Volume (Cubagem)
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
        <p className="mb-8 text-gray-700 dark:text-gray-300 max-w-2xl">
          Insira as dimensões da embalagem, peso bruto e quantidade. O conversor calcula automaticamente o peso cubado
          de acordo com o modal selecionado e indica qual peso será tarifado pela companhia.
        </p>
        <ImportSimWrapper>
          <WeightVolumeConverter />
        </ImportSimWrapper>
      </div>
    </MainLayout>
  );
} 