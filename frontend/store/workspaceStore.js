const Store = require('flux/utils').Store;
const WSConstants = require('../constants/workspaceConstants');
const Dispatcher = require('../dispatcher/dispatcher');

const WorkspaceStore = new Store(Dispatcher);

let _activeWorkspaces = [];
let _query = null;

WorkspaceStore.getActiveWorkspaces = function () {
  return _activeWorkspaces;
}

WorkspaceStore.getQuery = function () {
  return _query;
}

function updateWorkspaces (data) {
  _activeWorkspaces = data;
}

function emptyWorkspaces () {
  _activeWorkspaces = [];
  _query = null;
}

function updateQuery (query) {
  _query = query;
}

WorkspaceStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case WSConstants.UPDATE_SEARCH:
      updateWorkspaces(payload.data);
      updateQuery(payload.query);
      WorkspaceStore.__emitChange();
      break;

    case WSConstants.END_SEARCH:
      emptyWorkspaces();
      WorkspaceStore.__emitChange();
      break;
  }
}

module.exports = WorkspaceStore;
