import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#FFFBEB",
          100: "#FEF3C7",
          200: "#FDE68A",
          300: "#FCD34D",
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
          900: "#78350F",
        },
        ink: {
          950: "#1C1917",
          900: "#292524",
          700: "#44403C",
          500: "#78716C",
        },
        sand: {
          50: "#FAF7F2",
          100: "#F5EFE6",
          200: "#EFE6D8",
          300: "#E2D3BE",
          400: "#C9B69C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        title: ["var(--font-title)", "Impact", "sans-serif"],
        hand: ["var(--font-handwritten)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
