import SimLayout from '../../../components/simulators/SimLayout';
import RealtimeQuotes from '../../../components/radar/RealtimeQuotes';
import CurrencyConverter from '../../../components/simulators/CurrencyConverter';
import Icon from '../../../components/icons/Icon';
import MainLayout from '../../../components/layout/MainLayout';
import ImportSimWrapper from '../../../components/simulators/ImportSimWrapper';

export const metadata = {
  title: 'Simulador Cambial | OLV Internacional',
  description: 'Converta valores entre diferentes moedas com cotações atualizadas em tempo real.',
};

export default function CurrencySimPage() {
  return (
    <MainLayout>
      <div className="container import-sim-container pb-12 mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-[19px] text-gray-900 dark:text-white">
          <Icon src="/icons/calculator.svg" alt="Simulador" size="sm" className="text-accent w-6 h-6 shrink-0" />
          Conversor Cambial
        </h1>

        <ImportSimWrapper>
          <SimLayout
            quotes={<RealtimeQuotes symbols={['USD','EUR','GBP','CNY','BTC']} />}
            calculator={<CurrencyConverter />}
            guide={<></>}
          />
        </ImportSimWrapper>
      </div>
    </MainLayout>
  );
} 