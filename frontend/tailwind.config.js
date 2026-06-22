/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow':    'float 8s ease-in-out 1s infinite',
        'shimmer':       'shimmer 2s linear infinite',
        'glow':          'glow 3s ease-in-out infinite',
        'gradient-x':    'gradientX 6s ease infinite',
        'slide-up':      'slideUp 0.5s ease-out forwards',
        'fade-in':       'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-14px) rotate(1.5deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-1deg)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%':      { boxShadow: '0 0 50px rgba(139,92,246,0.6), 0 0 100px rgba(99,102,241,0.2)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%':      { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          '0%':   { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      boxShadow: {
        'glow-sm':     '0 0 15px rgba(99,102,241,0.3)',
        'glow':        '0 0 30px rgba(99,102,241,0.4)',
        'glow-lg':     '0 0 60px rgba(99,102,241,0.3)',
        'glow-violet': '0 0 30px rgba(139,92,246,0.4)',
        'card-light':  '0 4px 24px rgba(0,0,0,0.08)',
        'card-dark':   '0 4px 24px rgba(0,0,0,0.5)',
        'premium':     '0 20px 60px rgba(0,0,0,0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}
