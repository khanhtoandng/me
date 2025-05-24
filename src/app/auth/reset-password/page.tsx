"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing reset token");
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: form.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }
      
      setSuccess(true);
      toast.success("Password reset successful!");
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error) {
      console.error("Reset password error:", error);
      setError(error instanceof Error ? error.message : "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex justify-center items-center flex-col w-full">
          <Logo />
          <CardTitle className="mt-4 text-2xl font-bold">Reset Password</CardTitle>
          <CardDescription className="text-center mt-2">
            Enter your new password below
          </CardDescription>
        </CardHeader>
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
                  Your password has been reset successfully. Redirecting to login page...
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div>
                  <Label className="text-[var(--paragraph)]" htmlFor="password">
                    New Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your new password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    disabled={!token}
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <Label className="text-[var(--paragraph)]" htmlFor="confirmPassword">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={!token}
                    autoComplete="new-password"
                  />
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            {!success && (
              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading || !token || form.password.length < 8}
              >
                {loading ? "Resetting..." : "Reset Password"}
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
      </Card>
    </div>
  );
}
