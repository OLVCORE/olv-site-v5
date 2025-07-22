import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simulador de Custos de Exportação - OLV Internacional',
  description: 'Calcule receita líquida e crédito Reintegra para suas operações de exportação.',
  keywords: 'simulador, exportação, custos, reintegra, receita líquida',
  openGraph: {
    title: 'Simulador de Custos de Exportação - OLV Internacional',
    description: 'Calcule receita líquida e crédito Reintegra para suas operações de exportação.',
    type: 'website',
  },
};

export default function SimuladorExportacaoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Simulador de Custos de Exportação
        </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Calcule receita líquida e crédito Reintegra para suas operações de exportação
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <div className="text-center">
              <div className="text-6xl mb-4">🚢</div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Simulador em Desenvolvimento
            </h2>
              <p className="text-gray-300 mb-8">
                Este simulador está sendo desenvolvido para calcular receita líquida e crédito Reintegra 
                para operações de exportação. Em breve estará disponível.
              </p>
              
                             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Link
                   href="/radar360"
                   className="inline-flex items-center px-6 py-3 bg-[#d4af37] text-gray-900 font-semibold rounded-lg hover:bg-[#b8941f] transition-colors"
                 >
                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                   </svg>
                   Voltar ao Radar 360
                 </Link>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 