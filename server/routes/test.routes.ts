// The API endpoints for tests in the ProgCheck testing application
// Created by Jonathan Ullberg on 08/24/2015
'use strict';

var testsController = require('./tests/controllers/tests_controller');
var questionsController = require('./tests/controllers/questions_controller');

var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);

export = testRouter;
function testRouter(router) {
  router.use(bodyparser.json());

  // Creates a new test
  router.post('/tests', jwtAuth, testsController.createTest);

  // Gets tests from the database
  // Needs to be refactored into separate functions
  router.get('/tests', jwtAuth, testsController.getTests);

  // Gets a single test from the database
  router.get('/tests/:testId', jwtAuth, testsController.findTestById);

  // Updates a test in the database
  router.put('/tests/:testId', jwtAuth, testsController.updateTestById);

  // Deletes a test from the database
  router.delete('/tests/:testId', jwtAuth, testsController.deleteTestById);

  // Adds a new text question to a test
  router.post('/tests/:testId/questions', jwtAuth, questionsController.createQuestion);

  // Deletes a specific question from a test
  router.delete('/tests/:testId/questions/:questionId', jwtAuth, questionsController.deleteQuestionByTestId);

  // Updates a specific text question
  router.put('/tests/:testId/questions/:questionId', jwtAuth, questionsController.updateTextQuestion);

};
