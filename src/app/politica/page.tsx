import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';

export const metadata = {
  title: 'Política | OLV Internacional',
  description: 'Política de Privacidade e LGPD da OLV Internacional: como coletamos, armazenamos, tratamos e protegemos seus dados pessoais, em conformidade com a legislação brasileira e melhores práticas de comércio exterior, supply chain e importação/exportação.'
};

export default function PoliticaPage() {
  return (
    <MainLayout>
      <div className="main-content">
        {/* HERO DA PÁGINA POLÍTICA */}
        <section className="section hero">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-1/2">
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-white">Política de Privacidade e LGPD</h1>
                <p className="text-gray-300 text-lg">
                  A OLV Internacional está comprometida com a segurança e privacidade dos seus dados. Nesta página, 
                  detalhamos de forma transparente como tratamos as informações pessoais e corporativas que nos são 
                  confiadas, seguindo rigorosamente a Lei Geral de Proteção de Dados (LGPD) e as melhores práticas 
                  internacionais de segurança da informação.
                </p>
              </div>
              <div className="lg:w-1/2">
                <div className="relative h-64 md:h-80 w-full">
                  <Image 
                    src="/images/olv-policy-banner.webp" 
                    alt="Política de Privacidade – OLV Internacional" 
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO CONTEÚDO DA POLÍTICA */}
        <section className="section" id="politica-content">
          <div className="container mx-auto px-4 py-8">
            {/* 1. Introdução */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">1. Introdução</h2>
              <p className="text-gray-300 mb-4">
                A OLV Internacional, inscrita no CNPJ sob o nº 67.867.580/0001-90, com sede na Av. Paulista, 1636 – Bela Vista, São Paulo – SP, CPF 01310-200, Brasil, é especialista em consultoria de Supply Chain, Comércio Exterior, Importação e Exportação.
              </p>
              <p className="text-gray-300 mb-4">
                Esta Política de Privacidade esclarece quais dados pessoais são coletados, para quais finalidades são utilizados, como são armazenados, compartilhados e protegidos, bem como os direitos dos titulares de dados.
              </p>
              <p className="text-gray-300">
                Ao acessar ou utilizar nosso site, você concorda com os termos desta política. Caso não concorde com qualquer parte, por favor, não utilize nosso site.
              </p>
            </article>

            {/* 2. Definições */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">2. Definições</h2>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li><strong className="text-white">Dados Pessoais:</strong> quaisquer informações que identifiquem ou possam identificar uma pessoa natural, direta ou indiretamente.</li>
                <li><strong className="text-white">Titular:</strong> pessoa natural a quem se referem os dados pessoais que são objeto de tratamento.</li>
                <li><strong className="text-white">Controlador:</strong> pessoa jurídica que toma as decisões sobre o tratamento de dados pessoais (neste caso, a OLV Internacional).</li>
                <li>
                  <strong className="text-white">Operador:</strong> pessoa jurídica que realiza o tratamento de dados em nome do controlador.<br />
                  Exemplo: empresa de hospedagem de site, sistema de CRM, plataforma de e-mail marketing, ferramentas de analytics.
                </li>
                <li><strong className="text-white">Tratamento:</strong> qualquer operação realizada com dados pessoais, como coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, armazenamento, eliminação, entre outros.</li>
                <li><strong className="text-white">LGPD:</strong> Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).</li>
              </ul>
            </article>

            {/* 3. Quais dados coletamos */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">3. Quais dados coletamos</h2>
              <p className="text-gray-300 mb-4">Podemos coletar e tratar as seguintes categorias de dados pessoais:</p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li><strong className="text-white">Informações de identificação:</strong> nome completo, CPF/CNPJ, dados de endereço, telefone, e-mail corporativo;</li>
                <li><strong className="text-white">Informações de transação:</strong> histórico de contato, serviços de interesse (ex.: <em>Consultoria em Exportação</em>, <em>Consultoria em Importação</em>, <em>Logística Internacional</em>, <em>Compliance Aduaneiro</em>, <em>Treinamentos</em>, <em>Radar SISCOMEX</em> etc.);</li>
                <li><strong className="text-white">Informações de navegação:</strong> dados coletados automaticamente por cookies e tecnologias similares (endereço IP, tipo de dispositivo, sistema operacional, browser, páginas acessadas, tempo de permanência, origem do tráfego, links clicados, localização aproximada);</li>
                <li><strong className="text-white">Dados para marketing e publicidade:</strong> perfil de interesse, preferências de comunicação, interação com campanhas de Google Ads (incluindo AI Mode e intenções de busca);</li>
                <li><strong className="text-white">Dados de consentimento:</strong> registros de aceite de política de privacidade, opt‐in/opt‐out de newsletters, histórico de atualizações de preferência.</li>
              </ul>
            </article>

            {/* 4. Finalidades do tratamento */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">4. Finalidades do tratamento</h2>
              <p className="text-gray-300 mb-4">Utilizamos seus dados pessoais para as seguintes finalidades:</p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li>Fornecer os serviços solicitados de consultoria em comércio exterior;</li>
                <li>Responder a solicitações e prestar suporte adequado;</li>
                <li>Enviar comunicações sobre nossos serviços, atualizações e novidades;</li>
                <li>Melhorar nossos serviços e a experiência do usuário;</li>
                <li>Realizar análises estatísticas e estudos de mercado;</li>
                <li>Cumprir obrigações legais e regulatórias;</li>
                <li>Prevenir fraudes e proteger nossos direitos e os dos usuários.</li>
              </ul>
            </article>

            {/* 5. Base legal */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">5. Base legal</h2>
              <p className="text-gray-300 mb-4">O tratamento de seus dados pessoais é realizado com base nas seguintes hipóteses legais previstas na LGPD:</p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li><strong className="text-white">Consentimento:</strong> quando você concorda expressamente com o tratamento de seus dados para finalidades específicas;</li>
                <li><strong className="text-white">Execução de contrato:</strong> quando o tratamento é necessário para a prestação dos serviços contratados;</li>
                <li><strong className="text-white">Interesse legítimo:</strong> quando o tratamento é necessário para atender aos interesses legítimos da OLV Internacional, respeitando seus direitos e liberdades fundamentais;</li>
                <li><strong className="text-white">Cumprimento de obrigação legal:</strong> quando o tratamento é necessário para cumprir uma obrigação legal ou regulatória.</li>
              </ul>
            </article>

            {/* 6. Cookies e tecnologias similares */}
            <article className="bg-gray-800 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4 text-white">6. Cookies e tecnologias similares</h2>
              <p className="text-gray-300 mb-4">
                Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site. Eles nos permitem reconhecer seu dispositivo, lembrar suas preferências, analisar o uso do site e personalizar conteúdos.
              </p>
              <p className="text-gray-300 mb-4">Os tipos de cookies que utilizamos incluem:</p>
              <ul className="space-y-2 text-gray-300 list-disc pl-5">
                <li><strong className="text-white">Cookies essenciais:</strong> necessários para o funcionamento básico do site;</li>
                <li><strong className="text-white">Cookies de preferências:</strong> permitem que o site lembre suas escolhas e preferências;</li>
                <li><strong className="text-white">Cookies de estatísticas:</strong> coletam informações anônimas sobre como você utiliza o site, permitindo melhorar seu funcionamento;</li>
                <li><strong className="text-white">Cookies de marketing:</strong> utilizados para exibir anúncios relevantes com base em seus interesses.</li>
              </ul>
              <p className="text-gray-300">
                Você pode gerenciar ou desativar cookies através das configurações do seu navegador. No entanto, isso pode afetar a funcionalidade do site.
              </p>
            </article>

            {/* CTA para contato */}
            <div className="bg-primary text-on-primary p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4 text-white">Dúvidas sobre nossa política?</h2>
              <p className="text-white mb-6">
                Se você tiver qualquer dúvida sobre como tratamos seus dados pessoais ou quiser exercer seus direitos, entre em contato conosco.
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