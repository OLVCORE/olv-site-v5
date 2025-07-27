"use client";
import React from 'react';
import SpecialistButton from '../layout/SpecialistButton';

interface Props {
  quotes?: React.ReactNode;
  calculator: React.ReactNode;
  guide: React.ReactNode;
}

export default function SimLayout({ quotes, calculator, guide }: Props) {
  return (
    <div className="container mx-auto max-w-[1400px] px-4 space-y-8">
      {/* Layout principal ocupando toda a largura disponível */}
      <div className="w-full">
        {calculator}
      </div>
      
      {/* Guia em seção separada */}
      <section className="w-full">{guide}</section>

      {/* Floating specialist button (bottom-left) disponível em todos os simuladores */}
      <SpecialistButton position="bottom-left" />
    </div>
  );
} 