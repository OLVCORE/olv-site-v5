import { Inter } from "next/font/google";
import "./globals.css";
import 'tippy.js/dist/tippy.css';
import { SITE_URL } from '@/lib/siteConfig';
import { LocalBusinessSchema, OrganizationSchema } from '@/components/SeoSchema';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { WebVitals } from '@/components/analytics/WebVitals';
import WhatsAppButton from '@/components/layout/WhatsAppButton';
import MobileFloatingMenu from '@/components/MobileFloatingMenu';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
// Internationalization temporarily disabled

const inter = Inter({ subsets: ["latin"] });

// ESTRATÉGIA DE INTENÇÃO DO CONSUMIDOR - GOOGLE ADS 2025
// Baseado na nova era de "intenção do consumidor" ao invés de palavras-chave tradicionais
// Otimizado para AI Mode, Agentic AI e AI Max for Search

const keywordsList = "quero importar produtos da china, como reduzir custos de importação, preciso de consultoria em comércio exterior, como exportar produtos do brasil, quero otimizar minha supply chain, preciso de ajuda com radar siscomex, como calcular impostos de importação, quero contratar consultoria comex, preciso de suporte para exportação, como fazer planejamento tributário importação, quero reduzir lead time importação, preciso de consultoria para pme, como escolher transportadora internacional, quero entender incoterms 2020, preciso de ajuda com ncm, como fazer due diligence global, quero contratar trading company, preciso de simulador custo importação, como fazer licenciamento anvisa, quero otimizar estoques importação, preciso de consultoria estratégica industrial, como fazer drawback suspensão, quero entender compliance aduaneiro, preciso de ajuda com demurrage porto, como fazer financiamento exim, quero contratar consultoria supply chain, preciso de suporte para multinacionais, como fazer digitalização processos comex, quero entender regime aduaneiro especial, preciso de ajuda com commodities importação, como fazer controle riscos aduaneiros, quero contratar consultoria logística 4.0, preciso de simulador frete internacional, como fazer importação drop shipping, quero entender trading company vs importação própria, preciso de ajuda com bens capital importação, como fazer seguro carga internacional, quero contratar consultoria para pmes industriais, preciso de suporte para insumos matéria prima, como fazer produtos acabados importação, quero entender automação comex, preciso de ajuda com inteligência mercado industrial, como fazer certificado origem, quero contratar consultoria expertise industrial, preciso de simulador tax importação, como fazer câmbio importação, quero entender otimização supply chain, preciso de ajuda com redução custos importação, como fazer consultoria comex industrial, quero contratar suporte para Volkswagen Ericsson Lupatech, preciso de consultoria multinacionais experiência, como fazer consultoria estratégica industrial, quero entender pmE industrial, preciso de ajuda com cadeia suprimentos, como fazer otimização estoques, quero contratar consultoria lead time importação, preciso de suporte para custos portuários, como fazer demurrage porto, quero entender incoterms 2020, preciso de ajuda com ncm classificação fiscal, como fazer drawback suspensão, quero contratar consultoria regime aduaneiro especial, preciso de suporte para due diligence global, como fazer trading company, quero entender importação drop shipping, preciso de ajuda com commodities importação, como fazer bens capital importação, quero contratar consultoria produtos acabados importação, preciso de suporte para insumos matéria prima, como fazer licenciamento anvisa, quero entender certificado origem, preciso de ajuda com compliance aeo oea, como fazer controle riscos aduaneiros, quero contratar consultoria digitalização processos comex, preciso de suporte para documentos exportação, como fazer financiamento exim, quero entender habilitar radar siscomex, preciso de ajuda com cotação dólar importação, como fazer custos portuários despacho, quero contratar consultoria demurrage porto evitar, preciso de suporte para despacho aduaneiro etapas, como fazer diferença incoterms 2020, quero entender documentos necessários exportação, preciso de ajuda com drawback suspensão benefícios, como fazer due diligence global, quero contratar consultoria engage o que é, preciso de suporte para escolha mercado alvo exportação, como fazer escolher transportadora internacional, quero entender exceltta o que é, preciso de ajuda com finx o que é, como fazer habilitar radar siscomex requisitos, quero contratar consultoria importação bens capital, preciso de suporte para importação commodities, como fazer importação drop shipping regulamentação, quero entender labs o que é, preciso de ajuda com logística 4.0 benefícios supply chain, como fazer negociar câmbio importação, quero contratar consultoria otimização estoques importação, preciso de suporte para passos li anvisa, como fazer plano internacionalização pme, quero entender quanto custa importar china, preciso de ajuda com reduzir lead time importação, como fazer regimes aduaneiros especiais, quero contratar consultoria risco cambial hedge, preciso de suporte para stratevo o que é, como fazer supply chain resiliente, quero entender ventures o que é, preciso de ajuda com veritus o que é, como fazer 3PL 4PL consultoria, quero contratar consultoria em exportação, preciso de suporte para consultoria em importação, como fazer exportação de produtos, quero entender logística internacional, preciso de ajuda com consultoria premium supply chain, como fazer desenvolvimento negócios internacionais, quero contratar consultoria especializada pmes, preciso de suporte para multinacionais experiência, como fazer integração estratégia operação resultado, quero entender consultoria comércio exterior brasil, preciso de ajuda com otimização importação exportação, como fazer consultoria logística internacional, quero contratar suporte para supply chain industrial, preciso de consultoria para pmes industriais, como fazer consultoria estratégica internacional, quero entender consultoria premium comércio exterior, preciso de ajuda com desenvolvimento negócios globais, como fazer consultoria especializada importação exportação, quero contratar consultoria para empresas multinacionais, preciso de suporte para consultoria estratégica supply chain, como fazer consultoria para desenvolvimento internacional, quero entender consultoria premium para pmes, preciso de ajuda com consultoria especializada logística internacional, como fazer consultoria para empresas globais, quero contratar consultoria estratégica comércio exterior, preciso de suporte para consultoria premium importação exportação, como fazer consultoria para desenvolvimento estratégico, quero entender consultoria especializada para multinacionais, preciso de ajuda com consultoria premium logística internacional, como fazer consultoria estratégica para pmes, quero contratar consultoria para desenvolvimento global, preciso de suporte para consultoria especializada comércio exterior, como fazer consultoria premium para empresas internacionais, quero entender consultoria estratégica para desenvolvimento, preciso de ajuda com consultoria especializada para empresas globais, como fazer consultoria premium para multinacionais, quero contratar consultoria para desenvolvimento estratégico internacional, preciso de suporte para consultoria especializada para desenvolvimento global, como fazer consultoria estratégica para empresas internacionais, quero entender consultoria premium para desenvolvimento global, preciso de ajuda com consultoria especializada para estratégia internacional, como fazer consultoria para desenvolvimento premium global, quero contratar consultoria estratégica especializada internacional, preciso de suporte para consultoria premium estratégica global, como fazer consultoria para desenvolvimento especializado internacional, quero entender consultoria estratégica premium global, preciso de ajuda com consultoria para desenvolvimento estratégico especializado, como fazer consultoria premium estratégica especializada, quero contratar consultoria para desenvolvimento estratégico premium, preciso de suporte para consultoria estratégica especializada premium, como fazer consultoria para desenvolvimento estratégico especializado premium, quero entender consultoria estratégica especializada premium global, preciso de ajuda com consultoria para desenvolvimento estratégico especializado premium global, como fazer consultoria estratégica especializada premium para desenvolvimento global, quero contratar consultoria para desenvolvimento estratégico especializado premium global, preciso de suporte para consultoria estratégica especializada premium para desenvolvimento global estratégico, como fazer consultoria para desenvolvimento estratégico especializado premium global estratégico, quero entender consultoria estratégica especializada premium para desenvolvimento global estratégico especializado, preciso de ajuda com consultoria para desenvolvimento estratégico especializado premium global estratégico especializado, como fazer consultoria estratégica especializada premium para desenvolvimento global estratégico especializado premium, quero contratar consultoria para desenvolvimento estratégico especializado premium global estratégico especializado premium";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'OLV Internacional – Integramos Estratégia, Operação e Resultado',
    template: '%s | OLV Internacional'
  },
  description: 'Quer importar produtos da China? Precisa reduzir custos de importação? Quer exportar produtos do Brasil? A OLV Internacional tem 35 anos de experiência em multinacionais (Volkswagen, Ericsson, Lupatech) e oferece consultoria especializada em Supply Chain Industrial e Comércio Exterior para PMEs. Otimizamos sua importação de insumos, exportação de produtos acabados e redução de custos logísticos. Radar SISCOMEX, desembaraço aduaneiro e planejamento tributário com transparência total de preços.',
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
        {/* Google Tag Manager - Configuração padrão estável */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T3P68DR');
            `
          }}
        />
        {/* End Google Tag Manager */}
        
        <meta name="keywords" content={keywordsList} />
        
        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://tag.goadopt.io" />
        
        {/* Preconnect para recursos críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload apenas da imagem principal */}
        <link rel="preload" href="/images/olv-logo.jpeg" as="image" type="image/jpeg" />
        
        {/* Preload de fontes críticas - removido por 404 */}
        
        {/* CSS crítico inline removido para melhorar performance */}
        
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
        
        {/* Meta tags essenciais para SEO */}
        <meta name="theme-color" content="#d4af37" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="OLV Internacional" />
        <meta name="application-name" content="OLV Internacional" />
        <meta name="msapplication-tooltip" content="OLV Internacional - Consultoria em Comércio Exterior" />
        <meta name="msapplication-starturl" content="/" />
        
        {/* Meta tags essenciais para SEO e conformidade - simplificadas */}
        <meta name="pricing-transparency" content="total-costs-disclosed" />
        <meta name="no-hidden-fees" content="todos-custos-divulgados-antecipadamente" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={SITE_URL} />
        
        {/* Google Search Console Verification - REMOVER SE NÃO TIVER CÓDIGO */}
        {/* <meta name="google-site-verification" content="SEU_CODIGO_DE_VERIFICACAO_AQUI" /> */}
        
        {/* Bing Webmaster Tools - REMOVER SE NÃO TIVER CÓDIGO */}
        {/* <meta name="msvalidate.01" content="SEU_CODIGO_BING_AQUI" /> */}
        
        {/* Yandex Webmaster - REMOVER SE NÃO TIVER CÓDIGO */}
        {/* <meta name="yandex-verification" content="SEU_CODIGO_YANDEX_AQUI" /> */}

        {/* LGPD GoAdopt - Configuração padrão estável */}
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
                "https://www.linkedin.com/company/olv-internacional/",
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
        
        <ThemeProvider>
          {children}
          {/* <CookieConsent /> */}
          
          {/* Footer Universal - Garante que todas as páginas tenham o footer reveal */}
          <Footer />
          
          {/* Google Analytics 4 */}
          <GoogleAnalytics measurementId="G-3D4GMDQSFS" />
          
          {/* Core Web Vitals Monitor */}
          <WebVitals />
          
          {/* Botão Flutuante WhatsApp */}
          <WhatsAppButton phoneNumber="5511999244444" message="Olá! Vim do site da OLV Internacional e gostaria de saber mais sobre os serviços." />
          
          {/* Menu Flutuante Mobile */}
          <MobileFloatingMenu />
        </ThemeProvider>
      </body>
    </html>
  );
} 