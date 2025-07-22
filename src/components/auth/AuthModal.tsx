"use client";

import React, { useState, useEffect } from 'react';
import AuthCard from './AuthCard';

interface Props { isOpen: boolean; onClose: () => void; }

declare const process: { env: Record<string, string | undefined> };

export default function AuthModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-[4000] p-4">
      <AuthCard mode={mode} onModeChange={setMode} onClose={onClose} />
    </div>
  );
} 