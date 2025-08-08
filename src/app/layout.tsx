import type { Metadata, Viewport } from 'next'
import './globals.css'

import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import BackgroundEffect from '@/components/ui/backgroundEffect'
import { CustomDialogProvider } from '@/components/ui/custom-dialog'
import FloatingActionButton from '@/components/ui/FloatingActionButton'
import { domain, email, webImage, websitePath } from '@/data/Links'
import { ThemeProvider } from '@/theme/theme-provider'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  metadataBase: new URL(`https://${domain}`),
  title: {
    template: '%s | Toan Huynh - Backend Engineer',
    default: 'Toan Huynh - Backend Engineer & Portfolio',
  },
  description:
    'Explore the portfolio of Huynh Tran Khanh Toan, Backend Engineer specializing in GraphQL, TypeScript, NestJS, PostgreSQL, and AWS cloud-native applications. View projects, experience, and contact details.',
  keywords: [
    'Huynh Tran Khanh Toan',
    'Backend Engineer',
    'GraphQL Developer',
    'TypeScript Developer',
    'NestJS Developer',
    'PostgreSQL',
    'AWS Cloud',
    'Node.js Developer',
    'Software Engineer',
    'Portfolio',
    'Backend Development',
    'Cloud-Native Applications',
    'Projects',
    'Contact',
    'Resume',
    'Microservices',
    'API Development',
    'Database Design',
    'Infrastructure as Code',
    'CI/CD Pipelines',
  ].join(', '),
  authors: [{ name: 'Huynh Tran Khanh Toan', url: websitePath.main }],
  creator: 'Huynh Tran Khanh Toan',
  publisher: 'Huynh Tran Khanh Toan',
  alternates: {
    canonical: websitePath.main,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Huynh Tran Khanh Toan - Backend Engineer Portfolio',
    description:
      'Discover the work and experience of Huynh Tran Khanh Toan, a passionate Backend Engineer. Projects, skills, and contact info included.',
    url: websitePath.main,
    siteName: 'Huynh Tran Khanh Toan Portfolio',
    images: [
      {
        url: '',
        width: 400,
        height: 400,
        alt: 'Huynh Tran Khanh Toan Portfolio Preview',
      },
    ],
    countryName: 'Vietnam',
    emails: [email],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Huynh Tran Khanh Toan - Backend Engineer Portfolio',
    description:
      'Explore the portfolio of Huynh Tran Khanh Toan, Backend Engineer. Projects, experience, and contact details.',
    images: webImage,
    creator: '@khanhtoandng',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/kt-logo.png', sizes: 'any' },
      { url: '/kt-logo-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/kt-logo-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/kt-logo-192x192.png', sizes: '192x192', type: 'image/png' }],
    shortcut: '/kt-logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#16161a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="32x32" href="/kt-logo.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/kt-logo-192x192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/kt-logo-192x192.png" />
        <meta name="apple-mobile-web-app-title" content="Toan Huynh" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                var resolvedTheme = theme === 'system' || !theme ? systemTheme : theme;
                document.documentElement.classList.add(resolvedTheme);
                document.documentElement.style.colorScheme = resolvedTheme;
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Huynh Tran Khanh Toan',
              url: websitePath.main,
              image: webImage,
              sameAs: ['https://github.com/khanhtoandng', 'https://www.linkedin.com/in/toanhuynh19/'],
              jobTitle: 'Backend Engineer',
              description:
                'Backend Engineer with expertise in GraphQL, TypeScript, NestJS, PostgreSQL, and AWS cloud-native applications.',
            }),
          }}
        />
      </head>
      <body className="flex relative flex-col min-h-screen" suppressHydrationWarning>
        <div className="absolute inset-0 -z-10 h-full w-full bg-[var(--background)] bg-[linear-gradient(to_right,var(--border-background)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-background)_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
        <SpeedInsights />
        <Analytics />
        <ThemeProvider disableTransitionOnChange>
          <CustomDialogProvider />
          <Toaster />
          <Navbar />
          <BackgroundEffect />
          <main className="z-40 max-md:z-30 mx-auto w-full flex-grow">{children}</main>
          <Footer />
          <FloatingActionButton threshold={400} />
        </ThemeProvider>
      </body>
    </html>
  )
}
