import React from 'react';

export const OrganizationSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "OLV Internacional",
    "url": "https://olv-site-v5.vercel.app",
    "logo": "https://olv-site-v5.vercel.app/images/logo.png",
    "description": "Consultoria especializada em Supply Chain Industrial e Comércio Exterior para PMEs. 35 anos de experiência em multinacionais.",
    "foundingDate": "1989",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
      "addressRegion": "São Paulo"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "contato@olvinternacional.com.br"
    },
    "sameAs": [
      "https://www.linkedin.com/company/olv-internacional",
      "https://www.facebook.com/olvinternacional"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const LocalBusinessSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "OLV Internacional",
    "description": "Consultoria especializada em Supply Chain Industrial e Comércio Exterior para PMEs",
    "url": "https://olv-site-v5.vercel.app",
    "telephone": "+55-11-99999-9999",
    "email": "contato@olvinternacional.com.br",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR",
      "addressRegion": "São Paulo",
      "addressLocality": "São Paulo"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-23.5505",
      "longitude": "-46.6333"
    },
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "serviceArea": {
      "@type": "Country",
      "name": "Brasil"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Consultoria",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Consultoria de Importação",
            "description": "Orientação completa para importação de insumos industriais"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Consultoria de Exportação",
            "description": "Suporte para exportação de produtos acabados"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Otimização de Supply Chain",
            "description": "Redução de custos e otimização de processos logísticos"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const ServiceSchema: React.FC = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Consultoria Supply Chain Industrial",
    "description": "Consultoria especializada em Supply Chain Industrial e Comércio Exterior para PMEs",
    "provider": {
      "@type": "Organization",
      "name": "OLV Internacional"
    },
    "serviceType": "Consultoria Empresarial",
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços de Consultoria Industrial",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Desembaraço Aduaneiro",
            "description": "Processo completo de desembaraço aduaneiro"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Planejamento Tributário",
            "description": "Otimização tributária para operações de comércio exterior"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Radar SISCOMEX",
            "description": "Habilitação e gestão do Radar SISCOMEX"
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const BreadcrumbSchema: React.FC<{ items: Array<{ name: string; url: string }> }> = ({ items }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const FAQSchema: React.FC<{ questions: Array<{ question: string; answer: string }> }> = ({ questions }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}; 