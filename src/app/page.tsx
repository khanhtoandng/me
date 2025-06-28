"use client";

import PageSeo from "@/components/seo/PageSeo";
import ClickSpark from "@/components/ui/ClickSpark";
import ShinyText from "@/components/ui/ShinyText";
import Education from "@/components/website/Education";
import { ExperienceTimeline } from "@/components/website/ExperienceTimeline";
import HeroSection from "@/components/website/HeroSection";
import RecommendationsSection from "@/components/website/RecommendationsSection";
import { mailto, webImage } from "@/data/Links";
import { ScrollEffect } from "@/lib/animations";
import Link from "next/link";

// Note: Metadata is handled by PageSeo component since this is now a client component

export default function HomePage() {
  return (
    <div className="container mx-auto">
      {/* Add structured data for the home page */}
      <PageSeo
        title="Baraa Alshaer - Full Stack Developer"
        description="Portfolio of Baraa Alshaer, a skilled Full Stack Developer with expertise in React, Node.js, TypeScript, and modern web technologies."
        image={webImage}
        type="Person"
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Education Section with SectionDivider */}
      <div className="py-4">
        <Education />
      </div>

      {/* Work Experience Section */}
      <div className="py-4">
        <ExperienceTimeline />
      </div>

      {/* Recommendations Section */}
      <div className="py-4">
        <RecommendationsSection />
      </div>

      {/* Contact CTA Section */}

      <ClickSpark
        sparkColor="var(--headline)"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <ScrollEffect type="fadeIn">
          <div className="mt-16 mb-12 text-center w-full mx-auto">
            <div className="p-8 rounded-2xl bg-[var(--card-background)] border border-[var(--card-border-color)] shadow-lg">
              <ShinyText
                text="Let's Work Together"
                disabled={false}
                speed={3}
                className="text-2xl md:text-3xl font-bold mb-4 "
              />
              <p className="text-[var(--paragraph)] mb-6 max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>
              <Link
                href={mailto}
                className="inline-flex  items-center gap-2 px-6 py-3 rounded-full bg-[var(--link-color)] text-[var(--headline)] hover:bg-opacity-90 transition-all hover:translate-y-[-2px]"
              >
                Get in Touch
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </ScrollEffect>
      </ClickSpark>
    </div>
  );
}
