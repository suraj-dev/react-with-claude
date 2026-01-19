import { Topic } from "@/app/types/topic";

/**
 * Mock learning topics for the AI Study Assistant
 * These topics cover React, Next.js, TypeScript, and LangGraph concepts
 */
export const mockTopics: Topic[] = [
  {
    id: "react-basics",
    title: "React Fundamentals",
    description:
      "Learn the core concepts of React including components, JSX, and the virtual DOM.",
    category: "react",
    difficulty: "beginner",
    estimatedMinutes: 45,
    prerequisites: [],
    resources: [
      {
        title: "Official React Documentation",
        type: "documentation",
        url: "https://react.dev/learn",
        description: "The official React documentation and tutorial",
      },
      {
        title: "React in 100 Seconds",
        type: "video",
        url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
        description: "Quick overview of React concepts",
      },
    ],
  },
  {
    id: "components-props",
    title: "Components and Props",
    description:
      "Understand how to create reusable components and pass data using props.",
    category: "react",
    difficulty: "beginner",
    estimatedMinutes: 60,
    prerequisites: ["react-basics"],
    resources: [
      {
        title: "Components and Props",
        type: "documentation",
        url: "https://react.dev/learn/passing-props-to-a-component",
      },
    ],
  },
  {
    id: "state-management",
    title: "State Management with useState",
    description:
      "Learn how to manage component state using the useState hook.",
    category: "react",
    difficulty: "beginner",
    estimatedMinutes: 75,
    prerequisites: ["components-props"],
    resources: [
      {
        title: "State: A Component's Memory",
        type: "documentation",
        url: "https://react.dev/learn/state-a-components-memory",
      },
    ],
  },
  {
    id: "side-effects",
    title: "Side Effects with useEffect",
    description:
      "Master the useEffect hook for handling side effects in React components.",
    category: "react",
    difficulty: "intermediate",
    estimatedMinutes: 90,
    prerequisites: ["state-management"],
    resources: [
      {
        title: "Synchronizing with Effects",
        type: "documentation",
        url: "https://react.dev/learn/synchronizing-with-effects",
      },
    ],
  },
  {
    id: "nextjs-routing",
    title: "Next.js App Router",
    description:
      "Learn file-based routing and navigation in Next.js 13+ with the App Router.",
    category: "nextjs",
    difficulty: "intermediate",
    estimatedMinutes: 60,
    prerequisites: ["react-basics"],
    resources: [
      {
        title: "Next.js Routing Fundamentals",
        type: "documentation",
        url: "https://nextjs.org/docs/app/building-your-application/routing",
      },
    ],
  },
  {
    id: "server-client-components",
    title: "Server and Client Components",
    description:
      "Understand the difference between Server and Client Components in Next.js.",
    category: "nextjs",
    difficulty: "intermediate",
    estimatedMinutes: 75,
    prerequisites: ["nextjs-routing"],
    resources: [
      {
        title: "Server Components",
        type: "documentation",
        url: "https://nextjs.org/docs/app/building-your-application/rendering/server-components",
      },
      {
        title: "Client Components",
        type: "documentation",
        url: "https://nextjs.org/docs/app/building-your-application/rendering/client-components",
      },
    ],
  },
  {
    id: "api-routes",
    title: "API Routes and Server Actions",
    description:
      "Build backend API endpoints and server actions in Next.js applications.",
    category: "nextjs",
    difficulty: "intermediate",
    estimatedMinutes: 90,
    prerequisites: ["server-client-components"],
    resources: [
      {
        title: "Route Handlers",
        type: "documentation",
        url: "https://nextjs.org/docs/app/building-your-application/routing/route-handlers",
      },
      {
        title: "Server Actions",
        type: "documentation",
        url: "https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations",
      },
    ],
  },
  {
    id: "typescript-basics",
    title: "TypeScript Fundamentals",
    description:
      "Learn TypeScript basics including types, interfaces, and type inference.",
    category: "typescript",
    difficulty: "beginner",
    estimatedMinutes: 60,
    prerequisites: [],
    resources: [
      {
        title: "TypeScript for JavaScript Programmers",
        type: "documentation",
        url: "https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html",
      },
    ],
  },
  {
    id: "langgraph-intro",
    title: "Introduction to LangGraph",
    description:
      "Get started with LangGraph for building AI agent workflows and state machines.",
    category: "langgraph",
    difficulty: "advanced",
    estimatedMinutes: 120,
    prerequisites: ["typescript-basics"],
    resources: [
      {
        title: "LangGraph Quick Start",
        type: "documentation",
        url: "https://langchain-ai.github.io/langgraph/",
      },
    ],
  },
  {
    id: "agent-workflows",
    title: "Building Agent Workflows",
    description:
      "Create multi-step AI agent workflows with conditional logic using LangGraph.",
    category: "langgraph",
    difficulty: "advanced",
    estimatedMinutes: 150,
    prerequisites: ["langgraph-intro"],
    resources: [
      {
        title: "LangGraph Tutorials",
        type: "tutorial",
        url: "https://langchain-ai.github.io/langgraph/tutorials/",
      },
    ],
  },
];

/**
 * Get a topic by ID
 */
export function getTopicById(id: string): Topic | undefined {
  return mockTopics.find((topic) => topic.id === id);
}

/**
 * Get topics by category
 */
export function getTopicsByCategory(
  category: Topic["category"]
): Topic[] {
  return mockTopics.filter((topic) => topic.category === category);
}

/**
 * Get topics by difficulty
 */
export function getTopicsByDifficulty(
  difficulty: Topic["difficulty"]
): Topic[] {
  return mockTopics.filter((topic) => topic.difficulty === difficulty);
}
