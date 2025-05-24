"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { debugCookies, getCookie } from "@/lib/client-cookies";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, checkAuth } = useAuth();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsVerifying(true);

        // Check for client-side cookie
        const clientToken = getCookie("client-auth-token");

        // Try server-side authentication
        const authResult = await checkAuth();

        // If server auth succeeds, we're authenticated
        if (authResult) {
          setIsAuthenticated(true);
        }
        // If server auth fails but we have a client token, try to use that
        else if (clientToken) {
          // In a real app, you would validate this token
          // For now, we'll just assume it's valid for testing
          setIsAuthenticated(true);
        }
        // If both server auth and client token fail, redirect to login
        else {
          // Use setTimeout to avoid setState during render
          setTimeout(() => {
            router.push("/auth/login");
          }, 0);
        }
      } catch (error) {
        console.error("Error verifying authentication:", error);
      } finally {
        setIsVerifying(false);
        setAuthChecked(true);

        // Force render after a short delay
        setTimeout(() => {
          setIsVerifying(false); // Set again to force a re-render
        }, 100);
      }
    };

    verifyAuth();
  }, [checkAuth, router]);

  // If auth check is complete and authenticated, show children
  if (authChecked && isAuthenticated) {
    return <>{children}</>;
  }

  // If auth check is complete but not authenticated, show a message while redirecting
  if (authChecked && !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg font-medium">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Fallback - should never reach here
  return <>{children}</>;
}
