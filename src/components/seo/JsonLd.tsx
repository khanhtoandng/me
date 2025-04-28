'use client';

import { websitePath, domain, email } from '@/data/Links';

interface JsonLdProps {
  type: 'Person' | 'WebSite' | 'WebPage' | 'Article' | 'BreadcrumbList';
  data?: any;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  // Base website schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Baraa Alshaer Portfolio',
    url: websitePath.main,
    description: 'Portfolio of Baraa Alshaer, a skilled Full Stack Developer with expertise in React, Node.js, TypeScript, and more.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${websitePath.main}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // Person schema
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Baraa Alshaer',
    url: websitePath.main,
    image: data?.image || '',
    sameAs: [
      'https://github.com/balshaer',
      'https://www.linkedin.com/in/balshaer/',
      'https://www.youtube.com/@Codewithbaraa'
    ],
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Samtax'
    },
    email: email,
    description: 'Full Stack Developer with expertise in React, Node.js, TypeScript, and more.'
  };

  // WebPage schema
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: data?.title || 'Baraa Alshaer - Full Stack Developer',
    description: data?.description || 'Portfolio of Baraa Alshaer, a skilled Full Stack Developer.',
    url: data?.url || websitePath.main,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Baraa Alshaer Portfolio',
      url: websitePath.main
    },
    about: {
      '@type': 'Person',
      name: 'Baraa Alshaer'
    },
    datePublished: data?.datePublished || new Date().toISOString(),
    dateModified: data?.dateModified || new Date().toISOString(),
    breadcrumb: data?.breadcrumb || null
  };

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data?.title || '',
    description: data?.description || '',
    image: data?.image || '',
    author: {
      '@type': 'Person',
      name: 'Baraa Alshaer',
      url: websitePath.main
    },
    publisher: {
      '@type': 'Person',
      name: 'Baraa Alshaer',
      logo: {
        '@type': 'ImageObject',
        url: `https://${domain}/logo.png`
      }
    },
    datePublished: data?.datePublished || new Date().toISOString(),
    dateModified: data?.dateModified || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data?.url || websitePath.main
    }
  };

  // BreadcrumbList schema
  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data?.itemListElement || []
  };

  // Select the appropriate schema based on type
  let schema;
  switch (type) {
    case 'Person':
      schema = personSchema;
      break;
    case 'WebSite':
      schema = websiteSchema;
      break;
    case 'WebPage':
      schema = webPageSchema;
      break;
    case 'Article':
      schema = articleSchema;
      break;
    case 'BreadcrumbList':
      schema = breadcrumbListSchema;
      break;
    default:
      schema = websiteSchema;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
