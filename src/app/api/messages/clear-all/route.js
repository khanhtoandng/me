import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Message from "@/lib/models/message";

export async function POST() {
  try {
    await dbConnect();

    // Archive all messages instead of deleting them
    const result = await Message.updateMany(
      { archived: false },
      { archived: true, read: true, updatedAt: Date.now() }
    );

    return NextResponse.json({
      success: true,
      message: `Archived ${result.modifiedCount} messages`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error clearing all messages:", error);
    return NextResponse.json(
      { success: false, error: "Failed to clear messages" },
      { status: 500 }
    );
  }
}
