import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts
 *
 * @example
 * cn("px-2 py-1", condition && "bg-blue-500", "px-4") // => "py-1 bg-blue-500 px-4"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a readable string
 *
 * @example
 * formatDate(new Date()) // => "Jan 6, 2026"
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/**
 * Format a date to include time
 *
 * @example
 * formatDateTime(new Date()) // => "Jan 6, 2026 at 2:30 PM"
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

/**
 * Format minutes to hours and minutes
 *
 * @example
 * formatDuration(90) // => "1h 30m"
 * formatDuration(45) // => "45m"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Calculate percentage with optional decimal places
 *
 * @example
 * calculatePercentage(7, 10) // => 70
 * calculatePercentage(1, 3, 1) // => 33.3
 */
export function calculatePercentage(
  value: number,
  total: number,
  decimals: number = 0
): number {
  if (total === 0) return 0;
  const percentage = (value / total) * 100;
  return Number(percentage.toFixed(decimals));
}

/**
 * Shuffle an array (Fisher-Yates algorithm)
 * Returns a new array without modifying the original
 *
 * @example
 * shuffle([1, 2, 3, 4, 5]) // => [3, 1, 5, 2, 4] (random order)
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
