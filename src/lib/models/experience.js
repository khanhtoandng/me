import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a job title."],
    maxlength: [60, "Title cannot be more than 60 characters"],
  },
  company: {
    type: String,
    required: [true, "Please provide a company name."],
  },
  companyUrl: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    required: [true, "Please provide a location."],
  },
  startDate: {
    type: Date,
    required: [true, "Please provide a start date."],
  },
  endDate: {
    type: Date,
  },
  current: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: [true, "Please provide a job description."],
  },
  skills: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Experience ||
  mongoose.model("Experience", ExperienceSchema);
