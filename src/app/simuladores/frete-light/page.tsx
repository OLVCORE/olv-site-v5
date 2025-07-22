import { Suspense } from 'react';
import FreightCalculatorLight from '../../../components/simulators/FreightCalculatorLight';

export const metadata = {
  title: 'Calculadora de Fretes – Versão Light',
  description: 'Estimativa simplificada de custos de frete internacional multimodal.',
};

// For using useSearchParams we must mark page as dynamic to avoid static export errors
export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <main className="container mx-auto py-8 max-w-3xl">
      <Suspense fallback={<p className="p-4">Carregando...</p>}>
        <FreightCalculatorLight />
      </Suspense>
    </main>
  );
} 