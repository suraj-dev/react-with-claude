/**
 * Topics List Page
 *
 * Module 5: Next.js App Router & Routing
 *
 * This page displays all available learning topics.
 * Demonstrates:
 * - Server Components (this is a Server Component by default)
 * - Data fetching on the server
 * - Rendering lists
 * - Navigation with Link component
 */

import { mockTopics } from "@/lib/data/topics";
import { TopicCard } from "@/app/components/study/TopicCard";

/**
 * TODO: Import Link from Next.js
 * HINT: import Link from "next/link";
 * This will be used to navigate to individual topic pages
 */

export default function TopicsPage() {
  // In a real app, you'd fetch this data from an API or database
  // For now, we're using mock data
  const topics = mockTopics;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Learning Topics</h1>
        <p className="text-muted-foreground">
          Explore topics and start your learning journey
        </p>
      </div>

      {/* TODO: Implement a grid layout for topic cards */}
      {/* HINT: Use grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          // TODO: Wrap each TopicCard in a Link component
          // The link should navigate to /topics/[topic.id]
          // EXAMPLE:
          // <Link key={topic.id} href={`/topics/${topic.id}`}>
          //   <TopicCard topic={topic} />
          // </Link>
          <TopicCard
            key={topic.id}
            topic={topic}
            onStartLearning={() => {
              // TODO: In Module 5, replace this with navigation
              // For now, just log to console
              console.log(`Starting to learn: ${topic.title}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * ✓ VERIFY: After completing this page:
 * - All topics display in a responsive grid
 * - Cards show topic information correctly
 * - Clicking a topic card navigates to its detail page (Module 5)
 * - Page loads quickly (Server Component benefit)
 * - No hydration errors
 *
 * LEARNING NOTE: This is a Server Component!
 * - It runs only on the server
 * - Data is fetched on the server
 * - HTML is sent to the client
 * - No JavaScript needed for initial render
 * - Better performance and SEO
 */
