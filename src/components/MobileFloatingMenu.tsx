"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileFloatingMenuProps {
  className?: string;
}

const MobileFloatingMenu: React.FC<MobileFloatingMenuProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/solucoes', label: 'Soluções' },
    { href: '/radar360', label: 'Radar 360' },
    { href: '/blog', label: 'Blog' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contato', label: 'Contato' }
  ];

  return (
    <>
      {/* Botão flutuante do menu mobile */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`mobile-menu-floating mobile-only ${className}`}
        aria-label="Abrir menu principal"
        title="Menu Principal"
      >
        {/* Ícone hambúrguer ELEGANTE */}
        <div className="flex flex-col gap-1.5">
          <div className="w-6 h-0.5 bg-[#1a1a1a] rounded-full shadow-sm"></div>
          <div className="w-6 h-0.5 bg-[#1a1a1a] rounded-full shadow-sm"></div>
          <div className="w-6 h-0.5 bg-[#1a1a1a] rounded-full shadow-sm"></div>
        </div>
      </button>

      {/* Menu flutuante mobile */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 mobile-only" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed bottom-24 left-6 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-48">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h3>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileFloatingMenu; 