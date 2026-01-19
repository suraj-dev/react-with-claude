# Using Claude Code with This Project

This guide explains how to use Claude Code (Anthropic's AI coding assistant) while working through this course.

## What is Claude Code?

Claude Code is an AI-powered coding assistant that can:
- Answer questions about your code
- Help debug errors
- Explain concepts
- Suggest improvements
- Generate code snippets

## How to Use Claude Code for This Course

### 1. Understanding Concepts

Ask Claude to explain React, Next.js, or LangGraph concepts:

```
"Can you explain how useState works in React?"
"What's the difference between Server and Client Components in Next.js?"
"How do conditional edges work in LangGraph?"
```

### 2. Debugging Errors

When you encounter errors, Claude can help:

```
"I'm getting a TypeScript error: 'Property X does not exist on type Y'. What does this mean?"
"My useEffect is running infinitely. How do I fix it?"
"Why is my component not re-rendering when state changes?"
```

### 3. Completing TODOs

If you're stuck on a TODO, ask for guidance (not the full solution):

```
"I need to implement a useState for input value. Can you explain the steps?"
"How do I conditionally apply Tailwind classes based on a prop?"
"What's the best way to fetch data in a Server Component?"
```

### 4. Code Review

Ask Claude to review your completed code:

```
"Can you review my MessageBubble component implementation?"
"Is my state management approach correct here?"
"Are there any TypeScript issues with this code?"
```

## Best Practices

### DO: Use Claude for Learning

✅ Ask for explanations and concepts
✅ Request hints and guidance
✅ Get help understanding errors
✅ Learn best practices
✅ Review your own code

### DON'T: Skip the Learning

❌ Copy code without understanding it
❌ Ask Claude to complete all TODOs
❌ Skip reading the module guides
❌ Avoid trying to solve problems yourself first

## Sample Conversations

### Example 1: Understanding a Concept

**You:** "What's the purpose of the dependency array in useEffect?"

**Claude:** "The dependency array tells React when to re-run the effect:
- `[]` (empty): Run only once when component mounts
- `[value]`: Run when `value` changes
- No array: Run after every render

Example:
```typescript
useEffect(() => {
  console.log('Count changed:', count);
}, [count]); // Only runs when count changes
```"

### Example 2: Debugging Help

**You:** "I'm getting 'Cannot read property of undefined' when accessing topic.title"

**Claude:** "This error means `topic` is undefined when you're trying to access `topic.title`. Check:

1. Is topic being passed as a prop?
2. Does the component have the topic in its props interface?
3. Is the parent component providing the topic?
4. Should you add a check: `topic?.title` or `{topic && topic.title}`?"

### Example 3: Implementation Guidance

**You:** "I need to filter an array of topics by category. How should I approach this?"

**Claude:** "Here's the approach:

1. Use the `filter()` method on the array
2. Return true for items that match your criteria

Example structure:
```typescript
const filteredTopics = topics.filter((topic) => {
  return topic.category === desiredCategory;
});
```

Try implementing this for your use case!"

## Project-Specific Claude Commands

### Get Project Overview

```
"Can you explain the structure of this React course project?"
```

### Understand a Module

```
"What am I supposed to learn in Module 3?"
```

### Check Your Implementation

```
"I implemented the ChatInput component. Can you check if it follows React best practices?"
```

### Explain Code

```
"Can you explain what this code in MessageBubble.tsx does?"
```

## Tips for Effective AI-Assisted Learning

1. **Try First**: Attempt to solve TODOs yourself before asking
2. **Ask Why**: Don't just ask "how", ask "why"
3. **Understand**: Make sure you understand any code Claude provides
4. **Experiment**: Modify Claude's suggestions and see what happens
5. **Learn Patterns**: Look for patterns in solutions to apply elsewhere

## When to Use vs. Not Use Claude

### Use Claude When:
- You're stuck after trying for 15+ minutes
- You need a concept explained differently
- You want to verify your approach
- You're debugging a confusing error
- You want to learn best practices

### Try Yourself First:
- Reading the module guide
- Checking the hints in TODO comments
- Looking at example code nearby
- Reading TypeScript error messages
- Consulting official documentation

## Remember

Claude is a **learning aid**, not a solution generator. The goal is to understand React, Next.js, and LangGraph deeply, not just complete the course quickly.

**Learn by doing, use Claude for understanding!**

---

Happy learning! 🚀
