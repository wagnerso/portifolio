/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5F2EC',
        moss: {
          DEFAULT: '#4A5D4A',
          light: '#6B7F6B',
          dark: '#3A4D3A',
        },
        bark: {
          DEFAULT: '#3D2E1F',
          light: '#5D4E3F',
        },
        sand: {
          DEFAULT: '#D4C4A8',
          light: '#E8DCC8',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}