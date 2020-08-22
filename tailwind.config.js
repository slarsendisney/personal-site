// See https://tailwindcss.com/docs/configuration for details
module.exports = {
  purge: ["./src/**/*.js"],
  theme: {
    colors: {},
    textColor: {
      grey: "#444444",
      primary: "var(--color-text-primary)",

      secondary: "var(--color-text-secondary)",
      link: "var(--color-text-link)",
      default: "var(--color-text-default)",
      "default-soft": "var(--color-text-default-soft)",
      inverse: "var(--color-text-inverse)",
      "inverse-soft": "var(--color-text-inverse-soft)",
    },
    backgroundColor: {
      white: "#ffffff",
      primary: "var(--color-bg-primary)",
      "primary-light": "var(--color-bg-primary-light)",
      compliment: "var(--color-bg-compliment)",
      accent: "var(--color-bg-accent)",
      "accent-light": "var(--color-bg-accent-light)",
      secondary: "var(--color-bg-secondary)",
      default: "var(--color-bg-default)",
      inverse: "var(--color-bg-inverse)",
    },
    borderColor: {
      primary: "var(--color-bg-primary)",
      accent: "var(--color-bg-accent)",
      secondary: "var(--color-bg-secondary)",
      default: "var(--color-bg-default)",
      inverse: "var(--color-bg-inverse)",
    },
    fontFamily: {
      display: "var(--font-display)",
      body: "var(--font-body)",
    },
    fontWeights: {
      normal: "var(--font-weight-normal)",
      display: "var(--font-weight-display)",
      btn: "var(--font-weight-btn)",
    },
  },
  variants: {},
  // https://github.com/tailwindcss/custom-forms
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/custom-forms"),
  ],
};
