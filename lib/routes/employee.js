var jsong = require('falcor-json-graph');
var _ = require('lodash');
var Promise = require('bluebird');
var service = require('lib/services/employee-service');

module.exports = [
  {
    route:'model.employeeById[{keys:ids}]["name","id","email","address","office","title","department"]',
    get: function(pathset) {
      return new Promise(function(resolve){
        var servicePromises = [];
        var paths = [];
        _.each(pathset[2], function(id){
          servicePromises.push(service.getEmployeeData(id).then(function(employeeData){
            _.each(pathset[3], function(key){
              if (key === 'department'){
                paths.push({
                  path: ['model', 'employeeById', id, key],
                  value: jsong.ref(['model', 'departmentById', employeeData.departmentNumber])
                });
              } else if (key === 'office'){
                paths.push({
                  path: ['model', 'employeeById', id, key],
                  value: jsong.ref(['model', 'officeById', employeeData.officeNumber])
                });
              } else {
                paths.push({
                  path: ['model', 'employeeById', id, key],
                  value: employeeData[key]
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
    route:'model.employeeIds',
    get: function(){
      return service.getAllEmployees().then(function(employees){
        var results = [];
        _.each(employees, function(employee){
          results.push(jsong.ref(['model', 'employeeById', employee.id]));
        });
        return [{
          path: ['model', 'employeeIds'],
          value: results
        }];
      });
    }
  }
];
