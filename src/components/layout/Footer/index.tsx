"use client";

import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

// Memoizar tooltip para melhor performance
const PlatformTooltip = React.memo<{ 
  platform: string; 
  description: string; 
  isVisible: boolean; 
}>(({ platform, description, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div 
      className="absolute left-0 top-full mt-2 bg-blue-900 text-white text-xs p-3 rounded shadow-lg z-10 w-max max-w-[280px] sidebar-tooltip" 
      style={{
        opacity: 1,
        visibility: 'visible',
        boxShadow: '0 0 15px rgba(212, 175, 55, 0.7)',
        border: '2px solid #d4af37',
        animation: 'tooltipGlow 2s infinite'
      }}
      aria-label={`Descrição da plataforma ${platform}`}
    >
      {description}
    </div>
  );
});

PlatformTooltip.displayName = 'PlatformTooltip';

const Footer: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Otimizar handlers com useCallback
  const handleTooltipEnter = useCallback((platform: string) => {
    setActiveTooltip(platform);
  }, []);

  const handleTooltipLeave = useCallback(() => {
    setActiveTooltip(null);
  }, []);

  // Dados das plataformas para melhor manutenção
  const platformData = {
    stratevo: "Inteligência de Mercado e Gestão Estratégica",
    exceltta: "Análise de Visão para Tomada de Decisão",
    connecta: "Conexões Seguras com Fornecedores Homologados",
    engage: "CRM e qualificação de leads inteligente",
    finx: "Gestão Financeira e Otimização de Fluxo de Caixa",
    academy: "Educação Corporativa e Desenvolvimento de Talentos"
  };

  return (
    <footer 
      className="footer-reveal" 
      role="contentinfo" 
      aria-label="Rodapé do site OLV Internacional"
    >
      <div className="footer-container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">OLV Internacional</h3>
            <p className="text-sm mb-4 text-gray-300">
              Há mais de 35 anos integrando estratégia, operação e resultado para empresas que querem operar globalmente com segurança e alta performance.
            </p>
            <div className="social-icons flex gap-4 mt-4" aria-label="Redes sociais">
              <a 
                href="https://www.instagram.com/olvinternacional/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Siga-nos no Instagram"
              >
                <Image src="/icons/instagram-original.svg" alt="Instagram" width={20} height={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/olv-internacional/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Conecte-se conosco no LinkedIn"
              >
                <Image src="/icons/linkedin-original.svg" alt="LinkedIn" width={20} height={20} />
              </a>
              <a 
                href="https://www.facebook.com/olvinternacional/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Curta nossa página no Facebook"
              >
                <Image src="/icons/facebook-original.svg" alt="Facebook" width={20} height={20} />
              </a>
              <a 
                href="https://twitter.com/olvinternacional" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Siga-nos no X (Twitter)"
              >
                <Image src="/icons/twitter-original.svg" alt="X" width={20} height={20} />
              </a>
              <a 
                href="https://www.youtube.com/@olvinternacional" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Inscreva-se no nosso canal do YouTube"
              >
                <Image src="/icons/youtube-original.svg" alt="YouTube" width={20} height={20} />
              </a>
              <a 
                href="mailto:consultores@olvinternacional.com.br" 
                className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
                aria-label="Envie-nos um e-mail"
              >
                <Image src="/icons/email-original.svg" alt="E-mail" width={20} height={20} />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <nav aria-label="Links rápidos do site">
            <h3 className="text-xl font-bold mb-4 text-accent">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/solucoes" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                  aria-label="Ver nossas soluções"
                >
                  Soluções
                </Link>
              </li>
              <li>
                <Link 
                  href="/sobre" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                  aria-label="Saiba mais sobre nós"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link 
                  href="/radar360" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                  aria-label="Acesse o Radar 360"
                >
                  Radar 360
                </Link>
              </li>
              <li>
                <Link 
                  href="/contato" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                  aria-label="Entre em contato conosco"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                  aria-label="Leia nosso blog"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>

          {/* Coluna 3 - Plataformas */}
          <nav aria-label="Nossas plataformas">
            <h3 className="text-xl font-bold mb-4 text-accent">Nossas Plataformas</h3>
            <ul className="space-y-2">
              {Object.entries(platformData).map(([platform, description]) => (
                <li key={platform} className="relative group">
                  <Link 
                    href={`/${platform}`}
                    className="text-white hover:text-[#d4af37] transition-colors border-b border-transparent hover:border-[#d4af37] inline-block focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                    onMouseEnter={() => handleTooltipEnter(platform)}
                    onMouseLeave={handleTooltipLeave}
                    onFocus={() => handleTooltipEnter(platform)}
                    onBlur={handleTooltipLeave}
                    title={description}
                  >
                    {platform.toUpperCase()}
                  </Link>
                  <PlatformTooltip 
                    platform={platform}
                    description={description}
                    isVisible={activeTooltip === platform}
                  />
                </li>
              ))}
            </ul>
          </nav>

          {/* Coluna 4 - Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Contato</h3>
            
            <div className="grid gap-4">
              {/* Endereço */}
              <div className="flex">
                <FaMapMarkerAlt className="text-accent mt-1 mr-3 flex-shrink-0" size={18} aria-hidden="true" />
                <div>
                  <p className="text-sm text-white font-semibold mb-1">Endereço:</p>
                  <address className="text-sm text-gray-300 not-italic">
                    Avenida Paulista, 1471 - Conj 1110<br />
                    CEP 01311-927 - Bela Vista<br />
                    São Paulo - SP
                  </address>
                </div>
              </div>
              
              {/* Telefone */}
              <div className="flex">
                <FaPhone className="text-accent mt-1 mr-3 flex-shrink-0" size={16} aria-hidden="true" />
                <div>
                  <p className="text-sm text-white font-semibold mb-1">Telefone:</p>
                  <div className="flex items-center">
                    <a 
                      href="tel:+551126751446" 
                      className="text-sm text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                      aria-label="Ligue para +55 11 2675 1446"
                    >
                      +55 11 2675 1446
                    </a>
                  </div>
                </div>
              </div>
              
              {/* WhatsApp */}
              <div className="flex">
                <FaWhatsapp className="text-accent mt-1 mr-3 flex-shrink-0" size={16} aria-hidden="true" />
                <div>
                  <p className="text-sm text-white font-semibold mb-1">WhatsApp:</p>
                  <div className="flex items-center">
                    <a 
                      href="https://wa.me/5511999244444?text=Olá! Vim do site da OLV Internacional e gostaria de saber mais sobre os serviços de comércio exterior." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                      aria-label="Envie uma mensagem no WhatsApp"
                    >
                      +55 11 99924-4444
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Email - Projetos */}
              <div className="flex">
                <FaEnvelope className="text-accent mt-1 mr-3 flex-shrink-0" size={16} aria-hidden="true" />
                <p className="text-sm text-white">
                  <span className="font-semibold">Projetos:</span> 
                  <a 
                    href="mailto:consultores@olvinternacional.com.br" 
                    className="ml-1 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                    aria-label="Envie um e-mail para projetos"
                  >
                    consultores@olvinternacional.com.br
                  </a>
                </p>
              </div>
              
              {/* Email - Atendimento */}
              <div className="flex">
                <FaEnvelope className="text-accent mt-1 mr-3 flex-shrink-0" size={16} aria-hidden="true" />
                <p className="text-sm text-white">
                  <span className="font-semibold">Atendimento:</span> 
                  <a 
                    href="mailto:consultores@olvinternacional.com.br" 
                    className="ml-1 text-gray-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                    aria-label="Envie um e-mail para atendimento"
                  >
                    consultores@olvinternacional.com.br
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright e Informações Legais */}
        <div className="border-t border-gray-700 pt-6 mt-4">
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <nav className="flex gap-4" aria-label="Links legais">
                <Link 
                  href="/politica" 
                  className="text-xs text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                  aria-label="Política de privacidade"
                >
                  Política de Privacidade
                </Link>
                <span className="text-gray-600" aria-hidden="true">|</span>
                <Link 
                  href="/termos" 
                  className="text-xs text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded px-1"
                  aria-label="Termos de uso"
                >
                  Termos de Uso
                </Link>
              </nav>
            </div>
            <p className="text-xs text-gray-400 text-center">
              © Copyright - 2025   |   <span className="text-white font-semibold">OLV INTERNACIONAL</span> - CNPJ 67.867.580/0001-90 / Desenvolvido por <span className="text-white font-semibold">OLV CORE DIGITAL</span>  |   All Rights Reserved   |   Powered by OLV Internacional
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 