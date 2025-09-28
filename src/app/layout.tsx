import { Inter } from "next/font/google";
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T3P68DR');`
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Meta tag GoAdopt */}
        <meta name="adopt-website-id" content="1d3503e5-6e70-4135-906f-6c9840d27875" />
        
        {/* ▶ Go Adopt LGPD – Ícone + Banner ▶ */}
        <meta name="adopt-website-id" content="1d3503e5-6e70-4135-906f-6c9840d27875" />
        <script
          src="https://tag.goadopt.io/injector.js?website_code=1d3503e5-6e70-4135-906f-6c9840d27875"
          className="adopt-injector"
          async
        ></script>
        {/* ◀ Fim Go Adopt ▶ */}
        
        {/* CSP Meta Tag para GoAdopt - SEGURA */}
        <meta httpEquiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://tag.goadopt.io https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com; connect-src 'self' 'unsafe-inline' https://tag.goadopt.io https://www.google-analytics.com https://analytics.google.com https://www.google.com; frame-src 'self' 'unsafe-inline' https://tag.goadopt.io; img-src 'self' 'unsafe-inline' data: blob: https:; style-src 'self' 'unsafe-inline' https:; font-src 'self' 'unsafe-inline' data: https:;" />
        
        <meta name="keywords" content={keywordsList} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload otimizado - apenas recursos essenciais */}
        <link rel="preload" href="/images/BANNER-HOME.jpeg" as="image" type="image/jpeg" />
        
        {/* Carregamento não-bloqueante do CSS legado */}
        <link rel="stylesheet" href="/css/style.css" media="screen and (min-width: 769px)" />

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
        
        {/* GoAdopt Verificação e Fallback */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                console.log('🚀 [GOADOPT] Verificando carregamento...');
                
                // Verificar se já carregou
                function checkGoAdopt() {
                  if (typeof window.adopt !== 'undefined') {
                    console.log('✅ [GOADOPT] GoAdopt já carregado!');
                    return true;
                  }
                  
                  // Verificar elementos no DOM
                  const adoptElements = document.querySelectorAll('[class*="adopt"], [id*="adopt"], [data-adopt]');
                  if (adoptElements.length > 0) {
                    console.log('✅ [GOADOPT] Elementos GoAdopt encontrados no DOM!');
                    return true;
                  }
                  
                  return false;
                }
                
                // Verificação imediata
                if (checkGoAdopt()) return;
                
                // Verificação após 2 segundos
                setTimeout(function() {
                  if (checkGoAdopt()) return;
                  
                  // Fallback: recarregar script
                  console.log('🔄 [GOADOPT] Fallback: recarregando script...');
                  const existingScript = document.querySelector('script[src*="goadopt"]');
                  if (existingScript) {
                    existingScript.remove();
                  }
                  
                  var script = document.createElement('script');
                  script.src = 'https://tag.goadopt.io/injector.js?website_code=1d3503e5-6e70-4135-906f-6c9840d27875&t=' + Date.now();
                  script.async = true;
                  script.defer = true;
                  document.head.appendChild(script);
                  
                  // Verificação final
                  setTimeout(function() {
                    if (checkGoAdopt()) {
                      console.log('✅ [GOADOPT] GoAdopt carregado via fallback!');
                    } else {
                      console.log('❌ [GOADOPT] GoAdopt não conseguiu carregar');
                    }
                  }, 3000);
                }, 2000);
              })();
            `
          }}
        />
        
        {/* ▶ Go Adopt LGPD – Container do ícone ▶ */}
        <div id="go-adopt-container" />
        {/* ◀ Fim Container ▶ */}
      </body>
    </html>
  );
} 