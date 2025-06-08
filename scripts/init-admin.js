/**
 * This script initializes the admin user in the database.
 * Run it with: node scripts/init-admin.js
 */

const mongoose = require("mongoose");
const crypto = require("crypto");

// MongoDB connection strings with the specified credentials
const ATLAS_URI =
  "mongodb+srv://balshaer:12345678@alshaer.m6fqcnd.mongodb.net/?retryWrites=true&w=majority&appName=alshaer";
const LOCAL_URI = "mongodb://127.0.0.1:27017/alshaer";

// We'll try both connections
const MONGODB_URIS = [LOCAL_URI, ATLAS_URI];
// User schema (simplified version of the one in src/lib/models/user.js)
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "editor"],
    default: "admin",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${hash}:${salt}`;
}

// Initialize admin user
async function initAdmin() {
  let connected = false;
  let connectionUri = "";

  try {
    console.log("Attempting to connect to MongoDB...");

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    // Try each connection URI in order
    for (const uri of MONGODB_URIS) {
      try {
        console.log(`Trying connection: ${uri}`);
        await mongoose.connect(uri, options);
        console.log(`Connected to MongoDB successfully using: ${uri}`);
        connected = true;
        connectionUri = uri;
        break; // Exit the loop if connection is successful
      } catch (connErr) {
        console.warn(`Connection failed for ${uri}: ${connErr.message}`);
      }
    }

    if (!connected) {
      throw new Error("Failed to connect to any MongoDB instance");
    }

    // Create User model
    const User = mongoose.models.User || mongoose.model("User", UserSchema);

    // Check if user with username "balshaer" already exists
    const existingUser = await User.findOne({ username: "balshaer" });

    if (existingUser) {
      console.log('User "balshaer" already exists');
      process.exit(0);
    }

    // Create admin user with specified credentials
    const adminUser = new User({
      username: "balshaer",
      email: "balshaer@example.com",
      password: hashPassword("12345678"),
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully");
    console.log("----------------------------------");
    console.log("Username: balshaer");
    console.log("Password: 12345678");
    console.log("----------------------------------");
    console.log(
      "Please change these credentials after first login for better security"
    );
  } catch (error) {
    console.error("Error initializing admin user:", error);
    console.error("Error details:", error.message);
    if (error.stack) {
      console.error("Stack trace:", error.stack);
    }
  } finally {
    try {
      await mongoose.disconnect();
      console.log("Disconnected from MongoDB");
    } catch (disconnectError) {
      console.error("Error disconnecting from MongoDB:", disconnectError);
    }
  }
}

// Run the initialization
initAdmin();
