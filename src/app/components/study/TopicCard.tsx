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

interface TopicCardProps {
  topic: Topic;
  onStartLearning?: () => void;
}
export function TopicCard({ topic, onStartLearning }: TopicCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle>{topic.title}</CardTitle>
        <CardDescription>{topic.description}</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-4 flex gap-2">
          <Badge variant="secondary">{topic.difficulty}</Badge>
          <Badge variant="outline">{topic.category}</Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Estimated time: {formatDuration(topic.estimatedMinutes)}
        </p>

        <p className="text-sm text-muted-foreground">
          {topic.resources.length} resources available
        </p>
      </CardContent>

      <CardFooter>
        <Button onClick={onStartLearning} className="w-full">
          Start Learning
        </Button>
      </CardFooter>
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
