import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        "lux-blue": "#0057D9",
        "lux-blue-2": "#3B82F6",
        emerald: "#00B894",
        gold: "#D4AF37",
        "ice-blue": "#EAF4FF",
        "sky-blue": "#7DD3FC",
        cyan: "#22D3EE",
        ink: "#05070C",
        "ink-2": "#0B0F1A",
        "glass-border": "rgba(255,255,255,0.18)",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "aurora-1":
          "radial-gradient(45% 45% at 20% 20%, rgba(0,87,217,0.35) 0%, transparent 70%)",
        "aurora-2":
          "radial-gradient(40% 40% at 80% 30%, rgba(0,184,148,0.30) 0%, transparent 70%)",
        "aurora-3":
          "radial-gradient(50% 50% at 50% 90%, rgba(212,175,55,0.22) 0%, transparent 70%)",
        "mesh-light":
          "linear-gradient(135deg, #ffffff 0%, #eaf4ff 45%, #ffffff 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(5,7,12,0.12)",
        "glass-lg": "0 20px 60px -12px rgba(5,7,12,0.25)",
        "glow-gold": "0 0 40px -8px rgba(212,175,55,0.55)",
        "glow-blue": "0 0 40px -8px rgba(0,87,217,0.55)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "aurora-move": {
          "0%,100%": { transform: "translate(0,0) rotate(0deg)" },
          "50%": { transform: "translate(4%,-4%) rotate(6deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.2s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "aurora-move": "aurora-move 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
