'use client';
import { forwardRef, InputHTMLAttributes } from 'react';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className = '', ...props }, ref) => (
    <input
      ref={ref}
      className={`rounded px-3 py-2 bg-slate-800 border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${className}`.trim()}
      {...props}
    />
  )
);

Input.displayName = 'Input'; 