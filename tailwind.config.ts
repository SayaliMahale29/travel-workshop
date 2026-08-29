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
          50: "#eef6ff",
          100: "#d9ebff",
          200: "#bcd9ff",
          300: "#7eb6f8",
          400: "#3d8de8",
          500: "#1d6fc9",
          600: "#1558a8",
          700: "#0f447f",
          800: "#0c335f",
          900: "#0a2748",
        },
        ink: {
          950: "#0b1f3a",
          900: "#123056",
          700: "#2c4a6e",
          500: "#5b7392",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        title: ["var(--font-title)", "Impact", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
