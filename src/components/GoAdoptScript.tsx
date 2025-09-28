'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoAdoptScript() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  const handleScriptLoad = () => {
    console.log('🚀 [GOADOPT] Script carregado com sucesso!');
    setScriptLoaded(true);
    
    // Verificar se o GoAdopt foi inicializado
    setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).adopt) {
        console.log('✅ [GOADOPT] GoAdopt inicializado!');
      } else {
        console.log('⚠️ [GOADOPT] GoAdopt não inicializado, tentando fallback...');
        // Fallback: recarregar o script
        const existingScript = document.getElementById('goadopt-script');
        if (existingScript) {
          existingScript.remove();
        }
        const newScript = document.createElement('script');
        newScript.src = 'https://tag.goadopt.io/injector.js?website_code=1d3503e5-6e70-4135-906f-6c9840d27875&t=' + Date.now();
        newScript.async = true;
        newScript.id = 'goadopt-fallback';
        document.head.appendChild(newScript);
      }
    }, 2000);
  };

  const handleScriptError = (e: any) => {
    console.error('❌ [GOADOPT] Erro ao carregar script:', e);
    
    if (retryCount < maxRetries) {
      console.log(`🔄 [GOADOPT] Tentativa ${retryCount + 1}/${maxRetries}...`);
      setRetryCount(prev => prev + 1);
      
      // Fallback em caso de erro
      const fallbackScript = document.createElement('script');
      fallbackScript.src = 'https://tag.goadopt.io/injector.js?website_code=1d3503e5-6e70-4135-906f-6c9840d27875&t=' + Date.now();
      fallbackScript.async = true;
      fallbackScript.id = 'goadopt-error-fallback';
      document.head.appendChild(fallbackScript);
    } else {
      console.error('❌ [GOADOPT] Máximo de tentativas atingido');
    }
  };

  // Verificação adicional após o carregamento
  useEffect(() => {
    if (scriptLoaded) {
      const checkGoAdopt = () => {
        if (typeof window !== 'undefined' && (window as any).adopt) {
          console.log('✅ [GOADOPT] GoAdopt detectado no window!');
        } else {
          console.log('⚠️ [GOADOPT] GoAdopt não encontrado no window');
          // Verificar elementos no DOM
          const adoptElements = document.querySelectorAll('[class*="adopt"], [id*="adopt"], [data-adopt]');
          console.log('🔍 [GOADOPT] Elementos GoAdopt no DOM:', adoptElements.length);
          if (adoptElements.length > 0) {
            console.log('✅ [GOADOPT] Elementos GoAdopt encontrados!');
          } else {
            console.log('❌ [GOADOPT] Nenhum elemento GoAdopt encontrado');
          }
        }
      };

      // Verificação inicial
      setTimeout(checkGoAdopt, 3000);
      
      // Verificação adicional após 10 segundos
      setTimeout(checkGoAdopt, 10000);
    }
  }, [scriptLoaded]);

  return (
    <Script
      src="https://tag.goadopt.io/injector.js?website_code=1d3503e5-6e70-4135-906f-6c9840d27875"
      strategy="afterInteractive"
      id="goadopt-script"
      onLoad={handleScriptLoad}
      onError={handleScriptError}
    />
  );
}
