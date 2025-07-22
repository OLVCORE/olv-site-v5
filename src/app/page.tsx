import MainLayout from '../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import RadarHub from '../components/home/RadarHub';
import HomeImage from '../components/home/HomeImage';
import { AnimatedCard, FadeIn } from '../components/MicroInteractions';

export const metadata = {
  title: 'OLV Internacional - Supply Chain Industrial | Comex para PMEs Industriais',
  description: 'Especialistas em otimização de Supply Chain e Comércio Exterior para indústrias de manufatura. 35 anos de expertise aplicada em PMEs industriais.',
  keywords: 'supply chain industrial, comex industrial, logística industrial, PME industrial, exportação industrial, importação industrial',
  alternates: {
    canonical: 'https://olvinternacional.com.br/'
  }
};

export default function HomePage() {
  // Os pilares de atuação da OLV Internacional - Foco Industrial
  const keyPoints = [
    { title: "Operação Legalizada Industrial", icon: "/icons/check.svg", 
      description: "Condução de processos de importação e exportação de insumos e produtos acabados dentro das normativas brasileiras e internacionais." },
    { title: "Redução Tributária Estruturada", icon: "/icons/check.svg", 
      description: "Planejamento fiscal estratégico para redução de carga tributária em operações de comércio exterior industrial." },
    { title: "Planejamento Logístico Integrado", icon: "/icons/check.svg", 
      description: "Organização completa do fluxo logístico internacional, da origem ao destino, otimizando fluxos de matéria-prima e produtos acabados." },
    { title: "Planejamento Estratégico Industrial", icon: "/icons/check.svg", 
      description: "Estruturação de operações internacionais para indústrias brasileiras de manufatura." },
    { title: "Acompanhamento Total", icon: "/icons/check.svg", 
      description: "Gestão de ponta a ponta das etapas operacionais, desde a negociação até a entrega final na linha de produção." },
    { title: "Gestão de Riscos Industriais", icon: "/icons/check.svg", 
      description: "Identificação, prevenção e mitigação de riscos aduaneiros, cambiais, logísticos e contratuais específicos da indústria." },
    { title: "Desenvolvimento de Negócios Industriais", icon: "/icons/check.svg", 
      description: "Estruturação de ofertas, definição de canais e abertura de novos mercados no exterior para produtos industriais." },
    { title: "Compliance e Governança Industrial", icon: "/icons/check.svg", 
      description: "Estruturação de modelos de compliance e governança para o mercado Nacional e Internacional no contexto industrial." },
    { title: "Automação e Tecnologia Aplicada", icon: "/icons/check.svg", 
      description: "Uso de plataformas digitais inteligentes para simular, integrar e otimizar operações internacionais com inteligência artificial e dados públicos." },
    { title: "Consultoria Customizada por Projeto Industrial", icon: "/icons/check.svg", 
      description: "Diagnóstico sob medida com soluções práticas e direcionadas à realidade de cada indústria, sem estruturas fixas ou pacotes engessados." },
    { title: "Inteligência de Mercado e Análise de Dados", icon: "/icons/check.svg", 
      description: "Utilização de dados privados e governamentais (Comex Stat, Receita Federal, SIASG, etc.) para tomada de decisão estratégica industrial." },
    { title: "Capacitação e Formação Técnica para PMEs Industriais", icon: "/icons/check.svg", 
      description: "Treinamentos, mentorias e suporte técnico para equipes internas de indústrias que desejam internalizar competências de Comex e Supply Chain." }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="section hero pt-0 pb-0 mb-0">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-2 bg-[#141c2f] p-5 rounded-lg border border-[#2a3448] shadow-lg">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Transforme sua Indústria em uma Máquina de Exportação/Importação Lucrativa
              </h1>
              <p className="text-lg text-gray-300 mb-4">
                A <span className="text-[#d4af37] font-semibold">OLV Internacional</span> é especialista em <strong>Reestruturação de Cadeias, Otimização de Comex e Redução de Custos</strong> para <strong>Indústrias de Manufatura de Médio Porte</strong> no Brasil.
              </p>
              <p className="mb-2 text-gray-300">
                <span className="text-[#d4af37] font-semibold">35 anos</span> integrando estratégia, operações e resultados. Somos especialistas em Supply Chain Industrial, Comex Industrial, Logística Internacional Fabril e Desenvolvimento de Negócios Industriais.
              </p>
              <p className="mb-2 text-gray-300">
                Atuamos como o braço consultivo do Ecossistema OLV, oferecendo suporte completo para
                indústrias que querem importar insumos, exportar produtos acabados, expandir seus negócios, operar com segurança e alta performance no
                mercado global.
              </p>
              <p className="mb-2 text-gray-300">
                Nossa missão é simplificar operações complexas, acelerar negócios industriais e integrar estratégias com resultados.
                Atuamos como uma extensão do seu negócio, sem ativos próprios, focando exclusivamente na entrega de valor.
              </p>
              <p className="text-[#d4af37] font-medium italic mb-4">
                Do Radar SISCOMEX ao Embarque. Da Estratégia à Execução. Da Burocracia ao Resultado.
              </p>
              <Link href="/diagnostico-industrial" className="btn btn-primary text-lg px-8 py-3 font-semibold">
                Solicite seu Diagnóstico Industrial Gratuito
              </Link>
            </div>
            <div className="flex-shrink-0 md:w-1/3">
              <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] shadow-md">
                <HomeImage 
                  src="/images/BANNER-HOME.jpeg" 
                  alt="Fábrica Industrial Moderna - OLV Internacional Especialistas em Supply Chain Industrial" 
                  width={460} 
                  height={460} 
                  className="rounded-lg" 
                  priority={true}
                  quality={85}
                />
              </div>
            </div>
          </div>

          {/* Slim CTA banner – agora ocupa toda a largura da viewport */}
          <div className="my-10 animate-gold-pulse bg-yellow-200/10 border-y border-yellow-400 px-4 py-1 md:py-[6px] text-sm md:text-base leading-snug text-gray-200 dark:text-gray-200 shadow-md home-alert">
            <p className="text-center max-w-6xl mx-auto">
              ⚠️ Importar insumos junto com seus concorrentes destrói sua margem industrial.
              <Link href="/solucoes/importacao-exclusiva" className="font-semibold underline text-[#d4af37] hover:text-yellow-300 ml-1">
                Descubra como dominar sua própria rota de importação industrial →
              </Link>
            </p>
          </div>

          {/* Radar 360 Hub – Simuladores & Calculadoras */}
          <div className="my-8">
            <RadarHub />
          </div>

          {/* Pilares de Atuação em mini-cards */}
          <div className="mb-2">
            <h3 className="text-2xl font-semibold mb-2 text-[#d4af37]">Pilares da Nossa Atuação Industrial</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {keyPoints.map((point, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <AnimatedCard 
                    className="bg-[#141c2f] p-3 rounded-lg border border-[#2a3448] shadow-md hover:border-[#d4af37] hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start mb-1">
                      <HomeImage src={point.icon} alt={point.title} width={20} height={20} className="mt-1 mr-2 flex-shrink-0" />
                      <h4 className="text-gray-200 font-semibold">{point.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm pl-7">{point.description}</p>
                  </AnimatedCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nossas Soluções Estratégicas */}
      <section className="section py-0 mb-0" id="servicos">
        <div className="container">
          <div className="section-heading mb-2 flex items-center gap-3">
            <div className="w-14 h-14 mb-1 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center">
              <Image src="/icons/solutions-icon.svg" alt="Ícone de Soluções" width={28} height={28} className="text-[#d4af37]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Nossas Soluções Estratégicas para Indústria</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Card 1 - Consultoria Estratégica em Comex */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37] hover:shadow-[0_0_0_2px_var(--color-accent)]">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/strategy.svg" alt="Ícone de Estratégia" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Consultoria Estratégica em Comex Industrial</h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Análise profunda de cenários, estruturação de operações internacionais e desenho de estratégias
                  personalizadas para cada perfil de indústria. Desenvolvemos roadmaps completos para
                  internacionalização segura, eficiente e escalável.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Análise de viabilidade para mercados-alvo industriais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Estruturação de modelos de negócio global industrial</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Planejamento estratégico internacional industrial</span>
                  </li>
                </ul>
                <Link href="/solucoes" className="mt-2 inline-block text-[#d4af37] hover:underline text-sm">Ver mais soluções →</Link>
              </div>
            </div>

            {/* Card 2 - Soluções Operacionais para Exportação e Importação */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37] hover:shadow-[0_0_0_2px_var(--color-accent)]">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/operations.svg" alt="Ícone de Operações" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Soluções Operacionais para Exportação e Importação Industrial</h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Condução completa de todos os processos operacionais de comércio exterior industrial, desde
                  habilitações e registros até o fechamento de câmbio, documentação e desembaraço
                  aduaneiro, com foco em conformidade e eficiência fabril.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Habilitação e manutenção de Radar SISCOMEX industrial</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Operações completas de importação e exportação industrial</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Gestão documental e análise de parametrização industrial</span>
                  </li>
                </ul>
                <Link href="/solucoes" className="mt-2 inline-block text-[#d4af37] hover:underline text-sm">Ver mais soluções →</Link>
              </div>
            </div>

            {/* Card 3 - Gestão de Supply Chain Integrado */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37] hover:shadow-[0_0_0_2px_var(--color-accent)]">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/supply-chain.svg" alt="Ícone Supply Chain" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Gestão de Supply Chain Industrial Integrado</h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Planejamento e otimização de toda a cadeia de suprimentos internacional industrial, desde
                  a identificação de fornecedores até a entrega ao cliente final, com foco em
                  redução de custos, minimização de riscos e aumento de eficiência fabril.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Gestão integrada de fornecedores globais industriais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Otimização de fluxos logísticos internacionais fabris</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Controle de inventário e planejamento de demanda industrial</span>
                  </li>
                </ul>
                <Link href="/solucoes" className="mt-2 inline-block text-[#d4af37] hover:underline text-sm">Ver mais soluções →</Link>
              </div>
            </div>
            
            {/* Card 4 - Tecnologia Aplicada à Competitividade */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37] hover:shadow-[0_0_0_2px_var(--color-accent)]">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/tech.svg" alt="Ícone de Tecnologia" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Tecnologia Aplicada à Competitividade Industrial</h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Implementação de soluções tecnológicas que automatizam processos industriais e geram
                  insights estratégicos para tomada de decisão baseada em dados. Nossa abordagem
                  combina ferramentas tecnológicas com expertise humana industrial.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Automação de processos em comércio exterior industrial</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Integração de sistemas e plataformas globais industriais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Análise de dados e inteligência de mercado industrial</span>
                  </li>
                </ul>
                <Link href="/solucoes" className="mt-2 inline-block text-[#d4af37] hover:underline text-sm">Ver mais soluções →</Link>
              </div>
            </div>
            
            {/* Card 5 - Compliance e Governança */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37] hover:shadow-[0_0_0_2px_var(--color-accent)]">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/compliance-icon.svg" alt="Ícone de Compliance" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Compliance e Governança Industrial</h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Implementação de estruturas de compliance e governança corporativa adaptadas
                  a operações internacionais industriais, garantindo conformidade com legislações locais
                  e internacionais, reduzindo riscos regulatórios e reputacionais.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Estruturação de programas de compliance internacional industrial</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Adequação a normas FCPA, UK Bribery Act e legislações locais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Gestão de riscos em operações multinacionais industriais</span>
                  </li>
                </ul>
                <Link href="/solucoes" className="mt-2 inline-block text-[#d4af37] hover:underline text-sm">Ver mais soluções →</Link>
              </div>
            </div>

            {/* CTA Filler Card - Integração Estratégica */}
            <div className="glass p-6 rounded-xl shadow-gold flex flex-col items-center text-center gap-4 hover:shadow-2xl transition-all duration-300">
              <h3 className="text-xl font-bold text-gray-100 leading-tight">Integre Estratégia, Tecnologia e Pessoas</h3>
              <p className="text-sm text-gray-300 max-w-xs">Unimos inteligência de dados, automação e visão humana para acelerar o crescimento global da sua indústria com segurança e performance.</p>
              <Link href="/solucoes" className="btn btn-primary text-sm px-5 py-2">Explorar Soluções</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Desafios da Indústria */}
      <section id="desafios-industria" className="section section-humano pt-6 pb-0 mb-0">
        <div className="container">
          <div className="bg-[#141c2f] rounded-lg border border-[#2a3448] overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-white mb-4">Sua Indústria Enfrenta Estes Desafios de Supply Chain e Comércio Exterior?</h2>
                <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
                  Identificamos os principais gargalos que impedem PMEs industriais de otimizar suas operações e reduzir custos
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Altos custos de importação de matéria-prima e componentes que reduzem sua margem de produção
                    </p>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Paradas na linha de produção devido a atrasos no desembaraço aduaneiro de insumos críticos
                    </p>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Falta de visibilidade na cadeia de suprimentos, impedindo a otimização do estoque fabril
                    </p>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Dificuldade em exportar produtos acabados para novos mercados, perdendo oportunidades
                    </p>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Burocracia complexa (REPETRO, RECOF, ex-tarifário) que impede a agilidade da indústria
                    </p>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Dependência de poucos fornecedores, expondo sua fábrica a riscos de ruptura
                    </p>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 md:col-span-2 lg:col-span-3">
                  <div className="flex items-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Falta de expertise interna em Comex, desviando foco da equipe de produção
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Link href="/contato" className="btn btn-primary text-lg px-8 py-3">
                  Se identificou? Agende um Diagnóstico Gratuito para sua Indústria
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cases de Sucesso Industriais */}
      <section id="cases-sucesso" className="section section-humano pt-6 pb-0 mb-0">
        <div className="container">
          <div className="bg-[#141c2f] rounded-lg border border-[#2a3448] overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-white mb-4">Resultados Reais na Indústria: Cases de Sucesso da OLV Internacional</h2>
                <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
                  Veja como transformamos desafios em oportunidades para PMEs industriais
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Otimização de Custos</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Empresa:</h4>
                      <p className="text-gray-300 text-sm">Indústria de Autopeças (R$ 80M faturamento)</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Desafio:</h4>
                      <p className="text-gray-300 text-sm">Altos custos de importação de aços especiais e componentes eletrônicos</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Solução:</h4>
                      <p className="text-gray-300 text-sm">Otimização da classificação fiscal e reengenharia do desembaraço aduaneiro</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Resultado:</h4>
                      <p className="text-gray-300 text-sm font-bold">Redução de 28% no custo de aquisição, liberando R$ 2,5M anuais</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Expansão de Mercado</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Empresa:</h4>
                      <p className="text-gray-300 text-sm">Fábrica de Máquinas Agrícolas (R$ 120M faturamento)</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Desafio:</h4>
                      <p className="text-gray-300 text-sm">Dependência do mercado nacional e dificuldade de expandir</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Solução:</h4>
                      <p className="text-gray-300 text-sm">Mapeamento de novos mercados e estruturação de canais</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Resultado:</h4>
                      <p className="text-gray-300 text-sm font-bold">3 novos mercados em 12 meses, +150% em exportações</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center mr-3">
                      <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Eficiência Logística</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Empresa:</h4>
                      <p className="text-gray-300 text-sm">Indústria Química (R$ 95M faturamento)</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Desafio:</h4>
                      <p className="text-gray-300 text-sm">Complexidade na importação de insumos químicos especiais</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Solução:</h4>
                      <p className="text-gray-300 text-sm">Implementação de Supply Chain 4.0 com IA e automação</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Resultado:</h4>
                      <p className="text-gray-300 text-sm font-bold">40% redução no lead time, 25% economia em custos logísticos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Credenciais Industriais */}
      <section id="credenciais-industriais" className="section section-humano pt-6 pb-0 mb-0">
        <div className="container">
          <div className="bg-[#141c2f] rounded-lg border border-[#2a3448] overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-white mb-4">Expertise Comprovada em Grandes Indústrias Globais</h2>
                <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
                  35 anos de experiência aplicada em multinacionais industriais, agora disponível para PMEs
                </p>
              </div>
              
              {/* Logos das Empresas */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-2 mx-auto p-2">
                      <Image 
                        src="/images/partners/volkswagen-logo.svg" 
                        alt="Volkswagen Logo" 
                        width={64} 
                        height={64} 
                        className="object-contain"
                      />
                    </div>
                    <p className="text-white font-semibold text-sm">Volkswagen</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-2 mx-auto p-2">
                      <Image 
                        src="/images/partners/ericsson-logo.svg" 
                        alt="Ericsson Logo" 
                        width={64} 
                        height={64} 
                        className="object-contain"
                      />
                    </div>
                    <p className="text-white font-semibold text-sm">Ericsson</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-2 mx-auto p-2">
                      <Image 
                        src="/images/partners/lupatech-logo.svg" 
                        alt="Lupatech Logo" 
                        width={64} 
                        height={64} 
                        className="object-contain"
                      />
                    </div>
                    <p className="text-white font-semibold text-sm">Lupatech</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-2 mx-auto p-2">
                      <Image 
                        src="/images/partners/san-antonio-logo.svg" 
                        alt="San Antonio Logo" 
                        width={64} 
                        height={64} 
                        className="object-contain"
                      />
                    </div>
                    <p className="text-white font-semibold text-sm">San Antonio</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center mb-2 mx-auto p-2">
                      <Image 
                        src="/images/partners/komatsu-logo.svg" 
                        alt="Komatsu Logo" 
                        width={64} 
                        height={64} 
                        className="object-contain"
                      />
                    </div>
                    <p className="text-white font-semibold text-sm">Komatsu</p>
                  </div>
                </div>
              </div>

              {/* Expertise Comprovada */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 text-center">
                  <div className="text-3xl font-bold text-[#d4af37] mb-2">35+</div>
                  <p className="text-gray-300 text-sm">Anos de Experiência</p>
                </div>
                
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 text-center">
                  <div className="text-3xl font-bold text-[#d4af37] mb-2">5</div>
                  <p className="text-gray-300 text-sm">Multinacionais Industriais</p>
                </div>
                
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 text-center">
                  <div className="text-3xl font-bold text-[#d4af37] mb-2">100%</div>
                  <p className="text-gray-300 text-sm">Foco em PMEs Industriais</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges de Credibilidade */}
      <section id="badges-credibilidade" className="section section-humano pt-6 pb-0 mb-0">
        <div className="container">
          <div className="bg-[#141c2f] rounded-lg border border-[#2a3448] overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-white mb-4">Credibilidade Comprovada</h2>
                <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
                  Reconhecimento e expertise validados por décadas de atuação no mercado industrial
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 text-center">
                  <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">35 Anos de Experiência</h3>
                  <p className="text-gray-300 text-sm">Expertise consolidada em Supply Chain e Comex</p>
                </div>
                
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 text-center">
                  <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Especialistas em Supply Chain Industrial</h3>
                  <p className="text-gray-300 text-sm">Foco exclusivo em operações industriais</p>
                </div>
                
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 text-center">
                  <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Expertise em Multinacionais</h3>
                  <p className="text-gray-300 text-sm">Experiência comprovada em grandes empresas</p>
                </div>
                
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 text-center">
                  <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <svg className="w-8 h-8 text-[#d4af37]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Foco em PMEs Industriais</h3>
                  <p className="text-gray-300 text-sm">Soluções customizadas para médias empresas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Industrial da OLV */}
      <section id="expertise-industrial" className="section section-humano pt-6 pb-0 mb-0">
        <div className="container">
          <div className="bg-[#141c2f] rounded-lg border border-[#2a3448] overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-extrabold text-white mb-2">Expertise Industrial da OLV: 35 Anos no Coração das Grandes Indústrias Globais</h2>
                <p className="text-gray-300 text-base text-center max-w-4xl mx-auto">
                  A OLV Internacional possui expertise comprovada em grandes multinacionais industriais como Volkswagen, Ericsson, Lupatech, San Antonio e Komatsu. Nossa experiência foi moldada em ambientes fabris complexos, aplicando conceitos como JIT/JIS, S&OP e REPETRO no contexto industrial. Trazemos essa expertise de multinacionais para PMEs industriais que buscam otimização e crescimento.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#141c2f] border border-[#d4af37] flex items-center justify-center mr-3">
                      <Image src="/icons/team.svg" alt="Ícone de Equipe" width={20} height={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Expertise Industrial</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Nossa equipe multidisciplinar combina conhecimento técnico industrial com habilidades interpessoais 
                    para construir relacionamentos de confiança e entregar soluções personalizadas para indústrias.
                  </p>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#141c2f] border border-[#d4af37] flex items-center justify-center mr-3">
                      <Image src="/icons/handshake.svg" alt="Ícone de Parceria" width={20} height={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Parceria de Longo Prazo</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Não somos apenas prestadores de serviço, mas parceiros estratégicos comprometidos 
                    com o crescimento sustentável e o sucesso contínuo das nossas indústrias parceiras.
                  </p>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#141c2f] border border-[#d4af37] flex items-center justify-center mr-3">
                      <Image src="/icons/culture.svg" alt="Ícone de Cultura" width={20} height={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Sensibilidade Cultural</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Entendemos as nuances culturais dos diferentes mercados e facilitamos a 
                    comunicação e negociação em ambientes internacionais diversos para indústrias.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}