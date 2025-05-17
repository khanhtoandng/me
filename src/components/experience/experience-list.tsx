"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, Calendar, MapPin, Building, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

type Experience = {
  _id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  skills: string[]
}

export function ExperienceList() {
  const { toast } = useToast()
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchExperiences() {
      try {
        setLoading(true)
        const response = await fetch("/api/experiences")
        const data = await response.json()

        if (data.success) {
          setExperiences(data.data)
        }
      } catch (error) {
        console.error("Error fetching experiences:", error)
        toast({
          title: "Error",
          description: "Failed to load experience entries. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [toast])

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this experience entry?")) {
      try {
        const response = await fetch(`/api/experiences/${id}`, {
          method: "DELETE",
        })

        const data = await response.json()

        if (data.success) {
          setExperiences(experiences.filter((exp) => exp._id !== id))
          toast({
            title: "Success",
            description: "Experience entry deleted successfully",
          })
        } else {
          throw new Error(data.error || "Failed to delete experience entry")
        }
      } catch (error) {
        console.error("Error deleting experience:", error)
        toast({
          title: "Error",
          description: "Failed to delete experience entry. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-[var(--card-background)] border-[var(--card-border-color)]">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-[var(--skeleton-color)] rounded animate-pulse" />
                  <div className="h-4 w-32 bg-[var(--skeleton-color)] rounded animate-pulse" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="h-4 w-32 bg-[var(--skeleton-color)] rounded animate-pulse" />
                  <div className="h-4 w-24 bg-[var(--skeleton-color)] rounded animate-pulse" />
                </div>
                <Separator className="bg-[var(--card-border-color)]" />
                <div className="h-16 w-full bg-[var(--skeleton-color)] rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (experiences.length === 0) {
    return (
      <Card className="bg-[var(--card-background)] border-[var(--card-border-color)] p-8 text-center">
        <h3 className="text-xl font-semibold text-[var(--card-headline)]">No experience entries found</h3>
        <p className="text-[var(--card-paragraph)] mt-2">Start by adding your first work experience</p>
        <Button asChild className="mt-4 bg-[var(--button)] text-[var(--button-text)] hover:bg-[var(--button2)]">
          <Link href="/dashboard/experience/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Link>
        </Button>
      </Card>
    )
  }

  return (
    <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
      {experiences.map((experience) => (
        <motion.div key={experience._id} variants={itemVariants}>
          <Card className="bg-[var(--card-background)] border-[var(--card-border-color)]">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl text-[var(--card-headline)]">{experience.title}</CardTitle>
                  <div className="flex items-center gap-1 text-[var(--card-paragraph)]">
                    <Building className="h-3.5 w-3.5" />
                    {experience.company}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--paragraph)]" asChild>
                    <Link href={`/dashboard/experience/${experience._id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[var(--paragraph)]"
                    onClick={() => handleDelete(experience._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--card-paragraph)]">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {formatDate(experience.startDate)} -{" "}
                      {experience.current ? "Present" : formatDate(experience.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{experience.location}</span>
                  </div>
                  {experience.current && (
                    <Badge className="bg-[var(--tertiary)] text-[var(--button-text)]">Current</Badge>
                  )}
                </div>
                <Separator className="bg-[var(--card-border-color)]" />
                <p className="text-sm text-[var(--card-paragraph)]">{experience.description}</p>
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="border-[var(--button-border)] text-[var(--outline-button-text)]"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
