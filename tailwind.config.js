/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        "purple": 'var(--purple)',
        "font-color" : "var(--font-color)",
        "background": "var(--background)",
      },
      transitionProperty:{
        height:"height, padding",
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

