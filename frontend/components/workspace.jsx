"use strict";

const React = require('react');
const WorkspaceStore = require('../store/workspaceStore');
const WorkspaceAction = require('../actions/WorkspaceAction');

module.exports = React.createClass({
  getInitialState: function() {
    return ({active: false});
  },

  componentDidMount: function() {
    this.listener = WorkspaceStore.addListener(this.update);
  },

  update: function() {
    this.setState({active: WorkspaceStore.status()});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  getData: function() {
    WorkspaceAction.getData("");
  },

  render: function() {
    return (
      <div>
        <p onClick={this.getData}>hello</p>
      </div>
    );
  }
});
