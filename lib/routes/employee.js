var jsong = require('falcor-json-graph');
var _ = require('lodash');
var service = require('lib/services/employee-service');

module.exports = [
  {
    route:'model.employeeById[{keys:ids}]["name","id","email","address","office","title","department"]',
    get: function(pathset) {
      return Promise.each(pathset[2], function(id){
        return service.getEmployeeData(id);
      }).then(function(employeeData){
        _.each(employeeData, function(data){
          console.log(data);
        });
      });
    }
  },
  {
    route:'model.employeeIds',
    get: function(){
      console.log('GETTING EMPLOYEEIDS');
      return service.getAllEmployees().then(function(employees){
        var results = [];
        _.each(employees, function(employee){
          console.log(employee);
          results.push(jsong.ref(['model', 'employeeById', employee.id]));
        });
        return [{
          path: ['model', 'employeeIds'],
          value: jsong.atom(results)
        }];
      });
    }
  }
];
