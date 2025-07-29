import Footer from '@/components/layout/Footer';

export default function TestePage() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Página de Teste</h1>
        <p className="text-gray-300">Esta é uma página de teste com footer reveal.</p>
      </div>
      <Footer />
    </div>
  );
} 