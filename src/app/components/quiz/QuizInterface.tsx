"use client";

/**
 * QuizInterface Component
 *
 * Module 6: Server vs Client Components
 *
 * This is a Client Component (note the "use client" directive above).
 * It demonstrates:
 * - When to use Client Components (interactivity, browser APIs)
 * - Managing quiz state
 * - Handling user interactions
 */

import { useState } from "react";
import { Quiz, QuizAnswer } from "@/app/types/quiz";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

interface QuizInterfaceProps {
  quiz: Quiz;
}

/**
 * TODO: Complete the QuizInterface component
 *
 * REQUIREMENTS:
 * 1. Track current question index
 * 2. Track user's answers
 * 3. Allow user to select an answer and move to next question
 * 4. Show results at the end
 * 5. Calculate score
 */
export function QuizInterface({ quiz }: QuizInterfaceProps) {
  // TODO: Add state for current question index
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // TODO: Add state for user answers
  // const [answers, setAnswers] = useState<QuizAnswer[]>([]);

  // TODO: Add state for quiz completion
  // const [isComplete, setIsComplete] = useState(false);

  // TODO: Get current question
  // const currentQuestion = quiz.questions[currentQuestionIndex];

  /**
   * TODO: Implement handleAnswerSelect function
   * - Record the user's answer
   * - Check if it's correct
   * - Move to next question or complete quiz
   */
  const handleAnswerSelect = (answerIndex: number) => {
    // Implementation here
  };

  /**
   * TODO: Calculate final score
   * - Count correct answers
   * - Calculate percentage
   * - Determine if user passed
   */
  const calculateScore = () => {
    // Implementation here
    return 0;
  };

  // TODO: Implement quiz complete view
  // Show score, pass/fail status, and option to retake

  // TODO: Implement current question view
  // Show question, answer options, progress

  return (
    <Card>
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* TODO: Render quiz interface */}
        <div className="text-center p-8 text-muted-foreground">
          <p>Quiz interface - Complete implementation in Module 6</p>
          <p className="text-sm mt-2">
            This will be a fully interactive Client Component
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * WHY IS THIS A CLIENT COMPONENT?
 *
 * This component MUST be a Client Component because it:
 * 1. Uses useState for interactivity
 * 2. Handles click events
 * 3. Updates UI based on user actions
 * 4. Maintains local state that changes frequently
 *
 * Server Components CAN'T:
 * - Use hooks (useState, useEffect, etc.)
 * - Handle browser events (onClick, onChange, etc.)
 * - Access browser APIs (localStorage, window, etc.)
 *
 * Server Components ARE BETTER for:
 * - Fetching data on the server
 * - Accessing databases or APIs directly
 * - Keeping sensitive code on the server
 * - Reducing client JavaScript bundle size
 */
