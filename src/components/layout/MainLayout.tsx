"use client";

import React, { useState, useEffect } from 'react';
import Header from './Header/index';
import Sidebar from './Sidebar/index';
import Ticker from './Ticker';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import BetaVersion from './BetaVersion';
import SearchHighlighter from '../SearchHighlighter';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  isPlatformPage?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  className = '',
  isPlatformPage = false 
}) => {
  const [theme] = useState<'dark'>('dark'); // Sempre tema escuro
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  const pathname = usePathname();
  
  // Check if current page is a platform page
  const isCurrentPagePlatform = [
    '/stratevo', 
    '/exceltta', 
    '/connecta', 
    '/engage', 
    '/mecs'
  ].includes(pathname);

  useEffect(() => {
    // Força sempre tema escuro
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');

    // Show page after 200ms for transition effect
    const pageTimer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 200);
    
    return () => {
      clearTimeout(pageTimer);
    };
  }, []);

  // Função vazia para compatibilidade
  const toggleTheme = () => {};

  return (
    <div className={`app-container ${className} ${isPageLoaded ? 'loaded' : ''}`}>
      {/* Sidebar desativado temporariamente - mantido para uso futuro */}
      <Sidebar />
      <div className="content-wrapper">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Ticker />
        
        {/* Beta Version Box - only on platform pages and below ticker */}
        {isPlatformPage || isCurrentPagePlatform ? <BetaVersion /> : null}
        
        <main className={`main-content ${isPageLoaded ? 'fade-in' : ''}`}>
          {children}
        </main>
        
        {/* highlight search term inside page */}
        <SearchHighlighter />
      </div>
      
      {/* Footer Universal - Sempre visível no final das páginas */}
      <Footer />
    </div>
  );
};

export default MainLayout; 