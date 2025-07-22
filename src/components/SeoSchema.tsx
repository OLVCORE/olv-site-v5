import React from 'react';

interface SeoSchemaProps {
  type: 'organization' | 'localBusiness' | 'service' | 'breadcrumb' | 'faq' | 'howTo';
  data: any;
}

export function SeoSchema({ type, data }: SeoSchemaProps) {
  const getSchema = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "OLV Internacional",
          "description": "Consultoria especializada em comércio exterior, importação, exportação e logística internacional para PMEs",
          "url": "https://olvinternacional.com.br",
          "logo": "https://olvinternacional.com.br/images/olv-logo.jpeg",
          "foundingDate": "1989",
          "founder": {
            "@type": "Person",
            "name": "Marcos Oliveira"
          },
          "sameAs": [
            "https://www.linkedin.com/company/26251289/admin/dashboard/",
            "https://www.instagram.com/olvinternacional",
            "https://www.facebook.com/olvinternacional"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-11-2675-1446",
            "contactType": "customer service",
            "email": "atendimento@olvinternacional.com.br",
            "areaServed": "BR",
            "availableLanguage": "Portuguese"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "BR",
            "addressRegion": "SP",
            "addressLocality": "São Paulo"
          }
        };

      case 'localBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "OLV Internacional",
          "description": "Consultoria especializada em comércio exterior",
          "url": "https://olvinternacional.com.br",
          "telephone": "+55-11-2675-1446",
          "email": "atendimento@olvinternacional.com.br",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "BR",
            "addressRegion": "SP",
            "addressLocality": "São Paulo"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -23.5505,
            "longitude": -46.6333
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "priceRange": "$$",
          "currenciesAccepted": "BRL, USD, EUR",
          "paymentAccepted": "Cash, Credit Card, Bank Transfer",
          "areaServed": {
            "@type": "Country",
            "name": "Brasil"
          },
          "serviceArea": {
            "@type": "Country",
            "name": "Brasil"
          }
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": data.name || "OLV Internacional",
          "provider": {
            "@type": "Organization",
            "name": "OLV Internacional",
            "url": "https://olvinternacional.com.br"
          },
          "description": data.description || "Consultoria em comércio exterior",
          "serviceType": data.serviceType || "Consultoria Empresarial",
          "category": data.category || "Comércio Exterior",
          "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "BRL",
            "areaServed": {
              "@type": "Country",
              "name": "Brasil"
            }
          },
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Serviços OLV",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Consultoria em Importação"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Consultoria em Exportação"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Logística Internacional"
                }
              }
            ]
          }
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.faqs.map((faq: any) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        };

      case 'howTo':
        return {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": data.title,
          "description": data.description,
          "image": data.image,
          "totalTime": data.totalTime,
          "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "BRL",
            "value": data.cost
          },
          "step": data.steps.map((step: any, index: number) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.name,
            "text": step.text,
            "image": step.image
          }))
        };

      default:
        return data;
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getSchema())
      }}
    />
  );
}

// Componentes específicos para facilitar o uso
export function OrganizationSchema() {
  return <SeoSchema type="organization" data={{}} />;
}

export function LocalBusinessSchema() {
  return <SeoSchema type="localBusiness" data={{}} />;
}

export function ServiceSchema({ name, description, serviceType, category }: any) {
  return (
    <SeoSchema 
      type="service" 
      data={{ name, description, serviceType, category }} 
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  return <SeoSchema type="breadcrumb" data={{ items }} />;
}

export function FaqSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  return <SeoSchema type="faq" data={{ faqs }} />;
}

export function HowToSchema({ title, description, steps, image, totalTime, cost }: any) {
  return (
    <SeoSchema 
      type="howTo" 
      data={{ title, description, steps, image, totalTime, cost }} 
    />
  );
} 