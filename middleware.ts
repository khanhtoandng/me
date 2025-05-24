import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { verifyToken } from "./src/lib/auth";

const locales = ["en", "ar"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const locale = matchLocale(languages, locales, defaultLocale);

  return locale;
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle authentication for dashboard routes - this needs to happen before locale handling
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    const token = request.cookies.get("auth-token")?.value;

    if (!token) {
      console.log("No auth token found, redirecting to login");
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    try {
      const payload = await verifyToken(token);

      if (!payload) {
        console.log("Invalid token, redirecting to login");
        return NextResponse.redirect(new URL("/auth/login", request.url));
      }

      // Token is valid, continue to dashboard
      console.log("Valid token, allowing access to dashboard");
    } catch (error) {
      console.error("Auth middleware error:", error);
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Handle localization after auth check
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|favicon.ico).*)",
    // Include dashboard routes for auth protection
    "/dashboard",
    "/dashboard/:path*",
    // Include auth routes
    "/auth/:path*",
  ],
};
