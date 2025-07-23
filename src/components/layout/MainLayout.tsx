"use client";

import React, { useState, useEffect } from 'react';
import Header from './Header/index';
import Footer from './Footer/index';
import Sidebar from './Sidebar/index';
import Ticker from './Ticker';
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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [showFooter, setShowFooter] = useState(false);
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
    // Detect current body class (for SPA navigations) before applying default
    const bodyHasLight = document.body.classList.contains('theme-light');
    const bodyHasDark = document.body.classList.contains('theme-dark');

    if (bodyHasLight || bodyHasDark) {
      setTheme(bodyHasLight ? 'light' : 'dark');
    } else {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      const initial = savedTheme ?? 'dark';
      setTheme(initial);
      document.body.classList.add(`theme-${initial}`);
    }

    // Show footer after 500ms
    const footerTimer = setTimeout(() => {
      setShowFooter(true);
    }, 500);

    // Show page after 200ms for transition effect
    const pageTimer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 200);
    
    return () => {
      clearTimeout(footerTimer);
      clearTimeout(pageTimer);
    };
  }, []);

  useEffect(() => {
    const updateFooterHeight = () => {
      const footerEl = document.querySelector<HTMLElement>('footer.footer-reveal');
      if (footerEl) {
        document.documentElement.style.setProperty('--footer-height', `${footerEl.offsetHeight}px`);
      }
    };

    updateFooterHeight();
    window.addEventListener('resize', updateFooterHeight);
    return () => window.removeEventListener('resize', updateFooterHeight);
  }, [showFooter]);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Remove current theme class
    document.body.classList.remove('theme-light', 'theme-dark');
    // Add new theme class
    document.body.classList.add(`theme-${newTheme}`);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`app-container ${className} ${isPageLoaded ? 'loaded' : ''}`}>
      {/* Sidebar desativado temporariamente - mantido para uso futuro */}
      <Sidebar />
      <div className="content-wrapper">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <Ticker />
        
        {/* Beta Version Box - only on platform pages and below ticker */}
        {isPlatformPage || isCurrentPagePlatform ? <BetaVersion /> : null}
        
        <main className={`main-content ${isPageLoaded ? 'fade-in' : ''} min-h-screen pb-36`}>
          {children}
        </main>
        
        {/* highlight search term inside page */}
        <SearchHighlighter />
        
        {/* Reduzindo o espaçamento antes do footer para evitar muito espaço */}
        <div className="h-12"></div>
        
        {showFooter && <Footer />}
      </div>
    </div>
  );
};

export default MainLayout; 