import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please provide a last name."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  bio: {
    type: String,
  },
  avatar: {
    type: String,
    default: "",
  },
  skills: {
    type: [String],
    default: [],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Profile ||
  mongoose.model("Profile", ProfileSchema);
