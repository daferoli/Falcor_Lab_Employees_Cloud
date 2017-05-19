var jsong = require('falcor-json-graph');
var _ = require('lodash');
var Promise = require('bluebird');
var service = require('lib/services/office-service');

module.exports = [
  {
    route:'model.officeById[{keys:ids}]["nickname", "id", "address", "officeManager", "size", "expenses", "employees"]',
    get: function(pathset) {
      console.log('individual office get started');
      return new Promise(function(resolve){
        var servicePromises = [];
        var paths = [];
        _.each(pathset[2], function(id){
          servicePromises.push(service.getOfficeData(id).then(function(officeData){
            _.each(pathset[3], function(key){
              if (key === 'officeManager'){
                paths.push({
                  path: ['model', 'officeById', id, key],
                  value: jsong.ref(['model', 'employeeById', officeData.officeManager])
                });
              } else if (key === 'employees'){
                var employeeList = [];
                _.each(officeData.employees, function(employee){
                  employeeList.push(jsong.ref(['model', 'employeeById', employee]));
                });
                paths.push({
                  path: ['model', 'officeById', id, key],
                  value: jsong.atom(employeeList)
                });
              } else {
                paths.push({
                  path: ['model', 'officeById', id, key],
                  value: officeData[key]
                });
              }
            });
          }));
        });
        Promise.all(servicePromises).then(function(){
          resolve(paths);
        });
      });
    }
  },
  {
    route:'model.officeIds',
    get: function(){
      return service.getAllOffices().then(function(offices){
        var results = [];
        _.each(offices, function(office){
          results.push(jsong.ref(['model', 'officeById', office.id]));
        });
        return [{
          path: ['model', 'officeIds'],
          value: results
        }];
      });
    }
  }
];
