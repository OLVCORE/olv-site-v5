import { Inter } from "next/font/google";
import "./globals.css";
// import CookieConsent from "@/components/CookieConsent"; // Removido
import 'tippy.js/dist/tippy.css';
import { SITE_URL } from '@/lib/siteConfig';
import { LocalBusinessSchema, OrganizationSchema } from '@/components/SeoSchema';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { WebVitals } from '@/components/analytics/WebVitals';
import { FloatingWhatsAppButton } from '@/components/WhatsAppButton';
import WebVitalsMonitor from '@/components/WebVitalsMonitor';
// Internationalization temporarily disabled

const inter = Inter({ subsets: ["latin"] });

// Lista completa de palavras-chave para SEO e Google Ads - OTIMIZADA
const keywordsList = "consultoria importação exportação, supply chain industrial, comércio exterior PME, logística internacional, desembaraço aduaneiro, radar siscomex, planejamento tributário comex, importação insumos industriais, exportação produtos acabados, redução custos importação, otimização supply chain, consultoria comex industrial, frete internacional, câmbio importação, impostos importação, compliance aduaneiro, logística 4.0, automação comex, inteligência mercado industrial, consultoria estratégica industrial, PME industrial, setores industriais, expertise industrial, cadeia suprimentos, otimização estoques, lead time importação, custos portuários, demurrage porto, incoterms 2020, ncm classificação fiscal, drawback suspensão, regime aduaneiro especial, due diligence global, trading company, importação drop shipping, commodities importação, bens capital importação, produtos acabados importação, insumos matéria prima, licenciamento anvisa, certificado origem, compliance aeo oea, controle riscos aduaneiros, digitalização processos comex, documentos exportação, financiamento exim, habilitar radar siscomex, cotação dólar importação, custos portuários despacho, demurrage porto evitar, despacho aduaneiro etapas, diferença incoterms 2020, digitalização processos comex, documentos necessários exportação, drawback suspensão benefícios, due diligence global, engage o que é, escolha mercado alvo exportação, escolher transportadora internacional, exceltta o que é, financiamento exim, finx o que é, habilitar radar siscomex requisitos, importação bens capital, importação commodities, importação drop shipping regulamentação, importação insumos matéria prima, importação produtos acabados, labs o que é, licenciamento anvisa importação, logística 4.0 benefícios supply chain, ncm classificação fiscal, negociar câmbio importação, otimização estoques importação, passos li anvisa, planejamento tributário importação, plano internacionalização PME, quanto custa importar china, reduzir lead time importação, regimes aduaneiros especiais, risco cambial hedge, seguro carga internacional, simulador custo importação, simulador frete internacional, simulador tax importação, siscomex li declaração, stratevo o que é, supply chain resiliente, trading company vs importação própria, ventures o que é, veritus o que é, consultoria em exportação, consultoria em importação, exportação de produtos, logística internacional, 3PL, 4PL, como importar da china para o brasil passo a passo, quanto custa importar produtos da china, melhor transportadora para importação da china, como calcular frete internacional da china, documentos necessários para importar da china, como abrir empresa para importar da china, consultoria especializada em importação da china, como exportar produtos brasileiros para o exterior, quanto custa exportar do brasil, como obter certificado de origem para exportação, documentos necessários para exportar do brasil, como calcular custos de exportação, consultoria especializada em exportação brasileira, como otimizar supply chain industrial, redução de custos logísticos industriais, planejamento tributário para importação industrial, como reduzir impostos na importação, otimização de estoques industriais, como calcular lead time de importação, consultoria em logística 4.0 para indústrias, automação de processos de comércio exterior, como implementar compliance aduaneiro, controle de riscos em importação, digitalização de processos de comex, como obter radar siscomex, habilitar empresa para comércio exterior, planejamento estratégico para internacionalização, consultoria em supply chain para PMEs industriais, como reduzir custos portuários, otimização de frete internacional, como escolher transportadora internacional, cálculo de frete marítimo internacional, como calcular frete aéreo internacional, seguro de carga internacional preços, como contratar seguro de carga, demurrage e detention portuário, como evitar demurrage no porto, custos portuários no brasil, como calcular custos portuários, incoterms 2020 explicados, diferença entre incoterms, como escolher incoterm correto, classificação fiscal NCM, como classificar produtos NCM, consultoria em classificação fiscal, drawback suspensão benefícios fiscais, como obter drawback, regimes aduaneiros especiais brasil, como usar regime aduaneiro especial, due diligence em comércio exterior, como fazer due diligence, trading company vs importação própria, vantagens trading company, como escolher trading company, importação drop shipping regulamentação, como fazer drop shipping, commodities importação brasil, como importar commodities, bens de capital importação, como importar bens de capital, produtos acabados importação, como importar produtos acabados, insumos matéria prima importação, como importar insumos, licenciamento anvisa importação, como obter licença anvisa, certificado de origem para exportação, como obter certificado de origem, compliance AEO OEA, como obter certificado AEO, controle de riscos aduaneiros, como controlar riscos aduaneiros, digitalização processos comex, como digitalizar processos, documentos exportação brasil, documentos necessários exportação, financiamento EXIM, como obter financiamento EXIM, habilitar radar siscomex requisitos, como habilitar radar siscomex, cotação dólar importação, como negociar câmbio importação, custos portuários despacho, como calcular custos portuários, demurrage porto evitar, como evitar demurrage, despacho aduaneiro etapas, como fazer despacho aduaneiro, diferença incoterms 2020, como escolher incoterm, digitalização processos comex, como digitalizar comex, documentos necessários exportação, como preparar documentos exportação, drawback suspensão benefícios, como obter drawback, due diligence global, como fazer due diligence, engage o que é, como usar engage, escolha mercado alvo exportação, como escolher mercado exportação, escolher transportadora internacional, como escolher transportadora, exceltta o que é, como usar exceltta, financiamento exim, como obter exim, finx o que é, como usar finx, habilitar radar siscomex requisitos, como habilitar radar, importação bens capital, como importar bens capital, importação commodities, como importar commodities, importação drop shipping regulamentação, como fazer drop shipping, importação insumos matéria prima, como importar insumos, importação produtos acabados, como importar produtos acabados, labs o que é, como usar labs, licenciamento anvisa importação, como obter licença anvisa, logística 4.0 benefícios supply chain, como implementar logística 4.0, ncm classificação fiscal, como classificar NCM, negociar câmbio importação, como negociar câmbio, otimização estoques importação, como otimizar estoques, passos li anvisa, como obter li anvisa, planejamento tributário importação, como planejar tributário, plano internacionalização PME, como internacionalizar PME, quanto custa importar china, custos importação china, reduzir lead time importação, como reduzir lead time, regimes aduaneiros especiais, como usar regimes especiais, risco cambial hedge, como fazer hedge cambial, seguro carga internacional, como contratar seguro, simulador custo importação, como usar simulador importação, simulador frete internacional, como calcular frete, simulador tax importação, como calcular impostos, siscomex li declaração, como declarar siscomex, stratevo o que é, como usar stratevo, supply chain resiliente, como tornar supply chain resiliente, trading company vs importação própria, como escolher trading, ventures o que é, como usar ventures, veritus o que é, como usar veritus, consultoria em exportação, como exportar produtos, consultoria em importação, como importar produtos, exportação de produtos, como exportar, logística internacional, como otimizar logística, 3PL terceirização logística, como escolher 3PL, 4PL gestão logística, como implementar 4PL";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OLV Internacional – Integramos Estratégia, Operação e Resultado',
    template: '%s | OLV Internacional'
  },
  description: 'Consultoria especializada em Supply Chain Industrial e Comércio Exterior para PMEs. Experiência consolidada em setores industriais diversos. Otimizamos importação de insumos, exportação de produtos acabados e redução de custos logísticos. Radar SISCOMEX, desembaraço aduaneiro e planejamento tributário.',
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
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large'
    }
  },
  keywords: keywordsList
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
        
        <meta name="keywords" content={keywordsList} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload otimizado - recursos críticos para Core Web Vitals */}
        <link rel="preload" href="/images/BANNER-HOME.jpeg" as="image" type="image/jpeg" />
        <link rel="preload" href="/images/olv-logo.jpeg" as="image" type="image/jpeg" />
        <link rel="preload" href="/css/style.css" as="style" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Carregamento não-bloqueante do CSS legado */}
        <link rel="stylesheet" href="/css/style.css" media="screen and (min-width: 769px)" />

        {/* Metadados adicionais para otimização de intenção do usuário */}
        <meta name="google-site-verification" content="verificação-do-site" />
        <meta name="author" content="OLV Internacional" />
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="Portuguese" />
        <meta name="geo.region" content="BR" />
        <meta name="geo.placename" content="São Paulo" />
        <meta name="geo.position" content="-23.5505;-46.6333" />
        <meta name="ICBM" content="-23.5505, -46.6333" />
        <meta name="DC.title" content="OLV Internacional - Consultoria em Comércio Exterior" />
        <meta name="DC.creator" content="OLV Internacional" />
        <meta name="DC.subject" content="Consultoria em Comércio Exterior, Importação, Exportação, Logística Internacional" />
        <meta name="DC.description" content="Consultoria especializada em Supply Chain Industrial e Comércio Exterior para PMEs" />
        <meta name="DC.publisher" content="OLV Internacional" />
        <meta name="DC.contributor" content="OLV Internacional" />
        <meta name="DC.date" content="2024" />
        <meta name="DC.type" content="Service" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.identifier" content="https://olvinternacional.com.br" />
        <meta name="DC.language" content="pt-BR" />
        <meta name="DC.coverage" content="Brasil" />
        <meta name="DC.rights" content="OLV Internacional" />

        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="SEU_CODIGO_DE_VERIFICACAO_AQUI" />

        {/* LGPD GoAdopt */}
        <meta name="adopt-website-id" content="1d3503e5-6e70-4135-906f-6c9840d27875" />
        <script src="//tag.goadopt.io/injector.js?website_code=1d3503e5-6e70-4135-906f-6c9840d27875" className="adopt-injector" async></script>

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
                "email": "atendimento@olvinternacional.com.br",
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

        {/* Product/Service Schema para serviços OLV */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Consultoria em Comércio Exterior",
              "description": "Consultoria especializada em importação, exportação e logística internacional para PMEs",
              "provider": {
                "@type": "Organization",
                "name": "OLV Internacional"
              },
              "serviceType": "Consultoria Empresarial",
              "areaServed": "BR",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Serviços OLV",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Consultoria em Importação",
                      "description": "Orientação completa para importação de insumos e produtos acabados"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Consultoria em Exportação",
                      "description": "Suporte completo para exportação de produtos brasileiros"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Logística Internacional",
                      "description": "Otimização de supply chain e logística internacional"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Planejamento Tributário",
                      "description": "Otimização fiscal e tributária para operações de comércio exterior"
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* VideoObject Schema para conteúdo de vídeo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              "name": "Como Otimizar Supply Chain Industrial",
              "description": "Vídeo explicativo sobre otimização de supply chain industrial e comércio exterior",
              "thumbnailUrl": "https://olvinternacional.com.br/images/video-thumbnail.jpg",
              "uploadDate": "2024-01-01",
              "duration": "PT5M30S",
              "contentUrl": "https://olvinternacional.com.br/videos/supply-chain-otimizacao.mp4",
              "embedUrl": "https://olvinternacional.com.br/videos/supply-chain-otimizacao",
              "publisher": {
                "@type": "Organization",
                "name": "OLV Internacional"
              },
              "creator": {
                "@type": "Organization",
                "name": "OLV Internacional"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} theme-dark`}>
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
        
        {children}
        {/* <CookieConsent /> */}
        
        {/* Google Analytics 4 */}
        <GoogleAnalytics measurementId="G-3D4GMDQSFS" />
        
        {/* Core Web Vitals Monitor */}
        <WebVitals />
        <WebVitalsMonitor />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }}
        />
        
        {/* Botão Flutuante WhatsApp */}
        <FloatingWhatsAppButton phoneNumber="551126751446" message="Olá! Vim do site da OLV Internacional e gostaria de saber mais sobre os serviços." />
      </body>
    </html>
  );
} 