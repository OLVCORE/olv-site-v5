import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import HomeImage from '../../components/home/HomeImage';
import { AnimatedCard, FadeIn } from '../../components/MicroInteractions';
import { OrganizationSchema } from '../../components/SeoSchema';
import WhatsAppButton from '../../components/layout/WhatsAppButton';

export const metadata = {
  title: 'Sobre a OLV Internacional - Expertise em Internacionalização do Supply Chain Industrial',
  description: 'Conheça a OLV Internacional: empresa especializada em internacionalização de Supply Chain e Comércio Exterior para empresas do setor industrial. 35 anos de expertise em regimes aduaneiros, importação e exportação.',
  keywords: 'sobre OLV Internacional, expertise multinacional, empresas setor industrial, consultoria industrial, setores industriais, metodologia 4D, supply chain industrial, comércio exterior PME, consultoria estratégica industrial, empresas serviços industriais',
  alternates: {
    canonical: 'https://olvinternacional.com.br/sobre'
  },
  openGraph: {
    title: 'Sobre a OLV Internacional - Expertise Multinacional para PMEs Industriais',
    description: 'Conheça a OLV Internacional: empresa especializada em aplicar metodologias multinacionais em PMEs industriais de diversos setores.',
    url: 'https://olvinternacional.com.br/sobre',
    siteName: 'OLV Internacional',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://olv-site-v5.vercel.app/images/BANNER-HOME.jpeg',
        width: 1200,
        height: 630,
        alt: 'Sobre a OLV Internacional - Expertise Multinacional'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre a OLV Internacional - Expertise Multinacional',
    description: 'Conheça a OLV Internacional: empresa especializada em aplicar metodologias multinacionais em PMEs industriais.',
    images: ['https://olv-site-v5.vercel.app/images/BANNER-HOME.jpeg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  }
};

export default function Sobre() {
  // Metodologia 4D detalhada
  const metodologia4D = [
    {
      etapa: "D1",
      titulo: "DIAGNÓSTICO INTELIGENTE",
      descricao: "Análise profunda com metodologias de auditoria multinacional, mapeando custos ocultos de importação/exportação, gargalos operacionais internacionais e oportunidades de otimização usando ferramentas testadas em operações industriais globais de alta performance."
    },
    {
      etapa: "D2",
      titulo: "DESIGN ESTRATÉGICO",
      descricao: "Criação de estratégia personalizada baseada em best practices multinacionais, desenvolvendo roadmap específico com metodologias JIT/JIS, S&OP e Supply Chain 4.0 adaptadas para internacionalização de empresas do setor industrial."
    },
    {
      etapa: "D3",
      titulo: "DEPLOY EFICIENTE",
      descricao: "Implementação estruturada com acompanhamento executivo especializado, execução por etapas com gestão de mudança testada em operações internacionais industriais complexas."
    },
    {
      etapa: "D4",
      titulo: "DRIVE CONTÍNUO",
      descricao: "Otimização contínua com monitoramento de KPIs de operações internacionais do setor industrial, acompanhamento mensal com cultura de excelência operacional desenvolvida em multinacionais."
    }
  ];

  // Setores industriais amplos
  const setoresIndustriais = [
    {
      setor: "BENS DE CAPITAL E MÁQUINAS",
      descricao: "Equipamentos industriais, máquinas operatrizes, sistemas automatizados e tecnologia de produção"
    },
    {
      setor: "METALURGIA E SIDERURGIA",
      descricao: "Processamento de metais, ligas especiais, componentes metálicos e estruturas industriais"
    },
    {
      setor: "MÁQUINAS E EQUIPAMENTOS",
      descricao: "Equipamentos pesados, maquinário especializado, componentes mecânicos e sistemas industriais"
    },
    {
      setor: "AUTOMOTIVO E AUTOPEÇAS",
      descricao: "Componentes automotivos, sistemas veiculares, peças de reposição e acessórios especializados"
    },
    {
      setor: "QUÍMICO E PETROQUÍMICO",
      descricao: "Produtos químicos industriais, insumos especializados, materiais processados e compostos técnicos"
    },
    {
      setor: "ALIMENTÍCIO E BEBIDAS",
      descricao: "Processamento de alimentos, bebidas industriais, ingredientes especializados e embalagens"
    },
    {
      setor: "ELETRÔNICO E TECNOLÓGICO",
      descricao: "Componentes eletrônicos, equipamentos tecnológicos, sistemas digitais e dispositivos especializados"
    },
    {
      setor: "CONSTRUÇÃO E INFRAESTRUTURA",
      descricao: "Materiais de construção, componentes estruturais, sistemas prediais e infraestrutura industrial"
    },
    {
      setor: "SERVIÇOS INDUSTRIAIS",
      descricao: "Manutenção industrial, instalação de equipamentos, consultoria técnica e serviços especializados"
    },
    {
      setor: "DISTRIBUIÇÃO INDUSTRIAL",
      descricao: "Distribuição de equipamentos, componentes, insumos e soluções para o setor industrial"
    },
    {
      setor: "TECNOLOGIA INDUSTRIAL",
      descricao: "Sistemas de automação, software industrial, IoT e soluções digitais para indústrias"
    },
    {
      setor: "LOGÍSTICA INDUSTRIAL",
      descricao: "Armazenagem industrial, gestão de estoques, transporte especializado e supply chain"
    }
  ];

  // Diferenciais da OLV
  const diferenciais = [
    {
      titulo: "EXPERTISE EM INTERNACIONALIZAÇÃO REAL",
      descricao: "A OLV Internacional desenvolveu expertise através de atuação executiva em operações internacionais de alta complexidade, aplicando metodologias avançadas de importação e exportação em ambientes multinacionais."
    },
    {
      titulo: "FOCO EXCLUSIVO EM INTERNACIONALIZAÇÃO INDUSTRIAL",
      descricao: "Enquanto outras consultorias atendem qualquer empresa, a OLV Internacional conhece profundamente as dores, limitações e potencial de crescimento específicos de empresas que atuam no setor industrial e buscam internacionalização."
    },
    {
      titulo: "METODOLOGIA PROPRIETÁRIA",
      descricao: "Nossa Metodologia 4D foi desenvolvida especificamente para aplicar expertise em internacionalização de Supply Chain em empresas do setor industrial, respeitando limitações de recursos e maximizando ROI."
    },
    {
      titulo: "PARCERIA ESTRATÉGICA",
      descricao: "A OLV Internacional investe no sucesso dos parceiros porque acreditamos no potencial transformador das empresas brasileiras que atuam no setor industrial através da internacionalização de suas operações."
    }
  ];

  return (
    <MainLayout>
      <OrganizationSchema />
      
      {/* Hero Section - IMPACTO IMEDIATO */}
      <section className="section hero pt-0 pb-0 mb-0">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-2 bg-[#141c2f] p-5 rounded-lg border border-[#2a3448] shadow-lg">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Sobre a OLV Internacional: Especialistas em Internacionalização do Supply Chain Industrial
              </h1>
              <p className="text-lg text-gray-300 mb-4">
                A <span className="text-[#d4af37] font-semibold">OLV Internacional</span> democratiza expertise em internacionalização de Supply Chain e Comércio Exterior para empresas que atuam no setor industrial e buscam expansão global.
              </p>
              <p className="text-[#d4af37] font-medium italic mb-4">
                Conheça a empresa que transforma operações industriais através da internacionalização estratégica desenvolvida em ambientes multinacionais complexos
              </p>
            </div>
            <div className="flex-shrink-0 md:w-1/3">
              <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] shadow-md">
                <HomeImage 
                  src="/images/BANNER-HOME.jpeg" 
                  alt="Sobre a OLV Internacional - Expertise Multinacional para PMEs Industriais" 
                  width={460} 
                  height={460} 
                  className="rounded-lg" 
                  priority={true}
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: QUEM É A OLV INTERNACIONAL */}
      <section className="section py-8">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#d4af37] mb-4">
              A Empresa que Democratiza Expertise em Internacionalização Industrial Avançada
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg">
                <h3 className="text-white font-bold text-xl mb-4">Nossa Essência</h3>
                <p className="text-gray-300">
                  A OLV Internacional é uma empresa de consultoria especializada exclusivamente em internacionalização de Supply Chain para empresas que atuam no setor industrial. Nossa missão é aplicar 35 anos de expertise em Comércio Exterior e regimes aduaneiros para acelerar a expansão global de empresas que tradicionalmente não têm acesso a metodologias avançadas de importação e exportação.
                </p>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg">
                <h3 className="text-white font-bold text-xl mb-4">Nossa Diferenciação</h3>
                <p className="text-gray-300">
                  Enquanto grandes corporações aplicam metodologias avançadas de Supply Chain 4.0, JIT/JIS e S&OP com operações internacionais estruturadas, empresas do setor industrial operam com processos obsoletos de importação e exportação. A OLV Internacional elimina essa lacuna, oferecendo expertise em internacionalização de Supply Chain adaptada para a realidade de empresas de médio porte.
                </p>
              </AnimatedCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SEÇÃO: NOSSA TRAJETÓRIA CORPORATIVA */}
      <section className="section py-8 bg-[#0a0f1d]">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#d4af37] mb-4">
              35 Anos Construindo Expertise em Ambientes Industriais Complexos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg">
                <h3 className="text-white font-bold text-xl mb-4">Nossa Origem</h3>
                <p className="text-gray-300">
                  A expertise da OLV Internacional foi construída através de atuação executiva em operações internacionais de grandes multinacionais dos setores automotivo, telecomunicações, energia, bens de capital e alimentício, culminando com consultoria estratégica para internacionalização de Supply Chain em operações regionais complexas.
                </p>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg">
                <h3 className="text-white font-bold text-xl mb-4">Nossa Evolução</h3>
                <p className="text-gray-300">
                  Durante décadas, a OLV Internacional acumulou conhecimento profundo em Supply Chain internacional de alta complexidade, operações de importação e exportação, gestão de regimes aduaneiros, compliance regulatório e otimização de custos em operações industriais globais de performance mundial.
                </p>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg">
                <h3 className="text-white font-bold text-xl mb-4">Nossa Decisão Estratégica</h3>
                <p className="text-gray-300">
                  Reconhecendo o potencial inexplorado das empresas brasileiras que atuam no setor industrial para internacionalização, a OLV Internacional decidiu dedicar toda sua expertise em Comércio Exterior exclusivamente a este segmento, criando metodologias específicas para maximizar resultados em operações internacionais de empresas de médio porte.
                </p>
              </AnimatedCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SEÇÃO: NOSSA METODOLOGIA PROPRIETÁRIA */}
      <section className="section py-8">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#d4af37] mb-4">
              Metodologia OLV 4D: Inteligência Multinacional para PMEs
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              A OLV Internacional desenvolveu uma metodologia proprietária que integra 35 anos de expertise em internacionalização de Supply Chain e Comércio Exterior em um processo estruturado especificamente para empresas que atuam no setor industrial.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {metodologia4D.map((etapa, index) => (
              <FadeIn key={index} delay={index * 0.2}>
                <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg hover:border-[#d4af37] hover:shadow-xl transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center mr-4">
                      <span className="text-[#0a0f1d] font-bold text-xl">{etapa.etapa}</span>
                    </div>
                    <h3 className="text-white font-bold text-xl">{etapa.titulo}</h3>
                  </div>
                  <p className="text-gray-300">{etapa.descricao}</p>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: SETORES INDUSTRIAIS QUE ATENDEMOS */}
      <section className="section py-8 bg-[#0a0f1d]">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#d4af37] mb-4">
              Expertise Aplicada em Diversos Setores Industriais
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              A OLV Internacional atende empresas que atuam no setor industrial com faturamento entre R$ 15M e R$ 150M em diversos segmentos da indústria brasileira, oferecendo expertise em internacionalização de Supply Chain e Comércio Exterior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {setoresIndustriais.map((setor, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg hover:border-[#d4af37] hover:shadow-xl transition-all duration-300">
                  <h3 className="text-white font-bold text-lg mb-3">{setor.setor}</h3>
                  <p className="text-gray-300 text-sm">{setor.descricao}</p>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: NOSSA PROPOSTA DE VALOR */}
      <section className="section py-8">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#d4af37] mb-4">
              Por Que a OLV Internacional é Única no Mercado
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {diferenciais.map((diferencial, index) => (
              <FadeIn key={index} delay={index * 0.2}>
                <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg hover:border-[#d4af37] hover:shadow-xl transition-all duration-300">
                  <h3 className="text-white font-bold text-xl mb-4">{diferencial.titulo}</h3>
                  <p className="text-gray-300">{diferencial.descricao}</p>
                </AnimatedCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO: NOSSA MISSÃO ATUAL */}
      <section className="section py-8 bg-[#0a0f1d]">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#d4af37] mb-4">
              Selecionando Parceiros Industriais Visionários
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg">
                <h3 className="text-white font-bold text-xl mb-4">Nossa Estratégia Atual</h3>
                <p className="text-gray-300">
                  A OLV Internacional está reativando suas operações de consultoria com foco exclusivo em internacionalização de Supply Chain para empresas que atuam no setor industrial. Estamos selecionando empresas visionárias que valorizem expertise comprovada em Comércio Exterior e estejam prontas para implementar metodologias de operações nacionais e internacionais.
                </p>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg">
                <h3 className="text-white font-bold text-xl mb-4">Nosso Processo de Seleção</h3>
                <p className="text-gray-300">
                  Buscamos parceiros do setor industrial comprometidos com transformação estratégica, dispostos a aplicar metodologias avançadas de Comércio Exterior e com visão de crescimento sustentável através de operações nacionais e internacionais.
                </p>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg">
                <h3 className="text-white font-bold text-xl mb-4">Nossa Oferta Exclusiva</h3>
                <p className="text-gray-300">
                  Diagnóstico Industrial Gratuito para as primeiras PMEs qualificadas, com processo de qualificação rigoroso para garantir resultados excepcionais.
                </p>
              </AnimatedCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SEÇÃO: COMO TRABALHAMOS */}
      <section className="section py-8">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#d4af37] mb-4">
              Nossa Abordagem de Parceria Estratégica
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeIn delay={0.1}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0a0f1d] font-bold text-2xl">1</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">Diagnóstico Profundo</h3>
                <p className="text-gray-300 text-sm">
                  Análise completa da sua operação no setor industrial usando metodologias de auditoria multinacional para identificar oportunidades de otimização em operações nacionais e internacionais.
                </p>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.2}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0a0f1d] font-bold text-2xl">2</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">Estratégia Personalizada</h3>
                <p className="text-gray-300 text-sm">
                  Desenvolvimento de roadmap específico baseado em best practices do setor industrial, adaptado para sua realidade e objetivos de crescimento através de operações nacionais e internacionais.
                </p>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.3}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0a0f1d] font-bold text-2xl">3</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">Implementação Estruturada</h3>
                <p className="text-gray-300 text-sm">
                  Execução por etapas com acompanhamento especializado, garantindo transformação real sem interrupção da produção através de operações nacionais e internacionais estruturadas.
                </p>
              </AnimatedCard>
            </FadeIn>

            <FadeIn delay={0.4}>
              <AnimatedCard className="bg-[#141c2f] p-6 rounded-lg border border-[#2a3448] shadow-lg text-center">
                <div className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center mx-auto mb-4">
                  <span className="text-[#0a0f1d] font-bold text-2xl">4</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">Otimização Contínua</h3>
                <p className="text-gray-300 text-sm">
                  Monitoramento constante de resultados com ajustes estratégicos para sustentabilidade e evolução contínua em operações nacionais e internacionais.
                </p>
              </AnimatedCard>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SEÇÃO CTA FINAL */}
      <section className="section py-8">
        <div className="container">
          <div className="bg-[#141c2f] p-8 rounded-lg border border-[#2a3448] shadow-xl text-center">
            <h2 className="text-3xl font-bold text-[#d4af37] mb-4">
              Conheça a OLV Internacional na Prática
            </h2>
            
            <p className="text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              Se sua empresa do setor industrial busca aplicar expertise em internacionalização de Supply Chain para crescer de forma sustentável através de operações nacionais e internacionais, a OLV Internacional pode ser a parceira estratégica que você procura.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contato" className="btn btn-primary text-lg px-8 py-3 font-semibold">
                Solicite Seu Diagnóstico Industrial Gratuito
              </Link>
              <Link href="/solucoes" className="btn btn-secondary text-lg px-8 py-3 font-semibold">
                Saiba Mais Sobre Nossa Metodologia 4D
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WhatsAppButton />
    </MainLayout>
  );
} 