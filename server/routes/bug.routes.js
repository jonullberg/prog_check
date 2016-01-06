'use strict';
var bugController = require('./bugs/controllers/bugs_controller');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var adminAuth = require('../lib/admin_auth.js')();
module.exports = function (router) {
    router.use(bodyparser.json());
    router.post('/bugs', jwtAuth, bugController.createBug);
    router.get('/bugs', jwtAuth, adminAuth, bugController.getBugs);
    router.post('/client-log', bugController.createLog);
};
