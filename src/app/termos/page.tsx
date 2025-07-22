import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';

export const metadata = {
  title: 'Termos de Uso | OLV Internacional',
  description: 'Termos de Uso da OLV Internacional: regras, direitos e responsabilidades para utilização de nossos serviços, site e plataformas de comércio exterior, supply chain e consultoria em importação/exportação.',
  keywords: 'termos de uso, termos e condições, direitos autorais comércio exterior, propriedade intelectual, política de uso, responsabilidades, limitação de responsabilidade, consultoria importação, exportação, regras de uso'
};

export default function TermosPage() {
  return (
    <MainLayout>
      <div className="main-content">
        {/* HERO DA PÁGINA TERMOS */}
        <section className="section hero">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">Termos de Uso</h1>
                <p className="text-gray-300 text-lg">
                  Bem-vindo aos Termos de Uso da OLV Internacional. Este documento estabelece as regras,
                  direitos e responsabilidades para utilização de nossos serviços, site e plataformas.
                  Por favor, leia atentamente antes de acessar ou utilizar nossos serviços.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative h-64 md:h-80 w-full">
                  <Image 
                    src="/images/olv-policy-banner.webp" 
                    alt="Termos de Uso – OLV Internacional" 
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO CONTEÚDO DOS TERMOS */}
        <section className="section" id="termos-content">
          <div className="container mx-auto px-4 py-8">
            {/* 1. Aceitação dos Termos */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">1. Aceitação dos Termos</h2>
              <p className="text-gray-300 mb-4">
                Ao acessar ou utilizar o site da OLV Internacional (www.olvinternacional.com.br), bem como qualquer outro 
                site, aplicativo, software, ferramenta, plataforma ou conteúdo relacionado (coletivamente, os "Serviços"), 
                você concorda com estes Termos de Uso.
              </p>
              <p className="text-gray-300 mb-4">
                Estes termos constituem um acordo legal entre você e a OLV Internacional, inscrita no CNPJ sob o nº 67.867.580/0001-90, 
                com sede na Av. Paulista, 1471 - Conj 1110, Bela Vista, São Paulo - SP, CEP 01311-927, Brasil.
              </p>
              <p className="text-gray-300">
                Se você não concordar com estes termos, não utilize nossos Serviços. Reservamo-nos o direito de modificar estes 
                termos a qualquer momento, e tais modificações terão efeito imediato após a publicação no site.
              </p>
            </article>

            {/* 2. Serviços */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">2. Serviços</h2>
              <p className="text-gray-300 mb-4">
                A OLV Internacional oferece serviços especializados em consultoria de comércio exterior, importação, exportação, 
                logística internacional, compliance aduaneiro, desenvolvimento de estratégias de internacionalização e treinamentos 
                corporativos.
              </p>
              <p className="text-gray-300 mb-4">
                Os Serviços podem incluir conteúdo informativo, ferramentas de simulação, plataformas digitais, assessoria 
                personalizada e outros recursos relacionados ao comércio internacional.
              </p>
              <p className="text-gray-300">
                A OLV Internacional se reserva o direito de alterar, suspender ou descontinuar qualquer aspecto dos Serviços 
                a qualquer momento, incluindo a disponibilidade de qualquer recurso, banco de dados ou conteúdo.
              </p>
            </article>

            {/* 3. Uso dos Serviços */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">3. Uso dos Serviços</h2>
              <p className="text-gray-300 mb-4">Ao utilizar nossos Serviços, você concorda em:</p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Fornecer informações precisas, completas e atualizadas;</li>
                <li>Utilizar os Serviços apenas para finalidades legais e de acordo com estes Termos;</li>
                <li>Não utilizar os Serviços para fins fraudulentos ou ilícitos;</li>
                <li>Não interferir ou interromper a integridade ou o desempenho dos Serviços;</li>
                <li>Não tentar obter acesso não autorizado aos Serviços, sistemas ou redes;</li>
                <li>Não reproduzir, duplicar, copiar, vender, revender ou explorar qualquer parte dos Serviços sem autorização expressa;</li>
                <li>Não transmitir vírus, malware ou outros códigos de natureza destrutiva;</li>
                <li>Respeitar todos os direitos de propriedade intelectual relacionados aos Serviços.</li>
              </ul>
            </article>

            {/* 4. Propriedade Intelectual */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">4. Propriedade Intelectual</h2>
              <p className="text-gray-300 mb-4">
                Todo o conteúdo disponível nos Serviços, incluindo, mas não se limitando a textos, gráficos, logotipos, 
                ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software, é de propriedade 
                da OLV Internacional ou de seus fornecedores e parceiros, e está protegido pelas leis brasileiras e 
                internacionais de direitos autorais, marcas registradas e outras leis de propriedade intelectual.
              </p>
              <p className="text-gray-300 mb-4">
                A reprodução, distribuição, modificação, exibição pública, execução pública ou qualquer outro uso do 
                conteúdo dos Serviços para fins comerciais sem autorização prévia por escrito da OLV Internacional é 
                estritamente proibida.
              </p>
              <p className="text-gray-300">
                As marcas comerciais, marcas de serviço e logotipos utilizados e exibidos nos Serviços são marcas 
                registradas ou não registradas da OLV Internacional e de terceiros. Nada contido nos Serviços deve 
                ser interpretado como concessão, por implicação, preclusão ou de outra forma, de qualquer licença 
                ou direito de usar qualquer marca exibida nos Serviços sem a permissão por escrito da OLV Internacional 
                ou do terceiro proprietário.
              </p>
            </article>

            {/* 5. Limitação de Responsabilidade */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">5. Limitação de Responsabilidade</h2>
              <p className="text-gray-300 mb-4">
                Os Serviços são fornecidos "como estão" e "conforme disponíveis", sem garantias de qualquer tipo, 
                expressas ou implícitas. A OLV Internacional não garante que os Serviços serão ininterruptos, oportunos, 
                seguros ou livres de erros.
              </p>
              <p className="text-gray-300 mb-4">
                Em nenhuma circunstância a OLV Internacional será responsável por quaisquer danos diretos, indiretos, 
                incidentais, especiais, exemplares ou consequenciais (incluindo, mas não se limitando a, perda de lucros, 
                receitas, dados, uso de bens ou outros bens intangíveis) resultantes do uso ou incapacidade de uso dos Serviços.
              </p>
              <p className="text-gray-300">
                As informações disponibilizadas nos Serviços têm caráter informativo e não constituem aconselhamento 
                jurídico, tributário ou regulatório. As decisões tomadas com base nas informações disponibilizadas 
                são de responsabilidade exclusiva do usuário.
              </p>
            </article>

            {/* 6. Links para Sites de Terceiros */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">6. Links para Sites de Terceiros</h2>
              <p className="text-gray-300 mb-4">
                Os Serviços podem conter links para sites de terceiros que não são de propriedade ou controlados pela 
                OLV Internacional. A OLV Internacional não tem controle e não assume nenhuma responsabilidade pelo 
                conteúdo, políticas de privacidade ou práticas de sites de terceiros.
              </p>
              <p className="text-gray-300">
                Você reconhece e concorda que a OLV Internacional não será responsável, direta ou indiretamente, por 
                qualquer dano ou perda causada ou alegadamente causada por ou em conexão com o uso ou confiança em 
                qualquer conteúdo, bens ou serviços disponíveis em ou através de tais sites.
              </p>
            </article>

            {/* 7. Lei Aplicável e Jurisdição */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">7. Lei Aplicável e Jurisdição</h2>
              <p className="text-gray-300 mb-4">
                Estes Termos serão regidos e interpretados de acordo com as leis do Brasil. Qualquer disputa decorrente 
                ou relacionada a estes Termos será submetida à jurisdição exclusiva dos tribunais da Comarca de São Paulo, SP.
              </p>
            </article>

            {/* CTA para contato */}
            <div className="bg-primary text-on-primary p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Dúvidas sobre nossos termos?</h2>
              <p className="text-white mb-6">
                Se você tiver qualquer dúvida sobre nossos Termos de Uso ou precisar de esclarecimentos adicionais, 
                nossa equipe está pronta para ajudar.
              </p>
              <Link
                href="/contato"
                className="btn btn-primary font-bold py-3 px-8"
              >
                Fale Conosco
              </Link>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 