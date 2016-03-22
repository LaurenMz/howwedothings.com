var gulp        = require('gulp'),
    config      = require('../config'),
    browserSync = require('browser-sync');

var watchTask = function(callback) {

  browserSync.init({
    server: {
      baseDir: "./web"
    }
  });

  gulp.watch(config.root.src + '/scss/**/*.scss', ['css']);
  gulp.watch(config.root.dest + "/*.html").on('change', browserSync.reload);
};

gulp.task('watch', ['sprite','css','js'], watchTask);
module.exports = watchTask;