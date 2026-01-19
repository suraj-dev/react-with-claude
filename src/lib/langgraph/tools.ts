/**
 * LangGraph Tools
 *
 * Module 10: LangGraph AI Integration
 *
 * Tools are functions that the AI agent can call to perform actions
 * or retrieve information. They extend the agent's capabilities.
 */

import { getTopicById, mockTopics } from "@/lib/data/topics";
import { getQuizByTopicId } from "@/lib/data/quizzes";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

/**
 * TODO: Create a tool to search for topics
 *
 * This tool allows the AI to find relevant topics based on keywords.
 *
 * REQUIREMENTS:
 * - Accept a search query
 * - Search through topic titles and descriptions
 * - Return matching topics
 */
export const searchTopicsTool = new DynamicStructuredTool({
  name: "search_topics",
  description:
    "Search for learning topics by keyword. Returns topics matching the query.",
  schema: z.object({
    query: z.string().describe("The search query"),
  }),
  func: async ({ query }) => {
    // TODO: Implement topic search
    // Filter mockTopics based on query
    // Search in title and description
    // Return formatted results

    const results = mockTopics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query.toLowerCase()) ||
        topic.description.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
      return "No topics found matching your query.";
    }

    return JSON.stringify(
      results.map((t) => ({
        id: t.id,
        title: t.title,
        difficulty: t.difficulty,
      }))
    );
  },
});

/**
 * TODO: Create a tool to get topic details
 */
export const getTopicDetailsTool = new DynamicStructuredTool({
  name: "get_topic_details",
  description:
    "Get detailed information about a specific topic by its ID.",
  schema: z.object({
    topicId: z.string().describe("The ID of the topic"),
  }),
  func: async ({ topicId }) => {
    const topic = getTopicById(topicId);

    if (!topic) {
      return "Topic not found.";
    }

    return JSON.stringify({
      title: topic.title,
      description: topic.description,
      difficulty: topic.difficulty,
      estimatedMinutes: topic.estimatedMinutes,
      prerequisites: topic.prerequisites,
      resourceCount: topic.resources.length,
    });
  },
});

/**
 * TODO: Create a tool to get quiz for a topic
 */
export const getQuizTool = new DynamicStructuredTool({
  name: "get_quiz",
  description:
    "Get a quiz for a specific topic to test knowledge.",
  schema: z.object({
    topicId: z.string().describe("The ID of the topic to quiz on"),
  }),
  func: async ({ topicId }) => {
    const quiz = getQuizByTopicId(topicId);

    if (!quiz) {
      return "No quiz available for this topic.";
    }

    return JSON.stringify({
      id: quiz.id,
      title: quiz.title,
      questionCount: quiz.questions.length,
      passingScore: quiz.passingScore,
    });
  },
});

/**
 * TODO: Create a tool to check prerequisites
 */
export const checkPrerequisitesTool = new DynamicStructuredTool({
  name: "check_prerequisites",
  description:
    "Check if prerequisites are met for a topic based on user's knowledge.",
  schema: z.object({
    topicId: z.string().describe("The topic to check prerequisites for"),
    userKnowledge: z
      .array(z.string())
      .describe("Array of topic IDs the user already knows"),
  }),
  func: async ({ topicId, userKnowledge }) => {
    const topic = getTopicById(topicId);

    if (!topic) {
      return "Topic not found.";
    }

    if (topic.prerequisites.length === 0) {
      return "No prerequisites required for this topic.";
    }

    const unmetPrereqs = topic.prerequisites.filter(
      (prereq) => !userKnowledge.includes(prereq)
    );

    if (unmetPrereqs.length === 0) {
      return "All prerequisites met! Ready to learn this topic.";
    }

    const prereqTopics = unmetPrereqs
      .map((id) => getTopicById(id))
      .filter(Boolean);

    return JSON.stringify({
      ready: false,
      unmetPrerequisites: prereqTopics.map((t) => ({
        id: t!.id,
        title: t!.title,
      })),
      message: "Complete these topics first before learning this one.",
    });
  },
});

/**
 * Export all tools as an array
 */
export const studyAssistantTools = [
  searchTopicsTool,
  getTopicDetailsTool,
  getQuizTool,
  checkPrerequisitesTool,
];

/**
 * ✓ VERIFY: After creating tools:
 * - Each tool has a clear name and description
 * - Schema validation works with Zod
 * - Tools return string or JSON string
 * - Error cases are handled
 *
 * LEARNING NOTE: Why Tools?
 *
 * LLMs alone can't:
 * - Access your database
 * - Look up current information
 * - Perform calculations
 * - Call external APIs
 *
 * Tools give the AI agent "hands" to interact with your application.
 * The AI decides WHEN to use tools, you define WHAT they do.
 *
 * Think of tools as the agent's superpowers!
 */
