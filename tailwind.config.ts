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
        // Gen-Z sticker-book palette — butter paper bg + saturated stickers
        void: "#FBF3D5",           // butter paper — primary bg
        paper: "#FBF3D5",
        paperDeep: "#F4E9B8",     // slightly darker paper for hover
        coral: "#FF3E9D",          // hot magenta (legacy name, now = hot pink)
        coralDeep: "#E6297F",     // hover hot-pink
        cream: "#FFFBEA",          // bright cream card bg
        panel: "#FFFBEA",
        panel2: "#FFF5D4",
        hairline: "rgba(23,20,18,0.14)",
        ink: "#171412",            // near-black ink
        inkSoft: "#3A312A",
        cream2: "#FFFDF3",
        muted: "#F4E9B8",          // muted paper
        mutedInk: "#6B5E52",
        dim: "#A0927F",
        // Accents — saturated sticker pops
        sun: "#FFC22E",             // mango
        sunDeep: "#F5A91F",
        acid: "#BFFF3D",           // electric lime
        lime: "#BFFF3D",
        cherry: "#FF4D4D",          // tomato red
        violet: "#8F5CFF",
        signal: "#FF4D2E",          // siren orange
        iris: "#B8A8FF",           // soft lavender
        hot: "#FF3E9D",             // hot pink
        pink: "#FF3E9D",
        sky: "#7AB9FF",             // soft sky blue
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
        "spin-slow": "spin 18s linear infinite",
        "spin-slower": "spin 32s linear infinite",
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
      boxShadow: {
        card: "0 20px 40px -20px rgba(28,18,14,0.25), 0 6px 12px -6px rgba(28,18,14,0.1)",
        cardHover: "0 30px 60px -25px rgba(28,18,14,0.35), 0 10px 20px -8px rgba(28,18,14,0.15)",
        pop: "0 6px 0 0 rgba(28,18,14,0.9)",
      },
    },
  },
  plugins: [],
};

export default config;
