const mongoose = require("mongoose");

// MongoDB connection
const MONGODB_URI = "mongodb://localhost:27017/alshaer";

// Social Link Schema
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

const SocialLink =
  mongoose.models.SocialLink || mongoose.model("SocialLink", SocialLinkSchema);

async function initSocialLinks() {
  try {
    console.log("🚀 Initializing social links...");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing social links
    await SocialLink.deleteMany({});
    console.log("🧹 Cleared existing social links");

    // Create realistic social links
    const socialLinks = [
      {
        platform: "GitHub",
        url: "https://github.com/balshaer",
        icon: "FaGithub",
        iconLibrary: "fa",
        order: 1,
        isActive: true,
      },
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/balshaer/",
        icon: "FaLinkedin",
        iconLibrary: "fa",
        order: 2,
        isActive: true,
      },
      {
        platform: "YouTube",
        url: "https://www.youtube.com/@Codewithbaraa",
        icon: "FaYoutube",
        iconLibrary: "fa",
        order: 3,
        isActive: true,
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/balshaer",
        icon: "FaTwitter",
        iconLibrary: "fa",
        order: 4,
        isActive: true,
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/balshaer",
        icon: "FaInstagram",
        iconLibrary: "fa",
        order: 5,
        isActive: true,
      },
      {
        platform: "Email",
        url: "https://mail.google.com/mail/?view=cm&fs=1&to=alshaer.contact@gmail.com",
        icon: "FaEnvelope",
        iconLibrary: "fa",
        order: 6,
        isActive: true,
      },
      {
        platform: "WhatsApp",
        url: "https://wa.me/970599349034",
        icon: "FaWhatsapp",
        iconLibrary: "fa",
        order: 7,
        isActive: true,
      },
      {
        platform: "Portfolio",
        url: "https://alshaer.vercel.app",
        icon: "FaGlobe",
        iconLibrary: "fa",
        order: 8,
        isActive: true,
      },
    ];

    const createdLinks = await SocialLink.insertMany(socialLinks);
    console.log(`✅ Created ${createdLinks.length} social links`);

    // Display created links
    console.log("\n📋 Created social links:");
    createdLinks.forEach((link) => {
      console.log(
        `   - ${link.platform}: ${link.url} (${link.isActive ? "Active" : "Inactive"})`
      );
    });

    console.log("\n🎉 Social links initialization completed!");
  } catch (error) {
    console.error("❌ Initialization failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

initSocialLinks();
