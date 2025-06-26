import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/user";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request) {
  try {
    await dbConnect();

    // Get current user from token
    const currentUser = await getCurrentUser();

    if (!currentUser || !currentUser.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { success: false, error: "Please provide current and new password" },
        { status: 400 },
      );
    }

    // Find user by ID
    const user = await User.findById(currentUser.id).select("+password");

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    // Check if current password is correct
    const isMatch = user.matchPassword(currentPassword);

    if (!isMatch) {
      console.log("Password verification failed for user:", user.username);
      console.log(
        "Stored password format:",
        user.password ? "exists" : "missing",
      );
      return NextResponse.json(
        { success: false, error: "Current password is incorrect" },
        { status: 401 },
      );
    }

    // Hash new password
    const crypto = require("crypto");
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword =
      crypto.pbkdf2Sync(newPassword, salt, 1000, 64, "sha512").toString("hex") +
      ":" +
      salt;

    // Update password
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to change password" },
      { status: 500 },
    );
  }
}
