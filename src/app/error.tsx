"use client";

/**
 * Root Error Boundary
 *
 * Module 7: Layouts, Loading & Error States
 *
 * This component catches errors in the app and provides a user-friendly UI.
 * Must be a Client Component to use error handling features.
 */

import { useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <Alert variant="destructive">
          <AlertTitle className="text-lg font-semibold mb-2">
            Something went wrong!
          </AlertTitle>
          <AlertDescription>
            <p className="mb-4">
              We encountered an unexpected error. Don't worry, your data is safe.
            </p>
            {process.env.NODE_ENV === "development" && (
              <pre className="mt-4 text-xs bg-black/10 p-2 rounded overflow-auto">
                {error.message}
              </pre>
            )}
          </AlertDescription>
        </Alert>
        <div className="mt-6 flex gap-4">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * LEARNING NOTE: Error Boundaries
 * - Catches errors in child components
 * - Prevents the entire app from crashing
 * - Must be a Client Component
 * - reset() function attempts to re-render
 * - Use error.tsx at different levels for granular error handling
 */
