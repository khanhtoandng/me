import type { Metadata } from "next";
import "./globals.css";

import { Toaster } from "sonner";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { webImage } from "@/data/Links";
import BackgroundEffect from "@/components/ui/backgroundEffect";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: {
    template: "Baraa Alshaer - %s",
    default: "Baraa Alshaer",
  },
  description:
    "Portfolio of Baraa Alshaer, a skilled Full Stack Developer with expertise in React, Node.js, TypeScript, and more. Creating impactful web applications with a focus on user experience.",
  openGraph: {
    title: "Baraa Alshaer - Full Stack Developer",
    description:
      "Explore the portfolio of Baraa Alshaer, a passionate Full Stack Developer. Projects, blogs, and more showcasing expertise in modern web development.",
    url: "https://alshaer.vercel.app/",
    images: [
      {
        url: webImage,
        width: 400,
        height: 400,
        alt: "Baraa Alshaer - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Baraa Alshaer - Full Stack Developer",
    description:
      "Explore the portfolio of Baraa Alshaer, a passionate Full Stack Developer. Projects, blogs, and more showcasing expertise in modern web development.",
    images: webImage,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex  relative dark flex-col min-h-screen">
        <Analytics/>
        <Toaster />
        <Navbar />
        <BackgroundEffect />
        <main className="container  z-50 max-md:z-40  py-8 mx-auto flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
