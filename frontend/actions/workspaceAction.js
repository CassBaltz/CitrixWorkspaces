const UserData = require('../dataUtil/spaces');
const Dispatcher = require('../dispatcher/dispatcher');
const WSConstants = require('../constants/workspaceConstants');

const WorkspaceAction = {
  getData: function(query) {
    if (query === "") {
      WorkspaceAction.returnAllData(query, WorkspaceAction.updateStore);
    } else {
      WorkspaceAction.filterData(query, WorkspaceAction.updateStore);
    }
  },

  returnAllData (query, callback) {
    let totalCollection = [];
    UserData.forEach(org => {
      let orgObj = {};
        orgObj['name'] = org['name'];
        orgObj['thumbnail_link'] = org['image']['thumbnail_link'];
        orgObj['spaces'] = [];
        org['spaces'].forEach(space => {
          let spaceObj = {};
          spaceObj['name'] = space['name'];
          spaceObj['url'] = space['url'];
          orgObj['spaces'].push(spaceObj)
        })
      totalCollection.push(orgObj);
     })
    callback(query, totalCollection);
  },

  filterData: function (query, callback) {
    let collection = [];

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
  }
};

module.exports = WorkspaceAction;
