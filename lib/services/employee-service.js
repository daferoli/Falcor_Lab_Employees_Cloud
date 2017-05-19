const backend = require('lib/services/backend-service');

/**
 * Gets the data for a single employee by ID
 */
exports.getEmployeeData = function(id) {
  return backend.httpGet('/employee/list/' + id);
};

/**
 * Gets a list of all employee ids
 */
exports.getAllEmployees = function() {
  return backend.httpGet('/employee/list');
};

exports.updateEmployee = function(id, updateObj) {
  return backend.httpPut('/employee/' + id + '/update', updateObj);
};
