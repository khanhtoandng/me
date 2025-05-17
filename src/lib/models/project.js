import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for this project."],
    maxlength: [60, "Title cannot be more than 60 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description for this project."],
  },
  projectType: {
    type: String,
    enum: ["AI", "Full-stack", "Frontend", "Backend", "Mobile", "Cybersecurity", "Other"],
    required: [true, "Please specify the project type."],
  },
  images: {
    type: [String],
    default: [],
  },
  videoUrl: {
    type: String,
    default: "",
  },
  githubUrl: {
    type: String,
    default: "",
  },
  websiteUrl: {
    type: String,
    default: "",
  },
  technologies: {
    type: [String],
    default: [],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["Draft", "Published", "Archived"],
    default: "Draft",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
