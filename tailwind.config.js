/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  prefix: 'tw-',
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `app.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`,
  ],
  theme: {
    extend: {
      screens: {
        '3xl': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }

        '2xl': { max: '1430px' },
        // => @media (max-width: 1535px) { ... }

        xl: { max: '1290px' },
        // => @media (max-width: 1279px) { ... }

        lg: { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        'md-lg': { max: '900px' },
        // => @media (max-width: 1023px) { ... }

        md: { max: '767px' },
        // => @media (max-width: 767px) { ... }

        sm: { max: '539px' },
        // => @media (max-width: 639px) { ... }
      },
      colors: {
        brand: {
          primary: '#2fc7de',
          'primary-light': '#14203b'
        },
      },
    },
  },
  plugins: [],
}

