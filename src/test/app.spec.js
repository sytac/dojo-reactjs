import React from 'react';
var rewire = require('rewire');
var App = rewire('../app.js');

describe('app component', () => {
  var revertClass;
  beforeEach(() => {
    revertClass = App.__set__('Routes', React.createClass({
      render: function() {
        return <div id='routes'/>;
      }
    }));

  });

  afterEach(() => {
    revertClass();
  });

  it('should render correctly', () => {
    var markup = React.renderToStaticMarkup(<App />);
    markup.should.be.equal('<div><div id="routes"></div></div>');
  })
});