'use client';

import React, { useState } from 'react';

interface IncotermInfo {
  code: string;
  name: string;
  description: string;
  seller: string[];
  buyer: string[];
}

const incoterms: IncotermInfo[] = [
  {
    code: 'EXW',
    name: 'Ex Works',
    description: 'Vendedor coloca a mercadoria à disposição do comprador no estabelecimento do vendedor',
    seller: ['Embalagem', 'Documentação básica'],
    buyer: ['Transporte', 'Seguro', 'Despacho aduaneiro', 'Taxas de importação']
  },
  {
    code: 'FCA',
    name: 'Free Carrier',
    description: 'Vendedor entrega a mercadoria ao transportador designado pelo comprador',
    seller: ['Embalagem', 'Documentação', 'Entrega ao transportador'],
    buyer: ['Transporte principal', 'Seguro', 'Despacho aduaneiro']
  },
  {
    code: 'CPT',
    name: 'Carriage Paid To',
    description: 'Vendedor paga o frete até o local de destino designado',
    seller: ['Embalagem', 'Documentação', 'Frete até destino'],
    buyer: ['Seguro', 'Despacho aduaneiro', 'Descarga']
  },
  {
    code: 'CIP',
    name: 'Carriage and Insurance Paid To',
    description: 'Vendedor paga frete e seguro até o local de destino',
    seller: ['Embalagem', 'Documentação', 'Frete', 'Seguro'],
    buyer: ['Despacho aduaneiro', 'Descarga']
  },
  {
    code: 'DAP',
    name: 'Delivered at Place',
    description: 'Vendedor entrega a mercadoria no local de destino designado',
    seller: ['Embalagem', 'Documentação', 'Frete', 'Entrega no destino'],
    buyer: ['Despacho aduaneiro', 'Descarga']
  },
  {
    code: 'DPU',
    name: 'Delivered at Place Unloaded',
    description: 'Vendedor entrega e descarrega a mercadoria no local de destino',
    seller: ['Embalagem', 'Documentação', 'Frete', 'Entrega e descarga'],
    buyer: ['Despacho aduaneiro']
  },
  {
    code: 'DDP',
    name: 'Delivered Duty Paid',
    description: 'Vendedor entrega a mercadoria com impostos pagos no destino',
    seller: ['Embalagem', 'Documentação', 'Frete', 'Despacho aduaneiro', 'Impostos'],
    buyer: ['Recebe a mercadoria']
  },
  {
    code: 'FAS',
    name: 'Free Alongside Ship',
    description: 'Vendedor coloca a mercadoria ao lado do navio no porto de embarque',
    seller: ['Embalagem', 'Documentação', 'Entrega ao lado do navio'],
    buyer: ['Carregamento', 'Frete', 'Seguro', 'Despacho aduaneiro']
  },
  {
    code: 'FOB',
    name: 'Free On Board',
    description: 'Vendedor coloca a mercadoria a bordo do navio no porto de embarque',
    seller: ['Embalagem', 'Documentação', 'Carregamento no navio'],
    buyer: ['Frete', 'Seguro', 'Despacho aduaneiro']
  },
  {
    code: 'CFR',
    name: 'Cost and Freight',
    description: 'Vendedor paga o frete até o porto de destino',
    seller: ['Embalagem', 'Documentação', 'Frete até destino'],
    buyer: ['Seguro', 'Despacho aduaneiro', 'Descarga']
  },
  {
    code: 'CIF',
    name: 'Cost, Insurance and Freight',
    description: 'Vendedor paga frete e seguro até o porto de destino',
    seller: ['Embalagem', 'Documentação', 'Frete', 'Seguro'],
    buyer: ['Despacho aduaneiro', 'Descarga']
  }
];

export default function IncotermGuide() {
  const [selectedIncoterm, setSelectedIncoterm] = useState<string>('FOB');
  const [isOpen, setIsOpen] = useState(false);

  const selectedInfo = incoterms.find(incoterm => incoterm.code === selectedIncoterm);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Guia de Incoterms 2020
        </h3>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {isOpen ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {isOpen && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {incoterms.map((incoterm) => (
              <button
                key={incoterm.code}
                onClick={() => setSelectedIncoterm(incoterm.code)}
                className={`p-2 text-sm rounded border transition-colors ${
                  selectedIncoterm === incoterm.code
                    ? 'bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-300'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                <div className="font-semibold">{incoterm.code}</div>
                <div className="text-xs">{incoterm.name}</div>
              </button>
            ))}
          </div>

          {selectedInfo && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">
                {selectedInfo.code} - {selectedInfo.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {selectedInfo.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">
                    Responsabilidades do Vendedor:
                  </h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {selectedInfo.seller.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">
                    Responsabilidades do Comprador:
                  </h5>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {selectedInfo.buyer.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-red-500 mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 