import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Icon from '../../components/icons/Icon';
const PlatformLayout = dynamic(() => import('../../components/platforms/PlatformLayout'));

export const metadata = {
  title: 'ENGAGE - OLV Internacional | Engajamento e Relacionamento com Clientes',
  description: 'ENGAGE é a plataforma de relacionamento da OLV Internacional que automatiza e aprimora a jornada do cliente, convertendo leads em negócios através de automação e inteligência de dados.',
  keywords: 'CRM internacional, engajamento clientes, automação marketing, jornada cliente, leads comércio exterior, relacionamento comercial',
  alternates: {
    canonical: 'https://olvinternacional.com.br/engage'
  },
};

export default function EngagePage() {
  return (
    <PlatformLayout
      platformName="ENGAGE"
      platformLogo="/images/engage-logo.jpeg"
      platformDescription="Marketing e Comunicação para Mercados Globais"
      platformIntro="A ENGAGE é a plataforma de marketing e comunicação da OLV Internacional, que conecta marcas brasileiras a audiências globais por meio de estratégias interculturais e campanhas digitais de alto impacto."
      platformColor="#6A3C63"
    >
      <section className="mb-12">
        <h2 className="section-title">Sobre a ENGAGE</h2>
        <p className="mb-4">
          A ENGAGE é a plataforma de marketing e comunicação da OLV Internacional, especializada em desenvolver estratégias eficazes para mercados internacionais, ajudando empresas brasileiras a se conectarem de forma autêntica e impactante com audiências globais.
        </p>
        <p className="mb-4">
          Nossa abordagem combina conhecimento profundo de mercados internacionais, expertise em comunicação intercultural e as mais recentes tecnologias digitais para criar campanhas que ressoam localmente enquanto mantêm a consistência global da sua marca.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/strategy.svg" alt="Strategy Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Estratégia Internacional</h3>
            </div>
            <p>Planejamento de marketing adaptado para diferentes mercados e culturas, com foco em resultados mensuráveis.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/globe.svg" alt="Communication Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Comunicação Multicultural</h3>
            </div>
            <p>Mensagens que respeitam especificidades culturais enquanto transmitem de forma efetiva os valores da sua marca.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/digital.svg" alt="Digital Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Presença Digital Global</h3>
            </div>
            <p>Desenvolvimento de ecossistemas digitais otimizados para diferentes mercados e comportamentos de consumo.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="service-section-title">Serviços ENGAGE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/marketing.svg" alt="Marketing Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Estratégia de Marketing Internacional</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Análise de mercados internacionais</li>
              <li>Posicionamento de marca global</li>
              <li>Planejamento de campanhas multinacionais</li>
              <li>Adaptação cultural de mensagens</li>
            </ul>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/digital-marketing.svg" alt="Digital Marketing Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Marketing Digital Global</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>SEO internacional e multilíngue</li>
              <li>Campanhas de mídia paga em mercados-alvo</li>
              <li>Estratégias de mídias sociais localizadas</li>
              <li>Análise de performance por mercado</li>
            </ul>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/communication.svg" alt="Communication Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Comunicação Internacional</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Relações públicas em mercados globais</li>
              <li>Gestão de crise internacional</li>
              <li>Treinamento em comunicação intercultural</li>
              <li>Estratégia de conteúdo multilíngue</li>
            </ul>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/branding.svg" alt="Branding Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Branding Internacional</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Adaptação de identidade visual para mercados específicos</li>
              <li>Análise de percepção de marca por país</li>
              <li>Estratégias de localização de marca</li>
              <li>Verificação de adequação cultural</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="service-section-title">Benefícios ENGAGE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/connection.svg" alt="Connection Icon" size="sm" className="mr-2" />
              <h3 className="text-lg">Conexão Cultural Autêntica</h3>
            </div>
            <p>Comunicação que ressoa com diferentes culturas, evitando erros de tradução ou inadequações culturais.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/optimization.svg" alt="Optimization Icon" size="sm" className="mr-2" />
              <h3 className="text-lg">Otimização de Investimentos</h3>
            </div>
            <p>Estratégias focadas nos canais e abordagens mais efetivos para cada mercado internacional.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/consistency.svg" alt="Consistency Icon" size="sm" className="mr-2" />
              <h3 className="text-lg">Consistência Global</h3>
            </div>
            <p>Mensagens coerentes em todos os mercados, preservando a essência da marca enquanto adapta aspectos culturais.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/growth.svg" alt="Growth Icon" size="sm" className="mr-2" />
              <h3 className="text-lg">Expansão Acelerada</h3>
            </div>
            <p>Entrada mais rápida e eficiente em novos mercados com estratégias de comunicação já adaptadas.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/risk.svg" alt="Risk Icon" size="sm" className="mr-2" />
              <h3 className="text-lg">Prevenção de Riscos</h3>
            </div>
            <p>Identificação antecipada de potenciais problemas de comunicação ou percepção em diferentes culturas.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/insights.svg" alt="Insights Icon" size="sm" className="mr-2" />
              <h3 className="text-lg">Insights Multiculturais</h3>
            </div>
            <p>Aprendizados valiosos sobre diferentes mercados que podem informar estratégias de produto e negócios.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="service-section-title">Depoimentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="platform-card">
            <p className="italic mb-4">"A equipe da ENGAGE transformou completamente nossa abordagem ao mercado norte-americano. Eles identificaram sutilezas culturais que estávamos ignorando e reformularam nossa comunicação, resultando em um aumento de 60% no engajamento e 35% nas conversões."</p>
            <p className="font-semibold">Fernanda Santos</p>
            <p className="text-sm opacity-75">Diretora de Marketing, Software Solutions Brasil</p>
          </div>
          <div className="platform-card">
            <p className="italic mb-4">"Nossa estratégia de entrada no mercado asiático estava encontrando resistência até contratarmos a ENGAGE. A compreensão deles das nuances culturais locais nos permitiu adaptar nossa mensagem e construir conexões genuínas com distribuidores e consumidores."</p>
            <p className="font-semibold">Ricardo Oliveira</p>
            <p className="text-sm opacity-75">CEO, Exportadora de Produtos Naturais</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="service-section-title">FAQ - Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div className="platform-card">
            <div className="p-4 font-semibold flex items-center">
              <Icon src="/icons/faq.svg" alt="FAQ Icon" size="sm" className="mr-2" />
              Por que preciso adaptar minha estratégia de marketing para mercados internacionais?
            </div>
            <div className="p-4">
              Cada mercado internacional possui características únicas em termos de comportamento do consumidor, preferências de comunicação, canais de mídia populares, normas culturais e requisitos legais. Uma estratégia que funciona perfeitamente no Brasil pode falhar completamente em outros países se não for adaptada adequadamente. A ENGAGE ajuda a identificar essas diferenças críticas e desenvolver abordagens que mantenham a essência da sua marca enquanto ressoam culturalmente com cada mercado-alvo, maximizando sua eficácia e evitando potenciais erros custosos.
            </div>
          </div>
          <div className="platform-card">
            <div className="p-4 font-semibold flex items-center">
              <Icon src="/icons/faq.svg" alt="FAQ Icon" size="sm" className="mr-2" />
              Como a ENGAGE lida com as diferenças linguísticas e culturais em campanhas globais?
            </div>
            <div className="p-4">
              Nossa abordagem vai muito além da simples tradução. Trabalhamos com uma rede global de especialistas nativos em marketing e comunicação que entendem profundamente as nuances culturais de cada mercado. Realizamos pesquisas locais para compreender como sua marca e mensagens serão percebidas, adaptamos elementos visuais e textuais para garantir relevância cultural, e desenvolvemos estratégias de conteúdo que abordam temas e valores importantes para cada público. Implementamos também um rigoroso processo de verificação cultural para evitar associações negativas ou mal-entendidos que poderiam prejudicar sua marca.
            </div>
          </div>
          <div className="platform-card">
            <div className="p-4 font-semibold flex items-center">
              <Icon src="/icons/faq.svg" alt="FAQ Icon" size="sm" className="mr-2" />
              Quais mercados internacionais a ENGAGE tem experiência em atender?
            </div>
            <div className="p-4">
              A ENGAGE possui expertise comprovada em diversos mercados globais, incluindo América do Norte (EUA e Canadá), Europa (com foco em Reino Unido, Alemanha, França, Espanha e Portugal), América Latina (México, Colômbia, Chile, Argentina), e mercados selecionados na Ásia (China, Japão, Coreia do Sul) e Oriente Médio (Emirados Árabes Unidos e Arábia Saudita). Nossa rede de especialistas locais continua em expansão, permitindo-nos atender novos mercados conforme a demanda. Para cada projeto, montamos uma equipe com experiência específica nas regiões de interesse do cliente.
            </div>
          </div>
          <div className="platform-card">
            <div className="p-4 font-semibold flex items-center">
              <Icon src="/icons/faq.svg" alt="FAQ Icon" size="sm" className="mr-2" />
              Como a ENGAGE mede o sucesso das estratégias de marketing internacional?
            </div>
            <div className="p-4">
              Implementamos uma estrutura robusta de métricas e análises adaptada para cada mercado internacional. Definimos KPIs específicos alinhados aos objetivos de negócio, estabelecemos benchmarks locais relevantes, e utilizamos ferramentas avançadas de analytics para monitorar performance em tempo real. Nossos dashboards permitem comparações entre diferentes mercados, identificando tendências e oportunidades. Realizamos análises regulares não apenas de métricas quantitativas (tráfego, conversões, ROI), mas também qualitativas (percepção de marca, sentimento do consumidor) para fornecer uma visão holística do impacto de nossas estratégias em cada região.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-purple-50 rounded-lg p-8 text-center dark:bg-purple-900 dark:bg-opacity-20">
          <h2 className="text-2xl font-bold mb-4 text-purple-900 dark:text-purple-100">Pronto para conectar sua marca com audiências globais?</h2>
          <p className="mb-6 max-w-3xl mx-auto dark:text-purple-200">Entre em contato com nossos especialistas e descubra como a ENGAGE pode ajudar sua empresa a desenvolver estratégias de marketing e comunicação eficazes para mercados internacionais.</p>
          <Link href="/contato" className="inline-block bg-purple-800 text-white py-3 px-6 rounded-md font-semibold hover:bg-purple-900 transition duration-300 flex items-center justify-center">
            <Icon src="/icons/specialist.svg" alt="Specialist Icon" size="sm" className="mr-2" />
            Fale com um Especialista
          </Link>
        </div>
      </section>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "ENGAGE",
            "provider": {
              "@type": "Organization",
              "name": "OLV Internacional",
              "url": "https://www.olvinternacional.com.br"
            },
            "description": "Plataforma de marketing e comunicação especializada em estratégias para mercados internacionais.",
            "serviceType": "Marketing Internacional e Comunicação Global",
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