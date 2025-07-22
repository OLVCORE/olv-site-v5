"use client";
import React, { useEffect } from 'react';

export default function ImportSimWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('import-sim');
    return () => {
      document.body.classList.remove('import-sim');
    };
  }, []);
  return <>{children}</>;
} 