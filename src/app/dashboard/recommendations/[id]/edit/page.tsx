"use client";

import { useState, useEffect } from "react";
import { RecommendationForm } from "@/components/recommendations/recommendation-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";

interface Recommendation {
  _id: string;
  name: string;
  position: string;
  company: string;
  text: string;
  relationship: string;
  avatar?: string;
  featured: boolean;
  date: string;
}

export default function EditRecommendationPage() {
  const params = useParams();
  const [recommendation, setRecommendation] = useState<Recommendation | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendation() {
      try {
        setLoading(true);
        const response = await fetch(`/api/recommendations/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setRecommendation(data.data);
        } else {
          setError(data.error || "Failed to fetch recommendation");
        }
      } catch (err) {
        console.error("Error fetching recommendation:", err);
        setError("Failed to fetch recommendation");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchRecommendation();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[var(--headline)]">
          Edit Recommendation
        </h1>
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] p-8 text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error</h3>
          <p className="text-[var(--card-paragraph)]">{error}</p>
        </Card>
      </div>
    );
  }

  if (!recommendation) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[var(--headline)]">
          Edit Recommendation
        </h1>
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] p-8 text-center">
          <h3 className="text-xl font-semibold text-[var(--card-headline)] mb-2">
            Recommendation Not Found
          </h3>
          <p className="text-[var(--card-paragraph)]">
            The recommendation you're looking for doesn't exist.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Edit Recommendation
      </h1>
      <RecommendationForm
        recommendation={{
          id: recommendation._id,
          name: recommendation.name,
          position: recommendation.position,
          company: recommendation.company,
          text: recommendation.text,
          relationship: recommendation.relationship,
          avatar: recommendation.avatar,
          featured: recommendation.featured,
          date: recommendation.date,
        }}
      />
    </div>
  );
}
