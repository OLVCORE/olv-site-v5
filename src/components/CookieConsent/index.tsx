"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieConsent: React.FC = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Verifica se o usuário já definiu preferência.
    try {
      const cookieConsent = localStorage.getItem('cookie-consent');
      if (!cookieConsent) {
        setShowConsent(true);
      }
    } catch {
      // Navegador em modo privado (iOS Safari) pode bloquear localStorage.
      // Exibe banner porque ainda não sabemos a preferência.
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    try {
      localStorage.setItem('cookie-consent', 'accepted');
    } catch {
      /* ignore */
    }
    setShowConsent(false);
  };

  const declineCookies = () => {
    try {
      localStorage.setItem('cookie-consent', 'declined');
    } catch {
      /* ignore */
    }
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 shadow-lg z-[2200] border-t-2 border-accent">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-4 text-sm">
          <p>
            Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, 
            personalizar conteúdo e anúncios, e analisar nosso tráfego.{' '}
            <Link href="/politica" className="text-accent hover:underline">
              Saiba mais sobre nossa política de privacidade
            </Link>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={declineCookies}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors text-sm"
          >
            Recusar
          </button>
          <button
            onClick={acceptCookies}
            className="btn btn-primary px-4 py-2 text-sm"
          >
            Aceitar Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent; 