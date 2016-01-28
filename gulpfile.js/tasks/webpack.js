var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack"),
    config = require('../config').webpack;

gulp.task("webpack", function (callback) {
  var initialCompile = false;
  webpack({
    entry: config.entry,
    output: config.output
  }).watch({
    aggregateTimeout: 300,
    poll: true
  }, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({ /* ?? */ }));
    if (!initialCompile) {
      console.log(__dirname);
      initialCompile = true;
      callback();
    }
  });
});