/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#1E3855',
      'secondary': '#7F5A83',
      'tertiary': '#E2A9C6',
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
  
}

