'use strict';
var testsController = require('./tests/controllers/tests_controller');
var questionsController = require('./tests/controllers/questions_controller');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
function testRouter(router) {
    router.use(bodyparser.json());
    router.post('/tests', jwtAuth, testsController.createTest);
    router.get('/tests', jwtAuth, testsController.getTests);
    router.get('/tests/:testId', jwtAuth, testsController.findTestById);
    router.put('/tests/:testId', jwtAuth, testsController.updateTestById);
    router.delete('/tests/:testId', jwtAuth, testsController.deleteTestById);
    router.post('/tests/:testId/questions', jwtAuth, questionsController.createQuestion);
    router.delete('/tests/:testId/questions/:questionId', jwtAuth, questionsController.deleteQuestionByTestId);
    router.put('/tests/:testId/questions/:questionId', jwtAuth, questionsController.updateTextQuestion);
}
;
module.exports = testRouter;
