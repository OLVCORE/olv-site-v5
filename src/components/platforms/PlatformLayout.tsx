"use client";

import React, { useState, useEffect } from 'react';
// Sidebar removed completely
import Header from '../layout/Header';
import Ticker from '../layout/Ticker';
import WhatsAppButton from '../layout/WhatsAppButton';
import PlatformHero from './PlatformHero';
import { usePathname } from 'next/navigation';
import BetaVersion from '../layout/BetaVersion';

interface PlatformLayoutProps {
  children?: React.ReactNode;
  platformName: string;
  platformLogo: string;
  platformDescription: string;
  platformIntro?: string;
  platformColor?: string;
}

const PlatformLayout: React.FC<PlatformLayoutProps> = ({
  children,
  platformName,
  platformLogo,
  platformDescription,
  platformIntro,
  platformColor = '#0a2463', // Default color - dark blue
}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const pathname = usePathname();
  
  // Get platform name from path for CSS class
  const platformKey = pathname?.split('/')[1]?.toLowerCase() || '';

  // Initialize theme from localStorage or default to dark
  useEffect(() => {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // If saved theme exists, use it, otherwise keep dark
    if (savedTheme) {
      setTheme(savedTheme);
      document.body.classList.remove('theme-light', 'theme-dark');
      document.body.classList.add(`theme-${savedTheme}`);
    }
    
    // Add platform-page class to body
    document.body.classList.add('platform-page');
    
    return () => {
      // Clean up when component unmounts
      document.body.classList.remove('platform-page');
    };
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Remove theme classes from body
    document.body.classList.remove('theme-light', 'theme-dark');
    // Add new theme class
    document.body.classList.add(`theme-${newTheme}`);
    
    // Update meta tag for theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        newTheme === 'dark' ? '#0a0f1d' : '#ffffff'
      );
    }
  };

  return (
    <div className="site-wrapper">
      {/* Sidebar removed completely */}
      
      {/* Main Content Area */}
      <div className="content-wrapper">
        {/* Header */}
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        {/* Ticker */}
        <Ticker />

        {/* Main Content with Platform Styling */}
        <main className="container mx-auto py-8 px-4 pb-24 lg:pb-12">
          {/* Hero card */}
          <PlatformHero
            platformName={platformName}
            platformLogo={platformLogo}
            platformDescription={platformDescription}
            platformIntro={platformIntro}
            platformColor={platformColor}
            isBeta={true}
          />
          <div className="my-6"><BetaVersion /></div>
          
          {/* Apply global platform styling */}
          <style jsx global>{`
            /* Card styling with platform-specific colors */
            .platform-card {
              background-color: var(--color-surface-light);
              border-radius: 0.75rem;
              padding: 1.75rem;
              transition: box-shadow 0.3s ease, transform 0.3s ease;
              box-shadow: var(--card-shadow);
              margin-bottom: 1.5rem;
              border: 1px solid var(--card-border);
              position: relative;
              overflow: hidden;
              color: var(--color-on-surface);
            }
            
            body.theme-light .platform-card {
              background-color: var(--color-surface);
            }
            
            .platform-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 3px;
              background: var(--${platformKey}-color, var(--accent));
              transform: scaleX(0);
              transform-origin: left;
              transition: transform 0.3s ease;
            }
            
            .platform-card:hover {
              box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
              transform: translateY(-3px);
            }
            
            .platform-card:hover::before {
              transform: scaleX(1);
            }
            
            .platform-card h3 {
              color: var(--accent-dark); /* Gold color for titles */
              font-weight: 600;
              margin-bottom: 0.75rem;
            }
            
            /* Section title styling with platform-specific color */
            .section-title {
              color: var(--accent-dark);
              font-size: 1.75rem;
              font-weight: 700;
              margin-bottom: 1.75rem;
              position: relative;
              padding-bottom: 0.75rem;
            }
            
            .section-title:after {
              content: '';
              position: absolute;
              bottom: 0;
              left: 0;
              width: 80px;
              height: 3px;
              background-color: var(--${platformKey}-color, var(--accent)); 
            }
            
            /* Force proper content flow */
            .content-wrapper {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
            
            main.container {
              flex: 1;
              margin-top: 2rem;
            }
            
            /* Ensure proper spacing between sections */
            section {
              margin-bottom: 4rem;
              clear: both;
            }
            
            /* Inner card styling for nested content */
            .inner-card {
              background-color: var(--inner-card-bg);
              border-radius: 0.5rem;
              padding: 1.25rem;
              margin-top: 1rem;
              border: 1px solid var(--card-border);
              transition: all 0.2s ease;
            }
            
            .inner-card:hover {
              transform: translateY(-2px);
              box-shadow: var(--shadow-md);
            }
          `}</style>
          {children}
        </main>
        
        {/* Espaçamento para o footer universal */}
        <div className="h-12"></div>
      </div>
      
      {/* Floating buttons */}
      <WhatsAppButton position="bottom-right" />
      
      {/* Beta Version Box */}
      <div className="beta-box">
        <div className="beta-version">Versão Beta</div>
        <div className="beta-description">Estamos preparando uma experiência excepcional para impulsionar seu negócio global.</div>
      </div>
    </div>
  );
};

export default PlatformLayout; 