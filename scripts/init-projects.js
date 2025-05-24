const mongoose = require('mongoose');

// MongoDB connection
const MONGODB_URI = 'mongodb://localhost:27017/alshaer';

// Project Schema
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
});

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

async function initProjects() {
  try {
    console.log('🚀 Initializing projects...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('🧹 Cleared existing projects');

    // Create sample projects
    const projects = [
      {
        title: "Gradients CSS",
        description: "A gradient design tool for developers and designers with live previews and customizable options.",
        projectType: "Frontend",
        technologies: ["React", "TypeScript", "Tailwind CSS", "RESTful APIs"],
        githubUrl: "https://github.com/balshaer/gradients-css",
        websiteUrl: "https://gradients-css.vercel.app",
        featured: true,
        status: "Published",
        images: [],
        videoUrl: ""
      },
      {
        title: "SFB - Sustainable Star Form Builder",
        description: "A dynamic form builder for customizable data collection with a great UI and user experience.",
        projectType: "Frontend",
        technologies: ["React", "Tailwind CSS", "Shadcn UI", "TypeScript"],
        githubUrl: "",
        websiteUrl: "https://sfb.sustainablestar.org",
        featured: true,
        status: "Published",
        images: [],
        videoUrl: ""
      },
      {
        title: "Sam-Tax",
        description: "A professional website for a U.S.-based company offering tax and translation services.",
        projectType: "Full-stack",
        technologies: ["React", "Tailwind CSS", "Express.js", "MongoDB", "Node.js"],
        githubUrl: "",
        websiteUrl: "https://sam-tax.com",
        featured: true,
        status: "Published",
        images: [],
        videoUrl: ""
      },
      {
        title: "Raouf Zadi Portfolio",
        description: "A stylish barber portfolio website built with modern React stack and responsive design.",
        projectType: "Frontend",
        technologies: ["React", "TypeScript", "Tailwind CSS", "Git"],
        githubUrl: "",
        websiteUrl: "https://raoufzadi.com",
        featured: false,
        status: "Published",
        images: [],
        videoUrl: ""
      },
      {
        title: "Naj Training Center",
        description: "An educational platform for a dental training center in Saudi Arabia with course management.",
        projectType: "Frontend",
        technologies: ["React", "JavaScript", "Material-UI"],
        githubUrl: "",
        websiteUrl: "https://najcenter.com",
        featured: false,
        status: "Published",
        images: [],
        videoUrl: ""
      },
      {
        title: "Rove E-commerce",
        description: "A full-stack, open-source eCommerce web application with modern features and payment integration.",
        projectType: "Full-stack",
        technologies: ["React", "Node.js", "Express.js", "MongoDB", "Stripe"],
        githubUrl: "https://github.com/balshaer/rove",
        websiteUrl: "https://rove-ecommerce.vercel.app",
        featured: true,
        status: "Published",
        images: [],
        videoUrl: ""
      },
      {
        title: "Sustainable Star Corporate",
        description: "A corporate website for a Saudi Arabian software company with modern design and CMS integration.",
        projectType: "Full-stack",
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi CMS"],
        githubUrl: "",
        websiteUrl: "https://sustainablestar.org",
        featured: false,
        status: "Published",
        images: [],
        videoUrl: ""
      },
      {
        title: "Bookstore API",
        description: "A robust RESTful API for managing bookstore operations with authentication and inventory management.",
        projectType: "Backend",
        technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Mongoose"],
        githubUrl: "https://github.com/balshaer/bookstore-api",
        websiteUrl: "",
        featured: false,
        status: "Published",
        images: [],
        videoUrl: ""
      },
      {
        title: "AI Chat Assistant",
        description: "An intelligent chat assistant powered by OpenAI GPT with context awareness and memory.",
        projectType: "AI",
        technologies: ["Python", "OpenAI API", "FastAPI", "React", "WebSocket"],
        githubUrl: "https://github.com/balshaer/ai-chat-assistant",
        websiteUrl: "https://ai-chat-demo.vercel.app",
        featured: true,
        status: "Published",
        images: [],
        videoUrl: ""
      },
      {
        title: "Mobile Task Manager",
        description: "A cross-platform mobile application for task management with offline sync capabilities.",
        projectType: "Mobile",
        technologies: ["React Native", "TypeScript", "SQLite", "Redux"],
        githubUrl: "https://github.com/balshaer/mobile-task-manager",
        websiteUrl: "",
        featured: false,
        status: "Published",
        images: [],
        videoUrl: ""
      }
    ];

    const createdProjects = await Project.insertMany(projects);
    console.log(`✅ Created ${createdProjects.length} projects`);

    // Display created projects
    console.log('\n📋 Created projects:');
    createdProjects.forEach(project => {
      console.log(`   - ${project.title} (${project.projectType}) - ${project.status}`);
    });

    // Show statistics
    const totalProjects = await Project.countDocuments();
    const publishedProjects = await Project.countDocuments({ status: "Published" });
    const featuredProjects = await Project.countDocuments({ featured: true });
    
    console.log('\n📊 Project Statistics:');
    console.log(`   Total Projects: ${totalProjects}`);
    console.log(`   Published Projects: ${publishedProjects}`);
    console.log(`   Featured Projects: ${featuredProjects}`);

    // Show projects by type
    const projectTypes = await Project.aggregate([
      { $match: { status: "Published" } },
      { $group: { _id: "$projectType", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    console.log('\n🏷️ Projects by Type:');
    projectTypes.forEach(type => {
      console.log(`   ${type._id}: ${type.count} projects`);
    });

    console.log('\n🎉 Projects initialization completed!');

  } catch (error) {
    console.error('❌ Initialization failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

initProjects();
