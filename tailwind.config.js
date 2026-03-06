/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',         // electric-green #00ff7f
          foreground: 'var(--color-primary-foreground)', // deep-forest-black #080c0a
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',        // dimmed-green #00c45f
          foreground: 'var(--color-secondary-foreground)', // deep-forest-black #080c0a
        },
        accent: {
          DEFAULT: 'var(--color-accent)',           // amber #ffb700
          foreground: 'var(--color-accent-foreground)', // deep-forest-black #080c0a
        },
        background: 'var(--color-background)',      // deep-forest-black #080c0a
        foreground: 'var(--color-foreground)',      // green-tinted-white #c8d8c8
        surface: {
          DEFAULT: 'var(--color-surface)',          // elevated-surface #0d1410
          foreground: 'var(--color-surface-foreground)', // green-tinted-white #c8d8c8
          2: 'var(--color-surface2)',               // higher-elevation #131a10
        },
        card: {
          DEFAULT: 'var(--color-card)',             // elevated-surface #0d1410
          foreground: 'var(--color-card-foreground)', // green-tinted-white #c8d8c8
        },
        popover: {
          DEFAULT: 'var(--color-popover)',          // higher-elevation #131a10
          foreground: 'var(--color-popover-foreground)', // green-tinted-white #c8d8c8
        },
        muted: {
          DEFAULT: 'var(--color-muted)',            // green-tinted-border #1e2e1e
          foreground: 'var(--color-muted-foreground)', // dimmed-green-text #5a7a5a
        },
        border: 'var(--color-border)',              // green-tinted-border #1e2e1e
        input: 'var(--color-input)',                // elevated-surface #0d1410
        ring: 'var(--color-ring)',                  // electric-green #00ff7f
        success: {
          DEFAULT: 'var(--color-success)',          // electric-green #00ff7f
          foreground: 'var(--color-success-foreground)', // deep-forest-black #080c0a
        },
        warning: {
          DEFAULT: 'var(--color-warning)',          // amber #ffb700
          foreground: 'var(--color-warning-foreground)', // deep-forest-black #080c0a
        },
        error: {
          DEFAULT: 'var(--color-error)',            // bright-red #ff3a3a
          foreground: 'var(--color-error-foreground)', // white #ffffff
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)',      // bright-red #ff3a3a
          foreground: 'var(--color-destructive-foreground)', // white #ffffff
        },
      },
      fontFamily: {
        heading: ['Bebas Neue', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'display-1': ['3rem', { lineHeight: '1.1' }],
        'display-2': ['2.5rem', { lineHeight: '1.15' }],
        'display-3': ['2rem', { lineHeight: '1.2' }],
        'display-4': ['1.5rem', { lineHeight: '1.25' }],
        'display-5': ['1.25rem', { lineHeight: '1.3' }],
        'caption': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0.025em' }],
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        full: '9999px',
      },
      boxShadow: {
        'glow-sm': '0 0 8px rgba(0, 255, 127, 0.2)',
        'glow': '0 0 12px rgba(0, 255, 127, 0.3)',
        'glow-lg': '0 0 20px rgba(0, 255, 127, 0.4)',
        'glow-amber': '0 0 8px rgba(255, 183, 0, 0.3)',
        'glow-red': '0 0 8px rgba(255, 58, 58, 0.3)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      height: {
        'header': '64px',
        'header-mobile': '56px',
      },
      zIndex: {
        'header': '1000',
        'mobile-menu': '1100',
        'modal': '2000',
        'scanlines': '200',
      },
      transitionTimingFunction: {
        'terminal': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
      keyframes: {
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'live-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        'slide-down': 'slide-down 200ms ease-out',
        'live-pulse': 'live-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};