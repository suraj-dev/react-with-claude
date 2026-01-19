# Module 9: Data Fetching Patterns

Master the art of fetching data in Next.js - from Server Components to Client Components, and everything in between.

## Learning Objectives

By the end of this module, you will:

- Fetch data in Server Components (the preferred way)
- Fetch data in Client Components with useEffect
- Implement parallel data fetching for better performance
- Understand caching and revalidation strategies
- Handle loading and error states properly

## Concepts Covered

### Data Fetching in Server Components

Server Components can fetch data directly - no useEffect needed!

```tsx
// Server Component - async/await just works!
async function TopicsPage() {
  const topics = await fetch("https://api.example.com/topics").then((r) =>
    r.json()
  );

  return (
    <ul>
      {topics.map((topic) => (
        <li key={topic.id}>{topic.title}</li>
      ))}
    </ul>
  );
}
```

**Benefits:**

- Simpler code (no useState/useEffect)
- Data available immediately on render
- Better SEO (content in HTML)
- Reduced client-side JavaScript
- Automatic request deduplication

### Data Fetching in Client Components

For dynamic, user-driven data fetching, use Client Components:

```tsx
"use client";

import { useState, useEffect } from "react";

function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/search?q=${query}`);
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (isLoading) return <p>Searching...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {results.map((r) => (
        <li key={r.id}>{r.title}</li>
      ))}
    </ul>
  );
}
```

### Parallel vs Sequential Fetching

**Sequential (Waterfall)** - Slower, one after another:

```tsx
async function Page() {
  const user = await getUser(); // Wait...
  const posts = await getPosts(); // Then wait...
  const comments = await getComments(); // Then wait...
  // Total time: user + posts + comments
}
```

**Parallel** - Faster, all at once:

```tsx
async function Page() {
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments(),
  ]);
  // Total time: max(user, posts, comments)
}
```

### Caching Strategies

Next.js caches fetch requests by default. Control it with options:

```tsx
// Default: Cached indefinitely (in production)
fetch("https://api.example.com/data");

// Revalidate every 60 seconds
fetch("https://api.example.com/data", {
  next: { revalidate: 60 },
});

// No caching - always fresh
fetch("https://api.example.com/data", {
  cache: "no-store",
});

// Revalidate on demand (with tags)
fetch("https://api.example.com/topics", {
  next: { tags: ["topics"] },
});

// Then in a Server Action:
import { revalidateTag } from "next/cache";
revalidateTag("topics");
```

### Where to Fetch Data

| Scenario                        | Where to Fetch               |
| ------------------------------- | ---------------------------- |
| Initial page data               | Server Component             |
| User-triggered (search, filter) | Client Component             |
| Real-time updates               | Client Component             |
| SEO-critical content            | Server Component             |
| Private user data               | Server Component (with auth) |

## Hands-On Exercises

### Exercise 9.1: Server-Side Data Fetching

**File:** `src/app/topics/page.tsx`

**Your Task:** Fetch topics from the API in a Server Component.

**Steps:**

1. **Create an async fetch function:**

   ```tsx
   async function getTopics() {
     const response = await fetch("http://localhost:3000/api/topics", {
       cache: "no-store", // Always get fresh data in development
     });

     if (!response.ok) {
       throw new Error("Failed to fetch topics");
     }

     return response.json();
   }
   ```

2. **Make the page component async:**

   ```tsx
   export default async function TopicsPage() {
     const { topics } = await getTopics();

     return (
       <div className="container mx-auto px-4 py-8">
         <h1 className="mb-8 text-3xl font-bold">Learning Topics</h1>

         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
           {topics.map((topic) => (
             <Link key={topic.id} href={`/topics/${topic.id}`}>
               <TopicCard topic={topic} />
             </Link>
           ))}
         </div>
       </div>
     );
   }
   ```

**Note:** In production, you can use relative URLs and Next.js will handle them.

### Exercise 9.2: Client-Side Data Fetching

**Your Task:** Create a search component that fetches results as the user types.

**File:** Create `src/app/components/study/TopicSearch.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { Topic } from "@/app/types/topic";
import Link from "next/link";

export function TopicSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Don't search for empty queries
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Debounce: wait 300ms after user stops typing
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/topics?search=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setResults(data.topics);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    // Cleanup: cancel timeout if query changes
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Search topics..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full"
      />

      {isLoading && (
        <p className="mt-2 text-sm text-muted-foreground">Searching...</p>
      )}

      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-lg border bg-background shadow-lg">
          {results.map((topic) => (
            <Link
              key={topic.id}
              href={`/topics/${topic.id}`}
              className="block p-3 hover:bg-muted"
            >
              <p className="font-medium">{topic.title}</p>
              <p className="text-sm text-muted-foreground">
                {topic.category} - {topic.difficulty}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Exercise 9.3: Parallel Data Fetching

**File:** `src/app/topics/[id]/page.tsx`

**Your Task:** Fetch topic and quiz data in parallel.

**Steps:**

1. **Create fetch functions:**

   ```tsx
   async function getTopic(id: string) {
     const response = await fetch(`http://localhost:3000/api/topics/${id}`);
     if (!response.ok) return null;
     return response.json();
   }

   async function getQuiz(topicId: string) {
     const response = await fetch(
       `http://localhost:3000/api/quizzes?topicId=${topicId}`
     );
     if (!response.ok) return null;
     return response.json();
   }

   async function getRelatedTopics(category: string, currentId: string) {
     const response = await fetch(
       `http://localhost:3000/api/topics?category=${category}`
     );
     if (!response.ok) return [];
     const data = await response.json();
     return data.topics.filter((t: Topic) => t.id !== currentId).slice(0, 3);
   }
   ```

2. **Fetch in parallel:**

   ```tsx
   export default async function TopicDetailPage({ params }: PageProps) {
     const { id } = await params;

     // First, get the topic (we need it for the category)
     const topic = await getTopic(id);

     if (!topic) {
       notFound();
     }

     // Now fetch quiz and related topics in parallel
     const [quiz, relatedTopics] = await Promise.all([
       getQuiz(id),
       getRelatedTopics(topic.category, id),
     ]);

     return (
       <div>
         <h1>{topic.title}</h1>
         {/* ... topic content ... */}

         {quiz && <QuizInterface quiz={quiz} />}

         {relatedTopics.length > 0 && (
           <section>
             <h2>Related Topics</h2>
             {relatedTopics.map((t) => (
               <TopicCard key={t.id} topic={t} />
             ))}
           </section>
         )}
       </div>
     );
   }
   ```

### Exercise 9.4: Implement Caching Strategies

**Your Task:** Add appropriate caching to different fetch calls.

**Examples:**

```tsx
// Topics list - revalidate every 5 minutes (data changes occasionally)
async function getTopics() {
  const response = await fetch("http://localhost:3000/api/topics", {
    next: { revalidate: 300 }, // 5 minutes
  });
  return response.json();
}

// Individual topic - cache with tag for on-demand revalidation
async function getTopic(id: string) {
  const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
    next: { tags: [`topic-${id}`] },
  });
  return response.json();
}

// User progress - no cache (always needs fresh data)
async function getUserProgress(userId: string) {
  const response = await fetch(`http://localhost:3000/api/progress/${userId}`, {
    cache: "no-store",
  });
  return response.json();
}
```

**In Server Actions, trigger revalidation:**

```tsx
"use server";

import { revalidateTag } from "next/cache";

export async function updateTopic(topicId: string, data: unknown) {
  // Update in database...

  // Invalidate the cache for this topic
  revalidateTag(`topic-${topicId}`);
}
```

## Data Fetching Patterns Summary

### Pattern 1: Server Component with Direct Fetch

```tsx
// Best for: Initial page data, SEO content
async function Page() {
  const data = await fetch("...");
  return <div>{/* render data */}</div>;
}
```

### Pattern 2: Client Component with useEffect

```tsx
// Best for: User interactions, real-time data
"use client";
function Component() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("...").then(setData);
  }, []);
  return <div>{/* render data */}</div>;
}
```

### Pattern 3: Server fetches, Client interacts

```tsx
// Best for: Initial data + interactivity
// page.tsx (Server)
async function Page() {
  const initialData = await fetch("...");
  return <InteractiveComponent initialData={initialData} />;
}

// InteractiveComponent.tsx (Client)
("use client");
function InteractiveComponent({ initialData }) {
  const [data, setData] = useState(initialData);
  // User can update data...
}
```

## Verification Checklist

- [ ] Topics page fetches data from API on the server
- [ ] Topic detail page fetches topic and related data
- [ ] Parallel fetching works (check Network tab timing)
- [ ] Client-side search works with debouncing
- [ ] Loading states show during data fetching
- [ ] Error states display when fetch fails
- [ ] Caching works (repeat visits are faster)
- [ ] revalidatePath/revalidateTag updates cached data

## Common Issues & Solutions

### Issue: Fetch fails with "URL is not valid"

**Solution:** Use absolute URLs in Server Components during development:

```tsx
// In Server Components, use full URL
fetch("http://localhost:3000/api/topics");

// Or set up a base URL utility
const API_URL = process.env.API_URL || "http://localhost:3000";
fetch(`${API_URL}/api/topics`);
```

### Issue: Data is stale after mutation

**Solution:** Use revalidation:

```tsx
// After updating data, revalidate
import { revalidatePath, revalidateTag } from "next/cache";

revalidatePath("/topics"); // Revalidate specific path
revalidateTag("topics"); // Revalidate by tag
```

### Issue: Client fetch not updating after server change

**Solution:** The client and server have separate caches:

```tsx
// Option 1: Force refresh in client
const response = await fetch("/api/topics", {
  cache: "no-store",
});

// Option 2: Add timestamp to bust cache
const response = await fetch(`/api/topics?t=${Date.now()}`);

// Option 3: Use SWR or React Query for better cache management
```

### Issue: Too many requests (search triggers on every keystroke)

**Solution:** Implement debouncing:

```tsx
useEffect(() => {
  const timeoutId = setTimeout(() => {
    // Fetch here
  }, 300); // Wait 300ms

  return () => clearTimeout(timeoutId);
}, [query]);
```

## Additional Resources

- [Data Fetching in Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Caching in Next.js](https://nextjs.org/docs/app/building-your-application/caching)
- [Revalidating Data](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating)

## What's Next?

You've mastered data fetching! In **Module 10**, you'll bring it all together by integrating an AI agent with LangGraph.

---

**Progress:** Remember to update your [progress checklist](../progress/checklist.md)!

**Next:** [Module 10: LangGraph AI Integration](./10-langgraph-integration.md)
