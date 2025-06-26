import mongoose from "mongoose";

const EducationSchema = new mongoose.Schema({
  degree: {
    type: String,
    required: [true, "Please provide a degree title."],
    maxlength: [100, "Degree cannot be more than 100 characters"],
  },
  institution: {
    type: String,
    required: [true, "Please provide an institution name."],
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
  },
  achievements: {
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

export default mongoose.models.Education ||
  mongoose.model("Education", EducationSchema);
