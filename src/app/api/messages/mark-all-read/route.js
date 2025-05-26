import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/lib/models/message";

export async function POST() {
  try {
    await dbConnect();

    // Mark all unread messages as read
    const result = await Message.updateMany(
      { read: false },
      { read: true, updatedAt: Date.now() }
    );

    return NextResponse.json({
      success: true,
      message: `Marked ${result.modifiedCount} messages as read`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error marking all messages as read:", error);
    return NextResponse.json(
      { success: false, error: "Failed to mark messages as read" },
      { status: 500 }
    );
  }
}
