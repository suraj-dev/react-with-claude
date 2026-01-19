/**
 * Topic Detail Loading State
 *
 * Module 7: Layouts, Loading & Error States
 *
 * Nested loading state specific to the topic detail page.
 * Demonstrates how loading states can be scoped to specific routes.
 */

import { Skeleton } from "@/app/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/app/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header skeleton */}
      <div className="mb-8 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-4 w-32" />
      </div>

      {/* Description card skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6" />
        </CardContent>
      </Card>

      {/* Resources card skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>

      {/* Action buttons skeleton */}
      <div className="flex gap-4">
        <Skeleton className="h-11 w-40" />
        <Skeleton className="h-11 w-32" />
      </div>
    </div>
  );
}

/**
 * LEARNING NOTE: Nested Loading States
 * - This loading.tsx only affects /topics/[id]
 * - More specific than root loading.tsx
 * - Provides contextual loading experience
 * - Skeleton UI mimics the actual content layout
 */
