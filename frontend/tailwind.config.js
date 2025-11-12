/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand primary (blue): #2596be core
        primary: {
          50: '#eff8fc',
          100: '#d8eef7',
          200: '#b6def0',
          300: '#86c8e4',
          400: '#59b1d3',
          500: '#2596be',
          600: '#1f86ab',
          700: '#1b7697',
          800: '#175f79',
          900: '#124a5f',
        },
        // Brand accent (orange): #ff9d28 core
        accent: {
          50: '#fff7ec',
          100: '#ffe9cc',
          200: '#ffd39a',
          300: '#ffbd68',
          400: '#ffa63e',
          500: '#ff9d28',
          600: '#e68d24',
          700: '#cc7d20',
          800: '#a5641a',
          900: '#804e14',
        },
        // Brand surface (near-white): #f8f9fa
        surface: '#f8f9fa',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}






