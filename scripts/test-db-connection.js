/**
 * This script tests the MongoDB connection to both local and Atlas instances.
 * Run it with: node scripts/test-db-connection.js
 */

const mongoose = require("mongoose");

// MongoDB connection strings
const ATLAS_URI =
  "mongodb+srv://alshaercontact:alshaer2024@alshaer.m6fqcnd.mongodb.net/?retryWrites=true&w=majority&appName=alshaer";
const LOCAL_URI = "mongodb://127.0.0.1:27017/alshaer";

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Test connection to local MongoDB
async function testLocalConnection() {
  try {
    console.log("Testing connection to local MongoDB...");
    console.log(`URI: ${LOCAL_URI}`);

    await mongoose.connect(LOCAL_URI, options);
    console.log("✅ Successfully connected to local MongoDB");

    // Check if we can list collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(`Found ${collections.length} collections in local database:`);
    collections.forEach((collection) => {
      console.log(`- ${collection.name}`);
    });

    return true;
  } catch (error) {
    console.error("❌ Failed to connect to local MongoDB:");
    console.error(`Error: ${error.message}`);
    return false;
  } finally {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from local MongoDB");
    } catch (err) {
      // Ignore disconnect errors
    }
  }
}

// Test connection to Atlas MongoDB
async function testAtlasConnection() {
  try {
    console.log("\nTesting connection to MongoDB Atlas...");
    console.log(`URI: ${ATLAS_URI}`);

    await mongoose.connect(ATLAS_URI, options);
    console.log("✅ Successfully connected to MongoDB Atlas");

    // Check if we can list collections
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(`Found ${collections.length} collections in Atlas database:`);
    collections.forEach((collection) => {
      console.log(`- ${collection.name}`);
    });

    return true;
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB Atlas:");
    console.error(`Error: ${error.message}`);
    return false;
  } finally {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB Atlas");
    } catch (err) {
      // Ignore disconnect errors
    }
  }
}

// Run both tests
async function runTests() {
  console.log("=== MongoDB Connection Test ===\n");

  const localResult = await testLocalConnection();
  const atlasResult = await testAtlasConnection();

  console.log("\n=== Test Results ===");
  console.log(`Local MongoDB: ${localResult ? "✅ Connected" : "❌ Failed"}`);
  console.log(`Atlas MongoDB: ${atlasResult ? "✅ Connected" : "❌ Failed"}`);

  if (localResult || atlasResult) {
    console.log(
      "\n✅ At least one connection is working. The application should function correctly.",
    );
  } else {
    console.log(
      "\n❌ Both connections failed. Please check your MongoDB setup.",
    );
  }
}

// Run the tests
runTests();
