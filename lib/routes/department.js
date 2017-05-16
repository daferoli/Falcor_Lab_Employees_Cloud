var jsong = require('falcor-json-graph');
var _ = require('lodash');
var Promise = require('bluebird');
var service = require('lib/services/department-service');

module.exports = [
  {
    route:'model.departmentById[{keys:ids}]["name","departmentNumber","budget","departmentLead","employees","title","department"]',
    get: function(pathset) {
      return new Promise(function(resolve){
        _.each(pathset[2], function(id){
          return service.getDepartmentData(id).then(function(departmentData){
            var paths = [];
            _.each(pathset[3], function(key){
              if (key === 'departmentLead'){
                paths.push({
                  path: ['model', 'departmentById', id, key],
                  value: jsong.ref(['model', 'employeeById', departmentData.departmentLead])
                });
              } else if (key === 'employees'){
                var employeeList = [];
                _.each(departmentData.employees, function(employee){
                  employeeList.push(jsong.ref(['model', 'employeeById', employee]));
                });
                paths.push({
                  path: ['model', 'departmentById', id, key],
                  value: jsong.atom(employeeList)
                });
              } else {
                paths.push({
                  path: ['model', 'departmentById', id, key],
                  value: departmentData[key]
                });
              }
            });
            resolve(paths);
          });
        });
      });
    }
  },
  {
    route:'model.departmentIds',
    get: function(){
      return service.getAllDepartments().then(function(departments){
        var results = [];
        _.each(departments, function(department){
          results.push(jsong.ref(['model', 'departmentById', department.departmentNumber]));
        });
        return [{
          path: ['model', 'departmentIds'],
          value: jsong.atom(results)
        }];
      });
    }
  }
];
