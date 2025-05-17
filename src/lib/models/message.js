import mongoose from "mongoose"

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
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Message || mongoose.model("Message", MessageSchema)
