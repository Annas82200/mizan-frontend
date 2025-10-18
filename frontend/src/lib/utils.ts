/**
 * Utility functions for Mizan Platform Frontend
 * PRODUCTION-READY: No mock data or placeholders
 * Full compliance with AGENT_CONTEXT_ULTIMATE.md
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes with proper precedence handling
 * Uses clsx for conditional classes and twMerge to handle conflicts
 * @param inputs - Class names to combine
 * @returns Combined and merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}