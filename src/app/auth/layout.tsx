import type { Metadata, Viewport } from "next";
import "../globals.css";

import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { domain, webImage, websitePath, email } from "@/data/Links";

// SEO Keywords
const keywords = [
  "Baraa Alshaer",
  "Authentication",
  "Login",
  "Sign Up",
  "Secure Login",
];

// Metadata
export const metadata: Metadata = {
  metadataBase: new URL(`https://${domain}`),
  title: "Authentication | Baraa Alshaer",
  description: "Login or sign up to access Baraa Alshaer's web platform.",
  keywords: keywords.join(", "),
  openGraph: {
    title: "Authentication | Baraa Alshaer",
    description: "Secure access to Baraa Alshaer's web services.",
    url: `${websitePath.main}/auth`,
    siteName: "Baraa Alshaer Portfolio",
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: "Baraa Alshaer - Authentication",
      },
    ],
    emails: [email],
  },
  twitter: {
    card: "summary_large_image",
    title: "Authentication | Baraa Alshaer",
    description: "Secure login to access portfolio services.",
    images: webImage,
    creator: "@balshaer",
  },
};

export const viewport: Viewport = {
  themeColor: "#16161a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex flex-col min-h-screen bg-background text-foreground">
        <SpeedInsights />
        <Analytics />
        <Toaster />
        <main className="w-full flex flex-1 items-center justify-center px-4">
          {children}
        </main>
      </body>
    </html>
  );
}
