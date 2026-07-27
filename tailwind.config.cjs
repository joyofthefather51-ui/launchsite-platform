/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF6EF',
          soft: '#F3EDE1',
        },
        ink: '#2B2A26',
        olive: {
          DEFAULT: '#4B5A38',
          dark: '#3B4A2C',
        },
        coral: '#E8734A',
        muted: '#8C8677',
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
