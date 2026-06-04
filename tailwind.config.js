/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0b0b0f",
        foreground: "#ffffff",
        primary: "#7c3aed",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.12)",
      },
      backdropBlur: {
        xl: "20px",
      },
    },
  },
  plugins: [],
};