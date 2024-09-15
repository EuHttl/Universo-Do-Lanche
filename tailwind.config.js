/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './components/**/*.{html,js}',
      './pages/**/*.{html,js}',
      './index.html',
    ],
  theme: {
    fontFamily:{
        'sans': ['Roboto', 'sans-serif']
    },
    extend: {
      backgroundImage:{
        "fundo": "url('/assets/pexels-krisof-1252890.jpg')"
      }
    },
  },
  plugins: [],
}

