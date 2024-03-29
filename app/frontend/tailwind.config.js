/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,mdx,scss,ts,tsx}",
    "./src/**/**/*.{js,jsx,mdx,scss,ts,tsx}", // grab "styles/code_themes/*.scss"
  ],
  theme: {
    extend: {
      boxShadow: {
        'y-inset': 'inset 0 -1px 5px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.5)'
      },
      backdropBrightness: {
        '25': '25%',
      },
      backgroundSize: {
        '150': '150%',
        '200': '200%',
        '400': '400%'
      },
      blur: {
        '4xl': '128px',
        '5xl': '256px',
        '6xl': '512px'
      },
      borderRadius: {
        '4xl': '48px',
        '5xl': '96px',
        '6xl': '128px'
      },
      colors: {
        loosed: {
          400: 'var(--loosed-highlight-1)',
        }
      },
      fontFamily: {
        'sans': 'var(--mona-sans)',
        'mono': 'var(--jetbrains-mono)'
      },
      fontSize: {
        '10xl': '10rem'
      },
      height: {
        144: '36rem',
        192: '48rem',
        240: '60rem'
      },
      lineHeight: {
        'extra-tight': '0.75'
      },
      maxWidth: {
        '5xl': '1600px',
        '6xl': '1920px',
      },
      padding: {
        22: '5.5rem',
      },
      strokeWidth: {
        3: '3px',
        4: '4px',
        5: '5px'
      }
    }
  },
  plugins: [],
}
