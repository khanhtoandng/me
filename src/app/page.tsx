import HeroSection from "@/components/website/HeroSection";
import RecommendationsSection from "@/components/website/RecommendationsSection";
import { TimelineDemo } from "@/components/website/TimelineDemo";
import { email, mailto } from "@/data/Links";
import { ScrollEffect } from "@/lib/animations";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TimelineDemo />
      <RecommendationsSection />
      <ScrollEffect type="fadeIn">
        <h2 className="max-md:overflow-hidden">
          If you want to get in touch, feel free to eamil me at:{" "}
          <Link className="link " href={mailto}>
            {email}
          </Link>
          .
        </h2>
      </ScrollEffect>
    </div>
  );
}
