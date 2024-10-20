/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: '"Poppins", sans-serif',
        Sixtyfour: '"Sixtyfour Convergence", sans-serif;',
        Edu: '"Edu AU VIC WA NT Dots", cursive;',
      },
    },
  },
  plugins: [require("daisyui")],
};
