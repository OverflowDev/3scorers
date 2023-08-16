/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        scorers: '#008F8F',
        scorers2: '#007575',
        scorersDark: '#004F4F',
        secondary: '#51FFFF',
      }
    },
  },
  plugins: [
    // require('tailwind-scrollbar')
  ],
}