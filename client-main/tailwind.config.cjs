/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1b3f5f",
      },
      animation: {
        textMoveLeft: "textMoveLeft 12.5s linear infinite",
      },
      keyframes: {
        textMoveLeft: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
