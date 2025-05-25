import { RecommendationForm } from "@/components/recommendations/recommendation-form";

// Force dynamic rendering - don't statically generate this page
export const dynamic = "force-dynamic";

export default function EditRecommendationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Edit Recommendation
      </h1>
      <RecommendationForm />
    </div>
  );
}
