/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        "dark-purple": "#351778",
        "light-white": "egba(255,255,255,0.17)",
      }
    },
  },
  plugins: [],
}