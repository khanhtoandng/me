"use client";

import { scrollToTop } from "@/lib/helper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Heart,
  Code,
  Coffee,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
  Globe,
  Calendar,
  Clock,
  Star,
} from "lucide-react";
import { useContent } from "@/hooks/use-content";
import { SocialLinksDisplay } from "@/components/common/SocialLinksDisplay";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Logo from "./Logo";
import { SiRender } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";

interface FooterLink {
  title: string;
  link: string;
  icon?: React.ReactNode;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const path = usePathname();
  const { content: footerContent } = useContent("footer");

  // Default content fallback
  const defaultFooterContent = {
    title: "Baraa Alshaer",
    description:
      "Full-Stack Developer specializing in creating seamless and efficient web applications.",
    content: {
      copyright: "All rights reserved.",
    },
  };

  // Use dynamic content or fallback to default
  const displayContent = footerContent || defaultFooterContent;

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
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Enhanced footer sections
  const footerSections: FooterSection[] = [
    {
      title: "Navigation",
      links: [
        { title: "Home", link: "/" },
        { title: "About", link: "/#about" },
        { title: "Work", link: "/#work" },
        { title: "Projects", link: "/projects" },
        { title: "Contact", link: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { title: "Web Development", link: "/services/web-development" },
        { title: "Mobile Apps", link: "/services/mobile-apps" },
        { title: "UI/UX Design", link: "/services/ui-ux-design" },
        { title: "Consulting", link: "/services/consulting" },
        { title: "Code Review", link: "/services/code-review" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Blog", link: "/blog" },
        { title: "Portfolio", link: "/portfolio" },
        { title: "Resume", link: "/resume.pdf", external: true },
        {
          title: "GitHub",
          link: "https://github.com/balshaer",
          external: true,
        },
        {
          title: "LinkedIn",
          link: "https://linkedin.com/in/balshaer",
          external: true,
        },
      ],
    },
  ];

  // Contact information
  const contactInfo = [
    {
      icon: <Mail className="h-4 w-4" />,
      label: "Email",
      value: "alshaercontact@gmail.com",
      link: "mailto:alshaercontact@gmail.com",
    },
    {
      icon: <Phone className="h-4 w-4" />,
      label: "Phone",
      value: "+970 59 123 4567",
      link: "tel:+970591234567",
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Location",
      value: "Palestine",
      link: "https://maps.google.com/?q=Palestine",
    },
  ];

  // Quick stats
  const quickStats = [
    {
      label: "Projects Completed",
      value: "50+",
      icon: <Code className="h-4 w-4" />,
    },
    {
      label: "Years Experience",
      value: "5+",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      label: "Happy Clients",
      value: "30+",
      icon: <Star className="h-4 w-4" />,
    },
    {
      label: "Coffee Consumed",
      value: "∞",
      icon: <Coffee className="h-4 w-4" />,
    },
  ];

  const ispath =
    path.startsWith("/auth") ||
    path.startsWith("/dashboard") ||
    path.startsWith("/admin");

  return (
    <div>
      {!ispath && (
        <footer className="w-full mt-16 z-40 bg-gradient-to-br from-[var(--card-background)] via-[var(--card-background)] to-[var(--background)] border-t border-[var(--footer-border-color)]">
          <div className="container mx-auto px-4 py-12">
            {/* Main Footer Content */}
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {/* Brand & Contact Section */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-2 space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Logo />
                    <h3 className="text-2xl font-bold text-[var(--headline)]">
                      {displayContent.title}
                    </h3>
                  </div>
                  <p className="text-[var(--paragraph)] max-w-md leading-relaxed">
                    {displayContent.description}
                  </p>
                </div>

                {/* Contact Information */}

                {/* Social Links */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-[var(--headline)] uppercase tracking-wider">
                    Follow Me
                  </h4>
                  <SocialLinksDisplay variant="footer" className="flex gap-2" />
                </div>
              </motion.div>

              {/* Navigation Sections */}
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={sectionIndex}
                  variants={itemVariants}
                  className="space-y-4"
                >
                  <h4 className="text-sm font-semibold text-[var(--headline)] uppercase tracking-wider">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.link}
                          target={link.external ? "_blank" : undefined}
                          rel={
                            link.external ? "noopener noreferrer" : undefined
                          }
                          className="text-sm text-[var(--paragraph)] hover:text-[var(--link-color)] transition-colors flex items-center gap-2 group"
                          onClick={() => {
                            if (link.link.startsWith("/#")) {
                              const sectionId = link.link.substring(2);
                              const section =
                                document.getElementById(sectionId);
                              if (section) {
                                section.scrollIntoView({
                                  behavior: "smooth",
                                });
                              }
                            }
                          }}
                        >
                          <span className="group-hover:translate-x-1 transition-transform">
                            {link.title}
                          </span>
                          {link.external && (
                            <ExternalLink className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom Section */}
            <motion.div
              variants={itemVariants}
              className="border-t border-[var(--footer-border-color)] pt-8"
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* Copyright & Credits */}
                <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-[var(--paragraph)]">
                  <div className="flex items-center gap-2">
                    <span>
                      &copy; {currentYear} {displayContent.title}.{" "}
                      {displayContent.content.copyright}
                    </span>
                  </div>
                  <Separator
                    orientation="vertical"
                    className="hidden md:block h-4"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open("/resume.pdf", "_blank")}
                    className="text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Resume
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={scrollToTop}
                    className="text-xs group"
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
                    <Separator
                      orientation="vertical"
                      className="hidden md:block h-3"
                    />
                    <span className="flex items-center justify-center gap-1 text-[var(--paragraph)] hover:text-[var(--headline)] hoverd">
                      <span>Deployed on Render </span>
                      <SiRender className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Link
                      href="/privacy"
                      className="hover:text-[var(--link-color)] transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Separator orientation="vertical" className="h-3" />
                    <Link
                      href="/terms"
                      className="hover:text-[var(--link-color)] transition-colors"
                    >
                      Baraa Alshaer
                    </Link>
                    <Separator orientation="vertical" className="h-3" />
                    <Link
                      href="/sitemap.xml"
                      className="hover:text-[var(--link-color)] transition-colors"
                    >
                      Sitemap
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
  );
}
