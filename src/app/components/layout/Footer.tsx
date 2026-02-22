"use client";

/**
 * Footer Component
 *
 * Module 2: Components, Props & Composition
 *
 * A simple footer component demonstrating a complete, working example.
 * This serves as a reference for students building other components.
 */

/**
 * Footer component - displays at the bottom of pages
 * This is a fully implemented example component for reference
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <p className="text-sm text-muted-foreground">
            AI Study Assistant - Learn React, Next.js & LangGraph
          </p>
          <p className="text-xs text-muted-foreground">
            © {currentYear} - Built with Next.js 16 and TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * REFERENCE: Study this component to understand:
 * - How to create a functional component
 * - Using JavaScript expressions in JSX (like {currentYear})
 * - Applying Tailwind CSS classes for styling
 * - Creating responsive layouts with flexbox
 * - Using semantic HTML elements (<footer>)
 *
 * You'll use similar patterns in your own components!
 */
