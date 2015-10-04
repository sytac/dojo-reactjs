'use strict';
var del = require('del');
var mocha = require('gulp-mocha-co');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');
var coverageEnforcer = require('gulp-istanbul-enforcer');
var babel = require('babel/register')({extensions: [".js"]});

module.exports = function(gulp) {
  var tasks = {
    'mocha': {
      seq: [
        testCoverageDelete,
        testCoverage
      ],
      description: 'Test the code and fill up the coverage'
    }
  };
  return tasks;

  function testCoverageDelete(done) {
    del.sync(['./coverage/**']);
    done();
  }

  function testCoverage(done) {
    var coverageDir = './coverage';
    gulp.src(['./src/**/*.js', '!./src/**/test/*.js'])
        .pipe(istanbul({ // Covering files
          instrumenter: isparta.Instrumenter,
          includeUntested: true
        }))
        .pipe(istanbul.hookRequire()) // Force `require` to return covered files
        .on('finish', function() {
          gulp.src([
                './tests/helpers/chai.js',
                './src/**/test/*.spec.js',
                './tests/**/*.spec.js'
              ], {read: false}
          ).pipe(
              mocha({
                reporter: 'spec',
                compilers: {
                  js: babel
                }
              })
          ).pipe(
              istanbul.writeReports({
                dir: coverageDir,
                reportOpts: {dir: coverageDir},
                reporters: ['text', 'text-summary', 'json', 'html']
              })
          ).pipe(
              coverageEnforcer({
                thresholds: {
                  statements: 80,
                  branches: 50,
                  lines: 80,
                  functions: 50
                },
                coverageDirectory: coverageDir,
                rootDirectory: ''
              })
          ).on('end', done);
        })
  }
};
