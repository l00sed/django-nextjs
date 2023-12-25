/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,mdx,scss,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'y-inset': 'inset 0 -1px 5px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.5)'
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
        192: '48rem'
      },
      lineHeight: {
        'extra-tight': '0.75'
      }
    }
  },
  plugins: [],
}
