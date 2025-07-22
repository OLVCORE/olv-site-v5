import TaxSimulatorLight from '../../../components/simulators/TaxSimulatorLight';

export const metadata = {
  title: 'Simulador Tributário – Versão Light',
  description: 'Estimativa básica de carga tributária de importação e exportação.',
};

export default function Page() {
  return (
    <main className="container mx-auto py-8 max-w-3xl">
      <TaxSimulatorLight />
    </main>
  );
} 