/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: '#04341a',
        'brand-light': '#d5e9d6',
        'bg-primary': '#fafbfa',
        'bg-secondary': '#f0f1f0',
        'text-primary': '#010a05',
        'text-secondary': '#7e8280',
        'text-tertiary': '#afb3b0',
        stroke: '#d5d7d5',
      },
    },
  },
  plugins: [],
}
