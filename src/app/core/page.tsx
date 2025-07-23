import React from 'react';
import Link from 'next/link';
import PlatformLayout from '../../components/platforms/PlatformLayout';
import Icon from '../../components/icons/Icon';

export const metadata = {
  title: 'OLV CORE - Cockpit de Gestão 360° para Setores Industriais | OLV Internacional',
  description: 'OLV CORE é o centro de comando do ecossistema OLV Internacional, oferecendo Business Intelligence integrado e gestão 360° para operações de Supply Chain Global e Comércio Exterior de agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura e logística industrial.',
  keywords: 'business intelligence, cockpit de gestão, dashboards, indicadores de desempenho, BI comércio exterior, gestão 360, integração de dados, supply chain global, setores industriais',
  alternates: {
    canonical: 'https://olvinternacional.com.br/core'
  },
};

export default function CorePage() {
  return (
    <PlatformLayout
      platformName="OLV CORE"
      platformLogo="/images/core-logo.jpeg"
      platformDescription="Cockpit de Gestão 360° & Business Intelligence"
      platformIntro="O OLV CORE reúne dados, indicadores e ferramentas essenciais em um único painel, permitindo que executivos monitorem e otimizem todas as operações internacionais em tempo real."
      platformColor="#0a2463"
    >
      {/* Sobre */}
      <section className="mb-12">
        <h2 className="section-title">Sobre o OLV CORE</h2>
        <p className="mb-4">
          O OLV CORE é o centro de comando do ecossistema OLV Internacional. Ele conecta dados de todas as nossas plataformas – STRATEVO, EXCELTTA, CONNECTA, VERITUS, FINX e outras – entregando inteligência acionável em um painel unificado.
        </p>
        <p className="mb-4">
          Com dashboards personalizáveis, alertas em tempo real e integrações API-first, o CORE permite decisões rápidas, alinhadas à estratégia e sustentadas por métricas confiáveis.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/analytics.svg" alt="BI Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Business Intelligence</h3>
            </div>
            <p>Indicadores de desempenho integrados às operações de comércio exterior e supply chain.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/chart.svg" alt="Dashboards Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Dashboards Interativos</h3>
            </div>
            <p>Visualizações dinâmicas para acompanhar KPIs críticos em tempo real.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/integration.svg" alt="Integration Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Integração Total</h3>
            </div>
            <p>API unificada que consolida dados de ERPs, CRMs e plataformas OLV.</p>
          </div>
        </div>
      </section>

      {/* Serviços */}
      <section className="mb-12">
        <h2 className="section-title">Recursos do OLV CORE</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/qualification.svg" alt="KPI Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Monitoramento de KPIs</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>KPIs de logística, finanças e compliance em um só lugar</li>
              <li>Alertas automáticos para desvios críticos</li>
              <li>Benchmarking entre unidades de negócio</li>
              <li>Relatórios de performance personalizados</li>
            </ul>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/tools.svg" alt="Automation Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Automação de Fluxos</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Workflows configuráveis para aprovações e alertas</li>
              <li>Integração com ferramentas de mensageria (Slack, Teams)</li>
              <li>Gatilhos para atualização de dados em sistemas externos</li>
              <li>Logs de auditoria completos</li>
            </ul>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/shield.svg" alt="Security Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Segurança & Compliance</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Criptografia de dados ponta a ponta</li>
              <li>Controles de acesso granular por função</li>
              <li>Auditoria contínua de conformidade</li>
              <li>Backups automatizados e redundância</li>
            </ul>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/rocket.svg" alt="Scalability Icon" size="sm" className="mr-2" />
              <h3 className="text-xl">Escalabilidade</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Infraestrutura cloud-native</li>
              <li>Arquitetura modular e extensível</li>
              <li>Suporte a múltiplas unidades de negócio</li>
              <li>Performance otimizada para grandes volumes de dados</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-accent">Centralize a gestão e potencialize resultados!</h2>
          <p className="mb-6 max-w-3xl mx-auto">Entre em contato com nosso time e descubra como o OLV CORE pode transformar dados em decisões estratégicas para sua empresa.</p>
          <Link href="/contato" className="btn btn-primary font-semibold py-3 px-6 flex items-center justify-center">
            <Icon src="/icons/specialist.svg" alt="Specialist Icon" size="sm" className="mr-2" />
            Fale com um Especialista
          </Link>
        </div>
      </section>
    </PlatformLayout>
  );
} 