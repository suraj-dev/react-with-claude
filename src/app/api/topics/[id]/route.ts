/**
 * Topic Detail API Route
 *
 * Module 8: API Routes & Server Actions
 *
 * Dynamic API route for individual topics.
 * Accessible at: /api/topics/[id]
 */

import { NextResponse } from "next/server";
import { getTopicById } from "@/lib/data/topics";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/topics/[id]
 * Returns a specific topic by ID
 */
export async function GET(request: Request, { params }: RouteParams) {
  // TODO: Await and extract id from params
  const { id } = await params;

  // Fetch topic
  const topic = getTopicById(id);

  // TODO: Handle not found case
  if (!topic) {
    return NextResponse.json(
      { error: "Topic not found" },
      { status: 404 }
    );
  }

  // Return topic
  return NextResponse.json(topic);
}

/**
 * ✓ VERIFY: Test this API route:
 * - Visit http://localhost:3000/api/topics/react-basics
 * - Should see JSON for React basics topic
 * - Try invalid ID: /api/topics/invalid
 * - Should get 404 error
 *
 * LEARNING NOTE: Dynamic API Routes
 * - [id] in folder name makes this dynamic
 * - Access the parameter via params.id
 * - Can return different status codes
 * - Use NextResponse.json() for responses
 */
