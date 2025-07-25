import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import Icon from '../../components/icons/Icon';
import RealtimeQuotes from '../../components/radar/RealtimeQuotes';
import CommoditiesQuotes from '../../components/radar/CommoditiesQuotes';

export const metadata = {
  title: 'Radar 360 | OLV Internacional - Inteligência e Dados para Setores Industriais',
  description: 'Acesse o Radar 360 da OLV Internacional: dados em tempo real, inteligência de mercado e simuladores para otimizar operações de Supply Chain Global e Comércio Exterior para agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura e logística industrial.',
  keywords: 'radar 360, dados tempo real, inteligência mercado, simuladores comex, supply chain global, setores industriais, agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura, logística industrial',
  alternates: {
    canonical: 'https://olvinternacional.com.br/radar360'
  },
};

export default function Radar360Page() {
  return (
    <MainLayout>
      <div className="main-content pt-24 md:pt-28 radar-360-page">
        {/* SEÇÃO HERO RADAR 360 */}
        <section className="section">
          <div className="container">
            <div className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-white mb-4">
                <Icon src="/icons/radar-icon.svg" alt="Radar 360" size="sm" className="text-accent" />
                OLV Radar 360 – Central de Inteligência & Dados
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Bem-vindo ao <strong>Radar&nbsp;360</strong>, nossa central de inteligência e dados para empresas dos setores industriais. Aqui você encontra ferramentas essenciais para tomada de decisão: cotações em tempo real, simuladores de custos, indicadores econômicos e recursos estratégicos para operações globais de Supply Chain e Comércio Exterior.&nbsp;
                <br className="hidden md:block" />
                Transforme dados em decisões inteligentes para sua empresa dos setores industriais.
              </p>
              <Link 
                href="/contato" 
                className="btn btn-primary font-bold py-3 px-6"
              >
                Fale com um Especialista
              </Link>
            </div>
          </div>
        </section>

        {/* PAINÉIS LADO A LADO */}
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Painel SIMULADORES */}
            <div className="order-1 lg:order-none" id="simuladores">
              <section className="section p-0">
                <div className="glass p-6 rounded-2xl shadow-gold card-hover">
                  <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    <span className="text-accent">🧮</span> Simuladores e Calculadoras
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Import Cost */}
                    <div className="glass p-4 rounded-xl card-hover">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Simulador de Custos de Importação</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">Calcule impostos, fretes e taxas para sua operação de importação.</p>
                      <Link href="/simuladores/importacao" className="btn btn-primary text-sm py-2 px-3 w-full text-center">Abrir Simulador</Link>
                    </div>
                    {/* Export Cost */}
                    <div className="glass p-4 rounded-xl card-hover">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Simulador de Custos de Exportação</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">Calcule receita líquida e crédito Reintegra.</p>
                      <Link href="/simuladores/exportacao" className="btn btn-primary text-sm py-2 px-3 w-full block text-center">Abrir Simulador</Link>
                    </div>
                    {/* Currency Converter */}
                    <div className="glass p-4 rounded-xl card-hover">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Simulador Cambial</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">Converta valores entre diferentes moedas com taxas atualizadas.</p>
                      <Link href="/simuladores/cambio" className="btn btn-primary text-sm py-2 px-3 w-full block text-center">Abrir Conversor</Link>
                    </div>
                    {/* Freight Calculator */}
                    <div className="glass p-4 rounded-xl card-hover">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Calculadora de Fretes Internacionais</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">Estime custos de frete aéreo, marítimo e rodoviário.</p>
                      <Link href="/simuladores/frete-full" className="btn btn-primary text-sm py-2 px-3 w-full block text-center">Abrir Calculadora</Link>
                    </div>
                    {/* Tax Sim placeholder */}
                    <div className="glass p-4 rounded-xl card-hover">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Simulador Tributário Comex</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">Entenda a carga tributária para seus produtos na importação e exportação.</p>
                      <Link href="/simuladores/tributario-light" className="btn btn-primary text-sm py-2 px-3 w-full block text-center">Abrir Simulador</Link>
                    </div>
                    {/* Future: Peso/Volume Converter */}
                    <div className="glass p-4 rounded-xl card-hover">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Conversor Peso ⚖️ Volume</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">Calcule peso cubado e otimização de frete internacional.</p>
                      <Link href="/simuladores/cubagem" className="btn btn-primary text-sm py-2 px-3 w-full block text-center">Abrir Conversor</Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA Filler Card */}
              <section className="section p-0 mt-6 hidden lg:block">
                <div className="glass p-6 rounded-2xl shadow-gold flex flex-col items-center text-center gap-4 card-hover">
                  <h3 className="text-lg font-bold text-gray-100">Radar&nbsp;360 é sua central de inteligência</h3>
                  <p className="text-sm text-gray-300 max-w-md">Cotações em tempo real, simuladores e insights para decisões globais de empresas dos setores industriais — totalmente integrados ao ecossistema OLV.</p>
                  <Link href="/solucoes" className="btn btn-primary text-sm px-5 py-2">Explorar Soluções</Link>
                </div>
              </section>
            </div>

            {/* Painel COTAÇÕES */}
            <div className="order-2 lg:order-none" id="cotacoes">
              {/* Cotações Moedas */}
              <section className="section p-0">
                <div className="glass p-6 rounded-2xl shadow-gold card-hover mb-8 lg:mb-6">
                  <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    <span className="text-accent">💱</span> Cotações em Tempo Real
                  </h2>
                  <RealtimeQuotes />
                </div>
              </section>
              {/* Commodities */}
              <section className="section p-0">
                <div className="glass p-6 rounded-2xl shadow-gold card-hover">
                  <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    <Icon src="/icons/chart.svg" alt="Commodities" size="sm" className="text-accent" /> Preços de Commodities
                  </h2>
                  <CommoditiesQuotes />
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Monitoramento Logístico & Freight Rates (Em breve) */}
        <section className="section mt-3" id="monitoramento">
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-accent">🚚</span> Monitoramento Logístico & Freight Rates (Em breve)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass p-4 rounded-xl card-hover">
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Monitor de Fretes Internacionais</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Acompanhe spot rates, rotas e tendências de fretes aéreos e marítimos.</p>
                <small className="text-yellow-600 dark:text-yellow-400">🚧 Em desenvolvimento.</small>
              </div>
              <div className="glass p-4 rounded-xl card-hover">
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Status de Portos e Aeroportos</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Informações sobre congestionamentos, greves e status operacional.</p>
                <small className="text-yellow-600 dark:text-yellow-400">🚧 Em desenvolvimento.</small>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Econômico & Logístico (Fase 2) */}
        <section className="section mt-3" id="dashboard">
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-accent">📊</span> Dashboard Econômico & Logístico (Fase 2)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="glass p-4 rounded-xl card-hover">
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Indicadores de Comércio Exterior</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">Balança comercial, fluxo de exportação/importação por setor e país.</p>
                <small className="text-yellow-600 dark:text-yellow-400">🚧 Em desenvolvimento.</small>
              </div>
              <div className="glass p-4 rounded-xl card-hover">
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Indicadores Macroeconômicos</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2">PIB, inflação, taxa de juros e outros dados relevantes para negócios globais.</p>
                <small className="text-yellow-600 dark:text-yellow-400">🚧 Em desenvolvimento.</small>
              </div>
            </div>
          </div>
        </section>

        {/* Legislação, Compliance & Recursos Oficiais */}
        <section className="section mt-3" id="compliance">
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-accent">📋</span> Legislação, Compliance & Recursos Oficiais
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <a 
                href="https://www.gov.br/receitafederal" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass p-4 rounded-xl card-hover hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Receita Federal</h3>
                <p className="text-gray-700 dark:text-gray-300">Legislação aduaneira, tributária e normas.</p>
              </a>
              <a 
                href="https://comexstat.mdic.gov.br/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass p-4 rounded-xl card-hover hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Comex Stat</h3>
                <p className="text-gray-700 dark:text-gray-300">Estatísticas detalhadas de importação e exportação do Brasil.</p>
              </a>
              <a 
                href="https://www.aladi.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass p-4 rounded-xl card-hover hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">ALADI</h3>
                <p className="text-gray-700 dark:text-gray-300">Associação Latino-Americana de Integração.</p>
              </a>
              <a 
                href="https://www.incoterms2020.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass p-4 rounded-xl card-hover hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Incoterms 2020</h3>
                <p className="text-gray-700 dark:text-gray-300">Regras oficiais para o uso de termos comerciais.</p>
              </a>
              <a 
                href="https://www.portosdobrasil.gov.br/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass p-4 rounded-xl card-hover hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Portos do Brasil</h3>
                <p className="text-gray-700 dark:text-gray-300">Informações sobre portos e terminais brasileiros.</p>
              </a>
              <a 
                href="https://www.anvisa.gov.br/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass p-4 rounded-xl card-hover hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">ANVISA</h3>
                <p className="text-gray-700 dark:text-gray-300">Regulamentação sanitária para importação/exportação.</p>
              </a>
              <a 
                href="https://www.gov.br/agricultura/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass p-4 rounded-xl card-hover hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">MAPA – Agricultura</h3>
                <p className="text-gray-700 dark:text-gray-300">Normas e procedimentos para produtos agrícolas.</p>
              </a>
            </div>
          </div>
        </section>

        {/* Notícias & Insights */}
        <section className="section mt-3" id="noticias">
          <div className="glass p-6 rounded-2xl shadow-gold card-hover">
            <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-accent">📰</span> Notícias & Insights
            </h2>
            <div className="glass p-4 rounded-xl card-hover">
              <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">Feed de Notícias do Mercado Global</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-2">Atualizações sobre Comércio Exterior, Logística, Supply Chain, Economia e PMEs.</p>
              <small className="text-yellow-600 dark:text-yellow-400">🚧 Feed automatizado em desenvolvimento.</small>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="section mt-3">
          <div className="glass p-6 rounded-2xl shadow-gold card-hover text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Quer ir além dos dados?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              O Radar 360 é uma amostra da inteligência que a OLV Internacional entrega para empresas dos setores industriais. Fale com nossos especialistas para soluções personalizadas em Supply Chain Global e Comércio Exterior.
            </p>
            <Link 
              href="/contato" 
              className="btn btn-primary font-bold py-3 px-6"
            >
              Fale com um Especialista
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}