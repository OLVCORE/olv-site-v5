"use client";
import React from 'react';
import SpecialistButton from '../layout/SpecialistButton';

interface Props {
  quotes: React.ReactNode;
  calculator: React.ReactNode;
  guide: React.ReactNode;
}

export default function SimLayout({ quotes, calculator, guide }: Props) {
  return (
    <div className="container mx-auto max-w-7xl space-y-10">
      <div className="grid gap-8 lg:grid-cols-[10cm_10cm_15cm]">
        <aside>{quotes}</aside>
        <section className="col-span-2 lg:col-start-2 lg:col-span-2">{calculator}</section>
      </div>
      <section>{guide}</section>

      {/* Floating specialist button (bottom-left) disponível em todos os simuladores */}
      <SpecialistButton position="bottom-left" />
    </div>
  );
} 