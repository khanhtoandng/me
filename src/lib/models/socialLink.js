import mongoose from "mongoose";

const SocialLinkSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: [true, "Please provide a platform name"],
    maxlength: [50, "Platform name cannot be more than 50 characters"],
  },
  url: {
    type: String,
    required: [true, "Please provide a URL"],
    match: [
      /^https?:\/\/.+/,
      "Please provide a valid URL starting with http:// or https://",
    ],
  },
  icon: {
    type: String,
    required: [true, "Please provide an icon name"],
    default: "FaLink",
  },
  iconLibrary: {
    type: String,
    enum: [
      "fa",
      "ai",
      "bi",
      "bs",
      "cg",
      "ci",
      "di",
      "fc",
      "fi",
      "gi",
      "go",
      "gr",
      "hi",
      "hi2",
      "im",
      "io",
      "io5",
      "lia",
      "lu",
      "md",
      "pi",
      "ri",
      "rx",
      "si",
      "sl",
      "tb",
      "tfi",
      "ti",
      "vsc",
      "wi",
    ],
    default: "fa",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  order: {
    type: Number,
    default: 0,
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
SocialLinkSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Add indexes for better query performance
SocialLinkSchema.index({ isActive: 1, order: 1 });
SocialLinkSchema.index({ platform: 1 });

export default mongoose.models.SocialLink ||
  mongoose.model("SocialLink", SocialLinkSchema);
