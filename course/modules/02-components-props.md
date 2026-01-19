# Module 2: Components, Props & Composition

Building on Module 1, you'll now learn how to create reusable, composable components.

## Learning Objectives

By the end of this module, you will:

- Understand component composition patterns
- Use the `cn()` utility for conditional styling
- Work with UI library components (Card, Badge, Button)
- Create TypeScript interfaces for complex props
- Design reusable components

## Concepts Covered

### Component Composition

Components can contain other components, creating a hierarchy:

```tsx
function App() {
  return (
    <Layout>
      <Header />
      <Main>
        <TopicCard topic={topic} />
      </Main>
      <Footer />
    </Layout>
  );
}
```

**Why Composition?**

- **Reusability**: Build once, use everywhere
- **Maintainability**: Small, focused components are easier to update
- **Testing**: Each component can be tested independently
- **Readability**: Clear structure and responsibilities

### The `cn()` Utility Function

The `cn()` utility (from `@/lib/utils`) combines Tailwind classes conditionally:

```tsx
import { cn } from "@/lib/utils";

// Basic usage - merge classes
cn("text-lg", "font-bold"); // "text-lg font-bold"

// Conditional classes
cn(
  "base-class",
  isActive && "active-class",
  variant === "primary" && "bg-primary"
);

// With ternary operator
cn("rounded-lg p-4", isUser ? "bg-blue-500 ml-auto" : "bg-gray-200 mr-auto");
```

### Working with UI Components

This project includes pre-built UI components from a component library:

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";

function TopicCard({ topic }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{topic.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Badge>{topic.difficulty}</Badge>
        <p>{topic.description}</p>
      </CardContent>
      <CardFooter>
        <Button>Start Learning</Button>
      </CardFooter>
    </Card>
  );
}
```

### Complex Props with TypeScript

For components with multiple props, define clear interfaces:

```tsx
interface MessageBubbleProps {
  message: Message; // Required object
  variant: "user" | "assistant" | "system"; // Union type
  showTimestamp?: boolean; // Optional boolean
  onDelete?: (id: string) => void; // Optional callback
}

function MessageBubble({
  message,
  variant,
  showTimestamp = true, // Default value
  onDelete,
}: MessageBubbleProps) {
  // Component implementation
}
```

## Hands-On Exercises

### Exercise 2.1: Complete MessageBubble Component

**File:** `src/app/components/study/MessageBubble.tsx`

**Your Task:** Create a message bubble that styles differently based on who sent it.

**Steps:**

1. **Add the variant prop to the interface:**

   ```tsx
   interface MessageBubbleProps {
     message: Message;
     variant: "user" | "assistant" | "system";
   }
   ```

2. **Update the function to accept variant:**

   ```tsx
   export function MessageBubble({ message, variant }: MessageBubbleProps) {
   ```

3. **Implement conditional styling with `cn()`:**

   ```tsx
   <div
     className={cn(
       "rounded-lg p-4 shadow-sm max-w-[80%]",
       variant === "user" && "bg-primary text-primary-foreground ml-auto",
       variant === "assistant" && "bg-muted text-muted-foreground mr-auto",
       variant === "system" && "bg-accent text-accent-foreground mx-auto text-center max-w-[60%]"
     )}
   >
   ```

4. **Display message content:**
   ```tsx
   <p className="text-sm font-semibold mb-1">
     {message.role.charAt(0).toUpperCase() + message.role.slice(1)}
   </p>
   <p className="text-base mb-2">{message.content}</p>
   <p className="text-xs opacity-70">
     {formatDateTime(message.timestamp)}
   </p>
   ```

**Expected Result:**

- User messages appear on the right with primary color
- Assistant messages appear on the left with muted styling
- System messages are centered with accent styling

### Exercise 2.2: Implement TopicCard Component

**File:** `src/app/components/study/TopicCard.tsx`

**Your Task:** Build a card that displays learning topic information.

**Steps:**

1. **Add the optional callback prop:**

   ```tsx
   interface TopicCardProps {
     topic: Topic;
     onStartLearning?: () => void;
   }
   ```

2. **Add CardHeader with title and description:**

   ```tsx
   <CardHeader>
     <CardTitle>{topic.title}</CardTitle>
     <CardDescription>{topic.description}</CardDescription>
   </CardHeader>
   ```

3. **Display badges in CardContent:**

   ```tsx
   <CardContent>
     <div className="mb-4 flex gap-2">
       <Badge variant="secondary">{topic.difficulty}</Badge>
       <Badge variant="outline">{topic.category}</Badge>
     </div>
     <p className="text-sm text-muted-foreground">
       Estimated time: {formatDuration(topic.estimatedMinutes)}
     </p>
     <p className="text-sm text-muted-foreground">
       {topic.resources.length} resources available
     </p>
   </CardContent>
   ```

4. **Add the action button in CardFooter:**
   ```tsx
   <CardFooter>
     <Button onClick={onStartLearning} className="w-full">
       Start Learning
     </Button>
   </CardFooter>
   ```

### Exercise 2.3: Build Header Component

**File:** `src/app/components/layout/Header.tsx`

**Your Task:** Create a flexible header with optional title and logo.

**Steps:**

1. **Define the props interface:**

   ```tsx
   interface HeaderProps {
     title?: string;
     showLogo?: boolean;
   }
   ```

2. **Add props with default values:**

   ```tsx
   export function Header({
     title = "AI Study Assistant",
     showLogo = true
   }: HeaderProps) {
   ```

3. **Conditionally render the logo:**

   ```tsx
   {
     showLogo && <div className="text-2xl">📚</div>;
   }
   ```

4. **Display the title:**
   ```tsx
   <h1 className="text-xl font-bold">{title}</h1>
   ```

### Exercise 2.4: Study Footer Component (Reference)

**File:** `src/app/components/layout/Footer.tsx`

This component is complete! Study it to understand:

- How to create a functional component
- Using JavaScript expressions in JSX (`{currentYear}`)
- Applying Tailwind CSS classes
- Using semantic HTML elements

## Verification Checklist

- [ ] MessageBubble displays differently based on variant prop
- [ ] TopicCard shows all topic information (title, description, badges, time)
- [ ] TopicCard button triggers onStartLearning callback
- [ ] Header displays with/without logo based on prop
- [ ] Header uses custom title when provided
- [ ] All components have proper TypeScript types
- [ ] No TypeScript errors in terminal
- [ ] `cn()` utility is used for conditional styling

## Common Issues & Solutions

### Issue: "Type 'undefined' is not assignable to type..."

**Solution:** Make optional props actually optional with `?`:

```tsx
// Wrong
interface Props {
  onStartLearning: () => void; // Required
}

// Right
interface Props {
  onStartLearning?: () => void; // Optional
}
```

### Issue: Badge or Button not styling correctly

**Solution:** Check that you're importing from the correct path:

```tsx
// Correct imports
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
```

### Issue: cn() not working

**Solution:** Make sure to import it:

```tsx
import { cn } from "@/lib/utils";
```

## Additional Resources

- [React Component Composition](https://react.dev/learn/passing-props-to-a-component)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook - Interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html)

## What's Next?

You've learned how to build reusable components with props. In **Module 3**, you'll learn about state management with `useState` - making your components interactive!

---

**Progress:** Remember to update your [progress checklist](../progress/checklist.md)!

**Next:** [Module 3: State Management with useState](./03-state-usestate.md)
