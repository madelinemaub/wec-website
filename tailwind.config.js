/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'serif-elegant': ['Playfair Display', 'serif'],
        'sans-clean': ['Inter', 'sans-serif'],
      },
      colors: {
        'wec-dark': '#1a2e26',
        'wec-cream': '#FDFCFB',
      },
      animation: {
        'fade-in': 'fade-in 0.8s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
