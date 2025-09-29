import { Inter } from "next/font/google";
import Script from "next/script";
import GoAdoptScript from "@/components/GoAdoptScript";
import "./globals.css";
// GoAdopt já fornece compliance completo LGPD/GDPR
import 'tippy.js/dist/tippy.css';
import { SITE_URL } from '@/lib/siteConfig';
import { LocalBusinessSchema, OrganizationSchema } from '@/components/SeoSchema';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { WebVitals } from '@/components/analytics/WebVitals';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import MobileFloatingMenu from '@/components/MobileFloatingMenu';
import IntentionDetector from '@/components/seo/IntentionDetector';
// Internationalization temporarily disabled

const inter = Inter({ subsets: ["latin"] });

// SISTEMA DE SEO OTIMIZADO PARA GOOGLE AI MODE
// Foco na INTENÇÃO DO USUÁRIO ao invés de palavras-chave tradicionais
import { getAllKeywords } from '@/lib/seoKeywords';

// Palavras-chave contextuais para intenção (não mais exatas)
const keywordsList = getAllKeywords();

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OLV Internacional – Integramos Estratégia, Operação e Resultado',
    template: '%s | OLV Internacional'
  },
  description: 'Resolvemos seus problemas de comércio exterior com soluções práticas e resultados comprovados. 35 anos de experiência em multinacionais. Reduza custos, otimize processos e transforme sua empresa em exportadora. Consultoria transparente, preços claros, sem surpresas.',
  keywords: keywordsList + ', Consultoria em exportação, Consultoria em importação, Exportação de produtos, Logística internacional, 3PL, 4PL',
  authors: [{ name: 'OLV Internacional' }],
  creator: 'OLV Internacional',
  publisher: 'OLV Internacional',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'OLV Internacional – Integramos Estratégia, Operação e Resultado',
    description: 'Consultoria premium em Supply Chain, Comércio Exterior, Logística Internacional e Desenvolvimento de Negócios.',
    url: SITE_URL,
    siteName: 'OLV Internacional',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'OLV Internacional'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OLV Internacional',
    description: 'Consultoria premium em Supply Chain, Comércio Exterior, Logística Internacional e Desenvolvimento de Negócios.',
    images: [`${SITE_URL}/og-image.jpg`]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Internationalization temporarily disabled
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager - Convertido para Next.js Script */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T3P68DR');`
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Critical CSS Inline - Melhora LCP */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS para LCP otimizado */
            body { margin: 0; font-family: ${inter.style.fontFamily}; }
            .container { max-width: 1200px; margin: 0 auto; padding: 0 1rem; }
            .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; }
            .btn-primary { background: #d4af37; color: #000; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: 600; }
            .btn-primary:hover { background: #b8941f; }
            .glass { background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); }
            .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
            .card-hover:hover { transform: translateY(-4px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
            .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
            .animate-spin { animation: spin 1s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
            .rounded-xl { border-radius: 0.75rem; }
            .text-accent { color: #d4af37; }
            .bg-accent { background-color: #d4af37; }
            .border-accent { border-color: #d4af37; }
            .hover\\:bg-accent:hover { background-color: #b8941f; }
            .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
            .duration-300 { transition-duration: 300ms; }
            .opacity-60 { opacity: 0.6; }
            .opacity-100 { opacity: 1; }
            .flex { display: flex; }
            .items-center { align-items: center; }
            .justify-center { justify-content: center; }
            .justify-between { justify-content: space-between; }
            .gap-2 { gap: 0.5rem; }
            .gap-4 { gap: 1rem; }
            .p-6 { padding: 1.5rem; }
            .px-4 { padding-left: 1rem; padding-right: 1rem; }
            .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
            .mb-4 { margin-bottom: 1rem; }
            .mb-6 { margin-bottom: 1.5rem; }
            .text-white { color: #ffffff; }
            .text-gray-900 { color: #111827; }
            .text-gray-300 { color: #d1d5db; }
            .text-gray-100 { color: #f3f4f6; }
            .bg-gray-900 { background-color: #111827; }
            .bg-gray-800 { background-color: #1f2937; }
            .bg-gray-700 { background-color: #374151; }
            .border-gray-200 { border-color: #e5e7eb; }
            .border-gray-700 { border-color: #374151; }
            .font-bold { font-weight: 700; }
            .font-semibold { font-weight: 600; }
            .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
            .text-xl { font-size: 1.25rem; line-height: 1.75rem; }
            .text-2xl { font-size: 1.5rem; line-height: 2rem; }
            .text-3xl { font-size: 1.875rem; line-height: 2.25rem; }
            .w-6 { width: 1.5rem; }
            .h-6 { height: 1.5rem; }
            .w-8 { width: 2rem; }
            .h-8 { height: 2rem; }
            .min-h-screen { min-height: 100vh; }
            .max-w-7xl { max-width: 80rem; }
            .mx-auto { margin-left: auto; margin-right: auto; }
            .overflow-hidden { overflow: hidden; }
            .cursor-pointer { cursor: pointer; }
            .relative { position: relative; }
            .absolute { position: absolute; }
            .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
            .pointer-events-none { pointer-events: none; }
            .border-2 { border-width: 2px; }
            .border-4 { border-width: 4px; }
            .border-gray-300 { border-color: #d1d5db; }
            .border-t-blue-600 { border-top-color: #2563eb; }
            .rounded-full { border-radius: 9999px; }
            .text-center { text-align: center; }
            .text-sm { font-size: 0.875rem; line-height: 1.25rem; }
            .leading-relaxed { line-height: 1.625; }
            .list-decimal { list-style-type: decimal; }
            .pl-4 { padding-left: 1rem; }
            .space-y-2 > * + * { margin-top: 0.5rem; }
            .space-y-4 > * + * { margin-top: 1rem; }
            .space-y-8 > * + * { margin-top: 2rem; }
            .inline-flex { display: inline-flex; }
            .block { display: block; }
            .hidden { display: none; }
            .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0; }
            /* Accessibility improvements */
            :focus-visible { outline: 2px solid #d4af37; outline-offset: 2px; }
            .focus\\:ring-2:focus { box-shadow: 0 0 0 2px #d4af37; }
            .focus\\:outline-none:focus { outline: 2px solid #d4af37; outline-offset: 2px; }
            button:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible { outline: 2px solid #d4af37; outline-offset: 2px; }
            /* High contrast text for better accessibility */
            .text-gray-600 { color: #374151; }
            .text-gray-500 { color: #6b7280; }
            .text-gray-400 { color: #9ca3af; }
            @media (min-width: 768px) { .md\\:flex { display: flex; } .md\\:hidden { display: none; } }
            @media (min-width: 1024px) { .lg\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
          `
        }} />
        
        {/* CSP Meta Tag para GoAdopt - SEGURA */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tag.goadopt.io https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com https://googleads.g.doubleclick.net https://vercel.live; connect-src 'self' 'unsafe-inline' https://tag.goadopt.io https://disclaimer-api.goadopt.io https://axeptio-api.goadopt.io https://stats.g.doubleclick.net https://www.google-analytics.com https://analytics.google.com https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com; frame-src 'self' 'unsafe-inline' https://tag.goadopt.io https://www.googletagmanager.com https://www.google.com https://vercel.live; img-src 'self' 'unsafe-inline' data: blob: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' 'unsafe-inline' data: https:;" />
        
        {/* ▶ Go Adopt LGPD - IMPLEMENTAÇÃO CORRETA APP ROUTER ▶ */}
        <meta name="adopt-website-id" content="1d3503e5-6e70-4135-906f-6c9840d27875" />
        
        {/* Script de controle do comportamento GoAdopt - Convertido para Next.js Script */}
        <Script
          id="goadopt-control"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                // Aguarda o SDK injetar o ícone e o banner no DOM
                const iconInterval = setInterval(() => {
                  const icon = document.querySelector('.adopt-injector-icon');
                  const banner = document.querySelector('.adopt-banner');
                  if (icon && banner) {
                    clearInterval(iconInterval);
                    console.log('🎯 [GOADOPT] Ícone e banner encontrados, configurando comportamento...');
                    // Quando o ícone for clicado, alterna a classe que mostra o banner
                    icon.addEventListener('click', () => {
                      console.log('🖱️ [GOADOPT] Ícone clicado, alternando banner...');
                      banner.classList.toggle('show-banner');
                    });
                  }
                }, 200);
                
                // Timeout de segurança
                setTimeout(() => {
                  clearInterval(iconInterval);
                }, 10000);
              });
            `
          }}
        />
        {/* ◀ Fim Go Adopt Meta ▶ */}
        
        <meta name="keywords" content={keywordsList} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload otimizado - recursos críticos para performance */}
        <link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/icons/calculator.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/info.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/icons/weight.svg" as="image" type="image/svg+xml" />
        {/* BANNER-HOME.jpeg removido do preload pois já tem priority={true} no componente */}
        
        {/* Carregamento não-bloqueante do CSS legado */}
        <link rel="stylesheet" href="/css/style.css" media="screen and (min-width: 769px)" />

        {/* Structured Data para SEO otimizado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "OLV Internacional",
              "url": "https://olvinternacional.com.br",
              "logo": "https://olvinternacional.com.br/images/logo.png",
              "description": "Consultoria especializada em Supply Chain Global e Comércio Exterior para empresas industriais",
              "foundingDate": "1989",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "BR",
                "addressRegion": "São Paulo",
                "addressLocality": "São Paulo"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-11-99999-9999",
                "contactType": "customer service",
                "availableLanguage": "Portuguese"
              },
              "sameAs": [
                "https://www.linkedin.com/company/olv-internacional",
                "https://www.instagram.com/olvinternacional"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Serviços de Comércio Exterior",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Consultoria em Importação",
                      "description": "Consultoria especializada em importação para empresas industriais"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Consultoria em Exportação",
                      "description": "Consultoria especializada em exportação para empresas industriais"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Logística Internacional",
                      "description": "Soluções em logística internacional e supply chain"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Metadados adicionais para otimização de intenção do usuário */}
        <meta name="author" content="OLV Internacional" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="pt-BR" />
        <meta name="geo.region" content="BR" />
        <meta name="geo.placename" content="São Paulo" />
        <meta name="geo.position" content="-23.5505;-46.6333" />
        <meta name="ICBM" content="-23.5505, -46.6333" />
        
        {/* Google Search Console Verification - ATUALIZAR COM CÓDIGO REAL */}
        <meta name="google-site-verification" content="SEU_CODIGO_DE_VERIFICACAO_AQUI" />
        
        {/* Bing Webmaster Tools */}
        <meta name="msvalidate.01" content="SEU_CODIGO_BING_AQUI" />
        
        {/* Yandex Webmaster */}
        <meta name="yandex-verification" content="SEU_CODIGO_YANDEX_AQUI" />


        {/* Open Graph para compartilhamento em redes sociais */}
        <meta property="og:title" content={metadata.title.default} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/images/olv-logo.jpeg`} />
        <meta property="og:locale" content="pt_BR" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title.default} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={`${SITE_URL}/images/olv-logo.jpeg`} />

        {/* Schema.org Markup for Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "OLV Internacional",
              "description": "Consultoria especializada em comércio exterior, importação, exportação e logística internacional para PMEs",
              "url": SITE_URL,
              "logo": `${SITE_URL}/images/olv-logo.jpeg`,
              "sameAs": [
                "https://www.linkedin.com/company/26251289/admin/dashboard/",
                "https://www.instagram.com/olvinternacional",
                "https://www.facebook.com/olvinternacional"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+55-11-2675-1446",
                "contactType": "customer service",
                "email": "consultores@olvinternacional.com.br",
                "areaServed": "BR"
              }
            })
          }}
        />

        {/* LocalBusiness Schema */}
        <LocalBusinessSchema />

        {/* Organization Schema */}
        <OrganizationSchema />

        {/* Schema para FAQ - Aumenta as chances de featured snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Como iniciar a exportação de produtos do Brasil?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Para iniciar a exportação de produtos do Brasil, é necessário obter um Radar SISCOMEX, realizar a habilitação da empresa junto à Receita Federal, definir a classificação fiscal (NCM) dos produtos, e estruturar a operação logística e cambial. A OLV Internacional oferece consultoria completa, do Radar SISCOMEX ao embarque."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Como reduzir custos na importação?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Para reduzir custos na importação, recomenda-se: realizar planejamento tributário adequado, avaliar benefícios fiscais disponíveis, otimizar a logística internacional, buscar fornecedores confiáveis, e estruturar operacionalmente o processo. A OLV Internacional oferece consultoria especializada em redução de custos e otimização tributária para importadores."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quais documentos são necessários para exportar do Brasil?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Os principais documentos para exportação do Brasil incluem: Registro de Exportação (RE), Fatura Comercial (Commercial Invoice), Packing List, Conhecimento de Embarque (B/L ou AWB), Certificado de Origem, e documentos específicos dependendo do produto e país de destino. A OLV Internacional oferece suporte completo na documentação para exportação."
                  }
                }
              ]
            })
          }}
        />

        {/* GoAdopt LGPD Script - MÉTODO PADRÃO */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var script = document.createElement('script');
                script.src = 'https://tag.goadopt.io/injector.js?website_code=1d3503e5-6e70-4135-906f-6c9840d27875';
                script.async = true;
                script.defer = true;
                document.head.appendChild(script);
              })();
            `
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-T3P68DR"
            height="0" 
            width="0" 
            style={{display:'none',visibility:'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        {/* Detector de Intenção para Google AI Mode */}
        <IntentionDetector />
        
        {children}
        
        {/* Google Analytics 4 */}
        <GoogleAnalytics measurementId="G-3D4GMDQSFS" />
        
        {/* Core Web Vitals Monitor */}
        <WebVitals />
        
        {/* Botão Flutuante WhatsApp */}
        <WhatsAppButton phoneNumber="5511999244444" message="Olá! Vim do site da OLV Internacional e gostaria de saber mais sobre os serviços." />
        
        {/* Menu Flutuante Mobile */}
        <MobileFloatingMenu />
        
        {/* ▶ Go Adopt LGPD Script - IMPLEMENTAÇÃO ROBUSTA ▶ */}
        <GoAdoptScript />
        {/* ◀ Fim Go Adopt Script ▶ */}
      </body>
    </html>
  );
} 