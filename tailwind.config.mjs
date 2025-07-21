/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEFDF8',
          100: '#FDF9E7',
          200: '#F9F1C7',
          300: '#F4E8A7',
          400: '#E8D577',
          500: '#D4AF37',
          600: '#B8941F',
          700: '#9A7A1A',
          800: '#7D6115',
          900: '#654D11'
        },
        neutral: {
          50: '#FEFDF8',
          100: '#F5F5DC',
          200: '#EAEAC7',
          300: '#D8D8B8',
          400: '#B8B89A',
          500: '#8B8B7A',
          600: '#6B6B5D',
          700: '#4A4A42',
          800: '#2C2C2C',
          900: '#1A1A1A'
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'system-ui', 'sans-serif'],
        'serif': ['Lora', 'Georgia', 'serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        }
      }
    },
  },
  plugins: [],
}