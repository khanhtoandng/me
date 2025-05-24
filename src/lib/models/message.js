import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, "Please provide a reply message."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: [true, "Please provide a sender name."],
  },
  email: {
    type: String,
    required: [true, "Please provide an email address."],
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address."],
  },
  subject: {
    type: String,
    required: [true, "Please provide a subject."],
  },
  message: {
    type: String,
    required: [true, "Please provide a message."],
  },
  read: {
    type: Boolean,
    default: false,
  },
  starred: {
    type: Boolean,
    default: false,
  },
  archived: {
    type: Boolean,
    default: false,
  },
  replies: [ReplySchema],
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
MessageSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
