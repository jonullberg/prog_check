'use strict';
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var attemptsController = require('./attempts/controllers/attempts_controller');
module.exports = function (router) {
    router.use(bodyparser.json());
    router.post('/students/:studentId/tests/', jwtAuth, attemptsController.createAttempt);
    router.get('/students/:studentId/attempts/', jwtAuth, attemptsController.getStudentAttempts);
    router.delete('/students/:studentId/attempts/:attemptId', jwtAuth, attemptsController.deleteAttempt);
};
