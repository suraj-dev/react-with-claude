# Module 4: Side Effects with useEffect

Learn how to handle side effects like data fetching, subscriptions, and DOM manipulation with the `useEffect` hook.

## Learning Objectives

By the end of this module, you will:

- Understand what side effects are
- Use the `useEffect` hook correctly
- Control when effects run with dependency arrays
- Implement cleanup functions
- Fetch data in Client Components
- Handle loading and error states

## Concepts Covered

### What are Side Effects?

**Side effects** are operations that affect things outside your component:

- Fetching data from an API
- Subscribing to events (window resize, WebSocket)
- Manually changing the DOM
- Setting up timers (setTimeout, setInterval)
- Logging to the console
- Saving to localStorage

These can't happen during render because they might be slow or have unpredictable results.

### The useEffect Hook

`useEffect` lets you run code after React has updated the DOM:

```tsx
import { useEffect } from "react";

function Component() {
  useEffect(() => {
    // This code runs AFTER the component renders
    console.log("Component mounted!");
  });

  return <div>Hello</div>;
}
```

### Dependency Arrays

The dependency array controls WHEN the effect runs:

```tsx
// Runs after EVERY render
useEffect(() => {
  console.log("Rendered");
});

// Runs ONCE when component mounts
useEffect(() => {
  console.log("Mounted");
}, []); // Empty array = no dependencies

// Runs when `count` changes
useEffect(() => {
  console.log("Count is now:", count);
}, [count]); // Only re-run when count changes

// Runs when ANY dependency changes
useEffect(() => {
  console.log("User or topic changed");
}, [userId, topicId]);
```

### Cleanup Functions

Some effects need cleanup to prevent memory leaks:

```tsx
useEffect(() => {
  // Setup: subscribe to events
  const handleResize = () => {
    console.log("Window resized");
  };
  window.addEventListener("resize", handleResize);

  // Cleanup: unsubscribe when component unmounts
  // or before the effect runs again
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);
```

**When to use cleanup:**

- Event listeners (addEventListener)
- Timers (setTimeout, setInterval)
- Subscriptions (WebSocket, Firebase)
- Abort controllers for fetch requests

### Data Fetching Pattern

```tsx
function TopicDetails({ topicId }: { topicId: string }) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Flag to prevent state updates on unmounted component
    let isMounted = true;

    const fetchTopic = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/topics/${topicId}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        if (isMounted) {
          setTopic(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTopic();

    // Cleanup: prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, [topicId]); // Re-fetch when topicId changes

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!topic) return <p>Topic not found</p>;

  return <div>{topic.title}</div>;
}
```

### Auto-Scroll Pattern

Scroll to the bottom when new messages arrive:

```tsx
import { useEffect, useRef } from "react";

function MessageList({ messages }: { messages: Message[] }) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Dependency: messages array

  return (
    <div className="overflow-y-auto">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {/* Invisible element at the bottom to scroll to */}
      <div ref={bottomRef} />
    </div>
  );
}
```

## Hands-On Exercises

### Exercise 4.1: Implement Auto-Scroll with useEffect

**File:** `src/app/components/study/MessageList.tsx`

**Your Task:** Add auto-scrolling so new messages are always visible.

**Steps:**

1. **Import useEffect and useRef:**

   ```tsx
   import { useEffect, useRef } from "react";
   ```

2. **Create a ref for the scroll target:**

   ```tsx
   const messagesEndRef = useRef<HTMLDivElement>(null);
   ```

3. **Add useEffect to scroll when messages change:**

   ```tsx
   useEffect(() => {
     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);
   ```

4. **Add the scroll target element at the end:**
   ```tsx
   return (
     <div className="flex flex-col gap-4 p-4">
       {messages.map((message) => (
         <MessageBubble key={message.id} message={message} variant={...} />
       ))}
       <div ref={messagesEndRef} />
     </div>
   );
   ```

### Exercise 4.2: Add Loading States

**File:** `src/app/components/study/StudyInterface.tsx`

**Your Task:** Show loading state while "fetching" assistant response.

**Steps:**

1. **Add loading state:**

   ```tsx
   const [isLoading, setIsLoading] = useState(false);
   ```

2. **Update handleSendMessage:**

   ```tsx
   const handleSendMessage = (content: string) => {
     const userMessage: Message = {
       id: crypto.randomUUID(),
       role: "user",
       content,
       timestamp: new Date(),
     };

     setMessages((prev) => [...prev, userMessage]);
     setIsLoading(true);

     // Simulate API call
     setTimeout(() => {
       const assistantMessage: Message = {
         id: crypto.randomUUID(),
         role: "assistant",
         content: "Here's my response...",
         timestamp: new Date(),
       };
       setMessages((prev) => [...prev, assistantMessage]);
       setIsLoading(false);
     }, 1500);
   };
   ```

3. **Show loading indicator:**

   ```tsx
   <div className="flex-1 overflow-y-auto">
     <MessageList messages={messages} />
     {isLoading && (
       <div className="p-4 text-muted-foreground">
         <p>Assistant is typing...</p>
       </div>
     )}
   </div>
   ```

4. **Disable input while loading:**
   ```tsx
   <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
   ```

### Exercise 4.3: Fetch Data with useEffect

**Your Task:** Create a component that fetches topics from the API.

**Example Implementation:**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Topic } from "@/app/types/topic";

export function TopicsList() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topics");
        if (!response.ok) {
          throw new Error("Failed to fetch topics");
        }
        const data = await response.json();
        setTopics(data.topics);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (isLoading) return <p>Loading topics...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {topics.map((topic) => (
        <li key={topic.id}>{topic.title}</li>
      ))}
    </ul>
  );
}
```

### Exercise 4.4: Implement Cleanup Functions

**Your Task:** Create a timer that cleans up properly.

**Example: Auto-Save Draft**

```tsx
"use client";

import { useState, useEffect } from "react";

export function DraftEditor() {
  const [content, setContent] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    // Auto-save every 30 seconds
    const intervalId = setInterval(() => {
      if (content) {
        // In real app, this would save to backend
        console.log("Auto-saving:", content);
        setLastSaved(new Date());
      }
    }, 30000);

    // Cleanup: clear interval when component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [content]);

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      {lastSaved && <p>Last saved: {lastSaved.toLocaleTimeString()}</p>}
    </div>
  );
}
```

## Verification Checklist

- [x] New messages automatically scroll into view
- [x] Scroll behavior is smooth
- [x] Loading state shows while waiting for response
- [x] Input is disabled during loading
- [x] Data fetching shows loading, then data or error
- [x] No console warnings about state updates on unmounted components
- [x] Cleanup functions prevent memory leaks
- [x] Effects only run when dependencies change

## Common Issues & Solutions

### Issue: useEffect runs infinitely

**Solution:** Check your dependency array. Objects/arrays create new references:

```tsx
// Wrong - runs infinitely (new object every render)
useEffect(() => {
  doSomething(user);
}, [{ name: "John" }]);

// Right - use primitive or memoized value
useEffect(() => {
  doSomething(user);
}, [user.id]); // Primitive value
```

### Issue: "Cannot update state on unmounted component"

**Solution:** Add a cleanup flag:

```tsx
useEffect(() => {
  let isMounted = true;

  fetchData().then((data) => {
    if (isMounted) {
      setData(data);
    }
  });

  return () => {
    isMounted = false;
  };
}, []);
```

### Issue: Effect runs twice in development

**Solution:** This is expected in React 18's Strict Mode! It helps find bugs by running effects twice. Your code should work correctly regardless.

### Issue: Missing dependency warning

**Solution:** Add all values from component scope that the effect uses:

```tsx
// Wrong - missing dependency warning
useEffect(() => {
  console.log(count); // Uses count but doesn't list it
}, []);

// Right - include all dependencies
useEffect(() => {
  console.log(count);
}, [count]);
```

## Additional Resources

- [React useEffect Documentation](https://react.dev/reference/react/useEffect)
- [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)

## What's Next?

You now understand React's core hooks! In **Module 5**, you'll learn about Next.js routing - creating pages and navigating between them.

---

**Progress:** Remember to update your [progress checklist](../progress/checklist.md)!

**Next:** [Module 5: Next.js App Router & Routing](./05-nextjs-routing.md)
