/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#6366f1',
        accent: '#8b5cf6',
        bg: '#0a0a0f',
        surface: '#13131a',
        surface2: '#1c1c27',
      },
      fontSize: {
        hero: ['68px', { lineHeight: '1.1', fontWeight: '700' }],
        h1:   ['42px', { lineHeight: '1.2', fontWeight: '600' }],
        h2:   ['26px', { lineHeight: '1.3', fontWeight: '600' }],
        base: ['16px', { lineHeight: '1.5' }],
        sm:   ['14px', { lineHeight: '1.5' }],
      },
      spacing: {
        '18': '72px',
        '22': '88px',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '24px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(99,102,241,0.35)',
        card: '0 4px 24px rgba(0,0,0,0.4)',
      },
    },
  },
  plugins: [],
}