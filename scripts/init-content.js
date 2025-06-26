/**
 * Script to initialize default content in the database
 * Run with: node scripts/init-content.js
 */

const mongoose = require("mongoose");

// MongoDB connection
const LOCAL_URI = "mongodb://127.0.0.1:27017/alshaer";

// Content schema
const ContentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
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
    type: mongoose.Schema.Types.Mixed,
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

async function initializeContent() {
  console.log("Initializing default content...");

  try {
    await mongoose.connect(LOCAL_URI);
    console.log("Connected to MongoDB");

    const Content =
      mongoose.models.Content || mongoose.model("Content", ContentSchema);

    // Default hero content
    const heroContent = {
      section: "hero",
      title: "Baraa Alshaer",
      subtitle: "software engineer | Full-Stack Developer",
      description: "",
      content: {
        paragraphs: [
          "I am a Full-Stack Developer from Palestine, specializing in crafting seamless and efficient web applications across both front-end and back-end technologies. I hold a degree in software engineering from Al-Azhar University, where I developed a strong foundation in modern software development principles, problem-solving, and system architecture.",
          "I approach each project with a focus on delivering high-quality solutions, combining my skills in frontend development, backend systems, and overall project design. My aim is to create user-centric applications that not only meet client needs but also drive innovation.",
          "I am dedicated to staying current with industry trends and continuously improving my craft. My work reflects a commitment to excellence and a drive to contribute meaningfully to the tech community.",
        ],
      },
      isActive: true,
    };

    // Default footer content
    const footerContent = {
      section: "footer",
      title: "Baraa Alshaer",
      subtitle: "",
      description:
        "Full-Stack Developer specializing in creating seamless and efficient web applications.",
      content: {
        copyright: "All rights reserved.",
      },
      isActive: true,
    };

    // Insert or update hero content
    const existingHero = await Content.findOne({ section: "hero" });
    if (existingHero) {
      console.log("Hero content already exists, skipping...");
    } else {
      await Content.create(heroContent);
      console.log("✅ Hero content created successfully!");
    }

    // Insert or update footer content
    const existingFooter = await Content.findOne({ section: "footer" });
    if (existingFooter) {
      console.log("Footer content already exists, skipping...");
    } else {
      await Content.create(footerContent);
      console.log("✅ Footer content created successfully!");
    }

    console.log("\n🎉 Content initialization completed!");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

initializeContent();
