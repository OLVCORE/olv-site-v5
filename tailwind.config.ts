import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // OLV Color System
        'olv-dark-blue': '#1A1F36',
        'olv-blue': '#243056',
        'olv-border': '#2C3352',
        'olv-gold': '#F5CB5C',
        'olv-gold-hover': '#F7D77E',
        'olv-light': '#FFFFFF',
        'olv-gray': '#757F9A',
        'olv-dark-gray': '#4D5166',
        
        dark: {
          bg: "var(--bg-dark)",
          text: "var(--txt-dark)",
          accent: "var(--accent-dark)",
          "accent-hover": "var(--accent-dark-hover)",
          secondary: "var(--bg-dark-secondary)",
          tertiary: "var(--bg-dark-tertiary)",
        },
        light: {
          bg: "var(--bg-light)",
          text: "var(--txt-light)",
          accent: "var(--accent-light)",
          "accent-hover": "var(--accent-light-hover)",
          secondary: "var(--bg-light-secondary)",
          tertiary: "var(--bg-light-tertiary)",
        },
        /* Design tokens v2 (mapped a partir de CSS vars) */
        primary: "var(--color-primary)",
        "on-primary": "var(--color-on-primary)",
        accent: "var(--color-accent)",
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "on-surface": "var(--color-on-surface)",
        "surface-light": "var(--color-surface-light)",
        "accent-light": "var(--color-accent-light)",
      },
      animation: {
        ticker: "ticker 30s linear infinite",
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
export default config; 