"use client";

import { useState } from "react";
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
  CardDescription,
} from "@/components/ui/card";
import Logo from "@/components/common/Logo";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to process request");
      }

      setSuccess(true);
      toast.success("Password reset email sent!");
    } catch (error) {
      console.error("Forgot password error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to process request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  items-center justify-center min-h-screen w-full px-4">
      <form className="w-full border border-[var(--border)] p-4 bg-[var(--card-background)] rounded-[12px] max-w-[400px]">
        <header className="flex justify-center items-center flex-col w-full">
          <h1 className="mt-4 text-2x  font-bold">Forgot password</h1>
        </header>
        <form className="bg-[var(--card-background)]" onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success ? (
              <Alert className="bg-green-50 border-green-200 text-green-800">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <AlertDescription>
                  If your email is registered, you will receive a password reset
                  link shortly.
                </AlertDescription>
              </Alert>
            ) : (
              <div>
                <Label className="text-[var(--paragraph)]" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {!success && (
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            )}
            <Link
              href="/auth/login"
              className="flex items-center justify-center text-sm text-[var(--link)] hover:text-[var(--link-hover)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Login
            </Link>
          </CardFooter>
        </form>
      </form>
    </div>
  );
}
