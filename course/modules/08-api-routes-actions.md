# Module 8: API Routes & Server Actions

Learn two ways to handle server-side logic in Next.js: API Routes for RESTful endpoints and Server Actions for form mutations.

## Learning Objectives

By the end of this module, you will:

- Create API routes (Route Handlers) for GET and POST requests
- Build dynamic API routes with parameters
- Use NextResponse for proper API responses
- Implement Server Actions with "use server"
- Use revalidatePath for cache updates
- Understand when to use each approach

## Concepts Covered

### API Routes (Route Handlers)

Create API endpoints by adding `route.ts` files:

```
src/app/api/
  topics/
    route.ts           -> GET/POST /api/topics
    [id]/
      route.ts         -> GET/PUT/DELETE /api/topics/:id
```

```tsx
// src/app/api/topics/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const topics = await getTopics();
  return NextResponse.json(topics);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newTopic = await createTopic(body);
  return NextResponse.json(newTopic, { status: 201 });
}
```

**Supported HTTP Methods:**

- GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS

### Dynamic API Routes

Access URL parameters in dynamic routes:

```tsx
// src/app/api/topics/[id]/route.ts
interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const topic = await getTopic(id);

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  return NextResponse.json(topic);
}
```

### Query Parameters

Access URL query parameters:

```tsx
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const topics = await getTopics({
    category,
    page: parseInt(page),
    limit: parseInt(limit),
  });

  return NextResponse.json(topics);
}
```

### Server Actions

Server Actions are async functions that run on the server. They're great for form submissions and mutations:

```tsx
// src/app/actions/study.ts
"use server";

import { revalidatePath } from "next/cache";

export async function saveProgress(topicId: string, status: string) {
  // Validate input
  if (!topicId || !status) {
    return { success: false, error: "Missing fields" };
  }

  // Save to database
  await db.progress.create({ topicId, status });

  // Revalidate the page to show updated data
  revalidatePath("/study-plan");

  return { success: true };
}
```

**Using Server Actions in Components:**

```tsx
"use client";

import { saveProgress } from "@/app/actions/study";

function ProgressButton({ topicId }: { topicId: string }) {
  const handleClick = async () => {
    const result = await saveProgress(topicId, "completed");
    if (result.success) {
      alert("Progress saved!");
    }
  };

  return <button onClick={handleClick}>Mark Complete</button>;
}
```

### Server Actions vs API Routes

| Feature         | Server Actions                   | API Routes                   |
| --------------- | -------------------------------- | ---------------------------- |
| Use Case        | Forms, mutations                 | Public APIs, webhooks        |
| Syntax          | async function with "use server" | Export HTTP method functions |
| Type Safety     | Full TypeScript integration      | Manual typing needed         |
| Caching         | Works with revalidatePath        | Manual cache control         |
| External Access | Only from your app               | Any client can call          |

**Use Server Actions when:**

- Handling form submissions
- Making mutations from your UI
- You want better TypeScript support

**Use API Routes when:**

- Building a public API
- Handling webhooks
- Third-party integrations
- Need specific HTTP methods/headers

## Hands-On Exercises

### Exercise 8.1: Create Topics API Route

**File:** `src/app/api/topics/route.ts`

**Your Task:** Implement filtering and pagination.

**Steps:**

1. **Add query parameter extraction:**

   ```tsx
   export async function GET(request: Request) {
     const { searchParams } = new URL(request.url);
     const category = searchParams.get("category");
     const difficulty = searchParams.get("difficulty");
     const page = parseInt(searchParams.get("page") || "1");
     const limit = parseInt(searchParams.get("limit") || "10");
   ```

2. **Implement filtering:**

   ```tsx
   let topics = mockTopics;

   if (category) {
     topics = topics.filter((t) => t.category === category);
   }

   if (difficulty) {
     topics = topics.filter((t) => t.difficulty === difficulty);
   }
   ```

3. **Implement pagination:**

   ```tsx
     const startIndex = (page - 1) * limit;
     const endIndex = startIndex + limit;
     const paginatedTopics = topics.slice(startIndex, endIndex);

     return NextResponse.json({
       topics: paginatedTopics,
       total: topics.length,
       page,
       limit,
       totalPages: Math.ceil(topics.length / limit),
     });
   }
   ```

**Test it:**

- `/api/topics` - All topics
- `/api/topics?category=react` - React topics only
- `/api/topics?page=2&limit=5` - Page 2 with 5 items

### Exercise 8.2: Build Dynamic Topic API Route

**File:** `src/app/api/topics/[id]/route.ts`

**Your Task:** Handle GET, PUT, and DELETE for individual topics.

**Steps:**

1. **GET is mostly complete. Verify it works:**

   ```tsx
   export async function GET(request: Request, { params }: RouteParams) {
     const { id } = await params;
     const topic = getTopicById(id);

     if (!topic) {
       return NextResponse.json({ error: "Topic not found" }, { status: 404 });
     }

     return NextResponse.json(topic);
   }
   ```

2. **Add PUT handler (update):**

   ```tsx
   export async function PUT(request: Request, { params }: RouteParams) {
     const { id } = await params;
     const body = await request.json();

     const topic = getTopicById(id);
     if (!topic) {
       return NextResponse.json({ error: "Topic not found" }, { status: 404 });
     }

     // In a real app, you'd update the database
     const updatedTopic = { ...topic, ...body };

     return NextResponse.json(updatedTopic);
   }
   ```

3. **Add DELETE handler:**

   ```tsx
   export async function DELETE(request: Request, { params }: RouteParams) {
     const { id } = await params;
     const topic = getTopicById(id);

     if (!topic) {
       return NextResponse.json({ error: "Topic not found" }, { status: 404 });
     }

     // In a real app, you'd delete from database

     return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
   }
   ```

### Exercise 8.3: Implement Server Actions

**File:** `src/app/actions/study.ts`

**Your Task:** Complete the server actions for progress tracking.

**Steps:**

1. **Enhance saveProgress with validation:**

   ```tsx
   "use server";

   import { revalidatePath } from "next/cache";

   const VALID_STATUSES = ["not-started", "in-progress", "completed"];

   export async function saveProgress(topicId: string, status: string) {
     // Input validation
     if (!topicId) {
       return { success: false, error: "Topic ID is required" };
     }

     if (!VALID_STATUSES.includes(status)) {
       return { success: false, error: "Invalid status" };
     }

     try {
       // Simulate database delay
       await new Promise((resolve) => setTimeout(resolve, 500));

       // In a real app: await db.progress.upsert({ topicId, status });

       // Revalidate pages that show progress
       revalidatePath("/study-plan");
       revalidatePath(`/topics/${topicId}`);

       return { success: true, message: "Progress saved" };
     } catch (error) {
       return { success: false, error: "Failed to save progress" };
     }
   }
   ```

2. **Complete updateStudyPlan:**

   ```tsx
   export async function updateStudyPlan(
     planId: string,
     updates: { name?: string; topics?: string[] }
   ) {
     if (!planId) {
       return { success: false, error: "Plan ID is required" };
     }

     try {
       await new Promise((resolve) => setTimeout(resolve, 500));

       // In a real app: await db.studyPlan.update({ planId, ...updates });

       revalidatePath("/study-plan");

       return { success: true, message: "Study plan updated" };
     } catch (error) {
       return { success: false, error: "Failed to update plan" };
     }
   }
   ```

3. **Add a new action for completing a topic:**
   ```tsx
   export async function completeTopic(topicId: string) {
     return saveProgress(topicId, "completed");
   }
   ```

### Exercise 8.4: Handle Errors in API Routes

**Your Task:** Add proper error handling to API routes.

**Example implementation:**

```tsx
export async function GET(request: Request) {
  try {
    const topics = await getTopics();
    return NextResponse.json(topics);
  } catch (error) {
    console.error("Failed to fetch topics:", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.category) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      );
    }

    const newTopic = await createTopic(body);
    return NextResponse.json(newTopic, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    console.error("Failed to create topic:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

## Using Server Actions in Components

**Example: Progress Button Component**

```tsx
// src/app/components/study/ProgressButton.tsx
"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { saveProgress } from "@/app/actions/study";

interface ProgressButtonProps {
  topicId: string;
  currentStatus: string;
}

export function ProgressButton({
  topicId,
  currentStatus,
}: ProgressButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(currentStatus);

  const handleClick = async () => {
    setIsLoading(true);

    const nextStatus = status === "completed" ? "in-progress" : "completed";
    const result = await saveProgress(topicId, nextStatus);

    if (result.success) {
      setStatus(nextStatus);
    } else {
      alert(result.error);
    }

    setIsLoading(false);
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isLoading
        ? "Saving..."
        : status === "completed"
          ? "Mark Incomplete"
          : "Mark Complete"}
    </Button>
  );
}
```

## Verification Checklist

- [ ] GET /api/topics returns all topics
- [ ] GET /api/topics?category=react filters by category
- [ ] GET /api/topics?page=2&limit=5 paginates correctly
- [ ] GET /api/topics/react-basics returns single topic
- [ ] GET /api/topics/invalid returns 404
- [ ] Server actions save progress successfully
- [ ] revalidatePath updates the UI after mutations
- [ ] Error responses have proper status codes
- [ ] Invalid input is rejected with helpful messages

## Common Issues & Solutions

### Issue: "request.json is not a function"

**Solution:** Make sure you're using the Request type correctly:

```tsx
export async function POST(request: Request) {
  const body = await request.json(); // Correct
}
```

### Issue: Server Action not updating UI

**Solution:** Make sure to call revalidatePath:

```tsx
"use server";
import { revalidatePath } from "next/cache";

export async function updateData() {
  // Update data...

  revalidatePath("/page-to-update"); // Don't forget this!
}
```

### Issue: "Cannot call Server Action from Server Component"

**Solution:** Server Actions must be called from Client Components:

```tsx
// Wrong: Calling from Server Component
export default function Page() {
  await saveProgress("id", "status"); // Error!
}

// Right: Call from Client Component
("use client");
export function Button() {
  const handleClick = () => saveProgress("id", "status"); // OK!
}
```

### Issue: CORS errors when calling API

**Solution:** Add CORS headers if needed:

```tsx
export async function GET() {
  return NextResponse.json(data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
    },
  });
}
```

## Additional Resources

- [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Revalidating Data](https://nextjs.org/docs/app/building-your-application/caching#revalidating-1)

## What's Next?

You can now build full-stack features! In **Module 9**, you'll learn about data fetching patterns - where and how to fetch data effectively.

---

**Progress:** Remember to update your [progress checklist](../progress/checklist.md)!

**Next:** [Module 9: Data Fetching Patterns](./09-data-fetching.md)
