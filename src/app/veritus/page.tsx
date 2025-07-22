import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const PlatformLayout = dynamic(() => import('../../components/platforms/PlatformLayout'));

export const metadata = {
  title: 'VERITUS - OLV Internacional | Compliance e Conformidade Internacional',
  description: 'VERITUS é a plataforma de compliance da OLV Internacional, garantindo que operações de comércio exterior sigam regulamentações e normas internacionais de forma segura e eficiente.',
  keywords: 'consultoria jurídica internacional, compliance comércio exterior, due diligence internacional, gestão de riscos legais',
  alternates: {
    canonical: 'https://olvinternacional.com.br/veritus'
  },
};

export default function VeritusPage() {
  return (
    <PlatformLayout
      platformName="VERITUS"
      platformLogo="/images/veritus-logo.jpeg"
      platformDescription="Soluções Jurídicas e Compliance para Comércio Internacional"
      platformIntro="A VERITUS é a plataforma jurídica e de compliance da OLV Internacional, garantindo conformidade regulatória e segurança em operações de comércio exterior."
      platformColor="#5A2C45"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-accent">Sobre a VERITUS</h2>
        <p className="mb-4">
          A VERITUS é a plataforma jurídica e de compliance da OLV Internacional, especializada em fornecer soluções legais para empresas que operam no complexo cenário do comércio internacional.
        </p>
        <p className="mb-4">
          Nossa equipe de especialistas combina profundo conhecimento jurídico com experiência prática em comércio exterior para ajudar sua empresa a navegar com segurança por regulamentações internacionais, minimizar riscos legais e otimizar sua estratégia de compliance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Consultoria Jurídica Especializada</h3>
            <p>Orientação legal para todas as etapas do comércio internacional, desde contratos até resolução de disputas.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Gestão de Compliance</h3>
            <p>Implementação de programas de conformidade adaptados às exigências de múltiplas jurisdições.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Due Diligence Internacional</h3>
            <p>Avaliação rigorosa de parceiros, fornecedores e clientes para minimizar riscos em operações globais.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Serviços VERITUS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Consultoria Jurídica Internacional</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Elaboração e revisão de contratos internacionais</li>
              <li>Assessoria em negociações globais</li>
              <li>Propriedade intelectual internacional</li>
              <li>Resolução de disputas comerciais</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Programas de Compliance</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Desenvolvimento de políticas de conformidade</li>
              <li>Implementação de sistemas de monitoramento</li>
              <li>Treinamento de equipes</li>
              <li>Auditorias periódicas de conformidade</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Due Diligence</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Verificação de antecedentes de parceiros internacionais</li>
              <li>Análise de riscos em novos mercados</li>
              <li>Investigação de conformidade de terceiros</li>
              <li>Relatórios detalhados de due diligence</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Gestão de Riscos Legais</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Identificação de vulnerabilidades regulatórias</li>
              <li>Planos de mitigação de riscos</li>
              <li>Gestão de crises legais</li>
              <li>Monitoramento contínuo de mudanças regulatórias</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Benefícios VERITUS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Segurança Jurídica</h3>
            <p>Minimização de riscos legais em operações internacionais através de orientação especializada.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Prevenção de Penalidades</h3>
            <p>Redução do risco de multas e sanções por não conformidade com regulamentações internacionais.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Proteção Reputacional</h3>
            <p>Salvaguarda da imagem da empresa através de práticas comerciais éticas e conformes.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Eficiência Operacional</h3>
            <p>Otimização de processos legais para reduzir atrasos e custos em operações internacionais.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Vantagem Competitiva</h3>
            <p>Diferenciação no mercado através de altos padrões de compliance e governança.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Adaptabilidade Regulatória</h3>
            <p>Rápida adaptação a mudanças regulatórias em diferentes jurisdições.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Depoimentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="italic mb-4">"A VERITUS transformou nossa abordagem de compliance internacional. Implementamos um programa robusto que não só nos protege legalmente, mas também transmite confiança aos nossos parceiros globais."</p>
            <p className="font-semibold">João Mendes</p>
            <p className="text-sm text-gray-600">Diretor Jurídico, Exportadora Brasileira de Grande Porte</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="italic mb-4">"Quando enfrentamos uma disputa comercial complexa com um parceiro europeu, a equipe da VERITUS nos guiou com expertise através de todo o processo. Sua orientação foi fundamental para alcançarmos uma resolução favorável."</p>
            <p className="font-semibold">Marina Santos</p>
            <p className="text-sm text-gray-600">CEO, Indústria de Tecnologia com Operações Globais</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">FAQ - Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Como a VERITUS pode ajudar minha empresa a cumprir regulamentações internacionais?
            </div>
            <div className="p-4">
              A VERITUS oferece uma abordagem personalizada para compliance internacional, começando com uma avaliação detalhada das operações atuais da sua empresa e dos mercados em que atua ou pretende atuar. Desenvolvemos programas de conformidade sob medida que consideram regulamentações de comércio internacional, anticorrupção, sanções econômicas, controles de exportação, proteção de dados e requisitos setoriais específicos. Nossa equipe monitora continuamente mudanças regulatórias em diferentes jurisdições e fornece atualizações e adaptações necessárias ao seu programa de compliance, garantindo que sua empresa permaneça em conformidade mesmo em um ambiente regulatório em constante evolução.
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Quais são os riscos de não ter um programa de compliance internacional adequado?
            </div>
            <div className="p-4">
              Os riscos de operar internacionalmente sem um programa de compliance robusto são significativos e multifacetados. Financeiramente, sua empresa pode enfrentar multas severas e penalidades impostas por órgãos reguladores de diferentes países. Legalmente, há riscos de processos civis e até criminais contra a empresa e seus executivos. A reputação da sua marca pode ser irreparavelmente danificada, resultando em perda de confiança de clientes, parceiros e investidores. Operacionalmente, você pode enfrentar interrupções nos negócios, proibições de comércio em certos mercados e restrições em transações bancárias internacionais. Além disso, parceiros comerciais e clientes globais estão cada vez mais exigindo altos padrões de compliance como pré-requisito para fazer negócios.
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Como funciona o processo de due diligence internacional da VERITUS?
            </div>
            <div className="p-4">
              Nosso processo de due diligence internacional segue uma metodologia estruturada em quatro fases. Iniciamos com uma análise preliminar para determinar o escopo e nível de profundidade adequados, considerando fatores como país, setor e natureza da relação comercial. Na fase de investigação, conduzimos verificações abrangentes que incluem pesquisas em bancos de dados globais, análise de registros públicos, verificação de listas de sanções, screening de mídia e redes sociais, e em casos específicos, entrevistas presenciais. A terceira fase envolve a análise e classificação de riscos identificados, com recomendações claras para mitigação. Finalmente, fornecemos um relatório detalhado e, quando solicitado, continuamos monitorando o parceiro ou mercado para detectar mudanças que possam representar novos riscos.
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Que tipo de suporte a VERITUS oferece em caso de disputas comerciais internacionais?
            </div>
            <div className="p-4">
              A VERITUS oferece suporte abrangente em disputas comerciais internacionais, adaptado às necessidades específicas de cada caso. Nossa abordagem prioriza inicialmente métodos alternativos de resolução, como mediação e negociação, visando soluções menos custosas e mais rápidas. Quando necessário, fornecemos representação em arbitragens internacionais, trabalhando com árbitros e instituições reconhecidas globalmente. Em litígios judiciais, coordenamos com advogados locais em diferentes jurisdições, mantendo uma estratégia coesa. Oferecemos também assessoria em questões específicas como propriedade intelectual, quebra de contratos, disputas societárias e reclamações regulatórias. Nossa experiência em múltiplas jurisdições nos permite navegar eficientemente pelos diferentes sistemas legais, sempre buscando o melhor resultado para nossos clientes.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-accent">Pronto para fortalecer a segurança jurídica da sua empresa?</h2>
          <p className="mb-6 max-w-3xl mx-auto">Entre em contato com nossos especialistas e descubra como a VERITUS pode ajudar sua empresa a operar com segurança no cenário internacional.</p>
          <Link href="/contato" className="btn btn-primary font-semibold py-3 px-6">
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
            "name": "VERITUS",
            "provider": {
              "@type": "Organization",
              "name": "OLV Internacional",
              "url": "https://www.olvinternacional.com.br"
            },
            "description": "Plataforma jurídica e de compliance para empresas que operam no comércio internacional.",
            "serviceType": "Consultoria Jurídica e Compliance Internacional",
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