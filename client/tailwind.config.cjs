/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1ed760',
        'background-dark': '#000000',
        'background-light': '#121212',
        'button-active': '#333333',
      },
      fontFamily: {
        SpaceMono: ['Space Mono', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        fadeIn: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            visibility: 'visible',
            opacity: 1,
          },
        },
      },
      animation: {
        'fadeIn-1': '1s fadeIn',
        'fadeIn-1.5': '1.5s fadeIn',
        'fadeIn-2': '2s fadeIn',
      },
    },
  },
  plugins: [],
};
