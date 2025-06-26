"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Logo from "@/components/common/Logo";
import { AlertCircle, LogInIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth-context";
import { debugCookies, setCookie } from "@/lib/client-cookies";

export default function Page() {
  const router = useRouter();
  const { login, loading, error } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [localError, setLocalError] = useState("");

  // Debug cookies on component mount
  useEffect(() => {
    // console.log("Login page mounted");
    debugCookies();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (localError) setLocalError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");

    try {
      // console.log("Submitting login form:", form);

      // Make the login request directly to debug
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
        credentials: "include", // Important for cookies
      });

      const data = await response.json();
      // console.log("Login response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Check if we can access the cookie (for debugging)
      // console.log("Cookies after login:", document.cookie);

      // Set a client-side cookie for testing
      setCookie("client-auth-token", data.user.id, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      // Debug cookies after setting
      debugCookies();

      // Redirect to dashboard
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      // console.error("Login error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full px-4">
      <div className="w-full border border-[var(--border)] p-4 bg-[var(--card-background)] rounded-[12px] max-w-[400px]">
        <header className="flex justify-center items-center flex-col w-full">
          <h1 className="mt-4 text-2xl font-bold">Login</h1>
        </header>
        <form className="bg-[var(--card-background)]" onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {(error || localError) && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error || localError}</AlertDescription>
              </Alert>
            )}
            <div>
              <Label className="text-[var(--paragraph)]" htmlFor="username">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="username"
              />
            </div>
            <div>
              <Label className="text-[var(--paragraph)]" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
              <div className="mt-2 text-right">
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-[var(--link)] hover:text-[var(--link-hover)] transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              icon={<LogInIcon />}
              type="submit"
              className="w-full flex-row-reverse"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </div>
    </div>
  );
}
