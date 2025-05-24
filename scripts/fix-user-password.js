/**
 * Script to fix user password format
 * Run with: node scripts/fix-user-password.js
 */

const mongoose = require("mongoose");
const crypto = require("crypto");

// MongoDB connection
const LOCAL_URI = "mongodb://127.0.0.1:27017/alshaer";

// User schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: { type: String, select: false },
  role: String,
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

async function fixUserPassword() {
  console.log("Fixing user password format...");
  
  try {
    await mongoose.connect(LOCAL_URI);
    console.log("Connected to MongoDB");
    
    const User = mongoose.models.User || mongoose.model("User", UserSchema);
    
    // Find user
    const user = await User.findOne({ username: "b19r" }).select("+password");
    
    if (!user) {
      console.log("User not found");
      return;
    }
    
    console.log("Current user:", user.username);
    console.log("Current password exists:", !!user.password);
    
    // Check if password is in correct format (should contain a colon)
    if (user.password && !user.password.includes(":")) {
      console.log("Password is not in correct format, fixing...");
      
      // Assume the current password is "12345678" and hash it properly
      const plainPassword = "12345678";
      const salt = crypto.randomBytes(16).toString("hex");
      const hashedPassword = crypto
        .pbkdf2Sync(plainPassword, salt, 1000, 64, "sha512")
        .toString("hex") + ":" + salt;
      
      // Update user password
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      
      console.log("✅ Password updated successfully!");
      
      // Verify the fix
      const updatedUser = await User.findById(user._id).select("+password");
      const isMatch = updatedUser.matchPassword("12345678");
      console.log("Password verification test:", isMatch ? "✅ PASS" : "❌ FAIL");
      
    } else if (user.password && user.password.includes(":")) {
      console.log("Password is already in correct format");
      
      // Test current password
      const isMatch = user.matchPassword("12345678");
      console.log("Password verification test:", isMatch ? "✅ PASS" : "❌ FAIL");
      
      if (!isMatch) {
        console.log("Current password doesn't match, updating to '12345678'...");
        const salt = crypto.randomBytes(16).toString("hex");
        const hashedPassword = crypto
          .pbkdf2Sync("12345678", salt, 1000, 64, "sha512")
          .toString("hex") + ":" + salt;
        
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        console.log("✅ Password reset to '12345678'");
      }
    } else {
      console.log("No password set, creating new one...");
      const salt = crypto.randomBytes(16).toString("hex");
      const hashedPassword = crypto
        .pbkdf2Sync("12345678", salt, 1000, 64, "sha512")
        .toString("hex") + ":" + salt;
      
      await User.findByIdAndUpdate(user._id, { password: hashedPassword });
      console.log("✅ Password set to '12345678'");
    }
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from database");
  }
}

fixUserPassword();
