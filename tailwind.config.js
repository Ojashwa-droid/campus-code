/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        foreground: "#ededed",
        card: {
          DEFAULT: "#09090b",
          foreground: "#ededed",
        },
        popover: {
          DEFAULT: "#09090b",
          foreground: "#ededed",
        },
        primary: {
          DEFAULT: "#ffffff",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#18181b",
          foreground: "#ededed",
        },
        muted: {
          DEFAULT: "#18181b",
          foreground: "#a1a1aa",
        },
        accent: {
          DEFAULT: "#27272a",
          foreground: "#ffffff",
        },
        border: "rgba(255, 255, 255, 0.08)",
        input: "rgba(255, 255, 255, 0.1)",
        ring: "rgba(255, 255, 255, 0.2)",
      },
      borderRadius: {
        "2xl": "1rem",
        xl: "0.75rem",
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
      fontFamily: {
        sans: ["var(--font-jetbrains-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
        mono: ["var(--font-jetbrains-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
        "mono-accent": ["var(--font-jetbrains-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
        "mono-code": ["var(--font-jetbrains-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        "glass-inner": "inset 0 1px 0 0 rgba(255, 255, 255, 0.12)",
        "glass-btn": "inset 0 1px 0 0 rgba(255, 255, 255, 0.2), 0 1px 2px 0 rgba(0, 0, 0, 0.4)",
        "glow-white": "0 0 25px -5px rgba(255, 255, 255, 0.35)",
        "glow-subtle": "0 0 40px -10px rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
        "glow-mesh": "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
