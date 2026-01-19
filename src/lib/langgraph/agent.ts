/**
 * LangGraph Agent Creation
 *
 * Module 10: LangGraph AI Integration
 *
 * This file creates and compiles the LangGraph workflow.
 * It connects nodes, defines edges, and sets up routing logic.
 */

import { StateGraph, END } from "@langchain/langgraph";
import { AgentState } from "./state";
import {
  assessKnowledge,
  explainConcept,
  generateQuiz,
  evaluateAnswer,
  createStudyPlan,
  routeIntent,
} from "./nodes";

/**
 * TODO: Create the study assistant graph
 *
 * REQUIREMENTS:
 * 1. Create a StateGraph with AgentState type
 * 2. Add all node functions to the graph
 * 3. Define the entry point
 * 4. Add edges to connect nodes
 * 5. Add conditional edges for routing
 * 6. Compile the graph
 *
 * WORKFLOW:
 * User Message → Route Intent → [Explain | Quiz | Plan | Assess] → END
 */
export function createStudyAssistant() {
  // TODO: Create the graph
  // const workflow = new StateGraph<AgentState>({
  //   channels: {
  //     messages: {
  //       value: (prev: Message[], next: Message[]) => [...prev, ...next],
  //       default: () => [],
  //     },
  //   },
  // });

  // TODO: Add nodes to the graph
  // workflow.addNode("routeIntent", routeIntent);
  // workflow.addNode("explainConcept", explainConcept);
  // workflow.addNode("generateQuiz", generateQuiz);
  // workflow.addNode("evaluateAnswer", evaluateAnswer);
  // workflow.addNode("createStudyPlan", createStudyPlan);
  // workflow.addNode("assessKnowledge", assessKnowledge);

  // TODO: Set entry point
  // workflow.setEntryPoint("routeIntent");

  // TODO: Add conditional edges based on intent
  // workflow.addConditionalEdges(
  //   "routeIntent",
  //   // Routing function
  //   (state: AgentState) => {
  //     switch (state.userIntent) {
  //       case "explain":
  //         return "explainConcept";
  //       case "quiz":
  //         return "generateQuiz";
  //       case "plan":
  //         return "createStudyPlan";
  //       default:
  //         return "assessKnowledge";
  //     }
  //   },
  //   // Mapping
  //   {
  //     explainConcept: "explainConcept",
  //     generateQuiz: "generateQuiz",
  //     createStudyPlan: "createStudyPlan",
  //     assessKnowledge: "assessKnowledge",
  //   }
  // );

  // TODO: Add edges from action nodes to END
  // workflow.addEdge("explainConcept", END);
  // workflow.addEdge("generateQuiz", END);
  // workflow.addEdge("createStudyPlan", END);
  // workflow.addEdge("assessKnowledge", END);

  // TODO: Compile the graph
  // return workflow.compile();

  // Placeholder return
  return null;
}

/**
 * ✓ VERIFY: After creating the agent:
 * - Graph compiles without errors
 * - All nodes are connected
 * - Routing logic works correctly
 * - Can invoke the agent with test state
 * - Agent reaches END state
 *
 * TEST IT:
 * const agent = createStudyAssistant();
 * const result = await agent.invoke({
 *   messages: [{
 *     id: "1",
 *     role: "user",
 *     content: "Explain React hooks to me",
 *     timestamp: new Date(),
 *   }],
 * });
 * console.log(result.messages);
 *
 * LEARNING NOTE: LangGraph Concepts
 *
 * 1. StateGraph: The workflow container
 * 2. Nodes: Functions that process state
 * 3. Edges: Connections between nodes
 * 4. Conditional Edges: Dynamic routing based on state
 * 5. Entry Point: Where the graph starts
 * 6. END: Special node that terminates the graph
 *
 * The graph is like a flowchart - state flows through nodes,
 * and edges determine the path!
 *
 * BONUS: LangGraph automatically handles:
 * - State persistence
 * - Error recovery
 * - Streaming updates
 * - Checkpointing (save/resume)
 */
