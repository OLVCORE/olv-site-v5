import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const PlatformLayout = dynamic(() => import('../../components/platforms/PlatformLayout'));

export const metadata = {
  title: 'LABS - OLV Internacional | Centro de Inovação em Comércio Internacional',
  description: 'LABS é o centro de inovação da OLV Internacional dedicado a pesquisar, desenvolver e implementar tecnologias emergentes que transformam as operações de comércio exterior.',
  keywords: 'inovação comércio exterior, tecnologias emergentes, blockchain exportação, inteligência artificial comex, transformação digital internacional',
  alternates: {
    canonical: 'https://olvinternacional.com.br/labs'
  },
};

export default function LabsPage() {
  return (
    <PlatformLayout
      platformName="LABS"
      platformLogo="/images/labs-logo.jpeg"
      platformDescription="Centro de Inovação em Comércio Internacional"
      platformIntro="O LABS é o centro de inovação da OLV Internacional, dedicado a pesquisar e aplicar tecnologias emergentes que transformam operações de comércio exterior."
      platformColor="#4E3B76"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-accent">Sobre o LABS</h2>
        <p className="mb-4">
          O LABS é o centro de inovação da OLV Internacional, dedicado a pesquisar, desenvolver e implementar tecnologias emergentes que transformam as operações de comércio exterior.
        </p>
        <p className="mb-4">
          Nossa equipe multidisciplinar de especialistas trabalha na interseção entre tecnologia de ponta e práticas de comércio internacional para criar soluções inovadoras que aumentam a eficiência, reduzem custos e desbloqueiam novas oportunidades para empresas globais.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Pesquisa Aplicada</h3>
            <p>Investigação contínua de tecnologias emergentes com potencial para revolucionar o comércio internacional.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Desenvolvimento de Soluções</h3>
            <p>Criação de protótipos e produtos inovadores que resolvem desafios específicos do comércio exterior.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Implementação Estratégica</h3>
            <p>Integração eficiente de novas tecnologias aos processos existentes para maximizar resultados.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Áreas de Inovação LABS</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Blockchain e Contratos Inteligentes</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Rastreabilidade e transparência em cadeias de suprimentos globais</li>
              <li>Contratos inteligentes para automatização de acordos comerciais</li>
              <li>Certificação digital de origem e documentação aduaneira</li>
              <li>Sistemas descentralizados para pagamentos internacionais</li>
            </ul>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Inteligência Artificial e Machine Learning</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Análise preditiva para otimização logística internacional</li>
              <li>Sistemas inteligentes de classificação fiscal e compliance</li>
              <li>Automação de processos decisórios em operações globais</li>
              <li>Análise avançada de mercados e oportunidades internacionais</li>
            </ul>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">IoT e Sistemas Conectados</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Monitoramento em tempo real de cargas internacionais</li>
              <li>Sensores para controle de qualidade em trânsito global</li>
              <li>Otimização de armazenagem e movimentação cross-border</li>
              <li>Integração de sistemas entre parceiros comerciais globais</li>
            </ul>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">Transformação Digital do Comércio Exterior</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Plataformas integradas para gestão de operações internacionais</li>
              <li>Digitalização completa de processos aduaneiros e documentais</li>
              <li>APIs e microserviços para ecossistemas de comércio global</li>
              <li>Dashboards analíticos para tomada de decisão estratégica</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Benefícios LABS</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Vantagem Competitiva</h3>
            <p>Acesso antecipado a tecnologias emergentes que transformam operações internacionais antes dos concorrentes.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Eficiência Operacional</h3>
            <p>Redução significativa de custos e tempo em processos de comércio exterior através de soluções inovadoras.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Mitigação de Riscos</h3>
            <p>Tecnologias avançadas que minimizam erros, fraudes e vulnerabilidades em operações internacionais.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Novas Oportunidades</h3>
            <p>Identificação e exploração de modelos de negócios inovadores no contexto do comércio global.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Sustentabilidade</h3>
            <p>Soluções tecnológicas que promovem práticas sustentáveis em cadeias de suprimentos globais.</p>
          </div>
          <div className="platform-card">
            <h3 className="text-lg font-semibold mb-3 text-accent">Colaboração Global</h3>
            <p>Acesso a um ecossistema de parceiros internacionais para desenvolvimento conjunto de soluções.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Projetos Inovadores</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">TradeChain</h3>
            <p className="mb-4">Plataforma baseada em blockchain que oferece rastreabilidade completa e verificação de autenticidade para produtos em toda a cadeia logística internacional. Reduz fraudes em documentação, aumenta a confiança entre parceiros comerciais e simplifica auditorias de compliance.</p>
            <p className="italic text-gray-600">Status: Piloto em operação com exportadores de produtos de alto valor agregado</p>
          </div>
          <div className="platform-card">
            <h3 className="text-xl font-semibold mb-3 text-accent">AI Customs Navigator</h3>
            <p className="mb-4">Sistema de inteligência artificial que utiliza machine learning para otimizar a classificação fiscal de mercadorias, prever requisitos regulatórios e identificar oportunidades de economia em tributos. Reduz erros em classificação e acelera processos de despacho aduaneiro.</p>
            <p className="italic text-gray-600">Status: Em fase de implementação com empresas importadoras</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Depoimentos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="platform-card">
            <p className="italic mb-4">"A plataforma de blockchain desenvolvida pelo LABS reduziu nosso tempo de liberação aduaneira em 60% e praticamente eliminou as inconsistências documentais. A visibilidade que temos agora de toda a cadeia é um diferencial competitivo significativo."</p>
            <p className="font-semibold">Marcelo Gomes</p>
            <p className="text-sm text-gray-600">Diretor de Supply Chain, Indústria Farmacêutica</p>
          </div>
          <div className="platform-card">
            <p className="italic mb-4">"O sistema de análise preditiva para logística internacional nos permitiu otimizar rotas e prazos, resultando em economia anual de mais de R$ 2 milhões em custos logísticos. A capacidade de adaptação do sistema às nossas necessidades específicas foi impressionante."</p>
            <p className="font-semibold">Patrícia Monteiro</p>
            <p className="text-sm text-gray-600">COO, Grande Varejista com Operações Globais</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">FAQ - Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div className="platform-card">
            <div className="p-4 bg-gray-50 font-semibold">
              Como o LABS identifica quais tecnologias têm potencial real para transformar o comércio internacional?
            </div>
            <div className="p-4">
              No LABS, adotamos uma metodologia rigorosa para avaliar o potencial transformador de tecnologias emergentes no comércio internacional. O processo começa com um radar tecnológico contínuo, no qual monitoramos desenvolvimentos globais através de parcerias com universidades, aceleradoras e centros de pesquisa em diferentes países. Cada tecnologia identificada passa por uma avaliação em quatro dimensões: impacto potencial (capacidade de resolver problemas significativos ou criar valor substancial), viabilidade técnica (maturidade e capacidade de implementação prática), escalabilidade (potencial para aplicação ampla em diferentes contextos) e horizonte temporal (tempo necessário para implementação efetiva). Para tecnologias promissoras, desenvolvemos provas de conceito em ambientes controlados, com métricas claras para avaliar resultados. Este processo nos permite concentrar recursos nas tecnologias com maior potencial de gerar valor real, evitando tendências passageiras ou soluções de nicho limitado.
            </div>
          </div>
          <div className="platform-card">
            <div className="p-4 bg-gray-50 font-semibold">
              Como uma empresa pode participar dos projetos de inovação do LABS?
            </div>
            <div className="p-4">
              Oferecemos três modalidades principais de participação nos projetos de inovação do LABS. O primeiro é o Programa de Parceiros de Inovação, onde empresas investem em uma cota anual que dá acesso prioritário a todas as tecnologias e projetos em desenvolvimento, além de influência na definição das prioridades de pesquisa. A segunda modalidade é o Co-desenvolvimento, onde trabalhamos com empresas em projetos específicos voltados para seus desafios particulares, compartilhando investimentos, riscos e propriedade intelectual resultante. A terceira opção é o Programa de Testes Beta, onde empresas podem testar gratuitamente soluções em fase avançada de desenvolvimento, fornecendo feedback valioso antes do lançamento comercial. Em todos os casos, iniciamos com um workshop de alinhamento para identificar áreas de maior potencial e definir expectativas claras de colaboração. Empresas interessadas podem agendar uma reunião exploratória com nossa equipe para discutir a modalidade mais adequada ao seu perfil e objetivos estratégicos.
            </div>
          </div>
          <div className="platform-card">
            <div className="p-4 bg-gray-50 font-semibold">
              Quais são os principais desafios na implementação de blockchain para comércio internacional?
            </div>
            <div className="p-4">
              A implementação de blockchain no comércio internacional enfrenta quatro categorias principais de desafios que abordamos sistematicamente no LABS. O primeiro é a interoperabilidade, pois o comércio global envolve múltiplos atores com sistemas legados diversos e diferentes plataformas blockchain. Desenvolvemos soluções baseadas em padrões abertos e protocolos de interoperabilidade que permitem a comunicação entre diferentes sistemas. O segundo desafio é regulatório, com jurisdições variadas tendo abordagens distintas para documentos digitais e contratos inteligentes. Nossa equipe jurídica especializada trabalha para garantir compliance em múltiplos países. O terceiro é a governança de dados, especialmente considerando questões de privacidade e informações comercialmente sensíveis. Implementamos estruturas de permissionamento avançadas e técnicas de zero-knowledge proof para proteger dados confidenciais. O quarto desafio é a adoção coordenada, pois o valor da blockchain depende da participação de múltiplos stakeholders na cadeia. Nosso método de implementação em fases estratégicas permite demonstração de valor incremental, facilitando a adesão progressiva de participantes.
            </div>
          </div>
          <div className="platform-card">
            <div className="p-4 bg-gray-50 font-semibold">
              Como o LABS mensura o retorno sobre investimento em projetos de inovação?
            </div>
            <div className="p-4">
              No LABS, desenvolvemos uma metodologia própria de mensuração de ROI para inovações em comércio internacional, reconhecendo que projetos transformadores frequentemente geram valor além das métricas financeiras tradicionais. Nossa abordagem equilibra indicadores quantitativos e qualitativos em quatro dimensões: eficiência operacional (redução mensurável de tempo e custo em processos específicos), mitigação de riscos (redução de erros, fraudes e penalidades), vantagem competitiva (ganhos de mercado e diferenciação) e capacitação organizacional (desenvolvimento de novas capacidades). Para cada projeto, estabelecemos uma linha de base inicial e indicadores-chave de desempenho (KPIs) personalizados. Utilizamos uma combinação de testes A/B, pilotos controlados e análises comparativas para isolar o impacto das inovações implementadas. Nossos projetos típicos geram ROI financeiro direto entre 150% e 400% em um horizonte de 18-24 meses, com benefícios adicionais em posicionamento estratégico e desenvolvimento de capacidades organizacionais que continuam gerando valor a longo prazo.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-accent">Pronto para transformar suas operações internacionais com tecnologias inovadoras?</h2>
          <p className="mb-6 max-w-3xl mx-auto">Entre em contato com nossos especialistas e descubra como o LABS pode ajudar sua empresa a implementar soluções tecnológicas de ponta para o comércio internacional.</p>
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
            "@type": "ResearchOrganization",
            "name": "LABS - OLV Internacional",
            "description": "Centro de inovação especializado em tecnologias emergentes para comércio internacional.",
            "url": "https://www.olvinternacional.com.br/labs",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "BR"
            },
            "knowsAbout": [
              "Blockchain em Comércio Internacional",
              "Inteligência Artificial para Supply Chain Global",
              "IoT em Logística Internacional",
              "Transformação Digital no Comércio Exterior"
            ]
          })
        }}
      />
    </PlatformLayout>
  );
} 