
'use strict';

var bugController = require('./bugs/controllers/bugs_controller');

var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var adminAuth = require('../lib/admin_auth.js')();

export = function(router) {
  router.use(bodyparser.json());

  // Creates a new bug on the database
  router.post('/bugs', jwtAuth, bugController.createBug);

  // Gets all bugs from the database
  router.get('/bugs', jwtAuth, adminAuth, bugController.getBugs);

  // Posts a new Log to the database
  router.post('/client-log', bugController.createLog);

};
