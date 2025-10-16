'use client';

import { useState, useEffect } from 'react';

// Componente para detectar intenção do usuário e otimizar conteúdo
// Versão simplificada - funções avançadas temporariamente desabilitadas
export default function IntentionDetector() {
  const [userIntention, setUserIntention] = useState<string | null>(null);

  useEffect(() => {
    // Detectar intenção básica baseada na URL
    const detectIntention = () => {
      const currentPath = window.location.pathname;
      
      // Mapeamento simples de intenções
      if (currentPath.includes('/export')) {
        setUserIntention('exportacao');
      } else if (currentPath.includes('/import')) {
        setUserIntention('importacao');
      } else if (currentPath.includes('/simulador')) {
        setUserIntention('simulacao');
      } else if (currentPath.includes('/contato')) {
        setUserIntention('contato');
      } else {
        setUserIntention('consultoria');
      }
    };

    detectIntention();

    // Re-detectar quando a URL muda
    const handleRouteChange = () => {
      detectIntention();
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Componente não renderiza nada visível
  return null;
}

// Hook para usar intenção detectada em outros componentes
export function useIntentionDetection() {
  const [intention, setIntention] = useState<string | null>(null);

  useEffect(() => {
    const detectIntention = () => {
      const currentPath = window.location.pathname;

      // Mapeamento simples de intenções
      if (currentPath.includes('/export')) {
        setIntention('exportacao');
      } else if (currentPath.includes('/import')) {
        setIntention('importacao');
      } else if (currentPath.includes('/simulador')) {
        setIntention('simulacao');
      } else if (currentPath.includes('/contato')) {
        setIntention('contato');
      } else {
        setIntention('consultoria');
      }
    };

    detectIntention();
  }, []);

  return { intention, optimizedContent: null };
}
