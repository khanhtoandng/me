import { MetadataRoute } from 'next'

// Required for static export
export const dynamic = 'force-static'
export const revalidate = false

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://portfolio.anphaops.cloud'

  // Main pages - only include routes that actually exist
  const routes = ['', '/posts', '/contact'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}
