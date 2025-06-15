module.exports = {
  content: ['./view/**/*.html', './public/js/**/*.js'],
  plugins: [
    require('daisyui'),
  ],
  safelist: [
    'mask-squircle',
    'mask-heart',
    'mask-hexagon',
    'mask-hexagon-2',
    'mask-decagon',
    'mask-pentagon',
    'mask-diamond',
    'mask-circle',
    'mask-triangle-2'
  ]
}
