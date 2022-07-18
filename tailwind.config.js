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
        secondary: {
          100: "#f5f5f5",
          200: "#F3F3F3",
          300: "#747474",
        },
      },
    },
  },
  plugins: [],
};
