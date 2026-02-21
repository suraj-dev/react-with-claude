# Module 3: State Management with useState

Time to make your components interactive! Learn how to manage state with React's `useState` hook.

## Learning Objectives

By the end of this module, you will:

- Understand what state is and why it's needed
- Use the `useState` hook effectively
- Manage input state with controlled components
- Update arrays and objects in state
- Handle form events (onChange, onSubmit)
- Implement form validation
- Understand the concept of "lifting state up"

## Concepts Covered

### What is State?

**State** is data that changes over time in your component. When state changes, React re-renders the component to reflect the new data.

```tsx
// Without state (static)
function Counter() {
  const count = 0;
  return <p>Count: {count}</p>; // Always shows 0
}

// With state (dynamic)
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}
```

### The useState Hook

`useState` returns an array with two elements:

1. The current state value
2. A function to update it

```tsx
import { useState } from "react";

function Example() {
  // Syntax: const [value, setValue] = useState(initialValue);
  const [name, setName] = useState(""); // String
  const [count, setCount] = useState(0); // Number
  const [isOpen, setIsOpen] = useState(false); // Boolean
  const [items, setItems] = useState<string[]>([]); // Array
  const [user, setUser] = useState<User | null>(null); // Object
}
```

### Controlled Components

In controlled components, form inputs get their value from React state:

```tsx
function SearchInput() {
  const [query, setQuery] = useState("");

  return (
    <input
      type="text"
      value={query} // Value comes from state
      onChange={(e) => setQuery(e.target.value)} // State updates on change
    />
  );
}
```

**Why Controlled Components?**

- Single source of truth (state)
- Easy validation
- Easy to manipulate programmatically
- Predictable behavior

### Updating Arrays in State

Never mutate state directly! Always create a new array:

```tsx
const [messages, setMessages] = useState<Message[]>([]);

// Adding to array
const addMessage = (newMessage: Message) => {
  setMessages([...messages, newMessage]); // Spread and add
  // OR with functional update (safer when depending on previous state)
  setMessages((prev) => [...prev, newMessage]);
};

// Removing from array
const removeMessage = (id: string) => {
  setMessages((prev) => prev.filter((msg) => msg.id !== id));
};

// Updating an item in array
const updateMessage = (id: string, newContent: string) => {
  setMessages((prev) =>
    prev.map((msg) => (msg.id === id ? { ...msg, content: newContent } : msg))
  );
};
```

### Functional Updates

When new state depends on previous state, use functional updates:

```tsx
// May cause issues (closure captures old value)
setCount(count + 1);
setCount(count + 1); // Both read the same old count!

// Safe (always uses latest state)
setCount((prev) => prev + 1);
setCount((prev) => prev + 1); // Each uses updated value
```

### Lifting State Up

When multiple components need to share state, move it to their common parent:

```tsx
// Parent manages state
function StudyInterface() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (content: string) => {
    // Add message to state
  };

  return (
    <div>
      {/* Child displays state */}
      <MessageList messages={messages} />
      {/* Child updates state */}
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}
```

## Hands-On Exercises

### Exercise 3.1: Implement ChatInput with State

**File:** `src/app/components/study/ChatInput.tsx`

**Your Task:** Create a controlled input that sends messages.

**Steps:**

1. **Import useState:**

   ```tsx
   import { useState } from "react";
   ```

2. **Create state for input value:**

   ```tsx
   const [inputValue, setInputValue] = useState("");
   ```

3. **Implement handleInputChange:**

   ```tsx
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setInputValue(e.target.value);
   };
   ```

4. **Implement handleSubmit:**

   ```tsx
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     const trimmedMessage = inputValue.trim();
     if (trimmedMessage) {
       onSendMessage(trimmedMessage);
       setInputValue(""); // Clear input after sending
     }
   };
   ```

5. **Connect state to the input:**

   ```tsx
   <Input
     type="text"
     placeholder={placeholder}
     value={inputValue}
     onChange={handleInputChange}
     className="flex-1"
   />
   ```

6. **Disable button when empty:**
   ```tsx
   <Button type="submit" disabled={!inputValue.trim()}>
     Send
   </Button>
   ```

### Exercise 3.2: Complete MessageList Rendering

**File:** `src/app/components/study/MessageList.tsx`

**Your Task:** Render a list of messages using the `map()` method.

**Steps:**

1. **Map over messages and render MessageBubble:**
   ```tsx
   {
     messages.map((message) => (
       <MessageBubble
         key={message.id}
         message={message}
         variant={
           message.role === "user"
             ? "user"
             : message.role === "assistant"
               ? "assistant"
               : "system"
         }
       />
     ));
   }
   ```

**Key Points:**

- Always use a unique `key` prop when mapping
- Use `message.id` as the key (not array index)
- Determine variant based on `message.role`

### Exercise 3.3: Build StudyInterface with Message State

**File:** `src/app/components/study/StudyInterface.tsx`

**Your Task:** Manage the messages array state and connect child components.

**Steps:**

1. **Import useState:**

   ```tsx
   import { useState } from "react";
   ```

2. **Create messages state with a welcome message:**

   ```tsx
   const [messages, setMessages] = useState<Message[]>([
     {
       id: "welcome",
       role: "system",
       content: "Welcome! Ask me anything about React, Next.js, or LangGraph.",
       timestamp: new Date(),
     },
   ]);
   ```

3. **Implement handleSendMessage:**

   ```tsx
   const handleSendMessage = (content: string) => {
     const userMessage: Message = {
       id: crypto.randomUUID(),
       role: "user",
       content,
       timestamp: new Date(),
     };

     setMessages((prev) => [...prev, userMessage]);

     // Simulate assistant response
     setTimeout(() => {
       const assistantMessage: Message = {
         id: crypto.randomUUID(),
         role: "assistant",
         content:
           "Thanks for your question! In Module 10, you'll connect this to a real AI.",
         timestamp: new Date(),
       };
       setMessages((prev) => [...prev, assistantMessage]);
     }, 1000);
   };
   ```

4. **Render the child components:**
   ```tsx
   <div className="flex-1 overflow-y-auto">
     <MessageList messages={messages} />
   </div>
   <div className="border-t p-4 bg-background">
     <ChatInput onSendMessage={handleSendMessage} />
   </div>
   ```

### Exercise 3.4: Handle Form Submission and Validation

**Your Task:** Add validation to the ChatInput component.

**Bonus Features to Implement:**

1. **Character limit:**

   ```tsx
   const MAX_LENGTH = 500;

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     if (e.target.value.length <= MAX_LENGTH) {
       setInputValue(e.target.value);
     }
   };

   // Show character count
   <p className="text-xs text-muted-foreground">
     {inputValue.length}/{MAX_LENGTH}
   </p>;
   ```

2. **Loading state:**

   ```tsx
   const [isLoading, setIsLoading] = useState(false);

   <Input disabled={isLoading} ... />
   <Button disabled={!inputValue.trim() || isLoading}>
     {isLoading ? "Sending..." : "Send"}
   </Button>
   ```

## Verification Checklist

- [x] ChatInput updates state as you type
- [x] Pressing Enter or clicking Send submits the message
- [x] Input clears after successful submission
- [x] Empty messages cannot be sent
- [x] Button is disabled when input is empty
- [x] MessageList renders all messages with correct styling
- [x] Each message has a unique key (no console warnings)
- [x] StudyInterface maintains message history
- [x] New messages appear at the bottom
- [x] Simulated assistant responses appear after delay

## Common Issues & Solutions

### Issue: "Cannot read property of undefined"

**Solution:** Check that state is initialized correctly:

```tsx
// Wrong - may be undefined on first render
const [messages, setMessages] = useState();

// Right - initialize with empty array
const [messages, setMessages] = useState<Message[]>([]);
```

### Issue: Input not updating when typing

**Solution:** Make sure you have both `value` and `onChange`:

```tsx
<input
  value={inputValue} // Display state
  onChange={handleInputChange} // Update state
/>
```

### Issue: Form submits but page reloads

**Solution:** Prevent default form behavior:

```tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault(); // Add this!
  // rest of code
};
```

### Issue: State updates not reflecting immediately

**Solution:** State updates are asynchronous. Use functional updates:

```tsx
// This logs the OLD value
setCount(count + 1);
console.log(count); // Still shows old value

// To work with new value, use a separate variable
const newCount = count + 1;
setCount(newCount);
console.log(newCount); // Shows new value
```

## Additional Resources

- [React useState Documentation](https://react.dev/reference/react/useState)
- [Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)

## What's Next?

You can now make your components interactive! In **Module 4**, you'll learn about `useEffect` for handling side effects like data fetching and subscriptions.

---

**Progress:** Remember to update your [progress checklist](../progress/checklist.md)!

**Next:** [Module 4: Side Effects with useEffect](./04-useeffect.md)
