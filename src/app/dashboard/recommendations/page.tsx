import { Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { RecommendationsList } from "@/components/recommendations/recommendations-list";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function RecommendationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[var(--headline)]">
          Recommendations
        </h1>
        <Button className="bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]">
          <Link href="/dashboard/recommendations/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Recommendation
          </Link>
        </Button>
      </div>

      <div className="relative w-full md:w-96">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--paragraph)]" />
        <Input
          type="search"
          placeholder="Search recommendations..."
          className="w-full bg-[var(--input-background)] border-[var(--input-border-color)] pl-8 text-[var(--input-text)]"
        />
      </div>

      <Suspense
        fallback={
          <div className="text-center py-10">Loading recommendations...</div>
        }
      >
        <RecommendationsList />
      </Suspense>
    </div>
  );
}
