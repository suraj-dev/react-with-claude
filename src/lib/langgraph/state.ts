/**
 * LangGraph State Definition
 *
 * Module 10: LangGraph AI Integration
 *
 * This file defines the state structure for the AI study assistant agent.
 * State is passed between nodes and updated throughout the workflow.
 */

import { Message } from "@/app/types/message";
import { Topic } from "@/app/types/topic";
import { Quiz } from "@/app/types/quiz";

/**
 * TODO: Define the AgentState interface
 *
 * The state should include:
 * - messages: Array of conversation messages
 * - currentTopic: Optional current topic being discussed
 * - userIntent: What the user wants to do (learn, quiz, plan, etc.)
 * - quizContext: Optional quiz being taken
 * - userKnowledge: Topics the user has already learned
 */
export interface AgentState {
  messages: Message[];
  // TODO: Add currentTopic field
  // currentTopic?: Topic;

  // TODO: Add userIntent field
  // This helps the agent know what the user wants to do
  // userIntent?: "learn" | "quiz" | "explain" | "plan" | "unknown";

  // TODO: Add quizContext for active quizzes
  // quizContext?: {
  //   quiz: Quiz;
  //   currentQuestionIndex: number;
  //   answers: number[];
  // };

  // TODO: Add userKnowledge to track learning progress
  // userKnowledge?: string[]; // Array of topic IDs the user knows
}

/**
 * LEARNING NOTE: Why define state explicitly?
 *
 * LangGraph is a state machine. Every node in the graph:
 * 1. Receives the current state
 * 2. Does some processing
 * 3. Returns updated state
 *
 * By defining state with TypeScript, you get:
 * - Type safety across all nodes
 * - Autocomplete in your editor
 * - Clear documentation of what data flows through the agent
 * - Compile-time error checking
 *
 * The state is the "memory" of your agent!
 */
