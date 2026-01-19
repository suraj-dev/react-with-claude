/**
 * Message type for chat interface
 * Used in the study assistant conversation
 */
export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

/**
 * Helper type for message creation
 */
export type CreateMessageInput = Omit<Message, "id" | "timestamp">;
