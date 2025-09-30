// client/src/lib/theme.ts

export const mizanTheme = {
  colors: {
    primary: '#CCA404',      // Gold - Main brand color
    primaryDark: '#B39003',  // Darker gold for hover states
    primaryLight: '#E8D4A0', // Light gold for backgrounds
    
    secondary: '#4CB3A9',    // Teal - Accent color
    secondaryDark: '#3A9088',// Darker teal
    secondaryLight: '#5DC7BD',// Light teal
    
    gray: {
      900: '#3F3D56',        // Darkest gray - Primary text
      700: '#545454',        // Dark gray - Secondary text  
      400: '#A0A0A0',        // Medium gray
      200: '#E2E8F0',        // Light gray - Backgrounds
      100: '#F5F5F5',        // Lightest gray
    },
    
    white: '#FFFFFF',
    black: '#000000',
    
    // Semantic colors
    success: '#4CB3A9',
    warning: '#CCA404', 
    error: '#DC2626',
    info: '#3B82F6',
    
    // Cylinder colors (for 7-level framework)
    cylinders: {
      1: '#E8D4A0', // Stability
      2: '#DCC078', // Belonging
      3: '#CCA404', // Mastery
      4: '#B39003', // Autonomy
      5: '#4CB3A9', // Purpose
      6: '#3A9088', // Evolution
      7: '#2C7066', // Legacy
    }
  },
  
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Playfair Display', 'serif'], // For headings if needed
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    }
  },
  
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },
  
  borderRadius: {
    none: '0',
    sm: '0.25rem',
    base: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    full: '9999px',
  },
  
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    base: '0 4px 6px rgba(0,0,0,0.1)',
    md: '0 4px 12px rgba(0,0,0,0.12)',
    lg: '0 10px 20px rgba(0,0,0,0.15)',
    xl: '0 20px 40px rgba(0,0,0,0.2)',
  },
  
  transitions: {
    fast: '150ms ease-in-out',
    base: '200ms ease-in-out',
    slow: '300ms ease-in-out',
  }
};

// Helper function to get cylinder gradient
export function getCylinderGradient(fromLevel: number, toLevel: number): string {
  const from = mizanTheme.colors.cylinders[fromLevel as keyof typeof mizanTheme.colors.cylinders];
  const to = mizanTheme.colors.cylinders[toLevel as keyof typeof mizanTheme.colors.cylinders];
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
}

// Tailwind config extension (add to tailwind.config.js)
export const tailwindExtend = {
  colors: {
    'mizan-gold': '#CCA404',
    'mizan-gold-dark': '#B39003',
    'mizan-gold-light': '#E8D4A0',
    'mizan-teal': '#4CB3A9',
    'mizan-teal-dark': '#3A9088',
    'mizan-gray-900': '#3F3D56',
    'mizan-gray-700': '#545454',
    'mizan-gray-200': '#E2E8F0',
  },
  fontFamily: {
    'sans': ['Inter', 'system-ui', 'sans-serif'],
    'display': ['Playfair Display', 'serif'],
  }
};
