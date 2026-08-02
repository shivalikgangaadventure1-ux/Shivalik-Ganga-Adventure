/**
 * Single source of truth for all colors used across the site.
 * Tailwind's color utilities (bg-primary, text-accent, etc.) are generated
 * directly from this object in tailwind.config.ts — change a value here and
 * every component that uses the corresponding utility class updates.
 */
export const THEME = {
  primary: "#ffb300",
  primaryDark: "#e6a200",
  primaryLight: "#ffc94d",
  secondary: "#26bdf7",
  dark: "#414b4f",
  darker: "#2b3235",
  light: "#f7f8f8",
  white: "#ffffff",
  body: "#555555",
  heading: "#333333",
  muted: "#8a9195",
  border: "#e6e8e9",
  success: "#2fb344",
} as const;

export type ThemeColor = keyof typeof THEME;
