import MainLayout from '../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';
import RadarHub from '../components/home/RadarHub';
import HomeImage from '../components/home/HomeImage';
import { FadeIn } from '../components/MicroInteractions';
import { OrganizationSchema, LocalBusinessSchema } from '../components/SeoSchema';


export const metadata = {
  title: 'OLV Internacional - Supply Chain Industrial | Comex para PMEs Industriais',
  description: 'Consultoria especializada em Supply Chain Industrial e Comércio Exterior para PMEs. Experiência consolidada em setores industriais diversos. Otimizamos importação de insumos, exportação de produtos acabados e redução de custos logísticos. Radar SISCOMEX, desembaraço aduaneiro e planejamento tributário.',
      keywords: 'consultoria importação exportação, supply chain industrial, comércio exterior PME, logística internacional, desembaraço aduaneiro, radar siscomex, planejamento tributário comex, importação insumos industriais, exportação produtos acabados, redução custos importação, otimização supply chain, consultoria comex industrial, frete internacional, câmbio importação, impostos importação, compliance aduaneiro, logística 4.0, automação comex, inteligência mercado industrial, consultoria estratégica industrial, PME industrial, setores industriais, expertise industrial, cadeia suprimentos, otimização estoques, lead time importação, custos portuários, demurrage porto, incoterms 2020, ncm classificação fiscal, drawback suspensão, regime aduaneiro especial, due diligence global, trading company, importação drop shipping, commodities importação, bens capital importação, produtos acabados importação, insumos matéria prima, licenciamento anvisa, certificado origem, compliance aeo oea, controle riscos aduaneiros, digitalização processos comex, documentos exportação, financiamento exim, habilitar radar siscomex, cotação dólar importação, custos portuários despacho, demurrage porto evitar, despacho aduaneiro etapas, diferença incoterms 2020, digitalização processos comex, documentos necessários exportação, drawback suspensão benefícios, due diligence global, engage o que é, escolha mercado alvo exportação, escolher transportadora internacional, exceltta o que é, financiamento exim, finx o que é, habilitar radar siscomex requisitos, importação bens capital, importação commodities, importação drop shipping regulamentação, importação insumos matéria prima, importação produtos acabados, labs o que é, licenciamento anvisa importação, logística 4.0 benefícios supply chain, ncm classificação fiscal, negociar câmbio importação, otimização estoques importação, passos li anvisa, planejamento tributário importação, plano internacionalização PME, quanto custa importar china, reduzir lead time importação, regimes aduaneiros especiais, risco cambial hedge, seguro carga internacional, simulador custo importação, simulador frete internacional, simulador tax importação, siscomex li declaração, stratevo o que é, supply chain resiliente, trading company vs importação própria, ventures o que é, veritus o que é',
  alternates: {
    canonical: 'https://olvinternacional.com.br/'
  },
  openGraph: {
    title: 'OLV Internacional - Supply Chain Industrial | Comex para PMEs Industriais',
    description: 'Consultoria especializada em Supply Chain Industrial e Comércio Exterior para PMEs. Experiência consolidada em setores industriais diversos. Otimizamos importação de insumos, exportação de produtos acabados e redução de custos logísticos.',
    url: 'https://olv-site-v5.vercel.app/',
    siteName: 'OLV Internacional',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: 'https://olv-site-v5.vercel.app/images/BANNER-HOME.jpeg',
        width: 1200,
        height: 630,
        alt: 'OLV Internacional - Especialistas em Supply Chain Industrial'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OLV Internacional - Supply Chain Industrial',
    description: 'Consultoria especializada em Supply Chain Industrial e Comércio Exterior para PMEs. Experiência consolidada em setores industriais diversos.',
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
                Consultoria Especializada em Supply Chain e Comércio Exterior para Empresas Industriais
              </h1>
              <p className="text-lg text-gray-300 mb-4">
                A <span className="text-[#d4af37] font-semibold">OLV Internacional</span> oferece <strong>consultoria especializada em Supply Chain Industrial e Comércio Exterior</strong> para empresas que atuam no setor industrial, com foco em otimização de processos e redução de custos operacionais.
              </p>
              <p className="mb-2 text-gray-300">
                Com <span className="text-[#d4af37] font-semibold">experiência consolidada</span> em setores industriais diversos, nossa equipe possui expertise especializada em Supply Chain Industrial, Comércio Exterior, Logística Internacional e Desenvolvimento de Negócios para o setor industrial.
              </p>
              <p className="mb-2 text-gray-300">
                Atuamos como parceiro consultivo do Ecossistema OLV, oferecendo suporte especializado para empresas que buscam importar insumos, exportar produtos acabados, expandir suas operações e operar com eficiência no mercado global.
              </p>
              <p className="mb-2 text-gray-300">
                Nossa abordagem visa simplificar operações complexas, otimizar processos industriais e integrar estratégias com resultados práticos. Atuamos como extensão da sua equipe, sem ativos próprios, focando exclusivamente na entrega de valor e resultados mensuráveis.
              </p>
              <p className="text-[#d4af37] font-medium italic mb-4">
                Do planejamento estratégico à execução operacional. Da análise de viabilidade aos resultados concretos.
              </p>
              <Link href="/contato" className="btn btn-primary text-lg px-8 py-3 font-semibold">
                Agende uma Consultoria Especializada
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

          {/* Banner informativo sobre otimização de importação */}
          <div className="my-10 animate-gold-pulse bg-yellow-200/10 border-y border-yellow-400 px-4 py-1 md:py-[6px] text-sm md:text-base leading-snug text-gray-200 dark:text-gray-200 shadow-md home-alert">
            <p className="text-center max-w-6xl mx-auto">
              💡 A importação de insumos em rotas compartilhadas pode impactar a competitividade industrial.
              <Link href="/solucoes/importacao-exclusiva" className="font-semibold underline text-[#d4af37] hover:text-yellow-300 ml-1">
                Conheça soluções para otimizar sua rota de importação industrial →
              </Link>
            </p>
          </div>

          {/* Radar 360 Hub – Simuladores & Calculadoras */}
          <div className="my-8">
            <RadarHub />
          </div>

          {/* Pilares de Atuação em mini-cards */}
          <div className="mb-2">
            <h3 className="text-2xl font-semibold mb-2 text-[#d4af37]">Nossas Áreas de Especialização</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {keyPoints.map((point, index) => (
                <FadeIn key={index} delay={index * 0.1}>
                  <div 
                    className="bg-[#141c2f] p-3 rounded-lg border border-[#2a3448] shadow-md hover:border-[#d4af37] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex items-start mb-1">
                      <HomeImage src={point.icon} alt={point.title} width={20} height={20} className="mt-1 mr-2 flex-shrink-0" />
                      <h4 className="text-gray-200 font-semibold">{point.title}</h4>
                    </div>
                    <p className="text-gray-400 text-sm pl-7">{point.description}</p>
                  </div>
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
            <h2 className="text-2xl font-bold mb-2">Nossas Soluções Especializadas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Card 1 - Consultoria Estratégica em Comex */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4af37] hover:shadow-[0_0_0_2px_var(--color-accent)]">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/strategy.svg" alt="Ícone de Estratégia" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Consultoria Estratégica em Comércio Exterior</h3>
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
                <h2 className="text-3xl font-extrabold text-white mb-4">Resultados Executivos Transformadores</h2>
                <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto">
                  Experiência comprovada em Supply Chain Global com impacto direto em resultados financeiros
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border border-emerald-400 flex items-center justify-center mr-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">BPO Empresa de Alimentos LATAM</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Projeto:</h4>
                      <p className="text-gray-300 text-sm">Desenvolvimento de projetos de eficiência logística (ENALTECER)</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Escopo:</h4>
                      <p className="text-gray-300 text-sm">Procurement estratégico com foco em otimização de Supply Chain</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Impacto Financeiro:</h4>
                      <p className="text-gray-300 text-sm font-bold">Redução de custos estimada em KUSD 937,0</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 border border-amber-400 flex items-center justify-center mr-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Reestruturação Comércio Exterior - Óleo e Gás</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Projeto:</h4>
                      <p className="text-gray-300 text-sm">Importação/Exportação equipamentos sob regimes especiais (REPETRO)</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Escopo:</h4>
                      <p className="text-gray-300 text-sm">Reestruturação completa da área de comércio exterior</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Proteção Financeira:</h4>
                      <p className="text-gray-300 text-sm font-bold">Evitadas multas de MR$ 15,0 nos primeiros 6 meses</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border border-blue-400 flex items-center justify-center mr-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Gestão Supply Chain Multinacional</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Projeto:</h4>
                      <p className="text-gray-300 text-sm">Gestão de compras CAPEX/OPEX para 17 filiais em 7 países LATAM</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Escopo:</h4>
                      <p className="text-gray-300 text-sm">Strategic Sourcing para 32 categorias - 3 tabelas de compras</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Volume Financeiro:</h4>
                      <p className="text-gray-300 text-sm font-bold">Gasto estimado de USD 575 MM/ano</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 border border-purple-400 flex items-center justify-center mr-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Implementação JIT/JIS - Sondas de Perfuração</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Projeto:</h4>
                      <p className="text-gray-300 text-sm">Ações de JIT/JIS em operações de MRO</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Escopo:</h4>
                      <p className="text-gray-300 text-sm">Otimização de logística e estoque para equipamentos de perfuração</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Eficiência Operacional:</h4>
                      <p className="text-gray-300 text-sm font-bold">Redução de 15% em custos combinados = MR$ 1,0 a.a. por equipamento</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 border border-rose-400 flex items-center justify-center mr-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Metodologias S&OP - Projetos Offshore</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Projeto:</h4>
                      <p className="text-gray-300 text-sm">Implementação de metodologias S&OP em projetos selecionados</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Escopo:</h4>
                      <p className="text-gray-300 text-sm">Otimização de fluxo de caixa, OTD e redução de estoque</p>
                    </div>
                    <div>
                      <h4 className="text-[#d4af37] font-semibold text-sm">Impacto Financeiro:</h4>
                      <p className="text-gray-300 text-sm font-bold">Evitados gastos de 15% a 20% no fluxo de caixa</p>
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
                  Experiência consolidada em setores industriais diversos, agora disponível para PMEs
                </p>
              </div>
              
              {/* Setores Industriais Especializados */}
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center mb-2 mx-auto p-2 shadow-lg border border-slate-200">
                      <svg className="w-10 h-10 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-xs">Insumos</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center mb-2 mx-auto p-2 shadow-lg border border-slate-200">
                      <svg className="w-10 h-10 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-xs">Máquinas</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center mb-2 mx-auto p-2 shadow-lg border border-slate-200">
                      <svg className="w-10 h-10 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-xs">Equipamentos</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center mb-2 mx-auto p-2 shadow-lg border border-slate-200">
                      <svg className="w-10 h-10 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-xs">Bens de Capital</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center mb-2 mx-auto p-2 shadow-lg border border-slate-200">
                      <svg className="w-10 h-10 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-4.7 6.28c-.37.5-.58 1.11-.58 1.73V20c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2z"/>
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-xs">Óleo e Gás</p>
                  </div>
                </div>
                
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl flex items-center justify-center mb-2 mx-auto p-2 shadow-lg border border-slate-200">
                      <svg className="w-10 h-10 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-4.7 6.28c-.37.5-.58 1.11-.58 1.73V20c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2z"/>
                      </svg>
                    </div>
                    <p className="text-white font-semibold text-xs">Serviços Industriais</p>
                  </div>
                </div>
              </div>

              {/* Expertise Comprovada */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 text-center">
                  <div className="text-3xl font-bold text-[#d4af37] mb-2">✓</div>
                  <p className="text-gray-300 text-sm">Expertise Consolidada</p>
                </div>
                
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 text-center">
                  <div className="text-3xl font-bold text-[#d4af37] mb-2">✓</div>
                  <p className="text-gray-300 text-sm">Setores Industriais Diversos</p>
                </div>
                
                <div className="bg-[#0a0f1d] p-6 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300 text-center">
                  <div className="text-3xl font-bold text-[#d4af37] mb-2">✓</div>
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
                  <h3 className="text-lg font-bold text-white mb-2">Expertise Consolidada</h3>
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
                <h2 className="text-3xl font-extrabold text-white mb-2">Expertise Industrial da OLV: Experiência Consolidada em Setores Industriais Diversos</h2>
                <p className="text-gray-300 text-base text-center max-w-4xl mx-auto">
                  A OLV Internacional possui expertise comprovada em diversos setores industriais, incluindo automotivo, eletrônico, químico, máquinas e equipamentos. Nossa experiência foi moldada em ambientes fabris complexos, aplicando conceitos como JIT/JIS, S&OP e REPETRO no contexto industrial. Trazemos essa expertise consolidada para PMEs industriais que buscam otimização e crescimento.
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

      {/* Structured Data for SEO */}
      <OrganizationSchema />
      <LocalBusinessSchema />
    </MainLayout>
  );
}