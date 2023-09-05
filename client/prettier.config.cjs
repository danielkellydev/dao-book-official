/* eslint-disable no-undef */
module.exports = {
  trailingComma: "es5",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  singleAttributePerLine: true,
  plugins: [require("prettier-plugin-tailwindcss")],
  tailwindConfig: "./tailwind.config.cjs",
};
