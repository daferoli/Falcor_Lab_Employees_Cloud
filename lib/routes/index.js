var Router = require('falcor-router');
var _ = require('lodash');
var employeeRoutes = require('./employee');
var officeRoutes = require('./office');

var routes = [];
_.each(employeeRoutes, function(route){
  routes.push(route);
});
_.each(officeRoutes, function(route){
  routes.push(route);
});

var BaseRouter = Router.createClass(routes);

module.exports = BaseRouter;
