/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Your custom font
        bhayakafont: ["BhayaKaFont", "sans-serif"],

        // System font stack
        bs: [
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Liberation Sans",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
