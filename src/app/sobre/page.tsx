import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import MainLayout from '../../components/layout/MainLayout';

export const metadata = {
  title: 'Sobre | OLV Internacional',
  description: 'Conheça a história, missão, visão e valores da OLV Internacional.',
  keywords: 'sobre olv internacional, consultoria supply chain, história da empresa, missão visão valores',
  alternates: {
    canonical: 'https://olvinternacional.com.br/sobre'
  },
};

export default function Sobre() {
  return (
    <MainLayout>
      <div className="main-content" style={{ marginTop: 'calc(var(--height-header) + 45px + 0.08cm)' }}>
        {/* SEÇÃO HERO */}
        <section className="section hero">
          <div className="container flex justify-center">
            <div
              className="glass-card-gold max-w-5xl w-full mx-auto px-8 py-10 mb-10 flex flex-col items-center text-center"
              style={{
                background: 'rgba(20, 22, 34, 0.72)',
                border: '2px solid #FFD700',
                borderRadius: '1.5rem',
                boxShadow: '0 2px 24px 0 rgba(212,175,55,0.15)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                transition: 'box-shadow 0.3s',
              }}
            >
              <h1 className="hero-title mb-4">Sobre a OLV Internacional</h1>
              <p className="max-w-3xl mx-auto text-base md:text-xl lg:text-2xl font-medium text-on-surface/90">
                Integramos Estratégia, Operação e Resultado para empresas que desejam expandir seus negócios globalmente.
              </p>
            </div>
          </div>
        </section>

        {/* HISTÓRIA DA EMPRESA */}
        <section className="section bg-gray-800">
          <div className="pt-20 pb-12 px-6 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="card flex flex-col justify-center border border-accent/60 lg:col-span-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-on-surface dark:text-white">Nossa Trajetória</h2>
                <p className="text-on-surface dark:text-white mb-4">
                  A OLV Internacional iniciou sua trajetória como uma importadora e exportadora, operando diretamente em projetos estratégicos de comércio exterior. Com o passar dos anos, participou de importantes iniciativas em grandes corporações nacionais e multinacionais, acumulando um repertório prático incomparável em operações logísticas, tributárias e de gestão internacional.
                </p>
                <p className="text-on-surface dark:text-white mb-4">
                  Ao longo dessa jornada, a OLV consolidou um valioso ecossistema de parceiros especializados — como transportadoras, agentes de carga (freight forwarders), despachantes aduaneiros, consultores independentes e prestadores de serviços de alto nível no setor de supply chain. Essa base de relacionamento, construída com confiança e entregas concretas, deu origem ao que hoje é o núcleo consultivo estratégico da empresa.
                </p>
                <p className="text-on-surface dark:text-white">
                  Foi justamente essa vivência, aliada à maturidade operacional conquistada ao longo de décadas, que levou a OLV Internacional a dar um passo ousado: voltar sua atuação ao fortalecimento das pequenas e médias empresas (PMEs), oferecendo a elas o que até então era acessível apenas a grandes players.
                </p>
              </div>
              <div className="hidden lg:block rounded-lg shadow-lg bg-black/25 p-0 lg:col-span-4">
                <Image 
                  src="/images/olv-internacional-banner.webp" 
                  alt="História da OLV Internacional" 
                  width={800}
                  height={450}
                  className="object-contain w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* NOVA SEÇÃO: MODELO DE ATUAÇÃO */}
        <section className="section pt-20">
          <div className="container">
            <div className="section-heading">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Nosso Modelo de Atuação</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="card">
                <p className="mb-4">
                  A OLV passou a trabalhar com um modelo de consultoria por projeto, onde executivos experientes, especializados e independentes atuam diretamente nos desafios dos clientes — sem a necessidade de estruturas internas onerosas, vínculos empregatícios ou investimentos pesados em departamentos próprios.
                </p>
                <p className="font-semibold text-lg mb-4">
                  Ao invés de contratar pessoas, o cliente contrata resultados.
                </p>
                <p className="font-semibold text-lg">
                  Ao invés de montar estrutura, o cliente acessa inteligência, experiência e rede estratégica.
                </p>
              </div>
              <div className="card">
                <h3 className="card-title mb-4">Nossa Proposta Única</h3>
                <p className="mb-4">
                  É nesse novo momento que a OLV Internacional lança ao mercado uma proposta única: aliar conhecimento prático, vivência real e automação tecnológica por meio de um corpo consultivo de alto nível, sustentado por um arsenal de plataformas digitais:
                </p>
                <ul className="card-list">
                  <li>
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="card-list-icon" /> 
                    <span className="font-semibold">STRATEVO</span> – Inteligência de mercado e dados públicos
                  </li>
                  <li>
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="card-list-icon" /> 
                    <span className="font-semibold">EXCELTTA</span> – Simuladores de importação e viabilidade
                  </li>
                  <li>
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="card-list-icon" /> 
                    <span className="font-semibold">OLV CONNECTA</span> – Conexão com fornecedores globais
                  </li>
                  <li>
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="card-list-icon" /> 
                    <span className="font-semibold">OLV ENGAGE</span> – Qualificação automatizada de leads
                  </li>
                  <li>
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="card-list-icon" /> 
                    <span className="font-semibold">OLV CORE</span> – Central de comando de todos os projetos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* MISSÃO, VISÃO E VALORES */}
        <section className="section bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="section-heading">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-on-surface dark:text-white">Missão, Visão e Valores</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card bg-gray-700">
                <h3 className="card-title text-on-surface dark:text-white">Missão</h3>
                <p className="text-on-surface dark:text-white">
                  Simplificar operações complexas, acelerar negócios e integrar estratégias com 
                  resultados no comércio exterior e logística internacional, permitindo que PMEs operem com a segurança, a inteligência e a força estratégica que antes só grandes empresas possuíam.
                </p>
              </div>
              <div className="card bg-gray-700">
                <h3 className="card-title text-on-surface dark:text-white">Visão</h3>
                <p className="text-on-surface dark:text-white">
                  Ser reconhecida como a principal consultoria estratégica em comércio exterior 
                  do Brasil, transformando a maneira como as empresas acessam mercados globais através da integração de tecnologia, conhecimento prático e networking estratégico.
                </p>
              </div>
              <div className="card bg-gray-700">
                <h3 className="card-title text-on-surface dark:text-white">Valores</h3>
                <ul className="card-list text-on-surface dark:text-white">
                  <li>
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="card-list-icon" /> 
                    Excelência operacional
                  </li>
                  <li>
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="card-list-icon" /> 
                    Integridade e transparência
                  </li>
                  <li>
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="card-list-icon" /> 
                    Inovação contínua
                  </li>
                  <li>
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="card-list-icon" /> 
                    Foco em resultados mensuráveis
                  </li>
                  <li>
                    <Image src="/icons/check.svg" alt="Checkmark" width={16} height={16} className="card-list-icon" /> 
                    Parceria estratégica
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DIFERENCIAL */}
        <section className="section pt-20">
          <div className="container">
            <div className="section-heading">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent">Nosso Diferencial</h2>
              <p className="text-center max-w-3xl mx-auto mb-8">
                Com nosso portfólio integrado, a OLV Internacional transforma tecnologia em ponte, consultoria em solução e networking em resultado mensurável.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card">
                <div className="flex items-center mb-3">
                  <Icon src="/icons/supplychain.svg" alt="Ícone Experiência" size="sm" className="mr-2 w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold">Experiência Prática</h3>
                </div>
                <p>
                  Nossa origem sólida como importadora/exportadora garante conhecimento real sobre os desafios e oportunidades do comércio internacional.
                </p>
              </div>
              <div className="card">
                <div className="flex items-center mb-3">
                  <Icon src="/icons/link.svg" alt="Ícone Rede" size="sm" className="mr-2 w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold">Rede Estratégica</h3>
                </div>
                <p>
                  Um ecossistema de especialistas e parceiros globais como diferencial competitivo para resolver problemas complexos.
                </p>
              </div>
              <div className="card">
                <div className="flex items-center mb-3">
                  <Icon src="/icons/tools.svg" alt="Ícone Modelo Flexível" size="sm" className="mr-2 w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold">Modelo Flexível</h3>
                </div>
                <p>
                  Atuamos como um braço externo da sua empresa, sem passivos trabalhistas, com estrutura enxuta e impacto elevado.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO RÁPIDO */}
        <section className="section contato">
          <div className="container contato-container">
            <div className="contato-card">
              <p className="contact-paragraph">
                Quer saber mais sobre como podemos ajudar sua empresa a expandir globalmente? Entre em contato conosco.
              </p>
              <Link href="/contato" className="btn btn-primary font-semibold py-3 px-6">Fale Com um Especialista Agora</Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 