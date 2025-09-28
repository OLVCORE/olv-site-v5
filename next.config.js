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
  
  // Headers de segurança para melhorar Best Practices
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

  // Otimizações de bundle
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Otimizações para produção
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;