const backend = require('lib/services/backend-service');

/**
 * Gets the data for a single department by ID
 */
exports.getDepartmentData = function(id) {
  console.log('getting department with id: ', id);
  return backend.httpGet('/department/list/' + id);
};

/**
 * Gets a list of all department ids
 */
exports.getAllDepartments = function() {
  return backend.httpGet('/department/list');
};

exports.updateDepartment = function(id, updateObj) {
  return backend.httpPut('/department/' + id + '/update', updateObj);
};
