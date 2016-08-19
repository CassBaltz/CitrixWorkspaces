const UserData = require('../dataUtil/spaces');
const Dispatcher = require('../dispatcher/dispatcher');
const WSConstants = require('../constants/workspaceConstants');

const WorkspaceAction = {
  getData: function(query) {
    WorkspaceAction.returnAllData(query, WorkspaceAction.updateStore);
  },

  returnAllData (query, callback) {
    let totalCollection = [];
    let regex = new RegExp(query, "i");
    UserData.forEach(org => {
      let match = false;
      let orgObj = {};
        if (org['name'].search(regex) >= 0) {
          match = true;
        }

        orgObj['name'] = org['name'];
        orgObj['thumbnail_link'] = org['image']['thumbnail_link'];
        orgObj['spaces'] = [];

        if (match === true) {
          org['spaces'].forEach(space => {
            let spaceObj = {};
            spaceObj['name'] = space['name'];
            spaceObj['url'] = space['url'];
            orgObj['spaces'].push(spaceObj);
          });
        } else {
          org['spaces'].forEach(space => {
            let spaceObj = {};
            if (space['name'].search(regex) >= 0) {
              spaceObj['name'] = space['name'];
              spaceObj['url'] = space['url'];
              match = true;
              orgObj['spaces'].push(spaceObj);
            }
          });
        }

      if (match === true) {
        totalCollection.push(orgObj);
      }
    });
    callback(query, totalCollection);
  },

  endSearch: function () {
    Dispatcher.dispatch({
      actionType: WSConstants.END_SEARCH
    });
  },

  updateStore: function (query, data) {
    Dispatcher.dispatch({
      actionType: WSConstants.UPDATE_SEARCH,
      query: query,
      data: data
    });
  },

  updatePosition: function (increment) {
    Dispatcher.dispatch({
      actionType: WSConstants.UPDATE_POSITION,
      increment: increment
    });
  }
};

module.exports = WorkspaceAction;
