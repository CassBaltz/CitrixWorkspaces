'use strict';

const React = require('react');

const Workspace = require('./workspace');

module.exports = React.createClass({
  render: function() {
    return (
      <div id="app-container">
        <Workspace />
      </div>
    );
  }
});
