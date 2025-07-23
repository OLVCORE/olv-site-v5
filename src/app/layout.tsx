import { Inter } from "next/font/google";
import "./globals.css";
// import CookieConsent from "@/components/CookieConsent"; // Removido
import 'tippy.js/dist/tippy.css';
import { SITE_URL } from '@/lib/siteConfig';
import { LocalBusinessSchema, OrganizationSchema } from '@/components/SeoSchema';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { WebVitals } from '@/components/analytics/WebVitals';
import { FloatingWhatsAppButton } from '@/components/WhatsAppButton';
import MobileFloatingMenu from '@/components/MobileFloatingMenu';
// Internationalization temporarily disabled

const inter = Inter({ subsets: ["latin"] });

// Lista completa de palavras-chave para SEO e Google Ads - OTIMIZADA
const keywordsList = "consultoria importação exportação, supply chain industrial, comércio exterior PME, logística internacional, desembaraço aduaneiro, radar siscomex, planejamento tributário comex, importação insumos industriais, exportação produtos acabados, redução custos importação, otimização supply chain, consultoria comex industrial, frete internacional, câmbio importação, impostos importação, compliance aduaneiro, logística 4.0, automação comex, inteligência mercado industrial, consultoria estratégica industrial, PME industrial, multinacionais experiência, Volkswagen Ericsson Lupatech, expertise industrial, cadeia suprimentos, otimização estoques, lead time importação, custos portuários, demurrage porto, incoterms 2020, ncm classificação fiscal, drawback suspensão, regime aduaneiro especial, due diligence global, trading company, importação drop shipping, commodities importação, bens capital importação, produtos acabados importação, insumos matéria prima, licenciamento anvisa, certificado origem, compliance aeo oea, controle riscos aduaneiros, digitalização processos comex, documentos exportação, financiamento exim, habilitar radar siscomex, cotação dólar importação, custos portuários despacho, demurrage porto evitar, despacho aduaneiro etapas, diferença incoterms 2020, digitalização processos comex, documentos necessários exportação, drawback suspensão benefícios, due diligence global, engage o que é, escolha mercado alvo exportação, escolher transportadora internacional, exceltta o que é, financiamento exim, finx o que é, habilitar radar siscomex requisitos, importação bens capital, importação commodities, importação drop shipping regulamentação, importação insumos matéria prima, importação produtos acabados, labs o que é, licenciamento anvisa importação, logística 4.0 benefícios supply chain, ncm classificação fiscal, negociar câmbio importação, otimização estoques importação, passos li anvisa, planejamento tributário importação, plano internacionalização PME, quanto custa importar china, reduzir lead time importação, regimes aduaneiros especiais, risco cambial hedge, seguro carga internacional, simulador custo importação, simulador frete internacional, simulador tax importação, siscomex li declaração, stratevo o que é, supply chain resiliente, trading company vs importação própria, ventures o que é, veritus o que é, consultoria em exportação, consultoria em importação, exportação de produtos, logística internacional, 3PL, 4PL, Consultoria em exportação, Consultoria em importação, Exportação de produtos, Logística internacional";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OLV Internacional – Integramos Estratégia, Operação e Resultado',
    template: '%s | OLV Internacional'
  },
  description: 'Consultoria especializada em Supply Chain Industrial e Comércio Exterior para PMEs. 35 anos de experiência em multinacionais (Volkswagen, Ericsson, Lupatech). Otimizamos importação de insumos, exportação de produtos acabados e redução de custos logísticos. Radar SISCOMEX, desembaraço aduaneiro e planejamento tributário.',
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
        
        {/* Preload otimizado - apenas recursos essenciais */}
        <link rel="preload" href="/images/BANNER-HOME.jpeg" as="image" type="image/jpeg" />
        
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
        
        {/* Botão Flutuante WhatsApp */}
        <FloatingWhatsAppButton phoneNumber="551126751446" message="Olá! Vim do site da OLV Internacional e gostaria de saber mais sobre os serviços." />
        
        {/* Menu Flutuante Mobile */}
        <MobileFloatingMenu />
      </body>
    </html>
  );
} 