import React from 'react';
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
        <h1 className="import-sim-heading text-3xl font-bold flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
          <Icon src="/icons/weight.svg" alt="Conversor" size="sm" className="text-accent" />
          Conversor Peso ⚖️ Volume (Cubagem)
        </h1>
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