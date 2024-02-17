/** @type {import('tailwindcss').Config} */
module.exports = {
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
          400: '#b61115',
          600: '#f93e17',
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
      }
    }
  },
  plugins: [],
}
