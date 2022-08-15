const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
    './config/initializers/**/*.rb',
  ],
  theme: {
    extend: {
      colors: {
        $orange: 'rgb(251, 89, 40)',
        $blue: 'rgb(0, 59, 103)',
        $white: 'rgb(255, 255, 255)',
        $lightOrange: 'rgb(255, 131, 77)',
        $yellow: 'rgb(255, 222, 89)',
        $lightBlue: 'rgb(12, 103, 170)',
        'major-100': '#dae2f1',
        'major-200': '#b4c5e4',
        'major-300': '#698bc9',
        major: '#3D64AA',
        'major-700': '#2f4d83',
        minor: '#f37fbc',
        'minor-700': '#e91687',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ]
}
