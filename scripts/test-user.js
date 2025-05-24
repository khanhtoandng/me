/**
 * This script tests the database connection and verifies the user exists.
 * Run it with: node scripts/test-user.js
 */

const mongoose = require("mongoose");
const crypto = require("crypto");

// MongoDB connection strings with the specified credentials
const ATLAS_URI = "mongodb+srv://b19r:12345678@alshaer.m6fqcnd.mongodb.net/?retryWrites=true&w=majority&appName=alshaer";
const LOCAL_URI = "mongodb://127.0.0.1:27017/alshaer";

// User schema (simplified version of the one in src/lib/models/user.js)
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

// Test database connection and find user
async function testUser() {
  console.log("Testing database connection and user...");
  
  // Try local connection first
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
      
      // Test password
      const passwordMatch = user.matchPassword("12345678");
      console.log("Password match:", passwordMatch);
      
      return;
    } else {
      console.log("User not found in local database, trying Atlas...");
    }
  } catch (localError) {
    console.error("Local MongoDB error:", localError.message);
    console.log("Trying Atlas connection...");
  } finally {
    try {
      await mongoose.disconnect();
    } catch (err) {
      // Ignore disconnect errors
    }
  }
  
  // Try Atlas connection
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(ATLAS_URI);
    console.log("Connected to MongoDB Atlas");
    
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
      
      // Test password
      const passwordMatch = user.matchPassword("12345678");
      console.log("Password match:", passwordMatch);
    } else {
      console.log("User not found in Atlas database");
      console.log("Creating user...");
      
      // Hash password
      const salt = crypto.randomBytes(16).toString("hex");
      const hashedPassword = crypto
        .pbkdf2Sync("12345678", salt, 1000, 64, "sha512")
        .toString("hex") + ":" + salt;
      
      // Create user
      const newUser = new User({
        username: "b19r",
        email: "b19r@example.com",
        password: hashedPassword,
        role: "admin",
      });
      
      await newUser.save();
      console.log("User created successfully");
    }
  } catch (atlasError) {
    console.error("MongoDB Atlas error:", atlasError.message);
  } finally {
    try {
      await mongoose.disconnect();
    } catch (err) {
      // Ignore disconnect errors
    }
  }
}

// Run the test
testUser();
