"use client";

/**
 * MessageList Component
 *
 * Module 3: State Management with useState
 *
 * This component demonstrates:
 * - Managing a list in state
 * - Rendering lists with map()
 * - Passing props to child components
 */

import { Message } from "@/app/types/message";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
}

/**
 * TODO: Complete the MessageList component
 *
 * REQUIREMENTS:
 * 1. Render all messages using the map() method
 * 2. Use MessageBubble component for each message
 * 3. Determine variant based on message.role
 * 4. Add proper key prop for each message
 * 5. Handle empty state (no messages)
 */
export function MessageList({ messages }: MessageListProps) {
  // TODO: Check if there are no messages and show a placeholder
  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-center p-8">
        <div className="text-muted-foreground">
          <p className="text-lg font-medium mb-2">No messages yet</p>
          <p className="text-sm">
            Start a conversation to begin learning!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* TODO: Map over messages array and render MessageBubble for each */}
      {/* HINT: messages.map((message) => (...)) */}
      {/* REQUIREMENTS:
        - Use message.id as the key prop
        - Pass message to MessageBubble
        - Determine variant based on message.role:
          - "user" -> variant="user"
          - "assistant" -> variant="assistant"
          - "system" -> variant="system"
      */}

      {/* EXAMPLE STRUCTURE:
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            variant={
              message.role === "user"
                ? "user"
                : message.role === "assistant"
                ? "assistant"
                : "system"
            }
          />
        ))}
      */}

      {/* TODO: Uncomment and complete the mapping code above */}
    </div>
  );
}

/**
 * ✓ VERIFY: After completing this component:
 * - Empty state shows when there are no messages
 * - All messages render correctly
 * - Each MessageBubble has the correct variant
 * - No "key" prop warnings in console
 * - Messages are styled according to their role
 *
 * TEST IT:
 * Create test messages and pass them:
 * const testMessages: Message[] = [
 *   { id: "1", role: "user", content: "Hello!", timestamp: new Date() },
 *   { id: "2", role: "assistant", content: "Hi! How can I help?", timestamp: new Date() },
 * ];
 * <MessageList messages={testMessages} />
 */

/**
 * LEARNING NOTE: Why do we need keys?
 *
 * React uses keys to identify which items have changed, been added, or removed.
 * Keys should be:
 * - Stable (don't change between renders)
 * - Unique (among siblings)
 * - Not index-based (unless list never reorders)
 *
 * Good: key={message.id}
 * Bad: key={index} (can cause bugs when list changes)
 */
