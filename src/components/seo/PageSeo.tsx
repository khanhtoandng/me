'use client';

import { usePathname } from 'next/navigation';
import JsonLd from './JsonLd';
import { websitePath } from '@/data/Links';

interface PageSeoProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'Person' | 'WebSite' | 'WebPage' | 'Article' | 'BreadcrumbList';
  publishedAt?: string;
  updatedAt?: string;
}

export default function PageSeo({
  title,
  description,
  image,
  type = 'WebPage',
  publishedAt,
  updatedAt
}: PageSeoProps) {
  const pathname = usePathname();
  const currentUrl = `${websitePath.main}${pathname}`;
  
  // Generate breadcrumb data
  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = `${websitePath.main}/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      '@type': 'ListItem',
      position: index + 1,
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      item: url
    };
  });
  
  // Add home as the first item if there are path segments
  if (pathSegments.length > 0) {
    breadcrumbItems.unshift({
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: websitePath.main
    });
    
    // Adjust positions for the rest of the items
    for (let i = 1; i < breadcrumbItems.length; i++) {
      breadcrumbItems[i].position = i + 1;
    }
  }
  
  const breadcrumbData = {
    itemListElement: breadcrumbItems
  };
  
  const pageData = {
    title,
    description,
    image,
    url: currentUrl,
    datePublished: publishedAt || new Date().toISOString(),
    dateModified: updatedAt || new Date().toISOString(),
    breadcrumb: breadcrumbData
  };
  
  return (
    <>
      <JsonLd type={type} data={pageData} />
      {breadcrumbItems.length > 0 && <JsonLd type="BreadcrumbList" data={breadcrumbData} />}
    </>
  );
}
