"use client";

import { useEffect, useRef, memo } from "react";
import { annotate } from "rough-notation";
// University link constant
const ALAZHAR_URL = "https://www.alazhar.edu.ps";
import Link from "next/link";
import { useContent } from "@/hooks/use-content";
import { useSocialLinks } from "@/hooks/use-social-links";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";
import * as IoIcons from "react-icons/io5";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as SiIcons from "react-icons/si";
import * as TiIcons from "react-icons/ti";

const iconLibraries = {
  fa: FaIcons,
  ai: AiIcons,
  bi: BiIcons,
  bs: BsIcons,
  fi: FiIcons,
  hi: HiIcons,
  io: IoIcons,
  md: MdIcons,
  ri: RiIcons,
  si: SiIcons,
  ti: TiIcons,
};

function HeroSection() {
  const highlightedWordRef = useRef<HTMLSpanElement>(null);
  const { content: heroContent, loading } = useContent("hero");
  const { socialLinks, loading: socialLoading } = useSocialLinks(true);

  // Get icon component
  const getIconComponent = (iconName: string, library: string) => {
    const iconLib = iconLibraries[library as keyof typeof iconLibraries];
    if (!iconLib) return null;

    const IconComponent = iconLib[iconName as keyof typeof iconLib];
    if (!IconComponent) return null;

    // Type assertion for React component
    const Icon = IconComponent as React.ComponentType<{ className?: string }>;
    return <Icon className="h-4 w-4" />;
  };

  // Default content fallback
  const defaultContent = {
    title: "Baraa Alshaer",
    subtitle: "software engineer | Full-Stack Developer",
    content: {
      paragraphs: [
        "I am a Full-Stack Developer from Palestine, specializing in crafting seamless and efficient web applications across both front-end and back-end technologies. I hold a degree in software engineering from Al-Azhar University, where I developed a strong foundation in modern software development principles, problem-solving, and system architecture.",
        "I approach each project with a focus on delivering high-quality solutions, combining my skills in frontend development, backend systems, and overall project design. My aim is to create user-centric applications that not only meet client needs but also drive innovation.",
        "I am dedicated to staying current with industry trends and continuously improving my craft. My work reflects a commitment to excellence and a drive to contribute meaningfully to the tech community.",
      ],
    },
  };

  // Use dynamic content or fallback to default
  const displayContent = heroContent || defaultContent;

  useEffect(() => {
    // Only run the annotation once when the component mounts
    let annotation: any;

    if (highlightedWordRef.current) {
      annotation = annotate(highlightedWordRef.current, {
        type: "underline",
        color: "#7f5af0",
        padding: 0,
        strokeWidth: 1,
      });

      // Show the annotation with a slight delay for better performance
      const timer = setTimeout(() => {
        annotation.show();
      }, 100);

      // Clean up
      return () => {
        clearTimeout(timer);
        if (annotation) annotation.remove();
      };
    }
  }, []);

  return (
    <div className="header max-md:pt-[50px]">
      <div className="header-content">
        <h1 className="header-title">{displayContent.title}</h1>
        <h1 className="subtitle capitalize">{displayContent.subtitle}</h1>
        {loading ? (
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          displayContent.content.paragraphs?.map(
            (paragraph: string, index: number) => {
              if (index === 0) {
                // First paragraph with highlighted text and university link
                const parts = paragraph.split("Al-Azhar University");
                return (
                  <p key={index} className="description">
                    {parts[0].includes("Full-Stack Developer") ? (
                      <>
                        {parts[0].split("Full-Stack Developer")[0]}
                        <span ref={highlightedWordRef}>
                          Full-Stack Developer
                        </span>
                        {parts[0].split("Full-Stack Developer")[1]}
                      </>
                    ) : (
                      parts[0]
                    )}
                    <Link target="_blank" href={ALAZHAR_URL} className="link">
                      Al-Azhar University
                    </Link>
                    {parts[1]}
                  </p>
                );
              }
              return (
                <p key={index} className="description">
                  {paragraph}
                </p>
              );
            }
          )
        )}
      </div>

      {/* Dynamic Social Links */}
      {socialLoading ? (
        <div className="flex items-start gap-4 py-[8px] max-md:w-full max-md:flex-col">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-[40px] w-[120px] bg-gray-200 rounded-lg animate-pulse max-md:w-full"
            />
          ))}
        </div>
      ) : socialLinks.length > 0 ? (
        <ul className="hovered section flex items-start gap-4 py-[8px] text-[1rem] text-[var(--paragraph)] max-md:w-full max-md:flex-col">
          {socialLinks.map((social) => (
            <li
              key={social._id}
              className="rounded-lg underline max-md:w-full max-md:bg-[var(--card-background)] max-md:px-[8px] max-md:py-[14px]"
            >
              <a
                className="flex contact-title capitalize text-[1rem] items-center hoverd gap-2 max-md:flex max-md:flex-row h-[100%] w-full"
                target="_blank"
                rel="noopener noreferrer"
                href={social.url}
              >
                <span className="hidden h-full items-center justify-center max-md:flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-external-link"
                  >
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </span>
                <span className="flex h-full items-center justify-center gap-1 text-[var(--headline)] opacity-80">
                  <span className="max-md:hidden">
                    {getIconComponent(social.icon, social.iconLibrary)}
                  </span>
                  <span>{social.platform}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

// Memoize the component to prevent unnecessary re-renders
export default memo(HeroSection);
