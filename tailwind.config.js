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
        primary: '#000', // black
        secondary: '#0ea5e9', // sky-500
        tertiary: {     // gray
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          btn: '#082f49', // cyan-950
          bdr: '#374151', // gray-700
          bg: '#020617', // slate-950
          least: '#075985',
          inactive: '#6b7280'
        },
        textColor: '#cbd5e1', // slate-300
        'white': '#f8fafc'
      }
    },
  },
  plugins: [],
}

