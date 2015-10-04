'use strict';

module.exports = function() {
  var tasks = {
    serve: {
      seq: [
        'build', ['webserver', 'watch']
      ]
    }
  };

  return tasks;
};
