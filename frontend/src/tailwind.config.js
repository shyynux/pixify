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
      },
    },
  },
  plugins: [],
}