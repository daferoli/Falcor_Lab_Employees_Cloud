const http = require('http');

exports.httpGet = function(path) {
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
};

exports.httpPut = function(path, data) {
  return new Promise(function(resolve) {
    const opts = {
      hostname: 'localhost',
      port: 8001,
      path: path,
      agent: false,  // create a new agent just for this one request
      method: 'PUT'
    };
    var request = http.request(opts, (res) => {
        var data = '';
        res.on('data', function(buffer){
          data += buffer;
        });
        res.on('end', function(){
          resolve(JSON.parse(data));
        });
    });
    request.write(data);
    request.close();
  });
};

exports.httpPost = function(path, data) {
  return new Promise(function(resolve) {
    const opts = {
      hostname: 'localhost',
      port: 8001,
      path: path,
      agent: false,  // create a new agent just for this one request
      method: 'POST'
    };
    var request = http.request(opts, (res) => {
        var data = '';
        res.on('data', function(buffer){
          data += buffer;
        });
        res.on('end', function(){
          resolve(JSON.parse(data));
        });
    });
    request.write(data);
    request.close();
  });
};
