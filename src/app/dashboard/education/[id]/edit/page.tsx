import { EducationForm } from "@/components/education/education-form";

// Force dynamic rendering - don't statically generate this page
export const dynamic = "force-dynamic";

export default function EditEducationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Edit Education
      </h1>
      <EducationForm />
    </div>
  );
}
