"use client";
import { ReactNode } from 'react';

const baseCardClasses =
  "group rounded-lg border bg-slate-900/70 backdrop-blur-sm overflow-hidden transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0.35)] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(212,175,55,0.4)] hover:border-[#d4af37]";

export const Card = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`${baseCardClasses} ${className}`.trim()}>
    {/* Accent line */}
    <div className="h-0.5 bg-transparent group-hover:bg-[#d4af37] transition-colors" />
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`p-4 border-b border-white/10 ${className}`.trim()}>{children}</div>
);

export const CardTitle = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <h3 className={`text-lg font-semibold tracking-wide ${className}`.trim()}>{children}</h3>
);

export const CardContent = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`p-4 ${className}`.trim()}>{children}</div>
); 