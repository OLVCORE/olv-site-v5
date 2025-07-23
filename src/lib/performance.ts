// Performance optimization configurations
export const PERFORMANCE_CONFIG = {
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    quality: 85,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Cache strategies
  cache: {
    static: 'public, max-age=31536000, immutable',
    dynamic: 'public, max-age=3600, s-maxage=86400',
    api: 'public, max-age=300, s-maxage=3600',
  },
  
  // Preload critical resources
  preload: [
    '/fonts/inter-var.woff2',
    '/css/critical.css',
  ],
  
  // Lazy load thresholds
  lazyLoad: {
    threshold: 0.1,
    rootMargin: '50px',
  },
  
  // Animation performance
  animations: {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Performance monitoring
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'performance', {
      metric_name: metric,
      value: value,
    });
  }
};

// Resource hints
export const getResourceHints = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
  { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' },
];

// Critical CSS classes
export const CRITICAL_CSS_CLASSES = [
  'header',
  'nav-menu',
  'hero',
  'main-content',
  'footer',
]; 