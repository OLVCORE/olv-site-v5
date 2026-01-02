"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import UserMenu from '../UserMenu';
import OptimizedImage from '../../OptimizedImage';
import DropdownMenu from './DropdownMenu';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const GlobalSearch = dynamic(() => import('../../GlobalSearch'), { ssr: false });

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    const current = (pathname ?? '') as string;
    return current === path || ((current as string)?.startsWith(path) && path !== '/');
  };

  // Lock scroll when menu aberto mobile
  useEffect(() => {
    if (navOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('nav-open');
      document.body.classList.remove('search-open');
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('nav-open');
    }
  }, [navOpen]);

  // Lock scroll when search overlay aberto
  useEffect(() => {
    if (searchOpen) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('search-open');
      // Fecha nav se estava aberto
      setNavOpen(false);
    } else {
      document.body.style.overflow = '';
      document.body.classList.remove('search-open');
    }
  }, [searchOpen]);

  return (
    <>
      {/* Header Premium */}
      <header className="header backdrop-blur-xl bg-premium-slate-900/95 shadow-premium border-b border-premium-slate-800/50">
        <div className="header-left">
          <Link href="/" className="logo-container group" title="OLV Internacional">
                        <OptimizedImage
              src="/images/olv-logo.jpeg" 
              alt="OLV Internacional" 
              width={56} 
              height={56} 
              className="logo-background transition-transform duration-300 group-hover:scale-110"
              priority={true}
              quality={90}
            />
            <div className="logo-frame ring-2 ring-premium-cyan-400/30 group-hover:ring-premium-cyan-400/60 transition-all duration-300"></div>
          </Link>
          <span className="slogan desktop-only text-premium-slate-300 group-hover:text-premium-cyan-300 transition-colors">
            Integramos Estratégia,<br />
            Operação e Resultado
          </span>
        </div>

        <div className="header-center">
          <nav className="nav-menu">
            <Link 
              href="/" 
              className={`nav-item font-semibold transition-all duration-300 hover:text-premium-cyan-300 hover:scale-105 ${isActive('/') ? 'active text-premium-cyan-400 font-bold' : 'text-premium-slate-300'}`} 
              data-page="home"
              onClick={(e) => {
                // Garantir que navegação funcione sempre
                console.log('Home clicked');
              }}
            >
              Home
            </Link>
            <Link 
              href="/sobre" 
              className={`nav-item font-semibold transition-all duration-300 hover:text-premium-cyan-300 hover:scale-105 ${isActive('/sobre') ? 'active text-premium-cyan-400 font-bold' : 'text-premium-slate-300'}`} 
              data-page="sobre"
              onClick={(e) => {
                console.log('Sobre clicked');
              }}
            >
              Sobre
            </Link>
            <Link 
              href="/solucoes" 
              className={`nav-item font-semibold transition-all duration-300 hover:text-premium-cyan-300 hover:scale-105 ${isActive('/solucoes') ? 'active text-premium-cyan-400 font-bold' : 'text-premium-slate-300'}`} 
              data-page="solucoes"
              onClick={(e) => {
                console.log('Soluções clicked');
              }}
            >
              Soluções
            </Link>
            
            <DropdownMenu 
              label="Radar 360" 
              mainHref="/radar360"
              items={[
                {
                  label: "Simulador de Custos de Importação",
                  href: "/simuladores/importacao",
                  description: "Calcule impostos, fretes e taxas para sua operação de importação",
                  icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                },
                {
                  label: "Simulador de Custos de Exportação",
                  href: "/simuladores/exportacao",
                  description: "Calcule receita líquida e crédito Reintegra",
                  icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                },
                {
                  label: "Simulador Cambial",
                  href: "/simuladores/cambio",
                  description: "Converta valores entre diferentes moedas com taxas atualizadas",
                  icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>
                },
                {
                  label: "Calculadora de Fretes Internacionais",
                  href: "/simuladores/frete",
                  description: "Estime custos de frete aéreo, marítimo e rodoviário",
                  icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                },
                {
                  label: "Simulador Tributário Comex",
                  href: "/simuladores/tributario-light",
                  description: "Entenda a carga tributária para seus produtos na importação e exportação",
                  icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                },
                {
                  label: "Conversor Peso ⚖️ Volume",
                  href: "/simuladores/cubagem",
                  description: "Calcule peso cubado e otimização de frete internacional",
                  icon: <svg className="w-4 h-4 text-[#d4af37]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                }
              ]}
            />
            
            <Link 
              href="/blog" 
              className={`nav-item font-semibold transition-all duration-300 hover:text-premium-cyan-300 hover:scale-105 ${isActive('/blog') ? 'active text-premium-cyan-400 font-bold' : 'text-premium-slate-300'}`} 
              data-page="blog"
              onClick={(e) => {
                console.log('Blog clicked');
              }}
            >
              Blog
            </Link>
            <Link 
              href="/faq" 
              className={`nav-item font-semibold transition-all duration-300 hover:text-premium-cyan-300 hover:scale-105 ${isActive('/faq') ? 'active text-premium-cyan-400 font-bold' : 'text-premium-slate-300'}`} 
              data-page="faq"
              onClick={(e) => {
                console.log('FAQ clicked');
              }}
            >
              FAQ
            </Link>
            <Link 
              href="/contato" 
              className={`nav-item font-semibold transition-all duration-300 hover:text-premium-cyan-300 hover:scale-105 ${isActive('/contato') ? 'active text-premium-cyan-400 font-bold' : 'text-premium-slate-300'}`} 
              data-page="contato"
              onClick={(e) => {
                console.log('Contato clicked');
              }}
            >
              Contato
            </Link>
          </nav>
        </div>

        <div className="header-right">
          {/* Buscar (desktop only) */}
          <div className="search-container desktop-only">
            <GlobalSearch />
          </div>

          {/* User Menu (avatar + settings) - desktop */}
          <div className="user-menu-wrapper desktop-only">
            <UserMenu />
          </div>

          {/* Ícone menu mobile premium */}
          <button
            className={`hamburger-circle-container mobile-only ${navOpen ? 'active' : ''} bg-premium-slate-800/50 hover:bg-premium-cyan-400/10 backdrop-blur-lg border border-premium-cyan-400/30 shadow-glow transition-all duration-300`}
            aria-label={navOpen ? "Fechar menu principal" : "Abrir menu principal"}
            aria-expanded={navOpen}
            aria-controls="mobile-navigation"
            onClick={() => setNavOpen(!navOpen)}
          >
            <div className="hamburger-glass-icon">
              <div className="hamburger-line glass-line-1 bg-premium-cyan-400"></div>
              <div className="hamburger-line glass-line-2 bg-premium-cyan-400"></div>
              <div className="hamburger-line glass-line-3 bg-premium-cyan-400"></div>
            </div>
          </button>
        </div>
      </header>

      {/* Overlay nav mobile premium */}
      <nav className={`nav-menu-mobile md:hidden ${navOpen ? 'show' : ''} backdrop-blur-xl bg-premium-slate-900/98 shadow-elevated`} id="mobile-navigation">
        <Link href="/" className={`nav-item text-lg font-semibold py-4 transition-all duration-300 hover:text-premium-cyan-300 hover:bg-premium-slate-800/50 rounded-xl ${isActive('/') ? 'active text-premium-cyan-400 bg-premium-slate-800/80 font-bold' : 'text-premium-slate-300'}`} onClick={() => setNavOpen(false)}>Home</Link>
        <Link href="/sobre" className={`nav-item text-lg font-semibold py-4 transition-all duration-300 hover:text-premium-cyan-300 hover:bg-premium-slate-800/50 rounded-xl ${isActive('/sobre') ? 'active text-premium-cyan-400 bg-premium-slate-800/80 font-bold' : 'text-premium-slate-300'}`} onClick={() => setNavOpen(false)}>Sobre</Link>
        <Link href="/solucoes" className={`nav-item text-lg font-semibold py-4 transition-all duration-300 hover:text-premium-cyan-300 hover:bg-premium-slate-800/50 rounded-xl ${isActive('/solucoes') ? 'active text-premium-cyan-400 bg-premium-slate-800/80 font-bold' : 'text-premium-slate-300'}`} onClick={() => setNavOpen(false)}>Soluções</Link>
        <Link href="/radar360" className={`nav-item text-lg font-semibold py-4 transition-all duration-300 hover:text-premium-cyan-300 hover:bg-premium-slate-800/50 rounded-xl ${isActive('/radar360') ? 'active text-premium-cyan-400 bg-premium-slate-800/80 font-bold' : 'text-premium-slate-300'}`} onClick={() => setNavOpen(false)}>Radar 360</Link>
        <Link href="/blog" className={`nav-item text-lg font-semibold py-4 transition-all duration-300 hover:text-premium-cyan-300 hover:bg-premium-slate-800/50 rounded-xl ${isActive('/blog') ? 'active text-premium-cyan-400 bg-premium-slate-800/80 font-bold' : 'text-premium-slate-300'}`} onClick={() => setNavOpen(false)}>Blog</Link>
        <Link href="/faq" className={`nav-item text-lg font-semibold py-4 transition-all duration-300 hover:text-premium-cyan-300 hover:bg-premium-slate-800/50 rounded-xl ${isActive('/faq') ? 'active text-premium-cyan-400 bg-premium-slate-800/80 font-bold' : 'text-premium-slate-300'}`} onClick={() => setNavOpen(false)}>FAQ</Link>
        <Link href="/contato" className={`nav-item text-lg font-semibold py-4 transition-all duration-300 hover:text-premium-cyan-300 hover:bg-premium-slate-800/50 rounded-xl ${isActive('/contato') ? 'active text-premium-cyan-400 bg-premium-slate-800/80 font-bold' : 'text-premium-slate-300'}`} onClick={() => setNavOpen(false)}>Contato</Link>
      </nav>

      {/* Overlay search mobile premium */}
      <div className={`search-overlay-mobile md:hidden ${searchOpen ? 'show' : ''} backdrop-blur-xl bg-premium-slate-900/98 shadow-elevated`}>
        <div className="p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-premium-slate-300">Buscar</h3>
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 sm:p-3 rounded-xl hover:bg-premium-slate-800/50 hover:shadow-glow transition-all duration-300 text-premium-cyan-400"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <GlobalSearch />
        </div>
      </div>
    </>
  );
};

export default Header;