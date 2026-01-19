/**
 * Header Component
 *
 * Module 2: Components, Props & Composition
 *
 * A reusable header component that will be used across the application.
 * Demonstrates how to create flexible components with props.
 */

// TODO: Define HeaderProps interface
// HINT: Include optional props for:
// - title?: string (optional title to display)
// - showLogo?: boolean (whether to show a logo)
// EXAMPLE:
// interface HeaderProps {
//   title?: string;
//   showLogo?: boolean;
// }

/**
 * TODO: Complete the Header component
 *
 * REQUIREMENTS:
 * - Accept title and showLogo props with default values
 * - Display a logo (can be an emoji or text) if showLogo is true
 * - Display the title if provided, otherwise show "AI Study Assistant"
 * - Use a nav element for semantic HTML
 * - Style with Tailwind CSS
 */
export function Header() {
  // TODO: Add props parameter: { title = "AI Study Assistant", showLogo = true }: HeaderProps

  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center gap-3">
            {/* TODO: Conditionally render logo if showLogo is true */}
            {/* EXAMPLE:
              {showLogo && (
                <div className="text-2xl">📚</div>
              )}
            */}

            {/* TODO: Display the title */}
            {/* EXAMPLE: <h1 className="text-xl font-bold">{title}</h1> */}
          </div>

          {/* TODO: Add a placeholder for navigation links */}
          {/* This will be enhanced in Module 5 when we add routing */}
          <div className="text-sm text-muted-foreground">
            {/* Module 5: Navigation links will go here */}
          </div>
        </div>
      </nav>
    </header>
  );
}

/**
 * ✓ VERIFY: After completing this component:
 * - Header renders with default title "AI Study Assistant"
 * - Logo appears when showLogo is true
 * - Custom title works: <Header title="My Custom Title" />
 * - Logo can be hidden: <Header showLogo={false} />
 * - Proper TypeScript types with no errors
 * - Responsive layout with Tailwind CSS
 */
