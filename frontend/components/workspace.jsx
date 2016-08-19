"use strict";

const React = require('react');

const WorkspaceStore = require('../store/workspaceStore');
const WorkspaceAction = require('../actions/workspaceAction');

const NavComponent = require('./navComponent');
const ListComponent = require('./listComponent');

module.exports = React.createClass({
  render: function() {

    return (
      <div className="workspace-container">
        <NavComponent />
        <ListComponent />
      </div>
    );
  }
});
