var Router = require('falcor-router');
var employeeRoutes = require('./employee');
var officeRoutes = require('./office');
var departmentRoutes = require('./department');

var routes = [].concat(
  employeeRoutes,
  officeRoutes,
  departmentRoutes
);

var BaseRouter = Router.createClass(routes);

module.exports = BaseRouter;
