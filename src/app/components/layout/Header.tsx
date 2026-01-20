/**
 * Header Component
 *
 * Module 2: Components, Props & Composition
 *
 * A reusable header component that will be used across the application.
 * Demonstrates how to create flexible components with props.
 */

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
}
export function Header({
  title = "AI Study Assistant",
  showLogo = true,
}: HeaderProps) {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center gap-3">
            {showLogo && <div className="text-2xl">📚</div>}

            <h1 className="text-xl font-bold">{title}</h1>
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
