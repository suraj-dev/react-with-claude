# AI Study Assistant - Interactive React & Next.js Course

An interactive, hands-on course for learning React, Next.js, and LangGraph by building a real AI-powered study assistant application.

## 🎯 What You'll Build

A complete AI Study Assistant that:
- Provides personalized learning paths
- Generates quizzes to test knowledge
- Explains complex concepts
- Tracks learning progress
- Uses LangGraph for multi-step AI workflows

## 🚀 What You'll Learn

### React Fundamentals
- Components, Props & Composition
- State Management with `useState`
- Side Effects with `useEffect`
- Custom Hooks
- Event Handling

### Next.js Features
- App Router & File-based Routing
- Server vs Client Components
- Dynamic Routes
- Layouts, Loading & Error States
- API Routes & Server Actions
- Data Fetching Patterns

### LangGraph & AI
- Building AI Agent Workflows
- State Management in Agents
- Tool Calling & Function Execution
- Multi-step Conversational AI

## 📋 Prerequisites

- **JavaScript knowledge**: Variables, functions, arrays, objects, ES6+ syntax
- **Basic HTML & CSS**: Understanding of HTML elements and CSS basics
- **Node.js**: Version 20 or higher installed
- **pnpm**: Package manager (or npm/yarn)
- **Code Editor**: VS Code recommended

## 🛠️ Installation

1. **Clone or download this project**
   ```bash
   cd react-course-claude
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and add your OpenAI API key (needed for Module 10)

4. **Start the development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Course Structure

This course has **10 modules** that build on each other:

| Module | Topic | What You'll Build |
|--------|-------|------------------|
| 1 | Introduction to React & Project Setup | Welcome component, basic JSX |
| 2 | Components, Props & Composition | TopicCard, MessageBubble, reusable components |
| 3 | State Management with useState | Interactive chat interface with state |
| 4 | Side Effects with useEffect | Auto-scroll, loading states, data fetching |
| 5 | Next.js App Router & Routing | Topics pages, study plan, navigation |
| 6 | Server vs Client Components | Quiz interface, understanding rendering |
| 7 | Layouts, Loading & Error States | Loading skeletons, error boundaries |
| 8 | API Routes & Server Actions | Backend endpoints, server mutations |
| 9 | Data Fetching Patterns | Optimized data loading, caching |
| 10 | LangGraph AI Integration | Complete AI agent with tools and workflows |

## 🎓 How to Use This Course

1. **Read the Course Guide**: Start with `course/README.md` for detailed instructions

2. **Follow Module Order**: Complete modules sequentially (1 → 10)

3. **Complete TODOs**: Each module has TODO comments in the code showing what to implement

4. **Check Your Work**: Use the verification checklists in each module

5. **Track Progress**: Mark completed tasks in `course/progress/checklist.md`

6. **Need Help?**: Review the hints, check official docs, or use the reset script

## 🔄 Reset Feature

Made a mistake? No problem! Reset to any module checkpoint:

```bash
pnpm reset
```

This interactive script lets you:
- Reset to Module 1
- Jump to any specific module
- Stash your current work
- Restore previously saved work

## 📖 Documentation

- **Course Guide**: `course/README.md` - Detailed course instructions
- **Module Guides**: `course/modules/` - Step-by-step guides for each module
- **Progress Tracker**: `course/progress/checklist.md` - Track your learning
- **Claude Guide**: `CLAUDE.md` - Using Claude Code with this project

## 🧪 Testing Your Work

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Format code
pnpm format
```

## 🛠️ Technologies Used

- **Next.js 16.1** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **LangGraph** - AI agent workflows
- **LangChain** - LLM integration
- **Zod** - Schema validation

## 📁 Project Structure

```
react-course-claude/
├── src/app/                    # Next.js App Router
│   ├── components/             # React components
│   │   ├── study/              # Study-related components
│   │   ├── quiz/               # Quiz components
│   │   ├── layout/             # Layout components
│   │   └── ui/                 # UI library components
│   ├── lib/                    # Utilities and data
│   │   ├── data/               # Mock data
│   │   └── langgraph/          # LangGraph agent
│   ├── types/                  # TypeScript types
│   ├── api/                    # API routes
│   └── actions/                # Server actions
├── course/                     # Course documentation
│   ├── modules/                # Module guides
│   └── progress/               # Progress tracking
└── scripts/                    # Utility scripts
```

## 🤝 Contributing

This is a learning project! Feel free to:
- Report issues
- Suggest improvements
- Share your completed projects

## 📜 License

MIT License - Feel free to use this course for learning!

## 🎉 Getting Started

Ready to learn? Head over to the **[Course Guide](./course/README.md)** to begin your journey!

Happy coding! 🚀
