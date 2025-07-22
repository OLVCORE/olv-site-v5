"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface DropdownMenuProps {
  label: string;
  items: DropdownItem[];
  className?: string;
  mainHref?: string; // Link principal para o cabeçalho do dropdown
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, items, className = '', mainHref = '#' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // Delay maior para permitir mover o mouse para o dropdown
  };

  const handleItemClick = () => {
    // Fecha o dropdown após um pequeno delay para permitir que o link seja processado
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleMainLinkClick = (e: React.MouseEvent) => {
    // Se o dropdown estiver aberto, fecha ao clicar no link principal
    if (isOpen) {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div 
      className={`relative ${className}`} 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link 
        href={mainHref}
        className="nav-item flex items-center gap-1 hover:text-[#d4af37] transition-colors duration-200"
        onClick={handleMainLinkClick}
      >
        {label}
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-2 w-80 bg-white dark:bg-[#1a2338] rounded-lg shadow-xl border border-gray-200 dark:border-[#2a3448] z-50 py-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {items.map((item, index) => (
            <div key={index} className="relative">
              <Link
                href={item.href}
                className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-[#0a0f1d] transition-colors duration-150 group block w-full"
                onClick={handleItemClick}
              >
                {item.icon && (
                  <div className="flex-shrink-0 w-8 h-8 bg-[#d4af37]/10 rounded-lg flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors duration-150">
                    {item.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white group-hover:text-[#d4af37] transition-colors duration-150">
                    {item.label}
                  </div>
                  {item.description && (
                    <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {item.description}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu; 