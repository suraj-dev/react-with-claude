/**
 * Home Page - AI Study Assistant
 *
 * Module 1: Introduction to React & Project Setup
 *
 * In this module, you'll create your first React component and learn about JSX.
 * This page serves as the entry point to the application.
 */

export default function Home() {
  // TODO: Create a welcome message for users
  // HINT: You can use regular JavaScript variables and display them using JSX
  // EXAMPLE: const welcomeText = "Welcome to AI Study Assistant";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="max-w-2xl text-center">
        {/* TODO: Add a heading (h1) with the title "AI Study Assistant" */}
        {/* HINT: Use className="text-4xl font-bold mb-4" for styling */}

        {/* TODO: Add a paragraph describing what this app does */}
        {/* HINT: Use className="text-lg text-muted-foreground mb-8" */}
        {/* SUGGESTION: Explain that this is an interactive learning platform */}

        {/* TODO: Create a simple Welcome component (see instructions below) */}
        {/* You'll create this component in the exercises */}

        {/* TEMPORARY: Placeholder content */}
        <div className="rounded-lg border border-dashed border-gray-300 p-8">
          <p className="text-gray-500">
            Module 1: Complete the TODOs above to get started!
          </p>
        </div>
      </div>
    </main>
  );
}

/**
 * EXERCISE 1.1: Create a Welcome Component
 *
 * Create a new functional component called Welcome that:
 * 1. Accepts a prop called "name" (string)
 * 2. Displays a greeting message like "Hello, [name]! Ready to learn?"
 * 3. Uses Tailwind classes for styling
 *
 * EXAMPLE USAGE:
 * <Welcome name="Student" />
 *
 * UNCOMMENT AND COMPLETE THIS CODE:
 *
 * interface WelcomeProps {
 *   name: string;
 * }
 *
 * function Welcome({ name }: WelcomeProps) {
 *   return (
 *     <div className="rounded-lg bg-primary/10 p-6">
 *       <p className="text-xl">
 *         // TODO: Add your greeting message here using the {name} variable
 *       </p>
 *     </div>
 *   );
 * }
 */

/**
 * ✓ VERIFY: After completing this module, you should see:
 * - A heading with "AI Study Assistant"
 * - A description of the app
 * - Your Welcome component displaying a greeting
 * - No TypeScript errors
 * - Proper styling with Tailwind CSS
 */
