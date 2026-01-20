/**
 * Home Page - AI Study Assistant
 *
 * Module 1: Introduction to React & Project Setup
 *
 * In this module, you'll create your first React component and learn about JSX.
 * This page serves as the entry point to the application.
 */

import { MessageBubble } from "./components/study/MessageBubble";

export default function Home() {
  // TODO: Create a welcome message for users
  // HINT: You can use regular JavaScript variables and display them using JSX
  // EXAMPLE: const welcomeText = "Welcome to AI Study Assistant";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold">AI Study Assistant</h1>

        <p className="mb-8 text-lg text-muted-foreground">
          Learn React, Next.js, and LangGraph through hands-on practice
        </p>

        <Welcome name="Student" course="React & Next.js" />
      </div>
    </main>
  );
}

interface WelcomeProps {
  name: string;
  course?: string;
}

function Welcome({ name, course = "React" }: WelcomeProps) {
  return (
    <div className="rounded-lg bg-primary/10 p-6">
      <p className="text-xl">
        Hello, {name}! Ready to learn {course}?
      </p>
      <MessageBubble
        message={{
          id: "1",
          role: "user",
          content: "Welcome to the AI Study Assistant course!",
          timestamp: new Date(),
        }}
        variant="user"
      />
      <MessageBubble
        message={{
          id: "2",
          role: "assistant",
          content: "Welcome to the AI Study Assistant course!",
          timestamp: new Date(),
        }}
        variant="assistant"
      />
      <MessageBubble
        message={{
          id: "3",
          role: "system",
          content: "Welcome to the AI Study Assistant course!",
          timestamp: new Date(),
        }}
        variant="system"
      />
    </div>
  );
}

/**
 * ✓ VERIFY: After completing this module, you should see:
 * - A heading with "AI Study Assistant"
 * - A description of the app
 * - Your Welcome component displaying a greeting
 * - No TypeScript errors
 * - Proper styling with Tailwind CSS
 */
