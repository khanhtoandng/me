import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/user"

export async function POST(request) {
  try {
    await dbConnect()
    
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { success: false, error: "Please provide an email address" },
        { status: 400 }
      )
    }
    
    // Find user by email
    const user = await User.findOne({ email })
    
    if (!user) {
      // Don't reveal that the user doesn't exist for security reasons
      return NextResponse.json({
        success: true,
        message: "If your email is registered, you will receive a password reset link",
      })
    }
    
    // Generate reset token
    const resetToken = user.getResetPasswordToken()
    await user.save()
    
    // In a real application, you would send an email with the reset link
    // For this example, we'll just return the token (in production, never expose this)
    const resetUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/reset-password?token=${resetToken}`
    
    // TODO: Send email with reset link
    console.log("Password reset link:", resetUrl)
    
    return NextResponse.json({
      success: true,
      message: "If your email is registered, you will receive a password reset link",
      // Only include this in development
      ...(process.env.NODE_ENV === "development" && { resetUrl }),
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process request" },
      { status: 500 }
    )
  }
}
