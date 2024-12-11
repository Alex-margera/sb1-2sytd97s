/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          purple: '#B026FF',
          pink: '#FF26B0',
          blue: '#26B0FF',
        },
        dark: {
          DEFAULT: '#0A0A0A',
          100: '#121212',
          200: '#1A1A1A',
          300: '#262626',
        }
      },
      boxShadow: {
        'neon': '0 0 10px rgba(176, 38, 255, 0.5)',
        'neon-hover': '0 0 20px rgba(176, 38, 255, 0.8)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}