# Module 6: Server vs Client Components

One of Next.js's most powerful features is the ability to choose where your components run. Learn when to use Server Components vs Client Components.

## Learning Objectives

By the end of this module, you will:

- Understand the difference between Server and Client Components
- Know when to use each type
- Use the "use client" directive correctly
- Mix Server and Client Components effectively
- Understand the performance implications of each

## Concepts Covered

### Server Components (Default)

In Next.js App Router, **all components are Server Components by default**. They:

- Run only on the server
- Can directly access databases, file systems, and APIs
- Don't add JavaScript to the client bundle
- Cannot use hooks (useState, useEffect) or browser APIs

```tsx
// This is a Server Component (default)
// No "use client" directive needed

import { getTopics } from "@/lib/db";

async function TopicsPage() {
  // Can fetch data directly!
  const topics = await getTopics();

  return (
    <ul>
      {topics.map((topic) => (
        <li key={topic.id}>{topic.title}</li>
      ))}
    </ul>
  );
}
```

### Client Components

Add `"use client"` at the top to make a Client Component. They:

- Run in the browser (also pre-rendered on server)
- Can use hooks (useState, useEffect, useContext)
- Can handle browser events (onClick, onChange)
- Can access browser APIs (localStorage, window)

```tsx
"use client";

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```

### When to Use Each

| Server Components             | Client Components                        |
| ----------------------------- | ---------------------------------------- |
| Fetch data                    | User interactions (clicks, input)        |
| Access backend resources      | useState, useEffect, useContext          |
| Keep sensitive info on server | Browser APIs (localStorage, geolocation) |
| Large dependencies            | Event listeners                          |
| Static content                | Real-time updates                        |

**Decision Flowchart:**

1. Does it need interactivity? -> Client
2. Does it use React hooks? -> Client
3. Does it access browser APIs? -> Client
4. Otherwise -> Server (default)

### The "use client" Boundary

When you add `"use client"`, that component AND all its children become Client Components:

```
ServerComponent.tsx (Server)
  ├── AnotherServerComponent.tsx (Server)
  └── ClientComponent.tsx (Client - has "use client")
        ├── ChildA.tsx (Client - inherited!)
        └── ChildB.tsx (Client - inherited!)
```

**Important:** The boundary only goes DOWN, not UP. Parent components stay as Server Components.

### Mixing Server and Client Components

**Pattern 1: Pass Server Component as Child**

```tsx
// page.tsx (Server Component)
import { ClientWrapper } from "./ClientWrapper";
import { ServerContent } from "./ServerContent";

export default function Page() {
  return (
    <ClientWrapper>
      <ServerContent /> {/* This stays a Server Component! */}
    </ClientWrapper>
  );
}

// ClientWrapper.tsx
("use client");
export function ClientWrapper({ children }) {
  return <div className="interactive-wrapper">{children}</div>;
}
```

**Pattern 2: Fetch in Server, Interact in Client**

```tsx
// page.tsx (Server Component)
import { QuizInterface } from "./QuizInterface";
import { getQuiz } from "@/lib/db";

export default async function QuizPage() {
  const quiz = await getQuiz(); // Fetch on server

  return <QuizInterface quiz={quiz} />; // Pass to client
}

// QuizInterface.tsx
("use client");
export function QuizInterface({ quiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // Interactive logic here
}
```

## Hands-On Exercises

### Exercise 6.1: Convert Interactive Components to Client Components

**File:** `src/app/components/study/ChatInput.tsx`

**Verify it has "use client"** at the top since it:

- Uses useState for input value
- Handles form events (onChange, onSubmit)

```tsx
"use client";

import { useState } from "react";
// ... rest of component
```

### Exercise 6.2: Build QuizInterface as Client Component

**File:** `src/app/components/quiz/QuizInterface.tsx`

**Your Task:** Complete the interactive quiz component.

**Steps:**

1. **Verify "use client" is at the top:**

   ```tsx
   "use client";
   ```

2. **Add necessary state:**

   ```tsx
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [answers, setAnswers] = useState<number[]>([]);
   const [isComplete, setIsComplete] = useState(false);

   const currentQuestion = quiz.questions[currentQuestionIndex];
   ```

3. **Implement handleAnswerSelect:**

   ```tsx
   const handleAnswerSelect = (answerIndex: number) => {
     const newAnswers = [...answers, answerIndex];
     setAnswers(newAnswers);

     if (currentQuestionIndex < quiz.questions.length - 1) {
       setCurrentQuestionIndex(currentQuestionIndex + 1);
     } else {
       setIsComplete(true);
     }
   };
   ```

4. **Implement calculateScore:**

   ```tsx
   const calculateScore = () => {
     let correct = 0;
     answers.forEach((answer, index) => {
       if (answer === quiz.questions[index].correctAnswer) {
         correct++;
       }
     });
     return Math.round((correct / quiz.questions.length) * 100);
   };
   ```

5. **Render the quiz interface:**

   ```tsx
   if (isComplete) {
     const score = calculateScore();
     const passed = score >= quiz.passingScore;

     return (
       <Card>
         <CardHeader>
           <CardTitle>Quiz Complete!</CardTitle>
         </CardHeader>
         <CardContent>
           <p className="mb-4 text-2xl font-bold">Score: {score}%</p>
           <Badge variant={passed ? "default" : "destructive"}>
             {passed ? "Passed!" : "Try Again"}
           </Badge>
           <Button
             className="mt-4"
             onClick={() => {
               setCurrentQuestionIndex(0);
               setAnswers([]);
               setIsComplete(false);
             }}
           >
             Retake Quiz
           </Button>
         </CardContent>
       </Card>
     );
   }

   return (
     <Card>
       <CardHeader>
         <CardTitle>{quiz.title}</CardTitle>
         <p className="text-sm text-muted-foreground">
           Question {currentQuestionIndex + 1} of {quiz.questions.length}
         </p>
       </CardHeader>
       <CardContent>
         <p className="mb-4 text-lg">{currentQuestion.question}</p>
         <div className="space-y-2">
           {currentQuestion.options.map((option, index) => (
             <Button
               key={index}
               variant="outline"
               className="w-full justify-start"
               onClick={() => handleAnswerSelect(index)}
             >
               {option}
             </Button>
           ))}
         </div>
       </CardContent>
     </Card>
   );
   ```

### Exercise 6.3: Understand Server Component Benefits

**File:** `src/app/topics/page.tsx`

**Observe:** This is a Server Component (no "use client"). Notice:

- Data is imported directly (not fetched with useEffect)
- No loading state needed
- Faster initial page load
- Better SEO (content is in HTML)

```tsx
// Server Component - data is available immediately
import { mockTopics } from "@/lib/data/topics";

export default function TopicsPage() {
  const topics = mockTopics; // Direct access!

  return (
    <div>
      {topics.map((topic) => (
        <TopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
}
```

### Exercise 6.4: Mix Server and Client Components

**Your Task:** Create a page that uses both component types effectively.

**Example Pattern:**

```tsx
// src/app/topics/[id]/page.tsx (Server Component)
import { getTopicById } from "@/lib/data/topics";
import { getQuizByTopicId } from "@/lib/data/quizzes";
import { QuizInterface } from "@/app/components/quiz/QuizInterface";

export default async function TopicPage({ params }) {
  const { id } = await params;

  // Fetch data on the server
  const topic = getTopicById(id);
  const quiz = getQuizByTopicId(id);

  return (
    <div>
      {/* Server-rendered content */}
      <h1>{topic.title}</h1>
      <p>{topic.description}</p>

      {/* Client Component for interactivity */}
      {quiz && <QuizInterface quiz={quiz} />}
    </div>
  );
}
```

## Verification Checklist

- [ ] Interactive components have "use client" directive
- [ ] Server Components don't have "use client"
- [ ] useState/useEffect only used in Client Components
- [ ] Data fetching happens in Server Components when possible
- [ ] QuizInterface handles all quiz logic correctly
- [ ] Score calculation works properly
- [ ] Quiz can be retaken
- [ ] No hydration errors in console

## Common Issues & Solutions

### Issue: "useState is not a function" or "Cannot use hooks"

**Solution:** Add "use client" at the very top of the file:

```tsx
"use client"; // Must be FIRST line (before imports!)

import { useState } from "react";
```

### Issue: "Event handlers cannot be passed to Client Component props"

**Solution:** Move the event handler into a Client Component:

```tsx
// Wrong: onClick in Server Component
<button onClick={() => console.log("clicked")}>Click</button>;

// Right: Create a Client Component
("use client");
function ClickableButton() {
  return <button onClick={() => console.log("clicked")}>Click</button>;
}
```

### Issue: Hydration mismatch

**Solution:** Ensure server and client render the same content:

```tsx
// Wrong: Different content on server vs client
function Component() {
  return <p>Time: {new Date().toLocaleTimeString()}</p>;
}

// Right: Use useEffect for client-only content
("use client");
function Component() {
  const [time, setTime] = useState<string>();

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);

  return <p>Time: {time ?? "Loading..."}</p>;
}
```

### Issue: Can't import Server Component into Client Component

**Solution:** Pass as children instead:

```tsx
// Wrong: Direct import
"use client";
import { ServerComponent } from "./ServerComponent"; // Won't work!

// Right: Pass as children from a Server Component parent
// page.tsx (Server)
<ClientWrapper>
  <ServerComponent />
</ClientWrapper>;
```

## Why This Matters

| Benefit       | Server Components      | Client Components |
| ------------- | ---------------------- | ----------------- |
| Bundle Size   | No JS sent to client   | JS required       |
| Data Fetching | Direct access          | Need API calls    |
| Security      | Secrets stay on server | Exposed to client |
| SEO           | Content in HTML        | May need JS       |
| Interactivity | None                   | Full support      |

**Best Practice:** Start with Server Components. Only add "use client" when you need interactivity.

## Additional Resources

- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- [Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns)

## What's Next?

You understand the rendering model! In **Module 7**, you'll learn about layouts, loading states, and error boundaries.

---

**Progress:** Remember to update your [progress checklist](../progress/checklist.md)!

**Next:** [Module 7: Layouts, Loading & Error States](./07-layouts-loading-errors.md)
