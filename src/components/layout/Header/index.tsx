"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import UserMenu from '../UserMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import OptimizedImage from '../../OptimizedImage';

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
      document.body.classList.remove('sidebar-open');
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
      <header className="header-wrapper">
        <div className="header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          {/* Logo + Slogan */}
          <div className="header-brand" style={{ display: 'flex', alignItems: 'center', minWidth: 0, flexShrink: 0, flexBasis: 'auto', gap: '1.5rem', marginLeft: '-1rem' }}>
            <Link href="/" className="header-logo-link" title="OLV Internacional" style={{ display: 'block', minWidth: 0 }}>
              <div className="logo-olv-padrao" style={{ aspectRatio: '1/1', minWidth: 50, minHeight: 50, maxWidth: 88, maxHeight: 88, width: '84px', height: '84px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <OptimizedImage 
                  src="/images/olv-logo.jpeg" 
                  alt="OLV Internacional" 
                  width={84} 
                  height={84} 
                  className="header-logo-img"
                  priority={true}
                  quality={90}
                  style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '50%' }}
                />
              </div>
            </Link>
            <div className="header-slogan" style={{ marginLeft: '0.5rem', whiteSpace: 'normal', wordBreak: 'break-word', fontSize: '1rem', minWidth: 0, flexShrink: 1, lineHeight: 1.3 }}>
              Integramos Estratégia,<br />
              Operação e Resultado
            </div>
          </div>

          {/* Menu Principal - Visible only on desktop */}
          <div className="flex items-center gap-6" style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}>
            {/* Buscar (desktop only) */}
            <div className="desktop-only">
              <GlobalSearch />
            </div>

            <nav className="nav-menu desktop-only">
              <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`} data-page="home">Home</Link>
              <Link href="/sobre" className={`nav-item ${isActive('/sobre') ? 'active' : ''}`} data-page="sobre">Sobre</Link>
              <Link href="/solucoes" className={`nav-item ${isActive('/solucoes') ? 'active' : ''}`} data-page="solucoes">Soluções</Link>
              <Link href="/ecossistema" className={`nav-item ${isActive('/ecossistema') ? 'active' : ''}`} data-page="ecossistema">Ecossistema</Link>
              <Link href="/radar360" className={`nav-item ${isActive('/radar360') ? 'active' : ''}`} data-page="radar360">Radar 360</Link>
              <Link href="/blog" className={`nav-item ${isActive('/blog') ? 'active' : ''}`} data-page="blog">Blog</Link>
              <Link href="/faq" className={`nav-item ${isActive('/faq') ? 'active' : ''}`} data-page="faq">FAQ</Link>
              <Link href="/contato" className={`nav-item ${isActive('/contato') ? 'active' : ''}`} data-page="contato">Contato</Link>
            </nav>

            {/* Language switcher desktop */}
            <LanguageSwitcher className="desktop-only" />
          </div>

          {/* User Menu (avatar + settings) */}
          <UserMenu />

          {/* Botão BUSCAR – apenas mobile (ação futura) */}
          <button
            className="mobile-search-toggle md:hidden flex items-center justify-center ml-2"
            aria-label="Abrir busca"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>

          {/* Botão MENU Principal – mobile */}
          <button
            className="mobile-nav-toggle md:hidden flex items-center justify-center"
            aria-label="Abrir menu principal"
            onClick={() => setNavOpen(!navOpen)}
          >
            <span className="sr-only">Menu</span>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="toggle-label">Menu</span>
          </button>
        </div>
      </header>

      {/* Overlay nav mobile */}
      { /* usa portal root para overlay se quiser, mas simples div */ }
      <nav className={`nav-menu-mobile md:hidden ${navOpen ? 'show' : ''}`}>
        <Link href="/" className={`nav-item ${isActive('/') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Home</Link>
        <Link href="/sobre" className={`nav-item ${isActive('/sobre') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Sobre</Link>
        <Link href="/solucoes" className={`nav-item ${isActive('/solucoes') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Soluções</Link>
        <Link href="/ecossistema" className={`nav-item ${isActive('/ecossistema') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Ecossistema</Link>
        <Link href="/radar360" className={`nav-item ${isActive('/radar360') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Radar 360</Link>
        <Link href="/blog" className={`nav-item ${isActive('/blog') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Blog</Link>
        <Link href="/faq" className={`nav-item ${isActive('/faq') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>FAQ</Link>
        <Link href="/contato" className={`nav-item ${isActive('/contato') ? 'active' : ''}`} onClick={() => setNavOpen(false)}>Contato</Link>
        {/* Language switcher mobile */}
        <LanguageSwitcher className="mt-4" />
      </nav>
    </>
  );
};

export default Header;