"use strict";

const React = require('react');

const TextArea = require('./textArea');
const ControlIcon = require('./controlIcon');

const WorkspaceStore = require('../store/workspaceStore');

module.exports = React.createClass({
  getInitialState: function () {
    return {query: false};
  },

  componentDidMount: function () {
    this.listener = WorkspaceStore.addListener(this.update);
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  update: function () {
    let queryVal = WorkspaceStore.getQuery();
    if (queryVal === false) {
      this.setState({query: false});
      document.getElementById('workspace-text').blur();
    } else {
      this.setState({query: queryVal});
      document.getElementById('workspace-text').focus();
    }
  },

  render: function () {
    return (
      <div className="nav-container">
        <div className="nav-inner">
          <div className="ws-div">
            <ControlIcon query={this.state.query}/>
            <TextArea query={this.state.query}/>
          </div>
          <div className="other-nav">
          </div>
        </div>
      </div>
    );
  }
});
