"use client";

import React, { useState } from "react";
import { github, linkedin, whatsapp, youtube } from "@/data/Links";
import { ExternalLink, MessageCircleIcon } from "lucide-react";
import Link from "next/link";

export interface SocialMediaLink {
  title: string;
  link: string;
  icon: any;
}

const LinksSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleLinkHover = (index: number | null) => {
    setHoveredIndex(index);
  };

  const styles = {
    socialLink:
      "flex contact-title capitalize text-[1rem] items-center hoverd gap-2 max-md:flex max-md:flex-row h-[100%] w-full transition-all duration-300",
    socialLinkHover:
      "flex contact-title capitalize text-[1rem] items-center hoverd gap-2 max-md:flex max-md:flex-row h-[100%] w-full opacity-40 transition-all duration-300",
    icon: "h-5 w-5 text-[var(--link-color)]",
  };

  const socialMediaLinks: SocialMediaLink[] = [
    {
      title: "Linkedin",
      link: linkedin,
      icon: (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
        </svg>
      ),
    },
    {
      title: "Github",
      link: github,
      icon: (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      ),
    },
    {
      title: "Whatsapp",
      link: whatsapp,
      icon: <MessageCircleIcon className={styles.icon} />,
    },
    {
      title: "Youtube",
      link: youtube,
      icon: (
        <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium text-[var(--headline)] mb-4">
        Connect with me
      </h3>
      <ul
        className={
          "flex items-start gap-6 py-[8px] text-[1rem] text-[var(--paragraph)] max-md:w-full max-md:flex-col"
        }
      >
        {socialMediaLinks.map((item, index) => (
          <li
            className={
              "rounded-lg max-md:w-full max-md:bg-[var(--card-background)] max-md:px-[8px] max-md:py-[14px]"
            }
            key={index}
          >
            <Link
              className={` ${
                hoveredIndex !== null && index !== hoveredIndex
                  ? styles.socialLinkHover
                  : styles.socialLink
              }`}
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              onMouseEnter={() => handleLinkHover(index)}
              onMouseLeave={() => handleLinkHover(null)}
            >
              <span className="hidden h-full items-center justify-center max-md:flex">
                <ExternalLink />
              </span>
              <span className="flex h-full items-center justify-center gap-2 text-[var(--headline)] opacity-80 hover:opacity-100">
                <span className="max-md:hidden">{item.icon}</span>
                <span className="animated-underline">{item.title}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinksSection;
