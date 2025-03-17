import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["'Pretendard Variable'", 'sans-serif'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        'backgroundColor': '#1a1a1a',
        'cardColor': '#2a2a2a',
        'textColor': "#e5e7eb",
        'white': "#ffffff",
        'hoverColor': "#93c5fd",
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to bottom right, #1a1a1a, #2a2a2a, #ffffff)',
      },
    },
  },
  plugins: [],
};

export default config; 