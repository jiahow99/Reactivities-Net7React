/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    
  ],
  theme: {
    colors: {
      'primary-custom': '#1E3855',
      'secondary-custom': '#7F5A83',
      'tertiary-custom': '#E2A9C6',
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('tw-elements/dist/plugin.cjs')
  ],
  
}

