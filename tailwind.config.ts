import type { Config } from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
export default <Partial<Config>>{
  content: [
    './src-nuxt/pages/**/*.vue',
    './src-nuxt/components/**/*.vue',
    './src-nuxt/layouts/**/*.vue',
    './project.vue',
  ],
  theme: {
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    fontFamily: {
      sans: 'Poppins, Rubik',
      serif: 'Poppins, Rubik',
    },
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 1000ms linear infinite',
      },
      colors: {
        dark: '#131A20',
        'dark-red': '#C0172A',
        disabled: '#303A4B',
        gray: {
          200: '#222B39',
          300: '#454D5E',
          400: '#35424D',
          500: '#1B232D',
          600: '#3D4E5C',
          700: '#101623',
        },
        light: {
          300: 'rgba(255, 255, 255, 0.3)',
          400: '#F5F4FB',
          700: 'rgba(255, 255, 255, 0.7)',
        },
        primary: {
          300: '#BDB3FF',
          400: '#8472F3',
          500: '#6B59D9',
        },
        red: '#EC364B',
        success: '#00F593',
        warn: '#FFD37A',
      },
      scale: {
        102: '1.02',
      },
      aspectRatio: {
        '3/4': '3 / 4',
      },
    },
  },
  plugins: [],
}
