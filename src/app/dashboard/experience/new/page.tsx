import { ExperienceForm } from "@/components/experience/experience-form";

export default function NewExperiencePage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Add New Experience
      </h1>
      <ExperienceForm />
    </div>
  );
}
