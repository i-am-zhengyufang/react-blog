const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.{ts,tsx,js,jsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
    },
    backgroundColor: {
      base: 'var(--bg-color)',
      primary: 'var(--bg-primary-color)',
      'primary-hover': 'var(--bg-primary-hover-color)',
      code: '#f9f2f4',
      blockquote: '#fefbec'
      // secondary: 'var(--color-secondary)',
      // muted: 'var(--color-text-muted)',
    },
    textColor: {
      base: 'var(--color-text-base)',
      'base-hover': 'var(--color-text-hover)',
      primary: 'var(--color-text-primary)',
      danger: 'var(--color-danger)',
      white: 'var(--color-white)',
      code: '#c7254e'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
