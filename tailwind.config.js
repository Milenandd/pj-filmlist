/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Cores personalizadas em tons de violeta escuro
        violet: {
          50: '#f5f3ff',  // Violeta bem claro
          100: '#e0d9ff',  // Um pouco mais intenso
          200: '#c4a7ff',  // Violeta médio
          300: '#9e7bff',  // Violeta mais intenso
          400: '#7a4bff',  // Violeta forte
          500: '#5a2eff',  // Violeta escuro
          600: '#3b0aff',  // Violeta mais escuro
          700: '#2d008c',  // Violeta quase roxo
          800: '#20005d',  // Violeta muito escuro
          900: '#150033',  // Violeta muito escuro
        },
      },
    },
  },
  plugins: [],
};
