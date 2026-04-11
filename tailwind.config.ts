import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        lekki: {
          bg: "#211731",       // dark background
          panel: "#29213A",    // nav & card background
          primary: "#7C3AED",  // royal purple
          accent: "#9D4EDD",   // lighter purple
          text: "#EDEDF1",     // main text
          subtext: "#A7A7B0",  // muted text
        },
      },
      boxShadow: {
        soft: "0 6px 28px rgba(0,0,0,.35)",
      },
    },
  },
  plugins: [],
};

export default config;
