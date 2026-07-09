import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        // Off Grid Diet earthy palette
        forest: {
          DEFAULT: "#1F3D2B", // deep forest green
          900: "#152A1E",
          700: "#274B36",
        },
        sprout: {
          DEFAULT: "#6FA344", // fresh growth
          light: "#8FBF63",
        },
        soil: "#5B4636", // earth brown
        cream: "#F7F2E7", // paper / background
        sun: "#E0A24E", // warm amber accent
        ink: "#1C1D17", // near-black text
        stone: "#6B6B60", // muted secondary text

        // shadcn semantic tokens mapped to CSS vars
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        heading: ["var(--font-archivo)", "Arial Black", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 6px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(31,61,43,0.06), 0 10px 30px rgba(31,61,43,0.08)",
        lift: "0 16px 40px rgba(31,61,43,0.16)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        grow: {
          "0%": { transform: "scaleY(0.6)", opacity: "0.5" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
