/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/*.{html,js}'],
  theme: {
    extend: {
      backgroundColor: {
        'light-gray': '#FAFBFC',
        'primary-blue': '#4353DB',
      }
    },
  },
  plugins: [],
}
