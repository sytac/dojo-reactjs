'use strict';
var sass = require('gulp-sass');
var cssGlobbing = require('gulp-css-globbing');

module.exports = function(gulp, config) {
  var tasks = {
    build: {
      seq: [
        cssTask,
        'build-src',
        copyHtml
      ]
    }
  };
  return tasks;

  function copyHtml() {
    gulp.src('src/*.html')
        .pipe(gulp.dest(config.folders.build));
  }

  function cssTask() {
    return gulp.src(['src/styles.scss'])
        .pipe(cssGlobbing({
          extensions: ['.css', '.scss'],
          ignoreFolders: ['../styles'],
          autoReplaceBlock: {
            onOff: true,
            globBlockBegin: 'cssGlobbingBegin',
            globBlockEnd: 'cssGlobbingEnd',
            globBlockContents: '../**/*.scss'
          },
          scssImportPath: {
            leading_underscore: false,
            filename_extension: false
          }
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.folders.build));
  }
};



