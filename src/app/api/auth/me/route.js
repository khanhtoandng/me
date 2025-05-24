import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/user";
import { verifyToken } from "@/lib/auth";

export async function GET(request) {
  try {
    // Get token from cookies
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify token
    const payload = await verifyToken(token);

    if (!payload || !payload.id) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    try {
      // Connect to database
      await dbConnect();

      // Check if the ID is valid
      if (!mongoose.Types.ObjectId.isValid(payload.id)) {
        return NextResponse.json(
          { success: false, error: "Invalid user ID format" },
          { status: 400 }
        );
      }

      // Try to find the user
      let user;
      try {
        user = await User.findById(payload.id).select("-password");
      } catch (findError) {
        return NextResponse.json(
          { success: false, error: "Error finding user: " + findError.message },
          { status: 500 }
        );
      }

      if (!user) {
        // Try to find by username as fallback
        try {
          if (payload.username) {
            user = await User.findOne({ username: payload.username }).select(
              "-password"
            );
          }
        } catch (usernameError) {
          // Ignore username lookup errors
        }

        if (!user) {
          return NextResponse.json(
            { success: false, error: "User not found" },
            { status: 404 }
          );
        }
      }

      // Return user data
      return NextResponse.json({
        success: true,
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch (dbError) {
      return NextResponse.json(
        { success: false, error: "Database error: " + dbError.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed: " + error.message },
      { status: 500 }
    );
  }
}
