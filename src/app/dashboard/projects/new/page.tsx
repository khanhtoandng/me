import { ProjectForm } from "@/components/projects/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">Add New Project</h1>
      <ProjectForm />
    </div>
  )
}
