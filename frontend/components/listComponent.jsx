"use strict";

const React = require('react');

const WorkspaceAction = require('../actions/workspaceAction');
const WorkspaceStore = require('../store/workspaceStore');
const ListItem = require('./listItem');

module.exports = React.createClass({
  getInitialState: function () {
    return {query: false, workspaces: [], mounted: false, target: null};
  },

  componentDidMount: function () {
    this.listener = WorkspaceStore.addListener(this.update);
    this.setState({mounted: true});
    window.addEventListener('keydown', this.updatePosition);
  },

  componentWillUnmount: function () {
    this.listener.remove();
    window.removeEventListener('keydown', this.updatePosition);
  },

  updatePosition: function (e) {
    if (this.state.query !== false) {
      let viewHeight = window.innerHeight;
      let listHeight = document.getElementById('list').scrollHeight;
      let difference = listHeight - viewHeight;
      let ratio = viewHeight / listHeight;
      let margin = (difference / this.state.workspaces.length) * ratio;
      switch (e.keyCode) {
        case 38:
          WorkspaceAction.updatePosition(-1);
          document.getElementById('list').scrollTop -= margin;
          break;
        case 40:
          WorkspaceAction.updatePosition(1);
          document.getElementById('list').scrollTop -= (-1 * margin);
          break;
        case 13:
          window.location.href = this.state.target['url'];
          WorkspaceAction.endSearch();
          break;
      }

    }
  },

  update: function () {
    this.setState({query: WorkspaceStore.getQuery(),
    workspaces: WorkspaceStore.getActiveWorkspaces(),
    target: WorkspaceStore.getTarget()});
  },

  render: function () {
    let list;

    if (this.state.mounted) {
      if (this.state.query === false) {
        list = <p></p>;
        document.getElementById('list').className = "list-container hidden";
      } else if (this.state.workspaces.length === 0){
        document.getElementById('list').className = "list-container";
        list = <h3 className="no-match">No Matching Workspaces</h3>;
      } else {
        document.getElementById('list').className = "list-container";
        list = this.state.workspaces.map(workspace => {
          return <ListItem key={workspace['name']}
            ws={workspace} query={this.state.query}
            target={this.state.target} />;
        });
      }
    } else {
      list = "";
    }

    return (
      <div id="list" onKeyDown={this.updatePosition}>
        {list}
      </div>
    );
  }
});
