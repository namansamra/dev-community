/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: {
      background: '#1d1d1d',
      cyan: '#08FDD8',
      brick: '#FD2155',
      black: '#000000',
      white: '#fff',
      tagColor: '#515152',
      sideMenuBg: '#181818',
      primaryBlue: '#3B49DF',
      grey: {
        DEFAULT: '#475467',
        10: '#FEFEFF',
        25: '#FCFCFD',
        50: '#F9FAFB',
        100: '#F2F4F7',
        200: '#E4E7EC',
        300: '#D0D5DD',
        400: '#98A2B3',
        500: '#667085',
        600: '#475467',
        700: '#344054',
        800: '#1D2939',
        900: '#101828',
      },
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
