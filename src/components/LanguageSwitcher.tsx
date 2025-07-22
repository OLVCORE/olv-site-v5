'use client';
import React from 'react';

const labels: Record<string, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
  zh: '中文',
};

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  // Temporarily disabled - will be reimplemented later
  return (
    <div className={`nav-item bg-transparent px-2 py-1 text-sm ${className}`}>
      PT
    </div>
  );
} 