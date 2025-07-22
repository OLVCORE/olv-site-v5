import React from 'react';
import Link from 'next/link';
import PlatformLayout from '../../components/platforms/PlatformLayout';
import Icon from '../../components/icons/Icon';
import Accordion from '../../components/ui/Accordion';

export const metadata = {
  title: 'EXCELTTA - OLV Internacional | Excelência na Gestão de Processos',
  description: 'EXCELTTA é a plataforma de gestão de processos da OLV Internacional que otimiza fluxos de trabalho, reduz ineficiências e aumenta a produtividade em operações internacionais.',
  keywords: 'gestão de processos, fluxos de trabalho, otimização de processos, automação, produtividade, comércio internacional, BPM, excelência operacional, treinamento em exportação, capacitação comex, consultoria educacional',
  alternates: {
    canonical: 'https://olvinternacional.com.br/exceltta'
  },
};

export default function ExcelttaPage() {
  return (
    <PlatformLayout
      platformName="EXCELTTA"
      platformLogo="/images/exceltta-logo.jpeg"
      platformDescription="Excelência na Gestão de Processos"
      platformIntro="A EXCELTTA é a plataforma de gestão de processos da OLV Internacional, projetada para otimizar fluxos de trabalho e elevar a produtividade em operações internacionais."
      platformColor="#0F5F66"
    >
      <section className="mb-12">
        <h2 className="section-title">Como a EXCELTTA ajuda sua empresa</h2>
        <p className="mb-4">
          Se você é uma PME que lida com planilhas infinitas, retrabalho e atrasos por falta de padronização, a EXCELTTA foi criada exatamente para esse cenário. Nossa metodologia proprietária de mapeamento de processos identifica gargalos e automatiza etapas repetitivas, liberando seu time para atividades de maior valor.
        </p>
        <p className="mb-4">
          Integramos BPM, automação low-code e métricas em tempo real. O resultado? Redução de custos operacionais, tomada de decisão baseada em dados e escalabilidade sem aumentar headcount. Tudo isso em um painel simples, sem jargões técnicos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/exceltta-simple.svg" alt="Process Mapping Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Mapeamento de Processos</h3>
            </div>
            <p>Identificação e documentação de fluxos de trabalho para visualizar oportunidades de melhoria.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/automation.svg" alt="Automation Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Automação Inteligente</h3>
            </div>
            <p>Implementação de soluções tecnológicas para automatizar tarefas repetitivas e reduzir erros humanos.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/chart.svg" alt="Monitoring Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Monitoramento Contínuo</h3>
            </div>
            <p>Acompanhamento em tempo real de KPIs para identificar gargalos e oportunidades de melhoria.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="section-title">Serviços EXCELTTA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/qualification.svg" alt="Consulting Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Consultoria em Processos</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Diagnóstico de processos existentes</li>
              <li>Redesenho de fluxos de trabalho</li>
              <li>Implementação de metodologias ágeis</li>
              <li>Treinamento de equipes</li>
            </ul>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/tech-value.svg" alt="Document Management Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Gestão Documental</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Digitalização de documentos</li>
              <li>Implementação de workflows digitais</li>
              <li>Controle de versões e aprovações</li>
              <li>Conformidade com regulamentações</li>
            </ul>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/automation.svg" alt="Process Automation Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Automação de Processos</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Identificação de oportunidades de automação</li>
              <li>Desenvolvimento de fluxos automatizados</li>
              <li>Integração com sistemas existentes</li>
              <li>Redução de intervenção manual</li>
            </ul>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/analytics.svg" alt="Performance Analysis Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Análise de Performance</h3>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Definição de KPIs relevantes</li>
              <li>Implementação de dashboards de controle</li>
              <li>Identificação de gargalos operacionais</li>
              <li>Recomendações baseadas em dados</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="section-title">Benefícios EXCELTTA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/rocket.svg" alt="Efficiency Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Maior Eficiência Operacional</h3>
            </div>
            <p>Redução de tempo e recursos necessários para executar processos críticos do negócio.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/check.svg" alt="Error Reduction Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Menor Taxa de Erros</h3>
            </div>
            <p>Padronização e automação que minimizam falhas humanas e garantem consistência nas operações.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/chart.svg" alt="Data Decision Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Tomada de Decisão Baseada em Dados</h3>
            </div>
            <p>Visibilidade completa do desempenho dos processos para decisões mais assertivas.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/chart-bar.svg" alt="Scalability Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Escalabilidade</h3>
            </div>
            <p>Processos otimizados que permitem crescimento sem aumento proporcional de custos operacionais.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/compliance.svg" alt="Compliance Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Conformidade Regulatória</h3>
            </div>
            <p>Garantia de que todos os processos estão alinhados com requisitos legais e regulatórios internacionais.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/integration.svg" alt="Agility Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-lg">Agilidade para Mudanças</h3>
            </div>
            <p>Flexibilidade para adaptar processos rapidamente em resposta a mudanças no mercado ou regulamentações.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="section-title">Cenários de Uso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/chart.svg" alt="Lead Time Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Redução de Lead Time</h3>
            </div>
            <p>Empresas que dependem de múltiplas aprovações internas passam a executar o mesmo fluxo 35 % mais rápido após a automação de tarefas e alertas inteligentes.</p>
          </div>
          <div className="platform-card">
            <div className="flex items-center mb-3">
              <Icon src="/icons/automation.svg" alt="Erro Icon" size="md" className="mr-2 w-6 h-6" />
              <h3 className="text-xl">Queda na Taxa de Erros</h3>
            </div>
            <p>Processos padronizados com checklists inteligentes reduzem em até 50 % a ocorrência de falhas humanas em documentos críticos.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="section-title">FAQ - Perguntas Frequentes</h2>
        <Accordion
          items={[
            {
              question: 'Como a EXCELTTA pode identificar ineficiências nos processos da minha empresa?',
              answer:
                'A EXCELTTA utiliza uma metodologia proprietária de diagnóstico que combina mapeamento detalhado de processos, análise de dados operacionais e benchmarking com melhores práticas do setor. Nossos especialistas realizam entrevistas com stakeholders, observam operações e analisam documentação existente para identificar gargalos, redundâncias e oportunidades de melhoria nos fluxos de trabalho.',
            },
            {
              question: 'Quais tipos de processos podem ser otimizados com a EXCELTTA?',
              answer:
                'A EXCELTTA é versátil e pode otimizar diversos tipos de processos, incluindo operações logísticas internacionais, gestão de documentação aduaneira, processos de compliance, fluxos de aprovação, controle de qualidade, gestão de fornecedores, processos financeiros relacionados ao comércio exterior, e muito mais. Nossa plataforma é adaptável a qualquer processo estruturado que possua etapas bem definidas.',
            },
            {
              question: 'Quanto tempo leva para implementar as soluções EXCELTTA?',
              answer:
                'O tempo de implementação varia de acordo com a complexidade dos processos e o escopo do projeto. Projetos menores focados em um único processo podem ser implementados em 4-6 semanas, enquanto transformações mais amplas podem levar de 3 a 6 meses. Trabalhamos com uma abordagem ágil, entregando resultados incrementais para que sua empresa comece a colher benefícios mais rapidamente.',
            },
            {
              question: 'As soluções EXCELTTA se integram com sistemas existentes?',
              answer:
                'Sim, desenvolvemos nossas soluções com foco na integração. A EXCELTTA pode se conectar com ERPs, CRMs, sistemas de gestão de documentos, plataformas de comércio exterior e praticamente qualquer sistema que possua APIs ou outras interfaces de integração. Isso permite que os dados fluam sem retrabalho e que os processos sejam verdadeiramente end-to-end, eliminando ilhas de automação.',
            },
          ]}
        />
      </section>

      <section>
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-accent">Pronto para transformar seus processos?</h2>
          <p className="mb-6 max-w-3xl mx-auto">Entre em contato com nossos especialistas e descubra como a EXCELTTA pode ajudar sua empresa a alcançar excelência operacional no comércio internacional.</p>
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
            "name": "EXCELTTA",
            "provider": {
              "@type": "Organization",
              "name": "OLV Internacional",
              "url": "https://www.olvinternacional.com.br"
            },
            "description": "Plataforma de gestão de processos para otimizar fluxos de trabalho e aumentar a produtividade em operações internacionais.",
            "serviceType": "Gestão de Processos e Otimização de Workflow",
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