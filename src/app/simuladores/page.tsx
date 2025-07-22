import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Simuladores - OLV Internacional',
  description: 'Ferramentas para cálculo de custos de importação, exportação, frete internacional e câmbio.',
  keywords: 'simuladores, importação, exportação, frete, câmbio, custos, cálculo',
  openGraph: {
    title: 'Simuladores - OLV Internacional',
    description: 'Ferramentas para cálculo de custos de importação, exportação, frete internacional e câmbio.',
    type: 'website',
  },
};

export default function SimuladoresPage() {
  const simuladores = [
    {
      title: 'Simulador de Importação',
      description: 'Calcule impostos, fretes e taxas para importação',
      href: '/simuladores/importacao',
      icon: '📦',
      color: 'bg-blue-500'
    },
    {
      title: 'Simulador de Exportação',
      description: 'Calcule receita líquida e crédito Reintegra',
      href: '/simuladores/exportacao',
      icon: '🚢',
      color: 'bg-green-500'
    },
    {
      title: 'Simulador Cambial',
      description: 'Converta valores entre diferentes moedas',
      href: '/simuladores/cambio',
      icon: '💱',
      color: 'bg-yellow-500'
    },
    {
      title: 'Simulador de Frete',
      description: 'Calcule custos de frete marítimo e aéreo',
      href: '/simuladores/frete-full',
      icon: '🚚',
      color: 'bg-purple-500'
    },
    {
      title: 'Simulador Tributário',
      description: 'Calcule impostos e taxas de importação',
      href: '/simuladores/tributario-light',
      icon: '📊',
      color: 'bg-red-500'
    },
    {
      title: 'Calculadora de Cubagem',
      description: 'Calcule volume e peso de cargas',
      href: '/simuladores/cubagem',
      icon: '⚖️',
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Simuladores
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ferramentas especializadas para cálculo de custos em comércio exterior
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {simuladores.map((simulador, index) => (
            <Link
              key={index}
              href={simulador.href}
              className="group block"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl mr-4 ${simulador.color}`}>
                    {simulador.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-[#d4af37] transition-colors">
                    {simulador.title}
                  </h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {simulador.description}
                </p>
                <div className="mt-4 flex items-center text-[#d4af37] text-sm font-medium">
                  Acessar simulador
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
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
  );
} 