import Link from 'next/link';


export const metadata = {
  title: 'Mapa do Site | OLV Internacional',
  description: 'Navegue facilmente por todas as páginas do site OLV Internacional.',
  keywords: 'mapa do site, navegação, sitemap olv internacional',
  alternates: {
    canonical: 'https://olvinternacional.com.br/sitemap'
  },
};

export default function SitemapPage() {
  const sections = {
    Institucional: [
      { href: '/', label: 'Home' },
      { href: '/sobre', label: 'Sobre Nós' },
      { href: '/solucoes', label: 'Soluções' },
      { href: '/radar360', label: 'Radar 360' },
      { href: '/contato', label: 'Contato' },
      { href: '/blog', label: 'Blog' },
    ],
    Plataformas: [
      { href: '/stratevo', label: 'STRATEVO' },
      { href: '/exceltta', label: 'EXCELTTA' },
      { href: '/connecta', label: 'CONNECTA' },
      { href: '/engage', label: 'ENGAGE' },
      { href: '/finx', label: 'FINX' },
      { href: '/labs', label: 'LABS' },
      { href: '/ventures', label: 'VENTURES' },
      { href: '/veritus', label: 'VERITUS' },
      { href: '/academy', label: 'ACADEMY' },
    ],
    Politicas: [
      { href: '/politica', label: 'Política de Privacidade' },
      { href: '/termos', label: 'Termos de Uso' },
    ],
  } as const;

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-accent">Mapa do Site</h1>
        <div className="space-y-10">
          {Object.entries(sections).map(([section, links]) => (
            <section key={section}>
              <h2 className="text-xl font-semibold mb-4 text-on-surface">{section}</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-accent hover:opacity-90">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

    </div>
  );
} 