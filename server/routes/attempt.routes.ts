/**
 * The routes for all student test attempts for the Prog Check API
 * Created by Jonathan Ullberg on 11/23/2015
 */
'use strict';

var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var attemptsController = require('./attempts/controllers/attempts_controller');

export = function(router) {
  router.use(bodyparser.json());
  // Adds a new test attempt for that student
  router.post('/students/:studentId/tests/', jwtAuth, attemptsController.createAttempt);
  // Gets all tests for the student at that id
  router.get('/students/:studentId/attempts/', jwtAuth, attemptsController.getStudentAttempts);
  // Deletes an attempt for a student
  router.delete('/students/:studentId/attempts/:attemptId', jwtAuth, attemptsController.deleteAttempt);
};
