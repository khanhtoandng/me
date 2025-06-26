import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// Secret key for JWT signing - use a strong, consistent secret
const secretKey = "alshaer-portfolio-admin-dashboard-secret-key-2024";
const key = new TextEncoder().encode(secretKey);

// Token expiration (24 hours)
const tokenExpiration = "24h";

/**
 * Sign a JWT token with user data
 */
export async function signToken(payload) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(tokenExpiration)
      .sign(key);

    return token;
  } catch (error) {
    // console.error("Error signing token:", error);
    throw new Error("Failed to sign token");
  }
}

/**
 * Verify a JWT token
 */
export async function verifyToken(token) {
  try {
    // console.log("Verifying token:", token.substring(0, 20) + "...");
    const { payload } = await jwtVerify(token, key);
    // console.log("Token verified successfully, payload:", payload);

    // Ensure the ID is a string
    if (payload.id) {
      payload.id = String(payload.id);
    }

    return payload;
  } catch (error) {
    // console.error("Error verifying token:", error.message);
    return null;
  }
}

/**
 * Set authentication cookie
 */
export function setAuthCookie(token) {
  try {
    // Get the current cookies
    const cookieStore = cookies();

    // Set the cookie
    cookieStore.set({
      name: "auth-token",
      value: token,
      httpOnly: false, // Set to false to allow client-side access for debugging
      path: "/",
      secure: false, // Set to false for local development
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax", // Use lax to allow redirects
    });

    console.log("Auth cookie set successfully");
  } catch (error) {
    console.error("Error setting auth cookie:", error);
    throw error;
  }
}

/**
 * Clear authentication cookie
 */
export function clearAuthCookie() {
  try {
    console.log("Clearing auth cookie");

    // Get the current cookies
    const cookieStore = cookies();

    // Clear the cookie
    cookieStore.set({
      name: "auth-token",
      value: "",
      httpOnly: false,
      path: "/",
      secure: false,
      maxAge: 0, // Expire immediately
      sameSite: "lax",
    });

    console.log("Auth cookie cleared successfully");
  } catch (error) {
    console.error("Error clearing auth cookie:", error);
    throw error;
  }
}

/**
 * Get current user from token
 */
export async function getCurrentUser() {
  const token = cookies().get("auth-token")?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token);
    return payload;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

/**
 * Middleware to protect routes
 */
export async function authMiddleware(request) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  try {
    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}
