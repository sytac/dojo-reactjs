'use strict';

var path = require("path");
var browserify = require('browserify');
var babelify = require('babelify');
var uglifyify = require('uglifyify');
var source = require('vinyl-source-stream');

module.exports = function(gulp, config) {
  var tasks = {
    'build-src': {
      fn: buildSrcTask,
      help: 'Build the app'
    }
  };

  return tasks;

  function buildSrcTask(done) {

    var result = browserify('src/index.js', {debug: false})
        .transform(babelify.configure({
          "optional": [],
          'blacklist': [],
          sourceMaps: false
        }));

    if (config.uglify) {
      result.transform(config.uglify, uglifyify);
    }

    result.bundle()
        .pipe(source('main.js'))
        .pipe(gulp.dest(config.folders.build))
        .on('end', function(err) {
          if (err) {
            done(err);
          } else {
            done();
          }
        });
  }
};
