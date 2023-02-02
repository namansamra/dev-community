/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      background: '#1d1d1d',
      cyan: '#08FDD8',
      brick: '#FD2155',
      black: '#000000',
      white: '#fff',
      tagColor: '#515152',
      grey: '#a5a5a5',
      sideMenuBg: '#181818',
      primaryBlue: '#3B49DF',
    },
    extend: {
      fontFamily: {
        labelleCursive: [
          `'La Belle Aurore', cursive`,
          ...defaultTheme.fontFamily.sans,
        ],
        caveat: [`'Caveat', cursive;`],
      },
    },
  },
  plugins: [],
};
