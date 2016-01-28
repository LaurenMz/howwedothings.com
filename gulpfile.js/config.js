var src = './src',
    dest = './web/assets',
    base = '.';

module.exports = {
  main: {
    src: src,
    dest: dest,
    base: base
  },
  webpack: {
    entry: {
      main: src + '/js/app.js'
    },
    output: {
      filename: '[name].js',
      path: dest + '/js'
    }
  },
  sass: {
    entry: src + '/scss/styles.scss',
    dest: dest + '/css',
    style: 'compressed' // 'expanded'
  },
  sprite: {
    entry: src + '/icons/*.svg',
    dest: base,
    name: 'sprite.svg', // file name
    sprite: './web/assets/img/', // dest rel to theme
    scss:'./src/scss/00_bits/_sprites.scss', // dest rel to theme
    img: base + '/web/assets/img' //img location for svg2png
  }
};