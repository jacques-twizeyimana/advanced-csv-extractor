/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          400: "#3480eb",
          500: "#15396b",
        },
      },
    },
  },
  plugins: [],
};
