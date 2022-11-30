/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "rgba(207, 181, 59, 100)",
        lightGold: "rgb(222,204,120)",
        lightBlack: "rgba(32,33,36, 100)",
      },
    },
    fontFamily: {
      heading: ["Courgette", "cursive"],
    },
  },
  plugins: [],
};
