/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brown-900': '#5a3a1c', // Customize this color based on the footer's background.
      },
    },
  },
  plugins: [],
};



