/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: {
          light: '#6d28d9',
          DEFAULT: '007bff',
          dark: '#4c1d95',
        },
        secondary: '#f59e0b', // Custom yellow
        customGray: {
          light: '#f5f5f5',
          DEFAULT: '#d1d5db',
          dark: '#4b5563',
        },
        background: {
          Default: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
};
