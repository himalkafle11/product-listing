module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#f85606",
        secondaryColor: "#007787",
        primaryText: "#fff",
        secondaryText: "#848484",
        primaryBackground: "#173B45",
        secondaryBackground: "#F8EDED",
        blueColor:"#3FA2F6",
        lightBlueColor:"#6EACDA",
        greenColor:"#06D001",
        customGray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
