import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import SolutionFlow from '../../components/SolutionFlow';

const PlatformLayout = dynamic(() => import('../../components/platforms/PlatformLayout'));

export const metadata = {
  title: 'CONNECTA - OLV Internacional | Conectando Negócios Globais',
  description: 'A plataforma CONNECTA da OLV Internacional facilita conexões com fornecedores, parceiros estratégicos e soluções para comércio internacional e logística global.',
  keywords: 'rede fornecedores internacionais, parceiros comércio exterior, supply chain global, sourcing internacional, conexão mercado global, plataforma de networking internacional, matchmaking B2B, conexão de fornecedores e compradores, parcerias globais',
  alternates: {
    canonical: 'https://olvinternacional.com.br/connecta'
  },
};

export default function ConnectaPage() {
  return (
    <PlatformLayout
      platformName="CONNECTA"
      platformLogo="/images/connecta-logo.jpeg"
      platformDescription="Conectando Negócios Globalmente"
      platformIntro="A CONNECTA é a plataforma de networking da OLV Internacional, criada para conectar empresas brasileiras a parceiros estratégicos globais e abrir portas para novas oportunidades de negócios internacionais."
      platformColor="#0a2463"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-accent">Sobre a CONNECTA</h2>
        <p className="mb-4">
          Nossa ampla rede de contatos e metodologia proprietária de matchmaking permite que sua empresa encontre os parceiros ideais para expandir sua presença internacional de forma segura e eficiente.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Networking Estratégico</h3>
            <p>Conexões qualificadas com potenciais parceiros, distribuidores e clientes em mercados-alvo.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Matchmaking Empresarial</h3>
            <p>Identificação e conexão com parceiros que compartilham objetivos e complementam seu modelo de negócio.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Oportunidades Globais</h3>
            <p>Acesso a oportunidades de negócios internacionais exclusivas em nossa rede de parceiros.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Serviços CONNECTA</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Identificação de Parceiros</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Mapeamento de potenciais parceiros em mercados-alvo</li>
              <li>Verificação de credibilidade e compatibilidade</li>
              <li>Análise de complementaridade estratégica</li>
              <li>Dossiê detalhado sobre potenciais parceiros</li>
            </ul>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Eventos de Networking</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Rodadas de negócios internacionais</li>
              <li>Encontros virtuais com potenciais parceiros</li>
              <li>Missões empresariais internacionais</li>
              <li>Participação em feiras setoriais</li>
            </ul>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Desenvolvimento de Parcerias</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Facilitação de negociações iniciais</li>
              <li>Suporte na elaboração de acordos</li>
              <li>Intermediação cultural e linguística</li>
              <li>Acompanhamento pós-acordo</li>
            </ul>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Plataforma Digital</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Perfil empresarial internacional</li>
              <li>Sistema de matchmaking automatizado</li>
              <li>Diretório de empresas parceiras</li>
              <li>Comunicação segura com potenciais parceiros</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Benefícios CONNECTA</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Acesso a Novos Mercados</h3>
            <p>Entrada facilitada em mercados internacionais através de parceiros locais já estabelecidos.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Redução de Riscos</h3>
            <p>Parceiros pré-qualificados e verificados para minimizar riscos em operações internacionais.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Aceleração do Crescimento</h3>
            <p>Desenvolvimento de negócios mais rápido através de parceiros estratégicos com recursos complementares.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Economia de Recursos</h3>
            <p>Menor investimento em prospecção internacional e pesquisa de parceiros potenciais.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Suporte Especializado</h3>
            <p>Acompanhamento por especialistas em negócios internacionais durante todo o processo de parceria.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Oportunidades Exclusivas</h3>
            <p>Acesso a oportunidades de negócios não disponíveis publicamente em nosso network global.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Como a CONNECTA impulsiona seus resultados</h2>
        {/* Jornada de valor */}
        <SolutionFlow
          steps={[
            {
              icon: '/icons/analytics.svg',
              title: 'Diagnóstico',
              description: 'Mapeamos necessidades e perfil da sua empresa.',
            },
            {
              icon: '/icons/handshake.svg',
              title: 'Matchmaking',
              description: 'Algoritmo e curadoria conectam parceiros ideais.',
            },
            {
              icon: '/icons/chart-bar.svg',
              title: 'Negociação',
              description: 'Facilitamos acordos e mitigamos riscos.',
            },
            {
              icon: '/icons/rocket.svg',
              title: 'Escala & Suporte',
              description: 'Acompanhamento contínuo para gerar valor.',
            },
          ]}
        />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">FAQ - Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div className="platform-card">
            <div className="p-4 bg-gray-50 font-semibold">
              Como a CONNECTA seleciona potenciais parceiros para minha empresa?
            </div>
            <div className="p-4">
              Utilizamos uma metodologia proprietária de matchmaking que considera diversos fatores como complementaridade de negócios, objetivos estratégicos, cultura empresarial, capacidade financeira e operacional, experiência no setor e reputação no mercado. Após uma análise inicial do seu perfil e necessidades, realizamos uma busca em nossa ampla rede de contatos e bases de dados, aplicando filtros rigorosos para identificar apenas parceiros com alta probabilidade de ajuste estratégico.
            </div>
          </div>
          <div className="platform-card">
            <div className="p-4 bg-gray-50 font-semibold">
              Quanto tempo leva para encontrar um parceiro internacional adequado?
            </div>
            <div className="p-4">
              O tempo médio para identificação e qualificação inicial de potenciais parceiros é de 4 a 8 semanas, dependendo do setor, complexidade do negócio e região geográfica alvo. O processo completo até o estabelecimento formal de uma parceria geralmente leva de 3 a 6 meses, incluindo as fases de apresentação, negociação inicial, due diligence e formalização do acordo. Trabalhamos com cronogramas personalizados para cada cliente, priorizando a qualidade das conexões em vez da quantidade.
            </div>
          </div>
          <div className="platform-card">
            <div className="p-4 bg-gray-50 font-semibold">
              A CONNECTA atende empresas de todos os portes e setores?
            </div>
            <div className="p-4">
              Sim, trabalhamos com empresas de diferentes portes - desde startups até grandes corporações - e diversos setores da economia. Nossa metodologia é adaptada às necessidades específicas de cada cliente, independentemente do tamanho ou segmento. Para empresas menores, focamos em estratégias de entrada que minimizem riscos e investimentos iniciais, enquanto para corporações maiores, desenvolvemos abordagens mais complexas de aliança estratégica e expansão internacional.
            </div>
          </div>
          <div className="platform-card">
            <div className="p-4 bg-gray-50 font-semibold">
              Como a CONNECTA dá suporte após a identificação de um potencial parceiro?
            </div>
            <div className="p-4">
              Nosso apoio vai muito além da simples apresentação. Oferecemos suporte completo em todas as etapas do desenvolvimento da parceria, incluindo preparação para reuniões iniciais, facilitação de comunicação (inclusive com tradução quando necessário), orientação cultural para negociações, assessoria na estruturação de acordos, suporte jurídico através de parceiros especializados, e acompanhamento periódico após o estabelecimento da parceria para garantir o sucesso da relação comercial a longo prazo.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-accent">Pronto para expandir seu network global?</h2>
          <p className="mb-6 max-w-3xl mx-auto">Entre em contato com nossos especialistas e descubra como a CONNECTA pode ajudar sua empresa a encontrar os parceiros ideais para crescer internacionalmente.</p>
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
            "name": "CONNECTA",
            "provider": {
              "@type": "Organization",
              "name": "OLV Internacional",
              "url": "https://www.olvinternacional.com.br"
            },
            "description": "Plataforma de networking que conecta empresas brasileiras a parceiros globais para expandir seus negócios internacionalmente.",
            "serviceType": "Networking Internacional e Matchmaking Empresarial",
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