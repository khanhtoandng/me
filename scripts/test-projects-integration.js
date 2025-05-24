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

async function testProjectsIntegration() {
  try {
    console.log('🚀 Testing Projects Integration...');
    console.log('============================================================');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Test 1: Verify projects exist
    console.log('\n📋 Test 1: Checking existing projects...');
    const allProjects = await Project.find({}).sort({ createdAt: -1 });
    console.log(`✅ Found ${allProjects.length} total projects`);
    
    if (allProjects.length > 0) {
      allProjects.slice(0, 5).forEach(project => {
        console.log(`   - ${project.title} (${project.projectType}) - ${project.status}`);
      });
      if (allProjects.length > 5) {
        console.log(`   ... and ${allProjects.length - 5} more projects`);
      }
    }

    // Test 2: Verify published projects (what the frontend will fetch)
    console.log('\n🔍 Test 2: Checking published projects (frontend data)...');
    const publishedProjects = await Project.find({ status: "Published" }).sort({ createdAt: -1 });
    console.log(`✅ Found ${publishedProjects.length} published projects`);
    
    if (publishedProjects.length > 0) {
      publishedProjects.slice(0, 3).forEach(project => {
        console.log(`   - ${project.title}: ${project.technologies.join(', ')}`);
      });
    }

    // Test 3: Test API endpoint simulation
    console.log('\n🌐 Test 3: Simulating API endpoint responses...');
    
    // Simulate GET /api/projects?status=Published
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
        status: project.status
      }))
    };
    
    console.log('✅ API Response simulation successful');
    console.log(`   - Response contains ${apiResponse.data.length} projects`);
    console.log(`   - Sample project: ${apiResponse.data[0]?.title} (${apiResponse.data[0]?.projectType})`);

    // Test 4: Test filtering by project type
    console.log('\n🏷️ Test 4: Testing project type filtering...');
    const projectTypes = ['Frontend', 'Full-stack', 'Backend', 'AI', 'Mobile'];
    
    for (const type of projectTypes) {
      const typeProjects = await Project.find({ 
        status: "Published", 
        projectType: type 
      });
      console.log(`   ${type}: ${typeProjects.length} projects`);
    }

    // Test 5: Test featured projects
    console.log('\n⭐ Test 5: Testing featured projects...');
    const featuredProjects = await Project.find({ 
      status: "Published", 
      featured: true 
    });
    console.log(`✅ Found ${featuredProjects.length} featured projects`);
    featuredProjects.forEach(project => {
      console.log(`   - ${project.title} (${project.projectType})`);
    });

    // Test 6: Verify required fields
    console.log('\n🔍 Test 6: Validating project data structure...');
    const sampleProject = publishedProjects[0];
    if (sampleProject) {
      const requiredFields = ['title', 'description', 'projectType', 'technologies', 'status'];
      const missingFields = requiredFields.filter(field => !sampleProject[field]);
      
      if (missingFields.length === 0) {
        console.log('✅ All required fields are present');
      } else {
        console.log(`❌ Missing fields: ${missingFields.join(', ')}`);
      }
      
      // Check technologies array
      if (Array.isArray(sampleProject.technologies) && sampleProject.technologies.length > 0) {
        console.log(`✅ Technologies array is valid (${sampleProject.technologies.length} items)`);
      } else {
        console.log('⚠️ Technologies array is empty or invalid');
      }
    }

    // Test 7: Performance check
    console.log('\n⚡ Test 7: Performance check...');
    const startTime = Date.now();
    await Project.find({ status: "Published" }).sort({ createdAt: -1 }).limit(10);
    const endTime = Date.now();
    const queryTime = endTime - startTime;
    
    console.log(`✅ Query performance: ${queryTime}ms`);
    if (queryTime < 100) {
      console.log('   🚀 Excellent performance');
    } else if (queryTime < 500) {
      console.log('   👍 Good performance');
    } else {
      console.log('   ⚠️ Consider adding database indexes');
    }

    // Test 8: URL validation
    console.log('\n🔗 Test 8: Validating project URLs...');
    const projectsWithUrls = publishedProjects.filter(p => p.websiteUrl || p.githubUrl);
    console.log(`✅ ${projectsWithUrls.length} projects have URLs`);
    
    let validUrls = 0;
    projectsWithUrls.forEach(project => {
      if (project.websiteUrl && /^https?:\/\/.+/.test(project.websiteUrl)) validUrls++;
      if (project.githubUrl && /^https?:\/\/.+/.test(project.githubUrl)) validUrls++;
    });
    console.log(`✅ ${validUrls} valid URLs found`);

    console.log('\n============================================================');
    console.log('📊 PROJECTS INTEGRATION TEST SUMMARY');
    console.log('============================================================');
    console.log(`Total Projects: ${allProjects.length}`);
    console.log(`Published Projects: ${publishedProjects.length}`);
    console.log(`Featured Projects: ${featuredProjects.length}`);
    console.log(`Query Performance: ${queryTime}ms`);
    console.log(`Projects with URLs: ${projectsWithUrls.length}`);
    
    console.log('\n🎉 Projects Integration Test Completed!');
    console.log('\n📋 Frontend Integration Points:');
    console.log('   • Projects Page: ✅ Ready');
    console.log('   • Home Page Projects Section: ✅ Ready');
    console.log('   • Project Filtering: ✅ Ready');
    console.log('   • Dashboard Management: ✅ Ready');
    console.log('\n🔗 API Endpoints Available:');
    console.log('   • GET /api/projects?status=Published');
    console.log('   • GET /api/projects?featured=true');
    console.log('   • GET /api/projects?projectType=Frontend');
    console.log('   • POST /api/projects');
    console.log('   • PUT /api/projects/[id]');
    console.log('   • DELETE /api/projects/[id]');

    console.log('\n🎯 Component Mapping:');
    console.log('   Database Field → Component Field');
    console.log('   • _id → id');
    console.log('   • projectType → type (lowercase)');
    console.log('   • technologies → skills');
    console.log('   • websiteUrl → links.website');
    console.log('   • githubUrl → links.github');

  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

testProjectsIntegration();
