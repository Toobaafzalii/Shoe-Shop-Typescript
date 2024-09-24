/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "App-black": "#212529",
        "App-text-black": "#152536",
        "App-gray": "#212529",
        "App-text-gray": "#757475",
        "App-input": "#FAFAFA",
        "App-product": "#F3F3F3",
      },
      fontSize: {
        "App-size": "32px",
      },
    },
  },
  plugins: [],
};
