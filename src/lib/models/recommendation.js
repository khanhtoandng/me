import mongoose from "mongoose";

const RecommendationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  position: {
    type: String,
    required: [true, "Please provide a position."],
  },
  company: {
    type: String,
    required: [true, "Please provide a company."],
  },
  text: {
    type: String,
    required: [true, "Please provide recommendation text."],
  },
  relationship: {
    type: String,
    enum: ["Client", "Colleague", "Manager", "Other"],
    required: [true, "Please specify the relationship."],
  },
  avatar: {
    type: String,
    default: "",
  },
  featured: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
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

export default mongoose.models.Recommendation ||
  mongoose.model("Recommendation", RecommendationSchema);
