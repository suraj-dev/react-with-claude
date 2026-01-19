# Module 1: Introduction to React & Project Setup

Welcome to Module 1! This is where your React journey begins.

## 🎯 Learning Objectives

By the end of this module, you will:
- Understand what React is and why it's useful
- Know the basics of JSX syntax
- Create your first React component
- Use props to make components dynamic
- Understand the Next.js project structure

## 📚 Concepts Covered

### What is React?

React is a JavaScript library for building user interfaces. Think of it as a tool that helps you create interactive websites by breaking them into reusable pieces called **components**.

**Why use React?**
- **Component-Based**: Build encapsulated components that manage their own state
- **Declarative**: Describe what the UI should look like, React handles updates
- **Learn Once, Write Anywhere**: Use React for web, mobile (React Native), and more

### JSX: JavaScript + HTML

JSX lets you write HTML-like code in JavaScript:

```jsx
const element = <h1>Hello, World!</h1>;
```

**Key Points:**
- JSX looks like HTML but it's actually JavaScript
- Use `{}` to embed JavaScript expressions
- className instead of class (because class is a JavaScript keyword)
- All tags must be closed: `<img />`, `<input />`

**Examples:**

```jsx
// JavaScript expression in JSX
const name = "Student";
const greeting = <h1>Hello, {name}!</h1>;

// Dynamic content
const number = 42;
const message = <p>The answer is {number * 2}</p>;

// Conditional rendering
const isLoggedIn = true;
const status = <div>{isLoggedIn ? "Welcome!" : "Please log in"}</div>;
```

### Components

Components are the building blocks of React apps. They're JavaScript functions that return JSX:

```jsx
function Welcome() {
  return <h1>Hello, World!</h1>;
}
```

**Props** let you pass data to components:

```jsx
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Welcome name="Alice" />
```

### TypeScript with React

TypeScript adds types to JavaScript, catching errors before runtime:

```typescript
interface WelcomeProps {
  name: string;
}

function Welcome({ name }: WelcomeProps) {
  return <h1>Hello, {name}!</h1>;
}
```

## 🛠️ Hands-On Exercise

### Exercise 1.1: Complete the Home Page

**File:** `src/app/page.tsx`

**Your Task:**
Complete the home page with a heading, description, and Welcome component.

**Steps:**

1. **Add a heading**
   ```tsx
   <h1 className="text-4xl font-bold mb-4">
     AI Study Assistant
   </h1>
   ```

2. **Add a description**
   ```tsx
   <p className="text-lg text-muted-foreground mb-8">
     Learn React, Next.js, and LangGraph through hands-on practice
   </p>
   ```

3. **Create the Welcome component**

   Uncomment and complete the Welcome component at the bottom of the file:

   ```tsx
   interface WelcomeProps {
     name: string;
   }

   function Welcome({ name }: WelcomeProps) {
     return (
       <div className="rounded-lg bg-primary/10 p-6">
         <p className="text-xl">
           Hello, {name}! Ready to learn React?
         </p>
       </div>
     );
   }
   ```

4. **Use the Welcome component**

   Replace the placeholder div with:
   ```tsx
   <Welcome name="Student" />
   ```

**Expected Result:**
- Heading displays "AI Study Assistant"
- Description explains the course
- Welcome component shows a personalized greeting
- No TypeScript errors
- Styled correctly with Tailwind CSS

### Exercise 1.2: Experiment with Props

Try modifying the Welcome component:

1. **Add more props**
   ```tsx
   interface WelcomeProps {
     name: string;
     course?: string; // Optional prop
   }

   function Welcome({ name, course = "React" }: WelcomeProps) {
     return (
       <div className="rounded-lg bg-primary/10 p-6">
         <p className="text-xl">
           Hello, {name}! Ready to learn {course}?
         </p>
       </div>
     );
   }
   ```

2. **Use the new prop**
   ```tsx
   <Welcome name="Student" course="React & Next.js" />
   ```

## ✅ Verification Checklist

Check off each item after completing:

- [ ] Home page displays heading and description
- [ ] Welcome component is created with proper TypeScript interface
- [ ] Welcome component accepts name prop
- [ ] Component renders with the correct greeting
- [ ] No TypeScript errors in the terminal or editor
- [ ] Page looks good in the browser (http://localhost:3000)
- [ ] Tailwind CSS classes are applied correctly

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module '@/app/...'"

**Solution:**  The `@/` alias points to the `src/` directory. Make sure:
- The file exists in the `src/` folder
- The path is correct
- You've saved the file

### Issue: TypeScript error about missing props

**Solution:** Make sure you're passing all required props:
```tsx
// ❌ Wrong - missing required prop
<Welcome />

// ✅ Correct - all props provided
<Welcome name="Student" />
```

### Issue: "Unexpected token <"

**Solution:** You're likely using JSX in a `.ts` file. Rename it to `.tsx`:
```bash
mv file.ts file.tsx
```

## 📖 Additional Resources

- [React Quick Start](https://react.dev/learn) - Official React tutorial
- [Thinking in React](https://react.dev/learn/thinking-in-react) - React mental model
- [JSX in Depth](https://react.dev/learn/writing-markup-with-jsx) - Learn JSX
- [TypeScript with React](https://react.dev/learn/typescript) - Using TypeScript

## 🎯 What's Next?

Congratulations! You've completed Module 1. You now understand:
- What React is and why it's useful
- JSX syntax and how to write it
- How to create components
- How to use props

In **Module 2**, you'll learn about component composition and build reusable UI components like TopicCard and MessageBubble.

---

**Progress:** Remember to update your [progress checklist](../progress/checklist.md)!

👉 **Next:** [Module 2: Components, Props & Composition](./02-components-props.md)
