"use client";

import { useState, useEffect } from "react";
import { EducationForm } from "@/components/education/education-form";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "next/navigation";

interface Education {
  _id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export default function EditEducationPage() {
  const params = useParams();
  const [education, setEducation] = useState<Education | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEducation() {
      try {
        setLoading(true);
        const response = await fetch(`/api/education/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setEducation(data.data);
        } else {
          setError(data.error || "Failed to fetch education");
        }
      } catch (err) {
        console.error("Error fetching education:", err);
        setError("Failed to fetch education");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchEducation();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
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
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-32 w-full" />
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
          Edit Education
        </h1>
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] p-8 text-center">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Error</h3>
          <p className="text-[var(--card-paragraph)]">{error}</p>
        </Card>
      </div>
    );
  }

  if (!education) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-[var(--headline)]">
          Edit Education
        </h1>
        <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] p-8 text-center">
          <h3 className="text-xl font-semibold text-[var(--card-headline)] mb-2">
            Education Not Found
          </h3>
          <p className="text-[var(--card-paragraph)]">
            The education entry you're looking for doesn't exist.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Edit Education
      </h1>
      <EducationForm
        education={{
          id: education._id,
          degree: education.degree,
          institution: education.institution,
          location: education.location,
          startDate: education.startDate,
          endDate: education.endDate,
          current: education.current,
          description: education.description,
          achievements: education.achievements,
        }}
      />
    </div>
  );
}
