"use client";

import React, { useState, useEffect } from 'react';
import Header from './Header/index';
import Sidebar from './Sidebar/index';
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

    // Show page after 200ms for transition effect
    const pageTimer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 200);
    
    return () => {
      clearTimeout(pageTimer);
    };
  }, []);

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
        {/* Beta Version Box - only on platform pages */}
        {isPlatformPage || isCurrentPagePlatform ? <BetaVersion /> : null}
        
        <main className={`main-content ${isPageLoaded ? 'fade-in' : ''} min-h-screen pb-36`}>
          {children}
        </main>
        
        {/* highlight search term inside page */}
        <SearchHighlighter />
        
        {/* Espaçamento para o footer universal */}
        <div className="h-12"></div>
      </div>
    </div>
  );
};

export default MainLayout; 