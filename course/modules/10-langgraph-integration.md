# Module 10: LangGraph AI Integration

The capstone module! Bring your study assistant to life by integrating an AI agent powered by LangGraph.

## Learning Objectives

By the end of this module, you will:

- Understand LangGraph's state-based architecture
- Define agent state with TypeScript interfaces
- Create node functions that process state
- Build tools that extend agent capabilities
- Connect nodes with edges and conditional routing
- Integrate the AI agent with your Next.js UI

## Concepts Covered

### What is LangGraph?

LangGraph is a library for building AI agents as state machines. Instead of simple prompt/response, agents can:

- Maintain state across interactions
- Use tools to access external data
- Make decisions about what to do next
- Follow complex multi-step workflows

```
User Message → Route Intent → [Explain | Quiz | Plan] → Response
                    ↓
              Check Tools Needed?
                    ↓
              Use Tools → Process Results → Response
```

### Core LangGraph Concepts

**1. State** - The memory that flows through the graph:

```tsx
interface AgentState {
  messages: Message[];
  currentTopic?: Topic;
  userIntent?: "learn" | "quiz" | "plan";
}
```

**2. Nodes** - Functions that process and update state:

```tsx
async function routeIntent(state: AgentState): Promise<Partial<AgentState>> {
  // Analyze user message and determine intent
  return { ...state, userIntent: "learn" };
}
```

**3. Edges** - Connections between nodes:

```tsx
workflow.addEdge("routeIntent", "explainConcept"); // Direct edge
workflow.addConditionalEdges("routeIntent", routingFunction); // Conditional
```

**4. Tools** - Functions the agent can call:

```tsx
const searchTopicsTool = new DynamicStructuredTool({
  name: "search_topics",
  description: "Search for learning topics",
  func: async ({ query }) => {
    // Search and return results
  },
});
```

### How It All Fits Together

```
┌─────────────────────────────────────────────────────────────┐
│                        State Graph                           │
│                                                              │
│  START → routeIntent → ┬→ explainConcept → END              │
│                        ├→ generateQuiz → END                │
│                        ├→ createStudyPlan → END             │
│                        └→ assessKnowledge → END             │
│                                                              │
│  Tools Available: searchTopics, getTopicDetails, getQuiz    │
└─────────────────────────────────────────────────────────────┘
```

## Hands-On Exercises

### Exercise 10.1: Define AgentState Interface

**File:** `src/lib/langgraph/state.ts`

**Your Task:** Complete the state interface that flows through the agent.

**Steps:**

1. **Add all required fields:**

   ```tsx
   import { Message } from "@/app/types/message";
   import { Topic } from "@/app/types/topic";
   import { Quiz } from "@/app/types/quiz";

   export interface AgentState {
     // Conversation history
     messages: Message[];

     // Current topic being discussed
     currentTopic?: Topic;

     // What the user wants to do
     userIntent?: "learn" | "quiz" | "explain" | "plan" | "unknown";

     // Active quiz context
     quizContext?: {
       quiz: Quiz;
       currentQuestionIndex: number;
       answers: number[];
     };

     // Topics the user has learned
     userKnowledge: string[];

     // Any error messages
     error?: string;
   }
   ```

2. **Create initial state helper:**
   ```tsx
   export function createInitialState(userMessage: string): AgentState {
     return {
       messages: [
         {
           id: crypto.randomUUID(),
           role: "user",
           content: userMessage,
           timestamp: new Date(),
         },
       ],
       userKnowledge: [],
     };
   }
   ```

### Exercise 10.2: Implement Agent Nodes

**File:** `src/lib/langgraph/nodes.ts`

**Your Task:** Create node functions that process state.

**Steps:**

1. **Implement routeIntent node:**

   ```tsx
   export async function routeIntent(
     state: AgentState
   ): Promise<Partial<AgentState>> {
     const lastMessage = state.messages[state.messages.length - 1];
     const content = lastMessage.content.toLowerCase();

     // Simple keyword-based routing
     let userIntent: AgentState["userIntent"] = "unknown";

     if (content.includes("quiz") || content.includes("test")) {
       userIntent = "quiz";
     } else if (
       content.includes("explain") ||
       content.includes("what is") ||
       content.includes("how does")
     ) {
       userIntent = "explain";
     } else if (
       content.includes("plan") ||
       content.includes("roadmap") ||
       content.includes("learn")
     ) {
       userIntent = "plan";
     }

     return { userIntent };
   }
   ```

2. **Implement explainConcept node:**

   ```tsx
   export async function explainConcept(
     state: AgentState
   ): Promise<Partial<AgentState>> {
     // Extract topic from message or state
     const topic = state.currentTopic;

     let explanation: string;

     if (topic) {
       explanation = `Let me explain **${topic.title}**:\n\n${topic.description}\n\n`;
       explanation += `**Difficulty:** ${topic.difficulty}\n`;
       explanation += `**Estimated Time:** ${topic.estimatedMinutes} minutes\n\n`;

       if (topic.prerequisites.length > 0) {
         explanation += `**Prerequisites:** ${topic.prerequisites.join(", ")}`;
       }
     } else {
       explanation =
         "I'd be happy to explain a concept! Could you tell me which topic you'd like to learn about?";
     }

     const assistantMessage: Message = {
       id: crypto.randomUUID(),
       role: "assistant",
       content: explanation,
       timestamp: new Date(),
     };

     return {
       messages: [...state.messages, assistantMessage],
     };
   }
   ```

3. **Implement createStudyPlan node:**

   ```tsx
   export async function createStudyPlan(
     state: AgentState
   ): Promise<Partial<AgentState>> {
     // Get topics not yet learned
     const remainingTopics = mockTopics.filter(
       (t) => !state.userKnowledge.includes(t.id)
     );

     // Sort by difficulty
     const sortedTopics = remainingTopics.sort((a, b) => {
       const order = { beginner: 0, intermediate: 1, advanced: 2 };
       return order[a.difficulty] - order[b.difficulty];
     });

     let plan = "Here's your personalized study plan:\n\n";

     sortedTopics.forEach((topic, index) => {
       plan += `${index + 1}. **${topic.title}** (${topic.difficulty})\n`;
       plan += `   - ${topic.description}\n`;
       plan += `   - Estimated: ${topic.estimatedMinutes} minutes\n\n`;
     });

     const assistantMessage: Message = {
       id: crypto.randomUUID(),
       role: "assistant",
       content: plan,
       timestamp: new Date(),
     };

     return {
       messages: [...state.messages, assistantMessage],
     };
   }
   ```

4. **Implement generateQuiz node:**

   ```tsx
   export async function generateQuiz(
     state: AgentState
   ): Promise<Partial<AgentState>> {
     const topic = state.currentTopic;

     if (!topic) {
       const message: Message = {
         id: crypto.randomUUID(),
         role: "assistant",
         content: "Which topic would you like to be quizzed on?",
         timestamp: new Date(),
       };
       return { messages: [...state.messages, message] };
     }

     const quiz = getQuizByTopicId(topic.id);

     if (!quiz) {
       const message: Message = {
         id: crypto.randomUUID(),
         role: "assistant",
         content: `Sorry, there's no quiz available for ${topic.title} yet.`,
         timestamp: new Date(),
       };
       return { messages: [...state.messages, message] };
     }

     const message: Message = {
       id: crypto.randomUUID(),
       role: "assistant",
       content: `Let's test your knowledge of **${topic.title}**! Here's your first question:\n\n${quiz.questions[0].question}`,
       timestamp: new Date(),
     };

     return {
       messages: [...state.messages, message],
       quizContext: {
         quiz,
         currentQuestionIndex: 0,
         answers: [],
       },
     };
   }
   ```

### Exercise 10.3: Create Tools for Topic Lookup

**File:** `src/lib/langgraph/tools.ts`

**Your Task:** Review and understand the tool implementations.

The tools are mostly complete. Study how they work:

```tsx
// Search topics by keyword
export const searchTopicsTool = new DynamicStructuredTool({
  name: "search_topics",
  description: "Search for learning topics by keyword",
  schema: z.object({
    query: z.string().describe("The search query"),
  }),
  func: async ({ query }) => {
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
```

**Key Points:**

- Tools have a name, description, and schema
- The schema uses Zod for validation
- The func receives validated input and returns a string
- Tools extend what the agent can do

### Exercise 10.4: Build the LangGraph Workflow

**File:** `src/lib/langgraph/agent.ts`

**Your Task:** Connect nodes into a complete workflow.

**Steps:**

1. **Import dependencies:**

   ```tsx
   import { StateGraph, END } from "@langchain/langgraph";
   import { AgentState } from "./state";
   import {
     routeIntent,
     explainConcept,
     generateQuiz,
     createStudyPlan,
     assessKnowledge,
   } from "./nodes";
   ```

2. **Create the graph:**

   ```tsx
   export function createStudyAssistant() {
     // Create graph with state type
     const workflow = new StateGraph<AgentState>({
       channels: {
         messages: {
           value: (prev: Message[], next: Message[]) => [...prev, ...next],
           default: () => [],
         },
         userKnowledge: {
           value: (prev: string[], next: string[]) =>
             Array.from(new Set([...prev, ...next])),
           default: () => [],
         },
         userIntent: {
           value: (_prev, next) => next,
           default: () => undefined,
         },
         currentTopic: {
           value: (_prev, next) => next,
           default: () => undefined,
         },
         quizContext: {
           value: (_prev, next) => next,
           default: () => undefined,
         },
         error: {
           value: (_prev, next) => next,
           default: () => undefined,
         },
       },
     });
   ```

3. **Add nodes:**

   ```tsx
   // Add all nodes
   workflow.addNode("routeIntent", routeIntent);
   workflow.addNode("explainConcept", explainConcept);
   workflow.addNode("generateQuiz", generateQuiz);
   workflow.addNode("createStudyPlan", createStudyPlan);
   workflow.addNode("assessKnowledge", assessKnowledge);
   ```

4. **Set entry point:**

   ```tsx
   workflow.setEntryPoint("routeIntent");
   ```

5. **Add conditional edges:**

   ```tsx
   workflow.addConditionalEdges(
     "routeIntent",
     (state: AgentState) => {
       switch (state.userIntent) {
         case "explain":
           return "explainConcept";
         case "quiz":
           return "generateQuiz";
         case "plan":
           return "createStudyPlan";
         default:
           return "assessKnowledge";
       }
     },
     {
       explainConcept: "explainConcept",
       generateQuiz: "generateQuiz",
       createStudyPlan: "createStudyPlan",
       assessKnowledge: "assessKnowledge",
     }
   );
   ```

6. **Connect to END:**

   ```tsx
     workflow.addEdge("explainConcept", END);
     workflow.addEdge("generateQuiz", END);
     workflow.addEdge("createStudyPlan", END);
     workflow.addEdge("assessKnowledge", END);

     // Compile and return
     return workflow.compile();
   }
   ```

### Exercise 10.5: Connect Agent to UI

**Your Task:** Integrate the agent with the StudyInterface component.

**Create an API route:**

**File:** `src/app/api/chat/route.ts`

```tsx
import { NextResponse } from "next/server";
import { createStudyAssistant } from "@/lib/langgraph/agent";
import { createInitialState } from "@/lib/langgraph/state";

export async function POST(request: Request) {
  try {
    const { message, previousMessages } = await request.json();

    // Create or continue conversation
    const agent = createStudyAssistant();

    if (!agent) {
      return NextResponse.json(
        { error: "Agent not configured" },
        { status: 500 }
      );
    }

    const initialState = createInitialState(message);

    // Add previous messages if continuing conversation
    if (previousMessages) {
      initialState.messages = [...previousMessages, ...initialState.messages];
    }

    // Invoke the agent
    const result = await agent.invoke(initialState);

    // Get the last assistant message
    const assistantMessage = result.messages
      .filter((m) => m.role === "assistant")
      .pop();

    return NextResponse.json({
      message: assistantMessage,
      state: {
        userIntent: result.userIntent,
        currentTopic: result.currentTopic,
      },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
```

**Update StudyInterface to use the API:**

```tsx
const handleSendMessage = async (content: string) => {
  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: "user",
    content,
    timestamp: new Date(),
  };

  setMessages((prev) => [...prev, userMessage]);
  setIsLoading(true);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: content,
        previousMessages: messages,
      }),
    });

    const data = await response.json();

    if (data.message) {
      setMessages((prev) => [...prev, data.message]);
    }
  } catch (error) {
    console.error("Failed to get response:", error);
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      },
    ]);
  } finally {
    setIsLoading(false);
  }
};
```

### Exercise 10.6: Test Multi-Step Conversations

**Your Task:** Test the agent with various conversation flows.

**Test Cases:**

1. **Learning Request:**

   ```
   User: "I want to learn React"
   Agent: [Should route to createStudyPlan and show a learning roadmap]
   ```

2. **Explanation Request:**

   ```
   User: "Explain how useState works"
   Agent: [Should route to explainConcept and explain the hook]
   ```

3. **Quiz Request:**

   ```
   User: "Can you quiz me on React basics?"
   Agent: [Should route to generateQuiz and start a quiz]
   ```

4. **Ambiguous Request:**
   ```
   User: "Hello, I'm new here"
   Agent: [Should route to assessKnowledge and ask clarifying questions]
   ```

## Verification Checklist

- [ ] AgentState interface is complete with all fields
- [ ] routeIntent correctly identifies user intent
- [ ] explainConcept generates helpful explanations
- [ ] createStudyPlan produces a personalized plan
- [ ] generateQuiz starts a quiz session
- [ ] Tools successfully search and retrieve topics
- [ ] Graph compiles without errors
- [ ] API route successfully invokes the agent
- [ ] UI updates with agent responses
- [ ] Multi-turn conversations work correctly

## Common Issues & Solutions

### Issue: "Cannot find module '@langchain/langgraph'"

**Solution:** Install the required packages:

```bash
pnpm add @langchain/langgraph @langchain/core zod
```

### Issue: Graph doesn't compile

**Solution:** Check that all nodes are added and connected:

```tsx
// Every node must be added
workflow.addNode("nodeName", nodeFunction);

// Entry point must be set
workflow.setEntryPoint("firstNode");

// All paths must eventually reach END
workflow.addEdge("lastNode", END);
```

### Issue: State not updating between nodes

**Solution:** Make sure nodes return state updates correctly:

```tsx
// Wrong - modifying state directly
async function myNode(state: AgentState) {
  state.messages.push(newMessage); // Don't do this!
  return state;
}

// Right - return new state
async function myNode(state: AgentState) {
  return {
    messages: [...state.messages, newMessage],
  };
}
```

### Issue: Agent response is undefined

**Solution:** Check that nodes are returning messages:

```tsx
// Make sure to add assistant message to state
return {
  messages: [...state.messages, assistantMessage],
};
```

## LangGraph Architecture Summary

```
┌─────────────────────────────────────────────────────────┐
│                    Your Application                      │
├─────────────────────────────────────────────────────────┤
│  UI Layer (React Components)                             │
│    └── StudyInterface → ChatInput + MessageList         │
├─────────────────────────────────────────────────────────┤
│  API Layer (Next.js API Routes)                         │
│    └── /api/chat → Invokes LangGraph agent              │
├─────────────────────────────────────────────────────────┤
│  Agent Layer (LangGraph)                                │
│    ├── State: messages, userIntent, currentTopic        │
│    ├── Nodes: routeIntent, explain, quiz, plan          │
│    ├── Edges: conditional routing based on intent       │
│    └── Tools: searchTopics, getTopicDetails, getQuiz   │
├─────────────────────────────────────────────────────────┤
│  Data Layer                                             │
│    └── Topics, Quizzes, Study Plans                     │
└─────────────────────────────────────────────────────────┘
```

## Additional Resources

- [LangGraph Documentation](https://langchain-ai.github.io/langgraph/)
- [LangChain Tools](https://js.langchain.com/docs/modules/agents/tools/)
- [Building AI Agents](https://www.langchain.com/langgraph)

## Congratulations!

You've completed all 10 modules of the AI Study Assistant course! You now have experience with:

- **React Fundamentals**: Components, props, JSX
- **State Management**: useState, lifting state up
- **Side Effects**: useEffect, data fetching
- **Next.js**: Routing, layouts, Server/Client Components
- **Full-Stack**: API routes, Server Actions
- **AI Integration**: LangGraph agents, tools, workflows

**What's Next?**

- Enhance the agent with real LLM integration (OpenAI, Anthropic)
- Add persistent storage with a database
- Implement user authentication
- Deploy to production

---

**Progress:** Update your [progress checklist](../progress/checklist.md) - you're done!

**Celebrate your achievement!**
