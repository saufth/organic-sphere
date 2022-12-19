const plugin = require('tailwindcss/plugin')

/** Default values for sizing and spacing */
const sizingConfig = {
  breakpoints: {
    xs: '20rem', /* 320px */
    sm: '24rem', /* 384px */
    md: '28rem', /* 448px */
    lg: '32rem', /* 512px */
    xl: '36rem', /* 576px */
    '2xl': '42rem', /* 672px */
    '3xl': '48rem', /* 768px */
    '4xl': '56rem', /* 896px */
    '5xl': '64rem', /* 1024px */
    '6xl': '72rem', /* 1152px */
    '7xl': '80rem' /* 1280px */
  },
  defaults: {
    0.75: '0.1875rem', /* 3px */
    15: '3.75rem', /* 60px */
    18: '4.5rem' /* 72px */
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      /* Cairo Fonts */
      'cairo-extra-light': ['Cairo Extra Light', 'sans-serif'],
      'cairo-light': ['Cairo Light', 'sans-serif'],
      'cairo-regular': ['Cairo Regular', 'sans-serif'],
      'cairo-medium': ['Cairo Medium', 'sans-serif'],
      'cairo-semi-bold': ['Cairo Semi Bold', 'sans-serif'],
      'cairo-bold': ['Cairo Bold', 'sans-serif'],
      'cairo-black': ['Cairo Black', 'sans-serif'],
      /* TT Supermolot Neue Fonts */
      'supermolot-thin': ['TT Supermolot Neue Thin', 'sans-serif'],
      'supermolot-extra-light': ['TT Supermolot Neue Extra Light', 'sans-serif'],
      'supermolot-light': ['TT Supermolot Neue Light', 'sans-serif'],
      'supermolot-regular': ['TT Supermolot Neue Regular', 'sans-serif'],
      'supermolot-medium': ['TT Supermolot Neue Medium', 'sans-serif'],
      'supermolot-demibold': ['TT Supermolot Neue Demibold', 'sans-serif'],
      'supermolot-bold': ['TT Supermolot Neue Bold', 'sans-serif'],
      'supermolot-extra-bold': ['TT Supermolot Neue Extra Bold', 'sans-serif'],
      'supermolot-black': ['TT Supermolot Neue Black', 'sans-serif']
    },
    extend: {
      colors: {
        emah: {
          orange: '#FF6700',
          'orange-light': '#F5A130',
          'orange-dark': '#FF3600',
          blue: '#3319FF',
          'blue-light': '#0D71FF',
          'blue-dark': '#1C09B3',
          violet: '#AD0DFF',
          gray: '#515151',
          dark: '#2B2B2B'
        }
      },
      width: {
        ...sizingConfig.breakpoints,
        ...sizingConfig.defaults
      },
      height: {
        ...sizingConfig.breakpoints,
        ...sizingConfig.defaults
      },
      padding: {
        ...sizingConfig.defaults
      },
      margin: {
        ...sizingConfig.defaults
      },
      borderRadius: {
        14: '14px'
      },
      boxShadow: {
        'center-2xl': '0px 0px 32px rgba(0, 0, 0, 1)',
        'center-3xl': '0px 0px 64px rgba(0, 0, 0, 1)',
        'center-4xl': '0px 0px 96px rgba(0, 0, 0, 1)'
      },
      transitionDelay: {
        600: '600ms'
      },
      animation: {
        wave: 'wave 2s infinite alternate linear'
      },
      keyframes: {
        wave: {
          from: {
            transform: 'scale(1)'
          },
          to: {
            transform: 'scale(0.9)'
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
    plugin(({ addVariant, e }) => {
      addVariant('second', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`second${separator}${className}`)}:nth-child(2)`
        })
      })
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities({
        'animation-delay': (value) => {
          return {
            'animation-delay': value
          }
        }
      },
      {
        values: theme('transitionDelay')
      }
      )
    })
  ]
}
