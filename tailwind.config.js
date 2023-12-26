/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#d60a0b',
        secondary: '#14238a'
      },
      textColor: {
        default: '#000000'
      },
      backgroundColor: {
        background: '#1a1a1a',
        contentBackground: '#ffffff',
        sidebar: '#112d4e',
        sidebarHover: '#184376',
        error: '#f06c6c',
        success: '#a6ed6e',
        input: '#dddeee',
        logo: ''
      },
      dropShadow: {
        font: '0 4px 4px rgba(0, 0, 0, 0.25)'
        // normal: '0 0 4px rgba(0, 0, 0, 1)'
      },
      boxShadow: {
        default: '0 0 4px rgba(0, 0, 0, 1)'
      },
      width: {
        18: '4.5rem'
      },
      fontFamily: {
        cookie: ['"Cookie"', 'cursive']
      },
      flexGrow: {
        2: 2
      }
    }
  },
  plugins: ['prettier-plugin-tailwindcss']
};
