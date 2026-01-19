import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

/**
 * Load the Inter font from Google Fonts
 * This will be used throughout the application
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/**
 * Metadata for the application
 * This appears in the browser tab and search engines
 */
export const metadata: Metadata = {
  title: "AI Study Assistant",
  description:
    "Learn React, Next.js, and LangGraph by building an AI-powered study assistant",
};

/**
 * Root Layout Component
 * This wraps all pages in the application
 *
 * Module 1: This is a basic layout
 * Module 7: You'll enhance this with navigation and shared UI elements
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
