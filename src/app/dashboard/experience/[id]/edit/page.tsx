import { ExperienceForm } from "@/components/experience/experience-form";
import dbConnect from "@/lib/mongodb";
import Experience from "@/lib/models/experience";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await dbConnect();
  const { id } = await params;
  const experience = await Experience.findById(id).lean();

  // Convert MongoDB document to plain object and handle _id
  const experienceData = JSON.parse(JSON.stringify(experience));
  experienceData.id = experienceData._id;
  delete experienceData._id;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Edit Experience
      </h1>
      <ExperienceForm experience={experienceData} />
    </div>
  );
}
