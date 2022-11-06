/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  mode: "jit",
  darkMode: "class",
  content: ["./**/*.{ts,tsx}"],
  theme: {},
  plugins: []
}