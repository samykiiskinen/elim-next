/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust as necessary
      "./public/index.html",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography')
    ],
  };