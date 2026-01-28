/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bakery': {
          'primary': '#8B4513',
          'secondary': '#F5DEB3',
          'accent': '#FF6B35',
          'background': '#FFF8DC',
        },
        'season': {
          'spring': '#FFB7C5',
          'summer': '#87CEEB',
          'autumn': '#FF8C00',
          'winter': '#8B7355',
        },
        'score': {
          'high': '#22C55E',
          'mid': '#F59E0B',
          'low': '#EF4444',
        },
        'stock': {
          'ok': '#22C55E',
          'low': '#F59E0B',
          'out': '#EF4444',
        }
      },
      fontFamily: {
        'display': ['Noto Sans JP', 'sans-serif'],
        'price': ['Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ticker': 'ticker 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        ticker: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
