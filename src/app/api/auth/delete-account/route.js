import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/user";
import { getCurrentUser, clearAuthCookie } from "@/lib/auth";

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

    const { otpCode } = await request.json();

    if (!otpCode) {
      return NextResponse.json(
        { success: false, error: "OTP code is required" },
        { status: 400 },
      );
    }

    // Verify OTP code (hardcoded as "2132" as requested)
    if (otpCode !== "2132") {
      return NextResponse.json(
        { success: false, error: "Invalid OTP code" },
        { status: 400 },
      );
    }

    // Find user by ID
    const user = await User.findById(currentUser.id);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    // Delete user account
    await User.findByIdAndDelete(currentUser.id);

    // Clear authentication cookie
    clearAuthCookie();

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete account" },
      { status: 500 },
    );
  }
}
