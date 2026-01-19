# Module 7: Layouts, Loading & Error States

Learn how Next.js handles shared layouts, loading states, and error boundaries to create polished user experiences.

## Learning Objectives

By the end of this module, you will:

- Create shared layouts that persist across pages
- Implement loading UI with Suspense
- Build error boundaries to catch and display errors
- Use skeleton components for better loading UX
- Understand nested routing features

## Concepts Covered

### Layouts

Layouts wrap pages and persist across navigation. They're perfect for:

- Navigation bars
- Sidebars
- Footers
- Shared UI elements

```
src/app/
  layout.tsx       <- Root layout (wraps everything)
  page.tsx
  topics/
    layout.tsx     <- Topics layout (wraps /topics/*)
    page.tsx
    [id]/
      page.tsx
```

```tsx
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Key Points:**

- Layouts receive `children` prop (the page content)
- Layouts don't re-render on navigation (state is preserved)
- You can nest layouts for different sections

### Loading UI

Create `loading.tsx` to show while pages load:

```tsx
// src/app/topics/loading.tsx
export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <p>Loading topics...</p>
    </div>
  );
}
```

Next.js automatically wraps pages in Suspense and shows this during loading.

### Skeleton Components

Skeletons provide a better loading experience than spinners:

```tsx
import { Skeleton } from "@/app/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      {/* Page title skeleton */}
      <Skeleton className="mb-4 h-10 w-64" />

      {/* Content skeleton */}
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    </div>
  );
}
```

**Why Skeletons?**

- Show the structure of upcoming content
- Reduce perceived loading time
- Less jarring than spinners
- Match your actual layout

### Error Boundaries

Create `error.tsx` to catch errors in a route segment:

```tsx
"use client"; // Must be a Client Component!

import { useEffect } from "react";
import { Button } from "@/app/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="p-8 text-center">
      <h2 className="mb-4 text-xl font-bold">Something went wrong!</h2>
      <p className="mb-4 text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
```

**Key Points:**

- Must be a Client Component (uses hooks)
- Receives `error` and `reset` props
- `reset` attempts to re-render the segment
- Error boundaries don't catch errors in layouts

### Not Found Pages

Create `not-found.tsx` for 404 errors:

```tsx
// src/app/not-found.tsx
import Link from "next/link";
import { Button } from "@/app/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-8 text-muted-foreground">Page not found</p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
```

Trigger with `notFound()`:

```tsx
import { notFound } from "next/navigation";

export default async function TopicPage({ params }) {
  const topic = await getTopic(params.id);

  if (!topic) {
    notFound(); // Shows not-found.tsx
  }

  return <div>{topic.title}</div>;
}
```

## Hands-On Exercises

### Exercise 7.1: Enhance Root Layout with Navigation

**File:** `src/app/layout.tsx`

**Your Task:** Add Header, Navigation, and Footer to the root layout.

**Steps:**

1. **Import components:**

   ```tsx
   import { Header } from "@/app/components/layout/Header";
   import { Navigation } from "@/app/components/layout/Navigation";
   import { Footer } from "@/app/components/layout/Footer";
   ```

2. **Update the layout:**
   ```tsx
   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode;
   }) {
     return (
       <html lang="en">
         <body
           className={`${inter.variable} flex min-h-screen flex-col font-sans antialiased`}
         >
           <header className="border-b">
             <div className="container mx-auto flex items-center justify-between px-4 py-4">
               <Header />
               <Navigation />
             </div>
           </header>
           <main className="flex-1">{children}</main>
           <Footer />
         </body>
       </html>
     );
   }
   ```

**Expected Result:**

- Header and navigation appear on all pages
- Footer sticks to the bottom
- Navigation between pages keeps the layout

### Exercise 7.2: Create loading.tsx with Skeletons

**File:** `src/app/loading.tsx` (already exists - enhance it)

**Current implementation uses Skeleton components. Verify it works:**

```tsx
import { Skeleton } from "@/app/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
```

**Create a specific loading for topics:**

**File:** `src/app/topics/loading.tsx`

```tsx
import { Skeleton } from "@/app/components/ui/skeleton";

export default function TopicsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-2 h-10 w-48" />
      <Skeleton className="mb-8 h-5 w-96" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-4">
            <Skeleton className="mb-2 h-6 w-3/4" />
            <Skeleton className="mb-4 h-4 w-full" />
            <div className="mb-4 flex gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Exercise 7.3: Implement error.tsx Boundary

**File:** `src/app/error.tsx` (already exists - study it)

**The implementation handles:**

- Logging errors to console
- Displaying user-friendly message
- Showing error details in development
- Providing "Try Again" and "Go Home" buttons

**Create a specific error boundary for topics:**

**File:** `src/app/topics/error.tsx`

```tsx
"use client";

import { useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function TopicsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Topics error:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h2 className="mb-4 text-2xl font-bold">Failed to load topics</h2>
      <p className="mb-8 text-muted-foreground">
        We couldn't load the topics. Please try again.
      </p>
      <div className="flex justify-center gap-4">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
```

### Exercise 7.4: Add Nested Loading States

**File:** `src/app/topics/[id]/loading.tsx` (already exists)

**Enhance the topic detail loading state:**

```tsx
import { Skeleton } from "@/app/components/ui/skeleton";

export default function TopicDetailLoading() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Title and badges */}
      <div className="mb-8">
        <Skeleton className="mb-4 h-10 w-2/3" />
        <div className="mb-4 flex gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
        <Skeleton className="h-5 w-48" />
      </div>

      {/* About section */}
      <div className="mb-6 rounded-lg border p-6">
        <Skeleton className="mb-4 h-6 w-32" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="mb-2 h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      {/* Resources section */}
      <div className="mb-6 rounded-lg border p-6">
        <Skeleton className="mb-4 h-6 w-40" />
        <div className="space-y-3">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <Skeleton className="h-12 w-40" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  );
}
```

## Verification Checklist

- [ ] Header and navigation appear on all pages
- [ ] Footer appears at the bottom of all pages
- [ ] Loading skeletons show during page transitions
- [ ] Topics list shows skeleton while loading
- [ ] Topic detail shows skeleton while loading
- [ ] Error boundary catches and displays errors
- [ ] "Try Again" button attempts to re-render
- [ ] 404 page shows for invalid routes
- [ ] Navigation preserves layout state (no flicker)

## Common Issues & Solutions

### Issue: Layout not applying to certain pages

**Solution:** Check the file structure. Layouts apply to pages at the same level and below:

```
src/app/
  layout.tsx     <- Applies to ALL pages
  topics/
    layout.tsx   <- Only applies to /topics/*
    page.tsx
```

### Issue: Error boundary not catching errors

**Solution:** Error boundaries only catch errors in their children, not in:

- The error boundary itself
- Layouts (create layout-level error handling)
- Root layout (use global-error.tsx)

```tsx
// src/app/global-error.tsx
"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h1>Something went wrong!</h1>
        <button onClick={reset}>Try again</button>
      </body>
    </html>
  );
}
```

### Issue: Loading state never shows

**Solution:** Loading states only show for Server Components that are fetching data. For instant pages:

```tsx
// Add artificial delay to see loading state (for testing only)
async function TopicsPage() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  // ...
}
```

### Issue: Skeleton doesn't match actual layout

**Solution:** Design skeletons to match your actual component structure:

```tsx
// Look at your TopicCard component
// Create skeletons that match its structure

// TopicCard has: title, description, badges, time, button
<div className="rounded-lg border p-4">
  <Skeleton className="mb-2 h-6 w-3/4" /> {/* title */}
  <Skeleton className="mb-4 h-4 w-full" /> {/* description */}
  <div className="mb-4 flex gap-2">
    <Skeleton className="h-6 w-20" /> {/* badge 1 */}
    <Skeleton className="h-6 w-16" /> {/* badge 2 */}
  </div>
  <Skeleton className="h-10 w-full" /> {/* button */}
</div>
```

## File Structure Summary

```
src/app/
  layout.tsx          <- Root layout
  loading.tsx         <- Root loading state
  error.tsx           <- Root error boundary
  not-found.tsx       <- 404 page
  page.tsx            <- Home page
  topics/
    layout.tsx        <- Topics section layout (optional)
    loading.tsx       <- Topics loading state
    error.tsx         <- Topics error boundary
    page.tsx          <- Topics list
    [id]/
      loading.tsx     <- Topic detail loading
      page.tsx        <- Topic detail
```

## Additional Resources

- [Layouts and Templates](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates)
- [Loading UI and Streaming](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
- [Error Handling](https://nextjs.org/docs/app/building-your-application/routing/error-handling)
- [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)

## What's Next?

Your app now has a polished UI with proper loading and error states! In **Module 8**, you'll learn about API Routes and Server Actions.

---

**Progress:** Remember to update your [progress checklist](../progress/checklist.md)!

**Next:** [Module 8: API Routes & Server Actions](./08-api-routes-actions.md)
