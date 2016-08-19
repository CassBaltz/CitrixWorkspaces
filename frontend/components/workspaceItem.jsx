"use strict";

const React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {mounted: false};
  },

  componentDidMount: function () {
    this.setState({mounted: true});
  },

  updateHighlighting() {
    let query = this.props.query;
    let name = this.props.space.name;
    let item = document.getElementById(`${name}`);
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

  changeSpace: function(e) {
    e.preventDefault();
    let url = this.props.space.url;
    window.location.href = url;
  },

  updateClass: function() {
    if (this.props.target['name'] === this.props.space.name) {
      let item = document.getElementById(`${this.props.space.name}`);
      let collection = document.getElementsByClassName('ws-name');
      let list = [];
      for (let i = 0; i < collection.length; i++) {
        list.push(collection[i]);
      }
      list.forEach(el => (el.className = 'ws-name'));
      item.className = 'ws-name active';
    }
  },

  render: function () {
    if (this.state.mounted === true) {
      this.updateHighlighting();
      this.updateClass();
    }

    return (
      <div onClick={this.changeSpace} className="ws-cont">
        <i className="material-icons">all_out</i>
        <h3 className="ws-name" id={this.props.space.name}></h3>
      </div>
    );
  }
});
