import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const PlatformLayout = dynamic(() => import('../../components/platforms/PlatformLayout'));

export const metadata = {
  title: 'VENTURES - OLV Internacional | Investimentos Estratégicos em Comércio Internacional',
  description: 'VENTURES é a plataforma de investimentos da OLV Internacional, conectando empresas inovadoras do comércio exterior com capital estratégico para acelerar seu crescimento global.',
  keywords: 'investimento comércio exterior, venture capital internacional, financiamento expansão global, capital para exportação, aceleração negócios internacionais',
  alternates: {
    canonical: 'https://olvinternacional.com.br/ventures'
  },
};

export default function VenturesPage() {
  return (
    <PlatformLayout
      platformName="VENTURES"
      platformLogo="/images/ventures-logo.jpeg"
      platformDescription="Investimentos Estratégicos em Comércio Internacional"
      platformColor="#0a2463"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-accent">Sobre a VENTURES</h2>
        <p className="mb-4">
          A VENTURES é a plataforma de investimentos da OLV Internacional, dedicada a conectar empresas inovadoras do ecossistema de comércio exterior com capital estratégico para acelerar seu crescimento e expansão global.
        </p>
        <p className="mb-4">
          Com profundo conhecimento do mercado internacional e uma rede global de parceiros, identificamos oportunidades de alto potencial e fornecemos não apenas capital, mas também expertise, mentoria e acesso a mercados para impulsionar negócios transformadores.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Capital Estratégico</h3>
            <p>Investimentos direcionados em empresas com potencial de transformar o comércio internacional.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Aceleração de Negócios</h3>
            <p>Programa intensivo de desenvolvimento para potencializar empresas com soluções inovadoras para o mercado global.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Conexões Globais</h3>
            <p>Acesso a uma rede internacional de parceiros, clientes e investidores para impulsionar a expansão.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Áreas de Investimento VENTURES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Tecnologia para Comércio Internacional</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Plataformas de comércio digital B2B</li>
              <li>Soluções de automação para processos de exportação e importação</li>
              <li>Ferramentas de compliance internacional</li>
              <li>Sistemas de gestão para operações globais</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Logística e Supply Chain</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Soluções inovadoras para logística internacional</li>
              <li>Plataformas de gestão de cadeias de suprimentos globais</li>
              <li>Tecnologias para rastreabilidade e transparência</li>
              <li>Modelos disruptivos de distribuição internacional</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Fintech Internacional</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Plataformas de pagamentos cross-border</li>
              <li>Soluções de financiamento para comércio exterior</li>
              <li>Sistemas de gestão de risco cambial</li>
              <li>Tecnologias para compliance financeiro internacional</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-accent">Negócios Sustentáveis Globais</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Empresas com produtos e serviços de impacto positivo</li>
              <li>Soluções para cadeias de suprimentos sustentáveis</li>
              <li>Tecnologias para economia circular em escala global</li>
              <li>Negócios com foco em mercados emergentes sustentáveis</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Programas VENTURES</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Seed Capital</h3>
            <p>Investimentos iniciais entre R$ 500 mil e R$ 2 milhões para startups com soluções inovadoras e potencial de escala global.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Growth Capital</h3>
            <p>Investimentos de R$ 2 a 10 milhões para empresas em fase de expansão internacional, com modelo de negócio validado.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Global Expansion Fund</h3>
            <p>Fundo dedicado a empresas brasileiras com produtos e serviços comprovados que buscam capital para internacionalização.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">VENTURES Accelerator</h3>
            <p>Programa de aceleração de 6 meses para startups em estágio inicial, com mentoria, conexões internacionais e capital semente.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Corporate Ventures</h3>
            <p>Parcerias com corporações para investimentos estratégicos em inovações que complementam suas operações globais.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-3 text-accent">Impact Investment</h3>
            <p>Linha de investimento para negócios que combinam retorno financeiro com impacto positivo mensurável em mercados globais.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Benefícios VENTURES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Para Empresas</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Capital Estratégico:</span> Acesso a investimentos alinhados com as necessidades específicas do seu negócio global.</li>
              <li><span className="font-semibold">Expertise Especializada:</span> Mentoria de especialistas com experiência profunda em comércio internacional.</li>
              <li><span className="font-semibold">Acesso a Mercados:</span> Conexões com parceiros, clientes e distribuidores em mercados-chave globais.</li>
              <li><span className="font-semibold">Sinergia com Ecossistema:</span> Integração com outras plataformas e soluções do ecossistema OLV Internacional.</li>
              <li><span className="font-semibold">Credibilidade Internacional:</span> Associação com uma marca reconhecida no mercado global.</li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">Para Investidores</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Deal Flow Qualificado:</span> Acesso a oportunidades de investimento cuidadosamente selecionadas no setor de comércio internacional.</li>
              <li><span className="font-semibold">Due Diligence Especializada:</span> Análises aprofundadas por especialistas que entendem as nuances dos negócios globais.</li>
              <li><span className="font-semibold">Portfólio Diversificado:</span> Exposição a diferentes segmentos e geografias do comércio internacional.</li>
              <li><span className="font-semibold">Coinvestimento:</span> Oportunidades de participar de rodadas junto com investidores estratégicos globais.</li>
              <li><span className="font-semibold">Impacto Econômico:</span> Contribuição para o desenvolvimento do ecossistema de comércio exterior brasileiro.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">Casos de Sucesso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">LogTech Brasil</h3>
            <p className="mb-4">Plataforma de otimização logística para exportadores que recebeu investimento seed de R$ 1,5 milhão da VENTURES. Em 18 meses, expandiu para 5 países da América Latina, aumentou seu faturamento em 8x e levantou uma rodada Series A de R$ 15 milhões com investidores internacionais.</p>
            <p className="italic text-gray-600">"O diferencial do investimento da VENTURES foi o conhecimento profundo do mercado internacional e as conexões que nos abriram portas impossíveis de acessar de outra forma." - Maria Santos, CEO</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-accent">TradeFinance AI</h3>
            <p className="mb-4">Fintech especializada em financiamento para comércio exterior utilizando inteligência artificial para análise de risco. Após participar do programa de aceleração e receber investimento de R$ 3 milhões, processou mais de R$ 200 milhões em operações de financiamento em seu primeiro ano completo de operação.</p>
            <p className="italic text-gray-600">"A mentoria intensiva durante o programa de aceleração nos ajudou a refinar nosso modelo de negócios e a estratégia de entrada em mercados globais, acelerando nosso crescimento." - Ricardo Oliveira, Fundador</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-accent">FAQ - Perguntas Frequentes</h2>
        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Qual é o processo de seleção para receber investimento da VENTURES?
            </div>
            <div className="p-4">
              Nosso processo de seleção é estruturado em cinco etapas, concebido para ser rigoroso mas também ágil para os empreendedores. Inicialmente, avaliamos todas as inscrições através de nossa plataforma online, onde analisamos a adequação do negócio às nossas teses de investimento e ao estágio de desenvolvimento apropriado. As empresas selecionadas passam para a fase de análise preliminar, onde realizamos reuniões iniciais com os fundadores para compreender melhor o modelo de negócio, a equipe e o potencial de mercado global. Na terceira etapa, conduzimos uma due diligence aprofundada, incluindo análise de tecnologia, mercado, financeira e jurídica, além de entrevistas com clientes e parceiros. As empresas que avançam são apresentadas ao comitê de investimentos, composto por especialistas em comércio internacional e venture capital. Por fim, após a aprovação do comitê, apresentamos a proposta de investimento e iniciamos o processo de estruturação da operação. O processo completo dura tipicamente entre 6 e 12 semanas, dependendo da complexidade do negócio e do estágio de maturidade da empresa.
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Que tipo de apoio, além do capital, a VENTURES oferece às empresas investidas?
            </div>
            <div className="p-4">
              Além do aporte financeiro, oferecemos um ecossistema completo de suporte para potencializar o crescimento internacional das empresas investidas. Isso inclui mentoria personalizada com especialistas setoriais que já construíram e escalaram negócios globalmente; acesso à nossa rede de mais de 200 parceiros comerciais em 35 países, facilitando a entrada em novos mercados; suporte de equipes especializadas em áreas críticas como desenvolvimento de produto, estratégia go-to-market internacional, compliance regulatório global e estruturação de operações internacionais; oportunidades de exposição em eventos e mídia especializados; conexão com potenciais clientes corporativos através de nosso programa de corporate venture; integração com as demais plataformas do ecossistema OLV que podem complementar suas operações; e acesso facilitado a rodadas subsequentes de investimento através de nossa rede de investidores e fundos parceiros. Nossa abordagem hands-on significa que trabalhamos lado a lado com os fundadores para superar os desafios específicos da expansão internacional.
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Como a VENTURES avalia o potencial de internacionalização de uma empresa?
            </div>
            <div className="p-4">
              Nossa metodologia proprietária de avaliação do potencial de internacionalização considera cinco dimensões críticas. Primeiro, analisamos a escalabilidade do produto ou serviço em diferentes mercados, avaliando o grau de localização necessário, a existência de barreiras técnicas e a viabilidade de adaptação a diferentes contextos. Segundo, examinamos a proposta de valor diferenciada e sua relevância em mercados internacionais específicos, comparando com soluções locais existentes. Terceiro, avaliamos a capacidade da equipe, considerando experiência prévia internacional, conhecimento de idiomas, adaptabilidade cultural e redes globais existentes. Quarto, analisamos o modelo de negócio e sua adequação para operação global, incluindo estruturas de precificação, canais de distribuição e exigências de capital. Por fim, estudamos o timing de mercado e oportunidades geopolíticas específicas que possam criar janelas favoráveis para entrada em determinados países. Cada dimensão recebe uma pontuação em nossa matriz de avaliação, gerando um índice de potencial de internacionalização que direciona nossa decisão de investimento e a estratégia de suporte pós-investimento.
            </div>
          </div>
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 bg-gray-50 font-semibold">
              Quais são os critérios para participar do programa de aceleração da VENTURES?
            </div>
            <div className="p-4">
              O programa de aceleração VENTURES foi desenhado para startups em estágio inicial com soluções inovadoras para o comércio internacional, e consideramos cinco critérios principais para seleção. Primeiro, buscamos startups com um produto mínimo viável (MVP) já desenvolvido e alguma validação inicial de mercado, mesmo que em escala limitada. Segundo, a solução deve endereçar um problema relevante e específico dentro do ecossistema de comércio exterior, com potencial de escala internacional. Terceiro, avaliamos o diferencial competitivo da tecnologia ou abordagem, priorizando inovações que representem avanços significativos sobre as soluções existentes. Quarto, analisamos a complementaridade com o ecossistema OLV e possíveis sinergias com nossas outras plataformas e empresas investidas. Por fim, e talvez mais importante, avaliamos a qualidade, experiência e compromisso da equipe fundadora, sua capacidade de execução e adaptação. O programa ocorre duas vezes por ano, com duração de seis meses, e inclui investimento de até R$ 500 mil em cada startup selecionada, além do programa de mentoria intensiva e acesso ao nosso ecossistema global.
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-accent">Pronto para impulsionar seu negócio internacional?</h2>
          <p className="mb-6 max-w-3xl mx-auto">Entre em contato com nossos especialistas e descubra como a VENTURES pode ajudar sua empresa a crescer globalmente com capital estratégico e apoio especializado.</p>
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
            "@type": "InvestmentOrFinancialService",
            "name": "VENTURES - OLV Internacional",
            "description": "Plataforma de investimentos estratégicos para empresas inovadoras do ecossistema de comércio internacional.",
            "url": "https://www.olvinternacional.com.br/ventures",
            "serviceType": "Investimento em Comércio Internacional",
            "areaServed": {
              "@type": "Country",
              "name": "Brasil"
            },
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": "https://www.olvinternacional.com.br/ventures",
              "servicePhone": "+55 11 0000-0000"
            }
          })
        }}
      />
    </PlatformLayout>
  );
} 