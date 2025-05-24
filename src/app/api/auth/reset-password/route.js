import { NextResponse } from "next/server"
import crypto from "crypto"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/user"

export async function POST(request) {
  try {
    await dbConnect()
    
    const { token, password } = await request.json()
    
    if (!token || !password) {
      return NextResponse.json(
        { success: false, error: "Please provide token and new password" },
        { status: 400 }
      )
    }
    
    // Hash the token from the request
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex")
    
    // Find user with the token and check if token is still valid
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    })
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired token" },
        { status: 400 }
      )
    }
    
    // Set new password
    user.password = password
    
    // Clear reset token fields
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    
    await user.save()
    
    return NextResponse.json({
      success: true,
      message: "Password reset successful",
    })
  } catch (error) {
    console.error("Reset password error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to reset password" },
      { status: 500 }
    )
  }
}
