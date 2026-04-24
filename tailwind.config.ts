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
        // Warm coral-forward palette (pivoted from dark cinematic)
        void: "#F56B4A",          // coral/salmon — primary bg
        coral: "#F56B4A",
        coralDeep: "#E2553A",     // hover/deep coral
        cream: "#FFF3EA",          // off-white card bg + on-coral text
        panel: "#FFF3EA",          // cards on coral
        panel2: "#FFE9DB",        // subtle variant
        hairline: "rgba(28,18,14,0.12)",
        ink: "#1C120E",            // deep brown-black on cards
        inkSoft: "#3A2A22",       // secondary ink
        cream2: "#FFFBF5",        // brightest cream
        muted: "#FFD9C7",         // on-coral muted
        mutedInk: "#7A5A4E",      // muted on cream card
        dim: "#C58B78",           // dim on coral
        // Accents — playful bright
        sun: "#FFD24A",            // primary CTA yellow
        sunDeep: "#F5B82A",
        acid: "#C3F53E",           // lime accent
        violet: "#7C5CFF",
        signal: "#FF4D2E",
        iris: "#4AD6D6",           // teal
        hot: "#FF5ACD",
        sky: "#4A9EFF",
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
