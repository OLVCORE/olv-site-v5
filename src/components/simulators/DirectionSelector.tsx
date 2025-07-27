"use client";

import React from 'react';

interface DirectionSelectorProps {
  direction: 'importacao' | 'exportacao';
  onDirectionChange: (direction: 'importacao' | 'exportacao') => void;
}

export default function DirectionSelector({ direction, onDirectionChange }: DirectionSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Direção do Comércio</h3>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onDirectionChange('importacao')}
          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-300 ${
            direction === 'importacao'
              ? 'border-accent bg-accent/10 text-accent shadow-lg'
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-accent/50 hover:bg-accent/5'
          }`}
        >
          <span className="text-2xl">📥</span>
          <div className="text-left">
            <div className="font-semibold">Importação</div>
            <div className="text-sm opacity-75">Mundo → Brasil</div>
          </div>
        </button>
        
        <button
          type="button"
          onClick={() => onDirectionChange('exportacao')}
          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-300 ${
            direction === 'exportacao'
              ? 'border-accent bg-accent/10 text-accent shadow-lg'
              : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-accent/50 hover:bg-accent/5'
          }`}
        >
          <span className="text-2xl">📤</span>
          <div className="text-left">
            <div className="font-semibold">Exportação</div>
            <div className="text-sm opacity-75">Brasil → Mundo</div>
          </div>
        </button>
      </div>
    </div>
  );
} 