"use client";
import React, { useEffect } from 'react';

export default function FreightSimWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('freight-sim');
    return () => {
      document.body.classList.remove('freight-sim');
    };
  }, []);
  return <>{children}</>;
} 