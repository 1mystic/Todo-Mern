/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        anime: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        primary: '#ff5c8a',
        secondary: '#2d2d2d',
        background: '#f6f7fb', // softer, calmer background
      },
      boxShadow: {
        brutal: '4px 4px 0 0 #2d2d2d',
        soft: '0 4px 24px 0 rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl: '1.25rem',
        brutal: '0.5rem',
      },
    },
  },
  plugins: [],
}

