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
    },
    extend: {
      fontFamily: {
        labelleCursive: [
          `'La Belle Aurore', cursive`,
          ...defaultTheme.fontFamily.sans,
        ],
        caveat: [`'Caveat', cursive;`],
      },
      keyframes: {
        timelapse: {
          '0%': {
            width: '100%',
          },
          '100%': {
            width: '0%',
          },
        },
        rubberband: {
          '0%': {
            transform: 'scaleX(1)',
          },
          '40%': {
            transform: 'scaleX(1.5) scaleY(0.75)',
          },
          '55%': {
            transform: 'scaleX(0.85) scaleY(1)',
          },
          '65%': {
            transform: 'scaleX(1.09) scaleY(0.85)',
          },
          '75%': {
            transform: 'scaleX(0.9)  scaleY(1)',
          },
          '90%': {
            transform: 'scaleX(1.05) scaleY(0.95)',
          },
          '100%': {
            transform: 'scaleX(1) scaleY(1)',
          },
        },
      },
      animation: {
        processing: 'timelapse 1s cubic-bezier(.86,.05, .4, .96) 1 forwards;',
        rubberbandEffect: 'rubberband 1s cubic-bezier(.86,.05, .4, .96);',
      },
    },
  },
  plugins: [],
};
