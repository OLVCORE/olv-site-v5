'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface FloatingSimulatorButtonProps {
  className?: string;
}

export default function FloatingSimulatorButton({ className = '' }: FloatingSimulatorButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio - aqui você pode integrar com sua API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Fechar modal após 3 segundos
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setEmail('');
      setName('');
    }, 3000);
  };

  return (
    <>
      {/* Botão Flutuante */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={`fixed bottom-6 right-6 z-50 bg-gradient-to-r from-accent to-yellow-500 hover:from-yellow-500 hover:to-accent text-white font-bold py-3 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${className}`}
        style={{
          boxShadow: '0 4px 20px rgba(224, 193, 120, 0.3)'
        }}
      >
        <div className="flex items-center space-x-2">
          <span className="text-xl">🧮</span>
          <span className="hidden sm:inline">Simuladores Gratuitos</span>
          <span className="sm:hidden">Simuladores</span>
        </div>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-accent to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Guia Gratuito
                  </h2>
                  <h3 className="text-lg font-semibold text-accent mb-2">
                    5 Simuladores Essenciais para Comex
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Acesse simuladores simplificados e receba dicas práticas para otimizar suas operações de comércio exterior.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Seu nome completo"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-accent to-yellow-500 hover:from-yellow-500 hover:to-accent text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Enviando...' : '🚀 Acessar Simuladores Gratuitos'}
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Ao enviar, você receberá o guia por email e acesso aos simuladores.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✅</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Sucesso!
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Seu guia foi enviado para {email}. Verifique sua caixa de entrada!
                </p>
                <Link 
                  href="/simuladores"
                  className="inline-block mt-4 bg-accent text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors"
                >
                  Acessar Simuladores
                </Link>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
} 