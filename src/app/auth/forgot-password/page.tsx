"use client";

import { useState } from "react";
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

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add your password reset logic here (e.g., API call)
      console.log("Sending password reset request for email:", email);
      // await sendPasswordResetRequest(email);
      setMessage("A password reset link has been sent to your email.");
    } catch (error) {
      console.error("Error sending reset email:", error);
      setMessage(
        "There was an error processing your request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="flex justify-center items-center flex-col w-full">
          <Logo />
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
        </CardHeader>
        <form className="bg-[var(--card-background)]" onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-[var(--paragraph)]" htmlFor="email">
                Admin Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
            {message && (
              <p className="mt-4 text-center text-sm text-[var(--paragraph)]">
                {message}
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
