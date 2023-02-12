/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/*.{html,js}'],
  theme: {
    extend: {
      backgroundColor: {
        'light-gray': '#FAFBFC',
        'primary-blue': '#4353DB',
      },

      dropShadow: {
        'sm-buttons': '0px 10.6667px 25px rgba(92, 95, 116, 0.06)'
      },

      boxShadow: {
        'sm-buttons': '0px 10.6667px 25px rgba(92, 95, 116, 0.06)',
        'library-card': '0px 8px 35px rgba(92, 95, 116, 0.03)',
      },

      opacity: {
        '2': '.02',
      }
    },
  },
  plugins: [],
}
