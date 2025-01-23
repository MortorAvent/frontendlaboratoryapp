/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['GeistSans', 'sans-serif'],
        mono: ['GeistMono', 'monospace'],
      },
      colors: {
        goldVegas: "#C5B358", // Dodaj kolor Złoto Vegas
        black: "#000000",
        white: "#ffffff",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
