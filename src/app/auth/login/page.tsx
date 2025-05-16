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
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Add authentication logic here (e.g., API call)
      console.log("Logging in with:", form);
      // await loginAdmin(form.username, form.password);
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-xl ">
        <CardHeader className="flex justify-center items-center flex-col w-full">
          <Logo />
        </CardHeader>
        <form className="bg-[var(--card-background)]" onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
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
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
