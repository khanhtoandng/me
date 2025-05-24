import mongoose from "mongoose"
import crypto from "crypto"

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
    maxlength: [20, "Username cannot be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password must be at least 8 characters long"],
    select: false, // Don't return password in queries by default
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
})

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  
  try {
    // Generate salt
    const salt = crypto.randomBytes(16).toString("hex")
    // Hash password with salt
    this.password = crypto
      .pbkdf2Sync(this.password, salt, 1000, 64, "sha512")
      .toString("hex") + ":" + salt
    next()
  } catch (error) {
    next(error)
  }
})

// Method to check if password is correct
UserSchema.methods.matchPassword = function (enteredPassword) {
  if (!this.password) return false
  
  const [hashedPassword, salt] = this.password.split(":")
  const hash = crypto
    .pbkdf2Sync(enteredPassword, salt, 1000, 64, "sha512")
    .toString("hex")
    
  return hashedPassword === hash
}

// Method to generate reset password token
UserSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex")
  
  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")
    
  // Set expire time (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  
  return resetToken
}

export default mongoose.models.User || mongoose.model("User", UserSchema)
