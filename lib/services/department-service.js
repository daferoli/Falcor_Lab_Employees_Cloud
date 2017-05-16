var http = require('http');
var Promise = require('bluebird');

/**
 * Gets the data for a single department by ID
 */
function getDepartmentData(id) {
  console.log('getting department with id: ', id);
  return httpGet('/department/list/' + id);
}

/**
 * Gets a list of all department ids
 */
function getAllDepartments() {
  return httpGet('/department/list');
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

  getDepartmentData: getDepartmentData,

  getAllDepartments: getAllDepartments

};
