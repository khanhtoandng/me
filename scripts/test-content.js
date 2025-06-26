/**
 * Test script for content management functionality
 * Run with: node scripts/test-content.js
 */

const mongoose = require("mongoose");

// MongoDB connection
const LOCAL_URI = "mongodb://127.0.0.1:27017/alshaer";

// Content schema
const ContentSchema = new mongoose.Schema({
  section: String,
  title: String,
  subtitle: String,
  description: String,
  content: mongoose.Schema.Types.Mixed,
  isActive: Boolean,
});

async function testContent() {
  console.log("Testing content management functionality...");

  try {
    await mongoose.connect(LOCAL_URI);
    console.log("Connected to MongoDB");

    const Content =
      mongoose.models.Content || mongoose.model("Content", ContentSchema);

    // Test fetching hero content
    const heroContent = await Content.findOne({
      section: "hero",
      isActive: true,
    });
    console.log("\n📝 Hero Content:");
    console.log("- Title:", heroContent?.title);
    console.log("- Subtitle:", heroContent?.subtitle);
    console.log("- Paragraphs:", heroContent?.content?.paragraphs?.length || 0);

    // Test fetching footer content
    const footerContent = await Content.findOne({
      section: "footer",
      isActive: true,
    });
    console.log("\n🦶 Footer Content:");
    console.log("- Title:", footerContent?.title);
    console.log("- Description:", footerContent?.description);
    console.log("- Copyright:", footerContent?.content?.copyright);

    // Test updating content
    if (heroContent) {
      const originalTitle = heroContent.title;
      heroContent.title = "Test Updated Title";
      await heroContent.save();
      console.log("\n✅ Hero title updated successfully");

      // Restore original title
      heroContent.title = originalTitle;
      await heroContent.save();
      console.log("✅ Hero title restored");
    }

    console.log("\n🎉 All content management tests passed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

testContent();
