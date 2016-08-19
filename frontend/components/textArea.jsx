const React = require('react');

const WorkspaceAction = require('../actions/workspaceAction');

module.exports = React.createClass({
  updateSearch: function (e) {
    e.preventDefault();
    WorkspaceAction.getData(e.target.value);
  },

  render: function () {
    let text;
    if (this.props.query === false)
      text = "";
    else {
      text = this.props.query;
    }

    return (
      <div>
        <form>
          <input id="workspace-text" type="text" placeholder="Change Workspace"
            onChange={this.updateSearch}
            onClick={this.updateSearch}
            value={text} />
        </form>
      </div>
    );
  }
});
