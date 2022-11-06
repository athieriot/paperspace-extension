/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
  corePlugins: {
    preflight: false,
  },
  mode: "jit",
  content: ["./**/*.{ts,tsx}"],
  theme: {},
  plugins: []
}