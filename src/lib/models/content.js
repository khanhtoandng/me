import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: [true, "Please provide a section name"],
    unique: true,
    enum: ["hero", "footer", "about"],
  },
  title: {
    type: String,
    default: "",
  },
  subtitle: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // For flexible content structure
    default: {},
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
ContentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);
