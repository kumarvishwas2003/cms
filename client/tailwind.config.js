/** @type {import('tailwindcss').Config} */
import tailwindcssanimate from "tailwindcss-animate";
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "1.25rem",
        md: "1rem",
        sm: "0.5rem",
      },
      colors: {
        background: "#1a1c29",
        foreground: "#f4f6fb",
        card: {
          DEFAULT: "#23263a",
          foreground: "#f4f6fb",
        },
        primary: {
          DEFAULT: "#001935",
          foreground: "#fff",
        },
        secondary: {
          DEFAULT: "#23263a",
          foreground: "#f4f6fb",
        },
        accent: {
          DEFAULT: "#FF61A6",
          foreground: "#fff",
        },
        muted: {
          DEFAULT: "#23263a",
          foreground: "#f4f6fb",
        },
        border: "#23263a",
        input: "#23263a",
        ring: "#FF61A6",
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "#fff",
          foreground: "#36465D",
          primary: "#36465D",
          "primary-foreground": "#fff",
          accent: "#a3cef1",
          "accent-foreground": "#36465D",
          border: "#e0e7ef",
          ring: "#a3cef1",
        },
      },
    },
  },
  plugins: [tailwindcssanimate],
};
