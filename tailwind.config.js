/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        brutal: {
          bg: 'var(--brutal-bg)',
          fg: 'var(--brutal-fg)',
          accent: 'var(--brutal-accent)',
          muted: 'var(--brutal-muted)',
          surface: 'var(--brutal-surface)',
          border: 'var(--brutal-border)',
          glow: 'var(--brutal-glow)',
        },
        sunset: {
          sky: 'var(--gradient-sky)',
          mid: 'var(--gradient-mid)',
          warm: 'var(--gradient-warm)',
          amber: 'var(--gradient-amber)',
          gold: 'var(--gradient-gold)',
        },
      },
      borderRadius: {
        xl: "0px",
        lg: "0px",
        md: "0px",
        sm: "0px",
        xs: "0px",
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px var(--brutal-accent)',
        'brutal-sm': '2px 2px 0px var(--brutal-accent)',
        'brutal-accent': '4px 4px 0px var(--brutal-glow)',
        'brutal-lg': '6px 6px 0px var(--brutal-accent)',
        'sunset-glow': '0 0 40px rgba(245, 147, 14, 0.25)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee": "marquee 20s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}