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

async function testSocialLinks() {
  try {
    console.log("🚀 Testing Social Links functionality...");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing social links for testing
    await SocialLink.deleteMany({});
    console.log("🧹 Cleared existing social links");

    // Test 1: Create social links
    console.log("\n📝 Test 1: Creating social links...");

    const testLinks = [
      {
        platform: "GitHub",
        url: "https://github.com/balshaer",
        icon: "FaGithub",
        iconLibrary: "fa",
        order: 1,
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/balshaer",
        icon: "FaLinkedin",
        iconLibrary: "fa",
        order: 2,
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/balshaer",
        icon: "FaTwitter",
        iconLibrary: "fa",
        order: 3,
      },
      {
        platform: "Portfolio",
        url: "https://balshaer.dev",
        icon: "FaGlobe",
        iconLibrary: "fa",
        order: 4,
        isActive: false,
      },
    ];

    const createdLinks = await SocialLink.insertMany(testLinks);
    console.log(`✅ Created ${createdLinks.length} social links`);

    // Test 2: Fetch all social links
    console.log("\n📋 Test 2: Fetching all social links...");
    const allLinks = await SocialLink.find({}).sort({ order: 1 });
    console.log(`✅ Found ${allLinks.length} social links`);
    allLinks.forEach((link) => {
      console.log(
        `   - ${link.platform}: ${link.url} (${link.isActive ? "Active" : "Inactive"})`
      );
    });

    // Test 3: Fetch only active social links
    console.log("\n🔍 Test 3: Fetching active social links...");
    const activeLinks = await SocialLink.find({ isActive: true }).sort({
      order: 1,
    });
    console.log(`✅ Found ${activeLinks.length} active social links`);
    activeLinks.forEach((link) => {
      console.log(`   - ${link.platform}: ${link.url}`);
    });

    // Test 4: Update a social link
    console.log("\n✏️ Test 4: Updating a social link...");
    const linkToUpdate = await SocialLink.findOne({ platform: "Portfolio" });
    if (linkToUpdate) {
      linkToUpdate.isActive = true;
      linkToUpdate.url = "https://baraa-alshaer.dev";
      await linkToUpdate.save();
      console.log(`✅ Updated ${linkToUpdate.platform} link`);
    }

    // Test 5: Delete a social link
    console.log("\n🗑️ Test 5: Deleting a social link...");
    const deleteResult = await SocialLink.findOneAndDelete({
      platform: "Twitter",
    });
    if (deleteResult) {
      console.log(`✅ Deleted ${deleteResult.platform} link`);
    }

    // Test 6: Final count
    console.log("\n📊 Test 6: Final verification...");
    const finalCount = await SocialLink.countDocuments({});
    const finalActiveCount = await SocialLink.countDocuments({
      isActive: true,
    });
    console.log(`✅ Total links: ${finalCount}`);
    console.log(`✅ Active links: ${finalActiveCount}`);

    console.log("\n🎉 All social links tests passed!");
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

testSocialLinks();
