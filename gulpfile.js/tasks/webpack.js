var config = require('../config');

if (!config.tasks.js) { return; }

var gulp =    require("gulp"),
    gutil =   require("gulp-util"),
    webpack = require("webpack"),
    path =    require("path");

var webPackConfig = {
  context: path.resolve(config.root.src, config.tasks.js.src),
  entry: config.tasks.js.entries,
  output: {
    path: path.resolve(config.root.dest, config.tasks.js.dest),
    filename: '[name].js'
  }
};


// gulp.task("js", function (callback) {
//   gutil.log("this", webPackConfig);
// });

gulp.task("webpack", function (callback) {
  var initialCompile = false;
  webpack(webPackConfig).watch({
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