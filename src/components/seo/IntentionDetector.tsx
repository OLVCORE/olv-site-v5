'use client';

import { useState, useEffect } from 'react';
import { detectUserIntentionFromQuery, generateAIOptimizedCopy } from '@/lib/seoKeywords';

// Componente para detectar intenção do usuário e otimizar conteúdo
export default function IntentionDetector() {
  const [userIntention, setUserIntention] = useState<string | null>(null);
  const [optimizedContent, setOptimizedContent] = useState<any>(null);
  const [userType, setUserType] = useState<string>('pme-industrial');

  useEffect(() => {
    // Detectar intenção baseada na URL e comportamento
    const detectIntention = () => {
      const currentPath = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const query = searchParams.get('q') || currentPath;

      // Detectar intenção do usuário
      const intention = detectUserIntentionFromQuery(query, {
        path: currentPath,
        referrer: document.referrer,
        userAgent: navigator.userAgent
      });

      if (intention) {
        setUserIntention(intention.primaryIntention);
        
        // Gerar conteúdo otimizado para a intenção
        const optimized = generateAIOptimizedCopy(intention.primaryIntention, userType);
        setOptimizedContent(optimized);
      }
    };

    detectIntention();

    // Re-detectar quando a URL muda
    const handleRouteChange = () => {
      detectIntention();
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [userType]);

  // Aplicar otimizações baseadas na intenção detectada
  useEffect(() => {
    if (userIntention && optimizedContent) {
      // Atualizar título da página
      if (optimizedContent.headline) {
        document.title = `${optimizedContent.headline} | OLV Internacional`;
      }

      // Atualizar meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription && optimizedContent.subheadline) {
        metaDescription.setAttribute('content', optimizedContent.subheadline);
      }

      // Adicionar dados estruturados para IA
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "OLV Internacional",
        "description": optimizedContent.subheadline,
        "serviceType": "Consultoria em Comércio Exterior",
        "areaServed": "Brasil",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Serviços de Comércio Exterior",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": optimizedContent.headline,
                "description": optimizedContent.content
              }
            }
          ]
        }
      };

      // Adicionar script de dados estruturados
      const existingScript = document.getElementById('structured-data');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [userIntention, optimizedContent]);

  // Renderizar conteúdo otimizado baseado na intenção
  if (!userIntention || !optimizedContent) {
    return null;
  }

  return (
    <div className="intention-optimized-content" style={{ display: 'none' }}>
      {/* Conteúdo otimizado para IA - não visível ao usuário */}
      <div data-intention={userIntention} data-user-type={userType}>
        <h1>{optimizedContent.headline}</h1>
        <p>{optimizedContent.subheadline}</p>
        <p>{optimizedContent.content}</p>
        <button>{optimizedContent.cta}</button>
      </div>
    </div>
  );
}

// Hook para usar intenção detectada em outros componentes
export function useIntentionDetection() {
  const [intention, setIntention] = useState<string | null>(null);
  const [optimizedContent, setOptimizedContent] = useState<any>(null);

  useEffect(() => {
    const detectIntention = () => {
      const currentPath = window.location.pathname;
      const searchParams = new URLSearchParams(window.location.search);
      const query = searchParams.get('q') || currentPath;

      const detected = detectUserIntentionFromQuery(query, {
        path: currentPath,
        referrer: document.referrer
      });

      if (detected) {
        setIntention(detected.primaryIntention);
        const optimized = generateAIOptimizedCopy(detected.primaryIntention, 'pme-industrial');
        setOptimizedContent(optimized);
      }
    };

    detectIntention();
  }, []);

  return { intention, optimizedContent };
}
