/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // fontFamily: {
    //   serif: ['Buenard'],
    // },
    screens: {
      tablet: '640px',
      // => @media (min-width: 640px) { ... }

      lg: '1074px',
      // => @media (min-width: 1024px) { ... }

      desktop: '1280px',
      // => @media (min-width: 1280px) { ... }
    },

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

          secondary: '#1d1a42',

          accent: '#9ca3af',

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
