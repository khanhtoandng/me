import mongoose from "mongoose";

const ProjectTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project type name is required"],
    unique: true,
    trim: true,
    maxlength: [50, "Project type name cannot be more than 50 characters"],
  },
  description: {
    type: String,
    maxlength: [200, "Description cannot be more than 200 characters"],
  },
  icon: {
    library: {
      type: String,
      required: true,
      enum: ["fa", "ai", "bi", "bs", "fi", "hi", "io", "md", "ri", "si", "ti"],
    },
    name: {
      type: String,
      required: true,
    },
  },
  color: {
    type: String,
    default: "#3B82F6", // Default blue color
    match: [
      /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
      "Please provide a valid hex color",
    ],
  },
  isActive: {
    type: Boolean,
    default: true,
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

// Update the updatedAt field before saving
ProjectTypeSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better performance
ProjectTypeSchema.index({ name: 1 });
ProjectTypeSchema.index({ isActive: 1 });

export default mongoose.models.ProjectType ||
  mongoose.model("ProjectType", ProjectTypeSchema);
