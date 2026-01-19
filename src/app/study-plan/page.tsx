/**
 * Study Plan Page
 *
 * Module 5: Next.js App Router & Routing
 *
 * Displays the user's personalized study plan.
 * This page demonstrates working with more complex data structures.
 */

import { mockStudyPlans } from "@/lib/data/study-plans";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { formatDate, calculatePercentage } from "@/lib/utils";

export default function StudyPlanPage() {
  // For this course, we'll use the first study plan
  // In a real app, this would be fetched based on the logged-in user
  const studyPlan = mockStudyPlans[0];

  if (!studyPlan) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">No Study Plan Yet</h1>
        <p className="text-muted-foreground mb-6">
          Create a personalized study plan to track your learning progress.
        </p>
        <Button>Create Study Plan</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{studyPlan.title}</h1>
        <p className="text-muted-foreground">{studyPlan.description}</p>

        {/* Progress Overview */}
        <div className="mt-4 flex gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Progress:</span>{" "}
            <span className="font-semibold">{studyPlan.overallProgress}%</span>
          </div>
          <div>
            <span className="text-muted-foreground">Created:</span>{" "}
            <span className="font-semibold">{formatDate(studyPlan.createdAt)}</span>
          </div>
          {studyPlan.targetCompletionDate && (
            <div>
              <span className="text-muted-foreground">Target:</span>{" "}
              <span className="font-semibold">
                {formatDate(studyPlan.targetCompletionDate)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* TODO: Add a progress bar visualization */}
      {/* HINT: Use a div with dynamic width based on overallProgress */}

      {/* Study Plan Items */}
      <div className="space-y-4">
        {studyPlan.items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-muted-foreground">
                      Step {item.order}
                    </span>
                    {/* TODO: Add a status badge */}
                    {/* HINT: Different colors for pending, in-progress, completed */}
                    <Badge
                      variant={
                        item.status === "completed"
                          ? "default"
                          : item.status === "in-progress"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <CardTitle>{item.topic?.title || "Loading..."}</CardTitle>
                  {item.topic && (
                    <CardDescription>{item.topic.description}</CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>

            {item.notes && (
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.notes}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

/**
 * ✓ VERIFY: After completing this page:
 * - Study plan displays with title and description
 * - All study plan items show in order
 * - Status badges display correctly
 * - Progress percentage is visible
 * - Dates are formatted properly
 * - Topic information displays for each item
 */
