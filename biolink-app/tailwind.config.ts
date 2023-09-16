import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#141724',
        'secondary': '#563259',
        'tertiary': '#6A6D7C',
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs")]
}
export default config
