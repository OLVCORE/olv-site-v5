"use client";

import { lazy, Suspense } from 'react';

// Lazy load dos componentes de animação (Framer Motion - ~200KB)
const LazyAnimatedCard = lazy(() => 
  import('./MicroInteractions').then(module => ({
    default: module.AnimatedCard
  }))
);

const LazyAnimatedButton = lazy(() => 
  import('./MicroInteractions').then(module => ({
    default: module.AnimatedButton
  }))
);

const LazyFadeIn = lazy(() => 
  import('./MicroInteractions').then(module => ({
    default: module.FadeIn
  }))
);

// Componentes estáticos (sem animação) para fallback
const StaticCard = ({ children, className = '', onClick, href, ...props }: any) => {
  const CardComponent = href ? 'a' : 'div';
  return (
    <CardComponent
      href={href}
      onClick={onClick}
      className={`block rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </CardComponent>
  );
};

const StaticButton = ({ children, onClick, className = '', variant = 'primary', size = 'md', disabled = false, loading = false, ...props }: any) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Carregando...' : children}
    </button>
  );
};

const StaticFadeIn = ({ children, ...props }: any) => <div {...props}>{children}</div>;

// Wrappers com Suspense
export const AnimatedCard = (props: any) => (
  <Suspense fallback={<StaticCard {...props} />}>
    <LazyAnimatedCard {...props} />
  </Suspense>
);

export const AnimatedButton = (props: any) => (
  <Suspense fallback={<StaticButton {...props} />}>
    <LazyAnimatedButton {...props} />
  </Suspense>
);

export const FadeIn = (props: any) => (
  <Suspense fallback={<StaticFadeIn {...props} />}>
    <LazyFadeIn {...props} />
  </Suspense>
);

// Componentes estáticos sempre disponíveis
export const LoadingSpinner = ({ size = 'md', color = 'currentColor' }: any) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <div
      className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin`}
      style={{ color }}
    />
  );
};

export const Skeleton = ({ className = '', lines = 1 }: any) => (
  <div className={`animate-pulse ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"
        style={{ 
          width: `${Math.random() * 40 + 60}%`,
          animationDelay: `${i * 0.1}s`
        }}
      />
    ))}
  </div>
);
