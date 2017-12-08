'use strict';
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var port = process.env.PORT || 8081;

var routes = require('./api/routes/ampRoutes'); //importing route
routes(app); //register the route

app.listen(port);
console.log('AMP mock server started on: ' + port);