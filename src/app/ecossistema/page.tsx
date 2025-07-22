import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import Icon from '../../components/icons/Icon';

export const metadata = {
  title: 'Ecossistema | OLV Internacional',
  description: 'O Ecossistema OLV Corp integra estratégia, operação e resultado, capacitando PMEs com acesso global.',
  keywords: 'ecossistema de comércio exterior, plataformas de comex integradas, soluções globais, transformação digital',
  alternates: {
    canonical: 'https://olvinternacional.com.br/ecossistema'
  },
};

export default function EcossistemaPage() {
  const plataformas = [
    {
      nome: 'OLV INTERNACIONAL',
      descricao: 'O braço consultivo e a força motriz do ecossistema, responsável por criar as plataformas e introduzir tecnologia e conhecimento de mercado. Atua em todas as vertentes, fornecendo apoio personalizado e humanizado.',
      imagem: '/images/olv-internacional-logo.jpeg',
      link: '/',
      beneficios: [
        'Expertise em identificar as dores do mercado para PME.',
        'Proporciona assessoria e preparo de profissionais para o mercado.',
        'Integra tecnologia, conhecimento e expertise de mercado.'
      ],
      integracoes: [
        'Apoia todas as plataformas e áreas do ecossistema.',
        'Oferece uma vitrine de soluções para as PMEs.'
      ]
    },
    {
      nome: 'STRATEVO',
      descricao: 'Plataforma de Inteligência Empresarial e Dados',
      imagem: '/images/stratevo-logo.jpeg',
      link: '/stratevo',
      beneficios: [
        'Decisões baseadas em dados.',
        'Análise de empresas, riscos, concorrentes, mercado e clientes.',
        'Geração de relatórios inteligentes.',
        'Suporte total à tomada de decisão.'
      ],
      integracoes: [
        'Alimenta dados para Exceltta, Connecta, Finx e Veritus.',
        'Dá visão estratégica para decisões operacionais e financeiras.'
      ]
    },
    {
      nome: 'EXCELTTA',
      descricao: 'Plataforma de Inteligência em Licitações, Compras e Oportunidades Comerciais Públicas e Privadas',
      imagem: '/images/exceltta-logo.jpeg',
      link: '/exceltta',
      beneficios: [
        'Leitura inteligente de editais.',
        'Análise de viabilidade.',
        'Geração de propostas e apoio ao processo licitatório.',
        'Acesso a mercados institucionais.'
      ],
      integracoes: [
        'Usa dados de Stratevo para qualificar licitações.',
        'Integra com Connecta para localizar fornecedores e parceiros.',
        'Integra com Finx para simulações financeiras.'
      ]
    },
    {
      nome: 'CONNECTA',
      descricao: 'Plataforma de Conexão com Fornecedores, Fabricantes e Soluções Globais',
      imagem: '/images/connecta-logo.jpeg',
      link: '/connecta',
      beneficios: [
        'Busca de fornecedores nacionais e internacionais.',
        'Verificação de legitimidade.',
        'Acesso a indústrias, fabricantes, distribuidores e soluções logísticas.',
        'Inteligência de supply chain.'
      ],
      integracoes: [
        'Suporta Exceltta na formação de propostas.',
        'Fornece dados para simulações de custos no Finx.',
        'Dá musculatura operacional para empresas escalarem.'
      ]
    },
    {
      nome: 'ENGAGE',
      descricao: 'Plataforma de relacionamento e qualificação de leads que automatiza todo o funil de vendas para PMEs. Utiliza IA e STRATEVO para classificar oportunidades.',
      imagem: '/images/engage-logo.jpeg',
      link: '/engage',
      beneficios: [
        'Funis ativo e passivo com monitoramento visual de cada etapa.',
        'Qualificação automática de leads com enriquecimento de dados do STRATEVO.',
        'Dashboards comerciais customizáveis com indicadores de conversão e produtividade.',
        'Integração multicanal (WhatsApp, e-mail, telefonia) para comunicação instantânea.'
      ],
      integracoes: [
        'Consulta STRATEVO para validação e enriquecimento de leads.',
        'Alimenta dashboards no OLV CORE para visão única de performance.',
        'Sincroniza com o CRM do cliente via API para unificar o funil de vendas.'
      ]
    },
    {
      nome: 'CORE PANNEL',
      descricao: 'Centro de Controle Operacional e Estratégico do Ecossistema',
      imagem: '/images/core-logo.jpeg',
      link: '/core',
      beneficios: [
        'Dashboard de gestão.',
        'Painel com indicadores operacionais, financeiros e comerciais.',
        'Acompanhamento de projetos, licitações, fornecedores, compliance, finanças e oportunidades.'
      ],
      integracoes: [
        'Integra todos os sistemas.',
        'Mostra a visão completa da empresa e do ecossistema.',
        'Gestão 360° em tempo real.'
      ]
    },
    {
      nome: 'FINX',
      descricao: 'Plataforma de Gestão Financeira, Simuladores e Planejamento Econômico Empresarial',
      imagem: '/images/finx-logo.jpeg',
      link: '/finx',
      beneficios: [
        'Gestão de fluxo de caixa.',
        'Simulador de custos, câmbio, importação, exportação e formação de preço.',
        'Inteligência financeira aplicada.',
        'Acesso a oportunidades de crédito, capital e investidores.'
      ],
      integracoes: [
        'Suporte financeiro para todas as plataformas.',
        'Simula custos de operações do Connecta, contratos do Exceltta e estratégias do Stratevo.',
        'Sustenta as tomadas de decisão com clareza financeira.'
      ]
    },
    {
      nome: 'VECTOR',
      descricao: 'Plataforma de Educação, Treinamento e Capacitação Empresarial',
      imagem: '/images/vector-logo.jpeg',
      link: '/academy',
      beneficios: [
        'Cursos online e presenciais.',
        'Programas de capacitação executiva.',
        'Mentoria, workshops e treinamentos para empresários e equipes.',
        'Acesso contínuo à atualização empresarial.'
      ],
      integracoes: [
        'Capacita os usuários de todas as plataformas.',
        'Garante que as empresas desenvolvam cultura, gestão, compliance e expansão.'
      ]
    },
    {
      nome: 'VERITUS',
      descricao: 'Plataforma de Compliance, Due Diligence, Auditoria e Riscos Empresariais',
      imagem: '/images/veritus-logo.jpeg',
      link: '/veritus',
      beneficios: [
        'Validação de parceiros, fornecedores, clientes e investidores.',
        'Blindagem jurídica, fiscal, societária e operacional.',
        'Due Diligence preventiva.',
        'Apoio na mitigação de riscos.'
      ],
      integracoes: [
        'Funciona como filtro de segurança para Connecta, Stratevo e Exceltta.',
        'Garante que todas as operações do ecossistema sejam feitas com parceiros legítimos.'
      ]
    },
    {
      nome: 'LABS',
      descricao: 'Plataforma de Inovação, Tecnologia, IA, Desenvolvimento e Transformação Digital',
      imagem: '/images/labs-logo.jpeg',
      link: '/labs',
      beneficios: [
        'Criação de automações, sistemas sob demanda, apps e tecnologias próprias.',
        'Inovação aplicada à operação das PMEs.',
        'Desenvolvimento de soluções com IA, OCR, WebScraping, APIs e integrações.'
      ],
      integracoes: [
        'Desenvolve as tecnologias que sustentam todo o ecossistema.',
        'Integra os sistemas, dashboards, simuladores e IA.'
      ]
    },
    {
      nome: 'VENTURES',
      descricao: 'Plataforma de Aceleração, Investimento e Venture Builder',
      imagem: '/images/ventures-logo.jpeg',
      link: '/ventures',
      beneficios: [
        'Apoio a startups e PMEs que queiram escalar seus modelos de negócio.',
        'Desenvolvimento de produtos digitais, processos e expansão.',
        'Conexão com investidores, fundos e parcerias estratégicas.'
      ],
      integracoes: [
        'Se conecta com todas as plataformas para selecionar negócios sólidos.',
        'Usa dados de Stratevo e Veritus para análise de risco.',
        'Apoia financeiramente com Finx e operacionalmente com Connecta e Exceltta.'
      ]
    }
  ];

  return (
    <MainLayout>
      {/* Beta banner */}
      <div className="animate-gold-pulse bg-yellow-200/10 border-y border-yellow-400 px-4 py-2 text-center text-sm leading-snug text-on-surface dark:text-yellow-100 mb-6">
        🚧 Todas as ferramentas do Ecossistema estão em fase BETA – grandes lançamentos a caminho!
      </div>
      <div className="main-content">
        {/* SEÇÃO HERO ECOSSISTEMA */}
        <section className="section">
          <div className="container">
            <div className="platform-card">
              <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-white mb-4">
                <Icon src="/icons/ecosystem-icon.svg" alt="Ecossistema" size="sm" className="text-accent" />
                Nosso Ecossistema: Transformação para PMEs
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Conheça nosso ecossistema integrado de plataformas tecnológicas e soluções estratégicas. Uma arquitetura robusta e interconectada projetada para transformar pequenas e médias empresas em organizações de alto desempenho no mercado global.
              </p>
              <Link 
                href="/contato" 
                className="btn btn-primary font-bold py-3 px-6 inline-block w-auto"
              >
                Conecte-se Conosco
              </Link>
            </div>
          </div>
        </section>

        {/* O QUE É O ECOSSISTEMA */}
        <section className="section" id="o-que-e-ecossistema">
          <div className="container">
            <div className="platform-card">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Icon src="/icons/ecosystem-icon.svg" alt="Ecossistema" size="sm" className="text-accent" />
                O Que É o Nosso Ecossistema?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                O <strong>Ecossistema OLV Corp</strong> é um conjunto completo de plataformas digitais e serviços estratégicos interconectados, criado especificamente para que pequenas e médias empresas possam competir globalmente com a mesma força e inteligência das grandes corporações.
              </p>
              <ul className="space-y-2 ml-6 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cada plataforma do ecossistema foi desenvolvida para atender uma necessidade específica dos negócios, mas funciona de forma integrada com as demais.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Nossas plataformas proporcionam <strong>acesso a dados, tecnologia, mercados globais, governança e crescimento sustentável</strong> sem a necessidade de grandes investimentos em infraestrutura interna.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ao invés de contratar pessoas, você contrata resultados. Ao invés de montar estrutura, você acessa inteligência, experiência e rede estratégica.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* DNA DO ECOSSISTEMA */}
        <section className="section" id="dna-ecossistema">
          <div className="container">
            <div className="platform-card">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <Icon src="/icons/dna.svg" alt="DNA" size="sm" className="text-accent" />
                O DNA do Nosso Ecossistema
              </h2>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">MISSÃO</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Democratizar a gestão inteligente, o acesso global e as boas práticas de negócios para as PMEs, com uma visão integrada, moderna e escalável.
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">VISÃO</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Ser o maior ecossistema de desenvolvimento e aceleração empresarial do Brasil e da América Latina, focado em PMEs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">PROPÓSITO</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Gerar impacto real na economia, ajudando empresas a <strong>crescerem, se internacionalizarem, se profissionalizarem e se tornarem mais competitivas no mercado nacional e global.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* TRANSFORME SUA EMPRESA */}
        <section className="section" id="transforme-empresa">
          <div className="container">
            <div className="glass p-8 rounded-2xl shadow-gold hover:shadow-2xl transition-all duration-300 flex flex-col lg:flex-row gap-8">
              {/* Texto principal */}
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Transforme Sua Empresa com o Nosso Ecossistema
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-prose">
                  Nosso ecossistema revolucionário não entrega apenas soluções. <strong>Ele converte empresas comuns em negócios de alta performance</strong>, com a eficiência e o profissionalismo de uma multinacional. Conectamos sua PME a tecnologia, conhecimento e oportunidades para crescer de forma sustentável e segura.
                </p>
                <Link href="/contato" className="btn btn-primary px-6 py-3 font-semibold w-max">
                  Fale com um Especialista
                </Link>
              </div>

              {/* Lista de benefícios */}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">O que o Ecossistema Entrega:</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                  <li className="flex items-start"><Icon src="/icons/rocket.svg" alt="Alta performance" size="sm" className="text-accent mr-3 mt-0.5" />Alta performance: operações que viram máquinas de resultados.</li>
                  <li className="flex items-start"><Icon src="/icons/analytics.svg" alt="Tecnologia e dados" size="sm" className="text-accent mr-3 mt-0.5" />Tecnologia + inteligência de dados para decisões assertivas.</li>
                  <li className="flex items-start"><Icon src="/icons/ecosystem-icon.svg" alt="Multinacional" size="sm" className="text-accent mr-3 mt-0.5" />Operação estilo multinacional: processos, governança e escala global.</li>
                  <li className="flex items-start"><Icon src="/icons/compliance-icon.svg" alt="Segurança e compliance" size="sm" className="text-accent mr-3 mt-0.5" />Segurança e compliance: blindagem jurídica, fiscal e operacional.</li>
                  <li className="flex items-start"><Icon src="/icons/link.svg" alt="Acesso global" size="sm" className="text-accent mr-3 mt-0.5" />Acesso global: fornecedores, clientes e parceiros internacionais.</li>
                  <li className="flex items-start"><Icon src="/icons/currency-exchange.svg" alt="Planejamento financeiro" size="sm" className="text-accent mr-3 mt-0.5" />Planejamento financeiro profissional para crescer com saúde.</li>
                  <li className="flex items-start"><Icon src="/icons/dna.svg" alt="Inovação" size="sm" className="text-accent mr-3 mt-0.5" />Inovação aplicada: automações, IA e soluções sob medida.</li>
                  <li className="flex items-start"><Icon src="/icons/target.svg" alt="Expansão de mercado" size="sm" className="text-accent mr-3 mt-0.5" />Expansão de mercado: licitações, novos canais e receitas.</li>
                  <li className="flex items-start"><Icon src="/icons/training-icon.svg" alt="Pessoas e cultura" size="sm" className="text-accent mr-3 mt-0.5" />Desenvolvimento de pessoas e cultura: liderança preparada.</li>
                  <li className="flex items-start"><Icon src="/icons/chart-bar.svg" alt="Resultados" size="sm" className="text-accent mr-3 mt-0.5" />Resultados tangíveis: crescimento acelerado e riscos mitigados.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PLATAFORMAS DO ECOSSISTEMA */}
        <section className="section" id="plataformas-detalhes">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-2">
              <Icon src="/icons/link.svg" alt="Interligação" size="sm" className="text-accent" />
              As Plataformas do Ecossistema e Como se Interligam
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plataformas.map((plataforma, index) => (
                <div key={index} className="glass rounded-2xl shadow-gold overflow-hidden border border-[#2a3448] hover:border-[#d4af37] hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 max-w-[300px]">
                  <div className="p-4 flex justify-center bg-gray-100 dark:bg-gray-700">
                    <div className="relative w-40 h-40">
                      <Image 
                        src={plataforma.imagem} 
                        alt={`${plataforma.nome} Logo`} 
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{plataforma.nome}</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <span className="text-accent inline-flex items-center gap-1">
                        <Icon src="/icons/analytics.svg" alt="O que é" size="xs" />
                        O que é:
                      </span>{' '}{plataforma.descricao}
                    </p>
                    
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2 inline-flex items-center gap-1">
                      <Icon src="/icons/rocket.svg" alt="Benefícios" size="xs" className="text-accent" />
                      Benefícios:
                    </h4>
                    <ul className="mb-4 space-y-1 text-gray-700 dark:text-gray-300">
                      {plataforma.beneficios.map((beneficio, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <h4 className="font-bold text-gray-800 dark:text-white mb-2 inline-flex items-center gap-1">
                      <Icon src="/icons/link.svg" alt="Integração" size="xs" className="text-accent" />
                      Como se interliga:
                    </h4>
                    <ul className="mb-6 space-y-1 text-gray-700 dark:text-gray-300">
                      {plataforma.integracoes.map((integracao, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{integracao}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex justify-end">
                      <Link
                        href={plataforma.link}
                        className="btn btn-primary py-2 px-4"
                      >
                        Saiba Mais
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POR QUE DIFERENTE */}
        <section className="section mt-6" id="por-que-diferente">
          <div className="container">
            <div className="glass p-6 rounded-2xl shadow-gold hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <Icon src="/icons/solutions-icon.svg" alt="Essencial" size="sm" className="text-accent" />
                Por que o Nosso Ecossistema é Essencial para sua PME?
              </h2>

              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Nosso ecossistema vai muito além de entregar soluções: <strong>ele eleva empresas comuns à alta performance</strong>, com a mesma eficiência de uma multinacional, unindo ferramentas, conhecimento e oportunidades de crescimento sustentável.
              </p>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                <li className="flex items-start"><Icon src="/icons/rocket.svg" alt="Alta performance" size="sm" className="text-accent mr-3 mt-0.5" />Alta performance: operações que viram máquinas de resultados.</li>
                <li className="flex items-start"><Icon src="/icons/analytics.svg" alt="Tecnologia e dados" size="sm" className="text-accent mr-3 mt-0.5" />Tecnologia + inteligência de dados para decisões assertivas.</li>
                <li className="flex items-start"><Icon src="/icons/ecosystem-icon.svg" alt="Multinacional" size="sm" className="text-accent mr-3 mt-0.5" />Operação estilo multinacional: processos, governança e escala global.</li>
                <li className="flex items-start"><Icon src="/icons/compliance-icon.svg" alt="Segurança e compliance" size="sm" className="text-accent mr-3 mt-0.5" />Segurança e compliance: blindagem jurídica, fiscal e operacional.</li>
                <li className="flex items-start"><Icon src="/icons/link.svg" alt="Acesso global" size="sm" className="text-accent mr-3 mt-0.5" />Acesso global: fornecedores, clientes e parceiros internacionais.</li>
                <li className="flex items-start"><Icon src="/icons/currency-exchange.svg" alt="Planejamento financeiro" size="sm" className="text-accent mr-3 mt-0.5" />Planejamento financeiro profissional para crescer com saúde.</li>
                <li className="flex items-start"><Icon src="/icons/dna.svg" alt="Inovação" size="sm" className="text-accent mr-3 mt-0.5" />Inovação aplicada: automações, IA e soluções sob medida.</li>
                <li className="flex items-start"><Icon src="/icons/target.svg" alt="Expansão de mercado" size="sm" className="text-accent mr-3 mt-0.5" />Expansão de mercado: licitações, novos canais e receitas.</li>
                <li className="flex items-start"><Icon src="/icons/training-icon.svg" alt="Pessoas e cultura" size="sm" className="text-accent mr-3 mt-0.5" />Desenvolvimento de pessoas e cultura: liderança preparada.</li>
                <li className="flex items-start"><Icon src="/icons/chart-bar.svg" alt="Resultados" size="sm" className="text-accent mr-3 mt-0.5" />Resultados tangíveis: crescimento acelerado e riscos mitigados.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* COMPROMISSO */}
        <section className="section" id="frase-impacto">
          <div className="container">
            <div className="glass p-6 rounded-2xl shadow-gold hover:shadow-2xl transition-all duration-300 text-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Nosso Compromisso com o Futuro da Sua Empresa</h2>
              <p className="text-lg leading-relaxed text-gray-200">
                Imagine sua PME competindo lado a lado com grandes players globais, operando com tecnologia de ponta, governança impecável e uma equipe altamente preparada. <strong>Esse é o futuro que construímos ao seu lado</strong>: derrubamos barreiras de crescimento e adicionamos valor real em cada área estratégica do seu negócio.
              </p>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="section">
          <div className="container">
            <div className="glass p-6 rounded-2xl shadow-gold flex flex-col items-center text-center gap-4 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
                Pronto para Ação?
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Integre-se ao nosso ecossistema e transforme seu negócio com nossas soluções.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="/contato" 
                  className="btn btn-primary font-bold py-3 px-6"
                >
                  Fale com um Especialista
                </Link>
                <Link 
                  href="#plataformas-detalhes" 
                  className="btn btn-primary py-2 px-4"
                >
                  Conheça Nossas Plataformas
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 