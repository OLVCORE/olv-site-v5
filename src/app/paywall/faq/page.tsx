import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';

export const metadata = {
  title: 'Assinatura FAQ | OLV Internacional',
  robots: {
    index: false,
    follow: false,
  },
};

export default function FaqPaywall() {
  return (
    <MainLayout className="faq-paywall">
      <div className="container py-12 text-center max-w-xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-accent">Acesso ilimitado às FAQs Premium</h1>
        <p className="mb-4 text-lg">
          Você atingiu o limite de 3 visualizações gratuitas por mês. Assine para liberar acesso ilimitado a mais
          de 150 respostas detalhadas e receber relatórios PDF exclusivos.
        </p>
        <div className="bg-[#1a2338] p-6 rounded-lg mb-6 border border-[#2a3448]">
          <h2 className="text-2xl font-semibold mb-2">Plano FAQ+</h2>
          <p className="text-4xl font-bold mb-2 text-accent">R$ 29<span className="text-base">/mês</span></p>
          <ul className="text-left list-disc list-inside mb-4 text-sm leading-relaxed">
            <li>Acesso ilimitado a todas as FAQs</li>
            <li>Download de PDFs e planilhas</li>
            <li>Alertas de atualização de conteúdo</li>
            <li>Desconto de 10 % em consultoria</li>
          </ul>
          <Link
            href="/api/checkout?plan=faq_plus"
            className="inline-block bg-accent hover:bg-accent/80 text-black font-bold px-6 py-3 rounded"
          >
            Assinar agora
          </Link>
        </div>
        <p className="text-sm text-gray-400">
          Já é assinante? <Link href="/login" className="text-accent underline">Entre na sua conta</Link>.
        </p>
      </div>
    </MainLayout>
  );
} 