"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { alazhar } from "@/data/Links";
import { ChevronRight } from "lucide-react";

interface EducationItem {
  institution: string;
  institutionLink: string;
  logoSrc: string;
  logoAlt: string;
  period: string;
  degree: string;
}

export default function Education() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const educationData: EducationItem[] = [
    {
      institution: "Al-Azhar University",
      institutionLink: alazhar,
      logoSrc:
        "https://edurank.org/assets/img/uni-logos/al-azhar-university-gaza-logo.png", // External domain configured in next.config.js
      logoAlt: "Al-Azhar University",
      period: "2020 - 2022",
      degree:
        "Diploma in Software Development (Specialization in Software and Databases)",
    },
  ];

  return (
    <div className="flex min-h-0 flex-col gap-y-3">
      {/* Education Title */}
      <div
        style={{
          opacity: isMounted ? 1 : 0,
          filter: isMounted ? "blur(0px)" : "blur(2px)",
          transform: isMounted
            ? "translateY(-6px) translateZ(0px)"
            : "translateY(0px) translateZ(0px)",
          transition:
            "opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease",
        }}
      >
        <h2 className="text-xl font-bold text-[var(--headline)]">Education</h2>
      </div>

      {/* Education Items */}
      {educationData.map((item, index) => (
        <div
          key={index}
          style={{
            opacity: isMounted ? 1 : 0,
            filter: isMounted ? "blur(0px)" : "blur(2px)",
            transform: isMounted
              ? "translateY(-6px) translateZ(0px)"
              : "translateY(0px) translateZ(0px)",
            transition:
              "opacity 0.5s ease, filter 0.5s ease, transform 0.5s ease",
            transitionDelay: `${(index + 1) * 0.1}s`,
          }}
        >
          <Link
            className="block cursor-pointer"
            href={item.institutionLink}
            target="_blank"
          >
            <div className="rounded-[12px] bg-[var(--card-background)] text-[var(--paragraph)] flex border border-[var(--card-border-color)] p-3 hover:bg-[var(--card-hover)] transition-colors">
              <div className="flex-none">
                <span className="relative flex shrink-0 overflow-hidden rounded-full border border-[var(--card-border-color)] size-12 m-auto bg-[var(--background)]">
                  <Image
                    className="aspect-square h-full w-full object-contain"
                    alt={item.logoAlt}
                    src={item.logoSrc}
                    width={48}
                    height={48}
                  />
                </span>
              </div>
              <div className="flex-grow ml-4 items-center flex-col group py-1">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm text-[var(--headline)]">
                      {item.institution}
                      <ChevronRight className="size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 rotate-0 text-[var(--link-color)]" />
                    </h3>
                    <div className="text-xs sm:text-sm tabular-nums text-[var(--paragraph)] text-right">
                      {item.period}
                    </div>
                  </div>
                  <div className="font-sans text-xs text-[var(--paragraph)]">
                    {item.degree}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
