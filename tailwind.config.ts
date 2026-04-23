import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0A0C",
        panel: "#121216",
        panel2: "#1A1A22",
        hairline: "#2A2A33",
        ink: "#F4F2EC",
        muted: "#8A8A94",
        dim: "#5A5A66",
        acid: "#BFFF1A",
        violet: "#7C5CFF",
        signal: "#FF4D2E",
        iris: "#8EFFE9",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-reverse": "marquee-reverse 40s linear infinite",
        float: "float 8s ease-in-out infinite",
        ping_slow: "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
