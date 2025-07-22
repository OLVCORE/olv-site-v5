"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Soluções', href: '/solucoes' },
  { name: 'Ecossistema', href: '/ecossistema' },
  { name: 'Radar 360', href: '/radar360' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contato', href: '/contato' },
  { name: 'Política', href: '/politica' }
];

const platformLinks = [
  { name: 'STRATEVO', href: '/stratevo' },
  { name: 'EXCELTTA', href: '/exceltta' },
  { name: 'CONNECTA', href: '/connecta' },
  { name: 'ENGAGE', href: '/engage' },
  { name: 'VERITUS', href: '/veritus' },
  { name: 'FINX', href: '/finx' }
];

const QuickLinks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className="quick-links-toggle"
        onClick={toggleMenu}
        aria-label="Toggle Quick Links"
      >
        <Image 
          src="/icons/menu.svg" 
          alt="Menu" 
          width={24} 
          height={24}
        />
        <span>Links Rápidos</span>
      </button>

      <div className={`quick-links-panel ${isOpen ? 'open' : ''}`}>
        <div className="quick-links-header">
          <h3>Links Rápidos</h3>
          <button 
            onClick={toggleMenu}
            className="close-quick-links"
            aria-label="Close Quick Links"
          >
            <span></span>
            <span></span>
          </button>
        </div>
        
        <div className="quick-links-content">
          <div className="quick-links-section">
            <h4>Navegação</h4>
            <ul>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="quick-link-item"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="quick-links-section">
            <h4>Plataformas</h4>
            <ul>
              {platformLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="quick-link-item"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div 
          className="quick-links-overlay" 
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};

export default QuickLinks; 