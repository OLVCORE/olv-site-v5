/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações de performance
  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Headers de segurança e cache para melhorar Best Practices e Performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          // Headers adicionais para melhorar Best Practices
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Expect-CT',
            value: 'max-age=86400, enforce',
          },
        ],
      },
      // Cache otimizado para assets estáticos
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache otimizado para imagens
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache otimizado para CSS
      {
        source: '/css/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache otimizado para ícones
      {
        source: '/icons/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache moderado para páginas HTML
      {
        source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },

  // Otimizações de performance
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 ano
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tag.goadopt.io https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://googleads.g.doubleclick.net https://vercel.live; connect-src 'self' 'unsafe-inline' https://tag.goadopt.io https://disclaimer-api.goadopt.io https://axeptio-api.goadopt.io https://stats.g.doubleclick.net https://www.google-analytics.com https://analytics.google.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com; frame-src 'self' 'unsafe-inline' https://tag.goadopt.io https://www.googletagmanager.com https://www.google.com https://vercel.live; img-src 'self' 'unsafe-inline' data: blob: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' 'unsafe-inline' data: https:;",
  },

  // Compressão
  compress: true,

  // Otimizações de bundle AGRESSIVAS
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Code splitting agressivo
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 10000,
        maxSize: 100000, // Reduzido drasticamente
        cacheGroups: {
          // Separar bibliotecas pesadas
          framerMotion: {
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            name: 'framer-motion',
            chunks: 'all',
            priority: 20,
          },
          charts: {
            test: /[\\/]node_modules[\\/](recharts|chart\.js|react-chartjs-2)[\\/]/,
            name: 'charts',
            chunks: 'all',
            priority: 20,
          },
          pdf: {
            test: /[\\/]node_modules[\\/](jspdf|html2canvas)[\\/]/,
            name: 'pdf-libs',
            chunks: 'all',
            priority: 20,
          },
          three: {
            test: /[\\/]node_modules[\\/]@react-three[\\/]/,
            name: 'three-js',
            chunks: 'all',
            priority: 20,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            maxSize: 50000,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
            maxSize: 30000,
          },
        },
      };
      
      // Tree shaking agressivo
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.optimization.providedExports = true;
      
      // Remover código morto
      config.optimization.minimize = true;
    }
    return config;
  },
};

module.exports = nextConfig;