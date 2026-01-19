/**
 * LangGraph Node Functions
 *
 * Module 10: LangGraph AI Integration
 *
 * Nodes are functions that process the agent state.
 * Each node performs a specific task in the workflow.
 */

import { AgentState } from "./state";

/**
 * TODO: Implement the assessKnowledge node
 *
 * This node analyzes the user's messages to determine their knowledge level.
 *
 * REQUIREMENTS:
 * - Read the conversation messages
 * - Use an LLM to assess what the user knows
 * - Update the userKnowledge array in state
 * - Return the updated state
 *
 * HINT: In a real implementation, you'd call an LLM here
 * For the course, you can simulate this
 */
export async function assessKnowledge(state: AgentState): Promise<Partial<AgentState>> {
  // TODO: Implement knowledge assessment
  // const userMessage = state.messages[state.messages.length - 1];
  // const assessment = await llm.invoke(...);

  return state; // Placeholder
}

/**
 * TODO: Implement the explainConcept node
 *
 * This node provides detailed explanations of concepts.
 *
 * REQUIREMENTS:
 * - Get the topic from state.currentTopic
 * - Generate a clear, beginner-friendly explanation
 * - Add the explanation as an assistant message
 * - Return updated state with new message
 */
export async function explainConcept(state: AgentState): Promise<Partial<AgentState>> {
  // TODO: Implement concept explanation
  // if (!state.currentTopic) return state;
  //
  // const explanation = await llm.invoke({
  //   system: "You are a helpful teacher. Explain concepts clearly.",
  //   user: `Explain ${state.currentTopic.title} to a beginner.`
  // });
  //
  // return {
  //   ...state,
  //   messages: [
  //     ...state.messages,
  //     {
  //       id: crypto.randomUUID(),
  //       role: "assistant",
  //       content: explanation,
  //       timestamp: new Date(),
  //     },
  //   ],
  // };

  return state; // Placeholder
}

/**
 * TODO: Implement the generateQuiz node
 *
 * This node creates quiz questions based on a topic.
 *
 * REQUIREMENTS:
 * - Get the topic to quiz on
 * - Generate relevant questions using an LLM
 * - Format as Quiz type
 * - Update state with quiz context
 */
export async function generateQuiz(state: AgentState): Promise<Partial<AgentState>> {
  // TODO: Implement quiz generation
  return state; // Placeholder
}

/**
 * TODO: Implement the evaluateAnswer node
 *
 * This node checks if a quiz answer is correct.
 *
 * REQUIREMENTS:
 * - Get the user's answer from the latest message
 * - Compare with correct answer
 * - Provide feedback
 * - Update quiz state
 */
export async function evaluateAnswer(state: AgentState): Promise<Partial<AgentState>> {
  // TODO: Implement answer evaluation
  return state; // Placeholder
}

/**
 * TODO: Implement the createStudyPlan node
 *
 * This node builds a personalized study plan.
 *
 * REQUIREMENTS:
 * - Analyze user's goals and current knowledge
 * - Select appropriate topics in logical order
 * - Consider prerequisites
 * - Generate a structured plan
 */
export async function createStudyPlan(state: AgentState): Promise<Partial<AgentState>> {
  // TODO: Implement study plan creation
  return state; // Placeholder
}

/**
 * TODO: Implement the routeIntent node
 *
 * This node determines what the user wants to do.
 *
 * REQUIREMENTS:
 * - Analyze the latest user message
 * - Classify intent (learn, quiz, plan, explain)
 * - Update state.userIntent
 * - This helps the graph decide which node to visit next
 */
export async function routeIntent(state: AgentState): Promise<Partial<AgentState>> {
  // TODO: Implement intent routing
  // const lastMessage = state.messages[state.messages.length - 1];
  //
  // Simple keyword-based routing for demo:
  // if (lastMessage.content.toLowerCase().includes("quiz")) {
  //   return { ...state, userIntent: "quiz" };
  // } else if (lastMessage.content.toLowerCase().includes("explain")) {
  //   return { ...state, userIntent: "explain" };
  // }
  // ...

  return state; // Placeholder
}

/**
 * ✓ VERIFY: After implementing nodes:
 * - Each node is async and returns Promise<Partial<AgentState>>
 * - Nodes don't mutate state directly (return new state)
 * - Nodes handle errors gracefully
 * - Nodes have clear, single responsibilities
 *
 * LEARNING NOTE: Node Best Practices
 *
 * 1. Pure Functions: Nodes should be pure - same input = same output
 * 2. Immutability: Don't modify state directly, return updates
 * 3. Error Handling: Wrap LLM calls in try/catch
 * 4. Logging: Add console.log for debugging workflows
 * 5. Testing: Each node can be tested independently
 *
 * Think of nodes as steps in a recipe - each step transforms
 * the ingredients (state) in a specific way!
 */
