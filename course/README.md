# AI Study Assistant Course - Getting Started

Welcome to the interactive React, Next.js, and LangGraph course! This guide will help you get the most out of your learning experience.

## 🎯 Course Overview

You'll build a complete AI Study Assistant application while learning modern web development. Each module introduces new concepts and has you implement features with guided TODOs.

## 🏁 Before You Start

### What You Need to Know
- Basic JavaScript (variables, functions, arrays, objects)
- HTML fundamentals
- CSS basics
- Familiarity with the command line

### What You Don't Need to Know
- React (you'll learn this!)
- Next.js (you'll learn this!)
- TypeScript (you'll learn as you go!)
- LangGraph (covered in Module 10)

## 🗺️ Learning Path

### Phase 1: React Foundations (Modules 1-4)
**Time**: ~6-8 hours

Start with React fundamentals. You'll learn how to build interactive UIs with components, props, state, and effects.

**What you'll build:**
- Reusable UI components
- Interactive chat interface
- Message list with state management

### Phase 2: Next.js Features (Modules 5-7)
**Time**: ~5-7 hours

Learn Next.js App Router, routing, and advanced features like Server Components and loading states.

**What you'll build:**
- Multi-page application with navigation
- Dynamic topic pages
- Study plan tracker
- Loading and error states

### Phase 3: Backend & APIs (Modules 8-9)
**Time**: ~4-6 hours

Create API endpoints and learn data fetching patterns for full-stack applications.

**What you'll build:**
- REST API endpoints
- Server Actions for mutations
- Optimized data fetching

### Phase 4: AI Integration (Module 10)
**Time**: ~6-8 hours

Integrate LangGraph to build an intelligent study assistant with multi-step workflows.

**What you'll build:**
- AI agent with state management
- Tools for topic lookup and quiz generation
- Complete conversational AI workflow

## 📖 How to Use the Course

### 1. Read the Module Guide

Each module has a detailed guide in `course/modules/`. Read it thoroughly before coding.

**Example**: `course/modules/01-intro-react-setup.md`

### 2. Find the TODOs

Code files contain TODO comments showing exactly what you need to implement:

```typescript
// TODO: Create state for the input value
// HINT: const [inputValue, setInputValue] = useState("");
```

### 3. Follow the Hints

Each TODO has hints to guide you:
- **TODO**: What to implement
- **HINT**: How to implement it
- **EXAMPLE**: Code examples for reference

### 4. Verify Your Work

Each module and component has verification checklists:

```typescript
/**
 * ✓ VERIFY: After completing this component:
 * - Component renders without errors
 * - Props are correctly typed
 * - State updates work correctly
 */
```

### 5. Track Your Progress

Use the progress checklist to stay organized:

```bash
course/progress/checklist.md
```

Check off tasks as you complete them!

## 🔧 Development Workflow

### Starting a New Module

1. **Read the module guide** in `course/modules/`
2. **Check the module's files** - find which files you'll work on
3. **Run the dev server** - `pnpm dev`
4. **Complete the TODOs** - follow hints and examples
5. **Test your work** - verify everything works
6. **Update progress** - check off completed tasks

### When You Get Stuck

1. **Re-read the module guide** - often contains the answer
2. **Check the hints** - they provide implementation guidance
3. **Review examples** - working code in the same file
4. **Use TypeScript errors** - they often point to the issue
5. **Check official docs** - links provided in each module
6. **Use the reset script** - start fresh if needed

## 🎓 Module Guides

Detailed guides for each module:

- [Module 1: Introduction to React & Project Setup](./modules/01-intro-react-setup.md)
- [Module 2: Components, Props & Composition](./modules/02-components-props.md)
- [Module 3: State Management with useState](./modules/03-state-management.md)
- [Module 4: Side Effects with useEffect](./modules/04-side-effects.md)
- [Module 5: Next.js App Router & Routing](./modules/05-routing.md)
- [Module 6: Server vs Client Components](./modules/06-server-client.md)
- [Module 7: Layouts, Loading & Error States](./modules/07-layouts-loading.md)
- [Module 8: API Routes & Server Actions](./modules/08-api-routes.md)
- [Module 9: Data Fetching Patterns](./modules/09-data-fetching.md)
- [Module 10: LangGraph AI Integration](./modules/10-langgraph-ai.md)

## ✅ Progress Tracking

Track your journey:

```bash
course/progress/checklist.md
```

This file has:
- Module completion checkboxes
- Individual exercise checkboxes
- Skills mastery tracker

Update it as you learn!

## 🔄 Reset & Recovery

### Reset to Module Start

Made a mistake? Reset anytime:

```bash
pnpm reset
```

Choose:
1. **Reset to Module 1** - Start over
2. **Reset to specific module** - Jump to any module
3. **Stash work** - Save current progress
4. **Restore work** - Get back saved progress

### How Reset Works

The project uses Git branches:
- `module-1-start` - Module 1 starting point
- `module-2-start` - Module 2 starting point (includes Module 1 solutions)
- ... and so on

Resetting switches to the appropriate branch.

## 📚 Additional Resources

### Official Documentation
- [React Docs](https://react.dev) - Official React documentation
- [Next.js Docs](https://nextjs.org/docs) - Next.js App Router guide
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript guide
- [LangGraph Docs](https://langchain-ai.github.io/langgraph/) - LangGraph tutorials

### Helpful Tools
- [TypeScript Playground](https://www.typescriptlang.org/play) - Test TypeScript
- [Tailwind CSS Docs](https://tailwindcss.com/docs) - Styling reference
- [React DevTools](https://react.dev/learn/react-developer-tools) - Debug React

## 💡 Tips for Success

### 1. Don't Skip Modules
Each module builds on the previous one. Skipping ahead will make it harder.

### 2. Type It Out
Don't copy-paste. Typing code helps you learn and remember.

### 3. Experiment
Try changing things! Break it, fix it, understand why.

### 4. Read Error Messages
TypeScript and React errors are helpful - they tell you what's wrong.

### 5. Take Breaks
Learning is hard work. Take breaks, let concepts sink in.

### 6. Build Something Extra
After finishing the course, build your own project using what you learned!

## 🎯 What's Next?

Ready to start? Begin with **Module 1**:

👉 **[Module 1: Introduction to React & Project Setup](./modules/01-intro-react-setup.md)**

Happy learning! 🚀
