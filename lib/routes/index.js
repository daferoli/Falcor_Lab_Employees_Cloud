var Router = require('falcor-router');
var _ = require('lodash');
var employeeRoutes = require('./employee');

var routes = [];
_.each(employeeRoutes, function(route){
  routes.push(route);
});

var BaseRouter = Router.createClass(routes);

module.exports = BaseRouter;
