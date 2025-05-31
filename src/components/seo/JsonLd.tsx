"use client";

import { SITE_CONFIG } from "@/lib/constants";

interface JsonLdProps {
  type: "Person" | "WebSite" | "WebPage" | "Article" | "BreadcrumbList";
  data?: any;
}

export default function JsonLd({ type, data }: JsonLdProps) {
  // Base website schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Baraa Alshaer Portfolio",
    url: SITE_CONFIG.url,
    description:
      "Portfolio of Baraa Alshaer, a skilled Full Stack Developer with expertise in React, Node.js, TypeScript, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Person schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Baraa Alshaer",
    url: SITE_CONFIG.url,
    image: data?.image || "",
    sameAs: [
      "https://github.com/balshaer",
      "https://www.linkedin.com/in/balshaer/",
      "https://www.youtube.com/@Codewithbaraa",
    ],
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Samtax",
    },
    email: SITE_CONFIG.email,
    description:
      "Full Stack Developer with expertise in React, Node.js, TypeScript, and more.",
  };

  // WebPage schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data?.title || "Baraa Alshaer - Full Stack Developer",
    description:
      data?.description ||
      "Portfolio of Baraa Alshaer, a skilled Full Stack Developer.",
    url: data?.url || SITE_CONFIG.url,
    isPartOf: {
      "@type": "WebSite",
      name: "Baraa Alshaer Portfolio",
      url: SITE_CONFIG.url,
    },
    about: {
      "@type": "Person",
      name: "Baraa Alshaer",
    },
    datePublished: data?.datePublished || new Date().toISOString(),
    dateModified: data?.dateModified || new Date().toISOString(),
    breadcrumb: data?.breadcrumb || null,
  };

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data?.title || "",
    description: data?.description || "",
    image: data?.image || "",
    author: {
      "@type": "Person",
      name: "Baraa Alshaer",
      url: SITE_CONFIG.url,
    },
    publisher: {
      "@type": "Person",
      name: "Baraa Alshaer",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/icon.png`,
      },
    },
    datePublished: data?.datePublished || new Date().toISOString(),
    dateModified: data?.dateModified || new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": data?.url || SITE_CONFIG.url,
    },
  };

  // BreadcrumbList schema
  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: data?.itemListElement || [],
  };

  // Select the appropriate schema based on type
  let schema;
  switch (type) {
    case "Person":
      schema = personSchema;
      break;
    case "WebSite":
      schema = websiteSchema;
      break;
    case "WebPage":
      schema = webPageSchema;
      break;
    case "Article":
      schema = articleSchema;
      break;
    case "BreadcrumbList":
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
