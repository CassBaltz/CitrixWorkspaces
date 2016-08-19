const React = require('react');

const WorkspaceAction = require('../actions/workspaceAction');

module.exports = React.createClass({
  startSearch: function (e) {
    e.preventDefault();
    WorkspaceAction.getData("");
  },

  endSearch: function (e) {
    e.preventDefault();
    WorkspaceAction.endSearch();
    document.getElementById('list').scrollTop = 0;
  },

  render: function () {
    let icon;
    if (this.props.query === false) {
      icon = <i onClick={this.startSearch}
        className="material-icons">search</i>;
    } else {
      icon = <i onClick={this.endSearch}
        className="material-icons">close</i>;
    }

    return (
      <div className="icon-div">
        {icon}
      </div>
    );
  }
});
