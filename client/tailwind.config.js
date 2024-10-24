export default {
  darkMode: "class",
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
  // Enable DaisyUI themes
  daisyui: {
    themes: ["light", "dark"], // Add 'light' and 'dark' themes
  },
};
