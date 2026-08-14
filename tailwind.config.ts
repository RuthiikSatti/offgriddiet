import type { Config } from "tailwindcss";

/**
 * Off Grid Diet design tokens.
 *
 * A gardening research publication: warm paper, botanical line art, and a
 * seed-catalogue palette. Earthy, but with real chroma — an earlier pass was
 * so desaturated it read as black and white.
 *
 * Three accents, each with a job:
 *   leaf  — growth, links, primary action. The dominant accent.
 *   ochre — harvest gold. Figures, marks, illustration. NEVER body text:
 *           it only hits 2.89:1 on paper. Use `ochre-deep` (5.23:1) for text.
 *   beet  — deep contrast note, and the semantic "already visible damage"
 *           state on the detection-window rail.
 *
 * Three grounds give the scroll a rhythm — alternating bands rather than one
 * flat page: paper → parchment → sage.
 */
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
        // ── grounds ────────────────────────────────────────────────
        paper: "#F7F3E8", // default page ground, warm
        parchment: "#EFE7D4", // tinted band — a shade deeper
        sage: "#DFE5D2", // tinted band — green-cast

        // ── ink ────────────────────────────────────────────────────
        ink: "#23281E", // primary text, deep olive-black  13.59:1
        bark: "#55604B", // secondary text                  5.99:1
        line: "#D9CFB8", // hairlines

        // ── accents ────────────────────────────────────────────────
        leaf: {
          DEFAULT: "#2F6B35", // 5.78:1 — safe for text
          deep: "#1F4A24",
          soft: "#7FA271",
        },
        /** Graphics and large figures ONLY — 2.89:1, fails as text. */
        ochre: {
          DEFAULT: "#C08422",
          deep: "#8A5C13", // 5.23:1 — the text-safe ochre
          soft: "#E8C77E",
        },
        beet: {
          DEFAULT: "#8A3350", // 7.09:1
          soft: "#C9899C",
        },
        rust: "#B4522F", // 4.52:1 — semantic warmth

        // shadcn semantic tokens mapped to CSS vars (see globals.css)
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
        // Fraunces: a soft, slightly wonky variable serif. Editorial character
        // without the Playfair-on-cream wedding-invitation cliché.
        heading: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 6px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(35,40,30,0.04), 0 8px 24px rgba(35,40,30,0.06)",
      },
      maxWidth: {
        measure: "38rem",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        /** Slow sway for the botanical marks — barely perceptible. */
        sway: {
          "0%, 100%": { transform: "rotate(-1.5deg)" },
          "50%": { transform: "rotate(1.5deg)" },
        },
        draw: {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both",
        sway: "sway 7s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

export default config;
