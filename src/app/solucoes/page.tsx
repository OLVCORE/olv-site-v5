import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '../../components/layout/MainLayout';

export const metadata = {
  title: 'Soluções Estratégicas para Setores Industriais | Supply Chain Global e Comex | OLV Internacional',
  description: 'Soluções especializadas em Supply Chain Global e Comércio Exterior para agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura e logística industrial.',
  keywords: 'supply chain global, comex industrial, logística internacional fabril, otimização industrial, redução custos indústria, consultoria industrial, setores industriais',
  alternates: {
    canonical: 'https://olvinternacional.com.br/solucoes'
  }
};

export default function SolucoesPage() {
  return (
    <MainLayout className="solucoes-page">
      {/* HERO DE AUTORIDADE */}
      <section className="max-w-7xl mx-auto px-4 bg-[#141c2f] border border-[#2a3448] shadow-md rounded-xl p-8 text-gray-200 hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
        <div className="flex flex-row items-center justify-start gap-4 text-left">
          <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-[#d4af37] flex items-center justify-center">
            <Image src="/icons/solutions-icon.svg" alt="Soluções" width={32} height={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            Soluções Estratégicas em Supply Chain Global para Setores Industriais
          </h1>
        </div>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-6">
          Nossa missão é oferecer soluções especializadas em Supply Chain Global e Comércio Exterior para agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura e logística industrial, entre outros. Da inteligência à execução. Da importação à monetização fabril.
        </p>
      </section>

      {/* SLIM CTA BANNER – substitui grid de cards */}
      <div className="animate-gold-pulse bg-yellow-200/10 border-y border-yellow-400 py-1 md:py-[6px] text-sm md:text-base leading-snug text-gray-200 dark:text-gray-200 shadow-md max-w-6xl mx-auto px-4 my-[0.5cm] home-alert">
        <p className="text-center">
          ⚠️ Importar insumos junto com seus concorrentes destrói sua margem industrial.
          <Link href="/solucoes/importacao-exclusiva" className="font-semibold underline text-[#d4af37] hover:text-yellow-300 ml-1">
            Descubra como dominar sua própria rota de importação para setores industriais →
          </Link>
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Introdução */}
        <div className="bg-[#141c2f] rounded-lg p-6 mb-8 mt-[0.5cm] shadow-md border border-[#2a3448] hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-white mb-4">Nossa Expertise</h2>
          <p className="text-gray-300 mb-3">
            Bem-vindo ao portfólio de Soluções da OLV Internacional. Aqui você encontrará nossos serviços 
            especializados em Supply Chain Global e Comércio Exterior para agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura e logística industrial, entre outros.
          </p>
          <p className="text-gray-300">
            Nossa equipe de consultores experientes está pronta para apoiar empresas dos setores industriais (agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura e logística industrial) com soluções 
            personalizadas em importação, exportação, logística internacional, compliance, planejamento tributário
            e muito mais. Cada solução é desenhada para atender às necessidades específicas dos setores industriais,
            permitindo que você opere globalmente com segurança e eficiência.
          </p>
        </div>

        {/* Cards de Soluções */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 mb-12">
          {/* Card 1 - Consultoria Estratégica em Comex */}
          <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
            <div className="p-4">
              <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                <Image src="/icons/strategy.svg" alt="Ícone de Estratégia" width={28} height={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Indústria Exportadora Start-Up</h3>
              <p className="text-gray-300 mb-3 text-sm">
                Guie sua empresa dos setores industriais na jornada da primeira exportação com segurança e eficiência. Eliminamos a burocracia aduaneira e otimizamos seus processos internos de produção para o mercado global.
              </p>
              <ul className="space-y-2 mb-3">
                                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Habilitação Radar ágil para empresas dos setores industriais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Processos de exportação alinhados à produção industrial</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Redução de riscos de multas para empresas iniciantes em exportação</span>
                  </li>
              </ul>
              <Link href="/contato" className="inline-block text-[#d4af37] hover:underline text-sm">
                Saiba mais →
              </Link>
            </div>
          </div>

          {/* Card 2 - Soluções Operacionais para Exportação e Importação */}
          <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
            <div className="p-4">
              <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                <Image src="/icons/operations.svg" alt="Ícone de Operações" width={28} height={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Otimização Contínua da Cadeia</h3>
              <p className="text-gray-300 mb-3 text-sm">
                Suporte especializado para otimizar o fluxo de importação e exportação de componentes e produtos acabados. Garantimos agilidade e controle de custos para empresas dos setores industriais.
              </p>
              <ul className="space-y-2 mb-3">
                                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Redução de custos com frete para insumos dos setores industriais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Desembaraço aduaneiro acelerado de máquinas e peças</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Gestão de estoque otimizada para demanda dos setores industriais</span>
                  </li>
              </ul>
              <Link href="/contato" className="inline-block text-[#d4af37] hover:underline text-sm">
                Saiba mais →
              </Link>
            </div>
          </div>

          {/* Card 3 - Gestão de Supply Chain Integrado */}
          <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
            <div className="p-4">
              <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                <Image src="/icons/supply-chain.svg" alt="Ícone Supply Chain" width={28} height={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Logística 3PL</h3>
              <p className="text-gray-300 mb-3 text-sm">
                Gerenciamento total de fretes, armazenagem e desembaraço de matéria-prima, insumos e maquinário. Sua empresa dos setores industriais foca na produção, nós cuidamos da logística global.
              </p>
              <ul className="space-y-2 mb-3">
                                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Garantia de fluxo contínuo de insumos críticos para a produção</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Redução de custos logísticos para empresas dos setores industriais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Visibilidade completa da cadeia de suprimentos dos setores industriais</span>
                  </li>
              </ul>
              <Link href="/contato" className="inline-block text-[#d4af37] hover:underline text-sm">
                Saiba mais →
              </Link>
            </div>
          </div>

          {/* Card 4 - Tecnologia Aplicada à Competitividade */}
          <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
            <div className="p-4">
              <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                <Image src="/icons/tech.svg" alt="Ícone de Tecnologia" width={28} height={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Supply Chain 4.0</h3>
              <p className="text-gray-300 mb-3 text-sm">
                Modernize e digitalize toda a cadeia de suprimentos da sua empresa dos setores industriais, integrando importação, exportação, logística e comex com IA e automação para ganhos exponenciais.
              </p>
              <ul className="space-y-2 mb-3">
                                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Simuladores inteligentes para calcular custos de importação e exportação</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Plataforma Radar 360 com cotações em tempo real</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Automação de documentos aduaneiros e compliance</span>
                  </li>
              </ul>
              <Link href="/contato" className="inline-block text-[#d4af37] hover:underline text-sm">
                Saiba mais →
              </Link>
            </div>
          </div>

          {/* Card 5 - Compliance e Governança Estratégica */}
          <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300">
            <div className="p-4">
              <div className="w-14 h-14 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center mb-3">
                <Image src="/icons/compliance.svg" alt="Ícone de Compliance" width={28} height={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Consultoria Sênior In-House</h3>
              <p className="text-gray-300 mb-3 text-sm">
                Expertise da OLV Internacional com 35 anos de experiência em multinacionais dos setores industriais atuando lado a lado com sua equipe para otimizar operações críticas da sua empresa.
              </p>
              <ul className="space-y-2 mb-3">
                                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Aceleração de projetos dos setores industriais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Transferência de conhecimento para equipes dos setores industriais</span>
                  </li>
                  <li className="bg-[#1a2338] p-2 rounded-lg flex items-start border border-[#2a3448] hover:border-[#d4af37] hover:transform hover:translate-x-1 transition-all duration-200">
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mt-1 mr-2 flex-shrink-0" />
                    <span className="text-xs text-gray-300">Resolução de problemas complexos de produção e logística</span>
                  </li>
              </ul>
              <Link href="/contato" className="inline-block text-[#d4af37] hover:underline text-sm">
                Saiba mais →
              </Link>
            </div>
          </div>

          {/* CTA Filler Card - Transformação Internacional */}
          <div className="glass p-6 rounded-xl shadow-gold flex flex-col items-center text-center gap-4 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-100 leading-tight">Pronto para Transformar sua Empresa Internacionalmente?</h3>
            <p className="text-sm text-gray-300 max-w-xs">Fale com nossos consultores hoje mesmo e descubra como nossa estratégia e força tática podem impulsionar sua empresa dos setores industriais no comércio internacional.</p>
            <Link href="/contato" className="btn btn-primary text-sm px-5 py-2">Solicite uma Consultoria</Link>
          </div>
        </div>

        {/* Novos Serviços Detalhados */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Serviços Detalhados</h2>
          <p className="text-gray-300 mb-6 text-center max-w-4xl mx-auto">
            Abaixo detalhamos nossos principais serviços em Supply Chain Global e Comércio Exterior para agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura e logística industrial, entre outros. Cada solução pode ser personalizada de acordo com as necessidades específicas dos setores industriais (agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura e logística industrial).
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Card 1 - Consultoria em Exportação */}
            <div className="bg-[#141c2f] rounded-lg shadow-lg overflow-hidden border border-[#2a3448] transition-all duration-300 hover:shadow-xl hover:border-[#d4af37]">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-[#0a0f1d] flex items-center justify-center p-5 border-r border-[#2a3448]">
                  <div className="w-14 h-14 rounded-full bg-[#141c2f] border-2 border-[#d4af37] flex items-center justify-center">
                    <Image 
                      src="/icons/export-icon.svg" 
                      alt="Consultoria em Exportação" 
                      width={28} 
                      height={28}
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-5">
                  <h3 className="text-lg font-bold text-white mb-2">Consultoria em Exportação</h3>
                  <p className="text-gray-300 mb-3 text-sm">
                    Desenvolvemos estratégias de exportação personalizadas para empresas de todos os portes. Nosso serviço abrange desde a análise inicial de viabilidade até a execução completa da operação.
                  </p>
                  <ul className="text-gray-300 space-y-1.5 mb-3">
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Planejamento Estratégico de Exportação</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Documentação e Compliance Internacional</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Exportação de Produtos, Máquinas, Serviços e Commodities</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Logística Internacional 3PL | 4PL para Exportação</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Planejamento Tributário na Exportação</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Despacho Aduaneiro Internacional</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Estratégia de Redução de Custos Operacionais</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Operação Assistida e Mentoria para Exportação</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Gestão Completa da Cadeia de Exportação</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Exportação sob Regimes Especiais</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 2 - Consultoria em Importação */}
            <div className="bg-[#141c2f] rounded-lg shadow-lg overflow-hidden border border-[#2a3448] transition-all duration-300 hover:shadow-xl hover:border-[#d4af37]">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-[#0a0f1d] flex items-center justify-center p-5 border-r border-[#2a3448]">
                  <div className="w-14 h-14 rounded-full bg-[#141c2f] border-2 border-[#d4af37] flex items-center justify-center">
                    <Image 
                      src="/icons/import-icon.svg" 
                      alt="Consultoria em Importação" 
                      width={28} 
                      height={28}
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-5">
                  <h3 className="text-lg font-bold text-white mb-2">Consultoria em Importação</h3>
                  <p className="text-gray-300 mb-3 text-sm">
                    Oferecemos suporte completo em importação, desde a análise de viabilidade, estruturação, até a operacionalização e otimização de processos de compra internacional.
                  </p>
                  <ul className="text-gray-300 space-y-1.5 mb-3">
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Abertura e Estruturação de Importadoras</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Regularização e Habilitação no Radar SISCOMEX</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Importação para Revenda, Produção ou Consumo</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Compliance Aduaneiro e Tributário na Importação</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Planejamento Tributário (Ex-Tarifário, Drawback, RECOF)</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Logística Internacional (Door-to-Door)</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Gestão de Freight Forwarder e Custos Logísticos</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Operação Assistida e Treinamento Prático</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Estratégias de Redução de Custos Tributários</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Due Diligence Operacional na Cadeia de Importação</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 3 - Logística Internacional | Supply Chain */}
            <div className="bg-[#141c2f] rounded-lg shadow-lg overflow-hidden border border-[#2a3448] transition-all duration-300 hover:shadow-xl hover:border-[#d4af37]">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-[#0a0f1d] flex items-center justify-center p-5 border-r border-[#2a3448]">
                  <div className="w-14 h-14 rounded-full bg-[#141c2f] border-2 border-[#d4af37] flex items-center justify-center">
                    <Image 
                      src="/icons/logistics-icon.svg" 
                      alt="Logística Internacional" 
                      width={28} 
                      height={28}
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-5">
                  <h3 className="text-lg font-bold text-white mb-2">Logística Internacional | Supply Chain | 3PL & 4PL</h3>
                  <p className="text-gray-300 mb-3 text-sm">
                    Planejamento e gestão completa da cadeia de suprimentos global, garantindo eficiência, rastreabilidade e otimização de custos logísticos em toda a operação.
                  </p>
                  <ul className="text-gray-300 space-y-1.5 mb-3">
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Gestão Ponta a Ponta da Cadeia Logística</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Freight Forwarding Global (Aéreo, Marítimo, Multimodal)</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Gerenciamento de Armazéns e Centros de Distribuição</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Planejamento Logístico Estratégico</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Monitoramento de Embarques Globais</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">S&OP Internacional (Sales & Operations Planning)</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Controle de Estoques Globais (JIT / JIS / Kanban)</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Otimização de CAPEX e OPEX Logístico</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Estratégias de Nearshoring e Offshoring</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Redução de Custos Logísticos Internacionais</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 4 - Compliance, Planejamento Tributário e Due Diligence */}
            <div className="bg-[#141c2f] rounded-lg shadow-lg overflow-hidden border border-[#2a3448] transition-all duration-300 hover:shadow-xl hover:border-[#d4af37]">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-[#0a0f1d] flex items-center justify-center p-5 border-r border-[#2a3448]">
                  <div className="w-14 h-14 rounded-full bg-[#141c2f] border-2 border-[#d4af37] flex items-center justify-center">
                    <Image 
                      src="/icons/compliance-icon.svg" 
                      alt="Compliance e Planejamento Tributário" 
                      width={28} 
                      height={28}
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-5">
                  <h3 className="text-lg font-bold text-white mb-2">Compliance, Planejamento Tributário e Due Diligence</h3>
                  <p className="text-gray-300 mb-3 text-sm">
                    Garantimos que sua operação internacional esteja em conformidade com normas e regulamentos, maximizando eficiência tributária e minimizando riscos legais e operacionais.
                  </p>
                  <ul className="text-gray-300 space-y-1.5 mb-3">
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Planejamento Tributário Nacional e Internacional</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Compliance Aduaneiro, Fiscal e Tributário</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Gestão de Regimes Especiais (Drawback, RECOF, Linha Azul)</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Regularização Societária e Operacional para Comex</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Auditorias Fiscais, Operacionais e Aduaneiras</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Gestão de Riscos Jurídicos e Operacionais</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Due Diligence Comercial, Fiscal e Logística</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Blindagem Empresarial para Operações Internacionais</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Análise Contratual para Comércio Exterior</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Mitigação de Riscos na Operação Logística e Cambial</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 5 - Treinamento, Mentoria e Capacitação Executiva */}
            <div className="bg-[#141c2f] rounded-lg shadow-lg overflow-hidden border border-[#2a3448] transition-all duration-300 hover:shadow-xl hover:border-[#d4af37]">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 bg-[#0a0f1d] flex items-center justify-center p-5 border-r border-[#2a3448]">
                  <div className="w-14 h-14 rounded-full bg-[#141c2f] border-2 border-[#d4af37] flex items-center justify-center">
                    <Image 
                      src="/icons/training-icon.svg" 
                      alt="Treinamento e Capacitação" 
                      width={28} 
                      height={28}
                    />
                  </div>
                </div>
                <div className="md:w-2/3 p-5">
                  <h3 className="text-lg font-bold text-white mb-2">Treinamento, Mentoria e Capacitação Executiva</h3>
                  <p className="text-gray-300 mb-3 text-sm">
                    Desenvolvemos e fortalecemos as competências da sua equipe em comércio exterior, capacitando profissionais para tomada de decisões estratégicas e operacionais.
                  </p>
                  <ul className="text-gray-300 space-y-1.5 mb-3">
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Cursos Intensivos de Importação e Exportação</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Workshops em Supply Chain, Comex e Logística Internacional</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Mentoria Personalizada para Empresários e Equipes</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Operação Assistida (Aprenda na Prática)</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Capacitação em Compliance, Documentação e Aduana</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Gestão Estratégica de Custos e Logística Internacional</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Desenvolvimento de Lideranças em Comex e Supply Chain</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">S&OP, Forecasting, Planejamento e Execução Global</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Gestão de Riscos e Soluções de Crises Logísticas</span>
                    </li>
                    <li className="flex items-start">
                      <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Consultoria Educacional para PMEs e Multinacionais</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 