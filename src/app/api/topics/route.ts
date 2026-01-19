/**
 * Topics API Route
 *
 * Module 8: API Routes & Server Actions
 *
 * This is a Route Handler that provides an API endpoint for topics.
 * Accessible at: /api/topics
 */

import { NextResponse } from "next/server";
import { mockTopics } from "@/lib/data/topics";

/**
 * GET /api/topics
 * Returns all available topics
 *
 * TODO: Students will implement filtering and pagination
 */
export async function GET(request: Request) {
  // TODO: Extract query parameters for filtering
  // HINT: const { searchParams } = new URL(request.url);
  // HINT: const category = searchParams.get('category');

  // TODO: Implement filtering based on query parameters
  // For now, return all topics
  const topics = mockTopics;

  // TODO: Add pagination
  // HINT: const page = searchParams.get('page') || '1';
  // HINT: const limit = searchParams.get('limit') || '10';

  // Return JSON response
  return NextResponse.json({
    topics,
    total: topics.length,
  });
}

/**
 * TODO: Add POST handler to create new topics (optional challenge)
 *
 * export async function POST(request: Request) {
 *   const body = await request.json();
 *   // Validate and create topic
 *   return NextResponse.json(newTopic, { status: 201 });
 * }
 */

/**
 * ✓ VERIFY: Test this API route:
 * - Visit http://localhost:3000/api/topics in your browser
 * - Should see JSON response with all topics
 * - Test with query params: /api/topics?category=react
 *
 * LEARNING NOTE: Route Handlers
 * - route.ts files create API endpoints
 * - Export async functions named after HTTP methods (GET, POST, etc.)
 * - Run on the server, can access databases/APIs directly
 * - Return NextResponse.json() for JSON APIs
 */
