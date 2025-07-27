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
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <Link href="/" className="logo-container" title="OLV Internacional">
                        <OptimizedImage
              src="/images/olv-logo.jpeg" 
              alt="OLV Internacional" 
              width={56} 
              height={56} 
              className="logo-background"
              priority={true}
              quality={90}
            />
            <div className="logo-frame"></div>
          </Link>
          <span className="slogan desktop-only">
            Integramos Estratégia,<br />
            Operação e Resultado
          </span>
        </div>

        <div className="header-center">
          <nav className="nav-menu">
            <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`} data-page="home">Home</Link>
            <Link href="/sobre" className={`nav-item ${isActive('/sobre') ? 'active' : ''}`} data-page="sobre">Sobre</Link>
            <Link href="/solucoes" className={`nav-item ${isActive('/solucoes') ? 'active' : ''}`} data-page="solucoes">Soluções</Link>
            
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
            
            <Link href="/blog" className={`nav-item ${isActive('/blog') ? 'active' : ''}`} data-page="blog">Blog</Link>
            <Link href="/faq" className={`nav-item ${isActive('/faq') ? 'active' : ''}`} data-page="faq">FAQ</Link>
            <Link href="/contato" className={`nav-item ${isActive('/contato') ? 'active' : ''}`} data-page="contato">Contato</Link>
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

          {/* Ícone menu mobile elegante */}
          <button
            className={`hamburger-circle-container mobile-only ${navOpen ? 'active' : ''}`}
            aria-label="Abrir menu principal"
            onClick={() => setNavOpen(!navOpen)}
          >
            <div className="hamburger-glass-icon">
              <div className="hamburger-line glass-line-1"></div>
              <div className="hamburger-line glass-line-2"></div>
              <div className="hamburger-line glass-line-3"></div>
            </div>
          </button>
        </div>
      </header>

      {/* Overlay nav mobile */}
      <nav className={`nav-menu-mobile md:hidden ${navOpen ? 'show' : ''}`}>
        <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Home</Link>
        <Link href="/sobre" className={`nav-item ${isActive('/sobre') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Sobre</Link>
        <Link href="/solucoes" className={`nav-item ${isActive('/solucoes') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Soluções</Link>
        <Link href="/radar360" className={`nav-item ${isActive('/radar360') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Radar 360</Link>
        <Link href="/blog" className={`nav-item ${isActive('/blog') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Blog</Link>
        <Link href="/faq" className={`nav-item ${isActive('/faq') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>FAQ</Link>
        <Link href="/contato" className={`nav-item ${isActive('/contato') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Contato</Link>
      </nav>

      {/* Overlay search mobile */}
      <div className={`search-overlay-mobile md:hidden ${searchOpen ? 'show' : ''}`}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-on-surface">Buscar</h3>
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 rounded-full hover:bg-surface-light transition-colors"
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