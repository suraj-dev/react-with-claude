import { StudyPlan, StudyPlanItem } from "@/app/types/study-plan";
import { mockTopics } from "./topics";

/**
 * Mock study plans for different learning paths
 */
export const mockStudyPlans: StudyPlan[] = [
  {
    id: "plan-beginner-react",
    title: "React Beginner Learning Path",
    description:
      "A comprehensive path for learning React from scratch, covering all fundamental concepts.",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-06"),
    targetCompletionDate: new Date("2026-02-15"),
    overallProgress: 0,
    items: [
      {
        id: "item-1",
        topicId: "react-basics",
        topic: mockTopics.find((t) => t.id === "react-basics"),
        order: 1,
        status: "pending",
        notes:
          "Start with understanding what React is and why it's used. Complete the interactive tutorial.",
      },
      {
        id: "item-2",
        topicId: "components-props",
        topic: mockTopics.find((t) => t.id === "components-props"),
        order: 2,
        status: "pending",
        notes:
          "Learn how to build reusable components and pass data between them using props.",
      },
      {
        id: "item-3",
        topicId: "state-management",
        topic: mockTopics.find((t) => t.id === "state-management"),
        order: 3,
        status: "pending",
        notes:
          "Master the useState hook to add interactivity to your components.",
      },
      {
        id: "item-4",
        topicId: "side-effects",
        topic: mockTopics.find((t) => t.id === "side-effects"),
        order: 4,
        status: "pending",
        notes:
          "Learn useEffect for handling side effects like data fetching and subscriptions.",
      },
    ],
  },
  {
    id: "plan-nextjs-fullstack",
    title: "Next.js Full-Stack Development",
    description:
      "Learn Next.js for building full-stack React applications with server-side rendering and API routes.",
    createdAt: new Date("2026-01-02"),
    updatedAt: new Date("2026-01-06"),
    targetCompletionDate: new Date("2026-03-01"),
    overallProgress: 0,
    items: [
      {
        id: "item-5",
        topicId: "react-basics",
        topic: mockTopics.find((t) => t.id === "react-basics"),
        order: 1,
        status: "pending",
        notes: "Review React fundamentals before diving into Next.js.",
      },
      {
        id: "item-6",
        topicId: "nextjs-routing",
        topic: mockTopics.find((t) => t.id === "nextjs-routing"),
        order: 2,
        status: "pending",
        notes:
          "Learn the App Router and file-based routing system in Next.js.",
      },
      {
        id: "item-7",
        topicId: "server-client-components",
        topic: mockTopics.find((t) => t.id === "server-client-components"),
        order: 3,
        status: "pending",
        notes:
          "Understand the difference between Server and Client Components for optimal performance.",
      },
      {
        id: "item-8",
        topicId: "api-routes",
        topic: mockTopics.find((t) => t.id === "api-routes"),
        order: 4,
        status: "pending",
        notes:
          "Build backend APIs and server actions within your Next.js application.",
      },
    ],
  },
  {
    id: "plan-ai-agent-builder",
    title: "AI Agent Development with LangGraph",
    description:
      "Learn to build sophisticated AI agents with complex workflows using LangGraph.",
    createdAt: new Date("2026-01-03"),
    updatedAt: new Date("2026-01-06"),
    targetCompletionDate: new Date("2026-03-15"),
    overallProgress: 0,
    items: [
      {
        id: "item-9",
        topicId: "typescript-basics",
        topic: mockTopics.find((t) => t.id === "typescript-basics"),
        order: 1,
        status: "pending",
        notes:
          "Learn TypeScript fundamentals as LangGraph works best with typed code.",
      },
      {
        id: "item-10",
        topicId: "langgraph-intro",
        topic: mockTopics.find((t) => t.id === "langgraph-intro"),
        order: 2,
        status: "pending",
        notes:
          "Get started with LangGraph concepts: nodes, edges, and state management.",
      },
      {
        id: "item-11",
        topicId: "agent-workflows",
        topic: mockTopics.find((t) => t.id === "agent-workflows"),
        order: 3,
        status: "pending",
        notes:
          "Build complex multi-step workflows with conditional routing and tool calling.",
      },
    ],
  },
  {
    id: "plan-complete-course",
    title: "Complete React to AI Course",
    description:
      "The full learning path from React basics to building AI-powered applications with LangGraph.",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-06"),
    targetCompletionDate: new Date("2026-04-01"),
    overallProgress: 0,
    items: [
      {
        id: "item-12",
        topicId: "react-basics",
        topic: mockTopics.find((t) => t.id === "react-basics"),
        order: 1,
        status: "pending",
      },
      {
        id: "item-13",
        topicId: "components-props",
        topic: mockTopics.find((t) => t.id === "components-props"),
        order: 2,
        status: "pending",
      },
      {
        id: "item-14",
        topicId: "state-management",
        topic: mockTopics.find((t) => t.id === "state-management"),
        order: 3,
        status: "pending",
      },
      {
        id: "item-15",
        topicId: "side-effects",
        topic: mockTopics.find((t) => t.id === "side-effects"),
        order: 4,
        status: "pending",
      },
      {
        id: "item-16",
        topicId: "typescript-basics",
        topic: mockTopics.find((t) => t.id === "typescript-basics"),
        order: 5,
        status: "pending",
      },
      {
        id: "item-17",
        topicId: "nextjs-routing",
        topic: mockTopics.find((t) => t.id === "nextjs-routing"),
        order: 6,
        status: "pending",
      },
      {
        id: "item-18",
        topicId: "server-client-components",
        topic: mockTopics.find((t) => t.id === "server-client-components"),
        order: 7,
        status: "pending",
      },
      {
        id: "item-19",
        topicId: "api-routes",
        topic: mockTopics.find((t) => t.id === "api-routes"),
        order: 8,
        status: "pending",
      },
      {
        id: "item-20",
        topicId: "langgraph-intro",
        topic: mockTopics.find((t) => t.id === "langgraph-intro"),
        order: 9,
        status: "pending",
      },
      {
        id: "item-21",
        topicId: "agent-workflows",
        topic: mockTopics.find((t) => t.id === "agent-workflows"),
        order: 10,
        status: "pending",
      },
    ],
  },
];

/**
 * Get study plan by ID
 */
export function getStudyPlanById(id: string): StudyPlan | undefined {
  return mockStudyPlans.find((plan) => plan.id === id);
}

/**
 * Get all study plans
 */
export function getAllStudyPlans(): StudyPlan[] {
  return mockStudyPlans;
}

/**
 * Calculate progress for a study plan based on item statuses
 */
export function calculateStudyPlanProgress(plan: StudyPlan): number {
  if (plan.items.length === 0) return 0;

  const completedItems = plan.items.filter(
    (item) => item.status === "completed"
  ).length;

  return Math.round((completedItems / plan.items.length) * 100);
}
