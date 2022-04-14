module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        footer: "rgb(0 0 0 / 45%) 0px -5px 20px -15px",
      },
      animation: {
        spinner: "spin 1.5s cubic-bezier(0.8, 0, 0.2, 1) infinite",
      },
    },
  },
  plugins: [],
};
