/**
 * Topic Detail Page
 *
 * Module 5: Next.js App Router & Routing
 *
 * This page shows detailed information about a specific topic.
 * Demonstrates:
 * - Dynamic routes with [id] parameter
 * - Accessing route parameters
 * - Server Component data fetching
 * - 404 handling with notFound()
 */

import { notFound } from "next/navigation";
import { getTopicById } from "@/lib/data/topics";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { formatDuration } from "@/lib/utils";

/**
 * TODO: Define the PageProps type
 * In Next.js App Router, page components receive props with params
 *
 * HINT:
 * interface PageProps {
 *   params: Promise<{ id: string }>;
 * }
 */

/**
 * TODO: Update the function signature to accept props and be async
 * EXAMPLE: export default async function TopicDetailPage({ params }: PageProps)
 */
export default async function TopicDetailPage() {
  // TODO: Await and destructure the id from params
  // HINT: const { id } = await params;

  // TODO: Uncomment this after getting the id
  // const topic = getTopicById(id);

  // TODO: If topic is not found, call notFound()
  // if (!topic) {
  //   notFound();
  // }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* TODO: Display topic information */}
      {/* Use topic.title, topic.description, topic.difficulty, etc. */}

      {/* Header Section */}
      <div className="mb-8">
        {/* TODO: Add topic title as h1 */}
        {/* TODO: Add badges for difficulty and category */}
        {/* TODO: Show estimated time */}
      </div>

      {/* Description */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>About This Topic</CardTitle>
        </CardHeader>
        <CardContent>
          {/* TODO: Display topic.description */}
        </CardContent>
      </Card>

      {/* Prerequisites */}
      {/* TODO: Show prerequisites if topic.prerequisites.length > 0 */}

      {/* Resources */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Learning Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* TODO: Map over topic.resources and display each resource */}
            {/* Show resource title, type (as badge), and description */}
            {/* Make title a link to resource.url */}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button size="lg">Start Learning</Button>
        <Button size="lg" variant="outline">
          Take Quiz
        </Button>
      </div>
    </div>
  );
}

/**
 * ✓ VERIFY: After completing this page:
 * - Navigating to /topics/react-basics shows React topic details
 * - All topic information is displayed correctly
 * - Prerequisites section appears when applicable
 * - Resources are listed with working links
 * - Invalid topic IDs (e.g., /topics/invalid) show 404 page
 * - Difficulty and category badges display
 *
 * LEARNING NOTE: Dynamic Routes
 * - Folder name [id] makes this a dynamic route
 * - Any URL like /topics/anything will match
 * - The "anything" part is accessible via params.id
 * - You can have multiple dynamic segments: [category]/[id]
 */
