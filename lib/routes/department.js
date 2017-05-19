var jsong = require('falcor-json-graph');
var _ = require('lodash');
var Promise = require('bluebird');
var service = require('lib/services/department-service');

module.exports = [
  {
    route:'model.departmentById[{keys:ids}]["name","departmentNumber","budget","departmentLead","employees","title"]',
    get: function(pathset) {
      return new Promise(function(resolve){
        console.log('getting department');
        var servicePromises = [];
        var paths = [];
        _.each(pathset[2], function(id){
          servicePromises.push(service.getDepartmentData(id).then(function(departmentData){
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
          }));
        });
        Promise.all(servicePromises).then(function(){
          resolve(paths);
        });
      });
    },
    set: function (jsonGraph) {
      //NOTE: This won't quite work yet
      return new Promise(function(resolve, reject) {
        //only looking at a single path for this
        _.each(jsonGraph.paths[0][2], function(id){
          const updateObj = {};
          const referencedValues = ['employees', 'departmentLead'];
          _.each(jsonGraph.paths[0][3], function(key){
            if (referencedValues.indexOf(key) !== -1) {
              reject('Referenced Values cannot be updated');
            } else {
              updateObj[key] = jsonGraph.jsonGraph.model.departmentById[id][key];
            }
          });
          service.updateDepartment(id, updateObj).then(function(res) {
            console.log('completed update');
            resolve(res);
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
  },
  {
    route:'departments.create',
    //NOTE: not yet implemented
    call: function(path, args, refSuffixes, thisPaths) {
      console.log(path);
      console.log(args);
      console.log(refSuffixes);
      _.each(thisPaths, function(pathset){
        console.log(pathset);
      });
    }
  }
];
