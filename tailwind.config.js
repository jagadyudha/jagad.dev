// tailwind.config.js

const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/templates/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#0AC5B3',
        background: '#16181d',
        background_100: '#2C2D30',
        background_dark: '#1a1a1c',
      },
      fontFamily: {
        sans: ['Inter'],
      },
    },
    screens: {
      xs: '300px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/line-clamp'),
  ],
};
