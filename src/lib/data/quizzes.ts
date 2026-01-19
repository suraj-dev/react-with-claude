import { Quiz, QuizQuestion } from "@/app/types/quiz";

/**
 * Mock quiz questions for various topics
 */
const quizQuestions: QuizQuestion[] = [
  // React Basics Questions
  {
    id: "q-react-1",
    topicId: "react-basics",
    question: "What is React primarily used for?",
    options: [
      "Building server-side applications",
      "Building user interfaces",
      "Managing databases",
      "Creating mobile apps only",
    ],
    correctAnswerIndex: 1,
    explanation:
      "React is a JavaScript library primarily used for building user interfaces, especially for single-page applications.",
    difficulty: "easy",
  },
  {
    id: "q-react-2",
    topicId: "react-basics",
    question: "What does JSX stand for?",
    options: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JavaScript Extension",
      "Java XML",
    ],
    correctAnswerIndex: 0,
    explanation:
      "JSX stands for JavaScript XML. It allows you to write HTML-like code in JavaScript.",
    difficulty: "easy",
  },
  {
    id: "q-react-3",
    topicId: "react-basics",
    question: "What is the Virtual DOM in React?",
    options: [
      "A programming language",
      "A lightweight copy of the actual DOM",
      "A database",
      "A CSS framework",
    ],
    correctAnswerIndex: 1,
    explanation:
      "The Virtual DOM is a lightweight copy of the actual DOM that React uses to optimize updates and improve performance.",
    difficulty: "medium",
  },

  // Components and Props Questions
  {
    id: "q-props-1",
    topicId: "components-props",
    question: "What are props in React?",
    options: [
      "Properties passed from parent to child components",
      "A type of state",
      "CSS styles",
      "Event handlers",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Props (short for properties) are read-only data passed from parent components to child components.",
    difficulty: "easy",
  },
  {
    id: "q-props-2",
    topicId: "components-props",
    question: "Can you modify props inside a component?",
    options: [
      "Yes, props are mutable",
      "No, props are read-only",
      "Only in class components",
      "Only with special methods",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Props are read-only and should never be modified inside the component that receives them. To change data, use state instead.",
    difficulty: "medium",
  },

  // State Management Questions
  {
    id: "q-state-1",
    topicId: "state-management",
    question: "What does the useState hook return?",
    options: [
      "A single value",
      "An array with state value and setter function",
      "An object with state properties",
      "A promise",
    ],
    correctAnswerIndex: 1,
    explanation:
      "useState returns an array with two elements: the current state value and a function to update it.",
    difficulty: "easy",
  },
  {
    id: "q-state-2",
    topicId: "state-management",
    question:
      "What happens when you call a state setter function?",
    options: [
      "The component re-renders immediately",
      "React schedules a re-render",
      "Nothing happens",
      "The page refreshes",
    ],
    correctAnswerIndex: 1,
    explanation:
      "When you call a state setter, React schedules a re-render. The update is not immediate but happens in the next render cycle.",
    difficulty: "medium",
  },

  // Side Effects Questions
  {
    id: "q-effect-1",
    topicId: "side-effects",
    question: "When does useEffect run by default?",
    options: [
      "Only once when component mounts",
      "After every render",
      "Before every render",
      "Only when state changes",
    ],
    correctAnswerIndex: 1,
    explanation:
      "By default, useEffect runs after every render. You can control this with the dependency array.",
    difficulty: "medium",
  },
  {
    id: "q-effect-2",
    topicId: "side-effects",
    question:
      "What does an empty dependency array [] in useEffect mean?",
    options: [
      "Run on every render",
      "Run only once when component mounts",
      "Never run",
      "Run when any state changes",
    ],
    correctAnswerIndex: 1,
    explanation:
      "An empty dependency array means the effect runs only once when the component mounts, similar to componentDidMount in class components.",
    difficulty: "medium",
  },

  // Next.js Routing Questions
  {
    id: "q-routing-1",
    topicId: "nextjs-routing",
    question:
      "How do you create a dynamic route in Next.js App Router?",
    options: [
      "Use query parameters",
      "Create a folder with square brackets like [id]",
      "Use a special routing file",
      "Define routes in a config file",
    ],
    correctAnswerIndex: 1,
    explanation:
      "In Next.js App Router, you create dynamic routes by using folders with square brackets, like app/posts/[id]/page.tsx",
    difficulty: "medium",
  },
  {
    id: "q-routing-2",
    topicId: "nextjs-routing",
    question: "What file name is used for page components in App Router?",
    options: ["index.tsx", "page.tsx", "route.tsx", "component.tsx"],
    correctAnswerIndex: 1,
    explanation:
      "In Next.js App Router, page components must be named page.tsx (or page.js) to be recognized as routes.",
    difficulty: "easy",
  },

  // Server/Client Components Questions
  {
    id: "q-server-1",
    topicId: "server-client-components",
    question: "What are Server Components in Next.js?",
    options: [
      "Components that run only on the server",
      "Components that handle API requests",
      "Components that require authentication",
      "Components written in a different language",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Server Components are React components that render on the server and send HTML to the client, reducing JavaScript bundle size.",
    difficulty: "medium",
  },
  {
    id: "q-server-2",
    topicId: "server-client-components",
    question: "How do you mark a component as a Client Component?",
    options: [
      "Add 'use client' at the top of the file",
      "Import from 'next/client'",
      "Use a .client.tsx extension",
      "Add a client prop",
    ],
    correctAnswerIndex: 0,
    explanation:
      "You mark a component as a Client Component by adding 'use client' directive at the top of the file.",
    difficulty: "easy",
  },

  // TypeScript Questions
  {
    id: "q-ts-1",
    topicId: "typescript-basics",
    question: "What is TypeScript?",
    options: [
      "A new programming language",
      "A superset of JavaScript that adds static typing",
      "A CSS framework",
      "A database query language",
    ],
    correctAnswerIndex: 1,
    explanation:
      "TypeScript is a superset of JavaScript that adds static type checking and other features, compiling down to JavaScript.",
    difficulty: "easy",
  },

  // LangGraph Questions
  {
    id: "q-langgraph-1",
    topicId: "langgraph-intro",
    question: "What is LangGraph used for?",
    options: [
      "Creating graphs and charts",
      "Building AI agent workflows with state management",
      "Database management",
      "UI component library",
    ],
    correctAnswerIndex: 1,
    explanation:
      "LangGraph is a library for building stateful AI agent workflows with complex logic and decision trees.",
    difficulty: "medium",
  },
  {
    id: "q-langgraph-2",
    topicId: "langgraph-intro",
    question: "What are nodes in LangGraph?",
    options: [
      "Database tables",
      "UI components",
      "Functions that process state in the workflow",
      "CSS selectors",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Nodes in LangGraph are functions that process and transform the agent's state as it moves through the workflow.",
    difficulty: "medium",
  },
];

/**
 * Mock quizzes organized by topic
 */
export const mockQuizzes: Quiz[] = [
  {
    id: "quiz-react-basics",
    topicId: "react-basics",
    title: "React Fundamentals Quiz",
    questions: quizQuestions.filter((q) => q.topicId === "react-basics"),
    passingScore: 70,
  },
  {
    id: "quiz-components-props",
    topicId: "components-props",
    title: "Components and Props Quiz",
    questions: quizQuestions.filter(
      (q) => q.topicId === "components-props"
    ),
    passingScore: 70,
  },
  {
    id: "quiz-state",
    topicId: "state-management",
    title: "State Management Quiz",
    questions: quizQuestions.filter(
      (q) => q.topicId === "state-management"
    ),
    passingScore: 70,
  },
  {
    id: "quiz-effects",
    topicId: "side-effects",
    title: "Side Effects with useEffect Quiz",
    questions: quizQuestions.filter((q) => q.topicId === "side-effects"),
    passingScore: 70,
  },
  {
    id: "quiz-routing",
    topicId: "nextjs-routing",
    title: "Next.js Routing Quiz",
    questions: quizQuestions.filter((q) => q.topicId === "nextjs-routing"),
    passingScore: 70,
  },
  {
    id: "quiz-server-client",
    topicId: "server-client-components",
    title: "Server and Client Components Quiz",
    questions: quizQuestions.filter(
      (q) => q.topicId === "server-client-components"
    ),
    passingScore: 70,
  },
  {
    id: "quiz-typescript",
    topicId: "typescript-basics",
    title: "TypeScript Basics Quiz",
    questions: quizQuestions.filter(
      (q) => q.topicId === "typescript-basics"
    ),
    passingScore: 70,
  },
  {
    id: "quiz-langgraph",
    topicId: "langgraph-intro",
    title: "LangGraph Introduction Quiz",
    questions: quizQuestions.filter(
      (q) => q.topicId === "langgraph-intro"
    ),
    passingScore: 70,
  },
];

/**
 * Get quiz by topic ID
 */
export function getQuizByTopicId(topicId: string): Quiz | undefined {
  return mockQuizzes.find((quiz) => quiz.topicId === topicId);
}

/**
 * Get quiz by quiz ID
 */
export function getQuizById(id: string): Quiz | undefined {
  return mockQuizzes.find((quiz) => quiz.id === id);
}
