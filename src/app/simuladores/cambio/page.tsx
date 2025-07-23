import Link from 'next/link';
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
        <div className="flex items-center justify-between mb-[19px]">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <Icon src="/icons/calculator.svg" alt="Simulador" size="sm" className="text-accent w-6 h-6 shrink-0" />
            Conversor Cambial
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