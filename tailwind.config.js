/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#FEA013",
          500: "#BA4A0C",
        },
      },
    },
  },
  plugins: [],
};
