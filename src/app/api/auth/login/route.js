import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/user";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    console.log("Login attempt started");

    try {
      await dbConnect();
      console.log("Connected to database");
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed: " + dbError.message,
        },
        { status: 500 },
      );
    }

    let requestBody;
    try {
      requestBody = await request.json();
      console.log("Request body parsed");
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return NextResponse.json(
        { success: false, error: "Invalid request format" },
        { status: 400 },
      );
    }

    const { username, password } = requestBody;
    console.log("Login attempt for username:", username);

    if (!username || !password) {
      console.log("Missing username or password");
      return NextResponse.json(
        { success: false, error: "Please provide username and password" },
        { status: 400 },
      );
    }

    // Find user by username
    console.log("Looking for user with username:", username);
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      console.log("User not found with username:", username);
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    console.log("User found, checking password");

    // Check if password matches
    const isMatch = user.matchPassword(password);

    if (!isMatch) {
      console.log("Password does not match for user:", username);
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 },
      );
    }

    console.log("Password matched, updating last login time");

    // Update last login time
    user.lastLogin = Date.now();
    await user.save();

    // Create token payload (don't include sensitive data)
    const tokenPayload = {
      id: user._id.toString(), // Convert ObjectId to string
      username: user.username,
      email: user.email,
      role: user.role,
    };

    console.log("Creating JWT token with payload:", tokenPayload);

    // Sign token
    const token = await signToken(tokenPayload);

    console.log("Token created successfully");
    console.log("Setting auth cookie");

    // Set cookie
    setAuthCookie(token);

    console.log("Login successful for user:", username);

    return NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed: " + error.message },
      { status: 500 },
    );
  }
}
