// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "navy-header": "#0f172a",
        background: "#ffffff",
        card: "#ffffff",
        "card-foreground": "#0b1220",
        sidebar: "#ffffff", // nền sidebar
        "sidebar-border": "#e5e7eb", // border
        "sidebar-accent": "#f3f4f6", // màu hover / active bg
        muted: "#f3f4f6",
        "muted-foreground": "#6b7280", // text mờ
        primary: "#197398",
        "primary-foreground": "#ffffff",
      },
    },
  },
  plugins: [],
};
