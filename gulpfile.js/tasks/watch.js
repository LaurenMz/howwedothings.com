var gulp = require('gulp'),
    config = require('../config');

var watchTask = function(callback) {
  gulp.watch(config.root.src + '/scss/**/*.scss', ['css']);
};

gulp.task('watch', ['js'], watchTask);
module.exports = watchTask;