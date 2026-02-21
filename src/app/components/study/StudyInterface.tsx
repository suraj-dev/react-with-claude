"use client";

import { Message } from "@/app/types/message";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";
import { useState } from "react";

export function StudyInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate an assistant response after a short delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Thanks for your question! In Module 10, you'll learn how to connect this to a real AI using LangGraph.",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-[600px] flex-col overflow-hidden rounded-lg border">
      {/* Header */}
      <div className="border-b bg-muted/50 px-4 py-3">
        <h2 className="font-semibold">Study Assistant Chat</h2>
        <p className="text-sm text-muted-foreground">
          Ask questions and get help with your learning
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {/* TODO: Render MessageList component and pass messages */}
        {/* EXAMPLE: <MessageList messages={messages} /> */}
      </div>

      {/* Input Area */}
      <div className="border-t bg-background p-4">
        {/* TODO: Render ChatInput component and pass handleSendMessage */}
        {/* EXAMPLE: <ChatInput onSendMessage={handleSendMessage} /> */}
      </div>
    </div>
  );
}

/**
 * ✓ VERIFY: After completing this component:
 * - Initial welcome message appears (if you added one)
 * - Typing and sending a message adds it to the list
 * - User messages appear on the right with correct styling
 * - Assistant responses appear on the left (if implemented)
 * - Messages persist during the component's lifecycle
 * - No errors in console
 * - Scroll works when many messages are added
 *
 * TEST IT:
 * Add <StudyInterface /> to a page and:
 * 1. Send several messages
 * 2. Check that they appear in order
 * 3. Verify styling is correct for each role
 * 4. Check that input clears after sending
 */

/**
 * LEARNING NOTE: State Management Principles
 *
 * 1. "Lifting State Up": Messages state lives in StudyInterface because
 *    both MessageList (displays) and ChatInput (adds) need access to it.
 *
 * 2. Immutability: We use spread operator [...messages, newMessage]
 *    instead of push() to create a new array. This is required for React
 *    to detect changes.
 *
 * 3. Functional Updates: setMessages((prev) => [...prev, newMessage])
 *    is safer than setMessages([...messages, newMessage]) when the new
 *    state depends on the previous state.
 *
 * You'll use these patterns throughout your React development!
 */
