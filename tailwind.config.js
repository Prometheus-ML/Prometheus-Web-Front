/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    container: {
      padding: '1.5rem',
    },
    extend: {
      screens: {
        '2xl': '1300px',
      },
      colors: {
        'black-alpha': 'rgba(0, 0, 0, 0.7)'
      },
      wordBreak: {
        'kepp-all': 'keep-all'
      }
    },
  },
  plugins: [],
}
