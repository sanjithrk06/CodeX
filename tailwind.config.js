/** @type {import('tailwindcss').Config} */
const { colors: defaultColors } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

export default {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', 
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.black
      }
    },
  },
  plugins: [],
}

