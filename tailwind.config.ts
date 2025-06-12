import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default (<Partial<Config>>{
  content: ['./src/runtime/**/*.{js,ts,vue}'],
  theme: {
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.33)', opacity: '1' },
          '50%': { transform: 'scale(1)', opacity: '0' },
          '40%, 100%': { opacity: '0' },
        },
        'pulse-dot': {
          '0%': { transform: 'scale(0.8)' },
          '25%': { transform: 'scale(1)' },
          '50%, 100%': { transform: 'scale(0.8)' },
        },
      },
      animation: {
        spin: 'spin 1000ms linear infinite',
        'pulse-ring': 'pulse-ring 2000ms cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'pulse-dot': 'pulse-dot 2000ms cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite',
      },
      colors: {
        gray: {
          200: '#222B39',
          300: '#454D5E',
          400: '#35424D',
          500: '#1B232D',
          700: '#101623',
          900: '#131A20',
        },
        light: {
          300: 'rgba(255, 255, 255, 0.3)',
          400: '#F5F4FB',
        },
        primary: {
          300: '#BDB3FF',
          400: '#8472F3',
          500: '#6B59D9',
        },
      },
    },
  },
  plugins: [],
}) as Config
