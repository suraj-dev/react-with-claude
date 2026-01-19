/**
 * Root Loading UI
 *
 * Module 7: Layouts, Loading & Error States
 *
 * This file provides a loading state for the entire application.
 * Next.js automatically shows this while pages are loading.
 */

import { Skeleton } from "@/app/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}

/**
 * LEARNING NOTE: loading.tsx
 * - Automatically shown during navigation
 * - Works with Suspense under the hood
 * - Shows while Server Components are rendering
 * - Provides instant feedback to users
 */
