var gulp = require('gulp');
var path = require('path');
var taskLoader = require('gulp-commonjs-tasks/task-loader');


var config = {
  folders: {
    dist: path.join(__dirname, 'dist'),
    build: path.join(__dirname, 'dist', 'build')
  },
  uglify: {
    global: true,
    sourcemap: false,
    mangle: false,
    compress: false
  }
};
// load tasks
var tasksContext = taskLoader.load('./tasks', gulp, config);

// Add the gulp help task
tasksContext.addHelpTask();
