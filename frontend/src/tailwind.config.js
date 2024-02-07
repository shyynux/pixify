/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ghibli-green-1': '#D0E7D2',
        'ghibli-green-2': '#B0D9B1',
        'ghibli-green-3': '#79AC78',
        'ghibli-green-4': '#618264',
        'neon-glow-1': '#16FF00',
        'retro-1': '#EEE2DE',
        'retro-2': '#FFD0EC',
        'retro-3': '#D63484',
        'retro-4': '#2B2A4C',
      },
      fontFamily: {
        'super-milk': ['Super Milk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}