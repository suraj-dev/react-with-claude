"use client";

import { Message } from "@/app/types/message";
import { MessageBubble } from "./MessageBubble";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center">
        <div className="text-muted-foreground">
          <p className="mb-2 text-lg font-medium">No messages yet</p>
          <p className="text-sm">Start a conversation to begin learning!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          variant={message.role || "system"}
        ></MessageBubble>
      ))}
    </div>
  );
}
