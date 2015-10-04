'use strict';

module.exports = function(gulp) {
  return {
    watch: {
      fn: watchTask,
      help: 'Style help'
    }
  };

  function watchTask() {
    gulp.watch('src/**/*', ['build']);
    gulp.watch('./package.json', function(event) {
      console.log('File ' + event.path + ' was ' + event.type +
      ', running tasks...');
    });
  }
};
