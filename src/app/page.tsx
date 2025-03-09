import { Card, CardDescription } from "@/components/ui/card";
import { MagicCard } from "@/components/ui/MagicCard";
import HeroSection from "@/components/website/HeroSection";
import RecommendationsSection from "@/components/website/RecommendationsSection";
import { TimelineDemo } from "@/components/website/TimelineDemo";
import { email, mailto } from "@/data/Links";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TimelineDemo />
      <RecommendationsSection />

      <div className="text-[var(--headline)]">
        If you want to get in touch, feel free to eamil me at:{" "}
        <Link className="link" href={mailto}>
          {email}
        </Link>
        .
      </div>
    </div>
  );
}
