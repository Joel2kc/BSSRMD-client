/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2B6CB0",
        secondary: "#63B3ED",
        accent: "#48BB78",
        neutral: "#E2E8F0",
        contrast: "#2D3748",
      },
    },
  },
  plugins: [],
};
