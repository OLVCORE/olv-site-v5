"use client";
import { ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: 'sm' | 'md' | 'lg';
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

const baseClasses =
  "inline-flex items-center justify-center rounded-md bg-[#d4af37] text-black font-semibold transition-all duration-300 border border-transparent hover:bg-transparent hover:text-[#d4af37] hover:border-[#d4af37] focus:outline-none focus:ring-2 focus:ring-[#d4af37]";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ size = 'md', className = '', ...props }, ref) => (
  <button ref={ref} className={`${baseClasses} ${sizeClasses[size]} ${className}`.trim()} {...props} />
));

Button.displayName = 'Button'; 