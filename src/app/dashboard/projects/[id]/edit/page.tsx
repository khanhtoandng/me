import { ProjectForm } from "@/components/projects/project-form"
import dbConnect from "@/lib/mongodb"
import Project from "@/lib/models/project"

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  await dbConnect()
  const project = await Project.findById(params.id).lean()

  // Convert MongoDB document to plain object and handle _id
  const projectData = JSON.parse(JSON.stringify(project))
  projectData.id = projectData._id
  delete projectData._id

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">Edit Project</h1>
      <ProjectForm project={projectData} />
    </div>
  )
}
