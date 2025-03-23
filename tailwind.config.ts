import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography'

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
        'backgroundColor': '#1e2939',
        'cardColor': '#2a2a2a',
        'textColor': "#e5e7eb",
        'white': "#ffffff",
        'hoverColor': "#93c5fd",
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(to bottom right, #1a1a1a, #2a2a2a, #ffffff)',
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': 'var(--tw-colors-textColor)',
            '--tw-prose-headings': 'var(--tw-colors-white)',
            '--tw-prose-lead': 'var(--tw-colors-textColor)',
            '--tw-prose-links': 'var(--tw-colors-hoverColor)',
            '--tw-prose-bold': 'var(--tw-colors-white)',
            '--tw-prose-counters': 'var(--tw-colors-textColor)',
            '--tw-prose-bullets': 'var(--tw-colors-textColor)',
            '--tw-prose-hr': 'var(--tw-colors-backgroundColor)',
            '--tw-prose-quotes': 'var(--tw-colors-textColor)',
            '--tw-prose-quote-borders': 'var(--tw-colors-backgroundColor)',
            '--tw-prose-captions': 'var(--tw-colors-textColor)',
            '--tw-prose-code': 'var(--tw-colors-white)',
            '--tw-prose-pre-code': 'var(--tw-colors-textColor)',
            '--tw-prose-pre-bg': 'var(--tw-colors-backgroundColor)',
            '--tw-prose-th-borders': 'var(--tw-colors-backgroundColor)',
            '--tw-prose-td-borders': 'var(--tw-colors-backgroundColor)',
          },
        },
      },
    },
  },
  plugins: [typography],
}

export default config; 