"use client";

import { useEffect, useRef } from "react";
import LinksSection from "./LinksSection";
import { annotate } from "rough-notation";
import { alazhar } from "@/data/Links";
import Link from "next/link";

export default function HeroSection() {
  const highlightedWordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (highlightedWordRef.current) {
      const annotation = annotate(highlightedWordRef.current, {
        type: "underline",
        color: "blue",
        padding: 0,
        strokeWidth: 1,
      });
      annotation.show();
    }
  }, []);

  return (
    <div>
      <div className="header max-md:pt-[50px]">
        <div className="header-content">
          <h1 className="header-title">Baraa Alshaer</h1>
          <h1 className="subtitle capitalize">
            software engineer | Full-Stack Developer
          </h1>
          <p className="description">
            I am a <span ref={highlightedWordRef}>Full-Stack Developer</span> from Palestine, specializing in crafting
            seamless and efficient web applications across both front-end and
            back-end technologies. I hold a degree in software engineering from{" "}
            <Link target="_blank" href={alazhar} className="link">
              Al-Azhar University
            </Link>, where I developed a strong foundation in modern software 
            development principles, problem-solving, and system architecture.
          </p>
          <p className="description">
            I approach each project with a focus on delivering high-quality
            solutions, combining my skills in frontend development, backend
            systems, and overall project design. My aim is to create
            user-centric applications that not only meet client needs but also
            drive innovation.
          </p>
          <p className="description">
            I am dedicated to staying current with industry trends and
            continuously improving my craft. My work reflects a commitment to
            excellence and a drive to contribute meaningfully to the tech
            community.
          </p>
        </div>
        <LinksSection />
      </div>
    </div>
  );
}
