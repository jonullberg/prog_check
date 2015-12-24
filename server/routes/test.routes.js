'use strict';
var Tests = require('../models/Test');
var Attempt = require('../models/Attempt');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var path = require('path');
var fs = require('fs');
var setUpTest = require('./tests/controllers/set_up_test');
var logError = require('../lib/log_error');
function testRouter(router) {
    router.use(bodyparser.json());
    router.post('/tests', jwtAuth, createTest);
    router.get('/tests', jwtAuth, getTests);
    router.get('/tests/:testId', jwtAuth, findTestById);
    router.put('/tests/:testId', jwtAuth, updateTestById);
    router.delete('/tests/:testId', jwtAuth, deleteTestById);
    router.post('/tests/:testId/questions', jwtAuth, createQuestion);
    router.delete('/tests/:testId/questions/:questionId', jwtAuth, deleteQuestionByTestId);
    router.put('/tests/:testId/questions/:questionId', jwtAuth, updateTextQuestion);
    function createTest(req, res) {
        var newTest = new Tests(req.body);
        newTest.save(saveTest);
        function saveTest(err, test) {
            sendData(err, 'test', test, res);
        }
    }
    function getTests(req, res) {
        if (req.query.standardId) {
            Tests.find({ standardId: req.query.standardId }, sendTestsByStandardId);
        }
        else if (req.query.goalId) {
            Tests.findOne({ goalId: req.query.goalId }).lean().exec(sendTestByGoalId);
        }
        else {
            Tests.find({}, sendAllTests);
        }
        function sendTestsByStandardId(err, tests) {
            sendData(err, 'tests', tests, res);
        }
        function sendTestByGoalId(err, test) {
            var attempt = test
                ? setUpTest(test, req.query.questions)
                : null;
            sendData(err, 'test', attempt, res);
        }
        function sendAllTests(err, tests) {
            sendData(err, 'tests', tests, res);
        }
    }
    function findTestById(req, res) {
        Tests.findById(req.params.testId, sendTestById);
        function sendTestById(err, test) {
            sendData(err, 'test', test, res);
        }
    }
    function updateTestById(req, res) {
        var updatedTest = req.body;
        delete updatedTest._id;
        Tests.update({ _id: req.params.testId }, updatedTest, sendTest);
        function sendTest(err) {
            sendData(err, 'test', updatedTest, res);
        }
    }
    function deleteTestById(req, res) {
        Tests.remove({ '_id': req.params.testId }, sendDeleteMessage);
        function sendDeleteMessage(err, data) {
            sendData(err, 'msg', 'Success', res);
        }
    }
    function createQuestion(req, res) {
        var newQuestion = req.body;
        Tests.findById(req.params.testId, updateTest);
        function updateTest(err, test) {
            if (err) {
                logError(err);
            }
            newQuestion.dateCreated = Date.now();
            test.questions.push(newQuestion);
            test.save(sendTest);
            function sendTest(err, data) {
                sendData(err, 'test', data, res);
            }
        }
    }
    function updateTextQuestion(req, res) {
        var updatedQuestion = req.body;
        delete updatedQuestion._id;
        Tests.update({
            '_id': req.params.testId,
            'questions._id': req.params.questionId
        }, { $set: { 'questions.$': updatedQuestion } }, sendUpdateMessage);
        function sendUpdateMessage(err, test) {
            sendData(err, 'msg', 'Success', res);
        }
    }
    function deleteQuestionByTestId(req, res) {
        Tests.findById(req.params.testId, deleteQuestion);
        function deleteQuestion(err, test) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            test.questions = test.questions.filter(filterQuestion);
            test.save(sendTest);
            function filterQuestion(question) {
                if (question._id !== req.params.questionId) {
                    return question;
                }
            }
            function sendTest(err, data) {
                sendData(err, 'test', data, res);
            }
        }
    }
    function sendData(err, key, data, res) {
        if (err) {
            logError(err, 500, 'Internal Server Error');
        }
        var response = {};
        response[key] = data;
        res.json(response);
    }
}
;
module.exports = testRouter;
