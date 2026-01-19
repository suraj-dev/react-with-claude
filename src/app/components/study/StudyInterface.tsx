"use client";

/**
 * StudyInterface Component
 *
 * Module 3: State Management with useState
 *
 * This component brings together ChatInput and MessageList,
 * demonstrating:
 * - Managing complex state
 * - Lifting state up to parent component
 * - Component composition
 * - Creating unique IDs for list items
 */

// TODO: Import useState hook
// import { useState } from "react";

import { Message } from "@/app/types/message";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./MessageList";

export function StudyInterface() {
  // TODO: Create state for messages array
  // HINT: const [messages, setMessages] = useState<Message[]>([]);
  // Initialize with an empty array

  // TODO: Optionally, add a welcome message to start
  // You can initialize with:
  // const [messages, setMessages] = useState<Message[]>([
  //   {
  //     id: "welcome",
  //     role: "system",
  //     content: "Welcome! Ask me anything about React, Next.js, or LangGraph.",
  //     timestamp: new Date(),
  //   },
  // ]);

  /**
   * TODO: Implement the handleSendMessage function
   *
   * This function should:
   * 1. Create a new user message object with:
   *    - Unique id (you can use Date.now().toString() or crypto.randomUUID())
   *    - role: "user"
   *    - content: the message text from the parameter
   *    - timestamp: current date/time
   * 2. Add the new message to the messages array
   * 3. Optionally, add a simulated assistant response
   *
   * HINT: Use the spread operator to add to array
   * EXAMPLE: setMessages([...messages, newMessage]);
   * OR: setMessages((prev) => [...prev, newMessage]);
   */
  const handleSendMessage = (content: string) => {
    // TODO: Create the user message object
    // const userMessage: Message = {
    //   id: crypto.randomUUID(), // or Date.now().toString()
    //   role: "user",
    //   content,
    //   timestamp: new Date(),
    // };

    // TODO: Add user message to state
    // setMessages((prevMessages) => [...prevMessages, userMessage]);

    // OPTIONAL: Simulate an assistant response after a short delay
    // setTimeout(() => {
    //   const assistantMessage: Message = {
    //     id: crypto.randomUUID(),
    //     role: "assistant",
    //     content: "Thanks for your question! In Module 10, you'll learn how to connect this to a real AI using LangGraph.",
    //     timestamp: new Date(),
    //   };
    //   setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    // }, 1000);
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="border-b px-4 py-3 bg-muted/50">
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
      <div className="border-t p-4 bg-background">
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
