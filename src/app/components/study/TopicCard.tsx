/**
 * TopicCard Component
 *
 * Module 2: Components, Props & Composition
 *
 * This component displays information about a learning topic.
 * You'll practice component composition using Card sub-components.
 */

import { Topic } from "@/app/types/topic";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { formatDuration } from "@/lib/utils";

// TODO: Define the TopicCardProps interface
// HINT: It should have:
// - topic: Topic
// - onStartLearning?: () => void (optional callback for when user clicks "Start Learning")

interface TopicCardProps {
  topic: Topic;
  // TODO: Add the onStartLearning optional prop
}

/**
 * TODO: Complete the TopicCard component
 *
 * REQUIREMENTS:
 * 1. Use the Card component and its sub-components (CardHeader, CardContent, etc.)
 * 2. Display the topic title in CardTitle
 * 3. Display the topic description in CardDescription
 * 4. Show badges for difficulty and category
 * 5. Display the estimated time
 * 6. Add a "Start Learning" button that calls onStartLearning when clicked
 */
export function TopicCard({ topic }: TopicCardProps) {
  // TODO: Destructure onStartLearning from props

  return (
    <Card className="hover:shadow-lg transition-shadow">
      {/* TODO: Add CardHeader with CardTitle and CardDescription */}
      {/* EXAMPLE:
        <CardHeader>
          <CardTitle>{topic.title}</CardTitle>
          <CardDescription>{topic.description}</CardDescription>
        </CardHeader>
      */}

      <CardContent>
        {/* TODO: Display badges for difficulty and category */}
        {/* HINT: Use flex gap-2 to space them out */}
        <div className="flex gap-2 mb-4">
          {/* TODO: Add a Badge for difficulty */}
          {/* EXAMPLE: <Badge variant="secondary">{topic.difficulty}</Badge> */}

          {/* TODO: Add a Badge for category */}
          {/* EXAMPLE: <Badge variant="outline">{topic.category}</Badge> */}
        </div>

        {/* TODO: Display estimated time */}
        <p className="text-sm text-muted-foreground">
          {/* HINT: Use formatDuration(topic.estimatedMinutes) */}
          {/* EXAMPLE: Estimated time: {formatDuration(topic.estimatedMinutes)} */}
        </p>

        {/* TODO: Display number of resources */}
        {/* HINT: topic.resources.length */}
      </CardContent>

      {/* TODO: Add CardFooter with a "Start Learning" button */}
      {/* EXAMPLE:
        <CardFooter>
          <Button
            onClick={onStartLearning}
            className="w-full"
          >
            Start Learning
          </Button>
        </CardFooter>
      */}
    </Card>
  );
}

/**
 * ✓ VERIFY: After completing this component:
 * - Card displays topic title and description
 * - Badges show difficulty and category
 * - Estimated time is formatted and displayed
 * - "Start Learning" button appears and is clickable
 * - Component is properly typed with TypeScript
 * - Hover effect shows shadow animation
 *
 * TEST IT:
 * Import a topic from mock data and render:
 * <TopicCard
 *   topic={mockTopics[0]}
 *   onStartLearning={() => console.log('Started learning!')}
 * />
 */
