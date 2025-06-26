const mongoose = require("mongoose");

// MongoDB connection
const MONGODB_URI = "mongodb://localhost:27017/alshaer";

// Experience Schema
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

const Experience =
  mongoose.models.Experience || mongoose.model("Experience", ExperienceSchema);

async function initExperiences() {
  try {
    console.log("🚀 Initializing experiences...");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing experiences
    await Experience.deleteMany({});
    console.log("🧹 Cleared existing experiences");

    // Sample experiences data
    const experiences = [
      {
        title: "Full-Stack Engineer",
        company: "Samtax",
        companyUrl: "https://www.sam-tax.com/",
        location: "Remote",
        startDate: new Date("2024-01-01"),
        current: true,
        description:
          "Work as a Full-Stack Engineer, responsible for developing the main website for Samtax. Build tools to help the company get work done faster.",
        skills: [
          "React js",
          "Typescript",
          "Tailwind CSS",
          "Express js",
          "MongoDB",
          "Node js",
          "Ai apis",
          "RESTful APIs",
        ],
      },
      {
        title: "Frontend Developer",
        company: "Sustainable Star LLC",
        companyUrl: "https://sustainablestar.com.sa/",
        location: "Remote",
        startDate: new Date("2023-07-01"),
        endDate: new Date("2023-10-31"),
        current: false,
        description:
          "Worked as a frontend developer using React, responsible for developing the main website for Sustainable Star LLC and significantly contributing to the SFB project.",
        skills: [
          "React js",
          "Typescript",
          "Tailwind CSS",
          "Github",
          "Git",
          "RESTful APIs",
        ],
      },
      {
        title: "Frontend Developer",
        company: "PTIT",
        companyUrl: "http://ptit.com.sa/",
        location: "Palestine",
        startDate: new Date("2023-07-01"),
        endDate: new Date("2023-09-30"),
        current: false,
        description:
          "Worked as a React developer, responsible for rebuilding and updating several projects, as well as developing new projects.",
        skills: [
          "React js",
          "Typescript",
          "Tailwind CSS",
          "Github",
          "Git",
          "RESTful APIs",
        ],
      },
      {
        title: "Software Engineer Intern",
        company: "GEDCO",
        companyUrl: "#",
        location: "Palestine",
        startDate: new Date("2022-04-01"),
        endDate: new Date("2022-06-30"),
        current: false,
        description:
          "Completed an internship at GEDCO as a software engineer through my college.",
        skills: ["PHP", "MYSQL", "Java"],
      },
    ];

    // Insert experiences
    const createdExperiences = await Experience.insertMany(experiences);
    console.log(`✅ Created ${createdExperiences.length} experiences`);

    // Display created experiences
    console.log("\n📋 Created experiences:");
    createdExperiences.forEach((exp) => {
      const dateRange = exp.current
        ? `${exp.startDate.toLocaleDateString()} - Present`
        : `${exp.startDate.toLocaleDateString()} - ${exp.endDate.toLocaleDateString()}`;
      console.log(`   - ${exp.title} at ${exp.company} (${dateRange})`);
    });

    // Statistics
    const totalExperiences = await Experience.countDocuments();
    const currentExperiences = await Experience.countDocuments({
      current: true,
    });

    console.log("\n📊 Experience Statistics:");
    console.log(`   Total Experiences: ${totalExperiences}`);
    console.log(`   Current Experiences: ${currentExperiences}`);
    console.log(
      `   Past Experiences: ${totalExperiences - currentExperiences}`,
    );

    console.log("\n🎉 Experiences initialization completed!");
  } catch (error) {
    console.error("❌ Initialization failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

initExperiences();
