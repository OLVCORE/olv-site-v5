"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <footer className="footer-reveal">
      <div className="footer-container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">OLV Internacional</h3>
            <p className="text-sm mb-4 text-gray-300">
              Há mais de 35 anos integrando estratégia, operação e resultado para empresas que querem operar globalmente com segurança e alta performance.
            </p>
            <div className="social-icons flex gap-4 mt-4">
              <a href="https://www.instagram.com/olvinternacional/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors">
                <Image src="/icons/instagram-original.svg" alt="Instagram" width={20} height={20} />
              </a>
              <a href="https://www.linkedin.com/company/olv-internacional/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors">
                <Image src="/icons/linkedin-original.svg" alt="LinkedIn" width={20} height={20} />
              </a>
              <a href="https://www.facebook.com/olvinternacional/" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors">
                <Image src="/icons/facebook-original.svg" alt="Facebook" width={20} height={20} />
              </a>
              <a href="https://twitter.com/olvinternacional" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors">
                <Image src="/icons/twitter-original.svg" alt="X" width={20} height={20} />
              </a>
              <a href="https://www.youtube.com/@olvinternacional" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors">
                <Image src="/icons/youtube-original.svg" alt="YouTube" width={20} height={20} />
              </a>
              <a href="mailto:consultores@olvinternacional.com.br" className="bg-gray-800 p-2 rounded-full hover:opacity-90 transition-colors">
                <Image src="/icons/email-original.svg" alt="E-mail" width={20} height={20} />
              </a>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solucoes" className="text-gray-300 hover:text-white transition-colors">Soluções</Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link href="/radar360" className="text-gray-300 hover:text-white transition-colors">Radar 360</Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-white transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-white transition-colors">Contato</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Plataformas */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Nossas Plataformas</h3>
            <ul className="space-y-2">
              <li className="relative group">
                <Link 
                  href="/stratevo" 
                  className="text-white hover:text-[#d4af37] transition-colors border-b border-transparent hover:border-[#d4af37] inline-block"
                  onMouseEnter={() => setActiveTooltip('stratevo')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  STRATEVO
                </Link>
                {activeTooltip === 'stratevo' && (
                  <div className="absolute left-0 top-full mt-0 bg-blue-900 text-white text-xs p-2 rounded shadow-lg z-10 w-max max-w-[250px] sidebar-tooltip" style={{
                    opacity: 1,
                    visibility: 'visible',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.7)',
                    border: '2px solid #d4af37',
                    animation: 'tooltipGlow 2s infinite'
                  }}>
                    Inteligência de Mercado e Gestão Estratégica
                  </div>
                )}
              </li>
              <li className="relative group">
                <Link 
                  href="/exceltta" 
                  className="text-white hover:text-[#d4af37] transition-colors border-b border-transparent hover:border-[#d4af37] inline-block"
                  onMouseEnter={() => setActiveTooltip('exceltta')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  EXCELTTA
                </Link>
                {activeTooltip === 'exceltta' && (
                  <div className="absolute left-0 top-full mt-0 bg-blue-900 text-white text-xs p-2 rounded shadow-lg z-10 w-max max-w-[250px] sidebar-tooltip" style={{
                    opacity: 1,
                    visibility: 'visible',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.7)',
                    border: '2px solid #d4af37',
                    animation: 'tooltipGlow 2s infinite'
                  }}>
                    Análise de Visão para Tomada de Decisão
                  </div>
                )}
              </li>
              <li className="relative group">
                <Link 
                  href="/connecta" 
                  className="text-white hover:text-[#d4af37] transition-colors border-b border-transparent hover:border-[#d4af37] inline-block"
                  onMouseEnter={() => setActiveTooltip('connecta')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  CONNECTA
                </Link>
                {activeTooltip === 'connecta' && (
                  <div className="absolute left-0 top-full mt-0 bg-blue-900 text-white text-xs p-2 rounded shadow-lg z-10 w-max max-w-[250px] sidebar-tooltip" style={{
                    opacity: 1,
                    visibility: 'visible',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.7)',
                    border: '2px solid #d4af37',
                    animation: 'tooltipGlow 2s infinite'
                  }}>
                    Conexões Seguras com Fornecedores Homologados
                  </div>
                )}
              </li>
              <li className="relative group">
                <Link 
                  href="/engage" 
                  className="text-white hover:text-[#d4af37] transition-colors border-b border-transparent hover:border-[#d4af37] inline-block"
                  onMouseEnter={() => setActiveTooltip('engage')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  ENGAGE
                </Link>
                {activeTooltip === 'engage' && (
                  <div className="absolute left-0 top-full mt-0 bg-blue-900 text-white text-xs p-2 rounded shadow-lg z-10 w-max max-w-[250px] sidebar-tooltip" style={{
                    opacity: 1,
                    visibility: 'visible',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.7)',
                    border: '2px solid #d4af37',
                    animation: 'tooltipGlow 2s infinite'
                  }}>
                    CRM e qualificação de leads inteligente
                  </div>
                )}
              </li>
              <li className="relative group">
                <Link 
                  href="/finx" 
                  className="text-white hover:text-[#d4af37] transition-colors border-b border-transparent hover:border-[#d4af37] inline-block"
                  onMouseEnter={() => setActiveTooltip('finx')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  FINX
                </Link>
                {activeTooltip === 'finx' && (
                  <div className="absolute left-0 top-full mt-0 bg-blue-900 text-white text-xs p-2 rounded shadow-lg z-10 w-max max-w-[250px] sidebar-tooltip" style={{
                    opacity: 1,
                    visibility: 'visible',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.7)',
                    border: '2px solid #d4af37',
                    animation: 'tooltipGlow 2s infinite'
                  }}>
                    Gestão Financeira e Otimização de Fluxo de Caixa
                  </div>
                )}
              </li>
              <li className="relative group">
                <Link 
                  href="/academy" 
                  className="text-white hover:text-[#d4af37] transition-colors border-b border-transparent hover:border-[#d4af37] inline-block"
                  onMouseEnter={() => setActiveTooltip('academy')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  ACADEMY
                </Link>
                {activeTooltip === 'academy' && (
                  <div className="absolute left-0 top-full mt-0 bg-blue-900 text-white text-xs p-2 rounded shadow-lg z-10 w-max max-w-[250px] sidebar-tooltip" style={{
                    opacity: 1,
                    visibility: 'visible',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.7)',
                    border: '2px solid #d4af37',
                    animation: 'tooltipGlow 2s infinite'
                  }}>
                    Educação Corporativa e Desenvolvimento de Talentos
                  </div>
                )}
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-accent">Contato</h3>
            
            <div className="grid gap-4">
              {/* Endereço */}
              <div className="flex">
                <FaMapMarkerAlt className="text-accent mt-1 mr-3 flex-shrink-0" size={18} />
                <div>
                  <p className="text-sm text-white font-semibold mb-1">Endereço:</p>
                  <p className="text-sm text-gray-300">
                    Avenida Paulista, 1471 - Conj 1110<br />
                    CEP 01311-927 - Bela Vista<br />
                    São Paulo - SP
                  </p>
                </div>
              </div>
              
              {/* Telefone */}
              <div className="flex">
                <FaPhone className="text-accent mt-1 mr-3 flex-shrink-0" size={16} />
                <div>
                  <p className="text-sm text-white font-semibold mb-1">Telefone:</p>
                  <div className="flex items-center">
                    <p className="text-sm text-gray-300">+55 11 2675 1446</p>
                  </div>
                </div>
              </div>
              
              {/* WhatsApp */}
              <div className="flex">
                <FaWhatsapp className="text-accent mt-1 mr-3 flex-shrink-0" size={16} />
                <div>
                  <p className="text-sm text-white font-semibold mb-1">WhatsApp:</p>
                  <div className="flex items-center">
                    <a 
                      href="https://wa.me/5511999244444?text=Olá! Vim do site da OLV Internacional e gostaria de saber mais sobre os serviços de comércio exterior." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      +55 11 99924-4444
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Email - Consultas */}
              <div className="flex">
                <FaEnvelope className="text-accent mt-1 mr-3 flex-shrink-0" size={16} />
                <p className="text-sm text-white">
                  <span className="font-semibold">Projetos:</span> 
                  <a href="mailto:consultores@olvinternacional.com.br" className="ml-1 text-gray-300 hover:text-white transition-colors">
                    consultores@olvinternacional.com.br
                  </a>
                </p>
              </div>
              
              {/* Email - Vendas */}
              <div className="flex">
                <FaEnvelope className="text-accent mt-1 mr-3 flex-shrink-0" size={16} />
                <p className="text-sm text-white">
                  <span className="font-semibold">Atendimento:</span> 
                  <a href="mailto:consultores@olvinternacional.com.br" className="ml-1 text-gray-300 hover:text-white transition-colors">
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
              <div className="flex gap-4">
                <Link href="/politica" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Política de Privacidade
                </Link>
                <span className="text-gray-600">|</span>
                <Link href="/termos" className="text-xs text-gray-400 hover:text-white transition-colors">
                  Termos de Uso
                </Link>
              </div>
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