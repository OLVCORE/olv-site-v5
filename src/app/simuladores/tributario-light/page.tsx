import Link from 'next/link';
import TaxSimulatorLight from '../../../components/simulators/TaxSimulatorLight';


export const metadata = {
  title: 'Simulador Tributário – Versão Light',
  description: 'Estimativa básica de carga tributária de importação e exportação.',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto py-8 max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">
            Simulador Tributário Comex
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
        <TaxSimulatorLight />
      </main>

    </div>
  );
} 