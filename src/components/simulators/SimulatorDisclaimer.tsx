"use client";

import React from 'react';

interface SimulatorDisclaimerProps {
  className?: string;
  variant?: 'compact' | 'detailed';
}

export default function SimulatorDisclaimer({ className = "", variant = "detailed" }: SimulatorDisclaimerProps) {
  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-3 shadow-sm ${className}`}>
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center">
              <span className="text-orange-600 dark:text-orange-300 text-sm">⚠️</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
              <strong>Valores aproximados</strong> - Para cálculos oficiais, consulte especialistas
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-xl p-6 shadow-lg ${className}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center">
            <span className="text-orange-600 dark:text-orange-300 text-lg">⚠️</span>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-orange-800 dark:text-orange-200 mb-3">
            DECLARAÇÃO DE RESPONSABILIDADE
          </h3>
          <p className="text-orange-700 dark:text-orange-300 mb-4 font-medium">
            Os simuladores fornecem valores <strong>APROXIMADOS</strong> para fins educacionais e de planejamento preliminar.
          </p>
          <div className="space-y-2 text-sm text-orange-600 dark:text-orange-400">
            <p className="font-semibold">Para cálculos oficiais e conformidade legal, você deve:</p>
            <ul className="space-y-1 ml-4">
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Consultar especialistas em comércio exterior
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Verificar alíquotas atuais com a Receita Federal
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Validar NCMs com base oficial
              </li>
              <li className="flex items-center gap-2">
                <span className="text-orange-500">•</span>
                Confirmar incentivos fiscais com contadores especializados
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 