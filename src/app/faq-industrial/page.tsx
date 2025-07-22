import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'FAQ Industrial - Supply Chain e Comex para PMEs Industriais | OLV Internacional',
  description: 'Perguntas frequentes sobre Supply Chain e Comércio Exterior Industrial. Respostas especializadas para PMEs industriais.',
  keywords: 'FAQ industrial, supply chain industrial, comex industrial, PME industrial, dúvidas comex',
  alternates: {
    canonical: 'https://olvinternacional.com.br/faq-industrial'
  }
};

export default function FaqIndustrialPage() {
  const faqs = [
    {
      question: "Como reduzir custos de importação de componentes críticos para minha indústria?",
      answer: "A redução de custos na importação de componentes críticos envolve otimização da classificação fiscal, utilização de regimes especiais (ex-tarifário, drawback), negociação de fretes consolidados e diversificação de fornecedores. A OLV Internacional analisa sua operação específica para identificar oportunidades de economia que podem chegar a 30% nos custos de aquisição."
    },
    {
      question: "O que é REPETRO e como aplicar em máquinas e equipamentos industriais?",
      answer: "O REPETRO (Regime Aduaneiro Especial de Admissão Temporária de Bens Destinados às Atividades de Pesquisa e Exploração de Petróleo e Gás Natural) permite a importação temporária de máquinas e equipamentos sem pagamento de impostos. É aplicável para indústrias que fornecem para o setor de óleo e gás, incluindo fabricantes de equipamentos, componentes e prestadores de serviços."
    },
    {
      question: "Como evitar paradas na produção por atrasos no desembaraço aduaneiro?",
      answer: "Para evitar paradas na produção, é essencial implementar planejamento logístico antecipado, manter estoque de segurança para insumos críticos, otimizar a documentação aduaneira e estabelecer parcerias estratégicas com despachantes especializados. A OLV Internacional oferece monitoramento em tempo real e gestão proativa de toda a cadeia de importação."
    },
    {
      question: "Qual o melhor regime especial para importação de insumos industriais?",
      answer: "O regime ideal depende do tipo de insumo e uso final. Para matéria-prima que será transformada: ex-tarifário. Para componentes que serão incorporados ao produto: drawback. Para máquinas e equipamentos: admissão temporária. Para insumos de pesquisa: REPETRO. A análise individual de cada caso é fundamental para maximizar os benefícios fiscais."
    },
    {
      question: "Como diversificar fornecedores sem comprometer a qualidade da produção?",
      answer: "A diversificação de fornecedores deve ser feita gradualmente, começando com insumos não críticos. Implemente processos de qualificação rigorosos, mantenha especificações técnicas detalhadas, realize auditorias de qualidade e estabeleça contratos com cláusulas de garantia. A OLV Internacional oferece serviços de due diligence e qualificação de fornecedores globais."
    },
    {
      question: "Quais certificações minha indústria precisa para exportar para Europa/EUA?",
      answer: "As certificações variam por produto e mercado. Para Europa: CE Mark, ISO 9001, ISO 14001, REACH. Para EUA: FDA (alimentos/cosméticos), UL (eletrônicos), EPA (produtos químicos). Para ambos: ISO 45001 (segurança), certificações específicas do setor. A OLV Internacional assessora no mapeamento e obtenção das certificações necessárias."
    },
    {
      question: "Como implementar JIT na cadeia de suprimentos da minha fábrica?",
      answer: "A implementação de JIT (Just-in-Time) requer planejamento logístico preciso, parcerias estratégicas com fornecedores confiáveis, sistemas de informação integrados e estoque de segurança bem dimensionado. Envolve também a otimização de rotas, modais e processos aduaneiros. A OLV Internacional desenvolve projetos customizados de JIT para cada indústria."
    },
    {
      question: "Qual o ROI esperado ao otimizar o Supply Chain industrial?",
      answer: "O ROI da otimização do Supply Chain industrial varia conforme o setor e situação atual, mas tipicamente inclui: redução de 15-30% nos custos logísticos, diminuição de 20-40% no lead time, economia de 10-25% em custos de estoque e aumento de 5-15% na produtividade. A OLV Internacional realiza diagnóstico detalhado para projetar o ROI específico da sua operação."
    }
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-[calc(var(--height-header)+1cm)]">
        {/* Hero Section */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#d4af37] to-[#2e8ce6] bg-clip-text text-transparent">
                  FAQ Industrial
                </h1>
                <p className="text-xl md:text-2xl text-slate-400/90 max-w-4xl mx-auto mb-8">
                  Perguntas Frequentes sobre Supply Chain e Comércio Exterior Industrial
                </p>
                <p className="text-lg text-slate-300 max-w-3xl mx-auto">
                  Respostas especializadas para PMEs industriais que buscam otimizar suas operações de comércio exterior e supply chain
                </p>
              </div>
              <div className="flex-shrink-0 md:w-1/3">
                <div className="bg-[#0a0f1d] p-4 rounded-lg border border-[#2a3448] shadow-md">
                  <Image 
                    src="/images/industrial-consultation.jpg" 
                    alt="Consultoria Industrial - OLV Internacional" 
                    width={400} 
                    height={300} 
                    className="rounded-lg" 
                    priority={true}
                    quality={85}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-12 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="space-y-8">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-[#141c2f] rounded-xl border border-[#2a3448] overflow-hidden shadow-xl hover:border-[#d4af37] transition-all duration-300">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-[#d4af37] flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-black font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-4">
                          {faq.question}
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 text-center">
              <div className="bg-[#141c2f] rounded-xl border border-[#2a3448] p-8">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Sua dúvida não foi respondida?
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Nossa equipe de especialistas está pronta para responder suas perguntas específicas sobre Supply Chain e Comércio Exterior Industrial
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    href="/contato" 
                    className="btn btn-primary text-lg px-8 py-3"
                  >
                    Fale com um Especialista
                  </Link>
                  <Link 
                    href="/solucoes" 
                    className="btn btn-secondary text-lg px-8 py-3"
                  >
                    Conheça Nossas Soluções
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="py-8 px-4">
          <div className="container max-w-4xl mx-auto">
            <nav className="text-sm text-gray-400">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link href="/" className="hover:text-[#d4af37] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <span className="text-[#d4af37]">FAQ Industrial</span>
                </li>
              </ol>
            </nav>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 