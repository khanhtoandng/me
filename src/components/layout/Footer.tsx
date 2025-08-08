'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { scrollToTop } from '@/lib/helper'
import { motion } from 'framer-motion'
import { ArrowUp, Calendar, Code, Coffee, Mail, MapPin, Phone, Star } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaSitemap } from 'react-icons/fa'
import { RiNextjsFill } from 'react-icons/ri'
import { SiVercel } from 'react-icons/si'

interface FooterLink {
  title: string
  link: string
  icon?: React.ReactNode
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

export default function Footer() {
  const currentYear = 2025 // Static year to prevent hydration issues
  const path = usePathname()

  // Default content fallback
  const defaultFooterContent = {
    title: 'Toan Huynh',
    description: 'Backend Engineer specializing in creating seamless and efficient web applications.',
    content: {
      copyright: 'All rights reserved.',
    },
  }

  // Use dynamic content or fallback to default
  const displayContent = defaultFooterContent

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  // Enhanced footer sections
  const footerSections: FooterSection[] = [
    {
      title: 'Navigation',
      links: [
        { title: 'Home', link: '/' },
        { title: 'About', link: '/#about' },
        { title: 'Work', link: '/#work' },
        { title: 'Projects', link: '/projects' },
        { title: 'Contact', link: '/contact' },
      ],
    },

    {
      title: 'Resources',
      links: [
        { title: 'Blog', link: '/posts' },

        {
          title: 'GitHub',
          link: 'https://github.com/khanhtoandng',
          external: true,
        },
        {
          title: 'LinkedIn',
          link: 'https://linkedin.com/in/toanhuynh19',
          external: true,
        },
      ],
    },
  ]

  // Contact information
  const contactInfo = [
    {
      icon: <Mail className="h-4 w-4" />,
      label: 'Email',
      value: 'khanhtoan.dng@gmail.com',
      link: 'mailto:khanhtoan.dng@gmail.com',
    },
    {
      icon: <Phone className="h-4 w-4" />,
      label: 'Phone',
      value: '',
      link: '',
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: 'Location',
      value: '',
      link: '',
    },
  ]

  // Quick stats
  const quickStats = [
    {
      label: 'Projects Completed',
      value: '50+',
      icon: <Code className="h-4 w-4" />,
    },
    {
      label: 'Years Experience',
      value: '5+',
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: 'Happy Clients',
      value: '30+',
      icon: <Star className="h-4 w-4" />,
    },
    {
      label: 'Coffee Consumed',
      value: '∞',
      icon: <Coffee className="h-4 w-4" />,
    },
  ]

  const ispath = path.startsWith('/auth') || path.startsWith('/dashboard') || path.startsWith('/admin')

  return (
    <div>
      {!ispath && (
        <footer className="w-full mt-16 z-40 bg-gradient-to-br from-[var(--card-background)] via-[var(--card-background)] to-[var(--background)] border-t border-[var(--footer-border-color)]">
          <div className="container mx-auto px-4 py-12">
            {/* Main Footer Content */}

            {/* Bottom Section */}
            <motion.div variants={itemVariants} className=" border-[var(--footer-border-color)] ">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Copyright & Credits */}
                <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-[var(--paragraph)]">
                  <div className="flex items-center gap-2">
                    <span>{displayContent.content.copyright}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={scrollToTop}
                    className="text-xs group max-md:hidden"
                    aria-label="Back to top"
                  >
                    <span>Back to top</span>
                    <ArrowUp className="h-3 w-3 ml-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Additional Footer Info */}
              <div className="mt-6 pt-6 border-t border-[var(--footer-border-color)]/50">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--paragraph)]/70">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center gap-1 text-[var(--paragraph)] hover:text-[var(--headline)] hoverd">
                      <span>Built with Next.js </span>

                      <RiNextjsFill className="h-4 w-4" />
                    </span>
                    <Separator orientation="vertical" className="hidden md:block h-3" />
                    <span className="flex items-center justify-center gap-1 text-[var(--paragraph)] hover:text-[var(--headline)] hoverd">
                      <span>Deployed on Vercel </span>
                      <SiVercel className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex items-center max-md:hidden gap-4">
                    <Link
                      href="/sitemap.xml"
                      className="hover:text-[var(--link-color)] transition-colors flex justify-center items-center gap-1"
                    >
                      <FaSitemap />

                      <span>Sitemap</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-500/5 to-blue-500/5 rounded-full blur-3xl" />
          </div>
        </footer>
      )}
    </div>
  )
}
