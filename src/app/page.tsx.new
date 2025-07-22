import MainLayout from '../components/layout/MainLayout';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  // Os pilares de atuação da OLV Internacional
  const keyPoints = [
    { title: "Operação Legalizada", icon: "/icons/check.svg", 
      description: "Condução de processos de importação e exportação dentro das normativas brasileiras e internacionais." },
    { title: "Redução Tributária Estruturada", icon: "/icons/check.svg", 
      description: "Planejamento fiscal estratégico para redução de carga tributária em operações de comércio exterior." },
    { title: "Planejamento Logístico Integrado", icon: "/icons/check.svg", 
      description: "Organização completa do fluxo logístico internacional, da origem ao destino." },
    { title: "Planejamento Estratégico", icon: "/icons/check.svg", 
      description: "Estruturação de operações internacionais para empresas brasileiras." },
    { title: "Acompanhamento Total", icon: "/icons/check.svg", 
      description: "Gestão de ponta a ponta das etapas operacionais, desde a negociação até a entrega final." },
    { title: "Gestão de Riscos", icon: "/icons/check.svg", 
      description: "Identificação, prevenção e mitigação de riscos aduaneiros, cambiais, logísticos e contratuais." },
    { title: "Desenvolvimento de Negócios", icon: "/icons/check.svg", 
      description: "Estruturação de ofertas, definição de canais e abertura de novos mercados no exterior." },
    { title: "Compliance e Governança", icon: "/icons/check.svg", 
      description: "Estruturação de modelos de compliance e governança para o mercado Nacional e Internacional." },
    { title: "Automação e Tecnologia Aplicada", icon: "/icons/check.svg", 
      description: "Uso de plataformas digitais inteligentes para simular, integrar e otimizar operações internacionais com inteligência artificial e dados públicos." },
    { title: "Consultoria Customizada por Projeto", icon: "/icons/check.svg", 
      description: "Diagnóstico sob medida com soluções práticas e direcionadas à realidade de cada cliente, sem estruturas fixas ou pacotes engessados." },
    { title: "Inteligência de Mercado e Análise de Dados", icon: "/icons/check.svg", 
      description: "Utilização de dados privados e governamentais (Comex Stat, Receita Federal, SIASG, etc.) para tomada de decisão estratégica." },
    { title: "Capacitação e Formação Técnica para PMEs", icon: "/icons/check.svg", 
      description: "Treinamentos, mentorias e suporte técnico para equipes internas de empresas que desejam internalizar competências de Comex e Supply Chain." }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="section hero pt-0 pb-0 mb-0">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-2 bg-[#141c2f] p-5 rounded-lg border border-[#2a3448] shadow-lg">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2 text-white">Integramos Estratégia, Operação e Resultado</h2>
              <p className="mb-2 text-gray-300">
                <span className="text-[#d4af37] font-semibold">35 anos</span> integrando estratégia, operações e resultados. Somos especialistas em Supply Chain, Comércio Exterior, Logística Internacional e Desenvolvimento de Negócios.
              </p>
              <p className="mb-2 text-gray-300">
                Atuamos como o braço consultivo do Ecossistema OLV, oferecendo suporte completo para
                empresas que querem importar, exportar, expandir seus negócios, operar com segurança e alta performance no
                mercado global.
              </p>
              <p className="mb-2 text-gray-300">
                Nossa missão é simplificar operações complexas, acelerar negócios e integrar estratégias com resultados.
                Atuamos como uma extensão do seu negócio, sem ativos próprios, focando exclusivamente na entrega de valor.
              </p>
              <p className="text-[#d4af37] font-medium italic mb-2">
                Do Radar SISCOMEX ao Embarque. Da Estratégia à Execução. Da Burocracia ao Resultado.
              </p>
            </div>
            <div className="flex-shrink-0 md:w-1/3">
              <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] shadow-md">
                <Image 
                  src="/images/olv-internacional-banner.webp" 
                  alt="OLV Internacional – Banner Hero" 
                  width={400} 
                  height={400} 
                  className="rounded-lg" 
                  priority
                />
              </div>
            </div>
          </div>

          {/* Pilares de Atuação em mini-cards */}
          <div className="mb-2">
            <h3 className="text-2xl font-semibold mb-2 text-[#d4af37]">Pilares da Nossa Atuação</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {keyPoints.map((point, index) => (
                <div 
                  key={index}
                  className="bg-[#141c2f] p-3 rounded-lg border border-[#2a3448] shadow-md hover:border-[#d4af37] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start mb-1">
                    <Image src={point.icon} alt={point.title} width={20} height={20} className="mt-1 mr-2 flex-shrink-0" />
                    <h4 className="text-gray-200 font-semibold">{point.title}</h4>
                  </div>
                  <p className="text-gray-400 text-sm pl-7">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nossas Soluções Estratégicas */}
      <section className="section py-0 mb-0" id="servicos">
        <div className="container">
          <div className="section-heading mb-2">
            <div className="w-14 h-14 mx-auto mb-1 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center">
              <Image src="/icons/solutions-icon.svg" alt="Ícone de Soluções" width={28} height={28} className="text-[#d4af37]" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Nossas Soluções Estratégicas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Card 1 - Consultoria Estratégica em Comex */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/strategy.svg" alt="Ícone de Estratégia" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Consultoria Estratégica em Comex</h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Análise profunda de cenários, estruturação de operações internacionais e desenho de estratégias
                  personalizadas para cada perfil de empresa. Desenvolvemos roadmaps completos para
                  internacionalização segura, eficiente e escalável.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Análise de viabilidade para mercados-alvo</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Estruturação de modelos de negócio global</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Planejamento estratégico internacional</span>
                  </li>
                </ul>
                <Link href="/solucoes" className="mt-2 inline-block text-[#d4af37] hover:underline text-sm">Ver mais soluções →</Link>
              </div>
            </div>

            {/* Card 2 - Soluções Operacionais para Exportação e Importação */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/operations.svg" alt="Ícone de Operações" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Soluções Operacionais para Exportação e Importação</h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Condução completa de todos os processos operacionais de comércio exterior, desde
                  habilitações e registros até o fechamento de câmbio, documentação e desembaraço
                  aduaneiro, com foco em conformidade e eficiência.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Habilitação e manutenção de Radar SISCOMEX</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Operações completas de importação e exportação</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Gestão documental e análise de parametrização</span>
                  </li>
                </ul>
                <Link href="/solucoes" className="mt-2 inline-block text-[#d4af37] hover:underline text-sm">Ver mais soluções →</Link>
              </div>
            </div>

            {/* Card 3 - Gestão de Supply Chain Integrado */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/supply-chain.svg" alt="Ícone Supply Chain" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Gestão de Supply Chain Integrado</h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Planejamento e otimização de toda a cadeia de suprimentos internacional, desde
                  a identificação de fornecedores até a entrega ao cliente final, com foco em
                  redução de custos, minimização de riscos e aumento de eficiência.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Gestão integrada de fornecedores globais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Otimização de fluxos logísticos internacionais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Controle de inventário e planejamento de demanda</span>
                  </li>
                </ul>
                <Link href="/solucoes" className="mt-2 inline-block text-[#d4af37] hover:underline text-sm">Ver mais soluções →</Link>
              </div>
            </div>
            
            {/* Card 4 - Tecnologia Aplicada à Competitividade */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/tech.svg" alt="Ícone de Tecnologia" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Tecnologia Aplicada à Competitividade</h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Implementação de soluções tecnológicas que automatizam processos e geram
                  insights estratégicos para tomada de decisão baseada em dados. Nossa abordagem
                  combina ferramentas tecnológicas com expertise humana.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Automação de processos em comércio exterior</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Integração de sistemas e plataformas globais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Análise de dados e inteligência de mercado</span>
                  </li>
                </ul>
                <Link href="/solucoes" className="mt-2 inline-block text-[#d4af37] hover:underline text-sm">Ver mais soluções →</Link>
              </div>
            </div>
            
            {/* Card 5 - Compliance e Governança */}
            <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
              <div className="p-4">
                <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                  <Image src="/icons/compliance-icon.svg" alt="Ícone de Compliance" width={28} height={28} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Compliance e Governança</h3>
                <p className="text-gray-300 mb-3 text-sm">
                  Implementação de estruturas de compliance e governança corporativa adaptadas
                  a operações internacionais, garantindo conformidade com legislações locais
                  e internacionais, reduzindo riscos regulatórios e reputacionais.
                </p>
                <ul className="space-y-2 mb-3">
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Estruturação de programas de compliance internacional</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Adequação a normas FCPA, UK Bribery Act e legislações locais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Gestão de riscos em operações multinacionais</span>
                  </li>
                </ul>
                <Link href="/solucoes" className="mt-2 inline-block text-[#d4af37] hover:underline text-sm">Ver mais soluções →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Fator Humano na Nossa Atuação */}
      <section className="section py-0 mb-0">
        <div className="container">
          <div className="bg-[#141c2f] rounded-lg border border-[#2a3448] overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="section-heading mb-3">
                <h2 className="text-2xl font-bold text-white text-center mb-2">O Fator Humano</h2>
                <p className="text-gray-300 text-center max-w-3xl mx-auto">
                  Nossa abordagem é fundamentada na combinação de expertise técnica com inteligência emocional. 
                  Acreditamos que por trás de cada operação há pessoas, e compreender suas necessidades 
                  é essencial para entregar resultados excepcionais.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] hover:border-[#d4af37] transition-colors duration-300">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#141c2f] border border-[#d4af37] flex items-center justify-center mr-3">
                      <Image src="/icons/team.svg" alt="Ícone de Equipe" width={20} height={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">Expertise Humana</h3>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Nossa equipe multidisciplinar combina conhecimento técnico com habilidades interpessoais 
                    para construir relacionamentos de confiança e entregar soluções personalizadas.
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
                    com o crescimento sustentável e o sucesso contínuo dos nossos clientes.
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
                    comunicação e negociação em ambientes internacionais diversos.
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