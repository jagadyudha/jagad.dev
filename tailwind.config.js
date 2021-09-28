// tailwind.config.js

const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        myorange: '#E88D53',
        myorangelight: '#C25C23',
        mydark: '#171717',
        mylight: '#F3F4F6',
        mybg: '#2E2E2E',
        mybglight: '#FFFFFF',
        pink: colors.pink,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
