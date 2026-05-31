/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0047AB",
          light: "#1A6FD4",
          dark: "#003082",
        },
        accent: "#00BFFF",
        dark: {
          DEFAULT: "#0A0A0F",
          2: "#111827",
        },
        surface: "#141B2D",
        "text-main": "#E8EAF0",
        "text-muted": "#94A3B8",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Raleway", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(135deg, #0A0A0F 0%, #141B2D 50%, #0047AB22 100%)",
        "gradient-card":
          "linear-gradient(145deg, #141B2D 0%, #111827 100%)",
        "gradient-blue":
          "linear-gradient(135deg, #0047AB 0%, #1A6FD4 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      boxShadow: {
        card: "0 4px 24px rgba(0, 71, 171, 0.15)",
        "card-hover": "0 8px 40px rgba(0, 71, 171, 0.35)",
        glow: "0 0 30px rgba(0, 191, 255, 0.2)",
      },
    },
  },
  plugins: [],
};
