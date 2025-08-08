'use client'

import { useEffect, useState } from 'react'

export interface SocialLink {
  _id: string
  platform: string
  url: string
  icon: string
  iconLibrary: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

interface UseSocialLinksReturn {
  socialLinks: SocialLink[]
  loading: boolean
  error: string | null
  refetch: () => Promise<void>
}

const mockSocialLinks: SocialLink[] = [
  {
    _id: '1',
    platform: 'GitHub',
    url: 'https://github.com/khanhtoandng',
    icon: 'github',
    iconLibrary: 'fontawesome',
    isActive: true,
    order: 1,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    _id: '2',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/toanhuynh19/',
    icon: 'linkedin',
    iconLibrary: 'fontawesome',
    isActive: true,
    order: 2,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
  {
    _id: '3',
    platform: 'Email Me',
    url: 'khanhtoan.dng@gmail.com',
    icon: 'email',
    iconLibrary: 'fontawesome',
    isActive: true,
    order: 4,
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-01-01T00:00:00.000Z',
  },
]

export function useSocialLinks(activeOnly: boolean = true): UseSocialLinksReturn {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSocialLinks = async () => {
    try {
      setLoading(true)
      setError(null)

      const links = activeOnly ? mockSocialLinks.filter((link) => link.isActive) : mockSocialLinks

      await new Promise((resolve) => setTimeout(resolve, 300))

      setSocialLinks(links)
    } catch {
      setError('Failed to load social links')
      setSocialLinks([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSocialLinks()
  }, [activeOnly])

  return {
    socialLinks,
    loading,
    error,
    refetch: fetchSocialLinks,
  }
}
