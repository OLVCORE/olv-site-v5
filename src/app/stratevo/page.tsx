import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Icon from '../../components/icons/Icon';
import Accordion from '../../components/ui/Accordion';
const PlatformLayout = dynamic(() => import('../../components/platforms/PlatformLayout'));

export const metadata = {
  title: 'STRATEVO - OLV Internacional | Inteligência para Decidir. Estratégia para Crescer.',
  description: 'STRATEVO é a plataforma de inteligência corporativa que transforma dados públicos e estratégicos em diagnósticos completos, relatórios inteligentes e recomendações personalizadas — democratizando a inteligência competitiva para PMEs.',
  keywords: 'inteligência de mercado, análise estratégica, comércio internacional, dados de mercado, insights de negócios, estratégia empresarial',
  alternates: {
    canonical: 'https://olvinternacional.com.br/stratevo'
  },
};

export default function StratevoPage() {
  return (
    <PlatformLayout
      platformName="STRATEVO"
      platformLogo="/images/stratevo-logo.jpeg"
      platformDescription="Inteligência Corporativa Democrática"
      platformIntro="A STRATEVO transforma dados públicos, sinais de mercado e algoritmos proprietários em inteligência prática. Sua missão é colocar o poder da análise que antes só grandes corporações possuíam nas mãos das PMEs, reduzindo riscos e revelando oportunidades reais de crescimento."
      platformColor="#1B3F8B"
    >
      <section className="mb-12">
        <h2 className="section-title">Como a STRATEVO ajuda sua empresa</h2>
        <p className="mb-4">
          Se a sua PME sofre para encontrar dados confiáveis, comparar fontes e transformar informação em ação, a STRATEVO resolve esse quebra-cabeça. Consolidamos inteligência de mercado, estatísticas de comércio exterior e sinais de consumo em um único hub fácil de usar.
        </p>
        <p className="mb-4">
          Nosso time de analistas combina tecnologia proprietária de coleta de dados com curadoria humana para entregar insights práticos — nada de relatórios genéricos. Assim, você toma decisões com rapidez, reduz riscos e identifica oportunidades antes da concorrência.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="section-title">Módulos de Inteligência STRATEVO</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. Dados Cadastrais */}
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/cnpj.svg" alt="Cadastral Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Dados Cadastrais & Registrais</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>CNPJ, razão social, nome fantasia</li>
              <li>Situação cadastral e regime tributário</li>
              <li>Registro de marca no INPI</li>
            </ul>
            <p className="text-xs mt-2 italic">Valida legitimidade e estrutura jurídico-fiscal.</p>
          </div>
          {/* 2. Estrutura Organizacional */}
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/team.svg" alt="Team Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Estrutura Organizacional</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Endereços de matriz e filiais</li>
              <li>Quadro societário e responsáveis legais</li>
              <li>Número estimado de funcionários</li>
            </ul>
            <p className="text-xs mt-2 italic">Avalia presença geográfica e solidez societária.</p>
          </div>
          {/* 3. Análise Econômico-Financeira */}
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/calculator.svg" alt="Finance Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Análise Econômico-Financeira</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Faturamento estimado</li>
              <li>Riscos legais e tributários</li>
              <li>Compatibilidade fiscal</li>
            </ul>
            <p className="text-xs mt-2 italic">Prevê solidez e risco de inadimplência.</p>
          </div>
          {/* 4. Presença Digital & Reputação */}
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/instagram.svg" alt="Digital Presence Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Presença Digital & Reputação</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Site, redes sociais, reviews públicos</li>
              <li>Reputação online & engajamento</li>
              <li>Score de confiabilidade</li>
            </ul>
            <p className="text-xs mt-2 italic">Termômetro de visibilidade e confiança.</p>
          </div>
          {/* 5. Atuação Comercial & Mercado */}
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/handshake.svg" alt="Market Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Atuação Comercial & Mercado</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>CNAEs, produtos e serviços</li>
              <li>Histórico de licitações</li>
              <li>Participação em feiras & eventos</li>
            </ul>
            <p className="text-xs mt-2 italic">Identifica vocação e potencial de mercado.</p>
          </div>
          {/* 6. Comex & Supply Chain */}
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/logistics-icon.svg" alt="Supply Chain Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Comércio Exterior & Supply Chain</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Habilitação RADAR</li>
              <li>Histórico de importação/exportação</li>
              <li>Contato logístico estratégico</li>
            </ul>
            <p className="text-xs mt-2 italic">Mede prontidão para escalar globalmente.</p>
          </div>
          {/* 7. Análise SWOT & Porter */}
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/swot.svg" alt="SWOT Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Análise SWOT & Forças de Porter</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Forças, fraquezas, oportunidades, ameaças</li>
              <li>Competição, poder de clientes & fornecedores</li>
            </ul>
            <p className="text-xs mt-2 italic">Visão executiva de riscos e oportunidades.</p>
          </div>
          {/* 8. Insights Estratégicos */}
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/strategy.svg" alt="Insights Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Insights Estratégicos</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Recomendações de crescimento</li>
              <li>Alertas de risco & gargalos</li>
              <li>Benchmark de mercado</li>
            </ul>
            <p className="text-xs mt-2 italic">Move o empresário do reativo para o proativo.</p>
          </div>
          {/* 9. Proposta de Valor Personalizada */}
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/manifesto-icon.svg" alt="Pitch Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Proposta de Valor Personalizada</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Pitches B2B gerados por IA</li>
              <li>Argumentos alinhados ao segmento</li>
              <li>Sugestão de soluções OLV</li>
            </ul>
            <p className="text-xs mt-2 italic">Transforma diagnóstico em ferramenta de vendas.</p>
          </div>
          {/* 10. Inteligência de Matching */}
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/integration.svg" alt="Matching Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Matching Estratégico</h3>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>Concorrentes, parceiros, compradores</li>
              <li>Clusterização por similaridade</li>
              <li>Sugestões de expansão geográfica</li>
            </ul>
            <p className="text-xs mt-2 italic">Conecta a empresa ao ecossistema ideal.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="section-title">Benefícios para sua PME</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/check.svg" alt="Decision Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Decisões mais Assertivas</h3>
            </div>
            <p>Fundamentação em dados concretos e análises especializadas para minimizar riscos e otimizar resultados.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/chart.svg" alt="Time Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Economia de Tempo e Recursos</h3>
            </div>
            <p>Acesso imediato a informações cruciais de mercado sem necessidade de montar equipes internas de pesquisa.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/rocket.svg" alt="Advantage Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Vantagem Competitiva</h3>
            </div>
            <p>Antecipe-se às tendências e movimentos do mercado antes dos seus concorrentes.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/target.svg" alt="Strategy Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Estratégia Personalizada</h3>
            </div>
            <p>Análises e recomendações adaptadas ao seu segmento de mercado e objetivos empresariais.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/shield.svg" alt="Risk Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Redução de Riscos</h3>
            </div>
            <p>Identificação preventiva de potenciais obstáculos e desafios em novos mercados.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/integration.svg" alt="Alignment Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Alinhamento Estratégico</h3>
            </div>
            <p>Garanta que todas as decisões estejam alinhadas com os objetivos de longo prazo da sua empresa.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="section-title">Cenários de Uso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/target.svg" alt="Product Launch Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Lançamento de Produto em Novo País</h3>
            </div>
            <p>Empresas que planejam entrar em mercados estrangeiros utilizam a STRATEVO para validar demanda, precificação e canais de distribuição, reduzindo em até 40 % o tempo de go-to-market.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/chart-bar.svg" alt="Export Niches Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Descoberta de Nichos de Exportação</h3>
            </div>
            <p>Através de filtros avançados, a STRATEVO revela nichos pouco explorados em mercados maduros, permitindo margens superiores e vantagem competitiva sustentável.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="section-title">FAQ - Perguntas Frequentes</h2>
        <Accordion
          items={[
            {
              question: 'Como a STRATEVO gera insights exclusivos para o meu segmento?',
              answer:
                'Utilizamos algoritmos de mineração de dados combinados à curadoria de especialistas para cruzar informações de mercado, comércio exterior e sinais de consumo. Isso resulta em relatórios customizados com recomendações alinhadas às particularidades do seu setor.',
            },
            {
              question: 'A plataforma exige instalação ou infraestrutura interna?',
              answer:
                'Não. A STRATEVO é 100 % SaaS e roda na nuvem com padrões de segurança enterprise-grade. Você acessa via navegador, sem necessidade de servidores ou licenças adicionais.',
            },
            {
              question: 'Com que frequência os dados são atualizados?',
              answer:
                'Fontes públicas são coletadas diariamente e bases premium obedecem às janelas de atualização de cada fornecedor, variando de semanal a mensal. Para clientes enterprise, disponibilizamos crawls on-demand para temas específicos.',
            },
            {
              question: 'Quais são os planos de contratação?',
              answer:
                'Oferecemos planos por assinatura (Starter, Growth e Enterprise) que diferem em volume de relatórios, usuários e suporte. Também desenvolvemos projetos pontuais de inteligência de mercado quando há necessidades muito específicas.',
            },
          ]}
        />
      </section>

      <section>
        <div className="bg-blue-50 rounded-lg p-8 text-center dark:bg-blue-900 dark:bg-opacity-20">
          <h2 className="text-2xl font-bold mb-4 text-accent">Pronto para tomar decisões estratégicas baseadas em dados?</h2>
          <p className="mb-6 max-w-3xl mx-auto dark:text-accent">Entre em contato com nossos especialistas e descubra como a STRATEVO pode ajudar sua empresa a conquistar novos mercados com mais segurança e eficiência.</p>
          <Link href="/contato" className="btn btn-primary font-semibold py-3 px-6 flex items-center justify-center">
            <Icon src="/icons/specialist.svg" alt="Specialist Icon" size="md" className="mr-2 w-6 h-6" />
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
            "name": "STRATEVO",
            "provider": {
              "@type": "Organization",
              "name": "OLV Internacional",
              "url": "https://www.olvinternacional.com.br"
            },
            "description": "Plataforma de inteligência de mercado que fornece análises aprofundadas para tomada de decisão estratégica no comércio internacional.",
            "serviceType": "Inteligência de Mercado e Estratégia Empresarial",
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