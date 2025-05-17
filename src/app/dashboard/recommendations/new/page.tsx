import { RecommendationForm } from "@/components/recommendations/recommendation-form"

export default function NewRecommendationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">Add New Recommendation</h1>
      <RecommendationForm />
    </div>
  )
}
