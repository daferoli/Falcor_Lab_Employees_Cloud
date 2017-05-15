var http = require('http');
var Promise = require('bluebird');

/**
 * Gets the data for a single office by ID
 */
function getOfficeData(id) {
  return httpGet('/office/list/' + id);
}

/**
 * Gets a list of all office ids
 */
function getAllOffices() {
  return httpGet('/office/list');
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

  getOfficeData: getOfficeData,

  getAllOffices: getAllOffices

};
