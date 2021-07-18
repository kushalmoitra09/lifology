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
          dark: '#9A9A9A'
        },
        lyellow: {
          DEFAULT: '#FFC400'
        },
        lgreen: {
          DEFAULT: '#02C77D'
        }
      },
      animation: {
        'hbounce': 'hbounce 1s infinite',
      },
      keyframes: {
        hbounce: {
          '0%, 100%': { transform: 'translateX(0%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateX(-25%)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
        }
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus',],
    },
  },
  plugins: [],
}
