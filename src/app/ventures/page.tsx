import React from 'react';
import dynamic from 'next/dynamic';
const PlatformLayout = dynamic(() => import('../../components/platforms/PlatformLayout'));

export const metadata = {
  title: 'VENTURES - OLV Internacional | Desenvolvimento de Negócios e Investimentos Internacionais',
  description: 'VENTURES é a plataforma de desenvolvimento de negócios da OLV Internacional, especializada em identificar oportunidades de investimento, parcerias estratégicas e expansão internacional para empresas industriais.',
  keywords: 'desenvolvimento de negócios, investimentos internacionais, parcerias estratégicas, expansão internacional, oportunidades de mercado, venture capital, investimento industrial, crescimento empresarial, internacionalização de empresas',
  alternates: {
    canonical: 'https://olvinternacional.com.br/ventures'
  },
};

export default function VenturesPage() {
  return (
    <PlatformLayout
      title="VENTURES"
      subtitle="Desenvolvimento de Negócios e Investimentos Internacionais"
      description="Identificamos e desenvolvemos oportunidades de investimento, parcerias estratégicas e expansão internacional para empresas industriais."
      icon="/icons/ventures.svg"
      features={[
        {
          title: "Identificação de Oportunidades",
          description: "Análise de mercado para identificar oportunidades de investimento e expansão internacional"
        },
        {
          title: "Desenvolvimento de Parcerias",
          description: "Facilitação de parcerias estratégicas entre empresas brasileiras e internacionais"
        },
        {
          title: "Due Diligence",
          description: "Avaliação completa de riscos e oportunidades em investimentos internacionais"
        },
        {
          title: "Estratégia de Expansão",
          description: "Planejamento estratégico para expansão internacional e entrada em novos mercados"
        }
      ]}
    >
      {/* Conteúdo adicional específico do VENTURES */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-accent">Por que escolher o VENTURES?</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Experiência Comprovada</h3>
                    <p className="text-gray-600 dark:text-gray-300">35 anos de experiência em desenvolvimento de negócios internacionais</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Rede Global</h3>
                    <p className="text-gray-600 dark:text-gray-300">Conexões estratégicas com investidores e parceiros em todo o mundo</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-accent rounded-full flex items-center justify-center mr-4 mt-1">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Metodologia Exclusiva</h3>
                    <p className="text-gray-600 dark:text-gray-300">Processo estruturado de identificação e desenvolvimento de oportunidades</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-accent">Nossos Serviços</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Análise de mercado e identificação de oportunidades
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Due diligence e avaliação de riscos
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Desenvolvimento de parcerias estratégicas
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Estratégia de expansão internacional
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                  Acompanhamento e gestão de investimentos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "VENTURES - OLV Internacional",
            "provider": {
              "@type": "Organization",
              "name": "OLV Internacional",
              "url": "https://www.olvinternacional.com.br"
            },
            "description": "Plataforma de desenvolvimento de negócios especializada em identificar oportunidades de investimento, parcerias estratégicas e expansão internacional para empresas industriais.",
            "serviceType": "Desenvolvimento de Negócios e Investimentos Internacionais",
            "areaServed": {
              "@type": "Country",
              "name": "Brasil"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Serviços de Desenvolvimento de Negócios",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Identificação de Oportunidades",
                    "description": "Análise de mercado para identificar oportunidades de investimento e expansão internacional"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Desenvolvimento de Parcerias",
                    "description": "Facilitação de parcerias estratégicas entre empresas brasileiras e internacionais"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Due Diligence",
                    "description": "Avaliação completa de riscos e oportunidades em investimentos internacionais"
                  }
                }
              ]
            },
            "offers": {
              "@type": "Offer",
              "availability": "https://schema.org/InStock",
              "priceCurrency": "BRL"
            }
          })
        }}
      />
    </PlatformLayout>
  );
} 