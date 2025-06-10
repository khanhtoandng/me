import mongoose from "mongoose";

const MONGODB_URI = "mongodb+srv://alshaercontact:12345678Samtax@cluster0.k44ex3a.mongodb.net/alshaer";

// ProjectType Schema
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
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Please provide a valid hex color"],
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

const ProjectType = mongoose.models.ProjectType || mongoose.model("ProjectType", ProjectTypeSchema);

async function addWebApplicationProjectType() {
  try {
    console.log('🚀 Adding Web Application project type...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if "Web Application" already exists
    const existingType = await ProjectType.findOne({ name: "Web Application" });
    
    if (existingType) {
      console.log('ℹ️ Web Application project type already exists');
      console.log('Existing type:', existingType);
      return;
    }

    // Create "Web Application" project type
    const webAppType = await ProjectType.create({
      name: "Web Application",
      description: "Full-featured web applications with frontend and backend components",
      icon: {
        library: "fa",
        name: "FaGlobe"
      },
      color: "#10B981", // Green color
      isActive: true
    });

    console.log('✅ Web Application project type created successfully:');
    console.log(webAppType);

    // List all project types
    const allTypes = await ProjectType.find({}).sort({ name: 1 });
    console.log('\n📋 All project types:');
    allTypes.forEach(type => {
      console.log(`- ${type.name} (${type.isActive ? 'Active' : 'Inactive'})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the script
addWebApplicationProjectType();
