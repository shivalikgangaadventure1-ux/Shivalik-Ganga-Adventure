import type { Config } from "tailwindcss";
import { THEME } from "./constants/theme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: THEME.primary,
          dark: THEME.primaryDark,
          light: THEME.primaryLight,
        },
        secondary: THEME.secondary,
        dark: {
          DEFAULT: THEME.dark,
          deep: THEME.darker,
        },
        light: THEME.light,
        body: THEME.body,
        heading: THEME.heading,
        muted: THEME.muted,
        border: THEME.border,
        success: THEME.success,
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-playfair)", "serif"],
      },
      maxWidth: {
        container: "1320px",
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(43, 50, 53, 0.18)",
        "card-hover": "0 20px 40px -15px rgba(43, 50, 53, 0.28)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
