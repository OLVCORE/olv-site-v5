'use client';
import { Suspense } from 'react';
import FreightCalculator from '@/components/simulators/FreightCalculator';
import MainLayout from '@/components/layout/MainLayout';

export default function FreightFullPage() {
  return (
    <MainLayout>
      <div className="import-sim-container mx-auto max-w-6xl py-6">
        <h1 className="import-sim-heading text-2xl font-bold mb-4">Simulador de Frete Internacional – Versão Oficial</h1>
        <Suspense fallback={<p>Carregando…</p>}>
          <FreightCalculator />
        </Suspense>
      </div>
    </MainLayout>
  );
} 