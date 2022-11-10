/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: '#8930dc',

          'primary-content': '#FFF',

          secondary: '#828DF8',

          accent: '#F471B5',

          neutral: '#1D283A',

          'base-100': '#04012d',

          'base-content': '#fff',

          info: '#0CA6E9',

          success: '#2BD4BD',

          warning: '#F4C152',

          error: '#FB6F84',

          '--rounded-btn': '30rem',
        },
      },
      'light',
      'mytheme',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'light',
  },
};
