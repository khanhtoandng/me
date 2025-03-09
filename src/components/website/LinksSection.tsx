"use client";

import React, { useState } from "react";
import { github, linkedin, whatsapp, youtube } from "@/data/Links";
import {
  ExternalLink,
  Github,
  Linkedin,
  MessageCircleIcon,
  Youtube,
} from "lucide-react";

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
      "flex contact-title capitalize text-[1rem] items-center  hoverd gap-2  max-md:flex max-md:flex-row h-[100%] w-full",
    socialLinkHover:
      "flex contact-title capitalize text-[1rem] items-center  hoverd gap-2  max-md:flex max-md:flex-row h-[100%] w-full opacity-40",
    icon: "h-4 w-4",
  };

  const socialMediaLinks: SocialMediaLink[] = [
    {
      title: "Linkedin",
      link: linkedin,
      icon: <Linkedin className={styles.icon} />,
    },
    {
      title: "Github",
      link: github,
      icon: <Github className={styles.icon} />,
    },
    {
      title: "Whatsapp",
      link: whatsapp,
      icon: <MessageCircleIcon className={styles.icon} />,
    },
    {
      title: "Youtube",
      link: youtube,
      icon: <Youtube className={styles.icon} />,
    },
  ];

  return (
    <ul
      className={
        "hovered  section flex items-start gap-4 py-[8px] text-[1rem] text-[var(--paragraph)] max-md:w-full max-md:flex-col"
      }
    >
      {socialMediaLinks.map((item, index) => (
        <li
          className={
            "rounded-lg underline  max-md:w-full max-md:bg-[var(--card-background)] max-md:px-[8px] max-md:py-[14px]"
          }
          key={index}
        >
          <a
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
            <span className="flex h-full items-center justify-center gap-1 text-[var(--headline)] opacity-80">
              <span className="max-md:hidden">{item.icon}</span>
              <span>{item.title}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default LinksSection;
