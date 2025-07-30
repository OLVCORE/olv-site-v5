'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';


export default function FreightPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para a versão correta do simulador
    router.replace('/simuladores/frete-full');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Redirecionando...</h1>
        <p className="text-gray-400">Carregando simulador correto</p>
      </div>

    </div>
  );
} 