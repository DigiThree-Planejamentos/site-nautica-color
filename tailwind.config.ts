import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#002659",
        "navy-light": "#172C65",
        red: "#BE1A2C",
        "red-bright": "#C81E31",
        "off-white": "#EDECEC",
        ink: "#172133",
        sky: "#E8F0FA",
        mist: "#D7E5F4"
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 38, 89, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
