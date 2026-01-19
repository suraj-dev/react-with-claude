"use server";

/**
 * Server Actions
 *
 * Module 8: API Routes & Server Actions
 *
 * Server Actions allow you to define server-side functions
 * that can be called directly from Client Components.
 * They're an alternative to API routes for mutations.
 */

import { revalidatePath } from "next/cache";

/**
 * TODO: Implement saveProgress server action
 *
 * This function will save a user's progress on a topic.
 * In a real app, this would write to a database.
 *
 * REQUIREMENTS:
 * - Accept topicId and status parameters
 * - Validate the input
 * - Save to database (simulated for now)
 * - Revalidate the relevant page cache
 * - Return success/error response
 */
export async function saveProgress(topicId: string, status: string) {
  // TODO: Add input validation
  if (!topicId || !status) {
    return {
      success: false,
      error: "Missing required fields",
    };
  }

  // TODO: In a real app, save to database
  // await db.progress.create({ topicId, status, userId: ... });

  // Simulate database delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Revalidate the study plan page to show updated progress
  revalidatePath("/study-plan");

  return {
    success: true,
    message: "Progress saved successfully",
  };
}

/**
 * TODO: Implement updateStudyPlan server action
 */
export async function updateStudyPlan(planId: string, updates: object) {
  // Implementation here
  return { success: true };
}

/**
 * ✓ VERIFY: Test server actions:
 * - Call from a Client Component
 * - Check that it runs on the server (no access to window, etc.)
 * - Verify revalidation updates the UI
 * - Check error handling
 *
 * LEARNING NOTE: Server Actions vs API Routes
 *
 * Server Actions:
 * - Defined with "use server"
 * - Called directly from components (no fetch needed)
 * - Better TypeScript integration
 * - Automatic serialization
 * - Best for mutations from forms/buttons
 *
 * API Routes:
 * - Traditional REST endpoints
 * - Can be called from anywhere (even outside Next.js)
 * - More flexible (headers, different response types)
 * - Best for public APIs or third-party integrations
 */
