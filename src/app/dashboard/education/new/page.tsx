import { EducationForm } from "@/components/education/education-form";

export default function NewEducationPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Add New Education
      </h1>
      <EducationForm />
    </div>
  );
}
