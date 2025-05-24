import { RecommendationForm } from "@/components/recommendations/recommendation-form";
import dbConnect from "@/lib/mongodb";
import Recommendation from "@/lib/models/recommendation";

export default async function EditRecommendationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await dbConnect();
  const { id } = await params;
  const recommendation = await Recommendation.findById(id).lean();

  // Convert MongoDB document to plain object and handle _id
  const recommendationData = JSON.parse(JSON.stringify(recommendation));
  recommendationData.id = recommendationData._id;
  delete recommendationData._id;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Edit Recommendation
      </h1>
      <RecommendationForm recommendation={recommendationData} />
    </div>
  );
}
