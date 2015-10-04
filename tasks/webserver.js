'use strict';

module.exports = function(gulp, config) {
  var tasks = {
    webserver: {
      fn: webserverTask,
      help: 'Serve static pages'
    }
  };

  return tasks;

  function webserverTask() {
    var gulpConnect = require('gulp-connect');
    gulpConnect.server({
      livereload: false,
      port: 8000,
      root: [config.folders.build]
    });
  }
};
