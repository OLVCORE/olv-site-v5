"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Tippy from '@tippyjs/react';
import { FaLayerGroup } from 'react-icons/fa';

const platforms = [
  { 
    name: 'STRATEVO', 
    icon: '/icons/stratevo.svg', 
    href: '/stratevo',
    tooltip: 'Inteligência de Mercado e Gestão Estratégica'
  },
  { 
    name: 'EXCELTTA', 
    icon: '/icons/exceltta-simple.svg', 
    href: '/exceltta',
    tooltip: 'Análise de Visão para Tomada de Decisão'
  },
  { 
    name: 'CONNECTA', 
    icon: '/icons/connecta.svg', 
    href: '/connecta',
    tooltip: 'Conexões Seguras com Fornecedores Homologados'
  },
  { 
    name: 'ENGAGE', 
    icon: '/icons/engage.svg', 
    href: '/engage',
    tooltip: 'CRM e qualificação de leads inteligente'
  },
  { 
    name: 'VERITUS', 
    icon: '/icons/veritus.svg', 
    href: '/veritus',
    tooltip: 'Compliance, Due Diligence e Governança'
  },
  { 
    name: 'FINX', 
    icon: '/icons/finx.svg', 
    href: '/finx',
    tooltip: 'Gestão Financeira e Otimização de Fluxo de Caixa'
  },
  { 
    name: 'VECTOR', 
    icon: '/icons/academy.svg', 
    href: '/academy',
    tooltip: 'Educação Corporativa e Desenvolvimento de Talentos'
  },
  { 
    name: 'LABS', 
    icon: '/icons/labs.svg', 
    href: '/labs',
    tooltip: 'Inovação, Pesquisa e Desenvolvimento com IA'
  },
  { 
    name: 'VENTURES', 
    icon: '/icons/ventures.svg', 
    href: '/ventures',
    tooltip: 'Venture Builder e Aceleração de Startups'
  },
  { 
    name: 'CORE PANNEL', 
    icon: '/icons/core.svg', 
    href: '/core',
    tooltip: 'Cockpit de Gestão 360° e Business Intelligence'
  },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleMouseEnter = () => {};

  const handleMouseLeave = () => {};

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('sidebar-open');
      document.body.classList.remove('nav-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Toggle Button - Only visible on mobile */}
      <button 
        className="mobile-sidebar-toggle flex flex-col items-center justify-center gap-0.5"
        onClick={toggleMobileMenu}
        aria-label="Apps"
      >
        <FaLayerGroup size={24} />
        <span className="toggle-label">Apps</span>
      </button>

      <aside 
        className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''} lg:fixed lg:top-[var(--height-header)] lg:left-0 lg:h-[calc(100vh-var(--height-header))] lg:overflow-y-auto lg:overflow-x-visible lg:z-[2000]`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <nav className="sidebar-nav">
          <div className="sidebar-header-mobile">
            <h3>Plataformas</h3>
            <button 
              onClick={toggleMobileMenu}
              className="close-sidebar-mobile"
              aria-label="Close Platforms Menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>
          <ul>
            {platforms.map((platform) => {
              const isActive = pathname === platform.href;
              return (
                <li key={platform.name}>
                  <Tippy content={platform.tooltip} theme="olv" placement="right" offset={[0,0]}>  
                  <Link 
                    href={platform.href} 
                    className={`sidebar-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Image 
                      src={platform.icon} 
                      alt={`Ícone ${platform.name}`} 
                      width={24} 
                      height={24} 
                      className="sidebar-icon" 
                    />
                    <span className="sidebar-text">{platform.name}</span>
                  </Link>
                  </Tippy>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile - closes sidebar when clicked outside */}
      {isMobileMenuOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
};

export default Sidebar; 