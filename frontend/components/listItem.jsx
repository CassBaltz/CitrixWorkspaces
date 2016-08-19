"use strict";

const React = require('react');

const WorkspaceItem = require('./workspaceItem');

module.exports = React.createClass({
  getInitialState: function () {
    return {mounted: false};
  },

  componentDidMount: function () {
    this.setState({mounted: true});
  },

  highlightText: function () {
    let query = this.props.query;
    let name = this.props.ws.name;
    let id = name + 'head';
    let item = document.getElementById(`${id}`);
    if (query === "") {
      item.innerHTML = `${name}`;
      return;
    }

    let regx = new RegExp(query, "i");
    if (name.search(regx) !== -1) {
      let length = query.length;
      let position = name.match(regx)['index'];
      let first = name.substring(0, position);
      let middle = name.substring(position, position + length);
      let last = name.substring(position + length, name.length + 1);
      let highlightedName = first + '<span>' + middle + '</span>' + last;
      item.innerHTML = `${highlightedName}`;
      return;
    } else {
      item.innerHTML = `${name}`;
      return;
    }
  },

  render: function () {
    let workspaces = this.props.ws.spaces.map(space => {
      return <WorkspaceItem query={this.props.query}
        key={space.name} space={space}
        target={this.props.target}/>;
    });

    if (this.state.mounted === true) {
      this.highlightText();
    }

    return (
      <div className="category-container group">
        <div className="category-header">
          <img className="category-thumb"
            src={this.props.ws.thumbnail_link} />
          <h3 id={this.props.ws.name + 'head'} className="category-header"></h3>
        </div>
        {workspaces}
      </div>
    );
  }
});
