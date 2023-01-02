/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/*.{js,jsx,ts,tsx}", "./components/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: '#000112',
        darkBg: '#20212C',
        darkGrey: '#2B2C37',
        linesDark: '#3E3F4E',
        mediumGrey: '#828FA3',
        linesLight: '#E4EBFA',
        lightBg: '#F4F7FD',
        white: '#FFFFFF',
        purple: '#635FC7',
        purpleHover: '#A8A4FF',
        red: '#EA5555',
        redHover: '#FF9898',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif']
      },
      fontSize: {
        hS: '12px',
        bL: '13px',
        hM: '15px',
        hL: '18px',
        hXL: '24px',
      },
      lineHeight: {
        S: '15px',
        M: '19px',
        L: '23px',
        XL: '30px',
      },
      letterSpacing: {
        S: '2.4px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
  darkMode: 'class',
}
