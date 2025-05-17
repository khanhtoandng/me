import { EducationForm } from "@/components/education/education-form"
import dbConnect from "@/lib/mongodb"
import Education from "@/lib/models/education"

export default async function EditEducationPage({ params }: { params: { id: string } }) {
  await dbConnect()
  const education = await Education.findById(params.id).lean()

  // Convert MongoDB document to plain object and handle _id
  const educationData = JSON.parse(JSON.stringify(education))
  educationData.id = educationData._id
  delete educationData._id

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[var(--headline)]">Edit Education</h1>
      <EducationForm education={educationData} />
    </div>
  )
}
