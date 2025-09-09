/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#508484",
        primeGrey: "#D9D9D9",
        title: "#080705",
      },
    },
  },
  presets: [require("nativewind/preset")],
  plugins: [],
};
