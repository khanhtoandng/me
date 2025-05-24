import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/lib/models/message";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request, { params }) {
  try {
    await dbConnect();
    
    // Get current user from token
    const currentUser = await getCurrentUser();
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const { id } = params;
    const { message } = await request.json();
    
    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Reply message is required" },
        { status: 400 }
      );
    }
    
    // Find the message by ID
    const messageDoc = await Message.findById(id);
    
    if (!messageDoc) {
      return NextResponse.json(
        { success: false, error: "Message not found" },
        { status: 404 }
      );
    }
    
    // Add the reply to the message
    const reply = {
      message: message.trim(),
      createdAt: new Date(),
    };
    
    messageDoc.replies = messageDoc.replies || [];
    messageDoc.replies.push(reply);
    
    // Mark the message as read
    messageDoc.read = true;
    
    // Save the message
    await messageDoc.save();
    
    // Return the newly added reply
    const newReply = messageDoc.replies[messageDoc.replies.length - 1];
    
    return NextResponse.json({
      success: true,
      data: {
        _id: newReply._id,
        message: newReply.message,
        createdAt: newReply.createdAt,
      },
    });
  } catch (error) {
    console.error("Error adding reply:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add reply" },
      { status: 500 }
    );
  }
}
