/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/common/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"  ],
  theme: {
    extend: {
      boxShadow: {
        t: "0 -5px 5px 0 rgba(0, 0, 0, 0.1)",
        r: "3px 0px 7px 0px rgba(0, 0, 0, 0.1)",
        card: "0 10px 30px 0 rgba(0, 0, 0, 0.05)",
        dropdown: "0 3px 6px 0 rgba(0, 0, 0, 0.15)",
        hover: " 0 10px 30px 0 rgba(0, 0, 0, 0.15)",
        location: "0 3px 6px 0 rgba(0, 0, 0, 0.1);",
        deleteActivity: "0 1px 6px 0 rgba(0, 0, 0, 0.3)",
      },
      dropShadow: {
        icon: "drop-shadow(0px 0px 2px #00000050)",
      },
      backgroundColor: {
        secondary: "#f1f2f4",
        third: "#f9f9f9",
        primary: "#36a000",
        primarydark: "#1d4354",
        error: "#f3756c",
        disabled : "#f6f8fa80",
      },
      backgroundImage: {
        section: "linear-gradient(108deg, #2b5468, #1d4354)",
        race: "linear-gradient(165deg, #ffffff 30%, #3e88a9 70%)",
      },
      textColor: {
        hover_light: "#6fd945",
        hover: "#36a000",
        primary: "#222",
        secondary: "#656565",
        primarydark: "#1d4354",
        error: "#f3756c",
      },
      borderColor: {
        primary: "#36a000",
        secondary: "#f1f2f4",
        primarydark: "#1d4354",
        error: "#f3756c",
      },
      transitionProperty: {
        my: "all 0.3s ease-in-out",
      },
    },
    screens: {
      xxs: "320px",
      // => @media (min-width: 320px) { ... }
      xs: "375px",
      // => @media (min-width: 375px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
