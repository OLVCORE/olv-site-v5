"use client";

import React from 'react';
import Head from 'next/head';

interface FaqItem {
  q: string;
  a: string;
}

export function FaqSchema({ mainQuestion, faqs }: { mainQuestion: string; faqs: FaqItem[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': mainQuestion,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faqs[0]?.a || ''
        }
      },
      ...faqs.slice(1).map(({ q, a }) => ({
        '@type': 'Question',
        'name': q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': a
        }
      }))
    ]
  };

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
}

export function HowToSchema({ title, steps }: { title: string; steps: string[] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': title,
    'step': steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s }))
  };

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
} 