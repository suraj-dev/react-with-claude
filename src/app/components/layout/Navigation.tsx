/**
 * Navigation Component
 *
 * Module 5: Next.js App Router & Routing
 *
 * Demonstrates:
 * - Using Link component for client-side navigation
 * - Active link styling
 * - Responsive navigation
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Navigation links configuration
 */
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/topics", label: "Topics" },
  { href: "/study-plan", label: "Study Plan" },
];

/**
 * TODO: Complete the Navigation component
 *
 * REQUIREMENTS:
 * - Use Link component for each navigation item
 * - Highlight the active link based on current pathname
 * - Apply proper styling with Tailwind CSS
 */
export function Navigation() {
  // Get the current pathname to determine active link
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-6">
        {navLinks.map((link) => {
          // TODO: Determine if this link is active
          // HINT: const isActive = pathname === link.href;
          // OR for partial matching: pathname.startsWith(link.href) && link.href !== "/"

          const isActive = pathname === link.href;

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  // TODO: Add conditional classes for active link
                  // HINT: isActive ? "text-primary" : "text-muted-foreground"
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * ✓ VERIFY: After completing this component:
 * - All navigation links are visible
 * - Clicking a link navigates without page reload
 * - Active link is highlighted
 * - Hover effects work on all links
 * - Navigation is responsive
 *
 * LEARNING NOTE: Client-Side Navigation
 * - Link component provides client-side navigation
 * - Much faster than traditional <a> tags (no full page reload)
 * - Next.js prefetches linked pages for instant navigation
 * - usePathname() is a Client Component hook (requires "use client")
 */
