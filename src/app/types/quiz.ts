/**
 * Quiz question with multiple choice answers
 */
export interface QuizQuestion {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string; // Explanation shown after answering
  difficulty: "easy" | "medium" | "hard";
}

/**
 * Complete quiz for a topic
 */
export interface Quiz {
  id: string;
  topicId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number; // Percentage needed to pass (e.g., 70)
}

/**
 * User's answer to a quiz question
 */
export interface QuizAnswer {
  questionId: string;
  selectedAnswerIndex: number;
  isCorrect: boolean;
  answeredAt: Date;
}

/**
 * Complete quiz attempt with results
 */
export interface QuizAttempt {
  id: string;
  quizId: string;
  answers: QuizAnswer[];
  score: number; // Percentage (0-100)
  passed: boolean;
  completedAt: Date;
  timeSpentSeconds: number;
}
