/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Mizan Colors
        'mizan-gold': '#CCA404',
        'mizan-gold-dark': '#B39003',
        'mizan-gold-light': '#E8D4A0',
        
        // Secondary Colors
        'mizan-teal': '#4CB3A9',
        'mizan-teal-dark': '#3A9088',
        'mizan-teal-light': '#5DC7BD',
        
        // Gray Scale
        'mizan-gray-900': '#3F3D56',
        'mizan-gray-700': '#545454',
        'mizan-gray-400': '#A0A0A0',
        'mizan-gray-200': '#E2E8F0',
        'mizan-gray-100': '#F5F5F5',
        
        // 7-Cylinder Colors
        'cylinder-1': '#E8D4A0', // Stability
        'cylinder-2': '#DCC078', // Belonging
        'cylinder-3': '#CCA404', // Mastery
        'cylinder-4': '#B39003', // Autonomy
        'cylinder-5': '#4CB3A9', // Purpose
        'cylinder-6': '#3A9088', // Evolution
        'cylinder-7': '#2C7066', // Legacy
        
        // Override default colors
        primary: {
          DEFAULT: '#CCA404',
          50: '#FDF8E3',
          100: '#F9EDC2',
          200: '#F3DD8A',
          300: '#EDCD52',
          400: '#CCA404',
          500: '#B39003',
          600: '#8F7302',
          700: '#6B5602',
          800: '#473901',
          900: '#231D01',
        },
        secondary: {
          DEFAULT: '#4CB3A9',
          50: '#E7F5F4',
          100: '#C3E7E4',
          200: '#9BD8D2',
          300: '#73C9C0',
          400: '#4CB3A9',
          500: '#3A9088',
          600: '#2D6E6A',
          700: '#214F4C',
          800: '#15312F',
          900: '#0A1817',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'mizan-sm': '0 1px 3px rgba(63, 61, 86, 0.08)',
        'mizan': '0 4px 6px rgba(63, 61, 86, 0.1)',
        'mizan-md': '0 4px 12px rgba(63, 61, 86, 0.12)',
        'mizan-lg': '0 10px 20px rgba(63, 61, 86, 0.15)',
        'mizan-xl': '0 20px 40px rgba(63, 61, 86, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mizan': 'linear-gradient(135deg, #CCA404 0%, #4CB3A9 100%)',
        'gradient-gold': 'linear-gradient(135deg, #E8D4A0 0%, #CCA404 100%)',
        'gradient-teal': 'linear-gradient(135deg, #4CB3A9 0%, #2C7066 100%)',
        'gradient-cylinder': 'linear-gradient(180deg, #E8D4A0 0%, #2C7066 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-gold': 'pulseGold 2s infinite',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(204, 164, 4, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(204, 164, 4, 0)' },
        }
      },
      transitionTimingFunction: {
        'mizan': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      borderRadius: {
        'mizan': '0.75rem',
      }
    },
  },
  plugins: [],
};/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        mizanDark: "#3F3D56",
        mizanGold: "#CCA404",
        mizanTeal: "#4CB3A9",
        mizanLight: "#E2E8F0"
      }
    },
  },
  plugins: [],
};
