'use strict';

const falcorExpress = require('falcor-express');

const express = require('express');
const app = express();
const FalcorRoutes = require('lib/routes');

app.use('/model.json', falcorExpress.dataSourceRoute(function () {
  return new FalcorRoutes();
}));

// serve static files from current directory
app.use(express.static(__dirname + '/'));

const CLOUD_PORT = 8000;
app.listen(CLOUD_PORT, function(){
  console.log('cloud app started on port: ' + CLOUD_PORT);
});
