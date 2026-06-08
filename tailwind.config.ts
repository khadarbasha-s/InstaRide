import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        /* "Sun-Drenched" palette — sophisticated, editorial, light */
        brand: {
          /* Light surfaces */
          cream: "#FAF6F0",       /* page bg */
          "cream-deep": "#F0E8D8", /* warmer section */
          sand: "#E8DFC9",        /* deeper warm */
          sage: "#EDF1E5",        /* sage-tinted section */
          peach: "#F4E5DC",       /* peach-tinted section */

          /* Text */
          cocoa: "#2A2520",       /* primary text — warm not pure black */
          "cocoa-muted": "#6B6259", /* secondary text */

          /* Primary (refined yellow) */
          mustard: "#D4A24B",
          "mustard-deep": "#B88836",
          "mustard-50": "#FBF3DC",

          /* Accents */
          terracotta: "#C67D5E",
          "terracotta-deep": "#A85F44",
          "sage-deep": "#7B8B6F",
          "sage-muted": "#A4B198",

          /* Legacy aliases — keep references working without breaking */
          yellow: "#D4A24B",
          "yellow-600": "#B88836",
          "yellow-50": "#FBF3DC",
          black: "#2A2520",
          "gray-bg": "#F0E8D8",
        },
        /* Status colors — softened */
        success: "#7B9F65",       /* sage-leaning green, not aggressive */
        danger: "#C45A4C",        /* warm rust, not fire engine red */

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
