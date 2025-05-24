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

async function testProjectsAPI() {
  try {
    console.log('🚀 Testing Projects API...');
    console.log('============================================================');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Check if projects exist in database
    console.log('\n📋 Test 1: Checking projects in database...');
    const allProjects = await Project.find({});
    console.log(`✅ Found ${allProjects.length} total projects in database`);

    // Test 2: Check published projects specifically
    console.log('\n📋 Test 2: Checking published projects...');
    const publishedProjects = await Project.find({ status: "Published" });
    console.log(`✅ Found ${publishedProjects.length} published projects`);
    
    if (publishedProjects.length > 0) {
      console.log('   Published projects:');
      publishedProjects.slice(0, 3).forEach(project => {
        console.log(`   - ${project.title} (${project.projectType})`);
      });
    }

    // Test 3: Simulate API response
    console.log('\n🌐 Test 3: Simulating API response...');
    const apiResponse = {
      success: true,
      data: publishedProjects.map(project => ({
        _id: project._id.toString(),
        title: project.title,
        description: project.description,
        projectType: project.projectType,
        technologies: project.technologies,
        githubUrl: project.githubUrl,
        websiteUrl: project.websiteUrl,
        featured: project.featured,
        status: project.status,
        images: project.images,
        videoUrl: project.videoUrl,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt
      }))
    };
    
    console.log('✅ API Response structure:');
    console.log(`   - success: ${apiResponse.success}`);
    console.log(`   - data length: ${apiResponse.data.length}`);
    console.log(`   - sample project: ${apiResponse.data[0]?.title || 'None'}`);

    // Test 4: Test component mapping
    console.log('\n🔄 Test 4: Testing component mapping...');
    if (apiResponse.data.length > 0) {
      const sampleProject = apiResponse.data[0];
      const mappedProject = {
        id: sampleProject._id,
        type: sampleProject.projectType.toLowerCase(),
        title: sampleProject.title,
        description: sampleProject.description,
        skills: sampleProject.technologies,
        links: {
          website: sampleProject.websiteUrl || undefined,
          github: sampleProject.githubUrl || undefined,
        },
      };
      
      console.log('✅ Component mapping successful:');
      console.log(`   - id: ${mappedProject.id}`);
      console.log(`   - type: ${mappedProject.type}`);
      console.log(`   - title: ${mappedProject.title}`);
      console.log(`   - skills: [${mappedProject.skills.join(', ')}]`);
      console.log(`   - website: ${mappedProject.links.website || 'None'}`);
      console.log(`   - github: ${mappedProject.links.github || 'None'}`);
    }

    // Test 5: Check for potential issues
    console.log('\n🔍 Test 5: Checking for potential issues...');
    
    // Check for empty technologies arrays
    const projectsWithoutTech = publishedProjects.filter(p => !p.technologies || p.technologies.length === 0);
    if (projectsWithoutTech.length > 0) {
      console.log(`⚠️  ${projectsWithoutTech.length} projects have no technologies`);
    } else {
      console.log('✅ All projects have technologies');
    }
    
    // Check for missing URLs
    const projectsWithoutUrls = publishedProjects.filter(p => !p.websiteUrl && !p.githubUrl);
    if (projectsWithoutUrls.length > 0) {
      console.log(`⚠️  ${projectsWithoutUrls.length} projects have no URLs`);
    } else {
      console.log('✅ All projects have at least one URL');
    }

    // Test 6: Test filtering
    console.log('\n🏷️ Test 6: Testing project type filtering...');
    const frontendProjects = publishedProjects.filter(p => p.projectType.toLowerCase() === 'frontend');
    const fullstackProjects = publishedProjects.filter(p => p.projectType.toLowerCase() === 'full-stack');
    
    console.log(`✅ Frontend projects: ${frontendProjects.length}`);
    console.log(`✅ Full-stack projects: ${fullstackProjects.length}`);

    console.log('\n============================================================');
    console.log('📊 PROJECTS API TEST SUMMARY');
    console.log('============================================================');
    console.log(`Total Projects: ${allProjects.length}`);
    console.log(`Published Projects: ${publishedProjects.length}`);
    console.log(`API Response Valid: ${apiResponse.success}`);
    console.log(`Component Mapping: ${publishedProjects.length > 0 ? 'Working' : 'No data to test'}`);
    
    if (publishedProjects.length === 0) {
      console.log('\n❌ ISSUE FOUND: No published projects in database!');
      console.log('   This is why the frontend is not showing any projects.');
      console.log('   Solution: Run the init-projects.js script to add sample projects.');
    } else {
      console.log('\n✅ Database has published projects - API should work correctly');
    }

    console.log('\n🎉 Projects API Test Completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

testProjectsAPI();
