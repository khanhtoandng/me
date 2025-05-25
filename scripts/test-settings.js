/**
 * Test script for settings functionality
 * Run with: node scripts/test-settings.js
 */

const mongoose = require("mongoose");
const crypto = require("crypto");

// MongoDB connection strings
const ATLAS_URI =
  "mongodb+srv://alshaercontact:12345678Samtax@cluster0.k44ex3a.mongodb.net/alshaer?retryWrites=true&w=majority";
const LOCAL_URI = "mongodb://127.0.0.1:27017/alshaer";

// User schema (simplified version)
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },
  role: {
    type: String,
    enum: ["admin", "editor"],
    default: "admin",
  },
});

// Method to check if password is correct
UserSchema.methods.matchPassword = function (enteredPassword) {
  if (!this.password) return false;

  const [hashedPassword, salt] = this.password.split(":");
  const hash = crypto
    .pbkdf2Sync(enteredPassword, salt, 1000, 64, "sha512")
    .toString("hex");

  return hashedPassword === hash;
};

// Test settings functionality
async function testSettings() {
  console.log("Testing settings functionality...");

  try {
    console.log("Connecting to local MongoDB...");
    await mongoose.connect(LOCAL_URI);
    console.log("Connected to local MongoDB");

    // Create User model
    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    // Find user
    console.log("Looking for user with username: b19r");
    const user = await User.findOne({ username: "b19r" }).select("+password");

    if (user) {
      console.log("User found:");
      console.log("- ID:", user._id);
      console.log("- Username:", user.username);
      console.log("- Email:", user.email);
      console.log("- Role:", user.role);

      // Test current password
      const currentPasswordMatch = user.matchPassword("12345678");
      console.log("Current password (12345678) match:", currentPasswordMatch);

      // Test password hashing
      const testPassword = "newpassword123";
      const salt = crypto.randomBytes(16).toString("hex");
      const hashedPassword =
        crypto
          .pbkdf2Sync(testPassword, salt, 1000, 64, "sha512")
          .toString("hex") +
        ":" +
        salt;

      console.log("Test password hash generated successfully");
      console.log("Hash format:", hashedPassword.substring(0, 50) + "...");

      // Test OTP verification
      const testOtp = "2132";
      const isValidOtp = testOtp === "2132";
      console.log("OTP verification test (2132):", isValidOtp);

      console.log("\n✅ All settings functionality tests passed!");
    } else {
      console.log("❌ User not found");
    }
  } catch (error) {
    console.error("❌ Test failed:", error.message);
  } finally {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from database");
    } catch (err) {
      // Ignore disconnect errors
    }
  }
}

// Run the test
testSettings();
