const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto'],
      },
      colors: {
        lblue: {
          light: '#21AAED',
          DEFAULT: '#085CA4',
        },
        lgrey: {
          DEFAULT: '#F8F8F8',
          bg: '#F8F8F8',
          border: '#F2F2F2',
        },
        lyellow: {
          DEFAULT: '#FFC400'
        },
        lgreen: {
          DEFAULT: '#02C77D'
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
