import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://olvinternacional.com.br"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.href ? `https://olvinternacional.com.br${item.href}` : undefined
      }))
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
      <nav className={`flex ${className}`} aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link 
              href="/" 
              className="text-gray-400 hover:text-[#d4af37] transition-colors duration-200 flex items-center"
              aria-label="Página inicial"
            >
              <HomeIcon className="h-4 w-4" />
            </Link>
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
              
              {item.current ? (
                <span 
                  className="text-[#d4af37] font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : item.href ? (
                <Link 
                  href={item.href}
                  className="text-gray-400 hover:text-[#d4af37] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-400">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

// Componente específico para páginas comuns
export const HomeBreadcrumb: React.FC = () => (
  <Breadcrumb items={[{ label: 'Início', current: true }]} />
);

export const AboutBreadcrumb: React.FC = () => (
  <Breadcrumb 
    items={[
      { label: 'Início', href: '/' },
      { label: 'Sobre Nós', current: true }
    ]} 
  />
);

export const SolutionsBreadcrumb: React.FC = () => (
  <Breadcrumb 
    items={[
      { label: 'Início', href: '/' },
      { label: 'Soluções', current: true }
    ]} 
  />
);

export const ContactBreadcrumb: React.FC = () => (
  <Breadcrumb 
    items={[
      { label: 'Início', href: '/' },
      { label: 'Contato', current: true }
    ]} 
  />
);

export const FaqBreadcrumb: React.FC = () => (
  <Breadcrumb 
    items={[
      { label: 'Início', href: '/' },
      { label: 'FAQ', current: true }
    ]} 
  />
);

export const BlogBreadcrumb: React.FC = () => (
  <Breadcrumb 
    items={[
      { label: 'Início', href: '/' },
      { label: 'Blog', current: true }
    ]} 
  />
);

export const SimulatorsBreadcrumb: React.FC = () => (
  <Breadcrumb 
    items={[
      { label: 'Início', href: '/' },
      { label: 'Simuladores', current: true }
    ]} 
  />
);

export const Radar360Breadcrumb: React.FC = () => (
  <Breadcrumb 
    items={[
      { label: 'Início', href: '/' },
      { label: 'Radar360', current: true }
    ]} 
  />
); 