# Module 5: Next.js App Router & Routing

Learn how Next.js handles routing with the App Router - creating pages, dynamic routes, and navigation.

## Learning Objectives

By the end of this module, you will:

- Understand file-based routing in Next.js
- Create dynamic routes with parameters
- Use the Link component for client-side navigation
- Highlight active links with usePathname
- Access route parameters in page components
- Handle 404 errors with notFound()

## Concepts Covered

### File-Based Routing

In Next.js App Router, the file system IS your router:

```
src/app/
  page.tsx          -> /
  topics/
    page.tsx        -> /topics
    [id]/
      page.tsx      -> /topics/react-basics, /topics/nextjs-intro, etc.
  study-plan/
    page.tsx        -> /study-plan
  api/
    topics/
      route.ts      -> /api/topics
```

**Key Rules:**

- `page.tsx` = publicly accessible page
- Folder name = URL segment
- `[id]` = dynamic segment (parameter)
- `layout.tsx` = shared layout for a section
- `loading.tsx` = loading UI
- `error.tsx` = error UI

### The Link Component

Use `Link` for client-side navigation (faster than `<a>` tags):

```tsx
import Link from "next/link";

function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/topics">Topics</Link>
      <Link href="/topics/react-basics">React Basics</Link>
    </nav>
  );
}
```

**Why Link instead of `<a>`?**

- Client-side navigation (no full page reload)
- Automatic prefetching of linked pages
- Preserves client-side state
- Much faster user experience

### Dynamic Routes

Create dynamic routes with brackets `[paramName]`:

```
src/app/topics/[id]/page.tsx
```

Access the parameter in your page:

```tsx
interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TopicPage({ params }: PageProps) {
  const { id } = await params;

  // id will be "react-basics" for /topics/react-basics
  const topic = getTopicById(id);

  return <h1>{topic.title}</h1>;
}
```

### usePathname Hook

Get the current URL path in Client Components:

```tsx
"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <Link
        href="/topics"
        className={pathname === "/topics" ? "text-blue-500" : "text-gray-500"}
      >
        Topics
      </Link>
    </nav>
  );
}
```

### Handling Not Found

Use `notFound()` to show a 404 page:

```tsx
import { notFound } from "next/navigation";

export default async function TopicPage({ params }: PageProps) {
  const { id } = await params;
  const topic = getTopicById(id);

  if (!topic) {
    notFound(); // Shows the not-found.tsx page
  }

  return <h1>{topic.title}</h1>;
}
```

## Hands-On Exercises

### Exercise 5.1: Create Topics List Page

**File:** `src/app/topics/page.tsx`

**Your Task:** Display all topics with links to their detail pages.

**Steps:**

1. **Import Link:**

   ```tsx
   import Link from "next/link";
   ```

2. **Wrap TopicCards in Links:**
   ```tsx
   <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
     {topics.map((topic) => (
       <Link key={topic.id} href={`/topics/${topic.id}`}>
         <TopicCard topic={topic} />
       </Link>
     ))}
   </div>
   ```

**Expected Result:**

- Clicking a topic card navigates to `/topics/[id]`
- Navigation is instant (no page reload)

### Exercise 5.2: Implement Dynamic Topic Detail Page

**File:** `src/app/topics/[id]/page.tsx`

**Your Task:** Show detailed information for a specific topic.

**Steps:**

1. **Define the PageProps type:**

   ```tsx
   interface PageProps {
     params: Promise<{ id: string }>;
   }
   ```

2. **Make the function async and access params:**

   ```tsx
   export default async function TopicDetailPage({ params }: PageProps) {
     const { id } = await params;
     const topic = getTopicById(id);
   ```

3. **Handle not found:**

   ```tsx
   if (!topic) {
     notFound();
   }
   ```

4. **Display topic information:**

   ```tsx
   return (
     <div className="container mx-auto max-w-4xl px-4 py-8">
       <div className="mb-8">
         <h1 className="mb-4 text-3xl font-bold">{topic.title}</h1>
         <div className="mb-4 flex gap-2">
           <Badge variant="secondary">{topic.difficulty}</Badge>
           <Badge variant="outline">{topic.category}</Badge>
         </div>
         <p className="text-muted-foreground">
           Estimated time: {formatDuration(topic.estimatedMinutes)}
         </p>
       </div>

       <Card className="mb-6">
         <CardHeader>
           <CardTitle>About This Topic</CardTitle>
         </CardHeader>
         <CardContent>
           <p>{topic.description}</p>
         </CardContent>
       </Card>

       {topic.prerequisites.length > 0 && (
         <Card className="mb-6">
           <CardHeader>
             <CardTitle>Prerequisites</CardTitle>
           </CardHeader>
           <CardContent>
             <ul className="list-inside list-disc">
               {topic.prerequisites.map((prereq) => (
                 <li key={prereq}>
                   <Link
                     href={`/topics/${prereq}`}
                     className="text-primary hover:underline"
                   >
                     {prereq}
                   </Link>
                 </li>
               ))}
             </ul>
           </CardContent>
         </Card>
       )}

       <Card className="mb-6">
         <CardHeader>
           <CardTitle>Learning Resources</CardTitle>
         </CardHeader>
         <CardContent>
           <div className="space-y-3">
             {topic.resources.map((resource, index) => (
               <div key={index} className="border-b pb-3 last:border-0">
                 <a
                   href={resource.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="font-medium text-primary hover:underline"
                 >
                   {resource.title}
                 </a>
                 <Badge variant="outline" className="ml-2">
                   {resource.type}
                 </Badge>
                 {resource.description && (
                   <p className="mt-1 text-sm text-muted-foreground">
                     {resource.description}
                   </p>
                 )}
               </div>
             ))}
           </div>
         </CardContent>
       </Card>

       <div className="flex gap-4">
         <Button size="lg">Start Learning</Button>
         <Button size="lg" variant="outline">
           Take Quiz
         </Button>
       </div>
     </div>
   );
   ```

### Exercise 5.3: Build Study Plan Page

**File:** `src/app/study-plan/page.tsx`

**Your Task:** Create a page that displays a personalized study plan.

**Steps:**

1. **Import necessary data and components:**

   ```tsx
   import { mockStudyPlans } from "@/lib/data/study-plans";
   import Link from "next/link";
   ```

2. **Display study plan with topic links:**

   ```tsx
   export default function StudyPlanPage() {
     const studyPlan = mockStudyPlans[0]; // Get first plan

     return (
       <div className="container mx-auto px-4 py-8">
         <h1 className="mb-8 text-3xl font-bold">Your Study Plan</h1>

         <div className="space-y-4">
           {studyPlan.topics.map((topicId, index) => (
             <Link
               key={topicId}
               href={`/topics/${topicId}`}
               className="block rounded-lg border p-4 transition hover:bg-muted"
             >
               <span className="mr-4 text-muted-foreground">
                 Step {index + 1}
               </span>
               {topicId}
             </Link>
           ))}
         </div>
       </div>
     );
   }
   ```

### Exercise 5.4: Add Navigation with Link Component

**File:** `src/app/components/layout/Navigation.tsx`

**Your Task:** Complete the navigation with active link highlighting.

**The file is mostly complete! Verify:**

1. **usePathname is imported and used:**

   ```tsx
   const pathname = usePathname();
   ```

2. **Links have active state styling:**
   ```tsx
   <Link
     href={link.href}
     className={cn(
       "text-sm font-medium transition-colors hover:text-primary",
       pathname === link.href ? "text-primary" : "text-muted-foreground"
     )}
   >
     {link.label}
   </Link>
   ```

### Exercise 5.5: Highlight Active Links

**Your Task:** Improve active link detection for nested routes.

For pages like `/topics/react-basics`, you might want to highlight "Topics" in the nav:

```tsx
const isActive =
  link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
```

This makes `/topics` active when viewing `/topics/anything`.

## Verification Checklist

- [ ] Home page accessible at `/`
- [ ] Topics list page accessible at `/topics`
- [ ] Individual topic pages at `/topics/[id]` work
- [ ] Study plan page accessible at `/study-plan`
- [ ] Clicking links doesn't reload the page
- [ ] Active navigation link is highlighted
- [ ] Invalid topic IDs show 404 page
- [ ] Back button works correctly
- [ ] Links prefetch on hover (check Network tab)

## Common Issues & Solutions

### Issue: "params" is a Promise

**Solution:** In Next.js 15+, params is a Promise. You must await it:

```tsx
// Wrong
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id; // Error!
}

// Right
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // Correct
}
```

### Issue: Link causes full page reload

**Solution:** Make sure you're using `next/link`, not a regular `<a>`:

```tsx
// Wrong
<a href="/topics">Topics</a>;

// Right
import Link from "next/link";
<Link href="/topics">Topics</Link>;
```

### Issue: usePathname returns null

**Solution:** `usePathname` only works in Client Components:

```tsx
"use client"; // Add this at the top!

import { usePathname } from "next/navigation";
```

### Issue: notFound() not working

**Solution:** Make sure you import from the correct package:

```tsx
import { notFound } from "next/navigation"; // Correct
// NOT from "next/router"
```

## Additional Resources

- [Next.js Routing Documentation](https://nextjs.org/docs/app/building-your-application/routing)
- [Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
- [Link Component](https://nextjs.org/docs/app/api-reference/components/link)
- [usePathname Hook](https://nextjs.org/docs/app/api-reference/functions/use-pathname)

## What's Next?

You now understand Next.js routing! In **Module 6**, you'll learn the crucial difference between Server Components and Client Components.

---

**Progress:** Remember to update your [progress checklist](../progress/checklist.md)!

**Next:** [Module 6: Server vs Client Components](./06-server-client-components.md)
