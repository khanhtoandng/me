import { ProjectForm } from "@/components/projects/project-form";

// Force dynamic rendering - don't statically generate this page
export const dynamic = "force-dynamic";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">
        Edit Project
      </h1>
      <ProjectForm />
    </div>
  );
}
