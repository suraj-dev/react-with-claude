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
  // TODO: Add a 'variant' prop that determines the message styling
  // HINT: variant should accept "user" | "assistant" | "system"
  // This will let us style messages differently based on who sent them
}

/**
 * TODO: Update the function signature to include the variant prop
 * EXAMPLE: export function MessageBubble({ message, variant }: MessageBubbleProps)
 */
export function MessageBubble({ message }: MessageBubbleProps) {
  // TODO: Destructure the variant prop from the props parameter above

  /**
   * TODO: Implement conditional styling based on variant
   *
   * REQUIREMENTS:
   * - "user" messages should have:
   *   - bg-primary text-primary-foreground
   *   - ml-auto (aligned to the right)
   *   - max-w-[80%]
   *
   * - "assistant" messages should have:
   *   - bg-muted text-muted-foreground
   *   - mr-auto (aligned to the left)
   *   - max-w-[80%]
   *
   * - "system" messages should have:
   *   - bg-accent text-accent-foreground
   *   - mx-auto text-center
   *   - max-w-[60%]
   *
   * HINT: Use the cn() utility function to combine classes conditionally
   * EXAMPLE: cn("base-class", variant === "user" && "user-specific-class")
   */

  return (
    <div
      className={cn(
        "rounded-lg p-4 shadow-sm",
        // TODO: Add conditional classes based on variant here
        // variant === "user" && "...",
        // variant === "assistant" && "...",
        // variant === "system" && "...",
      )}
    >
      {/* Display the sender's name */}
      <p className="text-sm font-semibold mb-1">
        {/* TODO: Display message.role with proper capitalization */}
        {/* HINT: message.role.charAt(0).toUpperCase() + message.role.slice(1) */}
      </p>

      {/* Display the message content */}
      <p className="text-base mb-2">
        {/* TODO: Display message.content */}
      </p>

      {/* Display the timestamp */}
      <p className="text-xs opacity-70">
        {/* TODO: Display formatted timestamp */}
        {/* HINT: Use formatDateTime(message.timestamp) */}
      </p>
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
