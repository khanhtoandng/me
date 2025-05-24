"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialCheckDone, setInitialCheckDone] = useState<boolean>(false);

  // Check if user is authenticated on initial load
  useEffect(() => {
    const initialCheck = async () => {
      try {
        await checkAuth();
      } finally {
        setInitialCheckDone(true);
        setLoading(false);
      }
    };

    initialCheck();
  }, []);

  // Redirect unauthenticated users away from protected routes
  useEffect(() => {
    if (initialCheckDone && !loading) {
      const isProtectedRoute = pathname.startsWith("/dashboard");
      const isAuthRoute = pathname.startsWith("/auth");

      // Use setTimeout to avoid setState during render
      setTimeout(() => {
        if (isProtectedRoute && !user) {
          router.push("/auth/login");
        } else if (isAuthRoute && user) {
          router.push("/dashboard");
        }
      }, 0);
    }
  }, [initialCheckDone, loading, user, pathname, router]);

  const checkAuth = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success && data.user) {
          setUser(data.user);
          return true;
        } else {
          setUser(null);
          return false;
        }
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error("Auth check error:", error);
      setUser(null);
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setUser(data.user);
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again."
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setUser(null);
        toast.success("Logged out successfully");
        router.push("/auth/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
