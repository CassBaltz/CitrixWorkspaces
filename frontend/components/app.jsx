'use strict';

const React = require('react');

const Workspace = require('./workspace');
const WorkspaceAction = require('../actions/workspaceAction');
const WorkspaceStore = require('../store/workspaceStore');

module.exports = React.createClass({
  render: function() {
    return (
      <div id="app-container" onKeyDown={this.updatePosition}>
        <Workspace />
      </div>
    );
  }
});
