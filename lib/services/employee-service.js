var http = require('http');
var Promise = require('bluebird');

/**
 * Gets the data for a single employee by ID
 */
function getEmployeeData(id) {
  return httpGet('/employee/list/' + id);
}

/**
 * Gets a list of all employee ids
 */
function getAllEmployees() {
  return httpGet('/employee/list');
}

function httpGet(path) {
  return new Promise(function(resolve){
      http.get({
      hostname: 'localhost',
      port: 8001,
      path: path,
      agent: false  // create a new agent just for this one request
    }, (res) => {
      var data = '';
      res.on('data', function(buffer){
        data += buffer;
      });
      res.on('end', function(){
        resolve(JSON.parse(data));
      });
    });
  });
}

module.exports = {

  getEmployeeData: getEmployeeData,

  getAllEmployees: getAllEmployees

};
