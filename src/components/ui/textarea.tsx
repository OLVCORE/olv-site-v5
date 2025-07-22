'use client';
import { forwardRef, TextareaHTMLAttributes } from 'react';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = '', ...props }, ref) => (
    <textarea
      ref={ref}
      className={`rounded px-3 py-2 bg-slate-800 border-slate-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${className}`.trim()}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea'; 