var gulp = require('gulp'),
    config = require('../config').main;

gulp.task('watch', ['webpack'], function(callback) {
  gulp.watch(config.src + '/scss/**/*.scss', ['sass']);
});