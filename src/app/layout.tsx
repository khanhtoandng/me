import type { Metadata, Viewport } from "next";
import "./globals.css";

import { Toaster } from "sonner";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { domain, email, webImage, websitePath } from "@/data/Links";
import BackgroundEffect from "@/components/ui/backgroundEffect";
import FloatingActionButton from "@/components/ui/FloatingActionButton";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomDialogProvider } from "@/components/ui/custom-dialog";

// Define keywords for better SEO
const keywords = [
  "Baraa Alshaer",
  "Full Stack Developer",
  "Web Developer",
  "React Developer",
  "Node.js Developer",
  "TypeScript",
  "JavaScript",
  "Frontend Developer",
  "Backend Developer",
  "Software Engineer",
  "Portfolio",
  "Web Development",
  "UI/UX",
  "Responsive Design",
  "Web Applications",
];

// Define metadata for better SEO
export const metadata: Metadata = {
  metadataBase: new URL(`https://${domain}`),
  title: {
    template: "b19r - %s",
    default: "b19r",
  },
  description:
    "Portfolio of Baraa Alshaer, a skilled Full Stack Developer with expertise in React, Node.js, TypeScript, and more. Creating impactful web applications with a focus on user experience and modern technologies.",
  keywords: keywords.join(", "),
  authors: [{ name: "Baraa Alshaer", url: websitePath.main }],
  creator: "Baraa Alshaer",
  publisher: "Baraa Alshaer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: websitePath.main,
    languages: {
      en: `${websitePath.main}/en`,
      ar: `${websitePath.main}/ar`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "ar_SA",
    title: "b19r",
    description:
      "Explore the portfolio of Baraa Alshaer, a passionate Full Stack Developer. Projects, blogs, and more showcasing expertise in modern web development with React, Node.js, and TypeScript.",
    url: websitePath.main,
    siteName: "Baraa Alshaer Portfolio",
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: "b19r",
      },
    ],
    countryName: "Palestine",
    emails: [email],
  },
  twitter: {
    card: "summary_large_image",
    title: "b19r",
    description:
      "Explore the portfolio of Baraa Alshaer, a passionate Full Stack Developer. Projects, blogs, and more showcasing expertise in modern web development.",
    images: webImage,
    creator: "@balshaer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification tokens if you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// Define viewport settings for better mobile experience
export const viewport: Viewport = {
  themeColor: "#16161a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Add preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Script to fix hydration errors caused by browser extensions like Grammarly */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Remove attributes added by browser extensions (like Grammarly)
                // that can cause hydration errors
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach(({ target }) => {
                    if (target.nodeType === 1) {
                      const elem = target;
                      if (elem.hasAttribute('data-gr-ext-installed') ||
                          elem.hasAttribute('data-new-gr-c-s-check-loaded')) {
                        elem.removeAttribute('data-gr-ext-installed');
                        elem.removeAttribute('data-new-gr-c-s-check-loaded');
                      }
                    }
                  });
                });

                // Start observing the document
                observer.observe(document.documentElement, {
                  attributes: true,
                  subtree: true,
                  attributeFilter: ['data-gr-ext-installed', 'data-new-gr-c-s-check-loaded']
                });
              })();
            `,
          }}
        />

        {/* Add structured data for Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Baraa Alshaer",
              url: websitePath.main,
              image: webImage,
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
              description:
                "Full Stack Developer with expertise in React, Node.js, TypeScript, and more.",
            }),
          }}
        />
      </head>
      <body className="flex relative dark flex-col min-h-screen">
        <SpeedInsights />
        <Analytics />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CustomDialogProvider />
          <Toaster />
          <Navbar />
          <BackgroundEffect />
          <main className=" z-40 max-md:z-30  mx-auto w-full flex-grow">
            {children}
          </main>
          <Footer />
          <FloatingActionButton threshold={400} />
        </ThemeProvider>
      </body>
    </html>
  );
}
