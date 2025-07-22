import Link from 'next/link';
import Image from 'next/image';

const sims = [
  {
    slug: '/simuladores/importacao',
    title: 'Simulador de Custo de Importação',
    desc: 'Calcule impostos, frete, despesas e câmbio para saber o custo total landed.',
    icon: '/icons/import-icon.svg',
    highlight: true,
  },
  {
    slug: '/simuladores/exportacao',
    title: 'Simulador de Custo de Exportação',
    desc: 'Simule margem, preços FOB/CIF e compare cenários de incentivo.',
    icon: '/icons/export-icon.svg',
    highlight: true,
  },
  {
    slug: '/simuladores/frete-full',
    title: 'Simulador de Frete Internacional e Nacional',
    desc: 'Compare custos aéreo, marítimo, rodoviário e ferroviário.',
    icon: '/icons/truck-gear.svg',
  },
  {
    slug: '/simuladores/cambio',
    title: 'Conversor de Moedas',
    desc: 'Taxas de câmbio em tempo real para +150 moedas.',
    icon: '/icons/currency-exchange.svg',
  },
  {
    slug: '/simuladores/cubagem',
    title: 'Simulador de Cubagem',
    desc: 'Descubra ocupação ideal por contêiner ou caminhão.',
    icon: '/icons/analytics.svg',
  },
  {
    slug: '/simuladores/tributario-light',
    title: 'Simulador de Tributos de Importação',
    desc: 'ICMS, IPI, PIS/COFINS, II federais e estaduais (IBPT).',
    icon: '/icons/compliance-icon.svg',
  },
];

export default function RadarHub(){
  return (
    <section className="section py-6" id="simuladores">
      <div className="container">
        <div className="bg-[var(--color-surface)] dark:bg-[#141c2f] p-5 mx-0 px-4 md:mx-[-2cm] md:px-[2cm] rounded-lg border-2 border-[#d4af37] shadow-[0_0_25px_rgba(0,0,0,0.12)] dark:shadow-[0_0_25px_rgba(0,0,0,0.7)] space-y-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]">
          <div className="section-heading flex items-center gap-3">
            <div className="w-14 h-14 mb-1 rounded-full bg-[#0a0f1d] border-2 border-[#d4af37] flex items-center justify-center">
              <Image src="/icons/calculator.svg" alt="Ícone Simuladores" width={28} height={28} />
            </div>
            <h2 className="text-2xl font-semibold text-[#d4af37]">Radar 360 Hub – Simuladores & Calculadoras</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg font-bold italic max-w-3xl">Ferramentas gratuitas para estimar custos de importação, exportação e logística, gerando insights em menos de 1&nbsp;minuto.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sims.map(sim=> {
              const extra = sim.highlight ? 'sm:col-span-2 lg:col-span-2 xl:col-span-2' : '';
              return (
                <Link key={sim.slug} href={sim.slug} className={`${extra} relative group glass card-hover shadow-gold rounded-xl p-5 overflow-hidden flex items-start gap-3`}>
                  <span className="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  <Image src={sim.icon} alt={sim.title} width={28} height={28} className="mt-1 flex-shrink-0 relative z-10" />
                  <div>
                    <h3 className="font-semibold text-base mb-1 relative z-10 text-[var(--color-on-surface)]">{sim.title}</h3>
                    <p className="text-xs leading-snug max-w-[240px] relative z-10 text-[var(--color-on-surface)]/80">{sim.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 