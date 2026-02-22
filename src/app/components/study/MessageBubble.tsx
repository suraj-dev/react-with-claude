"use client";

/**
 * MessageBubble Component
 *
 * Module 2: Components, Props & Composition
 *
 * This component displays a single message in the chat interface.
 * You'll learn how to:
 * - Create a component with props
 * - Use TypeScript interfaces for type safety
 * - Apply conditional styling based on props
 */

import { Message } from "@/app/types/message";
import { cn } from "@/lib/utils";
import { formatDateTime } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
  variant: "user" | "assistant" | "system";
}

export function MessageBubble({ message, variant }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "max-w-[80%] rounded-lg p-4 shadow-sm",
        variant === "user" && "ml-auto bg-primary text-primary-foreground",
        variant === "assistant" && "mr-auto bg-muted text-muted-foreground",
        variant === "system" &&
          "mx-auto max-w-[60%] bg-accent text-center text-accent-foreground"
      )}
    >
      {/* Display the sender's name */}
      <p className="mb-1 text-sm font-semibold">
        {message.role.charAt(0).toUpperCase() + message.role.slice(1)}
      </p>

      {/* Display the message content */}
      <p className="mb-2 text-base">{message.content}</p>

      {/* Display the timestamp */}
      <p className="text-xs opacity-70">{formatDateTime(message.timestamp)}</p>
    </div>
  );

  /**
   * ALTERNATIVE IMPLEMENTATION (for reference):
   * You could also extract the styling logic into a separate function:
   *
   * const getVariantStyles = (variant: MessageBubbleProps['variant']) => {
   *   switch (variant) {
   *     case 'user':
   *       return 'bg-primary text-primary-foreground ml-auto';
   *     case 'assistant':
   *       return 'bg-muted text-muted-foreground mr-auto';
   *     case 'system':
   *       return 'bg-accent text-accent-foreground mx-auto text-center';
   *   }
   * };
   *
   * Then use it like: className={cn("rounded-lg p-4", getVariantStyles(variant))}
   */
}

/**
 * ✓ VERIFY: After completing this component:
 * - The component accepts message and variant props
 * - Different variants render with different styles
 * - Message role, content, and timestamp are all displayed
 * - No TypeScript errors
 * - Test with: <MessageBubble message={testMessage} variant="user" />
 */
