import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const PlatformLayout = dynamic(() => import('../../components/platforms/PlatformLayout'));

export const metadata = {
  title: 'FINX - OLV Internacional | Soluções Financeiras para Comércio Internacional',
  description: 'FINX é a plataforma financeira da OLV Internacional que oferece soluções para câmbio, pagamentos internacionais, financiamento e gestão de risco em operações de comércio exterior.',
  keywords: 'finanças internacionais, câmbio, pagamentos internacionais, financiamento comércio exterior, hedging, gestão financeira global',
  alternates: {
    canonical: 'https://olvinternacional.com.br/finx'
  },
};

export default function FinxPage() {
  return (
    <PlatformLayout
      platformName="FINX"
      platformLogo="/images/finx-logo.jpeg"
      platformDescription="Soluções Financeiras para Comércio Internacional"
      platformIntro="A FINX é a plataforma financeira da OLV Internacional, dedicada a estruturar soluções de câmbio, pagamentos internacionais e financiamento que potencializam resultados globais."
      platformColor="#1E6455"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-accent">Sobre a FINX</h2>
        <p className="mb-4">
          A FINX é a plataforma financeira da OLV Internacional dedicada a oferecer soluções financeiras especializadas para empresas que operam no comércio internacional.
        </p>
        <p className="mb-4">
          Nossa equipe de especialistas combina profundo conhecimento do mercado financeiro com expertise em comércio exterior para desenvolver estratégias customizadas que otimizam resultados financeiros e minimizam riscos em operações internacionais.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Soluções de Financiamento</h3>
            <p>Estratégias e instrumentos de financiamento otimizados para operações de importação e exportação.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Gestão de Risco Cambial</h3>
            <p>Proteção contra volatilidade cambial através de instrumentos de hedge e estratégias personalizadas.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Consultoria Financeira</h3>
            <p>Orientação especializada para otimizar fluxos financeiros e maximizar resultados em operações globais.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Serviços FINX</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Financiamento de Comércio Exterior</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>ACC/ACE - Adiantamento de Contrato de Câmbio/Exportação</li>
              <li>FINIMP - Financiamento à Importação</li>
              <li>Financiamento de projetos internacionais</li>
              <li>Carta de crédito e garantias internacionais</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Gestão de Riscos Financeiros</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Operações de hedge cambial</li>
              <li>Estratégias de proteção contra volatilidade</li>
              <li>Contratos de derivativos para mitigação de riscos</li>
              <li>Análise de exposição cambial</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Soluções de Pagamento Internacional</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Otimização de operações de câmbio</li>
              <li>Gestão de contas internacionais</li>
              <li>Estruturação de pagamentos cross-border</li>
              <li>Sistemas de recebimento global</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Consultoria Financeira Internacional</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Estruturação de operações financeiras internacionais</li>
              <li>Análise de viabilidade financeira para expansão global</li>
              <li>Otimização tributária em operações internacionais</li>
              <li>Desenvolvimento de estratégias financeiras para comércio exterior</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Benefícios FINX</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Redução de Custos Financeiros</h3>
            <p>Acesso às melhores linhas de financiamento e taxas do mercado, reduzindo o custo de capital para operações internacionais.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Proteção contra Volatilidade</h3>
            <p>Estratégias eficientes de hedge que minimizam impactos de flutuações cambiais nos resultados da empresa.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Aumento de Competitividade</h3>
            <p>Estruturas financeiras que permitem oferecer melhores condições comerciais a clientes e fornecedores internacionais.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Otimização de Fluxo de Caixa</h3>
            <p>Melhoria da gestão do capital de giro em operações internacionais, reduzindo ciclos financeiros.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Expansão Internacional Facilitada</h3>
            <p>Suporte financeiro para viabilizar a entrada e crescimento em novos mercados com estruturas otimizadas.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Segurança em Transações</h3>
            <p>Utilização de instrumentos financeiros que garantem segurança e reduzem riscos em transações internacionais.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Depoimentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="italic mb-4">"A estratégia de hedge cambial desenvolvida pela FINX nos protegeu da volatilidade extrema que enfrentamos nos últimos meses, economizando milhões em potenciais perdas. A expertise deles em comércio exterior faz toda a diferença."</p>
            <p className="font-semibold">Carlos Mendonça</p>
            <p className="text-sm text-gray-600">CFO, Exportadora de Commodities</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <p className="italic mb-4">"Conseguimos uma linha de financiamento para importação com condições que nenhum banco tradicional oferecia. A equipe da FINX conhece profundamente as linhas disponíveis no mercado e desenvolveu uma solução sob medida para nossa empresa."</p>
            <p className="font-semibold">Fernanda Lima</p>
            <p className="text-sm text-gray-600">Diretora Financeira, Indústria de Equipamentos</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">FAQ - Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Quais são as principais linhas de financiamento disponíveis para operações de comércio exterior?
            </div>
            <div className="p-4">
              As principais linhas de financiamento para comércio exterior incluem o Adiantamento sobre Contrato de Câmbio (ACC) e o Adiantamento sobre Cambiais Entregues (ACE) para exportadores, que oferecem capital de giro antecipado com taxas competitivas. Para importadores, destacam-se o FINIMP (Financiamento à Importação), que permite pagamentos a prazo para fornecedores internacionais, e as cartas de crédito, que garantem segurança nas transações. Existem também linhas específicas oferecidas por bancos de desenvolvimento como BNDES Exim e agências de crédito à exportação (ECAs) de diversos países, além de programas de financiamento do Banco Mundial e bancos regionais de desenvolvimento. A FINX analisa o perfil da sua empresa, o tipo de operação e os mercados envolvidos para recomendar a solução mais adequada, muitas vezes combinando diferentes instrumentos para otimizar custos e benefícios.
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Como proteger minha empresa contra riscos cambiais em operações internacionais?
            </div>
            <div className="p-4">
              A proteção contra riscos cambiais (hedge) pode ser implementada através de diversos instrumentos e estratégias. Os contratos de câmbio a termo (forwards) permitem fixar a taxa de câmbio para uma data futura, eliminando a incerteza da volatilidade. Opções de câmbio oferecem o direito (mas não a obrigação) de comprar ou vender moeda estrangeira a um preço predeterminado, funcionando como um "seguro" contra movimentos adversos. Swaps cambiais permitem trocar fluxos de caixa em diferentes moedas, enquanto o hedge natural envolve equilibrar receitas e despesas na mesma moeda. A FINX realiza uma análise detalhada da exposição cambial da sua empresa, considerando volumes, prazos, moedas e tolerância a risco para desenvolver uma estratégia personalizada de hedge, que pode incluir combinações destes instrumentos, implementada em etapas para otimizar resultados e minimizar custos.
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Quais são as melhores estratégias para otimizar os custos financeiros em operações internacionais?
            </div>
            <div className="p-4">
              A otimização de custos financeiros em operações internacionais requer uma abordagem multifacetada. Primeiramente, é essencial diversificar as fontes de financiamento, comparando diferentes instituições financeiras e produtos específicos para comércio exterior. A escolha do momento correto para fechar contratos de câmbio, com base em análises técnicas do mercado, pode gerar economias significativas. A estruturação adequada de operações, como o uso de triangulações em centros financeiros eficientes ou a utilização de subsidiárias em jurisdições com acordos bilaterais favoráveis, também reduz custos. Negociar prazos e condições diferenciados com fornecedores e clientes, utilizar instrumentos como factoring internacional e seguro de crédito, e implementar uma política eficiente de hedge são outras estratégias importantes. A FINX analisa toda a cadeia financeira da sua operação internacional para identificar oportunidades de otimização, muitas vezes conseguindo reduções de 15% a 30% nos custos financeiros totais.
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Como a FINX pode ajudar minha empresa a estruturar pagamentos e recebimentos internacionais de forma eficiente?
            </div>
            <div className="p-4">
              A FINX oferece consultoria completa para estruturar sistemas eficientes de pagamentos e recebimentos internacionais, começando com uma análise dos fluxos financeiros atuais da sua empresa. Desenvolvemos estratégias para reduzir custos de transação através da seleção de provedores de serviços financeiros com as melhores taxas e menores spreads cambiais para seus mercados específicos. Implementamos soluções como contas internacionais em múltiplas moedas, que permitem receber pagamentos localmente em diferentes países, reduzindo taxas de conversão e acelerando a disponibilidade de fundos. Nossos especialistas também estruturam calendários otimizados de fechamento de câmbio, aproveitando janelas favoráveis no mercado, e implementam sistemas de reconciliação automática de pagamentos internacionais. Adicionalmente, avaliamos a viabilidade de estruturas mais sofisticadas como centros de tesouraria internacional ou arranjos de netting para empresas com operações em múltiplos países, potencialmente reduzindo o volume de transações internacionais e seus custos associados.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-accent">Pronto para otimizar as finanças internacionais da sua empresa?</h2>
          <p className="mb-6 max-w-3xl mx-auto">Entre em contato com nossos especialistas e descubra como a FINX pode ajudar sua empresa a maximizar resultados financeiros em operações globais.</p>
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
            "name": "FINX",
            "provider": {
              "@type": "Organization",
              "name": "OLV Internacional",
              "url": "https://www.olvinternacional.com.br"
            },
            "description": "Plataforma de soluções financeiras para empresas que operam no comércio internacional.",
            "serviceType": "Consultoria Financeira Internacional",
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