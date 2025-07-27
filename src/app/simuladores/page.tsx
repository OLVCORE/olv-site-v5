import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import Icon from '../../components/icons/Icon';

export const metadata = {
  title: 'Simuladores de Comércio Exterior | OLV Internacional - Ferramentas de Cálculo para Comex',
  description: 'Ferramentas gratuitas para simular custos de importação, exportação, câmbio, frete internacional e tributação. Calculadoras especializadas para comércio exterior e supply chain industrial.',
  keywords: 'simuladores comércio exterior, calculadora importação, calculadora exportação, simulador câmbio, calculadora frete internacional, simulador tributário comex, ferramentas cálculo comex, simuladores gratuitos importação exportação',
  alternates: {
    canonical: 'https://olvinternacional.com.br/simuladores'
  },
};

export default function SimuladoresPage() {
  const simuladores = [
    {
      title: 'Simulador de Importação',
      description: 'Calcule custos completos de importação incluindo impostos, frete e despesas aduaneiras',
      icon: '/icons/import-glass.svg',
      href: '/simuladores/importacao',
      features: ['Cálculo de impostos', 'Frete internacional', 'Despesas aduaneiras', 'Custos portuários']
    },
    {
      title: 'Simulador de Exportação',
      description: 'Simule receitas e custos de exportação com análise de competitividade',
      icon: '/icons/export-glass.svg',
      href: '/simuladores/exportacao',
      features: ['Receita bruta', 'Custos de exportação', 'Análise de competitividade', 'Incentivos fiscais']
    },
    {
      title: 'Conversor de Câmbio',
      description: 'Conversão em tempo real de moedas com histórico de cotações',
      icon: '/icons/currency-exchange-glass.svg',
      href: '/simuladores/cambio',
      features: ['Cotações em tempo real', 'Histórico de câmbio', 'Múltiplas moedas', 'Gráficos de variação']
    },
    {
      title: 'Calculadora de Frete',
      description: 'Compare custos de frete marítimo, aéreo e terrestre internacional',
      icon: '/icons/logistics-glass.svg',
      href: '/simuladores/frete',
      features: ['Frete marítimo', 'Frete aéreo', 'Frete terrestre', 'Comparativo de modalidades']
    },
    {
      title: 'Simulador Tributário',
      description: 'Calcule impostos e benefícios fiscais para operações de comércio exterior',
      icon: '/icons/compliance-glass.svg',
      href: '/simuladores/tributario-light',
      features: ['ICMS', 'IPI', 'PIS/COFINS', 'Benefícios fiscais']
    },
    {
      title: 'Calculadora de Cubagem',
      description: 'Otimize o aproveitamento de espaço em contêineres e cargas',
      icon: '/icons/warehouse-glass.svg',
      href: '/simuladores/cubagem',
      features: ['Cálculo de volume', 'Otimização de espaço', 'Diferentes tipos de contêiner', 'Carga mista']
    }
  ];

  return (
    <MainLayout>
      <div className="main-content pt-24 md:pt-28">
        {/* Hero Section */}
        <section className="text-center py-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              Simuladores de Comércio Exterior
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Ferramentas gratuitas e especializadas para calcular custos, simular operações e otimizar suas estratégias de comércio internacional
            </p>
          </div>
        </section>

        {/* Simuladores Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {simuladores.map((simulador, index) => (
                <div key={index} className="glass card-hover p-6 rounded-xl">
                  <div className="flex items-center mb-4">
                    <Icon src={simulador.icon} alt={`${simulador.title} Icon`} size="lg" className="mr-3" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{simulador.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{simulador.description}</p>
                  <ul className="mb-6 space-y-2">
                    {simulador.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="mr-2 text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href={simulador.href}
                    className="btn btn-primary w-full text-center"
                  >
                    Acessar Simulador
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Precisa de Consultoria Especializada?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Nossos especialistas estão prontos para ajudar você a otimizar suas operações de comércio exterior
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn btn-primary">
                Fale com um Especialista
              </Link>
              <Link href="/sobre" className="btn btn-secondary">
                Conheça Nossa Metodologia
              </Link>
            </div>
          </div>
        </section>

        {/* Schema.org JSON-LD para Ferramentas */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Simuladores de Comércio Exterior",
              "description": "Ferramentas gratuitas para simular custos de importação, exportação, câmbio, frete internacional e tributação",
              "url": "https://olvinternacional.com.br/simuladores",
              "numberOfItems": simuladores.length,
              "itemListElement": simuladores.map((simulador, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "SoftwareApplication",
                  "name": simulador.title,
                  "description": simulador.description,
                  "url": `https://olvinternacional.com.br${simulador.href}`,
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web Browser",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "BRL",
                    "availability": "https://schema.org/InStock"
                  }
                }
              }))
            })
          }}
        />
      </div>
    </MainLayout>
  );
} 