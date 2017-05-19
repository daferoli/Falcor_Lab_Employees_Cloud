const backend = require('lib/services/backend-service');

/**
 * Gets the data for a single office by ID
 */
exports.getOfficeData = function(id) {
  return backend.httpGet('/office/list/' + id);
};

/**
 * Gets a list of all office ids
 */
exports.getAllOffices = function() {
  return backend.httpGet('/office/list');
};

exports.updateOffice = function(id, updateObj) {
  return backend.httpPut('/office/' + id + '/update', updateObj);
};
