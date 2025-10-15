import React from 'react';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import ContactForm from '../../components/ContactForm';

export const metadata = {
  title: 'Contato | OLV Internacional - Consultoria em Supply Chain Global para Setores Industriais',
  description: 'Entre em contato com a OLV Internacional. Nossa equipe está pronta para oferecer soluções personalizadas em Supply Chain Global e Comércio Exterior para agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura e logística industrial.',
  keywords: 'contato olv internacional, consultoria supply chain global, consultoria comércio exterior, setores industriais, agroindústria, mineração, energia, petróleo e gás, metalurgia, bens de capital, máquinas e equipamentos, manufatura, logística industrial',
  alternates: {
    canonical: 'https://olvinternacional.com.br/contato'
  },
};

export default function ContatoPage() {
  return (
    <MainLayout>
      <div className="main-content">
        {/* SEÇÃO HERO CONTATO */}
        <section className="section">
          <div className="container">
            <div className="bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="flex items-center gap-2 text-2xl md:text-3xl font-bold text-white mb-4">
                <span className="text-blue-400">📱</span> Fale com a OLV Internacional
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Estamos aqui para conectar sua empresa dos setores industriais ao mundo. Seja para tirar dúvidas, solicitar uma proposta 
                ou conhecer melhor nossas soluções em Supply Chain Global e Comércio Exterior, nossa equipe está pronta para atendê-lo. Preencha o formulário 
                abaixo ou utilize um de nossos canais de atendimento direto para iniciar uma conversa sobre como 
                podemos impulsionar suas operações internacionais.
              </p>
            </div>
          </div>
        </section>

        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* FORMULÁRIO DE CONTATO */}
            <div className="w-full lg:w-2/3">
              <ContactForm />
            </div>

            {/* INFORMAÇÕES DE CONTATO */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Informações de Contato
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Atendimento
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-1">
                      <strong>E-mail:</strong> consultores@olvinternacional.com.br
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Telefone:</strong> +55 (11) 2675-1446
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Horário de Atendimento
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Segunda a Sexta: 08:00 às 18:00<br />
                      Sábados, Domingos e Feriados: Fechado
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Endereço
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Av. Paulista, 1471, Conjunto 1010<br />
                      Bela Vista, São Paulo - SP<br />
                      CEP: 01311-927
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6">
                    <a 
                      href="https://wa.me/5511999244444?text=Olá! Vim do site da OLV Internacional e gostaria de saber mais sobre os serviços de comércio exterior." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                      </svg>
                      WhatsApp
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/olv-internacional/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 btn btn-primary"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-primary text-on-primary rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Precisa de atendimento urgente?</h3>
                <p className="mb-6">
                  Nossa equipe pode entrar em contato com você imediatamente para resolver seu problema.
                </p>
                <a 
                  href="tel:+551126751446"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 btn btn-primary font-bold"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                  </svg>
                  Ligar Agora
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MAPA DA LOCALIZAÇÃO */}
        <section className="section">
          <div className="container">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Nossa Localização
              </h3>
              <div className="relative w-full h-80 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 dark:text-gray-500">
                  {/* Aqui seria carregado um mapa usando Google Maps ou outra API */}
                  <p className="text-center">Mapa será carregado aqui<br />Av. Paulista, 1471, Conjunto 1010<br />Bela Vista, São Paulo - SP</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
} 