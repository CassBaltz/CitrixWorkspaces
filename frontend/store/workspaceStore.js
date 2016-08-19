const Store = require('flux/utils').Store;
const WSConstants = require('../constants/workspaceConstants');
const Dispatcher = require('../dispatcher/dispatcher');

const WorkspaceStore = new Store(Dispatcher);

let _activeWorkspaces = [];
let _query = false;
let _target = null;
let _wsArray = [];
let _pos = 0;

WorkspaceStore.getActiveWorkspaces = function () {
  return _activeWorkspaces;
};

WorkspaceStore.getQuery = function () {
  return _query;
};

WorkspaceStore.getTarget = function () {
  return _target;
};

function updateWorkspaces (data) {
  _pos = 0;
  _activeWorkspaces = data;
  _wsArray = [];
  _activeWorkspaces.forEach(ws => {
    ws['spaces'].forEach(space => {
      let wsObj = {};
      wsObj['name'] = space['name'];
      wsObj['url'] = space['url'];
      _wsArray.push(wsObj);
    });
  });
  _target = _wsArray[_pos];
}

function emptyWorkspaces () {
  _activeWorkspaces = [];
  _query = false;
  _wsArray = [];
  _pos = 0;
  _target = null;
}

function updateQuery (query) {
  _query = query;
}

function updatePosition (increment) {
  _pos += increment;
  if (_pos < 0) {
    _pos = 0;
  }
  if (_pos > _wsArray.length - 1) {
    _pos = _wsArray.length - 1;
  }

  _target = _wsArray[_pos];
}

WorkspaceStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case WSConstants.UPDATE_SEARCH:
      updateWorkspaces(payload.data);
      updateQuery(payload.query);
      WorkspaceStore.__emitChange();
      break;

    case WSConstants.UPDATE_POSITION:
      updatePosition(payload.increment);
      WorkspaceStore.__emitChange();
      break;

    case WSConstants.END_SEARCH:
      emptyWorkspaces();
      WorkspaceStore.__emitChange();
      break;
  }
};

module.exports = WorkspaceStore;
