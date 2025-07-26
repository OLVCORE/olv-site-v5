"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
  maxWidth?: string;
}

interface InfoTooltipProps {
  title: string;
  description: string;
  examples?: string[];
  formula?: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 0.3,
  className = '',
  maxWidth = 'max-w-xs'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseEnter = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        let x = rect.left + rect.width / 2;
        let y = rect.top;

        switch (position) {
          case 'top':
            y = rect.top - 10;
            break;
          case 'bottom':
            y = rect.bottom + 10;
            break;
          case 'left':
            x = rect.left - 10;
            y = rect.top + rect.height / 2;
            break;
          case 'right':
            x = rect.right + 10;
            y = rect.top + rect.height / 2;
            break;
        }

        setCoords({ x, y });
      }
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const trigger = triggerRef.current;
    if (trigger) {
      trigger.addEventListener('mouseenter', handleMouseEnter);
      trigger.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        trigger.removeEventListener('mouseenter', handleMouseEnter);
        trigger.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [position]);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    }
  };

  return (
    <div ref={triggerRef} className="relative inline-block">
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-50 ${getPositionClasses()} ${maxWidth} ${className}`}
            style={{
              left: position === 'left' || position === 'right' ? 'auto' : coords.x,
              top: position === 'top' || position === 'bottom' ? 'auto' : coords.y,
            }}
          >
            <div className="bg-gray-900 dark:bg-gray-800 text-white p-3 rounded-lg shadow-xl border border-gray-700 dark:border-gray-600">
              {content}
              {/* Arrow */}
              <div
                className={`absolute w-2 h-2 bg-gray-900 dark:bg-gray-800 border border-gray-700 dark:border-gray-600 transform rotate-45 ${
                  position === 'top' ? 'top-full -translate-y-1' :
                  position === 'bottom' ? 'bottom-full translate-y-1' :
                  position === 'left' ? 'left-full -translate-x-1' :
                  'right-full translate-x-1'
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
  title,
  description,
  examples = [],
  formula,
  children,
  position = 'top'
}) => {
  const content = (
    <div className="space-y-2">
      <h4 className="font-semibold text-white text-sm">{title}</h4>
      <p className="text-gray-300 text-xs leading-relaxed">{description}</p>
      
      {formula && (
        <div className="mt-2 p-2 bg-gray-800 dark:bg-gray-700 rounded text-xs font-mono text-green-400">
          {formula}
        </div>
      )}
      
      {examples.length > 0 && (
        <div className="mt-2">
          <p className="text-gray-400 text-xs font-medium mb-1">Exemplos:</p>
          <ul className="text-xs text-gray-300 space-y-1">
            {examples.map((example, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent mr-1">•</span>
                {example}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <Tooltip content={content} position={position} maxWidth="max-w-sm">
      {children}
    </Tooltip>
  );
};

// Tooltips específicos para simuladores
export const ImportTooltips = {
  FOB: {
    title: "Valor FOB (Free On Board)",
    description: "Preço da mercadoria no porto de origem, sem incluir frete, seguro ou impostos brasileiros.",
    examples: [
      "Produto: US$ 1.000 no porto de Xangai",
      "Máquina: € 5.000 no porto de Hamburgo"
    ],
    formula: "FOB = Preço da mercadoria + Despesas até embarque"
  },
  
  Freight: {
    title: "Frete Internacional",
    description: "Custo de transporte da mercadoria do porto de origem até o porto de destino no Brasil.",
    examples: [
      "Marítimo: US$ 2.500 por contêiner 40'",
      "Aéreo: US$ 8/kg para cargas urgentes"
    ]
  },
  
  Insurance: {
    title: "Seguro Internacional",
    description: "Prêmio de seguro para cobrir riscos durante o transporte internacional.",
    examples: [
      "0,3% do valor CIF para cargas gerais",
      "0,8% do valor CIF para eletrônicos"
    ],
    formula: "Seguro = Valor CIF × Alíquota do Seguro"
  },
  
  II: {
    title: "Imposto de Importação (II)",
    description: "Imposto federal que incide sobre o valor aduaneiro da mercadoria importada.",
    examples: [
      "Eletrônicos: 16% (NCM 8517)",
      "Máquinas: 14% (NCM 8474)",
      "Produtos químicos: 12% (NCM 3824)"
    ],
    formula: "II = Valor Aduaneiro × Alíquota II"
  },
  
  IPI: {
    title: "Imposto sobre Produtos Industrializados",
    description: "Imposto federal que incide sobre produtos industrializados nacionais e importados.",
    examples: [
      "Automóveis: 0% a 15%",
      "Bebidas: 0% a 20%",
      "Cigarros: 300%"
    ],
    formula: "IPI = (VA + II) × Alíquota IPI"
  },
  
  PIS: {
    title: "Programa de Integração Social",
    description: "Contribuição social que incide sobre a importação de mercadorias.",
    examples: [
      "Alíquota padrão: 2,1%",
      "Base de cálculo: VA + II + IPI"
    ],
    formula: "PIS = (VA + II + IPI) × 2,1%"
  },
  
  COFINS: {
    title: "Contribuição para Financiamento da Seguridade Social",
    description: "Contribuição social que incide sobre a importação de mercadorias.",
    examples: [
      "Alíquota padrão: 9,65%",
      "Base de cálculo: VA + II + IPI"
    ],
    formula: "COFINS = (VA + II + IPI) × 9,65%"
  },
  
  ICMS: {
    title: "Imposto sobre Circulação de Mercadorias e Serviços",
    description: "Imposto estadual que incide sobre a circulação de mercadorias.",
    examples: [
      "SP: 18%",
      "SC: 17%",
      "RJ: 20%",
      "MG: 18%"
    ],
    formula: "ICMS = Base ICMS × Alíquota ICMS"
  },
  
  Customs: {
    title: "Despesas Aduaneiras",
    description: "Custos relacionados ao desembaraço aduaneiro da mercadoria.",
    examples: [
      "Armazenagem: R$ 50/dia",
      "Taxa Siscomex: R$ 200",
      "Despachante: R$ 500 a R$ 1.500"
    ]
  },
  
  Exchange: {
    title: "Taxa de Câmbio",
    description: "Cotação da moeda estrangeira em relação ao Real brasileiro.",
    examples: [
      "Dólar: R$ 5,00",
      "Euro: R$ 5,50",
      "Yuan: R$ 0,70"
    ],
    formula: "Valor BRL = Valor Estrangeiro × Taxa de Câmbio"
  }
};

// Componente de ajuda contextual
export const ContextualHelp: React.FC<{ field: keyof typeof ImportTooltips }> = ({ field }) => {
  const tooltipData = ImportTooltips[field];
  
  return (
    <InfoTooltip
      title={tooltipData.title}
      description={tooltipData.description}
      examples={tooltipData.examples}
      formula={'formula' in tooltipData ? tooltipData.formula : undefined}
    >
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-accent/20 text-accent text-xs cursor-help hover:bg-accent/30 transition-colors">
        ?
      </span>
    </InfoTooltip>
  );
};

// Tooltip para validação
export const ValidationTooltip: React.FC<{ 
  isValid: boolean; 
  message: string; 
  children: React.ReactNode 
}> = ({ isValid, message, children }) => {
  const content = (
    <div className="flex items-center space-x-2">
      <span className={`text-lg ${isValid ? 'text-green-400' : 'text-red-400'}`}>
        {isValid ? '✓' : '✗'}
      </span>
      <span className="text-sm text-white">{message}</span>
    </div>
  );

  return (
    <Tooltip content={content} position="right">
      {children}
    </Tooltip>
  );
}; 